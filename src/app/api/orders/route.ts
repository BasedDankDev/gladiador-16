import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Debés iniciar sesión" }, { status: 401 });
    }

    const { items, shippingName, shippingPhone, shippingAddress } = await req.json();

    if (!items?.length || !shippingName || !shippingPhone || !shippingAddress) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    // Calculate total from DB prices (don't trust client)
    const productIds = items.map((i: { productId: string }) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    let total = 0;
    const orderItems = items.map((item: { productId: string; quantity: number; size?: string; color?: string }) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) throw new Error("Producto no encontrado");
      total += product.price * item.quantity;
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
        size: item.size || null,
        color: item.color || null,
      };
    });

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        total,
        shippingName,
        shippingPhone,
        shippingAddress,
        items: { create: orderItems },
      },
      include: { items: { include: { product: true } } },
    });

    return NextResponse.json(order);
  } catch {
    return NextResponse.json({ error: "Error al crear la orden" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch {
    return NextResponse.json({ error: "Error al obtener ordenes" }, { status: 500 });
  }
}
