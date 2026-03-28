"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Image from "next/image";

const AVATARS = [
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Leo&backgroundColor=f5f0eb",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Sophia&backgroundColor=f5f0eb",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus&backgroundColor=f5f0eb",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Valentina&backgroundColor=f5f0eb",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Diego&backgroundColor=f5f0eb",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Camila&backgroundColor=f5f0eb",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Andres&backgroundColor=f5f0eb",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Luna&backgroundColor=f5f0eb",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Carlos&backgroundColor=f5f0eb",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Isabella&backgroundColor=f5f0eb",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Mateo&backgroundColor=f5f0eb",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Gabriela&backgroundColor=f5f0eb",
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, avatar }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setLoading(false);
      return;
    }

    await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    setStep(3);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black flex items-center justify-center px-4 pt-20 pb-16">
        {step === 1 ? (
          <div className="w-full max-w-sm">
            <p className="text-[10px] text-white/40 uppercase tracking-wider text-center mb-2">
              Paso 1
            </p>
            <h1 className="text-2xl font-black tracking-tight uppercase text-center mb-8">
              CREAR CUENTA
            </h1>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleNext} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">
                  Contraseña
                </label>
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
                className="w-full bg-maroon-light text-white text-xs font-medium tracking-[0.2em] uppercase py-3 hover:bg-maroon transition-colors"
              >
                SIGUIENTE
              </button>
            </form>

            <p className="text-center text-sm text-white/40 mt-6">
              ¿Ya tenés cuenta?{" "}
              <Link href="/login" className="text-gold hover:text-white transition-colors">
                Iniciá sesión
              </Link>
            </p>
          </div>
        ) : (
          <div className="w-full max-w-2xl">
            <p className="text-[10px] text-white/40 uppercase tracking-wider text-center mb-2">
              Paso 2
            </p>
            <h1 className="text-2xl font-black tracking-tight uppercase text-center mb-2">
              SELECCIONÁ TU AVATAR
            </h1>
            <p className="text-white/40 text-sm text-center mb-10">
              Escogé el que más te identifique.
            </p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 mb-6 max-w-sm mx-auto">
                {error}
              </div>
            )}

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-10">
              {AVATARS.map((url, i) => (
                <button
                  key={i}
                  onClick={() => setAvatar(url)}
                  className={`relative bg-white/5 rounded-xl p-3 transition-all ${
                    avatar === url
                      ? "ring-2 ring-gold bg-white/10 scale-105"
                      : "hover:bg-white/10 border border-white/10"
                  }`}
                >
                  <Image
                    src={url}
                    alt={`Avatar ${i + 1}`}
                    width={120}
                    height={120}
                    className="w-full aspect-square rounded-lg"
                    unoptimized
                  />
                  {avatar === url && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-gold rounded-full flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex flex-col items-center gap-4">
              <button
                onClick={handleSubmit}
                disabled={loading || !avatar}
                className="bg-maroon-light text-white text-xs font-medium tracking-[0.2em] uppercase px-12 py-3 rounded-full hover:bg-maroon transition-colors disabled:opacity-50"
              >
                {loading ? "CREANDO CUENTA..." : "CREAR CUENTA"}
              </button>
              <button
                onClick={() => setStep(1)}
                className="text-white/40 text-xs hover:text-white transition-colors"
              >
                ← Volver
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md text-center">
            <Image
              src="/cool-s-logo.svg"
              alt="Gladiador 16"
              width={40}
              height={52}
              className="mx-auto mb-8 invert"
            />
            <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase mb-4">
              ¡BIENVENIDO {name.toUpperCase()}!
            </h1>
            <p className="text-white/50 text-sm mb-10">
              Oficialmente sos parte de la familia más grande y ganadora.
            </p>
            <Link
              href="/perfil"
              className="inline-block bg-maroon-light text-white text-xs font-medium tracking-[0.2em] uppercase px-10 py-3 rounded-full hover:bg-maroon transition-colors"
            >
              Ir a mi perfil
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
