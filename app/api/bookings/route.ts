import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ bookings: [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    booking: {
      id: `SASRA-PJ-${Date.now()}`,
      status: "confirmed",
      receiptUrl: `/api/receipts/${Date.now()}`,
      ...body
    }
  });
}
