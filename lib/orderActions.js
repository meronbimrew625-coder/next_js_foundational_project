"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createOrder, cancelOrderById, getOrderById } from "./orders";
import { validateOrder } from "./orderSchema";

function formDataToValues(formData) {
  return {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
  };
}

export async function placeOrder(previousState, formData) {
  const values = formDataToValues(formData);
  const validation = validateOrder(values);

  if (!validation.valid) {
    return {
      status: 422,
      fieldErrors: validation.fieldErrors,
      message: "Please correct the highlighted fields.",
      order: null,
    };
  }

  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  const ownerId = session?.value || "anonymous";

  const order = createOrder({
    ownerId,
    values: validation.values,
  });

  revalidatePath("/orders");
  revalidatePath("/checkout");

  return {
    status: 201,
    fieldErrors: {},
    message: "Order submitted successfully.",
    order,
  };
}

export async function cancelOrder(orderId) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session?.value) {
    return {
      status: 401,
      error: "You must be signed in to cancel an order.",
    };
  }

  const order = getOrderById(orderId);

  if (!order) {
    return {
      status: 404,
      error: "Order not found.",
    };
  }

  if (order.ownerId !== session.value) {
    return {
      status: 403,
      error: "You do not own this order.",
    };
  }

  const cancelledOrder = cancelOrderById(orderId);
  revalidatePath("/orders");

  return {
    status: 200,
    order: cancelledOrder,
  };
}
