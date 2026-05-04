import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderEmailData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  items: { name: string; quantity: number; price: number; size?: string | null }[];
  subtotal: number;
  shippingCost: number;
  total: number;
  shippingMethod: string;
  shippingAddress: string;
  shippingCity: string | null;
  shippingProvince: string | null;
  shippingPhone: string;
}

export async function sendOrderConfirmationEmail(data: OrderEmailData) {
  const orderNumber = data.orderId.slice(-5);
  const date = new Date().toLocaleDateString("es-CR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const itemsRows = data.items
    .map(
      (item) =>
        `<tr>
          <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;">
            ${item.name}${item.size ? ` (${item.size})` : ""}
          </td>
          <td style="padding:10px 0;border-bottom:1px solid #eee;text-align:center;font-size:14px;">${item.quantity}</td>
          <td style="padding:10px 0;border-bottom:1px solid #eee;text-align:right;font-size:14px;">₡${(item.price * item.quantity).toLocaleString()},00</td>
        </tr>`
    )
    .join("");

  const html = `
    <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;color:#333;">
      <!-- Header -->
      <div style="background:#560319;padding:24px;text-align:center;">
        <img src="https://gladiador16.com/gladiador-logo.png" alt="Gladiador 16" width="48" height="48" style="display:block;margin:0 auto 10px;" />
        <h1 style="color:white;margin:0;font-size:18px;letter-spacing:2px;">GLADIADOR 16</h1>
      </div>

      <!-- Title -->
      <div style="padding:30px 24px;text-align:center;">
        <h2 style="margin:0 0 8px;font-size:20px;">Pedido | Invoice #${orderNumber}</h2>
      </div>

      <!-- Greeting -->
      <div style="padding:0 24px 20px;">
        <p style="font-size:16px;margin:0 0 4px;"><strong>Hola ${data.customerName},</strong></p>
        <p style="font-size:14px;color:#666;margin:0 0 4px;">Gracias por tu compra.</p>
        <p style="font-size:14px;color:#666;margin:0 0 16px;">Hemos recibido tu pedido.</p>

        <div style="background:#fff3f3;border-left:4px solid #c00;padding:16px;margin-bottom:20px;">
          <p style="margin:0 0 8px;font-weight:bold;color:#c00;font-size:14px;">ATENCION</p>
          <p style="margin:0 0 8px;font-weight:bold;font-size:13px;">Antes de realizar tu pago, espera la confirmacion de nuestro equipo.</p>
          <p style="margin:0 0 8px;font-size:13px;"><strong>Envíanos el comprobante a nuestro WhatsApp de negocios:</strong> ${process.env.WHATSAPP_NUMBER || "+506 8855 7999"}</p>
          <p style="margin:0;font-size:13px;"><strong>Detalle del deposito:</strong> Pedido #${orderNumber} / ${data.customerName}</p>
        </div>

        <p style="font-size:15px;font-weight:bold;margin:0;">[Pedido #${orderNumber}]</p>
        <p style="font-size:13px;color:#666;margin:4px 0 0;">Esperamos poder cumplir pronto tu pedido.</p>
      </div>

      <!-- Order items -->
      <div style="padding:0 24px 20px;">
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr style="border-bottom:2px solid #560319;">
              <th style="text-align:left;padding:8px 0;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Producto</th>
              <th style="text-align:center;padding:8px 0;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Cantidad</th>
              <th style="text-align:right;padding:8px 0;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Precio</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRows}
          </tbody>
        </table>
      </div>

      <!-- Totals -->
      <div style="padding:0 24px 20px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:6px 0;font-size:14px;">Metodo de Pago: Transferencia bancaria directa</td>
            <td style="padding:6px 0;text-align:right;font-size:14px;">Subtotal: ₡${data.subtotal.toLocaleString()},00</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-size:14px;">Envio${data.shippingCost === 0 ? "" : " via Precio fijo"}</td>
            <td style="padding:6px 0;text-align:right;font-size:14px;">Envio: ${data.shippingCost === 0 ? "GRATIS" : `₡${data.shippingCost.toLocaleString()},00`}</td>
          </tr>
          <tr style="border-top:2px solid #333;">
            <td style="padding:10px 0;font-size:16px;font-weight:bold;"></td>
            <td style="padding:10px 0;text-align:right;font-size:16px;font-weight:bold;">Total: ₡${data.total.toLocaleString()},00</td>
          </tr>
        </table>
      </div>

      <!-- Bank details -->
      <div style="padding:0 24px 20px;">
        <h3 style="font-size:14px;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px;">Detalles Bancarios</h3>
        <p style="font-size:13px;color:#666;margin:0 0 8px;">SERIART HOME DIECISEIS S.A.</p>
        <table style="width:100%;border-collapse:collapse;border:1px solid #eee;">
          <tr>
            <td style="padding:10px;text-align:center;border-right:1px solid #eee;font-size:12px;color:#999;">Banco:</td>
            <td style="padding:10px;text-align:center;border-right:1px solid #eee;font-size:12px;color:#999;">Cuenta:</td>
            <td style="padding:10px;text-align:center;font-size:12px;color:#999;">IBAN:</td>
          </tr>
          <tr>
            <td style="padding:4px 10px 10px;text-align:center;border-right:1px solid #eee;font-weight:bold;font-size:13px;">BAC SAN JOSE</td>
            <td style="padding:4px 10px 10px;text-align:center;border-right:1px solid #eee;font-weight:bold;font-size:13px;">910716893</td>
            <td style="padding:4px 10px 10px;text-align:center;font-weight:bold;font-size:11px;">CR64010200009107168932</td>
          </tr>
        </table>
        <p style="font-size:13px;color:#666;margin:14px 0 6px;"><strong style="color:#000;">SINPE Movil:</strong> 8855 7999 — SERIART HOME DIECISEIS S.A.</p>
      </div>

      <!-- Shipping address -->
      <div style="padding:0 24px 20px;">
        <h3 style="font-size:14px;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Direccion de Envio</h3>
        <p style="font-size:13px;color:#666;margin:0;line-height:1.6;">
          ${data.shippingAddress}<br>
          ${data.shippingCity ? data.shippingCity + "<br>" : ""}
          ${data.shippingProvince ? data.shippingProvince + "<br>" : ""}
          ${data.shippingPhone}
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#560319;padding:20px;text-align:center;">
        <p style="color:white;font-size:11px;margin:0;letter-spacing:1px;">GLADIADOR 16 — Ropa Deportiva de Elite</p>
        <p style="color:rgba(255,255,255,0.5);font-size:10px;margin:4px 0 0;">San Jose, Costa Rica</p>
      </div>
    </div>
  `;

  const adminEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  const from = process.env.EMAIL_FROM || "onboarding@resend.dev";
  let customerOk = false;
  let adminOk = false;

  try {
    await resend.emails.send({
      from,
      to: data.customerEmail,
      replyTo: adminEmails[0] || undefined,
      subject: `Pedido #${orderNumber} - Gladiador 16`,
      html,
    });
    customerOk = true;
  } catch (error) {
    console.error(`[email] customer send failed for #${orderNumber} → ${data.customerEmail}:`, error);
  }

  if (adminEmails.length > 0) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await resend.emails.send({
          from,
          to: adminEmails,
          replyTo: data.customerEmail,
          subject: `🛒 Nuevo pedido #${orderNumber} - ₡${data.total.toLocaleString()}`,
          html: buildAdminEmail(data, orderNumber, date),
        });
        adminOk = true;
        break;
      } catch (error) {
        console.error(`[email] admin send attempt ${attempt} failed for #${orderNumber}:`, error);
        if (attempt < 3) await new Promise((r) => setTimeout(r, 600 * attempt));
      }
    }
  } else {
    adminOk = true;
  }

  return { success: customerOk && adminOk, customerOk, adminOk };
}

