"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signIn(formData) {
  const name = String(formData.get("name") || "").trim();

  if (!name) {
    redirect("/login?error=Enter%20your%20name");
  }

  const cookieStore = await cookies();
  cookieStore.set("session", name, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  redirect("/checkout");
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/login");
}
