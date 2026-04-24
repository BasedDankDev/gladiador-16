import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(products, {
    headers: { "Cache-Control": "no-store, must-revalidate" },
  });
}
