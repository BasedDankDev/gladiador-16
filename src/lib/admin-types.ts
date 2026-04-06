export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  size: string | null;
  color: string | null;
  product: { name: string; slug: string; image: string };
}

export interface Order {
  id: string;
  status: string;
  total: number;
  sinpeRef: string | null;
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  paymentMethod: string;
  createdAt: string;
  user: { id: string; name: string; email: string; phone: string | null };
  items: OrderItem[];
}

export const statusLabels: Record<string, { label: string; color: string }> = {
  pendiente: { label: "Pendiente", color: "bg-yellow-400/20 text-yellow-400" },
  pago_enviado: { label: "Pago Enviado", color: "bg-blue-400/20 text-blue-400" },
  confirmado: { label: "Confirmado", color: "bg-green-400/20 text-green-400" },
  enviado: { label: "Enviado", color: "bg-purple-400/20 text-purple-400" },
  entregado: { label: "Entregado", color: "bg-green-300/20 text-green-300" },
};

export const STATUS_ORDER = ["pendiente", "pago_enviado", "confirmado", "enviado", "entregado"];
