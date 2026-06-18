import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();
  const role = email?.includes("super") || email === process.env.ADMIN_EMAIL ? "super_admin" : email?.includes("admin") ? "admin" : "devotee";
  return NextResponse.json({
    token: "demo-jwt-token",
    user: { id: "demo-user", email, role }
  });
}
