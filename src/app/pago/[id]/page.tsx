"use client";

import { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

const SINPE_PHONE = "8888-8888";
const SINPE_NAME = "Gladiador 16 S.A.";

export default function PagoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session } = useSession();
  const router = useRouter();

  const [order, setOrder] = useState<{ id: string; total: number; status: string } | null>(null);
  const [sinpeRef, setSinpeRef] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((orders) => {
        const found = orders.find?.((o: { id: string }) => o.id === id);
        if (found) setOrder(found);
      });
  }, [id]);

  if (!session) {
    router.push("/login");
    return null;
  }

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch(`/api/orders/${id}/sinpe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sinpeRef }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error);
      return;
    }

    setSuccess(true);
  };

  if (success) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-black flex items-center justify-center px-4 pt-20">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h1 className="text-2xl font-black uppercase mb-3">¡PAGO CONFIRMADO!</h1>
            <p className="text-white/50 text-sm mb-2">
              Tu comprobante SINPE Móvil ha sido recibido.
            </p>
            <p className="text-white/50 text-sm mb-6">
              Referencia: <span className="text-gold">{sinpeRef}</span>
            </p>
            <p className="text-white/40 text-xs mb-8">
              Verificaremos tu pago y te enviaremos una confirmación. Tu pedido será procesado en las próximas 24 horas.
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-maroon-light text-white text-xs tracking-[0.2em] uppercase px-8 py-3 hover:bg-maroon transition-colors"
            >
              VOLVER AL INICIO
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-24 pb-16 px-4">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-black tracking-tight uppercase mb-2">PAGO SINPE MÓVIL</h1>
          <p className="text-white/40 text-sm mb-8">Completá tu pago siguiendo estos pasos.</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 mb-6">
              {error}
            </div>
          )}

          {/* SINPE Instructions */}
          <div className="bg-white/5 border border-white/10 p-6 mb-8 space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-maroon-light rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                1
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Abrí tu app bancaria</p>
                <p className="text-xs text-white/40">Ingresá a la sección de SINPE Móvil en tu banco.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-maroon-light rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                2
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Enviá el monto a este número</p>
                <div className="bg-black/50 border border-gold/30 px-4 py-3 mt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider">Número SINPE</p>
                      <p className="text-xl font-bold text-gold">{SINPE_PHONE}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-white/40 uppercase tracking-wider">A nombre de</p>
                      <p className="text-sm font-medium">{SINPE_NAME}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-black/50 border border-white/10 px-4 py-3 mt-2">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider">Monto exacto</p>
                  <p className="text-2xl font-black text-white">
                    ₡{order?.total?.toLocaleString() || "..."}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-maroon-light rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                3
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Ingresá el número de comprobante</p>
                <p className="text-xs text-white/40 mb-3">
                  Después de realizar el SINPE, ingresá el número de referencia que te da tu banco.
                </p>
              </div>
            </div>
          </div>

          {/* Confirmation Form */}
          <form onSubmit={handleConfirm} className="space-y-4">
            <div>
              <label className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">
                Número de comprobante SINPE
              </label>
              <input
                type="text"
                value={sinpeRef}
                onChange={(e) => setSinpeRef(e.target.value)}
                required
                placeholder="Ej: 123456789"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-gold transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-black text-xs font-bold tracking-[0.2em] uppercase py-3 hover:bg-gold/80 transition-colors disabled:opacity-50"
            >
              {loading ? "VERIFICANDO..." : "CONFIRMAR PAGO"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
