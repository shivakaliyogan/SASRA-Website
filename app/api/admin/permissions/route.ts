import { NextResponse } from "next/server";
import { permissions, roleLabels } from "@/lib/permissions";

export async function GET() {
  return NextResponse.json({ roles: roleLabels, permissions });
}
