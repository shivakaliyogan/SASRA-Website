"use client";

import { useEffect, useState } from "react";
import { BookOpen, Download, Quote } from "lucide-react";
import { articles, quotes } from "@/lib/data";

export default function SpiritualKnowledge() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setI((v) => (v + 1) % quotes.length), 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-stone-900 dark:via-stone-950 dark:to-black">
      <div className="container-x grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass rounded-2xl p-7">
          <Quote className="h-8 w-8 text-gold" />
          <p className="mt-6 text-2xl font-bold leading-relaxed">&ldquo;{quotes[i]}&rdquo;</p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-gold">Daily Spiritual Quote</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-stone-950">
            <BookOpen className="h-7 w-7 text-gold" />
            <h3 className="mt-3 text-2xl font-bold">Spiritual Articles</h3>
            <div className="mt-5 grid gap-3">{articles.map((item) => <button key={item} className="rounded-xl bg-amber-50 px-4 py-3 text-left font-semibold dark:bg-white/10">{item}</button>)}</div>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-stone-950">
            <Download className="h-7 w-7 text-gold" />
            <h3 className="mt-3 text-2xl font-bold">Downloads</h3>
            <div className="mt-5 grid gap-3">{["Books", "Stotras", "Bhajan Collections"].map((item) => <button key={item} className="rounded-xl bg-amber-50 px-4 py-3 text-left font-semibold dark:bg-white/10">{item}</button>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
