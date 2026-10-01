import { signIn } from "../../lib/authActions";

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const error = params?.error;

  return (
    <main>
      <h2>Sign in</h2>
      <p>Enter your name to create the session used by the checkout guard.</p>
      {error && <p>{error}</p>}
      <form action={signIn}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" required />
        <button type="submit">Sign in</button>
      </form>
    </main>
  );
}
