"use client";

import { useState } from "react";
import { Check, Copy, Facebook, MessageCircle, Twitter } from "lucide-react";

type Props = {
  title: string;
  slug: string;
};

export function ShareButtons({ title, slug }: Props) {
  const [copied, setCopied] = useState(false);
  const url = `https://portalfunil.com.br/noticias/${slug}`;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  function copyLink() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-semibold text-slate-500">Compartilhar:</span>

      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-xl border border-black/5 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
      >
        <MessageCircle size={14} />
        WhatsApp
      </a>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-xl border border-black/5 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
      >
        <Twitter size={14} />
        Twitter
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-xl border border-black/5 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
      >
        <Facebook size={14} />
        Facebook
      </a>

      <button
        onClick={copyLink}
        className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition ${
          copied
            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
            : "border-black/5 bg-white text-slate-600 hover:bg-slate-50"
        }`}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copiado!" : "Copiar link"}
      </button>
    </div>
  );
}
