"use client";

import { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Link from "next/link";

function CopyButton({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={label ? `Copiar ${label}` : "Copiar"}
      className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-black/50 hover:text-black transition-colors px-2 py-1 rounded-md hover:bg-black/5"
    >
      {copied ? (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" />
          </svg>
          Copiado
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copiar
        </>
      )}
    </button>
  );
}

interface OrderData {
  id: string;
  total: number;
  status: string;
  shippingName: string;
  shippingLastName: string;
  shippingPhone: string;
  shippingEmail: string;
  shippingAddress: string;
  shippingAddress2: string | null;
  shippingCity: string | null;
  shippingProvince: string | null;
  shippingMethod: string;
  shippingCost: number;
  paymentMethod: string;
  notes: string | null;
  createdAt: string;
  items: {
    id: string;
    quantity: number;
    price: number;
    size: string | null;
    product: { name: string; image: string };
  }[];
}

export default function PagoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session } = useSession();
  const router = useRouter();

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((orders) => {
        const found = orders.find?.((o: { id: string }) => o.id === id);
        if (found) setOrder(found);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (!session) {
    router.push("/login");
    return null;
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-cream text-black flex items-center justify-center pt-20">
          <p className="text-black/40">Cargando...</p>
        </main>
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-cream text-black flex items-center justify-center pt-20">
          <p className="text-black/40">Orden no encontrada.</p>
        </main>
      </>
    );
  }

  const subtotal = order.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const orderDate = new Date(order.createdAt).toLocaleDateString("es-CR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream text-black pt-20 pb-16">
        {/* Progress bar */}
        <div className="bg-black text-white text-center py-3 mb-10">
          <div className="flex items-center justify-center gap-4 text-[10px] tracking-[0.2em] uppercase">
            <span className="text-white/50">Carrito</span>
            <span className="text-white/30">→</span>
            <span className="text-white/50">Facturacion</span>
            <span className="text-white/30">→</span>
            <span className="font-bold">Pedido Completado</span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 md:px-8">
          {/* Thank you box */}
          <div className="border-2 border-dashed border-maroon-light/40 rounded-xl text-center py-6 mb-10">
            <p className="text-black text-lg md:text-xl font-medium">Gracias. Tu pedido ha sido recibido.</p>
          </div>

          {/* Order summary row */}
          <div className="bg-white rounded-2xl border border-black/10 shadow-sm grid grid-cols-2 md:grid-cols-5 md:divide-x divide-black/10 mb-10 overflow-hidden">
            <div className="p-5 text-center border-b md:border-b-0 border-black/10">
              <p className="text-[10px] text-black/40 uppercase tracking-wider mb-2">Numero del pedido</p>
              <p className="font-bold text-base">#{order.id.slice(-5)}</p>
            </div>
            <div className="p-5 text-center border-b md:border-b-0 border-black/10">
              <p className="text-[10px] text-black/40 uppercase tracking-wider mb-2">Fecha</p>
              <p className="font-bold text-base">{orderDate}</p>
            </div>
            <div className="p-5 text-center border-b md:border-b-0 border-black/10 col-span-2 md:col-span-1">
              <p className="text-[10px] text-black/40 uppercase tracking-wider mb-2">Email</p>
              <p className="font-bold text-sm break-all">{order.shippingEmail || session.user?.email}</p>
            </div>
            <div className="p-5 text-center">
              <p className="text-[10px] text-black/40 uppercase tracking-wider mb-2">Total</p>
              <p className="font-bold text-base text-black">₡{order.total.toLocaleString()},00</p>
            </div>
            <div className="p-5 text-center col-span-2 md:col-span-1">
              <p className="text-[10px] text-black/40 uppercase tracking-wider mb-2">Metodo de pago</p>
              <p className="font-bold text-sm">Transferencia bancaria</p>
            </div>
          </div>

          {/* Bank details */}
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2">Nuestros Detalles Bancarios</h2>
          <p className="text-black/40 text-sm mb-4">SERIART HOME DIECISEIS S.A.</p>

          <div className="bg-white rounded-2xl border border-black/10 shadow-sm mb-10 overflow-hidden">
            {/* Banco */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/10">
              <p className="text-[10px] text-black/40 uppercase tracking-wider">Banco</p>
              <p className="font-bold text-sm">BAC SAN JOSE</p>
            </div>

            {/* Numero de cuenta */}
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-black/10">
              <p className="text-[10px] text-black/40 uppercase tracking-wider shrink-0">Numero de cuenta</p>
              <div className="flex items-center gap-2 min-w-0">
                <p className="font-bold text-sm tabular-nums truncate">910716893</p>
                <CopyButton value="910716893" label="numero de cuenta" />
              </div>
            </div>

            {/* SINPE */}
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-black/10">
              <p className="text-[10px] text-black/40 uppercase tracking-wider shrink-0">SINPE Movil</p>
              <div className="flex items-center gap-2 min-w-0">
                <p className="font-bold text-sm tabular-nums truncate">8855 7999</p>
                <CopyButton value="88557999" label="SINPE" />
              </div>
            </div>

            {/* IBAN */}
            <div className="flex items-center justify-between gap-3 px-5 py-4">
              <p className="text-[10px] text-black/40 uppercase tracking-wider shrink-0">IBAN</p>
              <div className="flex items-center gap-2 min-w-0">
                <p className="font-bold text-xs md:text-sm tabular-nums truncate">CR64010200009107168932</p>
                <CopyButton value="CR64010200009107168932" label="IBAN" />
              </div>
            </div>
          </div>

          {/* Order details */}
          <h2 className="text-lg font-bold uppercase tracking-wider mb-4">Detalles del Pedido</h2>

          <div className="bg-white border border-black/10 rounded-2xl shadow-sm overflow-hidden mb-10">
            {/* Header */}
            <div className="flex justify-between px-6 py-3 bg-cream border-b border-black/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-black/40">Producto</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-black/40">Total</span>
            </div>

            {/* Items */}
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between px-6 py-3 border-b border-black/[0.05]">
                <span className="text-sm text-black/70">
                  {item.product.name}{item.size ? ` (${item.size})` : ""} × {item.quantity}
                </span>
                <span className="text-sm font-medium">₡{(item.price * item.quantity).toLocaleString()},00</span>
              </div>
            ))}

            {/* Subtotal */}
            <div className="flex justify-between px-6 py-3 border-b border-black/10">
              <span className="text-sm text-black/60">Subtotal:</span>
              <span className="text-sm font-medium">₡{subtotal.toLocaleString()},00</span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between px-6 py-3 border-b border-black/10">
              <span className="text-sm text-black/60">Envio:</span>
              <span className="text-sm">
                {order.shippingCost > 0 ? (
                  <>₡{order.shippingCost.toLocaleString()},00 <span className="text-black/40 text-xs">via Precio fijo</span></>
                ) : (
                  <span className="font-bold text-green-700 uppercase tracking-wider">GRATIS</span>
                )}
              </span>
            </div>

            {/* Total */}
            <div className="flex justify-between px-6 py-3 border-b border-black/10">
              <span className="text-sm font-bold">Total:</span>
              <span className="text-lg font-black text-black">₡{order.total.toLocaleString()},00</span>
            </div>

            {/* Payment method */}
            <div className="flex justify-between px-6 py-3">
              <span className="text-xs font-bold uppercase tracking-wider text-black/50">Metodo de Pago:</span>
              <span className="text-sm text-black/60">Transferencia bancaria directa</span>
            </div>
          </div>

          {/* Billing address */}
          <h2 className="text-lg font-bold uppercase tracking-wider mb-4">Direccion de Facturacion</h2>
          <div className="text-sm text-black/50 space-y-1 mb-10">
            <p className="text-black/70 font-medium">{order.shippingName} {order.shippingLastName}</p>
            <p>{order.shippingAddress}</p>
            {order.shippingAddress2 && <p>{order.shippingAddress2}</p>}
            {order.shippingCity && <p>{order.shippingCity}</p>}
            {order.shippingProvince && <p>{order.shippingProvince}</p>}
            <p>{order.shippingPhone}</p>
            <p>{order.shippingEmail || session.user?.email}</p>
          </div>

          {/* Back to shop */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-block bg-black text-white text-xs font-bold uppercase tracking-[0.2em] px-10 py-4 rounded-xl hover:bg-black/80 transition-colors"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
