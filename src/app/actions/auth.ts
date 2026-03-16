"use server";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function loginAction(email: string, password: string) {
  // 1. Find the user in your Neon database
  const user = await db.select().from(users).where(eq(users.email, email));

  // 2. Perform your logic (Check if password matches, etc.)
  if (user.length === 0) throw new Error("Invalid credentials");
  
  // Note: This is simplified; you should use bcrypt to verify hashes!
  return { success: true };
}