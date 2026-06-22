"use client";

import { useMemo, useState } from "react";
import { BookOpen, CalendarDays, ReceiptText } from "lucide-react";

const books = [
  { id: "book-1", type: "Vedic Scripture", name: "Bhagavad Gita", copies: 5 },
  { id: "book-2", type: "Devotional", name: "Vishnu Sahasranamam", copies: 3 },
  { id: "book-3", type: "Rajayoga", name: "Meditation and Inner Discipline", copies: 4 },
  { id: "book-4", type: "Stotra", name: "Daily Stotra Mala", copies: 6 }
];

export default function BooksSection() {
  const [type, setType] = useState("All");
  const [activeBook, setActiveBook] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const types = ["All", ...Array.from(new Set(books.map((book) => book.type)))];
  const filtered = useMemo(() => type === "All" ? books : books.filter((book) => book.type === type), [type]);

  return (
    <section id="books" className="section bg-lotus dark:bg-stone-900">
      <div className="container-x">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-semibold uppercase tracking-[0.28em] text-gold">Books</p>
            <h1 className="mt-2 text-3xl font-bold md:text-5xl">Ashramam devotional library.</h1>
            <p className="mt-4 max-w-2xl text-stone-600 dark:text-stone-300">
              Browse by book type and name, then select your lending start and end dates.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {types.map((item) => (
              <button key={item} onClick={() => setType(item)} className={`rounded-full px-4 py-2 text-sm font-bold ${type === item ? "bg-gold text-white" : "bg-white dark:bg-stone-950"}`}>
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {filtered.map((book) => (
            <article key={book.id} className="rounded-2xl bg-white p-6 shadow-xl dark:bg-stone-950">
              <BookOpen className="h-8 w-8 text-gold" />
              <p className="mt-4 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-temple dark:bg-white/10 dark:text-gold">{book.type}</p>
              <h2 className="mt-4 text-xl font-bold">{book.name}</h2>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">{book.copies} copies available</p>
              {activeBook === book.id ? (
                <form
                  className="mt-5 grid gap-3"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setMessage(`${book.name} lending request saved. Receipt can be searched by email.`);
                    setActiveBook(null);
                  }}
                >
                  <input required placeholder="Full name" className="rounded-xl border border-gold/30 px-4 py-3 text-sm dark:bg-stone-900" />
                  <input required type="email" placeholder="Email for receipt" className="rounded-xl border border-gold/30 px-4 py-3 text-sm dark:bg-stone-900" />
                  <div className="grid grid-cols-2 gap-2">
                    <label className="text-xs font-semibold text-stone-500">Start<input required type="date" className="mt-1 w-full rounded-xl border border-gold/30 px-3 py-2 text-sm dark:bg-stone-900" /></label>
                    <label className="text-xs font-semibold text-stone-500">End<input required type="date" className="mt-1 w-full rounded-xl border border-gold/30 px-3 py-2 text-sm dark:bg-stone-900" /></label>
                  </div>
                  <button className="rounded-full bg-temple px-5 py-3 text-sm font-bold text-white">Confirm Lending</button>
                </form>
              ) : (
                <button onClick={() => setActiveBook(book.id)} className="mt-5 rounded-full bg-temple px-5 py-3 text-sm font-bold text-white">Borrow Book</button>
              )}
            </article>
          ))}
        </div>
        {message && <p className="mt-6 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">{message}</p>}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="glass rounded-2xl p-5"><CalendarDays className="mb-3 h-6 w-6 text-gold" /><p className="font-bold">Start and end date based lending period</p></div>
          <div className="glass rounded-2xl p-5"><ReceiptText className="mb-3 h-6 w-6 text-gold" /><p className="font-bold">Receipts searchable by email</p></div>
        </div>
      </div>
    </section>
  );
}
