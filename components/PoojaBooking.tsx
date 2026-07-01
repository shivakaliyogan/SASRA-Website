"use client";

import { useState, useEffect } from "react";
import { CalendarDays, Sparkles, X, CheckCircle2 } from "lucide-react";
import { poojas } from "@/lib/data";

const poojaPrices: Record<string, string> = {
  "Abhishekam": "₹501",
  "Archana": "₹101",
  "Satyanarayana Vratham": "₹1,001",
  "Annadanam Seva": "₹2,001",
  "Goshala Seva": "₹1,116"
};

export default function PoojaBooking() {
  const [selectedPooja, setSelectedPooja] = useState<string | null>(null);
  const [devoteeName, setDevoteeName] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [gotram, setGotram] = useState("");
  const [successBookingId, setSuccessBookingId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("sasra-user-logged-in") === "true");
  }, [selectedPooja]);

  useEffect(() => {
    if (selectedPooja) {
      const profileStr = localStorage.getItem("sasra-user-profile");
      if (profileStr) {
        try {
          const profile = JSON.parse(profileStr);
          if (profile.name) setDevoteeName(profile.name);
        } catch (e) {}
      }
    }
  }, [selectedPooja]);

  const schedules = poojas.map((pooja, index) => {
    const targetDate = new Date(Date.now() + (index + 1) * 86400000);
    return {
      name: pooja,
      dateString: targetDate.toLocaleDateString("en-IN", { dateStyle: "full" }),
      dateISO: targetDate.toISOString().split("T")[0],
      price: poojaPrices[pooja] || "₹501"
    };
  });

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPooja) return;

    const bId = `SASRA-PJ-${Date.now().toString().slice(-6)}`;
    const newBooking = {
      id: bId,
      name: selectedPooja,
      devoteeName: devoteeName || "Guest Devotee",
      date: bookingDate || new Date().toISOString().split("T")[0],
      gotram: gotram || "Kashyapa",
      amount: poojaPrices[selectedPooja] || "₹501",
      status: "Confirmed"
    };

    // Save to user bookings if logged in
    const currentBookings = localStorage.getItem("sasra-user-bookings");
    const list = currentBookings ? JSON.parse(currentBookings) : [];
    list.unshift(newBooking);
    localStorage.setItem("sasra-user-bookings", JSON.stringify(list));
    window.dispatchEvent(new Event("sasra-bookings-updated"));

    setSuccessBookingId(bId);
  };

  const closeModal = () => {
    setSelectedPooja(null);
    setDevoteeName("");
    setBookingDate("");
    setGotram("");
    setSuccessBookingId(null);
  };

  return (
    <section id="programs" className="section bg-white dark:bg-stone-950">
      <div className="container-x grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="font-semibold uppercase tracking-[0.28em] text-gold">Pooja Schedule</p>
          <h2 className="mt-2 text-3xl font-bold md:text-5xl">Book sacred sevas and poojas online.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {["Instant Confirmation", "Digital Receipts", "Devotee Dashboard"].map((item) => (
              <div key={item} className="glass rounded-2xl p-5 hover:border-gold/50 transition duration-300">
                <Sparkles className="mb-3 h-6 w-6 text-gold" />
                <p className="text-sm font-bold">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="glass rounded-3xl p-6 border border-amber-100 dark:border-white/5 bg-gradient-to-br from-white to-amber-50/20 dark:from-stone-950 dark:to-stone-900/40">
          <div className="grid gap-4">
            {schedules.map((schedule) => (
              <div key={schedule.name} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white/80 border border-amber-100/50 p-4 dark:border-white/5 dark:bg-white/5 hover:shadow-md transition">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gold/10 text-gold">
                    <CalendarDays className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-stone-900 dark:text-amber-50">{schedule.name}</p>
                    <p className="text-sm text-stone-600 dark:text-stone-300">{schedule.dateString}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-extrabold text-temple dark:text-gold">{schedule.price}</span>
                  <button
                    onClick={() => {
                      setSelectedPooja(schedule.name);
                      setBookingDate(schedule.dateISO);
                    }}
                    className="rounded-full bg-temple hover:bg-amber-800 dark:bg-gold dark:text-stone-950 px-5 py-2 text-sm font-bold text-white shadow-lg transition"
                  >
                    Book Seva
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedPooja && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-6 shadow-2xl dark:bg-stone-900 border border-amber-100 dark:border-white/10 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>

            {!successBookingId ? (
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-temple dark:text-gold">Book {selectedPooja}</h3>
                  <p className="text-sm text-stone-600 dark:text-stone-300 mt-1">
                    Fill details to proceed with booking. Price: <span className="font-bold">{poojaPrices[selectedPooja]}</span>
                  </p>
                </div>

                {!isLoggedIn && (
                  <div className="rounded-xl bg-amber-50 dark:bg-white/5 border border-gold/20 p-3 text-xs text-amber-800 dark:text-gold">
                    Note: You are currently booking as guest. Log in to sync this booking with your permanent profile receipts.
                  </div>
                )}

                <div className="space-y-3">
                  <label className="block text-sm font-semibold">
                    Devotee Full Name *
                    <input
                      required
                      type="text"
                      value={devoteeName}
                      onChange={(e) => setDevoteeName(e.target.value)}
                      placeholder="Name of person performing Pooja"
                      className="mt-1 w-full rounded-xl border border-gold/30 bg-white dark:bg-stone-800 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold"
                    />
                  </label>

                  <label className="block text-sm font-semibold">
                    Preferred Date *
                    <input
                      required
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-gold/30 bg-white dark:bg-stone-800 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold"
                    />
                  </label>

                  <label className="block text-sm font-semibold">
                    Gotram (Optional)
                    <input
                      type="text"
                      value={gotram}
                      onChange={(e) => setGotram(e.target.value)}
                      placeholder="e.g. Bharadwaja"
                      className="mt-1 w-full rounded-xl border border-gold/30 bg-white dark:bg-stone-800 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-temple px-6 py-3 font-bold text-white shadow-lg transition duration-200 hover:-translate-y-0.5"
                >
                  Confirm & Book Seva
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
                <h3 className="text-2xl font-bold text-stone-900 dark:text-amber-50">Booking Confirmed!</h3>
                <div className="space-y-1">
                  <p className="text-stone-600 dark:text-stone-300">
                    Your seva has been successfully scheduled.
                  </p>
                  <p className="text-sm font-bold text-gold">
                    Booking ID: {successBookingId}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="rounded-full bg-stone-900 px-6 py-2.5 font-semibold text-white dark:bg-amber-50 dark:text-stone-900"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
