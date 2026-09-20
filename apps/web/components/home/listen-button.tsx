"use client";

import { useEffect, useState } from "react";
import { Headphones, Square } from "lucide-react";

/** Lê o resumo em voz alta com a síntese de voz do próprio navegador (pt-BR). */
export function ListenButton({ text }: { text: string }) {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  if (!supported) return null;

  function toggle() {
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    synth.speak(utterance);
    setSpeaking(true);
  }

  return (
    <button
      onClick={toggle}
      className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-100"
    >
      {speaking ? <Square size={14} /> : <Headphones size={14} />}
      {speaking ? "Parar" : "Ouvir resumo"}
    </button>
  );
}
