import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { phone, otp } = await request.json();
  const verified = otp === "123456";

  return NextResponse.json({
    phone,
    verified,
    message: verified ? "Mobile number verified." : "Invalid OTP."
  }, { status: verified ? 200 : 400 });
}
