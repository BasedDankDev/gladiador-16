import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/context/SessionProvider";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppBubble from "@/components/WhatsAppBubble";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Gladiador 16 | Ropa Deportiva de Elite",
  description: "Ropa deportiva de elite — Tendencias actuales, verano 2026. San José, Costa Rica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-black text-white font-sans">
        <SessionProvider>
          <CartProvider>
            {children}
            <CartDrawer />
            <WhatsAppBubble />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
