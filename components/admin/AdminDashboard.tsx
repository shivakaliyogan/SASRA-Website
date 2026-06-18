"use client";

import { useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Bell, Download, ImageUp, LockKeyhole, Moon, Search, ShieldCheck, Sun, UserPlus, Users } from "lucide-react";
import { adminModules, adminStats } from "@/lib/data";
import { permissions, roleLabels, type AdminRole } from "@/lib/permissions";

const chartData = [
  { month: "Jan", donations: 18, users: 32 },
  { month: "Feb", donations: 24, users: 41 },
  { month: "Mar", donations: 31, users: 48 },
  { month: "Apr", donations: 42, users: 62 },
  { month: "May", donations: 56, users: 74 },
  { month: "Jun", donations: 68, users: 91 }
];

const activities = ["Donation verified for Temple Construction Fund", "Guru Purnima registration approved", "New gallery album published", "Contact report exported", "Admin role updated by Super Admin"];
const roleOptions = Object.keys(roleLabels) as AdminRole[];
const adminRows = [
  { name: "Primary Super Admin", email: "admin@sasra.org", role: "super_admin" as AdminRole, status: "Active" },
  { name: "Temple Office Admin", email: "office@sasra.org", role: "admin" as AdminRole, status: "Active" },
  { name: "Donation Desk", email: "donations@sasra.org", role: "donation_manager" as AdminRole, status: "Invited" }
];

