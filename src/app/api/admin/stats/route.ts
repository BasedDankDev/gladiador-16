import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/admin";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email || !isAdmin(session.user.email)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    totalOrders,
    ordersByStatus,
    revenueTotal,
    revenueToday,
    revenueWeek,
    revenueMonth,
    recentOrders,
    totalCustomers,
    totalProducts,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.groupBy({ by: ["status"], _count: true }),
    prisma.order.aggregate({ _sum: { total: true } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { createdAt: { gte: todayStart } } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { createdAt: { gte: weekStart } } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { createdAt: { gte: monthStart } } }),
    prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } } },
    }),
    prisma.user.count(),
    prisma.product.count(),
  ]);

  const statusCounts: Record<string, number> = {};
  for (const s of ordersByStatus) {
    statusCounts[s.status] = s._count;
  }

  return NextResponse.json({
    totalOrders,
    totalCustomers,
    totalProducts,
    ordersByStatus: statusCounts,
    revenue: {
      total: revenueTotal._sum.total || 0,
      today: revenueToday._sum.total || 0,
      week: revenueWeek._sum.total || 0,
      month: revenueMonth._sum.total || 0,
    },
    recentOrders,
  });
}
