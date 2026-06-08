"use client";

import { useState } from "react";
import { Building2, CheckCircle2, Crown, Rocket, User } from "lucide-react";

const plans = [
  {
    id: "free",
    name: "Grátis",
    icon: User,
    description: "Para quem quer se manter informado",
    monthly: 0,
    annual: 0,
    popular: false,
    highlight: false,
    buttonText: "Plano atual",
    buttonStyle: "border border-white/10 text-zinc-400 hover:bg-white/5",
    features: [
      "5 notícias completas/dia",
      "Breaking news ticker",
      "Alertas básicos",
      "Classificados (até 2 anúncios)",
      "Acesso ao app mobile",
    ],
    featureStyle: "text-zinc-400",
    checkStyle: "text-zinc-600",
  },
  {
    id: "pro",
    name: "Pro",
    icon: Crown,
    description: "Para o leitor que quer tudo",
    monthly: 1.99,
    annual: 19.90,
    popular: true,
    highlight: false,
    buttonText: "Assinar Pro",
    buttonStyle: "border border-gold/30 bg-white/5 text-gold hover:bg-gold/10",
    features: [
      "Leitura ilimitada",
      "Zero anúncios",
      "Alertas em tempo real",
      "Cobertura ao vivo HD",
      "Painel operacional completo",
      "Newsletter diária",
      "Classificados ilimitados",
      "7 dias grátis",
    ],
    featureStyle: "text-white",
    checkStyle: "text-gold",
  },
  {
    id: "business",
    name: "Business",
    icon: Rocket,
    description: "Para MEI e autônomos",
    monthly: 9.99,
    annual: 99.90,
    popular: false,
    highlight: true,
    buttonText: "Assinar Business",
    buttonStyle: "bg-navy text-gold hover:bg-cobalt",
    features: [
      "Tudo do Pro",
      "Anúncios em destaque",
      "Badge \"Verificado\"",
      "1 publicação patrocinada/mês",
      "Relatório de visualizações",
      "Suporte prioritário",
      "Perfil comercial",
    ],
    featureStyle: "text-navy font-semibold",
    checkStyle: "text-navy",
  },
  {
    id: "enterprise",
    name: "Empresarial",
    icon: Building2,
    description: "Para empresas e agências",
    monthly: 39.99,
    annual: 399.90,
    popular: false,
    highlight: false,
    buttonText: "Assinar Empresarial",
    buttonStyle: "border border-gold/30 bg-white/5 text-gold hover:bg-gold/10",
    features: [
      "Tudo do Business",
      "Até 5 usuários na conta",
      "Banner publicitário (1 posição)",
      "Conteúdo patrocinado ilimitado",
      "Painel de métricas avançado",
      "Gerente de conta dedicado",
      "Logo na seção \"Parceiros\"",
      "API de integração",
    ],
    featureStyle: "text-white",
    checkStyle: "text-gold",
  },
];

function formatPrice(value: number) {
  if (value === 0) return "0";
  return value.toFixed(2).replace(".", ",");
}

export function PricingGrid() {
  const [annual, setAnnual] = useState(false);

  return (
    <div>
      {/* TOGGLE */}
      <div className="mb-10 flex items-center justify-center gap-4">
        <span className={`text-sm font-semibold ${!annual ? "text-white" : "text-zinc-500"}`}>
          Mensal
        </span>
        <button
          onClick={() => setAnnual(!annual)}
          className={`relative h-8 w-14 rounded-full transition ${
            annual ? "bg-gold" : "bg-white/20"
          }`}
        >
          <div
            className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-md transition-all ${
              annual ? "left-7" : "left-1"
            }`}
          />
        </button>
        <span className={`text-sm font-semibold ${annual ? "text-white" : "text-zinc-500"}`}>
          Anual
        </span>
        {annual && (
          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-400">
            Economize 2 meses
          </span>
        )}
      </div>

      {/* GRID */}
      <div className="grid gap-5 lg:grid-cols-4">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const price = annual ? plan.annual : plan.monthly;
          const period = annual ? "/ano" : "/mês";
          const isHighlight = plan.highlight;

          return (
            <div
              key={plan.id}
              className={`relative overflow-hidden rounded-[32px] p-7 transition ${
                isHighlight
                  ? "bg-gold"
                  : "border border-white/10 bg-white/5"
              } ${plan.popular && !isHighlight ? "border-gold/30" : ""}`}
            >
              {plan.popular && (
                <div className={`absolute right-5 top-5 rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-widest ${
                  isHighlight
                    ? "bg-navy text-gold"
                    : "bg-gold/20 text-gold"
                }`}>
                  Mais popular
                </div>
              )}

              {/* ICON + NAME */}
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                isHighlight ? "bg-navy/10" : "bg-white/10"
              }`}>
                <Icon size={20} className={isHighlight ? "text-navy" : "text-gold"} />
              </div>

              <h3 className={`mt-4 text-lg font-black ${isHighlight ? "text-navy" : "text-white"}`}>
                {plan.name}
              </h3>
              <p className={`mt-1 text-xs ${isHighlight ? "text-navy/60" : "text-zinc-500"}`}>
                {plan.description}
              </p>

              {/* PRICE */}
              <div className="mt-5 flex items-end gap-1">
                <span className={`text-[11px] ${isHighlight ? "text-navy/60" : "text-zinc-500"}`}>
                  R$
                </span>
                <span className={`text-4xl font-black ${isHighlight ? "text-navy" : "text-white"}`}>
                  {formatPrice(price)}
                </span>
                {price > 0 && (
                  <span className={`mb-1 text-sm ${isHighlight ? "text-navy/60" : "text-zinc-500"}`}>
                    {period}
                  </span>
                )}
              </div>

              {annual && price > 0 && (
                <p className={`mt-1 text-[11px] ${isHighlight ? "text-navy/60" : "text-zinc-500"}`}>
                  Equivale a R${formatPrice(plan.annual / 12)}/mês
                </p>
              )}

              {/* FEATURES */}
              <ul className="mt-6 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className={`flex items-start gap-2.5 text-[13px] ${plan.featureStyle}`}>
                    <CheckCircle2 size={14} className={`mt-0.5 shrink-0 ${plan.checkStyle}`} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* BUTTON */}
              <button className={`mt-8 w-full rounded-2xl py-3.5 text-sm font-black transition ${plan.buttonStyle}`}>
                {plan.buttonText}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
