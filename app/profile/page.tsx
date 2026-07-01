"use client";

import { useState, useEffect } from "react";
import { User as UserIcon, Calendar, CreditCard, Save, Mail, MapPin, ShieldAlert, CheckCircle, Users as UsersIcon, Plus, Trash2, BookOpen } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminLink from "@/components/AdminLink";

interface FamilyMember {
  name: string;
  relation: string;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  lastLoggedIn?: string;
  family?: FamilyMember[];
}

interface BookLendingRecord {
  id: string;
  bookName: string;
  category: string;
  borrowedDate: string;
  dueDate: string;
  status: string;
}

interface Booking {
  id: string;
  name: string;
  devoteeName: string;
  date: string;
  amount: string;
  gotram?: string;
  status: string;
}

interface Donation {
  id: string;
  category: string;
  amount: string;
  date: string;
  status: string;
  paymentMethod: string;
}

const standardRelations = [
  "Wife",
  "Husband",
  "Son",
  "Daughter",
  "Father",
  "Mother",
  "Brother",
  "Sister",
  "Grandfather",
  "Grandmother"
];

export default function DevoteeProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"profile" | "family" | "bookings" | "donations" | "books">("profile");

  // Profile Form States
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    phone: "",
    address: "",
    family: []
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Family Tree Input States
  const [memberName, setMemberName] = useState("");
  const [memberRelation, setMemberRelation] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [familySuccess, setFamilySuccess] = useState(false);

  // Bookings and Donations States
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [books, setBooks] = useState<BookLendingRecord[]>([]);

  const syncProfileToAll = (updatedProfile: UserProfile) => {
    try {
      const allProfiles = localStorage.getItem("sasra-all-profiles");
      const list = allProfiles ? JSON.parse(allProfiles) : [];
      const index = list.findIndex((u: any) => u.email === updatedProfile.email);
      if (index !== -1) {
        list[index] = updatedProfile;
      } else {
        list.push(updatedProfile);
      }
      localStorage.setItem("sasra-all-profiles", JSON.stringify(list));
    } catch (e) {}
  };

  const syncBooksToAll = (email: string, bookList: BookLendingRecord[]) => {
    try {
      const allStr = localStorage.getItem("sasra-all-book-lendings");
      let list = allStr ? JSON.parse(allStr) : [];
      list = list.filter((item: any) => item.email !== email);
      const devoteeName = localStorage.getItem("sasra-user-profile") 
        ? JSON.parse(localStorage.getItem("sasra-user-profile")!).name 
        : "Devotee User";
      bookList.forEach(bk => {
        list.push({
          ...bk,
          email,
          name: devoteeName
        });
      });
      localStorage.setItem("sasra-all-book-lendings", JSON.stringify(list));
    } catch (e) {}
  };

  useEffect(() => {
    const logged = localStorage.getItem("sasra-user-logged-in") === "true";
    setIsLoggedIn(logged);
    
    if (logged) {
      const storedEmail = localStorage.getItem("sasra-user-email") || "devotee@example.com";

      // 1. Fetch Profile Details from DB API (fallback to local cache)
      fetch(`/api/profile?email=${encodeURIComponent(storedEmail)}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch profile");
          return res.json();
        })
        .then((data) => {
          if (data.profile) {
            const fetchedProfile = {
              ...data.profile,
              family: data.profile.family || []
            };
            setProfile(fetchedProfile);
            localStorage.setItem("sasra-user-profile", JSON.stringify(fetchedProfile));
            syncProfileToAll(fetchedProfile);
          }
        })
        .catch(() => {
          const savedProfile = localStorage.getItem("sasra-user-profile");
          if (savedProfile) {
            try {
              const parsed = JSON.parse(savedProfile);
              parsed.family = parsed.family || [];
              setProfile(parsed);
              syncProfileToAll(parsed);
            } catch (e) {}
          } else {
            const defaultProfile = {
              name: "Devotee User",
              email: storedEmail,
              phone: "+91 98765 43210",
              address: "123 Ashram Road, Near Main Temple, India",
              family: []
            };
            setProfile(defaultProfile);
            localStorage.setItem("sasra-user-profile", JSON.stringify(defaultProfile));
            syncProfileToAll(defaultProfile);
          }
        });

      // 2. Fetch Bookings from DB API (fallback to local cache)
      const loadBookings = () => {
        fetch(`/api/bookings?email=${encodeURIComponent(storedEmail)}`)
          .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch bookings");
            return res.json();
          })
          .then((data) => {
            if (data.bookings && data.bookings.length > 0) {
              setBookings(data.bookings);
              localStorage.setItem("sasra-user-bookings", JSON.stringify(data.bookings));
            } else {
              const savedBookings = localStorage.getItem("sasra-user-bookings");
              if (savedBookings) setBookings(JSON.parse(savedBookings));
            }
          })
          .catch(() => {
            const savedBookings = localStorage.getItem("sasra-user-bookings");
            if (savedBookings) setBookings(JSON.parse(savedBookings));
          });
      };
      loadBookings();

      // 3. Fetch Donations from DB API (fallback to local cache)
      const loadDonations = () => {
        fetch(`/api/donations?email=${encodeURIComponent(storedEmail)}`)
          .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch donations");
            return res.json();
          })
          .then((data) => {
            if (data.donations && data.donations.length > 0) {
              setDonations(data.donations);
              localStorage.setItem("sasra-user-donations", JSON.stringify(data.donations));
            } else {
              const savedDonations = localStorage.getItem("sasra-user-donations");
              if (savedDonations) setDonations(JSON.parse(savedDonations));
            }
          })
          .catch(() => {
            const savedDonations = localStorage.getItem("sasra-user-donations");
            if (savedDonations) setDonations(JSON.parse(savedDonations));
          });
      };
      loadDonations();

      // 4. Fetch Book Lendings — reads from shared sasra-all-book-lendings (updated by admin too)
      const loadBooks = () => {
        // First try the shared global store (admin changes go here)
        const allLendings = localStorage.getItem("sasra-all-book-lendings");
        if (allLendings) {
          try {
            const parsed = JSON.parse(allLendings);
            const userBooks = parsed.filter((item: any) => item.email === storedEmail);
            if (userBooks.length > 0) {
              setBooks(userBooks);
              return;
            }
          } catch {}
        }
        // Fallback: try API
        fetch(`/api/books/lending?email=${encodeURIComponent(storedEmail)}`)
          .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch books");
            return res.json();
          })
          .then((data) => {
            if (data.lending && data.lending.length > 0) {
              setBooks(data.lending);
              syncBooksToAll(storedEmail, data.lending);
            }
          })
          .catch(() => {
            const saved = localStorage.getItem("sasra-user-books");
            if (saved) setBooks(JSON.parse(saved));
          });
      };
      loadBooks();

      // Listen for updates from other sections
      window.addEventListener("sasra-bookings-updated", loadBookings);
      window.addEventListener("sasra-donations-updated", loadDonations);
      // Listen for admin marking books returned/undo
      window.addEventListener("sasra-books-updated", loadBooks);

      return () => {
        window.removeEventListener("sasra-bookings-updated", loadBookings);
        window.removeEventListener("sasra-donations-updated", loadDonations);
        window.removeEventListener("sasra-books-updated", loadBooks);
      };
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to LocalStorage first for instant responsiveness
    localStorage.setItem("sasra-user-profile", JSON.stringify(profile));
    syncProfileToAll(profile);
    
    // Sync update to DB API
    fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) {
          const updated = {
            ...data.profile,
            family: data.profile.family || []
          };
          setProfile(updated);
          localStorage.setItem("sasra-user-profile", JSON.stringify(updated));
          syncProfileToAll(updated);
        }
      })
      .catch((err) => console.warn("Offline or database connection skipped: profile saved locally", err));

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddFamilyMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim()) return;

    const relationText = memberRelation.trim();
    if (!relationText) return;

    const updatedFamily = [...(profile.family || []), { name: memberName.trim(), relation: relationText }];
    const updatedProfile = { ...profile, family: updatedFamily };
    
    setProfile(updatedProfile);
    localStorage.setItem("sasra-user-profile", JSON.stringify(updatedProfile));
    syncProfileToAll(updatedProfile);

    // Sync to API
    fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProfile)
    }).catch((err) => console.warn("Offline sync skipped: family member saved locally", err));

    setMemberName("");
    setMemberRelation("");
    setFamilySuccess(true);
    setTimeout(() => setFamilySuccess(false), 2000);
  };

  const handleRemoveFamilyMember = (index: number) => {
    const updatedFamily = (profile.family || []).filter((_, i) => i !== index);
    const updatedProfile = { ...profile, family: updatedFamily };

    setProfile(updatedProfile);
    localStorage.setItem("sasra-user-profile", JSON.stringify(updatedProfile));
    syncProfileToAll(updatedProfile);

    // Sync to API
    fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProfile)
    }).catch((err) => console.warn("Offline sync skipped: family member removed locally", err));
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col justify-between">
        <Header />
        <div className="flex-1 grid place-items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col justify-between text-stone-900 dark:text-stone-100">
      <Header />
      
      <div className="flex-1 py-12 px-4 container-x max-w-5xl">
        {!isLoggedIn ? (
          <div className="max-w-md mx-auto text-center bg-white dark:bg-stone-900 rounded-3xl p-8 shadow-xl border border-amber-100 dark:border-white/5 space-y-6 my-12">
            <ShieldAlert className="mx-auto h-16 w-16 text-gold" />
            <h1 className="text-3xl font-extrabold text-temple dark:text-gold">Access Restricted</h1>
            <p className="text-stone-600 dark:text-stone-300">
              Please log in or register for a devotee account to access your personalized profile, family tree, pooja bookings, and donation history.
            </p>
            <Link
              href="/login"
              className="block w-full rounded-full bg-temple hover:bg-amber-800 dark:bg-gold dark:text-stone-950 px-6 py-3 font-bold text-white shadow-lg transition duration-200"
            >
              Go to Login Page
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-[1fr_2.5fr] items-start">
            
            {/* Left Column: Devotee Overview */}
            <div className="bg-white dark:bg-stone-900 border border-amber-100 dark:border-white/5 rounded-3xl p-6 shadow-md space-y-6">
              <div className="text-center space-y-3">
                <div className="mx-auto h-20 w-20 rounded-full bg-amber-50 dark:bg-white/5 border-2 border-gold/45 grid place-items-center text-gold font-extrabold text-3xl">
                  {profile.name ? profile.name.charAt(0).toUpperCase() : "D"}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-stone-900 dark:text-amber-50">{profile.name || "Devotee User"}</h2>
                  <p className="text-sm text-stone-500 dark:text-stone-400">{profile.email}</p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex flex-col gap-2 border-t border-amber-100/50 dark:border-white/5 pt-6">
                {[
                  { id: "profile", label: "My Profile", icon: UserIcon },
                  { id: "family", label: "Family Tree", icon: UsersIcon },
                  { id: "bookings", label: "Pooja Bookings", icon: Calendar },
                  { id: "donations", label: "Donation History", icon: CreditCard },
                  { id: "books", label: "Book Lending", icon: BookOpen }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-left text-sm font-semibold transition whitespace-nowrap ${
                        active
                          ? "bg-gold text-white shadow-md shadow-amber-300/20"
                          : "text-stone-600 dark:text-stone-300 hover:bg-amber-50/50 dark:hover:bg-white/5"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Tab Contents */}
            <div className="bg-white dark:bg-stone-900 border border-amber-100 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-md">
              
              {/* Tab 1: Profile Details Form (No Mobile Field) */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-bold text-temple dark:text-gold">Devotee Profile</h1>
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                      Manage your profile information and update your permanent records.
                    </p>
                  </div>

                  <form onSubmit={handleProfileSave} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block text-sm font-semibold">
                        Devotee Full Name
                        <input
                          required
                          type="text"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          className="mt-1.5 w-full rounded-xl border border-gold/30 bg-stone-50 dark:bg-stone-800 px-4 py-3 outline-none focus:ring-2 focus:ring-gold dark:text-stone-100"
                        />
                      </label>
                      <label className="block text-sm font-semibold">
                        Email Address (Read-only)
                        <div className="relative mt-1.5">
                          <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
                          <input
                            readOnly
                            type="email"
                            value={profile.email}
                            className="w-full rounded-xl border border-gold/15 bg-stone-100 dark:bg-stone-800/50 px-12 py-3 outline-none cursor-not-allowed text-stone-500"
                          />
                        </div>
                      </label>
                    </div>

                    <label className="block text-sm font-semibold">
                      Residential Address
                      <div className="relative mt-1.5">
                        <MapPin className="absolute left-4 top-4 h-5 w-5 text-gold" />
                        <textarea
                          required
                          rows={4}
                          value={profile.address}
                          onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                          className="w-full rounded-xl border border-gold/30 bg-stone-50 dark:bg-stone-800 pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-gold dark:text-stone-100"
                        />
                      </div>
                    </label>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-amber-100/50 dark:border-white/5">
                      <button
                        type="submit"
                        className="flex items-center justify-center gap-2 rounded-full bg-temple hover:bg-amber-800 dark:bg-gold dark:text-stone-950 px-6 py-3 font-bold text-white shadow-lg transition"
                      >
                        <Save className="h-4 w-4" />
                        Save Changes
                      </button>
                      
                      {saveSuccess && (
                        <span className="flex items-center gap-2 text-sm font-bold text-green-600 dark:text-green-400">
                          <CheckCircle className="h-5 w-5" />
                          Profile changes saved successfully.
                        </span>
                      )}
                    </div>
                  </form>
                </div>
              )}

              {/* Tab 2: Family Tree Section */}
              {activeTab === "family" && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-bold text-temple dark:text-gold">Family Tree</h1>
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                      Add your family members to register for combined sevas or dynamic group bookings.
                    </p>
                  </div>

                  {/* List of current members */}
                  {(!profile.family || profile.family.length === 0) ? (
                    <div className="text-center py-8 bg-amber-50/20 dark:bg-white/5 rounded-3xl border border-dashed border-amber-200 dark:border-white/10 space-y-2">
                      <UsersIcon className="mx-auto h-12 w-12 text-gold opacity-60" />
                      <p className="text-stone-650 dark:text-stone-350 font-semibold text-sm">No family members registered yet.</p>
                      <p className="text-xs text-stone-500">Add details below to construct your family database.</p>
                    </div>
                  ) : (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {profile.family.map((member, idx) => (
                        <div key={`${member.name}-${idx}`} className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-stone-50 border border-gold/15 dark:bg-white/5 dark:border-white/5 hover:border-gold/30 transition">
                          <div>
                            <p className="font-bold text-stone-900 dark:text-amber-50">{member.name}</p>
                            <p className="text-xs text-gold font-semibold uppercase tracking-wider">{member.relation}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveFamilyMember(idx)}
                            className="p-2 rounded-full text-red-500 hover:bg-red-55/20 dark:hover:bg-red-950/30 transition"
                            title="Remove Member"
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Member Form */}
                  <form onSubmit={handleAddFamilyMember} className="border-t border-amber-100/50 dark:border-white/5 pt-6 space-y-4">
                    <h3 className="text-lg font-bold text-stone-900 dark:text-amber-50">Add Family Member</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block text-sm font-semibold">
                        Member Name *
                        <input
                          required
                          type="text"
                          value={memberName}
                          onChange={(e) => setMemberName(e.target.value)}
                          placeholder="e.g. Srikant Sharma"
                          className="mt-1.5 w-full rounded-xl border border-gold/30 bg-stone-50 dark:bg-stone-800 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold dark:text-stone-100"
                        />
                      </label>

                      <label className="block text-sm font-semibold relative">
                        Relation *
                        <input
                          required
                          value={memberRelation}
                          onChange={(e) => {
                            setMemberRelation(e.target.value);
                            setShowDropdown(true);
                          }}
                          onFocus={() => setShowDropdown(true)}
                          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                          placeholder="Select or type relation"
                          className="mt-1.5 w-full rounded-xl border border-gold/30 bg-stone-50 dark:bg-stone-800 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold dark:text-stone-100"
                        />
                        {showDropdown && (
                          <div className="absolute left-0 right-0 z-10 mt-1 max-h-48 overflow-y-auto rounded-xl border border-gold/30 bg-white dark:bg-stone-900 shadow-xl dark:border-white/10">
                            {standardRelations
                              .filter((rel) => rel.toLowerCase().includes(memberRelation.toLowerCase()))
                              .map((rel) => (
                                <button
                                  key={rel}
                                  type="button"
                                  onClick={() => {
                                    setMemberRelation(rel);
                                    setShowDropdown(false);
                                  }}
                                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gold/15 dark:hover:bg-white/10 text-stone-750 dark:text-stone-300 transition"
                                >
                                  {rel}
                                </button>
                              ))}
                          </div>
                        )}
                      </label>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <button
                        type="submit"
                        className="flex items-center gap-2 rounded-full bg-temple hover:bg-amber-800 dark:bg-gold dark:text-stone-950 px-6 py-2.5 font-bold text-white shadow-md transition"
                      >
                        <Plus className="h-4 w-4" />
                        Add Member
                      </button>
                      
                      {familySuccess && (
                        <span className="flex items-center gap-2 text-sm font-bold text-green-600 dark:text-green-400">
                          <CheckCircle className="h-5 w-5" />
                          Family member added successfully.
                        </span>
                      )}
                    </div>
                  </form>
                </div>
              )}

              {/* Tab 3: Pooja Bookings List */}
              {activeTab === "bookings" && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-bold text-temple dark:text-gold">Pooja Bookings</h1>
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                      Your upcoming scheduled and previous completed poojas and sevas.
                    </p>
                  </div>

                  {bookings.length === 0 ? (
                    <div className="text-center py-12 bg-amber-50/20 dark:bg-white/5 rounded-3xl border border-dashed border-amber-200 dark:border-white/10 space-y-4">
                      <Calendar className="mx-auto h-12 w-12 text-gold opacity-60" />
                      <p className="text-stone-650 dark:text-stone-350 font-semibold">No bookings found</p>
                      <p className="text-sm text-stone-500 max-w-xs mx-auto">
                        Go to the homepage to book dynamic poojas and sevas instantly.
                      </p>
                      <Link href="/#programs" className="inline-block rounded-full bg-temple px-6 py-2 text-sm font-bold text-white transition hover:opacity-90">
                        Book Seva Now
                      </Link>
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-2xl border border-amber-100 dark:border-white/5">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead className="bg-amber-50 dark:bg-white/5 text-temple dark:text-gold">
                          <tr>
                            <th className="p-4 font-bold">Booking ID</th>
                            <th className="p-4 font-bold">Pooja Name</th>
                            <th className="p-4 font-bold">Devotee Name</th>
                            <th className="p-4 font-bold">Scheduled Date</th>
                            <th className="p-4 font-bold">Gotram</th>
                            <th className="p-4 font-bold">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookings.map((booking) => (
                            <tr key={booking.id} className="border-t border-amber-100/30 dark:border-white/5 hover:bg-amber-50/20 dark:hover:bg-white/5 transition">
                              <td className="p-4 font-bold text-gold">{booking.id}</td>
                              <td className="p-4 font-bold">{booking.name}</td>
                              <td className="p-4">{booking.devoteeName}</td>
                              <td className="p-4">{new Date(booking.date).toLocaleDateString("en-IN", { dateStyle: "medium" })}</td>
                              <td className="p-4 italic">{booking.gotram || "N/A"}</td>
                              <td className="p-4">
                                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                                  booking.status === "Confirmed"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                    : "bg-stone-100 text-stone-800 dark:bg-white/10 dark:text-stone-300"
                                }`}>
                                  {booking.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 4: Donations History */}
              {activeTab === "donations" && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-bold text-temple dark:text-gold">Donation History</h1>
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                      Receipt logs of your financial contributions to the Ashramam funds.
                    </p>
                  </div>

                  {donations.length === 0 ? (
                    <div className="text-center py-12 bg-amber-50/20 dark:bg-white/5 rounded-3xl border border-dashed border-amber-200 dark:border-white/10 space-y-4">
                      <CreditCard className="mx-auto h-12 w-12 text-gold opacity-60" />
                      <p className="text-stone-650 dark:text-stone-350 font-semibold">No donations recorded</p>
                      <p className="text-sm text-stone-500 max-w-xs mx-auto">
                        Support the temple construction, goshala, and social causes.
                      </p>
                      <Link href="/#donations" className="inline-block rounded-full bg-temple px-6 py-2 text-sm font-bold text-white transition hover:opacity-90">
                        Make a Donation
                      </Link>
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-2xl border border-amber-100 dark:border-white/5">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead className="bg-amber-50 dark:bg-white/5 text-temple dark:text-gold">
                          <tr>
                            <th className="p-4 font-bold">Transaction ID</th>
                            <th className="p-4 font-bold">Purpose / Category</th>
                            <th className="p-4 font-bold">Amount</th>
                            <th className="p-4 font-bold">Date</th>
                            <th className="p-4 font-bold">Method</th>
                            <th className="p-4 font-bold">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {donations.map((donation) => (
                            <tr key={donation.id} className="border-t border-amber-100/30 dark:border-white/5 hover:bg-amber-50/20 dark:hover:bg-white/5 transition">
                              <td className="p-4 font-bold text-gold">{donation.id}</td>
                              <td className="p-4 font-bold">{donation.category}</td>
                              <td className="p-4 font-extrabold text-temple dark:text-gold">{donation.amount}</td>
                              <td className="p-4">{new Date(donation.date).toLocaleDateString("en-IN", { dateStyle: "medium" })}</td>
                              <td className="p-4 text-xs font-semibold">{donation.paymentMethod}</td>
                              <td className="p-4">
                                <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                  {donation.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 5: Book Lending List */}
              {activeTab === "books" && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-bold text-temple dark:text-gold">Book Lending Details</h1>
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                      View details of the books you have borrowed from the Ashramam library and check return deadlines.
                    </p>
                  </div>

                  {books.length === 0 ? (
                    <div className="text-center py-12 bg-amber-50/20 dark:bg-white/5 rounded-3xl border border-dashed border-amber-200 dark:border-white/10 space-y-4">
                      <BookOpen className="mx-auto h-12 w-12 text-gold opacity-60" />
                      <p className="text-stone-650 dark:text-stone-350 font-semibold">No books borrowed</p>
                      <p className="text-sm text-stone-500 max-w-xs mx-auto">
                        Visit the temple library to borrow devotional books, scriptures, and bhajan collections.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-2xl border border-amber-100 dark:border-white/5">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead className="bg-amber-50 dark:bg-white/5 text-temple dark:text-gold">
                          <tr>
                            <th className="p-4 font-bold">Lending ID</th>
                            <th className="p-4 font-bold">Book Name</th>
                            <th className="p-4 font-bold">Category</th>
                            <th className="p-4 font-bold">Borrowed On</th>
                            <th className="p-4 font-bold">Due Date</th>
                            <th className="p-4 font-bold">Days Left</th>
                            <th className="p-4 font-bold">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {books.map((item) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            const due = new Date(item.dueDate);
                            due.setHours(0, 0, 0, 0);
                            const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

                            let daysLeftText = "";
                            let daysLeftStyle = "";

                            if (diffDays > 5) {
                              daysLeftText = `${diffDays} days left`;
                              daysLeftStyle = "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
                            } else if (diffDays > 0) {
                              daysLeftText = `${diffDays} days - Return soon!`;
                              daysLeftStyle = "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400";
                            } else if (diffDays === 0) {
                              daysLeftText = "Due today!";
                              daysLeftStyle = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 animate-pulse font-bold";
                            } else {
                              daysLeftText = `Overdue by ${Math.abs(diffDays)} days!`;
                              daysLeftStyle = "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 font-bold";
                            }

                            return (
                              <tr key={item.id} className="border-t border-amber-100/30 dark:border-white/5 hover:bg-amber-50/20 dark:hover:bg-white/5 transition">
                                <td className="p-4 font-bold text-gold">{item.id}</td>
                                <td className="p-4 font-bold">{item.bookName}</td>
                                <td className="p-4">{item.category}</td>
                                <td className="p-4">{new Date(item.borrowedDate).toLocaleDateString("en-IN", { dateStyle: "medium" })}</td>
                                <td className="p-4">{new Date(item.dueDate).toLocaleDateString("en-IN", { dateStyle: "medium" })}</td>
                                <td className="p-4">
                                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs ${daysLeftStyle}`}>
                                    {daysLeftText}
                                  </span>
                                </td>
                                <td className="p-4">
                                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                                    diffDays >= 0
                                      ? "bg-stone-100 text-stone-850 dark:bg-white/10 dark:text-stone-300"
                                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                  }`}>
                                    {diffDays >= 0 ? item.status : "Overdue"}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <AdminLink />
      <Footer />
    </main>
  );
}
