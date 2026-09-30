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
  title: "Galeria 16 | Camisetas de colección",
  description: "Camisetas de colección — cada pieza, una galería. Envíos a todo Costa Rica.",
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
