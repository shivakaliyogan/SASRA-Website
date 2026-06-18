"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { searchIndex } from "@/lib/data";

export default function SearchSection() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchIndex.filter((item) => item.toLowerCase().includes(query.toLowerCase())).slice(0, 6), [query]);

  return (
    <section className="-mt-10 relative z-10">
      <div className="container-x glass rounded-2xl p-4 md:p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gold" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search temples, sevas, festivals and spiritual events" className="w-full rounded-2xl border border-gold/30 bg-white px-12 py-4 text-base outline-none focus:ring-4 focus:ring-amber-200 dark:bg-stone-900" />
        </div>
        {query && (
          <div className="mt-4 grid gap-2 md:grid-cols-3">
            {results.map((item) => <button key={item} className="rounded-xl bg-amber-50 px-4 py-3 text-left text-sm font-semibold hover:bg-gold hover:text-white dark:bg-white/10">{item}</button>)}
            {!results.length && <p className="px-2 py-3 text-sm text-stone-600 dark:text-stone-300">No matches found.</p>}
          </div>
        )}
      </div>
    </section>
  );
}