function buildAdminEmail(data: OrderEmailData, orderNumber: string, date: string) {
  const itemsRows = data.items
    .map(
      (item) =>
        `<tr>
          <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;">
            ${item.name}${item.size ? ` (${item.size})` : ""}
          </td>
          <td style="padding:10px 0;border-bottom:1px solid #eee;text-align:center;font-size:14px;">${item.quantity}</td>
          <td style="padding:10px 0;border-bottom:1px solid #eee;text-align:right;font-size:14px;">₡${(item.price * item.quantity).toLocaleString()},00</td>
        </tr>`
    )
    .join("");

  return `
    <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;color:#333;">
      <div style="background:#560319;padding:24px;text-align:center;">
        <img src="https://gladiador16.com/gladiador-logo.png" alt="Gladiador 16" width="48" height="48" style="display:block;margin:0 auto 10px;" />
        <h1 style="color:white;margin:0;font-size:18px;letter-spacing:2px;">GLADIADOR 16 — ADMIN</h1>
      </div>

      <div style="padding:30px 24px;">
        <h2 style="margin:0 0 8px;font-size:20px;color:#560319;">🛒 Nuevo pedido recibido</h2>
        <p style="font-size:14px;color:#666;margin:0 0 20px;">Pedido #${orderNumber} — ${date}</p>

        <div style="background:#f5f5f0;padding:16px;border-radius:8px;margin-bottom:20px;">
          <p style="margin:0 0 8px;font-size:13px;"><strong>Cliente:</strong> ${data.customerName}</p>
          <p style="margin:0 0 8px;font-size:13px;"><strong>Email:</strong> ${data.customerEmail}</p>
          <p style="margin:0 0 8px;font-size:13px;"><strong>Teléfono:</strong> ${data.shippingPhone}</p>
          <p style="margin:0;font-size:13px;"><strong>Dirección:</strong> ${data.shippingAddress}${data.shippingCity ? ", " + data.shippingCity : ""}${data.shippingProvince ? ", " + data.shippingProvince : ""}</p>
        </div>

        <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
          <thead>
            <tr style="border-bottom:2px solid #560319;">
              <th style="text-align:left;padding:8px 0;font-size:12px;text-transform:uppercase;">Producto</th>
              <th style="text-align:center;padding:8px 0;font-size:12px;text-transform:uppercase;">Cant.</th>
              <th style="text-align:right;padding:8px 0;font-size:12px;text-transform:uppercase;">Total</th>
            </tr>
          </thead>
          <tbody>${itemsRows}</tbody>
        </table>

        <div style="border-top:2px solid #333;padding-top:12px;font-size:16px;font-weight:bold;text-align:right;">
          Total: ₡${data.total.toLocaleString()},00
        </div>

        <p style="margin-top:24px;font-size:12px;color:#999;">Esperá el comprobante de pago del cliente por WhatsApp antes de procesar el pedido.</p>
      </div>
    </div>
  `;
}
