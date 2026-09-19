export type MarketItem = {
  name: string;
  symbol: string;
  value: string;
  change: number;
  unit?: string;
};

export type MarketSnapshot = {
  items: MarketItem[];
  updatedAt: Date;
};

const REVALIDATE_SECONDS = 300;
const TIMEOUT_MS = 6000;

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { "User-Agent": "Mozilla/5.0 (compatible; FunilDeNoticias/1.0)" },
  });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.json() as Promise<T>;
}

const formatNumber = (n: number, digits = 2) =>
  n.toLocaleString("pt-BR", { minimumFractionDigits: digits, maximumFractionDigits: digits });

type AwesomeQuote = { bid: string; pctChange: string };

async function getCurrencies(): Promise<MarketItem[]> {
  const data = await fetchJson<Record<string, AwesomeQuote>>(
    "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL",
  );
  const build = (key: string, name: string, symbol: string, digits: number): MarketItem[] => {
    const q = data[key];
    if (!q) return [];
    return [{ name, symbol, unit: "R$", value: formatNumber(Number(q.bid), digits), change: Number(q.pctChange) }];
  };
  return [
    ...build("USDBRL", "Dólar", "USD", 2),
    ...build("EURBRL", "Euro", "EUR", 2),
    ...build("BTCBRL", "Bitcoin", "BTC", 0),
  ];
}

type YahooChart = {
  chart: { result: { meta: { regularMarketPrice: number; chartPreviousClose: number } }[] };
};

async function getIbovespa(): Promise<MarketItem[]> {
  const data = await fetchJson<YahooChart>(
    "https://query1.finance.yahoo.com/v8/finance/chart/%5EBVSP?range=5d&interval=1d",
  );
  const { regularMarketPrice: price, chartPreviousClose: prev } = data.chart.result[0].meta;
  return [{ name: "Ibovespa", symbol: "IBOV", value: formatNumber(price, 0), change: ((price - prev) / prev) * 100 }];
}

type SgsEntry = { data: string; valor: string };

async function getSelic(): Promise<MarketItem[]> {
  // Série 432: meta Selic definida pelo Copom (% a.a.).
  // "ultimos/N" devolve datas futuras, então consultamos um intervalo até hoje.
  const fmt = (d: Date) =>
    `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  const end = new Date();
  const start = new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);
  const rows = await fetchJson<SgsEntry[]>(
    `https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados?formato=json&dataInicial=${fmt(start)}&dataFinal=${fmt(end)}`,
  );
  const last = rows[rows.length - 1];
  if (!last) return [];
  return [{ name: "Selic", symbol: "SELIC", unit: "%", value: formatNumber(Number(last.valor)), change: 0 }];
}

const ORDER = ["USD", "EUR", "IBOV", "BTC", "SELIC"];

/**
 * Cotações reais. Cada fonte falha de forma independente: o que não carregar
 * simplesmente não aparece. Retorna null se nenhuma fonte respondeu.
 */
export async function getMarketData(): Promise<MarketSnapshot | null> {
  const results = await Promise.allSettled([getCurrencies(), getIbovespa(), getSelic()]);
  const items = results
    .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
    .sort((a, b) => ORDER.indexOf(a.symbol) - ORDER.indexOf(b.symbol));

  if (items.length === 0) return null;
  return { items, updatedAt: new Date() };
}
