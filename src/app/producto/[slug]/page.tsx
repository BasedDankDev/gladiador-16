"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import {
  PRODUCT_DESCRIPTIONS,
  DELIVERY_TIME,
  type ProductType,
} from "@/lib/product-descriptions";

interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  price: number;
  image: string;
  images: string | null;
  badge: string | null;
  variants: string | null;
  category: string;
  productType: string | null;
  inStock: boolean;
}

const SIZES = ["XS", "S", "M", "L", "XL"];

type AccordionKey = "description" | "composition" | "sizing";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<AccordionKey | null>("description");
  const { addItem } = useCart();

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((products: Product[]) => {
        const found = products.find((p) => p.slug === slug);
        if (found) {
          setProduct(found);
          // Get related products: same category first, then others, excluding current
          const sameCategory = products.filter((p) => p.slug !== slug && p.category === found.category);
          const others = products.filter((p) => p.slug !== slug && p.category !== found.category);
          setRelated([...sameCategory, ...others].slice(0, 5));
        }
        setSelectedImage(0);
      });
  }, [slug]);

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-black flex items-center justify-center">
          <p className="text-white/40">Cargando...</p>
        </main>
      </>
    );
  }

  const allImages: string[] = product.images
    ? JSON.parse(product.images)
    : [product.image];

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      size: selectedSize,
      slug: product.slug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-[80px_1fr_380px] gap-4 md:gap-6">

            {/* Left — Thumbnail strip */}
            <div className="hidden md:flex flex-col gap-2 overflow-y-auto max-h-[600px] pr-1">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative aspect-[2/3] w-[72px] shrink-0 border-2 transition-colors overflow-hidden ${
                    selectedImage === i
                      ? "border-gold"
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="72px"
                  />
                </button>
              ))}
            </div>

            {/* Center — Main image */}
            <div className="relative">
              <button
                onClick={() => setLightbox(selectedImage)}
                className="relative w-full aspect-[3/4] bg-white/5 cursor-zoom-in block"
              >
                <Image
                  src={allImages[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                {product.badge && (
                  <span className={`absolute top-4 left-4 text-[9px] font-medium tracking-wider uppercase px-2.5 py-1 ${
                    product.badge === "AGOTADO" ? "bg-maroon-light text-white" : "bg-gold/90 text-black"
                  }`}>
                    {product.badge}
                  </span>
                )}
              </button>

              {/* Prev / Next arrows on main image */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((selectedImage - 1 + allImages.length) % allImages.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/70 text-white/70 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setSelectedImage((selectedImage + 1) % allImages.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/70 text-white/70 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </>
              )}

              {/* Mobile thumbnail row */}
              <div className="flex md:hidden gap-2 mt-3 overflow-x-auto pb-2">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-14 h-[84px] shrink-0 border-2 transition-colors overflow-hidden ${
                      selectedImage === i
                        ? "border-gold"
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right — Product details */}
            <div className="flex flex-col">
              <p className="text-[10px] text-white/40 tracking-[0.2em] uppercase">{product.brand}</p>
              <h1 className="text-2xl font-black tracking-tight uppercase mt-1">{product.name}</h1>
              <p className="text-2xl font-bold mt-3">₡{product.price.toLocaleString()}</p>
              {product.variants && (
                <p className="text-[11px] text-white/40 mt-1">{product.variants}</p>
              )}

              {/* Size Selector */}
              <div className="mt-8">
                <p className="text-[10px] uppercase tracking-wider text-white/50 mb-3">Talla</p>
                <div className="flex gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 border text-xs font-medium transition-colors ${
                        selectedSize === size
                          ? "border-gold text-gold"
                          : "border-white/20 text-white/60 hover:border-white/40"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-6">
                <p className="text-[10px] uppercase tracking-wider text-white/50 mb-3">Cantidad</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-white transition-colors"
                  >
                    −
                  </button>
                  <span className="text-sm font-medium w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-white transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`mt-8 w-full text-xs font-bold tracking-[0.2em] uppercase py-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                  !product.inStock
                    ? "bg-white/10 text-white/30 cursor-not-allowed"
                    : added
                    ? "bg-green-600 text-white"
                    : "bg-gold text-black hover:bg-gold/80"
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {!product.inStock ? "AGOTADO" : added ? "AGREGADO AL CARRITO!" : "AGREGAR AL CARRITO"}
              </button>

              {/* Shipping note */}
              <div className="mt-6 flex items-center gap-2 text-[11px] text-white/40">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                Envio a todo Costa Rica · Pago por SINPE Movil
              </div>

              {/* Accordions */}
              {(() => {
                const type = product.productType as ProductType | null;
                const copy = type ? PRODUCT_DESCRIPTIONS[type] : null;
                if (!copy) return null;

                const toggle = (key: AccordionKey) =>
                  setOpenAccordion(openAccordion === key ? null : key);

                const Chevron = ({ open }: { open: boolean }) => (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className={`transition-transform ${open ? "rotate-180" : ""}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                );

                return (
                  <div className="mt-8 border-t border-white/10">
                    {/* Descripción del producto */}
                    <div className="border-b border-white/10">
                      <button
                        onClick={() => toggle("description")}
                        className="w-full flex items-center justify-between py-4 text-[11px] font-medium tracking-[0.15em] uppercase text-white/80 hover:text-white transition-colors"
                      >
                        Descripción del producto
                        <Chevron open={openAccordion === "description"} />
                      </button>
                      {openAccordion === "description" && (
                        <div className="pb-5 space-y-3 text-[12px] leading-relaxed text-white/60">
                          <p>{copy.description}</p>
                          <ul className="list-disc pl-5 space-y-1">
                            {copy.bullets.map((b) => (
                              <li key={b}>{b}</li>
                            ))}
                          </ul>
                          <p className="text-white/40 text-[11px] pt-2">
                            *El plazo de entrega es de {DELIVERY_TIME}.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Composición y cuidados */}
                    <div className="border-b border-white/10">
                      <button
                        onClick={() => toggle("composition")}
                        className="w-full flex items-center justify-between py-4 text-[11px] font-medium tracking-[0.15em] uppercase text-white/80 hover:text-white transition-colors"
                      >
                        Composición y cuidados
                        <Chevron open={openAccordion === "composition"} />
                      </button>
                      {openAccordion === "composition" && (
                        <p className="pb-5 text-[12px] leading-relaxed text-white/60">
                          {copy.composition}
                        </p>
                      )}
                    </div>

                    {/* Talla y ajustes */}
                    <div className="border-b border-white/10">
                      <button
                        onClick={() => toggle("sizing")}
                        className="w-full flex items-center justify-between py-4 text-[11px] font-medium tracking-[0.15em] uppercase text-white/80 hover:text-white transition-colors"
                      >
                        Talla y ajustes
                        <Chevron open={openAccordion === "sizing"} />
                      </button>
                      {openAccordion === "sizing" && (
                        <p className="pb-5 text-[12px] leading-relaxed text-white/60">
                          {copy.sizing}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* Shipping info */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-[11px] text-white/40">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="1" y="3" width="15" height="13" rx="2" />
                    <path d="M16 8h4l3 3v5a2 2 0 01-2 2h-1" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                  Envio gratis en pedidos mayores a ₡25 000
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Podria Interesarte */}
        {related.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 md:px-10 mt-20 mb-16">
            <h2 className="text-2xl md:text-3xl font-black italic text-white tracking-tight mb-8">
              Podria Interesarte
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/producto/${item.slug}`}
                  className="group shrink-0 w-[60vw] sm:w-[40vw] md:w-[calc(20%-13px)]"
                >
                  <div className="relative overflow-hidden bg-white/5 aspect-[3/4]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 60vw, (max-width: 768px) 40vw, 20vw"
                    />
                    {item.badge && (
                      <span className={`absolute top-3 left-3 text-[9px] font-medium tracking-wider uppercase px-2.5 py-1 ${
                        item.badge === "AGOTADO" ? "bg-maroon-light text-white" : "bg-gold/90 text-black"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="mt-3">
                    <p className="text-[10px] text-white/30 tracking-[0.15em] uppercase">{item.brand}</p>
                    <h3 className="text-sm text-white/80 font-medium mt-0.5 group-hover:text-white transition-colors">{item.name}</h3>
                    <p className="text-sm font-bold text-white mt-1">₡{item.price.toLocaleString()},00</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Fullscreen Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); const next = (lightbox - 1 + allImages.length) % allImages.length; setLightbox(next); setSelectedImage(next); }}
                className="absolute left-4 md:left-8 text-white/60 hover:text-white transition-colors z-10"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); const next = (lightbox + 1) % allImages.length; setLightbox(next); setSelectedImage(next); }}
                className="absolute right-4 md:right-8 text-white/60 hover:text-white transition-colors z-10"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}

          <div className="relative w-[90vw] h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={allImages[lightbox]}
              alt={`${product.name} ${lightbox + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          <p className="absolute bottom-6 text-white/40 text-xs tracking-wider">
            {lightbox + 1} / {allImages.length}
          </p>
        </div>
      )}
      <Footer />
    </>
  );
}
