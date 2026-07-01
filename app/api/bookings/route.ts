import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Booking } from "@/lib/models";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    
    if (!email) {
      return NextResponse.json({ bookings: [] });
    }

    if (process.env.MONGODB_URI) {
      await connectDB();
      const bookings = await Booking.find({ email }).sort({ createdAt: -1 });
      return NextResponse.json({ bookings });
    }
  } catch (error: any) {
    console.error("Database error in GET /api/bookings:", error.message);
  }
  return NextResponse.json({ bookings: [] });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, devoteeName, date, gotram, amount, email } = body;
    
    const id = `SASRA-PJ-${Date.now().toString().slice(-6)}`;
    const newBooking = {
      id,
      name,
      devoteeName,
      date: date ? new Date(date) : new Date(),
      gotram: gotram || "",
      amount: amount || "₹501",
      status: "Confirmed",
      email: email || "devotee@example.com"
    };

    if (process.env.MONGODB_URI) {
      await connectDB();
      const booking = new Booking(newBooking);
      await booking.save();
      return NextResponse.json({ booking });
    }
    
    return NextResponse.json({ booking: newBooking });
  } catch (error: any) {
    console.error("Database error in POST /api/bookings:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
