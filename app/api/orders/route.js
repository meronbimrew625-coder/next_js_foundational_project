import { cookies } from "next/headers";
import { createOrder } from "../../../lib/orders";
import { validateOrder } from "../../../lib/orderSchema";

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      {
        error: {
          code: "INVALID_JSON",
          message: "Request body must be valid JSON.",
        },
      },
      { status: 400 }
    );
  }

  const validation = validateOrder(body);

  if (!validation.valid) {
    return Response.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "Validation failed.",
        },
        fieldErrors: validation.fieldErrors,
      },
      { status: 422 }
    );
  }

  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  const ownerId = session?.value || "anonymous";

  const order = createOrder({
    ownerId,
    values: validation.values,
  });

  return Response.json(order, { status: 201 });
}
