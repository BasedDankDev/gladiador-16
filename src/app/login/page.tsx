"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Email o contraseña incorrectos");
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-black tracking-tight uppercase text-center mb-8">
            INICIAR SESIÓN
          </h1>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-gold transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-maroon-light text-white text-xs font-medium tracking-[0.2em] uppercase py-3 hover:bg-maroon transition-colors disabled:opacity-50"
            >
              {loading ? "INGRESANDO..." : "INGRESAR"}
            </button>
          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            ¿No tenés cuenta?{" "}
            <Link href="/registro" className="text-gold hover:text-white transition-colors">
              Registrate
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
