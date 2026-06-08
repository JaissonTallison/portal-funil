"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { apiPost, apiPut, apiDelete, API_URL } from "@/lib/api";

type Category = { id: string; name: string; slug: string };

export default function AdminCategoriasPage() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/categories`);
      const data: Category[] = await res.json();
      setCategories(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function slugify(text: string) {
    return text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
  }

  async function handleCreate() {
    if (!newName.trim() || !newSlug.trim()) return;
    setError("");
    setSaving(true);
    try {
      await apiPost("/categories", { name: newName.trim(), slug: newSlug.trim() });
      setNewName("");
      setNewSlug("");
      setCreating(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar");
    } finally {
      setSaving(false);
    }
  }

  function startEdit(cat: Category) {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditSlug(cat.slug);
    setError("");
  }

  async function handleUpdate() {
    if (!editingId) return;
    setError("");
    setSaving(true);
    try {
      await apiPut(`/categories/${editingId}`, { name: editName, slug: editSlug });
      setEditingId(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Excluir categoria "${name}"? Esta ação falhará se houver artigos vinculados.`)) return;
    setDeleting(id);
    try {
      await apiDelete(`/categories/${id}`);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao excluir");
    } finally {
      setDeleting(null);
    }
  }

  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-navy">Categorias</h1>
          <p className="mt-1 text-sm text-slate-500">{categories.length} categorias cadastradas</p>
        </div>
        <button
          onClick={() => { setCreating(true); setError(""); }}
          className="flex items-center gap-2 rounded-2xl bg-navy px-5 py-2.5 text-sm font-bold text-white transition hover:bg-cobalt"
        >
          <Plus size={16} />
          Nova categoria
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</div>
      )}

      <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-navy border-t-transparent" />
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Nome</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Slug</th>
                <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-500">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* CREATE ROW */}
              {creating && (
                <tr className="bg-gold/5">
                  <td className="px-5 py-3">
                    <input
                      autoFocus
                      type="text"
                      value={newName}
                      onChange={(e) => { setNewName(e.target.value); setNewSlug(slugify(e.target.value)); }}
                      placeholder="Nome da categoria"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-gold/40"
                    />
                  </td>
                  <td className="px-5 py-3">
                    <input
                      type="text"
                      value={newSlug}
                      onChange={(e) => setNewSlug(e.target.value)}
                      placeholder="slug-da-categoria"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 font-mono text-sm outline-none focus:border-gold/40"
                    />
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={handleCreate}
                        disabled={saving}
                        className="rounded-lg p-1.5 text-emerald-600 transition hover:bg-emerald-50 disabled:opacity-40"
                        title="Salvar"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => { setCreating(false); setNewName(""); setNewSlug(""); }}
                        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100"
                        title="Cancelar"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )}

              {categories.map((cat) => (
                <tr key={cat.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-3">
                    {editingId === cat.id ? (
                      <input
                        autoFocus
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-gold/40"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-navy">{cat.name}</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    {editingId === cat.id ? (
                      <input
                        type="text"
                        value={editSlug}
                        onChange={(e) => setEditSlug(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 font-mono text-sm outline-none focus:border-gold/40"
                      />
                    ) : (
                      <span className="font-mono text-sm text-slate-500">{cat.slug}</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {editingId === cat.id ? (
                        <>
                          <button onClick={handleUpdate} disabled={saving} className="rounded-lg p-1.5 text-emerald-600 transition hover:bg-emerald-50 disabled:opacity-40">
                            <Check size={15} />
                          </button>
                          <button onClick={() => setEditingId(null)} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100">
                            <X size={15} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEdit(cat)} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-navy" title="Editar">
                            <Pencil size={15} />
                          </button>
                          {isAdmin && (
                            <button onClick={() => handleDelete(cat.id, cat.name)} disabled={deleting === cat.id} className="rounded-lg p-1.5 text-red-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-40" title="Excluir">
                              <Trash2 size={15} />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <p className="mt-4 text-xs text-slate-400">
        * Categorias com artigos vinculados não podem ser excluídas.
      </p>
    </div>
  );
}
