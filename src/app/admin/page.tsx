"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  size: string | null;
  color: string | null;
  product: { name: string; slug: string; image: string };
}

interface Order {
  id: string;
  status: string;
  total: number;
  sinpeRef: string | null;
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  paymentMethod: string;
  createdAt: string;
  user: { id: string; name: string; email: string; phone: string | null };
  items: OrderItem[];
}

const statusLabels: Record<string, { label: string; color: string }> = {
  pendiente: { label: "Pendiente", color: "bg-yellow-400/20 text-yellow-400" },
  pago_enviado: { label: "Pago Enviado", color: "bg-blue-400/20 text-blue-400" },
  confirmado: { label: "Confirmado", color: "bg-green-400/20 text-green-400" },
  enviado: { label: "Enviado", color: "bg-purple-400/20 text-purple-400" },
  entregado: { label: "Entregado", color: "bg-green-300/20 text-green-300" },
};

const STATUS_ORDER = ["pendiente", "pago_enviado", "confirmado", "enviado", "entregado"];

export default function AdminPage() {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("todos");

  const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "").split(",").map((e) => e.trim().toLowerCase());
  const isAdmin = session?.user?.email && adminEmails.includes(session.user.email.toLowerCase());

  useEffect(() => {
    if (authStatus === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (authStatus === "authenticated") {
      fetchOrders();
    }
  }, [authStatus, router]);

  async function fetchOrders() {
    setLoading(true);
    const res = await fetch("/api/admin/orders");
    if (res.status === 403) {
      setError("No tenés permisos de administrador.");
      setLoading(false);
      return;
    }
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  }

  async function updateStatus(orderId: string, newStatus: string) {
    setUpdating(orderId);
    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    }
    setUpdating(null);
  }

  if (authStatus === "loading" || loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-black flex items-center justify-center pt-20">
          <p className="text-white/40">Cargando...</p>
        </main>
      </>
    );
  }

  if (error || !isAdmin) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-black flex items-center justify-center pt-20">
          <p className="text-red-400">{error || "Acceso denegado."}</p>
        </main>
      </>
    );
  }

  const filteredOrders = filter === "todos" ? orders : orders.filter((o) => o.status === filter);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingPayments = orders.filter((o) => o.status === "pago_enviado").length;
  const pendingOrders = orders.filter((o) => o.status === "pendiente").length;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-20 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="mb-8">
            <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Administracion</p>
            <h1 className="text-2xl font-black tracking-tight uppercase">Panel de Ordenes</h1>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/5 border border-white/10 p-4">
              <p className="text-[10px] text-white/40 uppercase tracking-wider">Total Ordenes</p>
              <p className="text-2xl font-bold mt-1">{orders.length}</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-4">
              <p className="text-[10px] text-white/40 uppercase tracking-wider">Pagos por Verificar</p>
              <p className="text-2xl font-bold text-blue-400 mt-1">{pendingPayments}</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-4">
              <p className="text-[10px] text-white/40 uppercase tracking-wider">Sin Pagar</p>
              <p className="text-2xl font-bold text-yellow-400 mt-1">{pendingOrders}</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-4">
              <p className="text-[10px] text-white/40 uppercase tracking-wider">Ingresos Totales</p>
              <p className="text-2xl font-bold text-green-400 mt-1">₡{totalRevenue.toLocaleString()}</p>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[{ key: "todos", label: "Todos" }, ...STATUS_ORDER.map((s) => ({ key: s, label: statusLabels[s].label }))].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`text-xs px-4 py-2 border whitespace-nowrap transition-colors ${
                  filter === f.key
                    ? "border-gold text-gold bg-gold/10"
                    : "border-white/10 text-white/50 hover:border-white/30"
                }`}
              >
                {f.label}
                {f.key !== "todos" && (
                  <span className="ml-1.5 text-white/30">
                    {orders.filter((o) => o.status === f.key).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Orders */}
          {filteredOrders.length === 0 ? (
            <div className="bg-white/5 border border-white/10 p-12 text-center">
              <p className="text-white/40">No hay ordenes{filter !== "todos" ? ` con estado "${statusLabels[filter]?.label}"` : ""}.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredOrders.map((order) => {
                const st = statusLabels[order.status] || { label: order.status, color: "bg-white/10 text-white/50" };
                const isExpanded = expandedOrder === order.id;

                return (
                  <div key={order.id} className="bg-white/5 border border-white/10">
                    {/* Order row */}
                    <div
                      className="flex flex-wrap items-center gap-4 p-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                      onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                    >
                      <div className="flex-1 min-w-[140px]">
                        <p className="text-xs text-white/40">Orden</p>
                        <p className="text-sm font-mono">#{order.id.slice(-8)}</p>
                      </div>
                      <div className="flex-1 min-w-[140px]">
                        <p className="text-xs text-white/40">Cliente</p>
                        <p className="text-sm">{order.user.name}</p>
                      </div>
                      <div className="flex-1 min-w-[100px]">
                        <p className="text-xs text-white/40">Total</p>
                        <p className="text-sm font-medium">₡{order.total.toLocaleString()}</p>
                      </div>
                      <div className="flex-1 min-w-[120px]">
                        <p className="text-xs text-white/40">SINPE Ref</p>
                        <p className="text-sm font-mono">{order.sinpeRef || "—"}</p>
                      </div>
                      <div className="flex-1 min-w-[100px]">
                        <p className="text-xs text-white/40">Fecha</p>
                        <p className="text-sm">{new Date(order.createdAt).toLocaleDateString("es-CR")}</p>
                      </div>
                      <div>
                        <span className={`text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 ${st.color}`}>
                          {st.label}
                        </span>
                      </div>
                      <svg
                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                        className={`text-white/40 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>

                    {/* Expanded detail */}
                    {isExpanded && (
                      <div className="border-t border-white/10 p-4 space-y-4">
                        {/* Customer info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Email</p>
                            <p className="text-sm">{order.user.email}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Telefono</p>
                            <p className="text-sm">{order.shippingPhone}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Direccion</p>
                            <p className="text-sm">{order.shippingAddress}</p>
                          </div>
                        </div>

                        {/* Items */}
                        <div>
                          <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">Productos</p>
                          <div className="space-y-2">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center gap-3 bg-white/[0.02] p-2">
                                <img
                                  src={item.product.image}
                                  alt={item.product.name}
                                  className="w-10 h-10 object-contain bg-white/5"
                                />
                                <div className="flex-1">
                                  <p className="text-sm">{item.product.name}</p>
                                  <p className="text-xs text-white/40">
                                    Talla: {item.size || "—"} · Cant: {item.quantity}
                                  </p>
                                </div>
                                <p className="text-sm font-medium">₡{(item.price * item.quantity).toLocaleString()}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Status controls */}
                        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/10">
                          <p className="text-[10px] text-white/40 uppercase tracking-wider">Cambiar estado:</p>
                          {STATUS_ORDER.map((s) => {
                            const isActive = order.status === s;
                            const sl = statusLabels[s];
                            return (
                              <button
                                key={s}
                                onClick={() => !isActive && updateStatus(order.id, s)}
                                disabled={isActive || updating === order.id}
                                className={`text-[10px] font-medium tracking-wider uppercase px-3 py-1.5 border transition-colors ${
                                  isActive
                                    ? `${sl.color} border-current`
                                    : "border-white/10 text-white/30 hover:border-white/30 hover:text-white/60"
                                } ${updating === order.id ? "opacity-50" : ""}`}
                              >
                                {sl.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
