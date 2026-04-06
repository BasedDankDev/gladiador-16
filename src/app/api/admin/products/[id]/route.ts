import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/admin";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.email || !isAdmin(session.user.email)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();

  const product = await prisma.product.update({
    where: { id },
    data: {
      ...(body.name !== undefined && { name: body.name }),
      ...(body.slug !== undefined && { slug: body.slug }),
      ...(body.price !== undefined && { price: Number(body.price) }),
      ...(body.image !== undefined && { image: body.image }),
      ...(body.images !== undefined && { images: body.images || null }),
      ...(body.badge !== undefined && { badge: body.badge || null }),
      ...(body.category !== undefined && { category: body.category }),
      ...(body.brand !== undefined && { brand: body.brand }),
      ...(body.variants !== undefined && { variants: body.variants || null }),
      ...(body.inStock !== undefined && { inStock: body.inStock }),
    },
  });

  return NextResponse.json(product);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.email || !isAdmin(session.user.email)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { id } = await params;

  const orderCount = await prisma.orderItem.count({ where: { productId: id } });
  if (orderCount > 0) {
    return NextResponse.json(
      { error: `No se puede eliminar: este producto tiene ${orderCount} ordenes asociadas.` },
      { status: 409 }
    );
  }

  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
