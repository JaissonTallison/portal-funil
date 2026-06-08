"use client";

import { useState } from "react";
import { LogIn, Mail, User, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function LoginModal({ open, onClose }: Props) {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      login(name.trim(), email.trim());
      setName("");
      setEmail("");
      onClose();
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-black/5 bg-white shadow-[0_40px_120px_rgba(15,23,42,0.25)]">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-100 px-7 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold/10">
              <LogIn size={18} className="text-gold-dark" />
            </div>
            <div>
              <h2 className="text-base font-black text-navy">Entrar</h2>
              <p className="text-xs text-slate-400">Acesse sua conta no Portal Funil</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:bg-slate-50"
          >
            <X size={16} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5 px-7 py-7">
          <div>
            <label className="mb-2 block text-sm font-bold text-navy">Nome</label>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-gold/40 focus-within:bg-white">
              <User size={16} className="shrink-0 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-slate-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-navy">E-mail</label>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-gold/40 focus-within:bg-white">
              <Mail size={16} className="shrink-0 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-slate-400"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-navy px-5 py-3.5 text-sm font-black text-white transition hover:bg-cobalt"
          >
            <LogIn size={16} />
            Entrar
          </button>

          <p className="text-center text-xs text-slate-400">
            Ao entrar, você concorda com os Termos de Uso e Política de Privacidade.
          </p>
        </form>
      </div>
    </div>
  );
}
