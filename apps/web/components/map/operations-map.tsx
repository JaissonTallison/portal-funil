import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  CloudRain,
  Droplets,
  Radio,
  ThermometerSun,
  TrafficCone,
  Wind,
  Zap,
} from "lucide-react";

const zones = [
  { name: "Zona Norte", incidents: 23, level: "alto", color: "bg-red-500", ring: "ring-red-500/30", text: "text-red-400", x: "50%", y: "8%" },
  { name: "Zona Leste", incidents: 14, level: "médio", color: "bg-orange-400", ring: "ring-orange-400/30", text: "text-orange-400", x: "80%", y: "38%" },
  { name: "Centro",     incidents: 9,  level: "médio", color: "bg-yellow-400", ring: "ring-yellow-400/30", text: "text-yellow-400", x: "50%", y: "50%" },
  { name: "Zona Sul",   incidents: 5,  level: "normal", color: "bg-emerald-400", ring: "ring-emerald-400/30", text: "text-emerald-400", x: "50%", y: "85%" },
  { name: "Zona Oeste", incidents: 7,  level: "médio", color: "bg-orange-400", ring: "ring-orange-400/30", text: "text-orange-400", x: "18%", y: "52%" },
  { name: "Adrianópolis", incidents: 3, level: "normal", color: "bg-emerald-400", ring: "ring-emerald-400/30", text: "text-emerald-400", x: "70%", y: "22%" },
  { name: "Ponta Negra", incidents: 2, level: "normal", color: "bg-emerald-400", ring: "ring-emerald-400/30", text: "text-emerald-400", x: "20%", y: "72%" },
];

const roads = [
  { name: "Av. Djalma Batista", level: "Intenso", pct: 85, color: "bg-red-500" },
  { name: "Av. Autaz Mirim",    level: "Moderado", pct: 52, color: "bg-orange-400" },
  { name: "Av. das Torres",     level: "Livre",    pct: 22, color: "bg-emerald-500" },
  { name: "AM-010",             level: "Moderado", pct: 48, color: "bg-orange-400" },
];

const incidents = [
  { icon: AlertTriangle, text: "Acidente Djalma Batista km 4",   time: "4min",  color: "text-red-400",    bg: "bg-red-500/10" },
  { icon: CloudRain,     text: "Alagamento Zona Norte",           time: "11min", color: "text-sky-400",    bg: "bg-sky-500/10" },
  { icon: Zap,           text: "Queda de energia Aleixo",         time: "22min", color: "text-yellow-400", bg: "bg-yellow-500/10" },
  { icon: AlertTriangle, text: "Ocorrência policial no Centro",   time: "31min", color: "text-red-400",    bg: "bg-red-500/10" },
  { icon: TrafficCone,   text: "Bloqueio na AM-010 km 12",        time: "43min", color: "text-orange-400", bg: "bg-orange-500/10" },
  { icon: Activity,      text: "Sensor offline em Adrianópolis",  time: "58min", color: "text-purple-400", bg: "bg-purple-500/10" },
];

