import { NextResponse } from "next/server";
import { permissions, requirePermission, type AdminRole } from "@/lib/permissions";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const access = requirePermission(request, "roles:assign");
  if (!access.allowed) {
    return NextResponse.json({ message: "Only Super Admin can assign roles.", role: access.role }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();
  const role = (body.role || "viewer") as AdminRole;

  return NextResponse.json({
    admin: {
      id,
      role,
      permissions: permissions[role],
      status: body.status || "active"
    },
    message: "Admin role updated. Connect MongoDB to persist this permanently."
  });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const access = requirePermission(request, "admins:delete");
  if (!access.allowed) {
    return NextResponse.json({ message: "Only Super Admin can delete admins.", role: access.role }, { status: 403 });
  }

  const { id } = await params;
  return NextResponse.json({ id, deleted: true, message: "Admin removed from active permissions." });
}
