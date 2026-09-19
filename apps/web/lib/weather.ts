export type Weather = {
  temperature: number;
  humidity: number;
  description: string;
  condition: "clear" | "cloudy" | "rain";
};

type OpenMeteoResponse = {
  current: { temperature_2m: number; relative_humidity_2m: number; weather_code: number };
};

// Códigos WMO: https://open-meteo.com/en/docs
function describe(code: number): Pick<Weather, "description" | "condition"> {
  if (code === 0) return { description: "Céu limpo", condition: "clear" };
  if (code <= 2) return { description: "Poucas nuvens", condition: "clear" };
  if (code === 3) return { description: "Nublado", condition: "cloudy" };
  if (code === 45 || code === 48) return { description: "Neblina", condition: "cloudy" };
  if (code >= 51 && code <= 57) return { description: "Garoa", condition: "rain" };
  if (code >= 61 && code <= 67) return { description: "Chuva", condition: "rain" };
  if (code >= 80 && code <= 82) return { description: "Pancadas de chuva", condition: "rain" };
  if (code >= 95) return { description: "Tempestade", condition: "rain" };
  return { description: "Tempo instável", condition: "cloudy" };
}

/** Clima atual de Manaus (Open-Meteo, sem chave). Retorna null se a fonte falhar. */
export async function getManausWeather(): Promise<Weather | null> {
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=-3.119&longitude=-60.0217&current=temperature_2m,relative_humidity_2m,weather_code&timezone=America%2FManaus",
      { next: { revalidate: 600 }, signal: AbortSignal.timeout(6000) },
    );
    if (!res.ok) return null;
    const { current } = (await res.json()) as OpenMeteoResponse;
    return {
      temperature: Math.round(current.temperature_2m),
      humidity: current.relative_humidity_2m,
      ...describe(current.weather_code),
    };
  } catch {
    return null;
  }
}

export type ManausConditions = {
  updatedAt: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windKmh: number;
  description: string;
  condition: Weather["condition"];
  uvMax: number;
  rainChanceToday: number;
  /** Probabilidade de chuva (%) nas próximas horas, a partir da hora atual. */
  nextHours: { hour: string; rainChance: number }[];
};

export type ManausAirQuality = {
  aqi: number;
  pm25: number;
  pm10: number;
  ozone: number;
  no2: number;
};

type ConditionsResponse = {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  hourly: { time: string[]; precipitation_probability: number[] };
  daily: { uv_index_max: number[]; precipitation_probability_max: number[] };
};

/** Condições detalhadas de Manaus (Open-Meteo, sem chave). Retorna null se a fonte falhar. */
export async function getManausConditions(): Promise<ManausConditions | null> {
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=-3.119&longitude=-60.0217&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&hourly=precipitation_probability&daily=uv_index_max,precipitation_probability_max&forecast_hours=6&forecast_days=1&timezone=America%2FManaus",
      { next: { revalidate: 600 }, signal: AbortSignal.timeout(6000) },
    );
    if (!res.ok) return null;
    const { current, hourly, daily } = (await res.json()) as ConditionsResponse;
    return {
      updatedAt: current.time,
      temperature: Math.round(current.temperature_2m),
      feelsLike: Math.round(current.apparent_temperature),
      humidity: current.relative_humidity_2m,
      windKmh: Math.round(current.wind_speed_10m),
      ...describe(current.weather_code),
      uvMax: Math.round(daily.uv_index_max[0] * 10) / 10,
      rainChanceToday: daily.precipitation_probability_max[0],
      nextHours: hourly.time.map((t, i) => ({
        hour: t.slice(11, 16),
        rainChance: hourly.precipitation_probability[i],
      })),
    };
  } catch {
    return null;
  }
}

type AirQualityResponse = {
  current: { us_aqi: number; pm2_5: number; pm10: number; ozone: number; nitrogen_dioxide: number };
};

/** Qualidade do ar em Manaus (Open-Meteo Air Quality, sem chave). Retorna null se a fonte falhar. */
export async function getManausAirQuality(): Promise<ManausAirQuality | null> {
  try {
    const res = await fetch(
      "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=-3.119&longitude=-60.0217&current=us_aqi,pm10,pm2_5,ozone,nitrogen_dioxide&timezone=America%2FManaus",
      { next: { revalidate: 1800 }, signal: AbortSignal.timeout(6000) },
    );
    if (!res.ok) return null;
    const { current } = (await res.json()) as AirQualityResponse;
    return {
      aqi: Math.round(current.us_aqi),
      pm25: Math.round(current.pm2_5 * 10) / 10,
      pm10: Math.round(current.pm10 * 10) / 10,
      ozone: Math.round(current.ozone),
      no2: Math.round(current.nitrogen_dioxide * 10) / 10,
    };
  } catch {
    return null;
  }
}
