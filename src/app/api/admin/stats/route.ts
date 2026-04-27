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

  const confirmedStatuses = ["pago_enviado", "confirmado", "enviado", "entregado"];
  const pendingStatuses = ["pendiente"];

  const [
    totalOrders,
    ordersByStatus,
    revConfirmedTotal,
    revConfirmedToday,
    revConfirmedWeek,
    revConfirmedMonth,
    revPendingTotal,
    revPendingToday,
    revPendingWeek,
    revPendingMonth,
    recentOrders,
    totalCustomers,
    soldUnits,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.groupBy({ by: ["status"], _count: true }),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { in: confirmedStatuses } } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { in: confirmedStatuses }, createdAt: { gte: todayStart } } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { in: confirmedStatuses }, createdAt: { gte: weekStart } } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { in: confirmedStatuses }, createdAt: { gte: monthStart } } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { in: pendingStatuses } } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { in: pendingStatuses }, createdAt: { gte: todayStart } } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { in: pendingStatuses }, createdAt: { gte: weekStart } } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { in: pendingStatuses }, createdAt: { gte: monthStart } } }),
    prisma.order.findMany({
      take: 50,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } } },
    }),
    prisma.user.count(),
    prisma.orderItem.aggregate({
      _sum: { quantity: true },
      where: { order: { status: { in: confirmedStatuses } } },
    }),
  ]);

  const statusCounts: Record<string, number> = {};
  for (const s of ordersByStatus) {
    statusCounts[s.status] = s._count;
  }

  const priorityOrder = ["pendiente", "pago_enviado", "confirmado", "enviado", "entregado"];
  const priority = (status: string) => {
    const i = priorityOrder.indexOf(status);
    return i === -1 ? priorityOrder.length : i;
  };
  const sortedRecent = [...recentOrders]
    .sort((a, b) => {
      const p = priority(a.status) - priority(b.status);
      if (p !== 0) return p;
      return b.createdAt.getTime() - a.createdAt.getTime();
    })
    .slice(0, 10);

  return NextResponse.json({
    totalOrders,
    totalCustomers,
    productsSold: soldUnits._sum.quantity || 0,
    ordersByStatus: statusCounts,
    revenue: {
      confirmed: {
        total: revConfirmedTotal._sum.total || 0,
        today: revConfirmedToday._sum.total || 0,
        week: revConfirmedWeek._sum.total || 0,
        month: revConfirmedMonth._sum.total || 0,
      },
      pending: {
        total: revPendingTotal._sum.total || 0,
        today: revPendingToday._sum.total || 0,
        week: revPendingWeek._sum.total || 0,
        month: revPendingMonth._sum.total || 0,
      },
    },
    recentOrders: sortedRecent,
  });
}
