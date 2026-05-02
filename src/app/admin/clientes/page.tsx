"use client";

import { useState, useEffect, useMemo } from "react";
import { statusLabels } from "@/lib/admin-types";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  createdAt: string;
  orderCount: number;
  totalSpent: number;
  orders: { id: string; total: number; status: string; createdAt: string }[];
}

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/customers")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setCustomers(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return customers;
    const q = search.toLowerCase();
    return customers.filter(
      (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || (c.phone && c.phone.includes(q))
    );
  }, [customers, search]);

  if (loading) {
    return <div className="text-white/40 text-sm py-20 text-center">Cargando clientes...</div>;
  }

  return (
    <>
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">Clientes</p>
          <h1 className="text-2xl font-bold tracking-tight">Clientes Registrados</h1>
          <p className="text-sm text-white/30 mt-1">{customers.length} clientes en total</p>
        </div>
        <a
          href="/api/admin/customers/export"
          className="inline-flex items-center gap-2 bg-gold/90 hover:bg-gold text-black text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <path d="M7 10l5 5 5-5" />
            <path d="M12 15V3" />
          </svg>
          Descargar CSV
        </a>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre, email o telefono..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-gold/50"
        />
      </div>

      {/* Customers list */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left px-5 py-3 text-[10px] text-white/30 uppercase tracking-wider font-medium">Cliente</th>
                <th className="text-left px-5 py-3 text-[10px] text-white/30 uppercase tracking-wider font-medium hidden md:table-cell">Telefono</th>
                <th className="text-left px-5 py-3 text-[10px] text-white/30 uppercase tracking-wider font-medium">Ordenes</th>
                <th className="text-left px-5 py-3 text-[10px] text-white/30 uppercase tracking-wider font-medium">Total Gastado</th>
                <th className="text-left px-5 py-3 text-[10px] text-white/30 uppercase tracking-wider font-medium hidden md:table-cell">Registro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.map((c) => {
                const isExpanded = expandedCustomer === c.id;
                return (
                  <tr key={c.id} className="group">
                    <td colSpan={5} className="p-0">
                      {/* Main row */}
                      <div
                        className="flex items-center gap-4 px-5 py-3 cursor-pointer hover:bg-white/[0.02] transition-colors"
                        onClick={() => setExpandedCustomer(isExpanded ? null : c.id)}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-[180px]">
                          {c.avatar ? (
                            <img src={c.avatar} alt="" className="w-8 h-8 rounded-full object-contain bg-white/10" />
                          ) : (
                            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-xs font-bold">
                              {c.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{c.name}</p>
                            <p className="text-[10px] text-white/30">{c.email}</p>
                          </div>
                        </div>
                        <div className="min-w-[100px] hidden md:block">
                          <p className="text-white/40">{c.phone || "—"}</p>
                        </div>
                        <div className="min-w-[80px]">
                          <p className="font-medium">{c.orderCount}</p>
                        </div>
                        <div className="min-w-[120px]">
                          <p className="font-medium">₡{c.totalSpent.toLocaleString()}</p>
                        </div>
                        <div className="min-w-[100px] hidden md:block">
                          <p className="text-white/40">{new Date(c.createdAt).toLocaleDateString("es-CR")}</p>
                        </div>
                        <svg
                          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                          className={`text-white/20 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>

                      {/* Expanded — order history */}
                      {isExpanded && c.orders.length > 0 && (
                        <div className="px-5 pb-4">
                          <div className="bg-white/[0.02] rounded-lg overflow-hidden ml-11">
                            <div className="px-4 py-2 border-b border-white/[0.04]">
                              <p className="text-[10px] text-white/30 uppercase tracking-wider">Historial de Ordenes</p>
                            </div>
                            {c.orders.map((o) => {
                              const st = statusLabels[o.status] || { label: o.status, color: "bg-white/10 text-white/50" };
                              return (
                                <div key={o.id} className="flex items-center gap-4 px-4 py-2.5 border-b border-white/[0.02] last:border-0">
                                  <p className="text-xs font-mono text-white/40">#{o.id.slice(-8)}</p>
                                  <p className="text-xs flex-1">₡{o.total.toLocaleString()}</p>
                                  <span className={`text-[9px] font-medium tracking-wider uppercase px-2 py-0.5 rounded ${st.color}`}>
                                    {st.label}
                                  </span>
                                  <p className="text-[10px] text-white/30">{new Date(o.createdAt).toLocaleDateString("es-CR")}</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      {isExpanded && c.orders.length === 0 && (
                        <div className="px-5 pb-4">
                          <p className="text-xs text-white/20 ml-11">Sin ordenes.</p>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
