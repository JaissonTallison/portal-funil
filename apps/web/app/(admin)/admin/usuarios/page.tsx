"use client";

import { useEffect, useState, useCallback } from "react";
import { Shield, UserCheck, UserX } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { apiPatch, API_URL } from "@/lib/api";

type User = {
  id: string; name: string; email: string;
  role: "ADMIN" | "EDITOR" | "JOURNALIST" | "READER";
  isActive: boolean; createdAt: string;
};

const ROLE_CONFIG: Record<string, { label: string; color: string }> = {
  ADMIN:      { label: "Admin",      color: "bg-navy text-white" },
  EDITOR:     { label: "Editor",     color: "bg-cobalt/10 text-cobalt" },
  JOURNALIST: { label: "Jornalista", color: "bg-gold/10 text-yellow-700" },
  READER:     { label: "Leitor",     color: "bg-slate-100 text-slate-500" },
};

const ROLES = ["ADMIN", "EDITOR", "JOURNALIST", "READER"] as const;

export default function AdminUsuariosPage() {
  const { user: me } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/users`, { credentials: "include" });
      const data: User[] = await res.json();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleRoleChange(id: string, role: string) {
    if (id === me?.id && role !== "ADMIN") {
      setError("Você não pode rebaixar sua própria conta.");
      return;
    }
    setError("");
    setSaving(id);
    try {
      const updated = await apiPatch<User>(`/users/${id}/role`, { role });
      setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao alterar role");
    } finally {
      setSaving(null);
    }
  }

  const isAdmin = me?.role === "ADMIN";

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-navy">Usuários</h1>
          <p className="mt-1 text-sm text-slate-500">{users.length} contas cadastradas</p>
        </div>
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
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">E-mail</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Perfil</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Membro desde</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => {
                const rc = ROLE_CONFIG[u.role] ?? ROLE_CONFIG.READER;
                const isSelf = u.id === me?.id;
                return (
                  <tr key={u.id} className="transition hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-navy/5 text-xs font-black text-navy">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-semibold text-navy">
                          {u.name}{isSelf && <span className="ml-1 text-xs text-slate-400">(você)</span>}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">{u.email}</td>
                    <td className="px-5 py-4">
                      <span className={`flex items-center gap-1.5 w-fit rounded-lg px-2.5 py-1 text-xs font-bold ${u.isActive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                        {u.isActive ? <UserCheck size={11} /> : <UserX size={11} />}
                        {u.isActive ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {isAdmin && !isSelf ? (
                        <select
                          value={u.role}
                          disabled={saving === u.id}
                          onChange={(e) => handleRoleChange(u.id, e.target.value)}
                          className={`rounded-lg border-0 px-3 py-1.5 text-xs font-bold outline-none cursor-pointer disabled:opacity-50 ${rc.color}`}
                        >
                          {ROLES.map((r) => (
                            <option key={r} value={r} className="bg-white text-navy">
                              {ROLE_CONFIG[r].label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className={`flex items-center gap-1.5 w-fit rounded-lg px-2.5 py-1 text-xs font-bold ${rc.color}`}>
                          <Shield size={10} />
                          {rc.label}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-400">
                      {new Date(u.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
