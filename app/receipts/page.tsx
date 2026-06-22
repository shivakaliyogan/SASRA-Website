"use client";

import { useMemo, useState } from "react";
import AdminLink from "@/components/AdminLink";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const receipts = [
  { id: "SASRA-DN-1001", email: "devotee@example.com", type: "Donation", amount: "₹2,001", date: "2026-06-12", status: "Paid" },
  { id: "SASRA-PJ-2044", email: "devotee@example.com", type: "Pooja Booking", amount: "₹501", date: "2026-06-15", status: "Confirmed" },
  { id: "SASRA-BK-3110", email: "reader@example.com", type: "Book Lending", amount: "No fee", date: "2026-06-18", status: "Issued" }
];

export default function ReceiptsPage() {
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => receipts.filter((receipt) => receipt.email.toLowerCase() === query.toLowerCase()), [query]);

  return (
    <main>
      <Header />
      <section id="receipts" className="section min-h-[70vh] bg-lotus dark:bg-stone-900">
        <div className="container-x">
          <p className="font-semibold uppercase tracking-[0.28em] text-gold">Receipts</p>
          <h1 className="mt-2 text-3xl font-bold md:text-5xl">Find receipts by email.</h1>
          <form
            className="glass mt-8 flex flex-col gap-3 rounded-2xl p-4 md:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              setQuery(email.trim());
            }}
          >
            <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter registered email" className="flex-1 rounded-xl border border-gold/30 px-4 py-3 dark:bg-stone-950" />
            <button className="rounded-full bg-temple px-6 py-3 font-bold text-white">Search</button>
          </form>
          <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-stone-950">
            {!query ? (
              <p className="p-6 text-sm text-stone-600 dark:text-stone-300">Receipts will appear here after search.</p>
            ) : filtered.length === 0 ? (
              <p className="p-6 text-sm text-stone-600 dark:text-stone-300">No receipts found for {query}.</p>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-amber-50 text-temple dark:bg-white/10 dark:text-gold"><tr><th className="p-4">Receipt</th><th>Type</th><th>Amount</th><th>Date</th><th>Status</th></tr></thead>
                <tbody>
                  {filtered.map((receipt) => (
                    <tr key={receipt.id} className="border-t border-gold/10"><td className="p-4 font-bold">{receipt.id}</td><td>{receipt.type}</td><td>{receipt.amount}</td><td>{receipt.date}</td><td>{receipt.status}</td></tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
      <AdminLink />
      <Footer />
    </main>
  );
}
