"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Bell, Download, ImageUp, LockKeyhole, MapPinned, Menu, Moon, Search, ShieldCheck, Sun, UserPlus, Users, X } from "lucide-react";
import { adminModules, adminStats, heroSlides } from "@/lib/data";
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
const donationRows = [
  { email: "devotee@example.com", amount: 2001, status: "Succeeded" },
  { email: "reader@example.com", amount: 501, status: "Succeeded" },
  { email: "family@example.com", amount: 10000, status: "Succeeded" }
];
const panels = ["Dashboard", "Analytics", "Hero Slider", "Admins", "Temples", "Festivals", "Programs", "Bookings", "Donations", "Gallery", "Books", "Receipts", "Users", "Contact", "Settings"];
const modulePanelMap: Record<string, string> = {
  "Temple Management": "Temples",
  "Festival Management": "Festivals",
  "Spiritual Programs": "Programs",
  "Gallery Management": "Gallery",
  "Donation Management": "Donations",
  "Books Management": "Books",
  "Analytics": "Analytics",
  "Home Page Slider": "Hero Slider"
};

function ManagementPanel({ panel }: Readonly<{ panel: string }>) {
  const [donationEmail, setDonationEmail] = useState("");
  const [heroDrafts, setHeroDrafts] = useState(heroSlides);
  const [heroTitle, setHeroTitle] = useState(heroSlides[0].title);
  const [heroSubtitle, setHeroSubtitle] = useState(heroSlides[0].subtitle);
  const [heroOrder, setHeroOrder] = useState("1");
  const [heroImage, setHeroImage] = useState(heroSlides[0].image);
  const [heroMessage, setHeroMessage] = useState("");
  const fields: Record<string, string[]> = {
    Admins: ["Admin name", "Admin email", "Role / permission"],
    Temples: ["Temple name", "Location", "Description"],
    Festivals: ["Festival name", "Date", "Description"],
    Programs: ["Program title", "Schedule", "Audio / video URL"],
    Bookings: ["Pooja name", "Pooja date", "Display note"],
    Donations: ["Donor email", "Amount", "Succeeded"],
    Gallery: ["Album / category", "Caption", "Display order"],
    Books: ["Book type", "Book name", "Copies available"],
    Receipts: ["User email", "Receipt type", "Receipt status"],
    Users: ["User name", "Email", "Status"],
    Contact: ["Message subject", "Reply note", "Status"],
    "Hero Slider": ["Slide title", "Subtitle", "Display order"],
    Settings: ["Website setting", "Value", "Notes"]
  };
  const activeFields = fields[panel] || fields.Settings;
  const visibleDonations = donationEmail.trim()
    ? donationRows.filter((row) => row.email.toLowerCase().includes(donationEmail.toLowerCase()))
    : donationRows;
  const totalDonation = visibleDonations.reduce((sum, row) => sum + row.amount, 0);

  if (panel === "Analytics") {
    return (
      <section className="rounded-2xl bg-white p-5 shadow-lg dark:bg-stone-900">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Analytics</p>
        <h3 className="mt-2 text-2xl font-bold">Website, Donation and User Growth</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {["Website Visitors", "Donation Analytics", "Festival Registrations", "Popular Pages", "User Growth", "Reports"].map((item) => (
            <button key={item} type="button" className="rounded-2xl border border-gold/20 bg-amber-50 p-4 text-left font-bold text-temple transition hover:bg-gold hover:text-white dark:bg-white/10 dark:text-gold">{item}</button>
          ))}
        </div>
        <div className="mt-6 space-y-4">
          {chartData.map((item) => (
            <div key={item.month} className="rounded-2xl border border-gold/10 p-4 dark:border-white/10">
              <div className="flex justify-between text-sm font-bold"><span>{item.month}</span><span>{item.users} users / {item.donations} donations</span></div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-gold/15"><div className="h-full rounded-full bg-gold" style={{ width: `${Math.min(100, item.users)}%` }} /></div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-temple/15"><div className="h-full rounded-full bg-temple" style={{ width: `${Math.min(100, item.donations)}%` }} /></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (panel === "Hero Slider") {
    return (
      <section className="rounded-2xl bg-white p-5 shadow-lg dark:bg-stone-900">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Home Page</p>
        <h3 className="mt-2 text-2xl font-bold">Hero Slider Photos</h3>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">Upload and edit the rolling photos shown at the top of the main page.</p>
        <form
          className="mt-5 grid gap-3 md:grid-cols-3"
          onSubmit={(event) => {
            event.preventDefault();
            const orderIndex = Math.max(0, Number(heroOrder || "1") - 1);
            const nextSlides = [...heroDrafts];
            nextSlides[orderIndex] = {
              image: heroImage || nextSlides[orderIndex]?.image || heroSlides[0].image,
              title: heroTitle,
              subtitle: heroSubtitle
            };
            setHeroDrafts(nextSlides);
            localStorage.setItem("sasra-hero-slides", JSON.stringify(nextSlides));
            window.dispatchEvent(new Event("sasra-hero-slides-updated"));
            setHeroMessage("Hero slider updated on the main page for this browser. MongoDB and Cloudinary will make it permanent after connection.");
          }}
        >
          <input value={heroTitle} onChange={(event) => setHeroTitle(event.target.value)} required placeholder="Slide title" className="rounded-xl border border-gold/30 px-4 py-3 text-sm dark:bg-stone-950" />
          <input value={heroSubtitle} onChange={(event) => setHeroSubtitle(event.target.value)} required placeholder="Subtitle" className="rounded-xl border border-gold/30 px-4 py-3 text-sm dark:bg-stone-950" />
          <input value={heroOrder} onChange={(event) => setHeroOrder(event.target.value)} type="number" min="1" placeholder="Display order" className="rounded-xl border border-gold/30 px-4 py-3 text-sm dark:bg-stone-950" />
          <input
            type="file"
            accept="image/*"
            className="rounded-xl border border-gold/30 px-4 py-3 text-sm dark:bg-stone-950 md:col-span-2"
            aria-label="Upload hero slider photo"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => setHeroImage(String(reader.result));
              reader.readAsDataURL(file);
            }}
          />
          <button className="rounded-full bg-temple px-5 py-3 text-sm font-bold text-white">Save Slider Photo</button>
        </form>
        {heroImage && <img src={heroImage} alt="Hero slider preview" className="mt-5 h-52 w-full rounded-2xl object-cover" />}
        {heroMessage && <p className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">{heroMessage}</p>}
        <div className="mt-6 overflow-hidden rounded-2xl border border-gold/20">
          <table className="w-full text-left text-sm">
            <thead className="bg-amber-50 text-temple dark:bg-white/10 dark:text-gold">
              <tr><th className="p-3">Photo</th><th className="p-3">Title</th><th className="p-3">Order</th><th className="p-3">Edit</th></tr>
            </thead>
            <tbody>
              {heroDrafts.map((slide, index) => (
                <tr key={`${slide.image}-${index}`} className="border-t border-gold/10">
                  <td className="p-3"><img src={slide.image} alt="" className="h-14 w-24 rounded-xl object-cover" /></td>
                  <td className="p-3"><p className="font-bold">{slide.title}</p><p className="text-xs text-stone-500">{slide.subtitle}</p></td>
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3"><button type="button" onClick={() => { setHeroTitle(slide.title); setHeroSubtitle(slide.subtitle); setHeroOrder(String(index + 1)); setHeroImage(slide.image); }} className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-white">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl bg-white p-5 shadow-lg dark:bg-stone-900">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">{panel} Management</p>
      <h3 className="mt-2 text-2xl font-bold">{panel === "Bookings" ? "Pooja Schedule" : panel}</h3>
      {panel === "Donations" && (
        <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto]">
          <input value={donationEmail} onChange={(event) => setDonationEmail(event.target.value)} type="email" placeholder="Search donation amount by user email" className="rounded-xl border border-gold/30 px-4 py-3 text-sm dark:bg-stone-950" />
          <div className="rounded-xl bg-amber-50 px-5 py-3 text-sm font-bold text-temple dark:bg-white/10 dark:text-gold">Total: {totalDonation.toLocaleString("en-IN")}</div>
        </div>
      )}
      <form
        className="mt-5 grid gap-3 md:grid-cols-3"
        onSubmit={(event) => {
          event.preventDefault();
          alert(`${panel} details are ready for database save.`);
        }}
      >
        {activeFields.map((field, index) => (
          field === "Album / category" ? (
            <div key={field}>
              <input required list="gallery-category-options" placeholder="Album/category or add new" className="w-full rounded-xl border border-gold/30 px-4 py-3 text-sm dark:bg-stone-950" />
              <datalist id="gallery-category-options"><option value="Photos" /><option value="Videos" /><option value="PDFS" /></datalist>
            </div>
          ) : field === "Book type" ? (
            <div key={field}>
              <input required list="book-type-options" placeholder="Book type or add new" className="w-full rounded-xl border border-gold/30 px-4 py-3 text-sm dark:bg-stone-950" />
              <datalist id="book-type-options"><option value="Devotional" /><option value="Vedic Scripture" /><option value="Stotras" /><option value="Bhajan Collections" /><option value="Spiritual Books" /><option value="Other" /></datalist>
            </div>
          ) : field === "Receipt type" ? (
            <div key={field}>
              <input required list="receipt-type-options" placeholder="Receipt type or add new" className="w-full rounded-xl border border-gold/30 px-4 py-3 text-sm dark:bg-stone-950" />
              <datalist id="receipt-type-options"><option value="Donation" /><option value="Book Lending" /><option value="Pooja" /><option value="Festival" /><option value="General" /></datalist>
            </div>
          ) : field === "Amount" ? (
            <input key={field} required inputMode="numeric" pattern="[0-9]*" placeholder="Amount" onInput={(event) => { event.currentTarget.value = event.currentTarget.value.replace(/\D/g, ""); }} className="rounded-xl border border-gold/30 px-4 py-3 text-sm dark:bg-stone-950" />
          ) : (
            <input key={field} required={index < 2} placeholder={field} className="rounded-xl border border-gold/30 px-4 py-3 text-sm dark:bg-stone-950" />
          )
        ))}
        {panel === "Temples" && (
          <>
            <input type="file" accept="image/*" className="md:col-span-3 rounded-xl border border-gold/30 px-4 py-3 text-sm dark:bg-stone-950" aria-label="Upload temple image" />
            <div className="md:col-span-3 overflow-hidden rounded-2xl border border-gold/20 bg-amber-50/70 dark:bg-white/10">
              <div className="flex items-center gap-2 p-4 text-sm font-bold text-temple dark:text-gold"><MapPinned className="h-4 w-4" /> Location Map Preview</div>
              <input placeholder="Paste Google Maps share/embed link or location name" className="mx-4 mb-4 w-[calc(100%-2rem)] rounded-xl border border-gold/30 px-4 py-3 text-sm dark:bg-stone-950" />
              <iframe title="Temple location map" src="https://maps.google.com/maps?q=Andhra%20Pradesh%20India&z=12&output=embed" className="h-64 w-full border-0" loading="lazy" />
            </div>
          </>
        )}
        {panel === "Festivals" && (
          <input type="file" accept="image/*" className="md:col-span-3 rounded-xl border border-gold/30 px-4 py-3 text-sm dark:bg-stone-950" aria-label="Upload festival banner" />
        )}
        {panel === "Gallery" && (
          <input type="file" accept="image/*,video/*,application/pdf" className="md:col-span-3 rounded-xl border border-gold/30 px-4 py-3 text-sm dark:bg-stone-950" aria-label="Upload gallery media" />
        )}
        {panel === "Books" && (
          <div className="md:col-span-3 grid gap-3 md:grid-cols-2">
            <input type="date" className="rounded-xl border border-gold/30 px-4 py-3 text-sm dark:bg-stone-950" aria-label="Default lending start date" />
            <input type="date" className="rounded-xl border border-gold/30 px-4 py-3 text-sm dark:bg-stone-950" aria-label="Default lending end date" />
          </div>
        )}
        {panel === "Receipts" && (
          <input type="email" placeholder="Search receipts by user email" className="md:col-span-3 rounded-xl border border-gold/30 px-4 py-3 text-sm dark:bg-stone-950" />
        )}
        <button className="rounded-full bg-temple px-5 py-3 text-sm font-bold text-white md:col-span-3">Save {panel === "Bookings" ? "Pooja" : panel}</button>
      </form>
      <div className="mt-6 overflow-hidden rounded-2xl border border-gold/20">
        <table className="w-full text-left text-sm">
          <thead className="bg-amber-50 text-temple dark:bg-white/10 dark:text-gold">
            <tr><th className="p-3">Record</th><th className="p-3">Type</th><th className="p-3">Status</th><th className="p-3">Edit</th></tr>
          </thead>
          <tbody>
            {(panel === "Donations" ? visibleDonations : [{ email: "", amount: 0, status: "Ready" }]).map((row, index) => (
              <tr key={`${panel}-${index}`} className="border-t border-gold/10">
                <td className="p-3">{panel === "Books" ? "Bhagavad Gita" : panel === "Donations" ? row.email : panel === "Festivals" ? "Guru Purnima Mahotsavam" : panel === "Bookings" ? "Abhishekam" : `${panel} sample`}</td>
                <td className="p-3">{panel === "Books" ? "Vedic Scripture" : panel === "Donations" ? `${row.amount.toLocaleString("en-IN")}` : panel === "Bookings" ? "2026-07-01" : "Management"}</td>
                <td className="p-3">{panel === "Donations" ? row.status : "Ready"}</td>
                <td className="p-3"><button type="button" className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-white">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function AdminDashboard() {
  const [dark, setDark] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [activePanel, setActivePanel] = useState("Dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<AdminRole>("admin");
  const [adminMessage, setAdminMessage] = useState("");
  const [logoMessage, setLogoMessage] = useState("");


  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-lotus p-4 dark:bg-stone-950">
        <button type="button" onClick={() => window.history.length > 1 ? window.history.back() : window.location.href = "/"} className="fixed left-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-gold/30 bg-white/90 text-temple shadow-lg transition hover:bg-gold hover:text-white dark:bg-stone-900 dark:text-gold" aria-label="Back" title="Back"><ArrowLeft className="h-5 w-5" /></button>
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
        <aside className={`fixed inset-y-0 left-0 z-40 w-72 overflow-y-auto overscroll-contain border-r border-gold/20 bg-white/95 p-5 backdrop-blur-xl transition-transform dark:bg-stone-900/95 lg:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-xl font-extrabold text-temple dark:text-gold">SASRA Admin</h1>
            <button onClick={() => setMenuOpen(false)} className="grid h-9 w-9 place-items-center rounded-full bg-amber-50 lg:hidden dark:bg-white/10" aria-label="Close admin menu"><X className="h-5 w-5" /></button>
          </div>
          <nav className="mt-8 grid gap-2">
            {panels.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActivePanel(item);
                  setMenuOpen(false);
                }}
                className={`rounded-xl px-4 py-3 text-left text-sm font-semibold hover:bg-gold/15 ${activePanel === item ? "bg-gold text-white" : ""}`}
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>
        {menuOpen && <button aria-label="Close admin menu overlay" onClick={() => setMenuOpen(false)} className="fixed inset-0 z-30 bg-black/35 lg:hidden" />}
        <section className="lg:pl-72">
          <header className="sticky top-0 z-30 border-b border-gold/20 bg-lotus/90 p-4 backdrop-blur-xl dark:bg-stone-950/90">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setMenuOpen(true)} className="grid h-10 w-10 place-items-center rounded-full bg-white text-temple shadow lg:hidden dark:bg-white/10 dark:text-gold" aria-label="Open admin menu"><Menu className="h-5 w-5" /></button>
                  <p className="text-sm font-semibold text-gold">Super Admin Dashboard</p>
                </div>
                <h2 className="text-2xl font-bold">Sri Adhinarayana Swamy Rajayogashramam</h2>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => window.history.length > 1 ? window.history.back() : window.location.href = "/"} className="grid h-10 w-10 place-items-center rounded-full bg-white text-temple shadow transition hover:bg-gold hover:text-white dark:bg-white/10 dark:text-gold" aria-label="Back" title="Back"><ArrowLeft className="h-5 w-5" /></button>
                <div className="hidden items-center rounded-full bg-white px-4 py-2 dark:bg-white/10 md:flex"><Search className="h-4 w-4 text-gold" /><input placeholder="Search records" className="ml-2 bg-transparent text-sm outline-none" /></div>
                <button className="grid h-10 w-10 place-items-center rounded-full bg-white dark:bg-white/10"><Bell className="h-5 w-5" /></button>
                <button onClick={() => setDark((v) => !v)} className="grid h-10 w-10 place-items-center rounded-full bg-gold text-white">{dark ? <Sun /> : <Moon />}</button>
              </div>
            </div>
          </header>
          <div className="p-4 md:p-8">
            {activePanel !== "Dashboard" ? (
              <ManagementPanel panel={activePanel} />
            ) : (
              <>
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
                                <div className="space-y-4">
                  {chartData.map((item) => {
                    const donationWidth = `${Math.min(100, item.donations)}%`;
                    const userWidth = `${Math.min(100, item.users)}%`;
                    return (
                      <div key={item.month} className="grid gap-2 rounded-2xl border border-gold/10 bg-amber-50/60 p-4 dark:bg-white/10 sm:grid-cols-[56px_1fr] sm:items-center">
                        <span className="text-sm font-bold text-temple dark:text-gold">{item.month}</span>
                        <div className="space-y-2">
                          <div className="h-3 overflow-hidden rounded-full bg-gold/20" aria-label={`${item.donations} donations`}>
                            <div className="h-full rounded-full bg-gold" style={{ width: donationWidth }} />
                          </div>
                          <div className="h-3 overflow-hidden rounded-full bg-temple/15" aria-label={`${item.users} users`}>
                            <div className="h-full rounded-full bg-temple" style={{ width: userWidth }} />
                          </div>
                          <div className="flex justify-between text-xs text-stone-500 dark:text-stone-300">
                            <span>{item.donations} donations</span>
                            <span>{item.users} users</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-lg dark:bg-stone-900">
                <h3 className="text-xl font-bold">Recent Activities</h3>
                <div className="mt-4 grid gap-3">{activities.map((item) => <p key={item} className="rounded-xl bg-amber-50 p-3 text-sm dark:bg-white/10">{item}</p>)}</div>
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {adminModules.map(({ title, icon: Icon, actions }) => (
                <section key={title} className="rounded-2xl bg-white p-5 shadow-lg dark:bg-stone-900">
                  <button
                    type="button"
                    onClick={() => setActivePanel(modulePanelMap[title] || "Settings")}
                    className="block w-full rounded-xl text-left transition hover:bg-amber-50/70 dark:hover:bg-white/5"
                  >
                    <Icon className="h-7 w-7 text-gold" />
                    <h3 className="mt-3 text-xl font-bold">{title}</h3>
                  </button>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {actions.map((action) => (
                      <button
                        key={action}
                        type="button"
                        onClick={() => setActivePanel(action === "Receipts" ? "Receipts" : modulePanelMap[title] || "Settings")}
                        className="rounded-full bg-amber-50 px-3 py-2 text-xs font-bold transition hover:bg-gold hover:text-white dark:bg-white/10"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
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
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-bold">Security and Super Admin Controls</h3>
                <button
                  type="button"
                  onClick={() => setActivePanel("Admins")}
                  className="flex items-center gap-2 rounded-full bg-temple px-4 py-2 text-sm font-bold text-white"
                >
                  <UserPlus className="h-4 w-4" />Create Admin
                </button>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-3">{["Role-Based Access Control", "Admin Audit Logs", "Two-Factor Authentication", "Encrypted User Data", "Backup & Restore", "SEO and Payment Settings"].map((item) => <p key={item} className="flex items-center gap-2 rounded-xl bg-lotus p-3 text-sm font-semibold dark:bg-white/10"><ShieldCheck className="h-4 w-4 text-gold" />{item}</p>)}</div>
            </div>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
