"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setLoading(false);
      return;
    }

    // Auto login after register
    await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-black tracking-tight uppercase text-center mb-8">
            CREAR CUENTA
          </h1>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-gold transition-colors"
              />
              <p className="text-[10px] text-white/30 mt-1">Mínimo 6 caracteres</p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-maroon-light text-white text-xs font-medium tracking-[0.2em] uppercase py-3 hover:bg-maroon transition-colors disabled:opacity-50"
            >
              {loading ? "CREANDO CUENTA..." : "CREAR CUENTA"}
            </button>
          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            ¿Ya tenés cuenta?{" "}
            <Link href="/login" className="text-gold hover:text-white transition-colors">
              Iniciá sesión
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
