import type { NextConfig } from "next";

const PRODUCTION_API_HOST = "funildenoticias.com.br";

type RemotePattern = { protocol: "http" | "https"; hostname: string; port?: string };

// Domains allowed to serve images via next/image
const remotePatterns: RemotePattern[] = [
  { protocol: "https", hostname: "images.unsplash.com" },
  { protocol: "https", hostname: "i.pravatar.cc" },
  { protocol: "https", hostname: PRODUCTION_API_HOST },
];

// Keep localhost for local development
if (process.env.NODE_ENV !== "production") {
  remotePatterns.push({ protocol: "http", hostname: "localhost", port: "3002" });
}

// Content Security Policy
// - next/font/google self-hosts fonts at build time — no external font-src needed
// - unsafe-inline required for Next.js hydration inline scripts
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  [
    "img-src 'self' data: blob:",
    "https://images.unsplash.com",
    "https://i.pravatar.cc",
    `https://${PRODUCTION_API_HOST}`,
    "http://localhost:3002",
  ].join(" "),
  "font-src 'self' data:",
  [
    "connect-src 'self'",
    `https://${PRODUCTION_API_HOST}`,
    "http://localhost:3002",
    "http://localhost:3010",
  ].join(" "),
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  images: { remotePatterns },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Content-Security-Policy", value: CSP },
        ],
      },
    ];
  },
};

export default nextConfig;