export default function AdminDashboard() {
  const [dark, setDark] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedRole, setSelectedRole] = useState<AdminRole>("admin");
  const [adminMessage, setAdminMessage] = useState("");
  const [logoMessage, setLogoMessage] = useState("");

  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-lotus p-4 dark:bg-stone-950">
        <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="font-semibold uppercase tracking-[0.28em] text-gold">Secure Admin</p>
            <h1 className="mt-3 text-4xl font-extrabold text-temple md:text-6xl">Management panel for every sacred operation.</h1>
            <p className="mt-5 text-stone-600">Role-based access, audit logs, OTP-ready authentication, content controls, reports, payments and notifications.</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setLoggedIn(true); }} className="glass rounded-3xl p-8">
            <LockKeyhole className="h-10 w-10 text-gold" />
            <h2 className="mt-4 text-3xl font-bold">Admin Login</h2>
            <input type="email" placeholder="Email address" className="mt-6 w-full rounded-xl border border-gold/30 px-4 py-3" />
            <input type="password" placeholder="Password" className="mt-4 w-full rounded-xl border border-gold/30 px-4 py-3" />
            <label className="mt-4 flex items-center gap-2 text-sm"><input type="checkbox" /> OTP verification enabled</label>
            <button className="mt-6 w-full rounded-full bg-temple px-6 py-3 font-bold text-white">Sign In</button>
            <button type="button" className="mt-4 text-sm font-semibold text-gold">Forgot Password?</button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-lotus text-stone-900 dark:bg-stone-950 dark:text-white">
        <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-gold/20 bg-white/80 p-5 backdrop-blur-xl dark:bg-stone-900/80 lg:block">
          <h1 className="text-xl font-extrabold text-temple dark:text-gold">SASRA Admin</h1>
          <nav className="mt-8 grid gap-2">
            {["Dashboard", "Admins", "Temples", "Festivals", "Programs", "Bookings", "Donations", "Gallery", "Users", "Contact", "Settings"].map((item) => (
              <button key={item} className="rounded-xl px-4 py-3 text-left text-sm font-semibold hover:bg-gold/15">{item}</button>
            ))}
          </nav>
        </aside>
        <section className="lg:pl-72">
          <header className="sticky top-0 z-30 border-b border-gold/20 bg-lotus/90 p-4 backdrop-blur-xl dark:bg-stone-950/90">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-gold">Super Admin Dashboard</p>
                <h2 className="text-2xl font-bold">Sri Adhinarayana Swamy Rajayogashramam</h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden items-center rounded-full bg-white px-4 py-2 dark:bg-white/10 md:flex"><Search className="h-4 w-4 text-gold" /><input placeholder="Search records" className="ml-2 bg-transparent text-sm outline-none" /></div>
                <button className="grid h-10 w-10 place-items-center rounded-full bg-white dark:bg-white/10"><Bell className="h-5 w-5" /></button>
                <button onClick={() => setDark((v) => !v)} className="grid h-10 w-10 place-items-center rounded-full bg-gold text-white">{dark ? <Sun /> : <Moon />}</button>
              </div>
            </div>
          </header>
          <div className="p-4 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {adminStats.map(({ label, value, icon: Icon, trend }) => (
                <div key={label} className="rounded-2xl bg-white p-5 shadow-lg dark:bg-stone-900">
                  <div className="flex items-center justify-between"><Icon className="h-7 w-7 text-gold" /><span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">{trend}</span></div>
                  <p className="mt-4 text-sm text-stone-500">{label}</p>
                  <p className="text-3xl font-extrabold">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
              <div className="rounded-2xl bg-white p-5 shadow-lg dark:bg-stone-900">
                <div className="mb-4 flex items-center justify-between"><h3 className="text-xl font-bold">Donation and User Growth</h3><button className="flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-bold text-white"><Download className="h-4 w-4" />Export</button></div>
                <div className="h-80"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Area type="monotone" dataKey="donations" stroke="#d6a22d" fill="#fcd34d" /><Area type="monotone" dataKey="users" stroke="#b91c1c" fill="#fecaca" /></AreaChart></ResponsiveContainer></div>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-lg dark:bg-stone-900">
                <h3 className="text-xl font-bold">Recent Activities</h3>
                <div className="mt-4 grid gap-3">{activities.map((item) => <p key={item} className="rounded-xl bg-amber-50 p-3 text-sm dark:bg-white/10">{item}</p>)}</div>
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {adminModules.map(({ title, icon: Icon, actions }) => (
                <section key={title} className="rounded-2xl bg-white p-5 shadow-lg dark:bg-stone-900">
                  <Icon className="h-7 w-7 text-gold" />
                  <h3 className="mt-3 text-xl font-bold">{title}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">{actions.map((action) => <button key={action} className="rounded-full bg-amber-50 px-3 py-2 text-xs font-bold dark:bg-white/10">{action}</button>)}</div>
                </section>
              ))}
            </div>
            <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <section className="rounded-2xl bg-white p-5 shadow-lg dark:bg-stone-900">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gold">Admin Management</p>
                    <h3 className="text-xl font-bold">Assign admins and permissions</h3>
                  </div>
                  <Users className="h-8 w-8 text-gold" />
                </div>
                <form
                  className="mt-5 grid gap-3 md:grid-cols-[1fr_1fr_0.8fr_auto]"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setAdminMessage(`${roleLabels[selectedRole]} invitation prepared with ${permissions[selectedRole].length} permissions. MongoDB will save it permanently after connection.`);
                  }}
                >
                  <input required placeholder="Admin name" className="rounded-xl border border-gold/30 px-4 py-3 dark:bg-stone-950" />
                  <input required type="email" placeholder="Admin email" className="rounded-xl border border-gold/30 px-4 py-3 dark:bg-stone-950" />
                  <select value={selectedRole} onChange={(event) => setSelectedRole(event.target.value as AdminRole)} className="rounded-xl border border-gold/30 px-4 py-3 dark:bg-stone-950">
                    {roleOptions.map((role) => <option key={role} value={role}>{roleLabels[role]}</option>)}
                  </select>
                  <button className="rounded-full bg-temple px-5 py-3 text-sm font-bold text-white">Assign</button>
                </form>
                <div className="mt-4 overflow-hidden rounded-2xl border border-gold/20">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-amber-50 text-temple dark:bg-white/10 dark:text-gold">
                      <tr><th className="p-3">Admin</th><th className="p-3">Role</th><th className="p-3">Status</th></tr>
                    </thead>
                    <tbody>
                      {adminRows.map((admin) => (
                        <tr key={admin.email} className="border-t border-gold/10">
                          <td className="p-3"><p className="font-bold">{admin.name}</p><p className="text-xs text-stone-500">{admin.email}</p></td>
                          <td className="p-3">{roleLabels[admin.role]}</td>
                          <td className="p-3">{admin.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {permissions[selectedRole].map((permission) => <span key={permission} className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold dark:bg-white/10">{permission}</span>)}
                </div>
                {adminMessage && <p className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">{adminMessage}</p>}
              </section>

              <section className="rounded-2xl bg-white p-5 shadow-lg dark:bg-stone-900">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gold">Website Logo</p>
                    <h3 className="text-xl font-bold">Change public logo</h3>
                  </div>
                  <ImageUp className="h-8 w-8 text-gold" />
                </div>
                <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">Admins with `website:logo` permission can update the logo used in the header and footer.</p>
                <label className="mt-5 grid gap-2 text-sm font-semibold">
                  Upload Logo
                  <input
                    type="file"
                    accept="image/*"
                    className="rounded-xl border border-gold/30 px-4 py-3"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = () => {
                        localStorage.setItem("sasra-logo", String(reader.result));
                        window.dispatchEvent(new Event("sasra-logo-updated"));
                        setLogoMessage("Logo updated for this browser. Cloudinary storage will make it permanent after credentials are added.");
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem("sasra-logo");
                    window.dispatchEvent(new Event("sasra-logo-updated"));
                    setLogoMessage("Logo reset to the default Ashramam mark.");
                  }}
                  className="mt-4 rounded-full bg-gold px-5 py-3 text-sm font-bold text-white"
                >
                  Reset Logo
                </button>
                {logoMessage && <p className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">{logoMessage}</p>}
              </section>
            </div>
            <div className="mt-6 rounded-2xl bg-white p-5 shadow-lg dark:bg-stone-900">
              <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="text-xl font-bold">Security and Super Admin Controls</h3><button className="flex items-center gap-2 rounded-full bg-temple px-4 py-2 text-sm font-bold text-white"><UserPlus className="h-4 w-4" />Create Admin</button></div>
              <div className="mt-4 grid gap-3 md:grid-cols-3">{["Role-Based Access Control", "Admin Audit Logs", "Two-Factor Authentication", "Encrypted User Data", "Backup & Restore", "SEO and Payment Settings"].map((item) => <p key={item} className="flex items-center gap-2 rounded-xl bg-lotus p-3 text-sm font-semibold dark:bg-white/10"><ShieldCheck className="h-4 w-4 text-gold" />{item}</p>)}</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
