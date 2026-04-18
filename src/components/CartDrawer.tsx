"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

const FREE_SHIPPING_THRESHOLD = 25000;

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, total, itemCount, isOpen, setIsOpen } = useCart();

  if (!isOpen) return null;

  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - total);
  const freeShippingProgress = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100);
  const qualifiesForFreeShipping = total >= FREE_SHIPPING_THRESHOLD;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 z-50" onClick={() => setIsOpen(false)} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#111] z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-bold tracking-wider uppercase">
            Carrito ({itemCount})
          </h2>
          <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-white/40 text-sm text-center mt-12">Tu carrito está vacío</p>
          ) : (
            items.map((item) => (
              <div key={item.productId + (item.size || "")} className="flex gap-4">
                <div className="relative w-20 h-20 bg-white/5 shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-medium uppercase truncate">{item.name}</h3>
                  {item.size && <p className="text-[10px] text-white/40 mt-0.5">Talla: {item.size}</p>}
                  <p className="text-sm font-medium mt-1">₡{item.price.toLocaleString()}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-6 h-6 border border-white/20 flex items-center justify-center text-xs hover:border-white"
                    >
                      −
                    </button>
                    <span className="text-xs">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-6 h-6 border border-white/20 flex items-center justify-center text-xs hover:border-white"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="ml-auto text-white/30 hover:text-red-400 text-xs"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-white/10 space-y-3">
            {/* Free shipping progress */}
            <div className="space-y-2">
              {qualifiesForFreeShipping ? (
                <p className="text-xs text-center text-green-400 font-bold uppercase tracking-wider">
                  🎉 ¡Tenés envío GRATIS!
                </p>
              ) : (
                <p className="text-[11px] text-center text-white/70 leading-relaxed">
                  Te faltan <span className="font-bold text-white">₡{amountToFreeShipping.toLocaleString()}</span> para envío <span className="font-bold text-white">GRATIS</span>
                </p>
              )}
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${qualifiesForFreeShipping ? "bg-green-400" : "bg-maroon-light"}`}
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-white/60">Subtotal</span>
              <span className="font-bold">₡{total.toLocaleString()}</span>
            </div>
            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-maroon-light text-white text-center text-xs font-medium tracking-[0.2em] uppercase py-3 hover:bg-maroon transition-colors"
            >
              PROCEDER AL PAGO
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