export function OperationsMap() {
  return (
    <section className="relative px-6 pb-16">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-black uppercase tracking-[0.35em] text-gold-dark">
                OPERATIONS MAP
              </span>
            </div>
            <h2 className="mt-4 text-5xl font-black tracking-[-0.05em] text-navy">
              Central operacional urbana
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-slate-500">
              Monitoramento inteligente em tempo real com sensores, clima,
              ocorrências e tráfego urbano de Manaus.
            </p>
          </div>

          {/* LEGEND */}
          <div className="hidden items-center gap-5 lg:flex">
            {[
              { color: "bg-red-500", label: "Alto" },
              { color: "bg-orange-400", label: "Médio" },
              { color: "bg-emerald-400", label: "Normal" },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
                <span className="text-sm font-semibold text-slate-500">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">

          {/* ── MAP ── */}
          <div className="relative flex flex-col overflow-hidden rounded-[40px] border border-white/5 bg-navy shadow-[0_24px_80px_rgba(2,6,23,0.3)]">

            {/* ambient glows */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-[15%] top-[10%] h-[320px] w-[320px] rounded-full bg-gold/8 blur-[120px]" />
              <div className="absolute bottom-[-60px] right-[-60px] h-[260px] w-[260px] rounded-full bg-[#1E3A8A]/20 blur-[100px]" />
            </div>

            {/* dot grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            <div className="relative z-10 flex flex-1 flex-col p-8">
              {/* top bar */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-[0.3em] text-gold">
                    Manaus — AM • Realtime
                  </span>
                  <h3 className="mt-2 text-3xl font-black text-white">
                    Radar operacional
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    <span className="text-[11px] font-black text-emerald-400">ONLINE</span>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10">
                    <Radio size={22} className="text-gold" />
                  </div>
                </div>
              </div>

              {/* MAP AREA */}
              <div className="relative mt-7 h-[480px] overflow-hidden rounded-[28px] border border-white/5 bg-[#060E1E]">

                {/* coordinate grid lines */}
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                  }}
                />

                {/* RADAR RINGS — centered */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  {/* outer ring */}
                  <div className="h-[360px] w-[360px] rounded-full border border-gold/10" />
                  {/* mid ring */}
                  <div className="absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/15" />
                  {/* inner ring */}
                  <div className="absolute left-1/2 top-1/2 h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20" />

                  {/* SWEEP — conic gradient that spins */}
                  <div
                    className="animate-radar-sweep absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      background:
                        "conic-gradient(from 0deg, transparent 0deg, rgba(244,197,66,0.18) 50deg, transparent 50deg)",
                    }}
                  />

                  {/* cross hairs */}
                  <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gold/8" />
                  <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gold/8" />

                  {/* CENTER DOT */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="animate-radar-ping absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/30" />
                    <div className="relative h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_20px_#F4C542]" />
                  </div>
                </div>

                {/* ZONE DOTS */}
                {zones.map((zone) => (
                  <div
                    key={zone.name}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: zone.x, top: zone.y }}
                  >
                    {/* ping ring */}
                    <div className={`absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full ${zone.color} opacity-30 animate-radar-ping`} />
                    {/* dot */}
                    <div className={`relative h-3 w-3 rounded-full ${zone.color} shadow-[0_0_12px_currentColor]`} />
                    {/* label */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap">
                      <span className={`text-[10px] font-black ${zone.text}`}>{zone.name}</span>
                      <span className="ml-1.5 text-[9px] text-white/40">{zone.incidents} ocorr.</span>
                    </div>
                  </div>
                ))}

                {/* COMPASS */}
                {[
                  { label: "N", pos: "top-3 left-1/2 -translate-x-1/2" },
                  { label: "S", pos: "bottom-3 left-1/2 -translate-x-1/2" },
                  { label: "L", pos: "right-3 top-1/2 -translate-y-1/2" },
                  { label: "O", pos: "left-3 top-1/2 -translate-y-1/2" },
                ].map(({ label, pos }) => (
                  <span
                    key={label}
                    className={`absolute text-[11px] font-black text-white/20 ${pos}`}
                  >
                    {label}
                  </span>
                ))}

                {/* BOTTOM STATUS */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-white/30">
                    {zones.reduce((s, z) => s + z.incidents, 0)} ocorrências monitoradas
                  </span>
                  <span className="text-[10px] font-semibold tabular-nums text-white/30">
                    Atualizado agora
                  </span>
                </div>
              </div>

              {/* OPERATIONAL STATS */}
              <div className="mt-6 grid grid-cols-4 gap-3">
                {[
                  { label: "Sensores online", value: "147", sub: "de 162 ativos", color: "text-emerald-400" },
                  { label: "Viaturas campo", value: "24", sub: "em operação", color: "text-gold" },
                  { label: "Zonas em alerta", value: "03", sub: "nível alto/médio", color: "text-red-400" },
                  { label: "Tempo de resp.", value: "7min", sub: "média última hora", color: "text-sky-400" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4 text-center">
                    <div className={`text-2xl font-black tabular-nums ${stat.color}`}>{stat.value}</div>
                    <div className="mt-1.5 text-[10px] font-black uppercase tracking-wide text-white/40">{stat.label}</div>
                    <div className="mt-0.5 text-[9px] text-white/20">{stat.sub}</div>
                  </div>
                ))}
              </div>

              {/* INCIDENT FEED */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40">
                    Últimas ocorrências
                  </span>
                  <span className="text-[10px] font-semibold text-white/30">
                    {incidents.length} registradas
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {incidents.map(({ icon: Icon, text, time, color, bg }) => (
                    <div
                      key={text}
                      className={`flex items-center gap-3 rounded-2xl border border-white/5 ${bg} px-4 py-3`}
                    >
                      <Icon size={15} className={`shrink-0 ${color}`} />
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-white/80">{text}</p>
                        <span className="text-[10px] text-white/30">{time} atrás</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="space-y-5">

            {/* TRAFFIC */}
            <div className="rounded-[32px] border border-black/5 bg-white p-7 shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50">
                  <TrafficCone size={20} className="text-orange-500" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    TRÁFEGO
                  </span>
                  <h3 className="text-lg font-black text-navy">Vias monitoradas</h3>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {roads.map((road) => (
                  <div key={road.name}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-navy">{road.name}</span>
                      <span className={`text-xs font-black ${
                        road.level === "Intenso" ? "text-red-500" :
                        road.level === "Moderado" ? "text-orange-500" : "text-emerald-600"
                      }`}>{road.level}</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${road.color} transition-all duration-700`}
                        style={{ width: `${road.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WEATHER */}
            <div className="overflow-hidden rounded-[32px] border border-black/5 bg-white p-7 shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50">
                  <ThermometerSun size={20} className="text-sky-500" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    CLIMA
                  </span>
                  <h3 className="text-lg font-black text-navy">Manaus agora</h3>
                </div>
              </div>

              <div className="mt-5 flex items-end gap-3">
                <span className="text-6xl font-black tracking-[-0.06em] text-navy">29°C</span>
                <span className="mb-2 text-sm text-slate-400">Parcialmente nublado</span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { icon: Droplets, label: "Umidade", value: "84%" },
                  { icon: Wind,     label: "Vento",   value: "12 km/h" },
                  { icon: CloudRain,label: "Chuva",   value: "Possível" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-2xl bg-slate-50 p-3 text-center">
                    <Icon size={16} className="mx-auto text-sky-400" />
                    <span className="mt-2 block text-[10px] text-slate-400">{label}</span>
                    <span className="block text-xs font-black text-navy">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* REGIONS */}
            <div className="rounded-[32px] border border-black/5 bg-white p-7 shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/10">
                  <Activity size={20} className="text-gold-dark" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    SENSORES
                  </span>
                  <h3 className="text-lg font-black text-navy">Regiões ativas</h3>
                </div>
              </div>

              <div className="mt-5 space-y-2.5">
                {zones.slice(0, 5).map((zone) => (
                  <div
                    key={zone.name}
                    className="flex items-center justify-between rounded-2xl border border-black/5 bg-slate-50 px-4 py-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`h-2 w-2 rounded-full ${zone.color}`} />
                      <span className="text-sm font-semibold text-navy">{zone.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">{zone.incidents} ocorr.</span>
                      {zone.level === "normal" ? (
                        <CheckCircle2 size={14} className="text-emerald-500" />
                      ) : (
                        <AlertTriangle size={14} className={zone.level === "alto" ? "text-red-500" : "text-orange-400"} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
