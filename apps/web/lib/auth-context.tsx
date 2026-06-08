"use client";

import { createContext, useContext, useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002/api/v1";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

async function fetchMe(): Promise<AuthUser | null> {
  try {
    const res = await fetch(`${API_URL}/auth/me`, { credentials: "include" });
    if (!res.ok) return null;
    return res.json() as Promise<AuthUser>;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMe().then((u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  async function login(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error((body as { message?: string }).message ?? "Credenciais inválidas");
    }

    const data = (await res.json()) as { user: AuthUser };
    setUser(data.user);
  }

  async function register(name: string, email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error((body as { message?: string }).message ?? "Erro ao criar conta");
    }

    const data = (await res.json()) as { user: AuthUser };
    setUser(data.user);
  }

  async function logout() {
    await fetch(`${API_URL}/auth/logout`, { method: "POST", credentials: "include" });
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token: null, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
