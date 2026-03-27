import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const { sinpeRef } = await req.json();

    if (!sinpeRef) {
      return NextResponse.json({ error: "Número de referencia requerido" }, { status: 400 });
    }

    const order = await prisma.order.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!order) {
      return NextResponse.json({ error: "Orden no encontrada" }, { status: 404 });
    }

    const updated = await prisma.order.update({
      where: { id },
      data: {
        sinpeRef,
        status: "pago_enviado",
      },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Error al procesar pago" }, { status: 500 });
  }
}
