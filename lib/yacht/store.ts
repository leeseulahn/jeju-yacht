import { getTicketType } from "@/lib/yacht/data";

export type OrderStatus = "pending" | "paid" | "cancelled";

export type OrderItem = {
  ticketSlug: string;
  ticketName: string;
  unitPrice: number;
  quantity: number;
};

export type Order = {
  id: string;
  orderName: string;
  items: OrderItem[];
  amount: number;
  status: OrderStatus;
  buyer: { name: string; email: string; phone: string };
  paymentMethod?: string;
  paymentKey?: string;
  createdAt: string;
  paidAt?: string;
};

type Store = {
  orders: Map<string, Order>;
  // remaining stock per ticket slug, lazily seeded from capacity
  sold: Map<string, number>;
};

// Persist across hot reloads / route module reloads in dev.
const globalForStore = globalThis as unknown as { __yachtStore?: Store };

function getStore(): Store {
  if (!globalForStore.__yachtStore) {
    globalForStore.__yachtStore = { orders: new Map(), sold: new Map() };
  }
  return globalForStore.__yachtStore;
}

function genId(prefix: string) {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  return `${prefix}-${stamp}${rand}`;
}

export function soldCount(slug: string): number {
  return getStore().sold.get(slug) ?? 0;
}

export function remainingStock(slug: string): number | null {
  const ticket = getTicketType(slug);
  if (!ticket) return null;
  return Math.max(0, ticket.capacity - soldCount(slug));
}

export type CreateOrderInput = {
  items: { ticketSlug: string; quantity: number }[];
  buyer: { name: string; email: string; phone: string };
};

export type CreateOrderResult =
  | { ok: true; order: Order }
  | { ok: false; error: string };

export function createOrder(input: CreateOrderInput): CreateOrderResult {
  const { items, buyer } = input;
  if (!items?.length) return { ok: false, error: "선택된 티켓이 없습니다." };
  if (!buyer?.name || !buyer?.email || !buyer?.phone) {
    return { ok: false, error: "구매자 정보를 모두 입력해 주세요." };
  }

  const orderItems: OrderItem[] = [];
  for (const line of items) {
    const ticket = getTicketType(line.ticketSlug);
    if (!ticket) return { ok: false, error: `존재하지 않는 티켓입니다: ${line.ticketSlug}` };
    const qty = Math.floor(Number(line.quantity));
    if (!Number.isFinite(qty) || qty <= 0) continue;
    const remaining = remainingStock(ticket.slug) ?? 0;
    if (qty > remaining) {
      return { ok: false, error: `${ticket.name}의 잔여 수량이 부족합니다. (잔여 ${remaining}석)` };
    }
    orderItems.push({
      ticketSlug: ticket.slug,
      ticketName: ticket.name,
      unitPrice: ticket.price,
      quantity: qty,
    });
  }

  if (!orderItems.length) return { ok: false, error: "수량을 1개 이상 선택해 주세요." };

  const amount = orderItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const orderName =
    orderItems.length === 1
      ? `${orderItems[0].ticketName} ${orderItems[0].quantity}매`
      : `${orderItems[0].ticketName} 외 ${orderItems.length - 1}건`;

  const order: Order = {
    id: genId("JSGP"),
    orderName,
    items: orderItems,
    amount,
    status: "pending",
    buyer,
    createdAt: new Date().toISOString(),
  };

  getStore().orders.set(order.id, order);
  return { ok: true, order };
}

export function getOrder(id: string): Order | undefined {
  return getStore().orders.get(id);
}

export function listOrders(): Order[] {
  return Array.from(getStore().orders.values()).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}

export type ConfirmResult = { ok: true; order: Order } | { ok: false; error: string };

// Demo payment confirmation. A real PG would verify paymentKey + amount with
// the provider here before marking the order paid.
export function confirmPayment(params: {
  orderId: string;
  amount: number;
  method?: string;
  paymentKey?: string;
}): ConfirmResult {
  const store = getStore();
  const order = store.orders.get(params.orderId);
  if (!order) return { ok: false, error: "주문을 찾을 수 없습니다." };
  if (order.status === "paid") return { ok: true, order };
  if (order.status === "cancelled") return { ok: false, error: "취소된 주문입니다." };
  if (params.amount !== order.amount) {
    return { ok: false, error: "결제 금액이 주문 금액과 일치하지 않습니다." };
  }

  // Reserve stock at payment time.
  for (const item of order.items) {
    const remaining = remainingStock(item.ticketSlug) ?? 0;
    if (item.quantity > remaining) {
      order.status = "cancelled";
      return { ok: false, error: `${item.ticketName} 좌석이 매진되어 결제가 취소되었습니다.` };
    }
  }
  for (const item of order.items) {
    store.sold.set(item.ticketSlug, soldCount(item.ticketSlug) + item.quantity);
  }

  order.status = "paid";
  order.paymentMethod = params.method ?? "데모 카드결제";
  order.paymentKey = params.paymentKey ?? genId("PAY");
  order.paidAt = new Date().toISOString();
  store.orders.set(order.id, order);
  return { ok: true, order };
}

export function updateOrderStatus(id: string, status: OrderStatus): Order | undefined {
  const store = getStore();
  const order = store.orders.get(id);
  if (!order) return undefined;
  // Releasing a paid order returns its stock.
  if (order.status === "paid" && status !== "paid") {
    for (const item of order.items) {
      store.sold.set(item.ticketSlug, Math.max(0, soldCount(item.ticketSlug) - item.quantity));
    }
  }
  order.status = status;
  store.orders.set(id, order);
  return order;
}
