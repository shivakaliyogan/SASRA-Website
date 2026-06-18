import { NextResponse } from "next/server";
import { adminStats } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ stats: adminStats.map(({ label, value, trend }) => ({ label, value, trend })) });
}
