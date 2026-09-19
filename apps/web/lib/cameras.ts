export type CityCamera = {
  id: string;
  location: string;
  zone: string;
  youtubeId: string;
  /** Transmissão em loop de imagens gravadas, não uma câmera ao vivo. */
  replay: boolean;
};

/** Canal AmzLive no YouTube, que transmite câmeras de Manaus 24h. */
const AMZLIVE_STREAMS_URL = "https://www.youtube.com/channel/UCH9JbKmqTI6gwhA4ghl32FQ/streams";

/**
 * Locais conhecidos. O ID de uma live do YouTube muda a cada reinício da transmissão,
 * então as câmeras são descobertas pelo título, entre as lives que estão no ar agora.
 */
const PLACES = [
  { match: /encontro das [aá]guas/i, location: "Encontro das Águas", zone: "Rio Negro e Solimões", replay: true },
  { match: /teatro amazonas/i, location: "Teatro Amazonas", zone: "Centro Histórico", replay: false },
  { match: /ponta negra/i, location: "Ponta Negra", zone: "Zona Oeste", replay: false },
  { match: /vieiralves/i, location: "Vieiralves", zone: "Adrianópolis", replay: false },
];

type LockupViewModel = {
  contentId?: string;
  contentType?: string;
  contentImage?: unknown;
  metadata?: { lockupMetadataViewModel?: { title?: { content?: string } } };
};

/** Extrai o objeto JSON que começa logo após `marker`, respeitando strings e chaves aninhadas. */
function extractJson(html: string, marker: string): unknown | null {
  const at = html.indexOf(marker);
  if (at === -1) return null;
  const start = html.indexOf("{", at + marker.length);
  if (start === -1) return null;

  let depth = 0;
  let inString = false;
  for (let i = start; i < html.length; i++) {
    const ch = html[i];
    if (inString) {
      if (ch === "\\") i++;
      else if (ch === '"') inString = false;
    } else if (ch === '"') {
      inString = true;
    } else if (ch === "{") {
      depth++;
    } else if (ch === "}" && --depth === 0) {
      try {
        return JSON.parse(html.slice(start, i + 1));
      } catch {
        return null;
      }
    }
  }
  return null;
}

function collectLockups(node: unknown, out: LockupViewModel[]) {
  if (Array.isArray(node)) {
    for (const item of node) collectLockups(item, out);
  } else if (node && typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      if (key === "lockupViewModel" && value && typeof value === "object") out.push(value as LockupViewModel);
      collectLockups(value, out);
    }
  }
}

/**
 * Câmeras de Manaus que estão ao vivo neste momento no canal AmzLive (YouTube, sem chave de API).
 * Retorna lista vazia se a fonte estiver fora do ar ou mudar de formato.
 */
export async function getLiveCameras(): Promise<CityCamera[]> {
  try {
    const res = await fetch(AMZLIVE_STREAMS_URL, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8000),
      headers: {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36",
        "Accept-Language": "pt-BR",
      },
    });
    if (!res.ok) return [];

    const data = extractJson(await res.text(), "ytInitialData =");
    if (!data) return [];

    const lockups: LockupViewModel[] = [];
    collectLockups(data, lockups);

    const cameras: CityCamera[] = [];
    const seen = new Set<string>();
    for (const item of lockups) {
      const title = item.metadata?.lockupMetadataViewModel?.title?.content;
      const isLive = JSON.stringify(item.contentImage ?? {}).includes("THUMBNAIL_OVERLAY_BADGE_STYLE_LIVE");
      if (!item.contentId || !title || !isLive || seen.has(item.contentId)) continue;

      const place = PLACES.find((p) => p.match.test(title));
      if (!place) continue;

      seen.add(item.contentId);
      const sameLocation = cameras.filter((c) => c.location.startsWith(place.location)).length;
      cameras.push({
        id: `CAM-${String(cameras.length + 1).padStart(2, "0")}`,
        location: sameLocation ? `${place.location} (${sameLocation + 1})` : place.location,
        zone: place.zone,
        youtubeId: item.contentId,
        replay: place.replay,
      });
    }
    return cameras;
  } catch {
    return [];
  }
}
