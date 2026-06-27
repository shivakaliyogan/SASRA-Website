"use client";

import { useState } from "react";
import { CreditCard, HandCoins, ReceiptText } from "lucide-react";

const categories = ["Goshala Donation", "Temple Construction Fund", "General Donation", "Festival Sponsorship"];
const payments = ["UPI", "PhonePe", "Google Pay", "Paytm", "Razorpay"];

export default function Donations() {
  const [done, setDone] = useState(false);
  return (
    <section id="donations" className="section bg-lotus dark:bg-stone-900">
      <div className="container-x grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div>
          <p className="font-semibold uppercase tracking-[0.28em] text-gold">Donation Module</p>
          <h2 className="mt-2 text-3xl font-bold md:text-5xl">Contribute securely to seva and temple work.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[HandCoins, CreditCard, ReceiptText].map((Icon, i) => <div key={i} className="glass rounded-2xl p-5"><Icon className="mb-3 h-7 w-7 text-gold" /><p className="font-bold">{["Donation History", "Secure Gateway", "Receipts"][i]}</p></div>)}
          </div>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="rounded-2xl bg-white p-6 shadow-xl dark:bg-stone-950">
          <div className="grid gap-4">
            <select className="rounded-xl border border-gold/30 px-4 py-3 dark:bg-stone-900">{categories.map((item) => <option key={item}>{item}</option>)}</select>
            <input type="text" inputMode="numeric" pattern="[0-9]*" placeholder="Amount" onInput={(event) => { event.currentTarget.value = event.currentTarget.value.replace(/\D/g, ""); }} className="rounded-xl border border-gold/30 px-4 py-3 dark:bg-stone-900" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">{payments.map((item) => <label key={item} className="rounded-xl border border-gold/30 px-3 py-3 text-center text-sm font-semibold"><input name="payment" type="radio" className="sr-only" />{item}</label>)}</div>
          </div>
          <button className="mt-5 w-full rounded-full bg-temple px-7 py-3 font-bold text-white">Proceed to Payment</button>
          {done && <p className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">Payment status: Succeeded. Receipt is ready for this donation.</p>}
        </form>
      </div>
    </section>
  );
}
