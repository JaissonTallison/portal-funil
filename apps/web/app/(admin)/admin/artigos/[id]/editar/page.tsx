"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { apiPut, apiUpload, API_URL, MEDIA_URL } from "@/lib/api";

type Category = { id: string; name: string };
type Article = {
  id: string; title: string; description: string; content: string;
  image: string; status: string; readTime: number;
  isLive: boolean; isFeatured: boolean; isSponsored: boolean; sponsor: string | null;
  category: { id: string }; authorId: string;
};

export default function EditarArtigoPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [form, setForm] = useState({
    title: "", description: "", content: "", image: "",
    categoryId: "", readTime: "3", status: "DRAFT",
    isLive: false, isFeatured: false, isSponsored: false, sponsor: "",
  });

  useEffect(() => {
    if (!user) return;
    Promise.all([
      fetch(`${API_URL}/categories`).then((r) => r.json()),
      fetch(`${API_URL}/articles/admin/all`, { credentials: 'include' })
        .then((r) => r.json())
        .then((d: { items: Article[] }) => d.items.find((a) => a.id === id)),
    ]).then(([cats, article]) => {
      setCategories(cats);
      if (article) {
        setForm({
          title: article.title,
          description: article.description,
          content: article.content,
          image: article.image,
          categoryId: article.category.id,
          readTime: String(article.readTime),
          status: article.status,
          isLive: article.isLive,
          isFeatured: article.isFeatured,
          isSponsored: article.isSponsored,
          sponsor: article.sponsor ?? "",
        });
        setImagePreview(article.image);
      }
    }).finally(() => setLoading(false));
  }, [user, id]);

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
      await apiPut(`/articles/${id}`, { ...form, readTime: parseInt(form.readTime) });
      router.push("/admin/artigos");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="flex h-full items-center justify-center p-16"><div className="h-6 w-6 animate-spin rounded-full border-2 border-navy border-t-transparent" /></div>;
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/artigos" className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-navy">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-2xl font-black text-navy">Editar Artigo</h1>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-6">
        <div className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-sm font-black uppercase tracking-wide text-slate-500">Informações principais</h2>
          <div className="space-y-4">
            <Field label="Título *">
              <input type="text" value={form.title} onChange={(e) => set("title", e.target.value)} className="input-admin" required />
            </Field>
            <Field label="Resumo *">
              <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={2} className="input-admin resize-none" required />
            </Field>
            <div className="grid grid-cols-3 gap-4">
              <Field label="Categoria *">
                <select value={form.categoryId} onChange={(e) => set("categoryId", e.target.value)} className="input-admin" required>
                  <option value="">Selecione...</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </Field>
              <Field label="Status">
                <select value={form.status} onChange={(e) => set("status", e.target.value)} className="input-admin">
                  <option value="DRAFT">Rascunho</option>
                  <option value="REVIEW">Em revisão</option>
                  {(user?.role === "ADMIN" || user?.role === "EDITOR") && <option value="PUBLISHED">Publicado</option>}
                  <option value="ARCHIVED">Arquivado</option>
                </select>
              </Field>
              <Field label="Leitura (min)">
                <input type="number" min={1} max={60} value={form.readTime} onChange={(e) => set("readTime", e.target.value)} className="input-admin" required />
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
              <div className="flex h-24 w-40 items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400"><Upload size={20} /></div>
            )}
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
          <h2 className="mb-5 text-sm font-black uppercase tracking-wide text-slate-500">Conteúdo</h2>
          <textarea value={form.content} onChange={(e) => set("content", e.target.value)} rows={14} className="input-admin resize-y font-mono text-sm" required />
        </div>

        <div className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-sm font-black uppercase tracking-wide text-slate-500">Configurações</h2>
          <div className="grid grid-cols-3 gap-4">
            <Toggle label="Ao vivo" checked={form.isLive} onChange={(v) => set("isLive", v)} />
            <Toggle label="Destaque" checked={form.isFeatured} onChange={(v) => set("isFeatured", v)} />
            <Toggle label="Patrocinado" checked={form.isSponsored} onChange={(v) => set("isSponsored", v)} />
          </div>
          {form.isSponsored && (
            <div className="mt-4"><Field label="Patrocinador"><input type="text" value={form.sponsor} onChange={(e) => set("sponsor", e.target.value)} className="input-admin" /></Field></div>
          )}
        </div>

        {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>}

        <div className="flex justify-end gap-3 pb-8">
          <Link href="/admin/artigos" className="rounded-2xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50">Cancelar</Link>
          <button type="submit" disabled={saving} className="flex items-center gap-2 rounded-2xl bg-navy px-6 py-3 text-sm font-black text-white transition hover:bg-cobalt disabled:opacity-60">
            {saving ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : "Salvar alterações"}
          </button>
        </div>
      </form>

      <style jsx global>{`.input-admin { width: 100%; border-radius: 12px; border: 1px solid #e2e8f0; background: #f8fafc; padding: 10px 14px; font-size: 0.875rem; color: #071426; outline: none; transition: border-color 0.15s, background-color 0.15s; } .input-admin:focus { border-color: rgba(202,163,94,0.4); background: white; }`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="mb-1.5 block text-xs font-bold text-navy">{label}</label>{children}</div>;
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <div onClick={() => onChange(!checked)} className={`relative h-5 w-9 rounded-full transition ${checked ? "bg-navy" : "bg-slate-200"}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-4" : "translate-x-0.5"}`} />
      </div>
      <span className="text-sm font-semibold text-slate-700">{label}</span>
    </label>
  );
}
