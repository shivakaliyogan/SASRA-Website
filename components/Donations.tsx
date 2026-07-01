"use client";

import { useState } from "react";
import { CreditCard, HandCoins, ReceiptText } from "lucide-react";

const categories = ["Goshala Donation", "Temple Construction Fund", "General Donation", "Festival Sponsorship"];
const payments = ["UPI", "PhonePe", "Google Pay", "Paytm", "Razorpay"];

export default function Donations() {
  const [done, setDone] = useState(false);
  const [category, setCategory] = useState(categories[0]);
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(payments[0]);

  return (
    <section id="donations" className="section bg-lotus dark:bg-stone-900">
      <div className="container-x grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div>
          <p className="font-semibold uppercase tracking-[0.28em] text-gold">Donation Module</p>
          <h2 className="mt-2 text-3xl font-bold md:text-5xl">Contribute securely to seva and temple work.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[HandCoins, CreditCard, ReceiptText].map((Icon, i) => (
              <div key={i} className="glass rounded-2xl p-5">
                <Icon className="mb-3 h-7 w-7 text-gold" />
                <p className="font-bold">{["Donation History", "Secure Gateway", "Receipts"][i]}</p>
              </div>
            ))}
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!amount) return;
            
            const newDonation = {
              id: `SASRA-DN-${Date.now()}`,
              category,
              amount: `₹${Number(amount).toLocaleString("en-IN")}`,
              date: new Date().toISOString().split("T")[0],
              status: "Paid",
              paymentMethod
            };

            const loggedIn = localStorage.getItem("sasra-user-logged-in") === "true";
            if (loggedIn) {
              const current = localStorage.getItem("sasra-user-donations");
              const list = current ? JSON.parse(current) : [];
              list.unshift(newDonation);
              localStorage.setItem("sasra-user-donations", JSON.stringify(list));
              window.dispatchEvent(new Event("sasra-donations-updated"));
            }
            setDone(true);
          }}
          className="rounded-2xl bg-white p-6 shadow-xl dark:bg-stone-950"
        >
          <div className="grid gap-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-gold/30 px-4 py-3 dark:bg-stone-900 focus:ring-2 focus:ring-gold outline-none"
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            
            <input
              required
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
              className="rounded-xl border border-gold/30 px-4 py-3 dark:bg-stone-900 focus:ring-2 focus:ring-gold outline-none"
            />
            
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {payments.map((item) => (
                <label
                  key={item}
                  className={`rounded-xl border px-3 py-3 text-center text-sm font-semibold cursor-pointer transition ${
                    paymentMethod === item
                      ? "border-gold bg-gold/10 text-temple dark:text-gold"
                      : "border-gold/30 hover:border-gold/60"
                  }`}
                >
                  <input
                    name="payment"
                    type="radio"
                    value={item}
                    checked={paymentMethod === item}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>
          <button className="mt-5 w-full rounded-full bg-temple px-7 py-3 font-bold text-white shadow-lg shadow-amber-900/20 hover:opacity-90 transition">
            Proceed to Payment
          </button>
          {done && (
            <p className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 dark:bg-green-900/20 dark:text-green-400">
              Payment status: Succeeded. Receipt is ready for this donation. You can view this in your profile history.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
