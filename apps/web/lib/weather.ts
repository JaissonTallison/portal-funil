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
