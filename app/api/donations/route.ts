import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Donation } from "@/lib/models";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    
    if (!email) {
      return NextResponse.json({ donations: [] });
    }

    if (process.env.MONGODB_URI) {
      await connectDB();
      const donations = await Donation.find({ email }).sort({ createdAt: -1 });
      return NextResponse.json({ donations });
    }
  } catch (error: any) {
    console.error("Database error in GET /api/donations:", error.message);
  }
  return NextResponse.json({ donations: [] });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category, amount, date, paymentMethod, email } = body;
    
    const id = `SASRA-DN-${Date.now().toString().slice(-6)}`;
    const newDonation = {
      id,
      category,
      amount: amount || "₹501",
      date: date ? new Date(date) : new Date(),
      status: "Paid",
      paymentMethod: paymentMethod || "Razorpay",
      email: email || "devotee@example.com"
    };

    if (process.env.MONGODB_URI) {
      await connectDB();
      const donation = new Donation(newDonation);
      await donation.save();
      return NextResponse.json({ donation });
    }
    
    return NextResponse.json({ donation: newDonation });
  } catch (error: any) {
    console.error("Database error in POST /api/donations:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
