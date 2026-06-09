"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import { apiPost, apiUpload, API_URL, MEDIA_URL } from "@/lib/api";

type Category = { id: string; name: string };

export default function NovoArtigoPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    image: "",
    categoryId: "",
    readTime: "3",
    isLive: false,
    isFeatured: false,
    isSponsored: false,
    sponsor: "",
    status: "DRAFT",
  });

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => {});
  }, []);

  function set(key: string, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await apiUpload<{ url: string }>("/upload/article", fd);
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
      await apiPost("/articles", {
        ...form,
        readTime: parseInt(form.readTime),
      });
      router.push("/admin/artigos");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/artigos" className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-cobalt">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-2xl font-black text-cobalt">Novo Artigo</h1>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-6">
        <div className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-sm font-black uppercase tracking-wide text-slate-500">Informações principais</h2>
          <div className="space-y-4">
            <Field label="Título *">
              <input
                type="text"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Título do artigo"
                className="input-admin"
                required
              />
            </Field>

            <Field label="Resumo *">
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Breve descrição que aparece nos cards"
                rows={2}
                className="input-admin resize-none"
                required
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Categoria *">
                <select
                  value={form.categoryId}
                  onChange={(e) => set("categoryId", e.target.value)}
                  className="input-admin"
                  required
                >
                  <option value="">Selecione...</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Tempo de leitura (min) *">
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={form.readTime}
                  onChange={(e) => set("readTime", e.target.value)}
                  className="input-admin"
                  required
                />
              </Field>
            </div>
          </div>
        </div>

        <div className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-sm font-black uppercase tracking-wide text-slate-500">Imagem destacada</h2>
          <div className="flex items-start gap-4">
            {imagePreview ? (
              <img src={imagePreview} alt="" className="h-24 w-40 rounded-xl object-cover" />
            ) : (
              <div className="flex h-24 w-40 items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400">
                <Upload size={20} />
              </div>
            )}
            <div className="space-y-2">
              <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
                <Upload size={14} />
                Upload de arquivo
                <input type="file" accept=".jpg,.jpeg,.png,.webp" onChange={handleImageUpload} className="hidden" />
              </label>
              <p className="text-xs text-slate-400">ou</p>
              <input
                type="url"
                value={form.image}
                onChange={(e) => { set("image", e.target.value); setImagePreview(e.target.value); }}
                placeholder="URL da imagem"
                className="input-admin text-xs"
              />
            </div>
          </div>
        </div>

        <div className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-sm font-black uppercase tracking-wide text-slate-500">Conteúdo</h2>
          <textarea
            value={form.content}
            onChange={(e) => set("content", e.target.value)}
            placeholder="Conteúdo do artigo (parágrafos separados por linha em branco)"
            rows={14}
            className="input-admin resize-y font-mono text-sm"
            required
          />
          <p className="mt-2 text-xs text-slate-400">Separe os parágrafos com uma linha em branco.</p>
        </div>

        <div className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-sm font-black uppercase tracking-wide text-slate-500">Configurações</h2>
          <div className="grid grid-cols-3 gap-4">
            <Toggle label="Ao vivo" checked={form.isLive} onChange={(v) => set("isLive", v)} />
            <Toggle label="Destaque" checked={form.isFeatured} onChange={(v) => set("isFeatured", v)} />
            <Toggle label="Patrocinado" checked={form.isSponsored} onChange={(v) => set("isSponsored", v)} />
          </div>
          {form.isSponsored && (
            <div className="mt-4">
              <Field label="Nome do patrocinador">
                <input
                  type="text"
                  value={form.sponsor}
                  onChange={(e) => set("sponsor", e.target.value)}
                  placeholder="Ex: Empresa XYZ"
                  className="input-admin"
                />
              </Field>
            </div>
          )}
        </div>

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>
        )}

        <div className="flex justify-end gap-3 pb-8">
          <Link href="/admin/artigos" className="rounded-2xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50">
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-2xl bg-cobalt px-6 py-3 text-sm font-black text-white transition hover:bg-cobalt disabled:opacity-60"
          >
            {saving ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : "Salvar rascunho"}
          </button>
        </div>
      </form>

      <style jsx global>{`
        .input-admin {
          width: 100%;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          padding: 10px 14px;
          font-size: 0.875rem;
          color: #071426;
          outline: none;
          transition: border-color 0.15s, background-color 0.15s;
        }
        .input-admin:focus {
          border-color: rgba(202, 163, 94, 0.4);
          background: white;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold text-cobalt">{label}</label>
      {children}
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <div
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-9 rounded-full transition ${checked ? "bg-cobalt" : "bg-slate-200"}`}
      >
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-4" : "translate-x-0.5"}`} />
      </div>
      <span className="text-sm font-semibold text-slate-700">{label}</span>
    </label>
  );
}
