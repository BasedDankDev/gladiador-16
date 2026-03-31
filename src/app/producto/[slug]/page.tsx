"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

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
  inStock: boolean;
}

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((products: Product[]) => {
        const found = products.find((p) => p.slug === slug);
        if (found) setProduct(found);
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

  const allImages: string[] = product
    ? product.images
      ? JSON.parse(product.images)
      : [product.image]
    : [];

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
        <div className="max-w-6xl mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-[1fr_400px] gap-10">
            {/* Image Gallery Grid */}
            <div className="grid grid-cols-2 gap-2">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(i)}
                  className="relative aspect-[3/4] bg-white/5 cursor-zoom-in"
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 50vw, 30vw"
                    priority={i === 0}
                  />
                  {i === 0 && product.badge && (
                    <span className={`absolute top-3 left-3 text-[9px] font-medium tracking-wider uppercase px-2.5 py-1 ${
                      product.badge === "AGOTADO" ? "bg-maroon-light text-white" : "bg-gold/90 text-black"
                    }`}>
                      {product.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Details */}
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
                className={`mt-8 w-full text-xs font-medium tracking-[0.2em] uppercase py-4 transition-colors ${
                  !product.inStock
                    ? "bg-white/10 text-white/30 cursor-not-allowed"
                    : added
                    ? "bg-green-600 text-white"
                    : "bg-maroon-light text-white hover:bg-maroon"
                }`}
              >
                {!product.inStock ? "AGOTADO" : added ? "¡AGREGADO AL CARRITO!" : "AGREGAR AL CARRITO"}
              </button>

              {/* Shipping note */}
              <div className="mt-6 flex items-center gap-2 text-[11px] text-white/40">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                Envío a todo Costa Rica · Pago por SINPE Móvil
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Fullscreen Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Previous arrow */}
          {allImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + allImages.length) % allImages.length); }}
              className="absolute left-4 md:left-8 text-white/60 hover:text-white transition-colors z-10"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Full-size image */}
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

          {/* Next arrow */}
          {allImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % allImages.length); }}
              className="absolute right-4 md:right-8 text-white/60 hover:text-white transition-colors z-10"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}

          {/* Image counter */}
          <p className="absolute bottom-6 text-white/40 text-xs tracking-wider">
            {lightbox + 1} / {allImages.length}
          </p>
        </div>
      )}
      <Footer />
    </>
  );
}
