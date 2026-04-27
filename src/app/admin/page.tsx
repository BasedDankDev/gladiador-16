"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { statusLabels } from "@/lib/admin-types";

interface RevenueBucket {
  total: number;
  today: number;
  week: number;
  month: number;
}

interface Stats {
  totalOrders: number;
  totalCustomers: number;
  productsSold: number;
  ordersByStatus: Record<string, number>;
  revenue: { confirmed: RevenueBucket; pending: RevenueBucket };
  recentOrders: {
    id: string;
    status: string;
    total: number;
    createdAt: string;
    user: { name: string; email: string };
  }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => { setStats(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading || !stats) {
    return <div className="text-white/40 text-sm py-20 text-center">Cargando dashboard...</div>;
  }

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">Dashboard</p>
        <h1 className="text-2xl font-bold tracking-tight">Panel de Administracion</h1>
      </div>

      {/* Revenue — Confirmed (pago enviado o más) */}
      <p className="text-[10px] text-green-400/70 uppercase tracking-[0.2em] mb-3">Ingresos Confirmados · pago enviado</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/[0.03] border border-green-400/20 rounded-xl p-5">
          <p className="text-[10px] text-white/30 uppercase tracking-wider">Total</p>
          <p className="text-2xl font-bold text-green-400 mt-2">₡{stats.revenue.confirmed.total.toLocaleString()}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
          <p className="text-[10px] text-white/30 uppercase tracking-wider">Hoy</p>
          <p className="text-2xl font-bold mt-2">₡{stats.revenue.confirmed.today.toLocaleString()}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
          <p className="text-[10px] text-white/30 uppercase tracking-wider">Esta Semana</p>
          <p className="text-2xl font-bold mt-2">₡{stats.revenue.confirmed.week.toLocaleString()}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
          <p className="text-[10px] text-white/30 uppercase tracking-wider">Este Mes</p>
          <p className="text-2xl font-bold mt-2">₡{stats.revenue.confirmed.month.toLocaleString()}</p>
        </div>
      </div>

      {/* Revenue — Pending (status pendiente) */}
      <p className="text-[10px] text-yellow-400/70 uppercase tracking-[0.2em] mb-3">Ingresos Pendientes · sin pago</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/[0.03] border border-yellow-400/20 rounded-xl p-5">
          <p className="text-[10px] text-white/30 uppercase tracking-wider">Total</p>
          <p className="text-2xl font-bold text-yellow-400 mt-2">₡{stats.revenue.pending.total.toLocaleString()}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
          <p className="text-[10px] text-white/30 uppercase tracking-wider">Hoy</p>
          <p className="text-2xl font-bold mt-2">₡{stats.revenue.pending.today.toLocaleString()}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
          <p className="text-[10px] text-white/30 uppercase tracking-wider">Esta Semana</p>
          <p className="text-2xl font-bold mt-2">₡{stats.revenue.pending.week.toLocaleString()}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
          <p className="text-[10px] text-white/30 uppercase tracking-wider">Este Mes</p>
          <p className="text-2xl font-bold mt-2">₡{stats.revenue.pending.month.toLocaleString()}</p>
        </div>
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
          <p className="text-[10px] text-white/30 uppercase tracking-wider">Total Ordenes</p>
          <p className="text-2xl font-bold mt-2">{stats.totalOrders}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
          <p className="text-[10px] text-white/30 uppercase tracking-wider">Pagos por Verificar</p>
          <p className="text-2xl font-bold text-blue-400 mt-2">{stats.ordersByStatus.pago_enviado || 0}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
          <p className="text-[10px] text-white/30 uppercase tracking-wider">Total Clientes</p>
          <p className="text-2xl font-bold mt-2">{stats.totalCustomers}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
          <p className="text-[10px] text-white/30 uppercase tracking-wider">Productos Vendidos</p>
          <p className="text-2xl font-bold mt-2">{stats.productsSold}</p>
        </div>
      </div>

      {/* Order status breakdown */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 mb-8">
        <p className="text-[10px] text-white/30 uppercase tracking-wider mb-4">Estado de Ordenes</p>
        <div className="flex flex-wrap gap-3">
          {Object.entries(statusLabels).map(([key, { label, color }]) => (
            <div key={key} className="flex items-center gap-2">
              <span className={`text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded ${color}`}>
                {label}
              </span>
              <span className="text-sm font-medium">{stats.ordersByStatus[key] || 0}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent orders + quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2 bg-white/[0.03] border border-white/[0.06] rounded-xl">
          <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
            <p className="text-sm font-medium">Ordenes Recientes</p>
            <Link href="/admin/pedidos" className="text-[10px] text-gold uppercase tracking-wider hover:text-gold/80">
              Ver Todas
            </Link>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {stats.recentOrders.length === 0 ? (
              <div className="p-8 text-center text-white/30 text-sm">No hay ordenes aun.</div>
            ) : (
              stats.recentOrders.map((order) => {
                const st = statusLabels[order.status] || { label: order.status, color: "bg-white/10 text-white/50" };
                return (
                  <Link
                    key={order.id}
                    href="/admin/pedidos"
                    className="flex items-center gap-4 px-5 py-3 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{order.user.name}</p>
                      <p className="text-[10px] text-white/30 font-mono">#{order.id.slice(-8)}</p>
                    </div>
                    <p className="text-sm font-medium">₡{order.total.toLocaleString()}</p>
                    <span className={`text-[9px] font-medium tracking-wider uppercase px-2 py-0.5 rounded ${st.color}`}>
                      {st.label}
                    </span>
                    <p className="text-[10px] text-white/30 hidden sm:block">
                      {new Date(order.createdAt).toLocaleDateString("es-CR")}
                    </p>
                  </Link>
                );
              })
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 space-y-3 h-fit">
          <p className="text-sm font-medium mb-4">Acciones Rapidas</p>
          <Link
            href="/admin/pedidos"
            className="flex items-center gap-3 px-4 py-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm text-blue-400 hover:bg-blue-500/20 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
            </svg>
            Gestionar Pedidos
          </Link>
          <Link
            href="/admin/productos"
            className="flex items-center gap-3 px-4 py-3 bg-gold/10 border border-gold/20 rounded-lg text-sm text-gold hover:bg-gold/20 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Gestionar Productos
          </Link>
          <Link
            href="/admin/clientes"
            className="flex items-center gap-3 px-4 py-3 bg-purple-500/10 border border-purple-500/20 rounded-lg text-sm text-purple-400 hover:bg-purple-500/20 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
            Ver Clientes
          </Link>
        </div>
      </div>
    </>
  );
}
