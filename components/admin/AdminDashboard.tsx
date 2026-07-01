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
const panels = ["Dashboard", "Analytics", "Hero Slider", "Admins", "Temples", "Festivals", "Programs", "Bookings", "Donations", "Gallery", "Books", "Receipts", "Users", "Family Trees", "Contact", "Settings"];
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
  const [searchQuery, setSearchQuery] = useState("");
  const [devotees, setDevotees] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [replyingTo, setReplyingTo] = useState<any | null>(null);
  const [replyInput, setReplyInput] = useState("");
  const [replySuccess, setReplySuccess] = useState("");
  const [settingsTitle, setSettingsTitle] = useState("Sri Adhinarayana Swamy Rajayogashramam");
  const [settingsEmail, setSettingsEmail] = useState("contact@sasra.org");
  const [settingsPhone, setSettingsPhone] = useState("+91 90000 00000");
  const [bookingsEnabled, setBookingsEnabled] = useState(true);
  const [donationsEnabled, setDonationsEnabled] = useState(true);
  const [bannerText, setBannerText] = useState("Welcome to Sri Adhinarayana Swamy Rajayogashramam");
  const [saveMsg, setSaveMsg] = useState("");

  const [newLendingName, setNewLendingName] = useState("");
  const [newLendingEmail, setNewLendingEmail] = useState("");
  const [newLendingBook, setNewLendingBook] = useState("");
  const [newLendingCategory, setNewLendingCategory] = useState("Vedic Scripture");
  const [newLendingDueDate, setNewLendingDueDate] = useState("");
  const [newLendingSuccess, setNewLendingSuccess] = useState("");

  const [bookCatalog, setBookCatalog] = useState<any[]>([]);
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookCategory, setNewBookCategory] = useState("Vedic Scripture");
  const [newBookCopies, setNewBookCopies] = useState("1");
  const [bookAddSuccess, setBookAddSuccess] = useState("");

  useEffect(() => {
    if (panel === "Family Trees" || panel === "Users") {
      const stored = localStorage.getItem("sasra-all-profiles");
      const mockDevotees = [
        {
          name: "Srinivas Sharma",
          email: "srinivas@example.com",
          phone: "+91 94401 23456",
          lastLoggedIn: "2026-07-01 10:45 AM",
          family: [
            { name: "Lakshmi Sharma", relation: "Wife" },
            { name: "Karthik Sharma", relation: "Son" },
            { name: "Ananya Sharma", relation: "Daughter" }
          ]
        },
        {
          name: "Ramesh Kumar",
          email: "ramesh@example.com",
          phone: "+91 98480 98765",
          lastLoggedIn: "2026-06-30 08:20 PM",
          family: [
            { name: "Savitri Devi", relation: "Mother" },
            { name: "Ganesh Kumar", relation: "Brother" }
          ]
        },
        {
          name: "Pooja Patel",
          email: "pooja@example.com",
          phone: "+91 99123 45678",
          lastLoggedIn: "2026-07-01 11:15 AM",
          family: [
            { name: "Rajesh Patel", relation: "Husband" }
          ]
        }
      ];
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const combined = [...parsed];
          mockDevotees.forEach(mock => {
            if (!combined.some(item => item.email === mock.email)) {
              combined.push(mock);
            }
          });
          setDevotees(combined);
          setUsersList(combined);
        } catch (e) {
          setDevotees(mockDevotees);
          setUsersList(mockDevotees);
        }
      } else {
        setDevotees(mockDevotees);
        setUsersList(mockDevotees);
        localStorage.setItem("sasra-all-profiles", JSON.stringify(mockDevotees));
      }
    }
  }, [panel]);

  useEffect(() => {
    if (panel === "Contact") {
      const loadMessages = () => {
        const stored = localStorage.getItem("sasra-contact-messages");
        const mockMessages = [
          { id: "MSG-101", name: "Devendra Rao", email: "devendra@example.com", phone: "+91 94401 55667", message: "When is the temple timings during Guru Purnima? Will there be online prasadam bookings?", date: "Jun 28, 2026", status: "Pending", replyText: "" },
          { id: "MSG-099", name: "Kiran Kumar", email: "kiran@example.com", phone: "+91 98482 11223", message: "I want to sponsor Annadanam for 50 people on Janmashtami. Please let me know how to pay.", date: "Jun 25, 2026", status: "Replied", replyText: "Namaste Kiran, you can sponsor under the Donations section by choosing 'Festival Sponsorship'. Our team will coordinate." }
        ];
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            const combined = [...parsed];
            mockMessages.forEach(mm => {
              if (!combined.some(item => item.id === mm.id)) {
                combined.push(mm);
              }
            });
            setMessages(combined);
          } catch (e) {
            setMessages(mockMessages);
          }
        } else {
          setMessages(mockMessages);
          localStorage.setItem("sasra-contact-messages", JSON.stringify(mockMessages));
        }
      };
      loadMessages();
      window.addEventListener("sasra-messages-updated", loadMessages);
      return () => window.removeEventListener("sasra-messages-updated", loadMessages);
    }
  }, [panel]);

  useEffect(() => {
    if (panel === "Settings") {
      const stored = localStorage.getItem("sasra-settings");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.title) setSettingsTitle(parsed.title);
          if (parsed.email) setSettingsEmail(parsed.email);
          if (parsed.phone) setSettingsPhone(parsed.phone);
          if (parsed.bookingsEnabled !== undefined) setBookingsEnabled(parsed.bookingsEnabled);
          if (parsed.donationsEnabled !== undefined) setDonationsEnabled(parsed.donationsEnabled);
          if (parsed.bannerText) setBannerText(parsed.bannerText);
        } catch (e) {}
      }
    }
  }, [panel]);

  const [lendingsList, setLendingsList] = useState<any[]>([]);

  useEffect(() => {
    if (panel === "Books") {
      // Load all registered users for the assign-book selector
      const storedProfiles = localStorage.getItem("sasra-all-profiles");
      const mockProfiles = [
        { name: "Srinivas Sharma", email: "srinivas@example.com" },
        { name: "Ramesh Kumar",    email: "ramesh@example.com" },
        { name: "Pooja Patel",     email: "pooja@example.com" }
      ];
      if (storedProfiles) {
        try {
          const parsed = JSON.parse(storedProfiles);
          const combined = [...parsed];
          mockProfiles.forEach(m => { if (!combined.some((u: any) => u.email === m.email)) combined.push(m); });
          setUsersList(combined);
        } catch { setUsersList(mockProfiles); }
      } else {
        setUsersList(mockProfiles);
      }

      // Load all book lendings
      const stored = localStorage.getItem("sasra-all-book-lendings");
      const mockLendings = [
        { id: "SASRA-BK-3301", email: "srinivas@example.com", name: "Srinivas Sharma", bookName: "Bhagavad Gita As It Is", category: "Vedic Scripture", borrowedDate: "2026-06-20T00:00:00.000Z", dueDate: "2026-07-15T00:00:00.000Z", status: "Borrowed" },
        { id: "SASRA-BK-1085", email: "ramesh@example.com",   name: "Ramesh Kumar",   bookName: "Srimad Bhagavatam - Canto 1", category: "Puranic Literature", borrowedDate: "2026-06-15T00:00:00.000Z", dueDate: "2026-06-29T00:00:00.000Z", status: "Borrowed" },
        { id: "SASRA-BK-2041", email: "pooja@example.com",    name: "Pooja Patel",    bookName: "Rama Charita Manas", category: "Devotional Epic", borrowedDate: "2026-06-22T00:00:00.000Z", dueDate: "2026-07-06T00:00:00.000Z", status: "Borrowed" }
      ];
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const combined = [...parsed];
          mockLendings.forEach(mock => { if (!combined.some(item => item.id === mock.id)) combined.push(mock); });
          setLendingsList(combined);
        } catch (e) {
          setLendingsList(mockLendings);
        }
      } else {
        setLendingsList(mockLendings);
        localStorage.setItem("sasra-all-book-lendings", JSON.stringify(mockLendings));
      }

      // Load Book Catalog
      const storedCatalog = localStorage.getItem("sasra-book-catalog");
      const mockCatalog = [
        { id: "CAT-001", title: "Bhagavad Gita As It Is",       category: "Vedic Scripture",    copies: 5 },
        { id: "CAT-002", title: "Srimad Bhagavatam - Canto 1",  category: "Puranic Literature",  copies: 3 },
        { id: "CAT-003", title: "Rama Charita Manas",           category: "Devotional Epic",     copies: 4 },
        { id: "CAT-004", title: "Valmiki Ramayana",             category: "Devotional Epic",     copies: 2 },
        { id: "CAT-005", title: "Stotra Ratnavali",             category: "Bhajan Collection",   copies: 6 }
      ];
      if (storedCatalog) {
        try {
          const parsed = JSON.parse(storedCatalog);
          const combined = [...parsed];
          mockCatalog.forEach(m => { if (!combined.some((b: any) => b.id === m.id)) combined.push(m); });
          setBookCatalog(combined);
        } catch { setBookCatalog(mockCatalog); }
      } else {
        setBookCatalog(mockCatalog);
        localStorage.setItem("sasra-book-catalog", JSON.stringify(mockCatalog));
      }
    }
  }, [panel]);
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

  if (panel === "Family Trees") {
    const filteredDevotees = devotees.filter(d => 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      d.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <section className="rounded-2xl bg-white p-5 shadow-lg dark:bg-stone-900">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Devotee Families</p>
        <h3 className="mt-2 text-2xl font-bold">Devotee Family Trees</h3>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">
          View and search devotee family structures. You can search by devotee name or email address.
        </p>
        
        <div className="mt-5 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gold" />
          </div>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gold/30 bg-stone-50 dark:bg-stone-950 text-sm outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {filteredDevotees.length === 0 ? (
            <p className="p-6 text-sm text-stone-550 dark:text-stone-350 col-span-2 text-center bg-amber-50/20 dark:bg-white/5 rounded-2xl border border-dashed border-amber-100">
              No devotee family trees matched your search query.
            </p>
          ) : (
            filteredDevotees.map((devotee, index) => (
              <div
                key={`${devotee.email}-${index}`}
                className="rounded-2xl border border-gold/20 p-5 bg-white dark:bg-stone-950 shadow-sm space-y-4"
              >
                <div className="border-b border-amber-100/50 dark:border-white/5 pb-3">
                  <h4 className="font-bold text-lg text-temple dark:text-gold">{devotee.name}</h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{devotee.email}</p>
                  {devotee.phone && <p className="text-xs text-stone-500 dark:text-stone-400">{devotee.phone}</p>}
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-stone-400">Family Members</p>
                  {!devotee.family || devotee.family.length === 0 ? (
                    <p className="text-xs text-stone-500 italic">No family members registered.</p>
                  ) : (
                    <div className="grid gap-2">
                      {devotee.family.map((member: any, idx: number) => (
                        <div
                          key={`${member.name}-${idx}`}
                          className="flex justify-between items-center text-sm p-2 rounded-xl bg-amber-50/30 dark:bg-white/5"
                        >
                          <span className="font-semibold text-stone-850 dark:text-stone-200">{member.name}</span>
                          <span className="text-xs px-2.5 py-1 rounded-full bg-gold/10 text-gold font-bold uppercase tracking-wide">
                            {member.relation}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    );
  }

  if (panel === "Users") {
    const filteredUsers = usersList.filter(u => 
      (u.name || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
      (u.email || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <section className="rounded-2xl bg-white p-5 shadow-lg dark:bg-stone-900">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">User Accounts</p>
        <h3 className="mt-2 text-2xl font-bold">Devotee Directory</h3>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">
          Monitor registered devotee accounts, contact numbers, and login status history.
        </p>

        <div className="mt-5 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gold" />
          </div>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search users by name or email..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gold/30 bg-stone-50 dark:bg-stone-950 text-sm outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-gold/20">
          <table className="w-full text-left text-sm">
            <thead className="bg-amber-50 text-temple dark:bg-white/10 dark:text-gold">
              <tr>
                <th className="p-4">Devotee Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Last Logged In</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-stone-500 italic">
                    No devotees found matching your search.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, idx) => (
                  <tr key={`${user.email}-${idx}`} className="border-t border-gold/10 hover:bg-gold/5 transition">
                    <td className="p-4 font-bold">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">{user.phone || "Not provided"}</td>
                    <td className="p-4 font-semibold text-amber-800 dark:text-gold">{user.lastLoggedIn || "Not logged in yet"}</td>
                    <td className="p-4 text-center">
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Active
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  if (panel === "Books") {
    const filteredLendings = lendingsList.filter(item => 
      (item.name || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
      (item.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.bookName || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleMarkReturned = (id: string) => {
      const updated = lendingsList.map(item =>
        item.id === id ? { ...item, status: "Returned" } : item
      );
      setLendingsList(updated);
      localStorage.setItem("sasra-all-book-lendings", JSON.stringify(updated));
      // Always broadcast — the user's profile page listens and will re-read from sasra-all-book-lendings
      window.dispatchEvent(new CustomEvent("sasra-books-updated", { detail: { id, status: "Returned" } }));
    };

    const handleUndoReturn = (id: string) => {
      const updated = lendingsList.map(item =>
        item.id === id ? { ...item, status: "Borrowed" } : item
      );
      setLendingsList(updated);
      localStorage.setItem("sasra-all-book-lendings", JSON.stringify(updated));
      // Always broadcast
      window.dispatchEvent(new CustomEvent("sasra-books-updated", { detail: { id, status: "Borrowed" } }));
    };

    const handleAddNewLending = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newLendingEmail || !newLendingBook || !newLendingDueDate) return;

      // Lookup the name from the selected user in usersList
      const selectedUser = usersList.find((u: any) => u.email === newLendingEmail);
      const resolvedName = selectedUser ? selectedUser.name : newLendingEmail;

      const newLending = {
        id: `SASRA-BK-${Math.floor(1000 + Math.random() * 9000)}`,
        name: resolvedName,
        email: newLendingEmail.trim(),
        bookName: newLendingBook.trim(),
        category: newLendingCategory,
        borrowedDate: new Date().toISOString(),
        dueDate: new Date(newLendingDueDate).toISOString(),
        status: "Borrowed"
      };

      const updatedList = [newLending, ...lendingsList];
      setLendingsList(updatedList);
      localStorage.setItem("sasra-all-book-lendings", JSON.stringify(updatedList));

      try {
        const userEmail = localStorage.getItem("sasra-user-email");
        if (userEmail === newLending.email) {
          const saved = localStorage.getItem("sasra-user-books");
          const list = saved ? JSON.parse(saved) : [];
          list.unshift(newLending);
          localStorage.setItem("sasra-user-books", JSON.stringify(list));
          window.dispatchEvent(new Event("sasra-books-updated"));
        }
      } catch (err) {}

      setNewLendingName("");
      setNewLendingEmail("");
      setNewLendingBook("");
      setNewLendingCategory("Vedic Scripture");
      setNewLendingDueDate("");
      setNewLendingSuccess(`Book "${newLending.bookName}" assigned to ${resolvedName} successfully!`);
      setTimeout(() => setNewLendingSuccess(""), 4000);
    };

    const handleAddBook = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newBookTitle.trim()) return;
      const entry = {
        id: `CAT-${Date.now()}`,
        title: newBookTitle.trim(),
        category: newBookCategory,
        copies: parseInt(newBookCopies) || 1
      };
      const updated = [entry, ...bookCatalog];
      setBookCatalog(updated);
      localStorage.setItem("sasra-book-catalog", JSON.stringify(updated));
      setNewBookTitle("");
      setNewBookCategory("Vedic Scripture");
      setNewBookCopies("1");
      setBookAddSuccess(`"${entry.title}" added to the library catalog!`);
      setTimeout(() => setBookAddSuccess(""), 4000);
    };

    const handleDeleteBook = (id: string) => {
      const updated = bookCatalog.filter(b => b.id !== id);
      setBookCatalog(updated);
      localStorage.setItem("sasra-book-catalog", JSON.stringify(updated));
    };

    return (
      <section className="rounded-2xl bg-white p-5 shadow-lg dark:bg-stone-900 space-y-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Library System</p>
          <h3 className="mt-2 text-2xl font-bold">Books & Lending Manager</h3>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">
            Manage the library catalog and track book lendings for all devotees.
          </p>
        </div>

        {/* ── SECTION 1: Library Catalog ── */}
        <div className="rounded-2xl border border-gold/20 overflow-hidden">
          <div className="bg-amber-50 dark:bg-white/5 px-5 py-4 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-temple dark:text-gold text-base">📖 Library Book Catalog</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">All books available in the Ashramam library.</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-gold/10 text-gold">{bookCatalog.length} Books</span>
          </div>

          {bookAddSuccess && (
            <p className="mx-5 mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 dark:bg-green-950/20 dark:text-green-400">
              {bookAddSuccess}
            </p>
          )}

          {/* Add New Book Form */}
          <form onSubmit={handleAddBook} className="m-5 p-5 rounded-2xl border border-dashed border-gold/30 bg-stone-50/50 dark:bg-stone-950/30 space-y-3">
            <p className="text-sm font-bold text-stone-700 dark:text-stone-200">+ Add New Book to Library</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <label className="block text-xs font-semibold col-span-1 sm:col-span-2 lg:col-span-1">
                Book Title *
                <input
                  required
                  type="text"
                  value={newBookTitle}
                  onChange={(e) => setNewBookTitle(e.target.value)}
                  placeholder="e.g. Mahabharata"
                  className="mt-1.5 w-full rounded-xl border border-gold/30 bg-white dark:bg-stone-950 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold text-sm dark:text-stone-100"
                />
              </label>

              <label className="block text-xs font-semibold">
                Category / Type *
                <select
                  value={newBookCategory}
                  onChange={(e) => setNewBookCategory(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-gold/30 bg-white dark:bg-stone-950 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold text-sm dark:text-stone-100 font-medium"
                >
                  <option value="Vedic Scripture">Vedic Scripture</option>
                  <option value="Devotional Epic">Devotional Epic</option>
                  <option value="Puranic Literature">Puranic Literature</option>
                  <option value="Bhajan Collection">Bhajan Collection</option>
                  <option value="Spiritual Discourse">Spiritual Discourse</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label className="block text-xs font-semibold">
                Copies Available
                <input
                  type="number"
                  min="1"
                  value={newBookCopies}
                  onChange={(e) => setNewBookCopies(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-gold/30 bg-white dark:bg-stone-950 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold text-sm dark:text-stone-100"
                />
              </label>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full rounded-full bg-temple hover:bg-amber-800 dark:bg-gold dark:text-stone-950 py-2.5 font-bold text-white shadow transition text-sm"
                >
                  Add to Library
                </button>
              </div>
            </div>
          </form>

          {/* Catalog Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-stone-50 dark:bg-white/5 text-stone-500 dark:text-stone-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">Book Title</th>
                  <th className="px-5 py-3">Category / Type</th>
                  <th className="px-5 py-3 text-center">Copies</th>
                  <th className="px-5 py-3 text-center">Remove</th>
                </tr>
              </thead>
              <tbody>
                {bookCatalog.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-6 text-center text-stone-400 italic">No books in catalog yet.</td>
                  </tr>
                ) : (
                  bookCatalog.map((book, idx) => (
                    <tr key={`${book.id}-${idx}`} className="border-t border-gold/10 hover:bg-gold/5 transition">
                      <td className="px-5 py-3 font-bold text-stone-850 dark:text-stone-100">{book.title}</td>
                      <td className="px-5 py-3">
                        <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 dark:bg-gold/10 dark:text-gold">
                          {book.category}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-center font-bold text-temple dark:text-gold">{book.copies}</td>
                      <td className="px-5 py-3 text-center">
                        <button
                          onClick={() => handleDeleteBook(book.id)}
                          className="rounded-full border border-red-200 dark:border-red-800/40 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 text-xs font-bold transition"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── SECTION 2: Assign Book (Lending) ── */}

        {newLendingSuccess && (
          <p className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 dark:bg-green-950/20 dark:text-green-400">
            {newLendingSuccess}
          </p>
        )}

        {/* Add Lending Form */}
        <form onSubmit={handleAddNewLending} className="mt-6 p-5 rounded-2xl border border-gold/20 bg-stone-50/50 dark:bg-stone-950/30 space-y-4">
          <h4 className="font-bold text-temple dark:text-gold text-lg">📚 Assign Book to Devotee</h4>
          <p className="text-xs text-stone-500 dark:text-stone-400">Select a registered devotee from the dropdown and fill in the book details to assign a lending.</p>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <label className="block text-sm font-semibold">
              Select Devotee *
              <select
                required
                value={newLendingEmail}
                onChange={(e) => setNewLendingEmail(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-gold/30 bg-white dark:bg-stone-950 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold text-sm dark:text-stone-100 font-medium"
              >
                <option value="">— Choose a devotee —</option>
                {usersList.map((u: any, i: number) => (
                  <option key={`${u.email}-${i}`} value={u.email}>
                    {u.name} ({u.email})
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-semibold">
              Book Title *
              <input
                required
                type="text"
                value={newLendingBook}
                onChange={(e) => setNewLendingBook(e.target.value)}
                placeholder="e.g. Bhagavad Gita"
                className="mt-1.5 w-full rounded-xl border border-gold/30 bg-white dark:bg-stone-950 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold text-sm dark:text-stone-100"
              />
            </label>

            <label className="block text-sm font-semibold">
              Book Category / Type *
              <select
                required
                value={newLendingCategory}
                onChange={(e) => setNewLendingCategory(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-gold/30 bg-white dark:bg-stone-950 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold text-sm dark:text-stone-100 font-medium"
              >
                <option value="Vedic Scripture">Vedic Scripture</option>
                <option value="Devotional Epic">Devotional Epic</option>
                <option value="Puranic Literature">Puranic Literature</option>
                <option value="Bhajan Collection">Bhajan Collection</option>
                <option value="Spiritual Discourse">Spiritual Discourse</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label className="block text-sm font-semibold">
              Lending Return Due Date *
              <input
                required
                type="date"
                value={newLendingDueDate}
                onChange={(e) => setNewLendingDueDate(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-gold/30 bg-white dark:bg-stone-950 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold text-sm dark:text-stone-100"
              />
            </label>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full rounded-full bg-temple hover:bg-amber-800 dark:bg-gold dark:text-stone-950 py-2.5 font-bold text-white shadow transition text-sm hover:opacity-95"
              >
                Register Lending
              </button>
            </div>
          </div>
        </form>

        <div className="mt-5 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gold" />
          </div>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search lendings by borrower name, email, or book title..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gold/30 bg-stone-50 dark:bg-stone-950 text-sm outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-gold/20">
          <table className="w-full text-left text-sm">
            <thead className="bg-amber-50 text-temple dark:bg-white/10 dark:text-gold">
              <tr>
                <th className="p-4">Borrower Details</th>
                <th className="p-4">Book Details</th>
                <th className="p-4">Lending Period</th>
                <th className="p-4">Days Left</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLendings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-stone-500 italic">
                    No lending records match your query.
                  </td>
                </tr>
              ) : (
                filteredLendings.map((item, idx) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const due = new Date(item.dueDate);
                  due.setHours(0, 0, 0, 0);
                  const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

                  let daysText = "";
                  let daysStyle = "";

                  if (item.status === "Returned") {
                    daysText = "Returned";
                    daysStyle = "bg-stone-100 text-stone-600 dark:bg-white/5 dark:text-stone-400";
                  } else if (diffDays > 5) {
                    daysText = `${diffDays} days remaining`;
                    daysStyle = "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 font-semibold";
                  } else if (diffDays > 0) {
                    daysText = `${diffDays} days - due soon`;
                    daysStyle = "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400 font-semibold";
                  } else if (diffDays === 0) {
                    daysText = "Due today!";
                    daysStyle = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 font-bold animate-pulse";
                  } else {
                    daysText = `Overdue by ${Math.abs(diffDays)} days!`;
                    daysStyle = "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 font-extrabold";
                  }

                  return (
                    <tr key={`${item.id}-${idx}`} className="border-t border-gold/10 hover:bg-gold/5 transition">
                      <td className="p-4">
                        <p className="font-bold">{item.name}</p>
                        <p className="text-xs text-stone-500">{item.email}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-amber-900 dark:text-gold">{item.bookName}</p>
                        <p className="text-xs text-stone-550 dark:text-stone-450">{item.category}</p>
                      </td>
                      <td className="p-4 text-xs font-medium text-stone-605 dark:text-stone-300">
                        <p>Lent: {new Date(item.borrowedDate).toLocaleDateString("en-IN", { dateStyle: "medium" })}</p>
                        <p className="mt-0.5">Due: {new Date(item.dueDate).toLocaleDateString("en-IN", { dateStyle: "medium" })}</p>
                      </td>
                      <td className="p-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs ${daysStyle}`}>
                          {daysText}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                          item.status === "Returned"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : diffDays >= 0
                            ? "bg-stone-100 text-stone-850 dark:bg-white/10 dark:text-stone-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        {item.status !== "Returned" ? (
                          <button
                            onClick={() => handleMarkReturned(item.id)}
                            className="rounded-full bg-temple hover:bg-amber-800 dark:bg-gold dark:text-stone-950 px-3.5 py-1.5 text-xs font-bold text-white shadow transition"
                          >
                            Mark Returned
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUndoReturn(item.id)}
                            className="rounded-full border border-stone-300 dark:border-white/20 bg-stone-100 hover:bg-stone-200 dark:bg-white/5 dark:hover:bg-white/10 text-stone-700 dark:text-stone-300 px-3.5 py-1.5 text-xs font-bold shadow transition"
                          >
                            ↩ Undo Return
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  if (panel === "Contact") {
    const handleSendReply = (e: React.FormEvent) => {
      e.preventDefault();
      if (!replyingTo || !replyInput.trim()) return;

      const updatedList = messages.map(msg => {
        if (msg.id === replyingTo.id) {
          return { ...msg, status: "Replied", replyText: replyInput.trim() };
        }
        return msg;
      });

      setMessages(updatedList);
      localStorage.setItem("sasra-contact-messages", JSON.stringify(updatedList));
      setReplyInput("");
      setReplyingTo(null);
      setReplySuccess("Reply registered successfully!");
      setTimeout(() => setReplySuccess(""), 3000);
    };

    return (
      <section className="rounded-2xl bg-white p-5 shadow-lg dark:bg-stone-900">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Communications</p>
        <h3 className="mt-2 text-2xl font-bold">Devotee Inquiries</h3>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">
          Read and respond to questions submitted by devotees from the website contact form.
        </p>

        {replySuccess && (
          <p className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 dark:bg-green-950/20 dark:text-green-400">
            {replySuccess}
          </p>
        )}

        <div className="mt-6 space-y-4">
          {messages.length === 0 ? (
            <p className="p-8 text-center text-sm text-stone-500 italic bg-stone-50 dark:bg-stone-950 rounded-2xl border border-gold/10">No contact messages received yet.</p>
          ) : (
            messages.map((msg, index) => (
              <div key={`${msg.id}-${index}`} className="p-5 rounded-2xl border border-gold/20 bg-stone-50/50 dark:bg-stone-950/30 flex flex-col gap-4 shadow-sm">
                <div className="flex flex-wrap justify-between items-start gap-2 border-b border-gold/10 pb-3">
                  <div>
                    <h4 className="font-bold text-lg text-temple dark:text-gold">{msg.name}</h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400">{msg.email} | {msg.phone}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-stone-500">{msg.date}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      msg.status === "Replied"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}>
                      {msg.status}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium italic text-stone-750 dark:text-stone-250">"{msg.message}"</p>
                </div>

                {msg.replyText && (
                  <div className="mt-1 p-3.5 bg-amber-50/40 dark:bg-white/5 border-l-2 border-gold rounded-r-xl space-y-1">
                    <p className="text-xs font-bold text-gold uppercase tracking-wider">Ashramam Reply</p>
                    <p className="text-sm text-stone-700 dark:text-stone-300">"{msg.replyText}"</p>
                  </div>
                )}

                {msg.status !== "Replied" && (
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => {
                        setReplyingTo(msg);
                        setReplyInput("");
                      }}
                      className="rounded-full bg-temple hover:bg-amber-800 dark:bg-gold dark:text-stone-950 px-5 py-2 text-xs font-bold text-white shadow transition"
                    >
                      Reply to Devotee
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {replyingTo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-white p-6 rounded-3xl shadow-2xl dark:bg-stone-900 border border-gold/20">
              <button
                onClick={() => setReplyingTo(null)}
                className="absolute right-4 top-4 text-stone-500 hover:text-stone-755 dark:text-stone-400 dark:hover:text-stone-200"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>

              <form onSubmit={handleSendReply} className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-temple dark:text-gold">Reply to {replyingTo.name}</h3>
                  <p className="text-xs text-stone-500 mt-1">Devotee message: "{replyingTo.message.slice(0, 80)}..."</p>
                </div>

                <textarea
                  required
                  rows={5}
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                  placeholder="Type your official reply message here..."
                  className="w-full rounded-xl border border-gold/30 bg-stone-50 dark:bg-stone-950 px-4 py-3 outline-none focus:ring-2 focus:ring-gold text-sm dark:text-stone-100"
                />

                <button
                  type="submit"
                  className="w-full rounded-full bg-temple px-6 py-2.5 font-bold text-white shadow-lg transition"
                >
                  Send Reply
                </button>
              </form>
            </div>
          </div>
        )}
      </section>
    );
  }

  if (panel === "Settings") {
    const handleSaveSettings = (e: React.FormEvent) => {
      e.preventDefault();
      const newSettings = { 
        title: settingsTitle, 
        email: settingsEmail, 
        phone: settingsPhone, 
        bookingsEnabled, 
        donationsEnabled, 
        bannerText 
      };
      localStorage.setItem("sasra-settings", JSON.stringify(newSettings));
      window.dispatchEvent(new Event("sasra-settings-updated"));
      setSaveMsg("Settings updated successfully! Changes are applied across the website.");
      setTimeout(() => setSaveMsg(""), 3000);
    };

    return (
      <section className="rounded-2xl bg-white p-5 shadow-lg dark:bg-stone-900">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Administration</p>
        <h3 className="mt-2 text-2xl font-bold">Ashramam Website Settings</h3>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">
          Configure general temple descriptors, contact details, operational features, and notification banners.
        </p>

        {saveMsg && (
          <p className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 dark:bg-green-950/20 dark:text-green-400">
            {saveMsg}
          </p>
        )}

        <form onSubmit={handleSaveSettings} className="mt-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-semibold">
              Ashramam / Temple Title
              <input
                required
                type="text"
                value={settingsTitle}
                onChange={(e) => setSettingsTitle(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-gold/30 bg-stone-50 dark:bg-stone-950 px-4 py-3 outline-none focus:ring-2 focus:ring-gold text-sm dark:text-stone-100"
              />
            </label>

            <label className="block text-sm font-semibold">
              Office Email Address
              <input
                required
                type="email"
                value={settingsEmail}
                onChange={(e) => setSettingsEmail(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-gold/30 bg-stone-50 dark:bg-stone-950 px-4 py-3 outline-none focus:ring-2 focus:ring-gold text-sm dark:text-stone-100"
              />
            </label>

            <label className="block text-sm font-semibold">
              Office Help Desk Phone
              <input
                required
                type="text"
                value={settingsPhone}
                onChange={(e) => setSettingsPhone(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-gold/30 bg-stone-50 dark:bg-stone-950 px-4 py-3 outline-none focus:ring-2 focus:ring-gold text-sm dark:text-stone-100"
              />
            </label>

            <label className="block text-sm font-semibold">
              Marquee Notification Banner
              <input
                required
                type="text"
                value={bannerText}
                onChange={(e) => setBannerText(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-gold/30 bg-stone-50 dark:bg-stone-950 px-4 py-3 outline-none focus:ring-2 focus:ring-gold text-sm dark:text-stone-100"
              />
            </label>
          </div>

          <div className="border-t border-amber-100/50 dark:border-white/5 pt-5 space-y-3">
            <h4 className="font-bold text-stone-900 dark:text-amber-50">Operational Toggles</h4>
            
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex items-center gap-3 p-4 rounded-xl border border-gold/20 bg-stone-50/50 dark:bg-stone-950/30 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bookingsEnabled}
                  onChange={(e) => setBookingsEnabled(e.checked)}
                  className="h-5 w-5 accent-gold cursor-pointer"
                />
                <div>
                  <p className="font-bold text-sm">Allow Pooja Bookings</p>
                  <p className="text-xs text-stone-500">Enable devotees to schedule sevas online.</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 rounded-xl border border-gold/20 bg-stone-50/50 dark:bg-stone-950/30 cursor-pointer">
                <input
                  type="checkbox"
                  checked={donationsEnabled}
                  onChange={(e) => setDonationsEnabled(e.checked)}
                  className="h-5 w-5 accent-gold cursor-pointer"
                />
                <div>
                  <p className="font-bold text-sm">Allow Online Donations</p>
                  <p className="text-xs text-stone-500">Enable devotee payment pathways for goshala and build sevas.</p>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="rounded-full bg-temple hover:bg-amber-800 dark:bg-gold dark:text-stone-950 px-7 py-3 font-bold text-white shadow-lg transition"
          >
            Save Settings
          </button>
        </form>
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
                className={`rounded-xl px-4 py-3 text-left text-sm font-semibold hover:bg-gold/15 whitespace-nowrap ${activePanel === item ? "bg-gold text-white" : ""}`}
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
