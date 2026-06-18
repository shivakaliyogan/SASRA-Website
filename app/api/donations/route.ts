import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ donations: [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    donation: {
      id: `SASRA-DN-${Date.now()}`,
      status: "pending-payment",
      gateway: "razorpay",
      ...body
    }
  });
}
