import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { User } from "@/lib/models";

export async function POST(request: Request) {
  const { email } = await request.json();
  const role = email?.includes("super") || email === process.env.ADMIN_EMAIL ? "super_admin" : email?.includes("admin") ? "admin" : "devotee";
  
  if (process.env.MONGODB_URI && role === "devotee") {
    try {
      await connectDB();
      let user = await User.findOne({ email });
      if (!user) {
        user = new User({
          name: "Devotee User",
          email,
          phone: "+91 98765 43210",
          address: "123 Ashram Road, Near Main Temple, India",
          role
        });
        await user.save();
      }
    } catch (e) {
      console.error("Database error in login:", e);
    }
  }

  return NextResponse.json({
    token: "demo-jwt-token",
    user: { id: "demo-user", email, role }
  });
}
