"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";
import { apiPut, apiUpload, API_URL, MEDIA_URL } from "@/lib/api";

const EVENT_CATEGORIES = [
  { value: "show", label: "Show" }, { value: "festival", label: "Festival" },
  { value: "teatro", label: "Teatro" }, { value: "exposicao", label: "Exposição" },
  { value: "gastronomia", label: "Gastronomia" }, { value: "cultura", label: "Cultura" },
  { value: "esporte", label: "Esporte" }, { value: "turismo", label: "Turismo" },
  { value: "feria", label: "Feira" }, { value: "outro", label: "Outro" },
];

type ApiEvent = {
  id: string; title: string; description: string; category: string;
  startDate: string; endDate?: string; time?: string; venue: string;
  neighborhood?: string; address?: string; price?: string; isFree: boolean;
  image: string; ageRating?: string; organizer?: string;
  isHighlighted: boolean; isSponsored: boolean; sponsor?: string; tags: string[];
};

export default function EditarEventoPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [form, setForm] = useState({
    title: "", description: "", category: "", startDate: "",
    endDate: "", time: "", venue: "", neighborhood: "", address: "",
    price: "", isFree: false, image: "", ageRating: "", organizer: "",
    isHighlighted: false, isSponsored: false, sponsor: "", tags: "",
  });

  useEffect(() => {
    fetch(`${API_URL}/events?limit=200`)
      .then((r) => r.json())
      .then((d: { items: ApiEvent[] }) => {
        const ev = d.items.find((e) => e.id === id);
        if (ev) {
          setForm({
            title: ev.title, description: ev.description, category: ev.category,
            startDate: ev.startDate.split("T")[0],
            endDate: ev.endDate ? ev.endDate.split("T")[0] : "",
            time: ev.time ?? "", venue: ev.venue,
            neighborhood: ev.neighborhood ?? "", address: ev.address ?? "",
            price: ev.price ?? "", isFree: ev.isFree, image: ev.image,
            ageRating: ev.ageRating ?? "", organizer: ev.organizer ?? "",
            isHighlighted: ev.isHighlighted, isSponsored: ev.isSponsored,
            sponsor: ev.sponsor ?? "", tags: ev.tags.join(", "),
          });
          setImagePreview(ev.image);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  function set(key: string, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await apiUpload<{ url: string }>("/upload/event", fd);
      const full = `${MEDIA_URL}${res.url}`;
      set("image", full);
      setImagePreview(full);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro no upload");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await apiPut(`/events/${id}`, {
        ...form,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        endDate: form.endDate || undefined,
        time: form.time || undefined,
        neighborhood: form.neighborhood || undefined,
        address: form.address || undefined,
        price: form.isFree ? undefined : form.price || undefined,
        ageRating: form.ageRating || undefined,
        organizer: form.organizer || undefined,
      });
      router.push("/admin/eventos");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="flex h-full items-center justify-center p-16"><div className="h-6 w-6 animate-spin rounded-full border-2 border-cobalt border-t-transparent" /></div>;

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/eventos" className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-cobalt"><ArrowLeft size={18} /></Link>
        <h1 className="text-2xl font-black text-cobalt">Editar Evento</h1>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-6">
        <div className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-sm font-black uppercase tracking-wide text-slate-500">Informações básicas</h2>
          <div className="space-y-4">
            <Field label="Título *"><input type="text" value={form.title} onChange={(e) => set("title", e.target.value)} className="input-admin" required /></Field>
            <Field label="Descrição *"><textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} className="input-admin resize-none" required /></Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Categoria *">
                <select value={form.category} onChange={(e) => set("category", e.target.value)} className="input-admin" required>
                  <option value="">Selecione...</option>
                  {EVENT_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </Field>
              <Field label="Organizador"><input type="text" value={form.organizer} onChange={(e) => set("organizer", e.target.value)} className="input-admin" /></Field>
            </div>
          </div>
        </div>

        <div className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-sm font-black uppercase tracking-wide text-slate-500">Data e local</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Field label="Data início *"><input type="date" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} className="input-admin" required /></Field>
              <Field label="Data fim"><input type="date" value={form.endDate} onChange={(e) => set("endDate", e.target.value)} className="input-admin" /></Field>
              <Field label="Horário"><input type="text" value={form.time} onChange={(e) => set("time", e.target.value)} placeholder="19h00" className="input-admin" /></Field>
            </div>
            <Field label="Local *"><input type="text" value={form.venue} onChange={(e) => set("venue", e.target.value)} className="input-admin" required /></Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Bairro"><input type="text" value={form.neighborhood} onChange={(e) => set("neighborhood", e.target.value)} className="input-admin" /></Field>
              <Field label="Endereço"><input type="text" value={form.address} onChange={(e) => set("address", e.target.value)} className="input-admin" /></Field>
            </div>
          </div>
        </div>

        <div className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-sm font-black uppercase tracking-wide text-slate-500">Imagem</h2>
          <div className="flex items-start gap-4">
            {imagePreview ? <img src={imagePreview} alt="" className="h-24 w-40 rounded-xl object-cover" /> : <div className="flex h-24 w-40 items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400"><Upload size={20} /></div>}
            <div className="space-y-2">
              <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
                <Upload size={14} /> Upload
                <input type="file" accept=".jpg,.jpeg,.png,.webp" onChange={handleImageUpload} className="hidden" />
              </label>
              <input type="url" value={form.image} onChange={(e) => { set("image", e.target.value); setImagePreview(e.target.value); }} placeholder="URL da imagem" className="input-admin text-xs" />
            </div>
          </div>
        </div>

        <div className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-sm font-black uppercase tracking-wide text-slate-500">Preço e configurações</h2>
          <div className="space-y-4">
            <Toggle label="Entrada gratuita" checked={form.isFree} onChange={(v) => set("isFree", v)} />
            {!form.isFree && <Field label="Valor"><input type="text" value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="Ex: R$ 40,00" className="input-admin" /></Field>}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Classificação etária"><input type="text" value={form.ageRating} onChange={(e) => set("ageRating", e.target.value)} placeholder="Livre, +12, +18" className="input-admin" /></Field>
              <Field label="Tags"><input type="text" value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="rock, ao ar livre" className="input-admin" /></Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Toggle label="Destaque" checked={form.isHighlighted} onChange={(v) => set("isHighlighted", v)} />
              <Toggle label="Patrocinado" checked={form.isSponsored} onChange={(v) => set("isSponsored", v)} />
            </div>
            {form.isSponsored && <Field label="Patrocinador"><input type="text" value={form.sponsor} onChange={(e) => set("sponsor", e.target.value)} className="input-admin" /></Field>}
          </div>
        </div>

        {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>}

        <div className="flex justify-end gap-3 pb-8">
          <Link href="/admin/eventos" className="rounded-2xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50">Cancelar</Link>
          <button type="submit" disabled={saving} className="flex items-center gap-2 rounded-2xl bg-cobalt px-6 py-3 text-sm font-black text-white transition hover:bg-cobalt disabled:opacity-60">
            {saving ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : "Salvar alterações"}
          </button>
        </div>
      </form>

      <style jsx global>{`.input-admin { width: 100%; border-radius: 12px; border: 1px solid #e2e8f0; background: #f8fafc; padding: 10px 14px; font-size: 0.875rem; color: #071426; outline: none; transition: border-color 0.15s; } .input-admin:focus { border-color: rgba(202,163,94,0.4); background: white; }`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="mb-1.5 block text-xs font-bold text-cobalt">{label}</label>{children}</div>;
}
function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <div onClick={() => onChange(!checked)} className={`relative h-5 w-9 rounded-full transition ${checked ? "bg-cobalt" : "bg-slate-200"}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-4" : "translate-x-0.5"}`} />
      </div>
      <span className="text-sm font-semibold text-slate-700">{label}</span>
    </label>
  );
}
