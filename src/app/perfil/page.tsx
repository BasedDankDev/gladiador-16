"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Link from "next/link";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  size: string | null;
  product: { name: string; image: string };
}

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  sinpeRef: string | null;
  items: OrderItem[];
}

const statusLabels: Record<string, { label: string; color: string }> = {
  pendiente: { label: "Pendiente de pago", color: "text-yellow-400" },
  pago_enviado: { label: "Pago enviado", color: "text-blue-400" },
  confirmado: { label: "Confirmado", color: "text-green-400" },
  enviado: { label: "Enviado", color: "text-purple-400" },
  entregado: { label: "Entregado", color: "text-green-300" },
};

export default function PerfilPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/orders")
        .then((r) => r.json())
        .then(setOrders);
    }
  }, [status]);

  if (status === "loading") return null;
  if (!session) {
    router.push("/login");
    return null;
  }

  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white/5 border border-white/10 p-8 mb-8">
            <div className="flex items-center gap-6">
              {session.user?.image ? (
                <img src={session.user.image} alt="" className="w-16 h-16 rounded-full bg-white/10" />
              ) : (
                <div className="w-16 h-16 bg-maroon-light rounded-full flex items-center justify-center text-2xl font-black">
                  {session.user?.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h1 className="text-2xl font-black tracking-tight uppercase">
                  {session.user?.name}
                </h1>
                <p className="text-white/40 text-sm mt-1">{session.user?.email}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="bg-white/5 border border-white/10 p-4 text-center">
                <p className="text-2xl font-black">{orders.length}</p>
                <p className="text-[10px] text-white/40 uppercase tracking-wider mt-1">Pedidos</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 text-center">
                <p className="text-2xl font-black">
                  {orders.filter((o) => o.status === "entregado").length}
                </p>
                <p className="text-[10px] text-white/40 uppercase tracking-wider mt-1">Entregados</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 text-center">
                <p className="text-lg font-bold">₡{totalSpent.toLocaleString()}</p>
                <p className="text-[10px] text-white/40 uppercase tracking-wider mt-1">Total gastado</p>
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black tracking-tight uppercase">Mis Pedidos</h2>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16 bg-white/5 border border-white/10">
              <p className="text-white/40 text-sm mb-4">No tenés pedidos aún.</p>
              <Link
                href="/#productos"
                className="text-gold text-sm hover:text-white transition-colors"
              >
                Ir a la tienda
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const st = statusLabels[order.status] || {
                  label: order.status,
                  color: "text-white/60",
                };
                return (
                  <div key={order.id} className="bg-white/5 border border-white/10 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-[10px] text-white/40 tracking-wider">
                          ORDEN #{order.id.slice(-8).toUpperCase()}
                        </p>
                        <p className="text-[10px] text-white/30 mt-0.5">
                          {new Date(order.createdAt).toLocaleDateString("es-CR")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-xs font-medium ${st.color}`}>{st.label}</p>
                        <p className="text-sm font-bold mt-0.5">
                          ₡{order.total.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-white/50">
                      {order.items.map((item) => (
                        <span key={item.id}>
                          {item.product.name} x{item.quantity}
                          {item.size ? ` (${item.size})` : ""}
                          {" · "}
                        </span>
                      ))}
                    </div>
                    {order.status === "pendiente" && (
                      <Link
                        href={`/pago/${order.id}`}
                        className="inline-block mt-3 text-[10px] text-gold tracking-wider uppercase hover:text-white transition-colors"
                      >
                        Completar pago →
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Sign Out */}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="mt-10 w-full bg-white/5 border border-white/10 text-white/60 text-xs tracking-[0.2em] uppercase py-3 hover:text-red-400 hover:border-red-400/30 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </main>
    </>
  );
}
