"use client";

import { useState } from "react";
import Image from "next/image";

const designs = [
  { name: "El Papa", image: "/hombre/camiseta-papa/3.png", closeup: "/hombre/camiseta-papa/4.png" },
  { name: "Goku S", image: "/hombre/camiseta-goku/4.png", closeup: "/hombre/camiseta-goku/3.png" },
  { name: "Retro 2005", image: "/hombre/retro-2005/3.png", closeup: "/hombre/retro-2005/1.png" },
  { name: "Retro 2008", image: "/hombre/retro-2008/2.png", closeup: "/hombre/retro-2008/1.png" },
];

const qualities = ["Slim Fit", "Dry Fit"];
const variants = ["Hombre", "Mujer"];
const sizes = ["XS", "S", "M", "L", "XL", "2XL"];

export default function FeaturedCollection() {
  const [selectedDesign, setSelectedDesign] = useState(0);
  const [selectedQuality, setSelectedQuality] = useState("Slim Fit");
  const [selectedVariant, setSelectedVariant] = useState("Hombre");
  const [selectedSize, setSelectedSize] = useState("M");
  const [customTab, setCustomTab] = useState<"jugador" | "nombre">("jugador");
  const [customName, setCustomName] = useState("");
  const [customNumber, setCustomNumber] = useState("");

  const basePrice = 12500;
  const customPrice = (customName || customNumber) ? 3500 : 0;
  const subtotal = basePrice + customPrice;

  return (
    <section className="bg-cream px-6 md:px-16 pb-20">
      <div className="bg-[#0c1228] rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="px-8 md:px-12 pt-8 md:pt-10">
          <h2 className="text-2xl md:text-3xl font-black italic text-white tracking-tight">
            Personaliza tu camiseta
          </h2>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 md:p-12 md:pt-8">
          {/* Left — Large product image */}
          <div className="relative aspect-square md:aspect-auto flex items-center justify-center">
            <div className="relative w-full h-full max-h-[560px]">
              <Image
                src={designs[selectedDesign].image}
                alt={designs[selectedDesign].name}
                fill
                className="object-contain transition-all duration-300"
                sizes="(max-width: 768px) 100vw, 45vw"
                priority
              />
            </div>
          </div>

          {/* Right — Options */}
          <div className="space-y-6">
            {/* Design picker */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-bold text-white uppercase tracking-wider">Elige Diseno</p>
                <p className="text-sm font-bold text-white">₡{basePrice.toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                {designs.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedDesign(i)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedDesign === i ? "border-blue-500" : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <Image
                      src={d.closeup}
                      alt={d.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Quality */}
            <div>
              <p className="text-[11px] font-bold text-white uppercase tracking-wider mb-3">Elige Calidad</p>
              <div className="flex gap-2">
                {qualities.map((q) => (
                  <button
                    key={q}
                    onClick={() => setSelectedQuality(q)}
                    className={`text-xs font-medium px-5 py-2 rounded-full border transition-colors ${
                      selectedQuality === q
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-white/20 text-white/60 hover:border-white/40"
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Variant */}
            <div>
              <p className="text-[11px] font-bold text-white uppercase tracking-wider mb-3">Elige Variante</p>
              <div className="flex gap-2">
                {variants.map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVariant(v)}
                    className={`text-xs font-medium px-5 py-2 rounded-full border transition-colors ${
                      selectedVariant === v
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-white/20 text-white/60 hover:border-white/40"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <p className="text-[11px] font-bold text-white uppercase tracking-wider mb-3">Elige Talla</p>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`text-xs font-medium w-10 h-10 rounded-full border transition-colors ${
                      selectedSize === s
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-white/20 text-white/60 hover:border-white/40"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Personalization */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-bold text-white uppercase tracking-wider">Personaliza esta camiseta</p>
                <p className="text-xs text-white/50">+₡3 500</p>
              </div>
              {/* Toggle tabs */}
              <div className="flex rounded-full overflow-hidden border border-white/10 mb-3">
                <button
                  onClick={() => setCustomTab("jugador")}
                  className={`flex-1 text-xs font-medium py-2.5 transition-colors ${
                    customTab === "jugador"
                      ? "bg-blue-600 text-white"
                      : "text-white/50 hover:text-white/70"
                  }`}
                >
                  Elige jugador/a
                </button>
                <button
                  onClick={() => setCustomTab("nombre")}
                  className={`flex-1 text-xs font-medium py-2.5 transition-colors ${
                    customTab === "nombre"
                      ? "bg-blue-600 text-white"
                      : "text-white/50 hover:text-white/70"
                  }`}
                >
                  Anade tu nombre
                </button>
              </div>
              {customTab === "jugador" ? (
                <select className="w-full bg-[#151d3a] border border-white/10 text-white/70 text-sm rounded-lg px-4 py-3 outline-none focus:border-blue-500 appearance-none">
                  <option>Elige jugador/a</option>
                  <option>10 - Bryan Ruiz</option>
                  <option>9 - Alvaro Saborio</option>
                  <option>7 - Christian Bolanos</option>
                  <option>5 - Celso Borges</option>
                </select>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="flex-1 bg-[#151d3a] border border-white/10 text-white text-sm rounded-lg px-4 py-3 outline-none focus:border-blue-500 placeholder-white/30"
                  />
                  <input
                    type="text"
                    placeholder="#"
                    value={customNumber}
                    onChange={(e) => setCustomNumber(e.target.value)}
                    className="w-16 bg-[#151d3a] border border-white/10 text-white text-sm rounded-lg px-4 py-3 outline-none focus:border-blue-500 placeholder-white/30 text-center"
                  />
                </div>
              )}
            </div>

            {/* Subtotal */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <p className="text-sm font-bold text-white">Subtotal</p>
              <p className="text-sm font-bold text-white">₡{subtotal.toLocaleString()},00</p>
            </div>

            {/* Add to cart */}
            <button className="w-full bg-amber-400 hover:bg-amber-300 text-black text-sm font-bold tracking-wider uppercase py-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              Anadir a la cesta
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
