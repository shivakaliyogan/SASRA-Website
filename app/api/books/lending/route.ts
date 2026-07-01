import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { BookLending } from "@/lib/models";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email parameter required" }, { status: 400 });
    }

    if (process.env.MONGODB_URI) {
      await connectDB();
      const records = await BookLending.find({ email }).sort({ dueDate: 1 });
      return NextResponse.json({ lending: records });
    }
  } catch (error: any) {
    console.error("Database error in GET /api/books/lending:", error.message);
  }

  // Mock Fallback
  return NextResponse.json({
    lending: [
      { id: "SASRA-BK-3301", bookName: "Bhagavad Gita As It Is", category: "Vedic Scripture", borrowedDate: "2026-06-20T00:00:00.000Z", dueDate: "2026-07-15T00:00:00.000Z", status: "Borrowed" },
      { id: "SASRA-BK-1085", bookName: "Srimad Bhagavatam - Canto 1", category: "Puranic Literature", borrowedDate: "2026-06-15T00:00:00.000Z", dueDate: "2026-06-29T00:00:00.000Z", status: "Borrowed" }
    ]
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, email, bookName, category, dueDate, status } = body;

    if (!id || !email || !bookName || !dueDate) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    const payload = { id, email, bookName, category, dueDate, status: status || "Borrowed" };

    if (process.env.MONGODB_URI) {
      await connectDB();
      const record = await BookLending.findOneAndUpdate(
        { id },
        payload,
        { new: true, upsert: true }
      );
      return NextResponse.json({ record });
    }

    return NextResponse.json({ record: payload });
  } catch (error: any) {
    console.error("Database error in POST /api/books/lending:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
