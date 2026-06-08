"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  ImagePlus,
  Mail,
  MapPin,
  Phone,
  Send,
  Tag,
  Type,
} from "lucide-react";
import { LISTING_CATEGORIES, LISTING_TYPES } from "@/lib/classifieds";

type Step = 1 | 2 | 3;

const steps = [
  { num: 1, label: "Dados do anúncio", icon: Tag },
  { num: 2, label: "Fotos", icon: Camera },
  { num: 3, label: "Contato", icon: Phone },
];

export function ListingForm() {
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    price: "",
    priceNegotiable: false,
    name: "",
    phone: "",
    email: "",
    whatsapp: "",
    location: "",
  });

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[40px] border border-black/5 bg-white px-8 py-20 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
          <Check size={36} className="text-emerald-500" />
        </div>
        <h2 className="mt-6 text-3xl font-black text-navy">Anúncio enviado!</h2>
        <p className="mt-3 max-w-md text-base text-slate-500">
          Seu anúncio foi enviado para moderação e será publicado em breve.
          Você receberá uma notificação quando ele estiver ativo.
        </p>
        <Link
          href="/classificados"
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-navy px-6 py-3.5 text-sm font-black text-white transition hover:bg-cobalt"
        >
          Ver classificados
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[40px] border border-black/5 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
      {/* PROGRESS */}
      <div className="border-b border-slate-100 px-8 py-6">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isActive = step === s.num;
            const isDone = step > s.num;
            return (
              <div key={s.num} className="flex flex-1 items-center">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl transition ${
                      isActive
                        ? "bg-gold text-navy"
                        : isDone
                        ? "bg-emerald-50 text-emerald-500"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {isDone ? <Check size={18} /> : <Icon size={18} />}
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Passo {s.num}
                    </span>
                    <p className={`text-sm font-bold ${isActive ? "text-navy" : "text-slate-400"}`}>
                      {s.label}
                    </p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className={`mx-4 hidden h-px flex-1 sm:block ${isDone ? "bg-emerald-300" : "bg-slate-200"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* FORM CONTENT */}
      <div className="px-8 py-8">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-bold text-navy">Título do anúncio</label>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-gold/40 focus-within:bg-white">
                <Type size={16} className="shrink-0 text-slate-400" />
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder="Ex: iPhone 15 Pro Max 256GB — Novo"
                  className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-navy">Descrição</label>
              <textarea
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Descreva seu anúncio com detalhes: estado, condições, o que está incluso..."
                rows={5}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-navy outline-none placeholder:text-slate-400 focus:border-gold/40 focus:bg-white"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-navy">Categoria</label>
                <select
                  value={form.category}
                  onChange={(e) => update("category", e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-navy outline-none focus:border-gold/40 focus:bg-white"
                >
                  <option value="">Selecione...</option>
                  {LISTING_CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-navy">Tipo</label>
                <select
                  value={form.type}
                  onChange={(e) => update("type", e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-navy outline-none focus:border-gold/40 focus:bg-white"
                >
                  <option value="">Selecione...</option>
                  {LISTING_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-navy">Preço</label>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-gold/40 focus-within:bg-white">
                <span className="text-sm font-bold text-slate-400">R$</span>
                <input
                  type="text"
                  value={form.price}
                  onChange={(e) => update("price", e.target.value)}
                  placeholder="0,00"
                  disabled={form.priceNegotiable}
                  className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-slate-400 disabled:opacity-50"
                />
              </div>
              <label className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={form.priceNegotiable}
                  onChange={(e) => update("priceNegotiable", e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 accent-gold"
                />
                A combinar
              </label>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-bold text-navy">Fotos do anúncio</label>
              <p className="mb-4 text-sm text-slate-400">
                Adicione até 6 fotos. A primeira será a foto de capa.
              </p>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {/* Upload placeholder cards */}
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <label
                    key={n}
                    className="group flex h-[140px] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 transition hover:border-gold/40 hover:bg-gold/5"
                  >
                    <ImagePlus size={24} className="text-slate-300 transition group-hover:text-gold-dark" />
                    <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400 group-hover:text-gold-dark">
                      {n === 1 ? "Capa" : `Foto ${n}`}
                    </span>
                    <input type="file" accept="image/*" className="hidden" />
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-bold text-navy">Seu nome</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Nome completo ou nome da empresa"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-navy outline-none placeholder:text-slate-400 focus:border-gold/40 focus:bg-white"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-navy">Telefone</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-gold/40 focus-within:bg-white">
                  <Phone size={15} className="shrink-0 text-slate-400" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="(92) 99999-9999"
                    className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-navy">WhatsApp</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-gold/40 focus-within:bg-white">
                  <Phone size={15} className="shrink-0 text-slate-400" />
                  <input
                    type="tel"
                    value={form.whatsapp}
                    onChange={(e) => update("whatsapp", e.target.value)}
                    placeholder="(92) 99999-9999"
                    className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-navy">E-mail</label>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-gold/40 focus-within:bg-white">
                <Mail size={15} className="shrink-0 text-slate-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-navy">Localização</label>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-gold/40 focus-within:bg-white">
                <MapPin size={15} className="shrink-0 text-slate-400" />
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  placeholder="Bairro, Manaus"
                  className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER NAVIGATION */}
      <div className="flex items-center justify-between border-t border-slate-100 px-8 py-5">
        {step > 1 ? (
          <button
            onClick={() => setStep((s) => (s - 1) as Step)}
            className="flex items-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            <ArrowLeft size={15} />
            Voltar
          </button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <button
            onClick={() => setStep((s) => (s + 1) as Step)}
            className="flex items-center gap-2 rounded-2xl bg-navy px-6 py-3 text-sm font-black text-white transition hover:bg-cobalt"
          >
            Próximo
            <ArrowRight size={15} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 rounded-2xl bg-gold px-6 py-3 text-sm font-black text-navy transition hover:bg-gold-hover"
          >
            <Send size={15} />
            Publicar anúncio
          </button>
        )}
      </div>
    </div>
  );
}
