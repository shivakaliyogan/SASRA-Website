import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { phone } = await request.json();

  return NextResponse.json({
    phone,
    otpSent: true,
    expiresInSeconds: 300,
    message: "Demo OTP sent. Use 123456 until SMS provider credentials are connected."
  });
}
