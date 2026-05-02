import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/admin";

function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes(",") || str.includes("\"") || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.email || !isAdmin(session.user.email)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      createdAt: true,
      orders: {
        select: {
          total: true,
          shippingName: true,
          shippingLastName: true,
          shippingPhone: true,
          shippingEmail: true,
          shippingAddress: true,
          shippingAddress2: true,
          shippingCity: true,
          shippingProvince: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const headers = [
    "Nombre",
    "Email",
    "Telefono",
    "Direccion (perfil)",
    "Nombre Envio",
    "Apellido Envio",
    "Telefono Envio",
    "Email Envio",
    "Direccion Envio",
    "Direccion Envio 2",
    "Ciudad",
    "Provincia",
    "Total Ordenes",
    "Total Gastado (CRC)",
    "Ultima Orden",
    "Fecha Registro",
  ];

  const rows = users.map((u) => {
    const last = u.orders[0];
    const totalSpent = u.orders.reduce((s, o) => s + o.total, 0);
    return [
      u.name,
      u.email,
      u.phone || "",
      u.address || "",
      last?.shippingName || "",
      last?.shippingLastName || "",
      last?.shippingPhone || "",
      last?.shippingEmail || "",
      last?.shippingAddress || "",
      last?.shippingAddress2 || "",
      last?.shippingCity || "",
      last?.shippingProvince || "",
      u.orders.length,
      totalSpent,
      last ? new Date(last.createdAt).toISOString() : "",
      new Date(u.createdAt).toISOString(),
    ];
  });

  const csv = [headers, ...rows].map((row) => row.map(csvEscape).join(",")).join("\r\n");
  // BOM for Excel UTF-8 compatibility (tildes/ñ)
  const body = "﻿" + csv;

  const date = new Date().toISOString().slice(0, 10);
  return new Response(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="clientes-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
