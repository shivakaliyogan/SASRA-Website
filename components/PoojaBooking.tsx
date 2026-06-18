"use client";

import { useState } from "react";
import { Download, History, ShieldCheck } from "lucide-react";
import { poojas } from "@/lib/data";

export default function PoojaBooking() {
  const [confirmed, setConfirmed] = useState(false);
  return (
    <section id="programs" className="section bg-white dark:bg-stone-950">
      <div className="container-x grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="font-semibold uppercase tracking-[0.28em] text-gold">Pooja Booking</p>
          <h2 className="mt-2 text-3xl font-bold md:text-5xl">Book special poojas with digital confirmations.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[ShieldCheck, Download, History].map((Icon, i) => (
              <div key={i} className="glass rounded-2xl p-5"><Icon className="mb-3 h-6 w-6 text-gold" /><p className="text-sm font-bold">{["Login Integration", "PDF Receipts", "Booking History"][i]}</p></div>
            ))}
          </div>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setConfirmed(true); }} className="glass rounded-2xl p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <input required placeholder="Devotee name" className="rounded-xl border border-gold/30 bg-white/80 px-4 py-3 dark:bg-stone-900" />
            <input required placeholder="Mobile number" className="rounded-xl border border-gold/30 bg-white/80 px-4 py-3 dark:bg-stone-900" />
            <select className="rounded-xl border border-gold/30 bg-white/80 px-4 py-3 dark:bg-stone-900">{poojas.map((pooja) => <option key={pooja}>{pooja}</option>)}</select>
            <input type="date" className="rounded-xl border border-gold/30 bg-white/80 px-4 py-3 dark:bg-stone-900" />
          </div>
          <button className="mt-5 rounded-full bg-gold px-7 py-3 font-bold text-white">Confirm Booking</button>
          {confirmed && <p className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">Booking confirmed. Receipt generation is ready for backend integration.</p>}
        </form>
      </div>
    </section>
  );
}
