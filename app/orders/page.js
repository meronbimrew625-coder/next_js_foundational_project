import { listOrders } from "../../lib/orders";
import CancelOrderButton from "./CancelOrderButton";

export const revalidate = 60;

export default function OrdersPage() {
  const orders = listOrders();

  return (
    <main>
      <h2>Orders</h2>
      <p>This page is cached and revalidated after successful order writes.</p>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <article className="dish-card" key={order.id}>
              <h3>Order {order.id}</h3>
              <p>Status: {order.status}</p>
              <p>Name: {order.name}</p>
              <p>Phone: {order.phone}</p>
              {order.status !== "cancelled" && (
                <CancelOrderButton orderId={order.id} />
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
