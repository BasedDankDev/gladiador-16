import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/admin";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email || !isAdmin(session.user.email)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const products = await prisma.product.findMany({
    include: { _count: { select: { orderItems: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email || !isAdmin(session.user.email)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const body = await req.json();
  const { name, slug, price, image, images, badge, category, brand, variants, inStock } = body;

  if (!name || !price || !image) {
    return NextResponse.json({ error: "Nombre, precio e imagen son requeridos" }, { status: 400 });
  }

  const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const existing = await prisma.product.findUnique({ where: { slug: finalSlug } });
  if (existing) {
    return NextResponse.json({ error: "Ya existe un producto con ese slug" }, { status: 409 });
  }

  const product = await prisma.product.create({
    data: {
      name,
      slug: finalSlug,
      price: Number(price),
      image,
      images: images || null,
      badge: badge || null,
      category: category || "general",
      brand: brand || "GLADIADOR 16",
      variants: variants || null,
      inStock: inStock !== false,
    },
  });

  return NextResponse.json(product, { status: 201 });
}
