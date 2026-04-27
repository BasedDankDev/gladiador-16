"use client";

import { useState, useEffect, useMemo } from "react";
import { Order, statusLabels, STATUS_ORDER } from "@/lib/admin-types";

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [filter, setFilter] = useState("todos");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<"date" | "total" | "status">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setOrders(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function updateStatus(orderId: string, newStatus: string) {
    setUpdating(orderId);
    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
    }
    setUpdating(null);
  }

  async function deleteOrder(orderId: string) {
    const short = orderId.slice(-8);
    if (!confirm(`¿Eliminar la orden #${short}? Esta accion no se puede deshacer.`)) return;
    setDeleting(orderId);
    const res = await fetch(`/api/admin/orders/${orderId}`, { method: "DELETE" });
    if (res.ok) {
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      if (expandedOrder === orderId) setExpandedOrder(null);
    } else {
      alert("No se pudo eliminar la orden.");
    }
    setDeleting(null);
  }

  const filtered = useMemo(() => {
    let result = filter === "todos" ? orders : orders.filter((o) => o.status === filter);

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.user.name.toLowerCase().includes(q) ||
          o.user.email.toLowerCase().includes(q) ||
          (o.sinpeRef && o.sinpeRef.toLowerCase().includes(q))
      );
    }

    const priorityOrder = ["pago_enviado", "pendiente", "confirmado", "enviado", "entregado"];
    const priority = (status: string) => {
      const i = priorityOrder.indexOf(status);
      return i === -1 ? priorityOrder.length : i;
    };

    result.sort((a, b) => {
      const pCmp = priority(a.status) - priority(b.status);
      if (pCmp !== 0) return pCmp;

      let cmp = 0;
      if (sortField === "date") cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      else if (sortField === "total") cmp = a.total - b.total;
      else if (sortField === "status") cmp = STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status);
      return sortDir === "desc" ? -cmp : cmp;
    });

    return result;
  }, [orders, filter, search, sortField, sortDir]);

  function toggleSort(field: typeof sortField) {
    if (sortField === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
  }

  if (loading) {
    return <div className="text-white/40 text-sm py-20 text-center">Cargando pedidos...</div>;
  }

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">Pedidos</p>
        <h1 className="text-2xl font-bold tracking-tight">Gestion de Ordenes</h1>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por ID, nombre, email o referencia SINPE..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-gold/50"
        />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[{ key: "todos", label: "Todos" }, ...STATUS_ORDER.map((s) => ({ key: s, label: statusLabels[s].label }))].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`text-xs px-4 py-2 border rounded-lg whitespace-nowrap transition-colors ${
              filter === f.key
                ? "border-gold text-gold bg-gold/10"
                : "border-white/[0.08] text-white/40 hover:border-white/20"
            }`}
          >
            {f.label}
            <span className="ml-1.5 text-white/20">
              {f.key === "todos" ? orders.length : orders.filter((o) => o.status === f.key).length}
            </span>
          </button>
        ))}
      </div>

      {/* Sort controls */}
      <div className="flex gap-4 mb-4">
        {([["date", "Fecha"], ["total", "Total"], ["status", "Estado"]] as const).map(([field, label]) => (
          <button
            key={field}
            onClick={() => toggleSort(field)}
            className={`text-[10px] uppercase tracking-wider transition-colors ${
              sortField === field ? "text-gold" : "text-white/30 hover:text-white/50"
            }`}
          >
            {label} {sortField === field && (sortDir === "desc" ? "↓" : "↑")}
          </button>
        ))}
      </div>

      {/* Orders list */}
      {filtered.length === 0 ? (
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-12 text-center">
          <p className="text-white/30 text-sm">
            {search ? "No se encontraron resultados." : `No hay ordenes${filter !== "todos" ? ` con estado "${statusLabels[filter]?.label}"` : ""}.`}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((order) => {
            const st = statusLabels[order.status] || { label: order.status, color: "bg-white/10 text-white/50" };
            const isExpanded = expandedOrder === order.id;

            return (
              <div key={order.id} className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
                {/* Row */}
                <div
                  className="flex flex-wrap items-center gap-4 p-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                >
                  <div className="flex-1 min-w-[120px]">
                    <p className="text-[10px] text-white/30">Orden</p>
                    <p className="text-sm font-mono">#{order.id.slice(-8)}</p>
                  </div>
                  <div className="flex-1 min-w-[140px]">
                    <p className="text-[10px] text-white/30">Cliente</p>
                    <p className="text-sm">{order.user.name}</p>
                  </div>
                  <div className="flex-1 min-w-[100px]">
                    <p className="text-[10px] text-white/30">Total</p>
                    <p className="text-sm font-medium">₡{order.total.toLocaleString()}</p>
                  </div>
                  <div className="flex-1 min-w-[120px]">
                    <p className="text-[10px] text-white/30">SINPE Ref</p>
                    <p className="text-sm font-mono">{order.sinpeRef || "—"}</p>
                  </div>
                  <div className="flex-1 min-w-[100px]">
                    <p className="text-[10px] text-white/30">Fecha</p>
                    <p className="text-sm">{new Date(order.createdAt).toLocaleDateString("es-CR")}</p>
                  </div>
                  <span className={`text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded ${st.color}`}>
                    {st.label}
                  </span>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                    className={`text-white/30 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>

                {/* Expanded */}
                {isExpanded && (
                  <div className="border-t border-white/[0.06] p-5 space-y-5">
                    {/* Customer info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Email</p>
                        <p className="text-sm">{order.user.email}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Telefono</p>
                        <p className="text-sm">{order.shippingPhone}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Direccion</p>
                        <p className="text-sm">{order.shippingAddress}</p>
                      </div>
                    </div>

                    {/* Items */}
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">Productos</p>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-3 bg-white/[0.02] rounded-lg p-3">
                            <img src={item.product.image} alt={item.product.name} className="w-10 h-10 object-contain bg-white/5 rounded" />
                            <div className="flex-1">
                              <p className="text-sm">{item.product.name}</p>
                              <p className="text-[10px] text-white/30">Talla: {item.size || "—"} · Cant: {item.quantity}</p>
                            </div>
                            <p className="text-sm font-medium">₡{(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Status controls */}
                    <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/[0.06]">
                      <p className="text-[10px] text-white/30 uppercase tracking-wider">Cambiar estado:</p>
                      {STATUS_ORDER.map((s) => {
                        const isActive = order.status === s;
                        const sl = statusLabels[s];
                        return (
                          <button
                            key={s}
                            onClick={() => !isActive && updateStatus(order.id, s)}
                            disabled={isActive || updating === order.id}
                            className={`text-[10px] font-medium tracking-wider uppercase px-3 py-1.5 border rounded transition-colors ${
                              isActive
                                ? `${sl.color} border-current`
                                : "border-white/10 text-white/25 hover:border-white/25 hover:text-white/50"
                            } ${updating === order.id ? "opacity-50" : ""}`}
                          >
                            {sl.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* Danger zone */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                      <p className="text-[10px] text-white/30 uppercase tracking-wider">Zona peligrosa</p>
                      <button
                        onClick={() => deleteOrder(order.id)}
                        disabled={deleting === order.id}
                        className={`text-[10px] font-medium tracking-wider uppercase px-3 py-1.5 border rounded transition-colors border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/60 ${
                          deleting === order.id ? "opacity-50" : ""
                        }`}
                      >
                        {deleting === order.id ? "Eliminando..." : "Eliminar orden"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
