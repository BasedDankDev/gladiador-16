"use client";

import { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Link from "next/link";

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
            <span className="text-white/50">Shopping Cart</span>
            <span className="text-white/30">→</span>
            <span className="text-white/50">Checkout</span>
            <span className="text-white/30">→</span>
            <span className="font-bold">Order Complete</span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 md:px-8">
          {/* Thank you box */}
          <div className="border-2 border-dashed border-maroon-light/40 rounded-xl text-center py-6 mb-10">
            <p className="text-black text-lg md:text-xl font-medium">Gracias. Tu pedido ha sido recibido.</p>
          </div>

          {/* Order summary row */}
          <div className="bg-white rounded-2xl border border-black/10 shadow-sm grid grid-cols-2 md:grid-cols-5 divide-x divide-black/10 mb-10 overflow-hidden">
            <div className="p-4 text-center">
              <p className="text-[10px] text-black/40 uppercase tracking-wider mb-1">Numero del pedido:</p>
              <p className="font-bold text-sm">#{order.id.slice(-5)}</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-[10px] text-black/40 uppercase tracking-wider mb-1">Fecha:</p>
              <p className="font-bold text-sm">{orderDate}</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-[10px] text-black/40 uppercase tracking-wider mb-1">Email:</p>
              <p className="font-bold text-xs break-all">{order.shippingEmail || session.user?.email}</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-[10px] text-black/40 uppercase tracking-wider mb-1">Total:</p>
              <p className="font-bold text-sm text-black">₡{order.total.toLocaleString()},00</p>
            </div>
            <div className="p-4 text-center col-span-2 md:col-span-1">
              <p className="text-[10px] text-black/40 uppercase tracking-wider mb-1">Metodo de pago:</p>
              <p className="font-bold text-xs">Transferencia bancaria</p>
            </div>
          </div>

          {/* Bank details */}
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2">Nuestros Detalles Bancarios</h2>
          <p className="text-black/40 text-sm mb-4">SERIART HOME DIECISEIS S.A.</p>

          <div className="bg-white rounded-2xl border border-black/10 shadow-sm grid grid-cols-2 md:grid-cols-4 divide-x divide-black/10 mb-10 overflow-hidden">
            <div className="p-4 text-center">
              <p className="text-[10px] text-black/40 uppercase tracking-wider mb-1">Banco:</p>
              <p className="font-bold text-sm">BAC SAN JOSE</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-[10px] text-black/40 uppercase tracking-wider mb-1">Numero de cuenta:</p>
              <p className="font-bold text-sm">910716893</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-[10px] text-black/40 uppercase tracking-wider mb-1">SINPE Movil:</p>
              <p className="font-bold text-sm">+506 8855 7999</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-[10px] text-black/40 uppercase tracking-wider mb-1">IBAN:</p>
              <p className="font-bold text-xs">CR64010200009107168932</p>
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
                  "Recogida local"
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
