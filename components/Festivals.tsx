import Image from "next/image";
import { festivals } from "@/lib/data";
import { daysUntil } from "@/lib/utils";

export default function Festivals() {
  return (
    <section id="festivals" className="section bg-white dark:bg-stone-950">
      <div className="container-x">
        <p className="font-semibold uppercase tracking-[0.28em] text-gold">Upcoming Festivals</p>
        <h2 className="mt-2 text-3xl font-bold md:text-5xl">Celebrate sacred occasions together.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {festivals.map((festival) => (
            <article key={festival.name} className="overflow-hidden rounded-2xl bg-lotus shadow-xl shadow-amber-900/10 dark:bg-stone-900">
              <div className="relative h-48"><Image src={festival.image} alt={festival.name} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" /></div>
              <div className="p-6">
                <p className="rounded-full bg-gold/15 px-3 py-1 text-sm font-bold text-temple dark:text-gold">{daysUntil(festival.date)} days left</p>
                <h3 className="mt-4 text-xl font-bold">{festival.name}</h3>
                <time className="mt-2 block text-sm text-gold">{new Date(festival.date).toLocaleDateString("en-IN", { dateStyle: "full" })}</time>
                <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-300">{festival.description}</p>
                <button className="mt-5 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-white">Register</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
