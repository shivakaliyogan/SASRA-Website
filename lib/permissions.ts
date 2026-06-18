export type AdminRole = "super_admin" | "admin" | "content_manager" | "donation_manager" | "booking_manager" | "viewer";

export const permissions = {
  super_admin: [
    "admins:create",
    "admins:update",
    "admins:delete",
    "roles:assign",
    "settings:manage",
    "website:logo",
    "seo:manage",
    "languages:manage",
    "payments:manage",
    "temples:manage",
    "festivals:manage",
    "programs:manage",
    "bookings:manage",
    "donations:manage",
    "gallery:manage",
    "spiritual_content:manage",
    "users:manage",
    "contacts:manage",
    "notifications:send",
    "analytics:view",
    "audit_logs:view",
    "backup:manage"
  ],
  admin: [
    "website:logo",
    "temples:manage",
    "festivals:manage",
    "programs:manage",
    "bookings:manage",
    "donations:manage",
    "gallery:manage",
    "spiritual_content:manage",
    "users:view",
    "contacts:manage",
    "notifications:send",
    "analytics:view"
  ],
  content_manager: ["temples:manage", "festivals:manage", "programs:manage", "gallery:manage", "spiritual_content:manage"],
  donation_manager: ["donations:manage", "analytics:view"],
  booking_manager: ["bookings:manage", "festivals:manage", "programs:manage"],
  viewer: ["analytics:view"]
} satisfies Record<AdminRole, string[]>;

export const roleLabels: Record<AdminRole, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  content_manager: "Content Manager",
  donation_manager: "Donation Manager",
  booking_manager: "Booking Manager",
  viewer: "Viewer"
};

export const demoAdmins = [
  {
    id: "sasra-super-admin",
    name: "Primary Super Admin",
    email: "admin@sasra.org",
    role: "super_admin" as AdminRole,
    status: "active",
    permissions: permissions.super_admin
  }
];

export function hasPermission(role: AdminRole, permission: string) {
  return permissions[role]?.includes(permission) ?? false;
}

export function getRoleFromRequest(request: Request): AdminRole {
  const role = request.headers.get("x-admin-role") as AdminRole | null;
  return role && role in permissions ? role : "super_admin";
}

export function requirePermission(request: Request, permission: string) {
  const role = getRoleFromRequest(request);
  if (!hasPermission(role, permission)) {
    return { allowed: false, role };
  }
  return { allowed: true, role };
}
