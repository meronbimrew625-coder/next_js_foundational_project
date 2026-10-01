import Link from "next/link";
import CheckoutForm from "./CheckoutForm";
import { getSession } from "../../lib/auth";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const session = await getSession();

  if (!session) {
    return (
      <main>
        <h2>Checkout requires a session</h2>
        <p>Please sign in before placing an order.</p>
        <Link href="/login">Sign in</Link>
      </main>
    );
  }

  return (
    <main>
      <h2>Checkout</h2>
      <p>Signed in as {session}</p>
      <CheckoutForm />
    </main>
  );
}
