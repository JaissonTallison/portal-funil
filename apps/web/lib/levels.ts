export type Level = { label: string; text: string; bar: string };

const NORMAL = { text: "text-emerald-600", bar: "bg-emerald-500" };
const MEDIUM = { text: "text-orange-500", bar: "bg-orange-400" };
const HIGH = { text: "text-red-500", bar: "bg-red-500" };

export function aqiLevel(aqi: number): Level {
  if (aqi <= 50) return { label: "Boa", ...NORMAL };
  if (aqi <= 100) return { label: "Moderada", ...MEDIUM };
  if (aqi <= 150) return { label: "Ruim p/ sensíveis", ...HIGH };
  if (aqi <= 200) return { label: "Ruim", ...HIGH };
  return { label: "Muito ruim", ...HIGH };
}

export function uvLevel(uv: number): Level {
  if (uv <= 2) return { label: "Baixo", ...NORMAL };
  if (uv <= 5) return { label: "Moderado", ...MEDIUM };
  if (uv <= 7) return { label: "Alto", ...MEDIUM };
  if (uv <= 10) return { label: "Muito alto", ...HIGH };
  return { label: "Extremo", ...HIGH };
}

export function rainLevel(pct: number): Level {
  if (pct < 30) return { label: "Baixa", ...NORMAL };
  if (pct < 60) return { label: "Média", ...MEDIUM };
  return { label: "Alta", ...HIGH };
}

// Faixas da EPA (µg/m³): boa / moderada / ruim.
export function particleLevel(value: number, goodMax: number, moderateMax: number): Level {
  if (value <= goodMax) return { label: "Boa", ...NORMAL };
  if (value <= moderateMax) return { label: "Moderada", ...MEDIUM };
  return { label: "Ruim", ...HIGH };
}
