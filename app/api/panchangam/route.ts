import { NextResponse } from "next/server";
import { panchangam } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ date: new Date().toISOString(), ...panchangam });
}
