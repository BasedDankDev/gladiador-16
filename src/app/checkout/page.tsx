"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Link from "next/link";

const PROVINCIAS = [
  "San Jose",
  "Alajuela",
  "Cartago",
  "Heredia",
  "Guanacaste",
  "Puntarenas",
  "Limon",
];

const SHIPPING_COST = 1950;
const FREE_SHIPPING_THRESHOLD = 25000;

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const { items, total, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    direccion: "",
    direccion2: "",
    ciudad: "",
    provincia: "San Jose",
    telefono: "",
    email: "",
    notas: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const shippingCost = total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const orderTotal = total + shippingCost;

  function updateForm(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  if (status === "loading") return null;

  if (!session) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-cream text-black flex items-center justify-center px-4 pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-black uppercase mb-4">Debes iniciar sesion</h1>
            <p className="text-black/50 text-sm mb-6">Para continuar con tu compra, necesitas una cuenta.</p>
            <div className="flex gap-4 justify-center">
              <Link href="/login" className="bg-black text-white text-xs tracking-[0.15em] uppercase px-6 py-3 hover:bg-black/80 transition-colors">
                Iniciar Sesion
              </Link>
              <Link href="/registro" className="border border-black/30 text-black text-xs tracking-[0.15em] uppercase px-6 py-3 hover:bg-black hover:text-white transition-colors">
                Crear Cuenta
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
        <main className="min-h-screen bg-cream text-black flex items-center justify-center px-4 pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-black uppercase mb-4">Carrito vacio</h1>
            <Link href="/#productos" className="text-black text-sm underline hover:text-maroon transition-colors">
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
          shippingName: form.nombre,
          shippingLastName: form.apellidos,
          shippingPhone: form.telefono,
          shippingEmail: form.email,
          shippingAddress: form.direccion,
          shippingAddress2: form.direccion2,
          shippingCity: form.ciudad,
          shippingProvince: form.provincia,
          shippingMethod: "envio",
          shippingCost,
          notes: form.notas,
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
      setError("Error de conexion");
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream text-black pt-20 pb-16">
        {/* Progress bar */}
        <div className="bg-black text-white text-center py-3 mb-10">
          <div className="flex items-center justify-center gap-4 text-[10px] tracking-[0.2em] uppercase">
            <span className="text-white/50">Carrito</span>
            <span className="text-white/30">→</span>
            <span className="font-bold">Facturacion</span>
            <span className="text-white/30">→</span>
            <span className="text-white/50">Pedido Completado</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-16">
              {/* Left — Billing & Shipping form */}
              <div>
                <h2 className="text-lg font-bold uppercase tracking-wider mb-6">Facturacion y Envio</h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm text-black/60 mb-1.5 block">
                      Nombre <span className="text-black">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.nombre}
                      onChange={(e) => updateForm("nombre", e.target.value)}
                      className="w-full bg-white border border-black/20 rounded-lg px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-black/60 mb-1.5 block">
                      Apellidos <span className="text-black">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.apellidos}
                      onChange={(e) => updateForm("apellidos", e.target.value)}
                      className="w-full bg-white border border-black/20 rounded-lg px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-sm text-black/60 mb-1.5 block">
                    Pais (Unicamente para Costa Rica) <span className="text-black">*</span>
                  </label>
                  <select
                    disabled
                    className="w-full bg-gray-100 border border-black/20 rounded-lg px-4 py-3 text-sm text-black/50"
                  >
                    <option>Costa Rica</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-sm text-black/60 mb-1.5 block">
                    Direccion Exacta <span className="text-black">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.direccion}
                    onChange={(e) => updateForm("direccion", e.target.value)}
                    placeholder="Numero de la casa y nombre de la calle"
                    className="w-full bg-white border border-black/20 rounded-lg px-4 py-3 text-sm outline-none focus:border-black transition-colors placeholder:text-black/30 mb-2"
                  />
                  <input
                    type="text"
                    value={form.direccion2}
                    onChange={(e) => updateForm("direccion2", e.target.value)}
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    className="w-full bg-white border border-black/20 rounded-lg px-4 py-3 text-sm outline-none focus:border-black transition-colors placeholder:text-black/30"
                  />
                </div>

                <div className="mb-4">
                  <label className="text-sm text-black/60 mb-1.5 block">
                    Localidad / Ciudad <span className="text-black">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.ciudad}
                    onChange={(e) => updateForm("ciudad", e.target.value)}
                    className="w-full bg-white border border-black/20 rounded-lg px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                  />
                </div>

                <div className="mb-4">
                  <label className="text-sm text-black/60 mb-1.5 block">
                    Provincia <span className="text-black">*</span>
                  </label>
                  <select
                    value={form.provincia}
                    onChange={(e) => updateForm("provincia", e.target.value)}
                    className="w-full bg-white border border-black/20 rounded-lg px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                  >
                    {PROVINCIAS.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-sm text-black/60 mb-1.5 block">
                    Telefono <span className="text-black">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.telefono}
                    onChange={(e) => updateForm("telefono", e.target.value)}
                    placeholder="+506 8888-8888"
                    className="w-full bg-white border border-black/20 rounded-lg px-4 py-3 text-sm outline-none focus:border-black transition-colors placeholder:text-black/30"
                  />
                </div>

                <div className="mb-8">
                  <label className="text-sm text-black/60 mb-1.5 block">
                    Correo electronico <span className="text-black">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                    className="w-full bg-white border border-black/20 rounded-lg px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                  />
                </div>

                <h2 className="text-lg font-bold uppercase tracking-wider mb-4">Informacion Adicional</h2>
                <div>
                  <label className="text-sm text-black/60 mb-1.5 block">
                    Notas Adicionales | Datos para facturacion si es necesario. (opcional)
                  </label>
                  <textarea
                    value={form.notas}
                    onChange={(e) => updateForm("notas", e.target.value)}
                    rows={4}
                    placeholder="Notas sobre su pedido, p. Notas especiales para la entrega."
                    className="w-full bg-white border border-black/20 rounded-lg px-4 py-3 text-sm outline-none focus:border-black transition-colors placeholder:text-black/30 resize-none"
                  />
                </div>
              </div>

              {/* Right — Order Summary */}
              <div>
                <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-sm sticky top-28">
                  <h2 className="text-lg font-bold uppercase tracking-wider text-center mb-6">Tu Pedido</h2>

                  {/* Header row */}
                  <div className="flex justify-between border-b border-black/10 pb-3 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-black/40">Producto</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-black/40">Subtotal</span>
                  </div>

                  {/* Items */}
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.size}`} className="flex justify-between py-2.5 border-b border-black/[0.05]">
                      <span className="text-sm text-black/70">
                        {item.name}{item.size ? ` (${item.size})` : ""} × {item.quantity}
                      </span>
                      <span className="text-sm font-medium">₡{(item.price * item.quantity).toLocaleString()},00</span>
                    </div>
                  ))}

                  {/* Subtotal */}
                  <div className="flex justify-between py-3 border-b border-black/10">
                    <span className="text-sm text-black/60">Subtotal</span>
                    <span className="text-sm font-medium">₡{total.toLocaleString()},00</span>
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between py-3 border-b border-black/10">
                    <span className="text-sm text-black/60">Envio</span>
                    {shippingCost === 0 ? (
                      <span className="text-sm font-bold text-green-700 uppercase tracking-wider">GRATIS</span>
                    ) : (
                      <span className="text-sm">Precio fijo: <span className="text-black font-medium">₡{SHIPPING_COST.toLocaleString()},00</span></span>
                    )}
                  </div>

                  {/* Free shipping progress */}
                  {shippingCost > 0 && (
                    <div className="py-3 border-b border-black/10 space-y-2">
                      <p className="text-[11px] text-black/60 text-center leading-relaxed">
                        Te faltan <span className="font-bold text-black">₡{(FREE_SHIPPING_THRESHOLD - total).toLocaleString()}</span> para envío <span className="font-bold text-black">GRATIS</span>
                      </p>
                      <div className="h-1 bg-black/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-maroon-light transition-all duration-500"
                          style={{ width: `${Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Total */}
                  <div className="flex justify-between py-3 border-b border-black/10">
                    <span className="text-sm font-bold">Total</span>
                    <span className="text-xl font-black text-black">₡{orderTotal.toLocaleString()},00</span>
                  </div>

                  {/* Payment method */}
                  <div className="mt-5 mb-5">
                    <p className="text-sm text-black/50 mb-3">Transferencia bancaria directa</p>

                    <div className="bg-cream border border-black/10 rounded-xl p-4 text-sm space-y-3">
                      <p className="font-bold text-black">ATENCION</p>
                      <p className="font-bold text-black/80 leading-relaxed">
                        Realiza tu pago, envianos el comprobante y espera la confirmacion de nuestro equipo.
                      </p>
                      <p className="text-black/50 leading-relaxed">
                        Puedes pagar en nuestra cuenta bancaria (los detalles apareceran al darle <strong className="text-black">Realizar Pedido</strong>) o por SINPE Movil al <strong className="text-black">+506 8971 4343 — Brenes Guevara Jose</strong>. Usa el numero del pedido como detalle de pago y envia el comprobante a nuestro WhatsApp de negocios: <strong className="text-black">+506 8855 7999</strong>. Tu pedido no se procesara hasta que se haya recibido el importe en nuestra cuenta.
                      </p>
                    </div>
                  </div>

                  <p className="text-[10px] text-black/30 mb-5 leading-relaxed">
                    Tus datos personales se utilizaran para procesar tu pedido y mejorar tu experiencia en este sitio web.
                  </p>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white text-xs font-bold uppercase tracking-[0.2em] py-4 rounded-xl hover:bg-black/80 transition-colors disabled:opacity-50"
                  >
                    {loading ? "Procesando..." : "Realizar el Pedido"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
