"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn, Mail } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const { login, user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && user) {
      const role = user.role;
      if (role === "ADMIN" || role === "EDITOR" || role === "JOURNALIST") {
        router.replace("/admin/artigos");
      } else {
        router.replace("/");
      }
    }
  }, [user, loading, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email.trim(), password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-navy border-t-transparent" />
      </div>
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-surface px-4">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -55deg,
            transparent,
            transparent 18px,
            rgba(11, 42, 91, 0.045) 18px,
            rgba(11, 42, 91, 0.045) 19px
          )`,
        }}
      />
      <div className="relative z-10 w-full max-w-sm">
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-[28px] border border-black/5 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
        >
          <div className="mb-4 text-center">
            <h1 className="text-3xl font-black tracking-tight">
              <span className="text-cobalt">Funil </span>
              <span className="text-gold">de</span>
              <br />
              <span className="text-gold">Notícias</span>
            </h1>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Área editorial</p>
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-cobalt">E-mail</label>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-gold/40 focus-within:bg-white">
              <Mail size={16} className="shrink-0 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-slate-400"
                required
                autoFocus
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-cobalt">Senha</label>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-gold/40 focus-within:bg-white">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-slate-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="shrink-0 text-slate-400 hover:text-slate-600"
              >
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
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-cobalt px-5 py-3.5 text-sm font-black text-white transition hover:bg-navy disabled:opacity-60"
          >
            {submitting ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                <LogIn size={16} />
                Entrar
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          Apenas membros da equipe editorial têm acesso.
        </p>
      </div>
    </main>
  );
}
