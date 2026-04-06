"use client";

import { useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  images: string | null;
  badge: string | null;
  category: string;
  brand: string;
  variants: string | null;
  inStock: boolean;
  createdAt: string;
  _count: { orderItems: number };
}

const CATEGORIES = ["general", "nuevo", "hombre", "mujer", "accesorios"];

const emptyForm = {
  name: "",
  slug: "",
  price: "",
  image: "",
  images: "",
  badge: "",
  category: "general",
  brand: "GLADIADOR 16",
  inStock: true,
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    if (Array.isArray(data)) setProducts(data);
    setLoading(false);
  }

  function openCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setShowForm(true);
  }

  function openEdit(p: Product) {
    setForm({
      name: p.name,
      slug: p.slug,
      price: String(p.price),
      image: p.image,
      images: p.images || "",
      badge: p.badge || "",
      category: p.category,
      brand: p.brand,
      inStock: p.inStock,
    });
    setEditingId(p.id);
    setError("");
    setShowForm(true);
  }

  async function handleSave() {
    setSaving(true);
    setError("");

    const url = editingId ? `/api/admin/products/${editingId}` : "/api/admin/products";
    const method = editingId ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: Number(form.price) }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Error al guardar");
      setSaving(false);
      return;
    }

    setShowForm(false);
    setSaving(false);
    fetchProducts();
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Error al eliminar");
    }
    setDeleteConfirm(null);
    fetchProducts();
  }

  async function toggleStock(p: Product) {
    await fetch(`/api/admin/products/${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inStock: !p.inStock }),
    });
    setProducts((prev) => prev.map((x) => (x.id === p.id ? { ...x, inStock: !x.inStock } : x)));
  }

  if (loading) {
    return <div className="text-white/40 text-sm py-20 text-center">Cargando productos...</div>;
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">Productos</p>
          <h1 className="text-2xl font-bold tracking-tight">Gestion de Productos</h1>
        </div>
        <button
          onClick={openCreate}
          className="bg-gold text-black text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg hover:bg-gold/80 transition-colors"
        >
          + Nuevo Producto
        </button>
      </div>

      {/* Products table */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left px-5 py-3 text-[10px] text-white/30 uppercase tracking-wider font-medium">Producto</th>
                <th className="text-left px-5 py-3 text-[10px] text-white/30 uppercase tracking-wider font-medium">Precio</th>
                <th className="text-left px-5 py-3 text-[10px] text-white/30 uppercase tracking-wider font-medium hidden md:table-cell">Categoria</th>
                <th className="text-left px-5 py-3 text-[10px] text-white/30 uppercase tracking-wider font-medium hidden md:table-cell">Ordenes</th>
                <th className="text-left px-5 py-3 text-[10px] text-white/30 uppercase tracking-wider font-medium">Stock</th>
                <th className="text-right px-5 py-3 text-[10px] text-white/30 uppercase tracking-wider font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 object-contain bg-white/5 rounded" />
                      <div>
                        <p className="font-medium">{p.name}</p>
                        <p className="text-[10px] text-white/30 font-mono">{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 font-medium">₡{p.price.toLocaleString()}</td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    <span className="text-[10px] uppercase tracking-wider text-white/40 bg-white/5 px-2 py-1 rounded">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell text-white/40">{p._count.orderItems}</td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => toggleStock(p)}
                      className={`text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded transition-colors ${
                        p.inStock ? "bg-green-400/20 text-green-400" : "bg-red-400/20 text-red-400"
                      }`}
                    >
                      {p.inStock ? "En Stock" : "Agotado"}
                    </button>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="text-[10px] text-white/40 hover:text-white uppercase tracking-wider border border-white/10 px-3 py-1.5 rounded hover:border-white/30 transition-colors"
                      >
                        Editar
                      </button>
                      {deleteConfirm === p.id ? (
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="text-[10px] text-red-400 uppercase tracking-wider border border-red-400/30 px-3 py-1.5 rounded hover:bg-red-400/10 transition-colors"
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="text-[10px] text-white/40 uppercase tracking-wider border border-white/10 px-3 py-1.5 rounded hover:border-white/30 transition-colors"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(p.id)}
                          className="text-[10px] text-red-400/50 hover:text-red-400 uppercase tracking-wider border border-white/10 px-3 py-1.5 rounded hover:border-red-400/30 transition-colors"
                        >
                          Eliminar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-[#111] border border-white/10 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-white/[0.06]">
              <h3 className="text-lg font-bold">{editingId ? "Editar Producto" : "Nuevo Producto"}</h3>
            </div>
            <div className="p-6 space-y-4">
              {error && <p className="text-red-400 text-xs bg-red-400/10 px-3 py-2 rounded">{error}</p>}

              <div>
                <label className="text-[10px] text-white/40 uppercase tracking-wider block mb-1">Nombre *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gold/50"
                />
              </div>

              <div>
                <label className="text-[10px] text-white/40 uppercase tracking-wider block mb-1">Slug</label>
                <input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="auto-generado si se deja vacio"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gold/50 placeholder-white/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-white/40 uppercase tracking-wider block mb-1">Precio (₡) *</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gold/50"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-white/40 uppercase tracking-wider block mb-1">Categoria</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gold/50"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] text-white/40 uppercase tracking-wider block mb-1">Imagen URL *</label>
                <input
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="/images/products/..."
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gold/50 placeholder-white/20"
                />
              </div>

              <div>
                <label className="text-[10px] text-white/40 uppercase tracking-wider block mb-1">Imagenes adicionales (JSON array)</label>
                <input
                  value={form.images}
                  onChange={(e) => setForm({ ...form, images: e.target.value })}
                  placeholder='["/images/products/img-1.png", "/images/products/img-2.png"]'
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gold/50 placeholder-white/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-white/40 uppercase tracking-wider block mb-1">Badge</label>
                  <input
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    placeholder="NUEVO, ENVIO RAPIDO..."
                    className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gold/50 placeholder-white/20"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-white/40 uppercase tracking-wider block mb-1">Marca</label>
                  <input
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gold/50"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setForm({ ...form, inStock: !form.inStock })}
                  className={`w-10 h-5 rounded-full transition-colors relative ${form.inStock ? "bg-green-500" : "bg-white/20"}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${form.inStock ? "left-5" : "left-0.5"}`} />
                </button>
                <span className="text-sm text-white/60">En Stock</span>
              </div>
            </div>

            <div className="p-6 border-t border-white/[0.06] flex gap-3 justify-end">
              <button
                onClick={() => setShowForm(false)}
                className="text-xs text-white/40 uppercase tracking-wider border border-white/10 px-5 py-2.5 rounded-lg hover:border-white/30 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.name || !form.price || !form.image}
                className="bg-gold text-black text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg hover:bg-gold/80 transition-colors disabled:opacity-40"
              >
                {saving ? "Guardando..." : editingId ? "Actualizar" : "Crear Producto"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
