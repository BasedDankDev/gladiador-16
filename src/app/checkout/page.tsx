"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const { items, total, clearCart } = useCart();
  const router = useRouter();

  const [shippingName, setShippingName] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (status === "loading") return null;

  if (!session) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-black flex items-center justify-center px-4 pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-black uppercase mb-4">DEBÉS INICIAR SESIÓN</h1>
            <p className="text-white/50 text-sm mb-6">Para continuar con tu compra, necesitás una cuenta.</p>
            <div className="flex gap-4 justify-center">
              <Link href="/login" className="bg-maroon-light text-white text-xs tracking-[0.2em] uppercase px-6 py-3">
                INICIAR SESIÓN
              </Link>
              <Link href="/registro" className="border border-white/30 text-white text-xs tracking-[0.2em] uppercase px-6 py-3">
                CREAR CUENTA
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-black flex items-center justify-center px-4 pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-black uppercase mb-4">CARRITO VACÍO</h1>
            <Link href="/#productos" className="text-gold text-sm hover:text-white transition-colors">
              Ir a la tienda
            </Link>
          </div>
        </main>
      </>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            size: i.size,
            color: i.color,
          })),
          shippingName,
          shippingPhone,
          shippingAddress,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        setLoading(false);
        return;
      }

      clearCart();
      router.push(`/pago/${data.id}`);
    } catch {
      setError("Error de conexión");
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-black tracking-tight uppercase mb-8">CHECKOUT</h1>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {/* Shipping Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-sm font-bold tracking-wider uppercase text-white/60 mb-4">DATOS DE ENVÍO</h2>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">Nombre completo</label>
                <input
                  type="text"
                  value={shippingName}
                  onChange={(e) => setShippingName(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">Teléfono</label>
                <input
                  type="tel"
                  value={shippingPhone}
                  onChange={(e) => setShippingPhone(e.target.value)}
                  required
                  placeholder="+506 8888-8888"
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">Dirección de envío</label>
                <textarea
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  required
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-gold transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-maroon-light text-white text-xs font-medium tracking-[0.2em] uppercase py-3 mt-4 hover:bg-maroon transition-colors disabled:opacity-50"
              >
                {loading ? "PROCESANDO..." : "CONTINUAR AL PAGO"}
              </button>
            </form>

            {/* Order Summary */}
            <div>
              <h2 className="text-sm font-bold tracking-wider uppercase text-white/60 mb-4">RESUMEN</h2>
              <div className="bg-white/5 border border-white/10 p-4 space-y-4">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    <div className="relative w-14 h-14 bg-white/5 shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{item.name}</p>
                      <p className="text-[10px] text-white/40">Cant: {item.quantity}{item.size ? ` · Talla: ${item.size}` : ""}</p>
                    </div>
                    <p className="text-xs font-medium">₡{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
                <div className="border-t border-white/10 pt-3 flex justify-between">
                  <span className="text-sm text-white/60">Total</span>
                  <span className="text-lg font-bold">₡{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
