import { NextResponse } from "next/server";
import { demoAdmins, permissions, requirePermission, type AdminRole } from "@/lib/permissions";

export async function GET() {
  return NextResponse.json({ admins: demoAdmins, roles: Object.keys(permissions) });
}

export async function POST(request: Request) {
  const access = requirePermission(request, "admins:create");
  if (!access.allowed) {
    return NextResponse.json({ message: "Only Super Admin can create admins.", role: access.role }, { status: 403 });
  }

  const body = await request.json();
  const role = (body.role || "viewer") as AdminRole;

  return NextResponse.json({
    admin: {
      id: `sasra-admin-${Date.now()}`,
      name: body.name,
      email: body.email,
      role,
      status: "invited",
      permissions: permissions[role]
    },
    message: "Admin invitation created. Persist this record in MongoDB when database credentials are added."
  }, { status: 201 });
}
