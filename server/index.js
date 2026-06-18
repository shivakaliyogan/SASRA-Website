require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Razorpay = require("razorpay");
const { v2: cloudinary } = require("cloudinary");

const app = express();
const PORT = process.env.PORT || 5000;
const rolePermissions = {
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
};

const admins = [
  {
    id: "sasra-super-admin",
    name: "Primary Super Admin",
    email: process.env.ADMIN_EMAIL || "admin@sasra.org",
    role: "super_admin",
    status: "active"
  }
];

app.use(helmet());
app.use(cors({ origin: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000", credentials: true }));
app.use(express.json({ limit: "10mb" }));

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI).catch((error) => {
    console.warn("MongoDB connection skipped:", error.message);
  });
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  ? new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })
  : null;

const requireAuth = (roles = []) => (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Missing token" });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
    if (roles.length && !roles.includes(payload.role)) return res.status(403).json({ message: "Forbidden" });
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

const requirePermission = (permission) => (req, res, next) => {
  const allowed = rolePermissions[req.user?.role]?.includes(permission);
  if (!allowed) return res.status(403).json({ message: "Insufficient permission", permission });
  next();
};

app.get("/health", (_req, res) => res.json({ ok: true, service: "sasra-api" }));

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || "admin@sasra.org";
  const adminPassword = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  const valid = email === adminEmail && (password === adminPassword || await bcrypt.compare(password || "", adminPassword).catch(() => false));
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });
  const token = jwt.sign({ sub: email, role: "super_admin" }, process.env.JWT_SECRET || "dev-secret", { expiresIn: "8h" });
  res.json({ token, user: { email, role: "super_admin" } });
});

app.post("/payments/razorpay/order", requireAuth(), async (req, res) => {
  if (!razorpay) return res.status(503).json({ message: "Razorpay credentials are not configured" });
  const order = await razorpay.orders.create({
    amount: Number(req.body.amount) * 100,
    currency: "INR",
    receipt: `sasra_${Date.now()}`,
    notes: { category: req.body.category }
  });
  res.json(order);
});

app.post("/media/signature", requireAuth(["admin", "super_admin"]), (req, res) => {
  const timestamp = Math.round(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request({ timestamp, folder: "sasra" }, process.env.CLOUDINARY_API_SECRET || "");
  res.json({ timestamp, signature, folder: "sasra", cloudName: process.env.CLOUDINARY_CLOUD_NAME });
});

app.get("/admin/overview", requireAuth(["admin", "super_admin"]), (_req, res) => {
  res.json({
    users: 12842,
    donations: 4280000,
    visits: 86310,
    festivals: 9,
    bookings: 3486,
    activities: 248
  });
});

app.get("/admin/permissions", requireAuth(["admin", "super_admin"]), (_req, res) => {
  res.json({ permissions: rolePermissions });
});

app.get("/admin/admins", requireAuth(["super_admin"]), (_req, res) => {
  res.json({
    admins: admins.map((admin) => ({ ...admin, permissions: rolePermissions[admin.role] })),
    roles: Object.keys(rolePermissions)
  });
});

app.post("/admin/admins", requireAuth(["super_admin"]), requirePermission("admins:create"), (req, res) => {
  const role = req.body.role || "viewer";
  if (!rolePermissions[role]) return res.status(400).json({ message: "Invalid role" });

  const admin = {
    id: `sasra-admin-${Date.now()}`,
    name: req.body.name,
    email: req.body.email,
    role,
    status: "invited"
  };
  admins.push(admin);

  res.status(201).json({ admin: { ...admin, permissions: rolePermissions[role] } });
});

app.patch("/admin/admins/:id", requireAuth(["super_admin"]), requirePermission("roles:assign"), (req, res) => {
  const role = req.body.role || "viewer";
  if (!rolePermissions[role]) return res.status(400).json({ message: "Invalid role" });

  const admin = admins.find((item) => item.id === req.params.id);
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  admin.role = role;
  admin.status = req.body.status || admin.status;
  res.json({ admin: { ...admin, permissions: rolePermissions[role] } });
});

app.delete("/admin/admins/:id", requireAuth(["super_admin"]), requirePermission("admins:delete"), (req, res) => {
  const index = admins.findIndex((item) => item.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Admin not found" });
  const [removed] = admins.splice(index, 1);
  res.json({ deleted: true, admin: removed });
});

app.post("/notifications", requireAuth(["admin", "super_admin"]), (req, res) => {
  res.json({ queued: true, channels: req.body.channels || ["email", "sms", "push"] });
});

app.listen(PORT, () => {
  console.log(`SASRA API listening on http://localhost:${PORT}`);
});
