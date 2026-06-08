"use client";

import { useState } from "react";
import { Eye, EyeOff, LogIn, Mail, User, UserPlus, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Tab = "login" | "register";

export function LoginModal({ open, onClose }: Props) {
  const { login, register } = useAuth();
  const [tab, setTab] = useState<Tab>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function reset() {
    setName(""); setEmail(""); setPassword(""); setError(""); setLoading(false);
  }

  function switchTab(t: Tab) {
    setTab(t); setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      if (tab === "login") {
        await login(email.trim(), password);
      } else {
        if (password.length < 8) throw new Error("A senha deve ter ao menos 8 caracteres");
        await register(name.trim(), email.trim(), password);
      }
      reset();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-black/5 bg-white shadow-[0_40px_120px_rgba(15,23,42,0.25)]">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-100 px-7 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold/10">
              <LogIn size={18} className="text-gold-dark" />
            </div>
            <div>
              <h2 className="text-base font-black text-navy">Portal Funil</h2>
              <p className="text-xs text-slate-400">Acesse ou crie sua conta</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:bg-slate-50"
          >
            <X size={16} />
          </button>
        </div>

        {/* TABS */}
        <div className="flex border-b border-slate-100">
          {(["login", "register"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => switchTab(t)}
              className={`flex-1 py-3 text-sm font-bold transition ${
                tab === t
                  ? "border-b-2 border-navy text-navy"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {t === "login" ? "Entrar" : "Criar conta"}
            </button>
          ))}
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 px-7 py-7">
          {tab === "register" && (
            <div>
              <label className="mb-2 block text-sm font-bold text-navy">Nome</label>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-gold/40 focus-within:bg-white">
                <User size={16} className="shrink-0 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-slate-400"
                  required={tab === "register"}
                  minLength={2}
                />
              </div>
            </div>
          )}

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

          <div>
            <label className="mb-2 block text-sm font-bold text-navy">Senha</label>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-gold/40 focus-within:bg-white">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={tab === "register" ? "Mínimo 8 caracteres" : "Sua senha"}
                className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-slate-400"
                required
                minLength={tab === "register" ? 8 : 1}
              />
              <button type="button" onClick={() => setShowPassword((v) => !v)} className="shrink-0 text-slate-400">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-navy px-5 py-3.5 text-sm font-black text-white transition hover:bg-cobalt disabled:opacity-60"
          >
            {loading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : tab === "login" ? (
              <><LogIn size={16} /> Entrar</>
            ) : (
              <><UserPlus size={16} /> Criar conta</>
            )}
          </button>

          <p className="text-center text-xs text-slate-400">
            Ao continuar, você concorda com os Termos de Uso e Política de Privacidade.
          </p>
        </form>
      </div>
    </div>
  );
}
