const orders = [];

export function createOrder({ ownerId, values }) {
  const order = {
    id: crypto.randomUUID(),
    ownerId,
    ...values,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  orders.push(order);
  return order;
}

export function getOrderById(id) {
  return orders.find((order) => order.id === id) ?? null;
}

export function cancelOrderById(id) {
  const index = orders.findIndex((order) => order.id === id);

  if (index === -1) {
    return null;
  }

  orders[index] = {
    ...orders[index],
    status: "cancelled",
  };

  return orders[index];
}

export function listOrders() {
  return orders;
}
