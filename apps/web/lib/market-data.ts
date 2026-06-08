export type MarketItem = {
  name: string;
  symbol: string;
  value: string;
  change: number;
  unit?: string;
};

export const marketData: MarketItem[] = [
  { name: "Dólar", symbol: "USD", value: "5,04", change: 0.3, unit: "R$" },
  { name: "Euro", symbol: "EUR", value: "5,48", change: -0.1, unit: "R$" },
  { name: "Ibovespa", symbol: "IBOV", value: "140.230", change: 1.2 },
  { name: "Bitcoin", symbol: "BTC", value: "352.400", change: 2.8, unit: "R$" },
  { name: "Selic", symbol: "SELIC", value: "14,75", change: 0, unit: "%" },
];
