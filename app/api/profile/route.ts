import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { User } from "@/lib/models";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  
  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      let user = await User.findOne({ email });
      if (!user) {
        user = new User({
          name: "Devotee User",
          email,
          phone: "+91 98765 43210",
          address: "123 Ashram Road, Near Main Temple, India"
        });
        await user.save();
      }
      return NextResponse.json({ profile: user });
    }
  } catch (error: any) {
    console.error("Database error in GET /api/profile:", error.message);
  }
  return NextResponse.json({
    profile: {
      name: "Devotee User",
      email,
      phone: "+91 98765 43210",
      address: "123 Ashram Road, Near Main Temple, India",
      family: []
    }
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, address, family } = body;

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const updatedProfile = { name, email, phone, address, family: family || [] };

    if (process.env.MONGODB_URI) {
      await connectDB();
      const user = await User.findOneAndUpdate(
        { email },
        { name, phone, address, family: family || [] },
        { new: true, upsert: true }
      );
      return NextResponse.json({ profile: user });
    }
    
    return NextResponse.json({ profile: updatedProfile });
  } catch (error: any) {
    console.error("Database error in POST /api/profile:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
