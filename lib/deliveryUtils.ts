const STORE_LAT = 30.0872;
const STORE_LNG = 31.3386;

const DELIVERY_BASE_FEE = 20;
const DELIVERY_PER_KM = 8;
const FREE_DELIVERY_RADIUS_KM = 2;
const MAX_DELIVERY_KM = 15;

export type DeliveryType = "delivery" | "pickup";

export type PaymentMethod = "cash" | "instapay" | "visa";

export interface OrderDetails {
  itemName: string;
  itemPrice: number;
  customerName: string;
  customerPhone: string;
  deliveryType: DeliveryType;
  address?: string;
  lat?: number;
  lng?: number;
  deliveryCost?: number;
  paymentMethod: PaymentMethod;
  notes?: string;
}

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

export function calcDistanceKm(lat: number, lng: number): number {
  const R = 6371;
  const dLat = toRad(lat - STORE_LAT);
  const dLng = toRad(lng - STORE_LNG);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(STORE_LAT)) * Math.cos(toRad(lat)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function calcDeliveryCost(distanceKm: number): number | null {
  if (distanceKm > MAX_DELIVERY_KM) return null;
  if (distanceKm <= FREE_DELIVERY_RADIUS_KM) return 0;
  return Math.round(DELIVERY_BASE_FEE + distanceKm * DELIVERY_PER_KM);
}

export function buildWhatsAppMessage(order: OrderDetails): string {
  const paymentLabels: Record<PaymentMethod, string> = {
    cash: "كاش عند الاستلام",
    instapay: "Instapay",
    visa: "Visa",
  };

  const lines = [
    "🍕 طلب جديد من Easy Pizza",
    "──────────────────",
    `📦 المنتج: ${order.itemName}`,
    `💰 السعر: ${order.itemPrice} جنيه`,
  ];

  if (order.deliveryType === "delivery") {
    lines.push(`🚗 نوع الطلب: توصيل`);
    lines.push(`📍 العنوان: ${order.address ?? "—"}`);
    if (order.lat && order.lng) {
      lines.push(
        `🗺️ الموقع: https://maps.google.com/?q=${order.lat},${order.lng}`
      );
    }
    lines.push(
      `🛵 تكلفة التوصيل: ${order.deliveryCost ? `${order.deliveryCost} جنيه` : "مجاني"}`
    );
    lines.push(
      `💳 إجمالي: ${order.itemPrice + (order.deliveryCost ?? 0)} جنيه`
    );
  } else {
    lines.push(`🏪 نوع الطلب: استلام من المحل`);
  }

  lines.push(`💳 الدفع: ${paymentLabels[order.paymentMethod]}`);
  lines.push("──────────────────");
  lines.push(`👤 الاسم: ${order.customerName}`);
  lines.push(`📞 الموبايل: ${order.customerPhone}`);

  if (order.notes) {
    lines.push(`📝 ملاحظات: ${order.notes}`);
  }

  return lines.join("\n");
}
