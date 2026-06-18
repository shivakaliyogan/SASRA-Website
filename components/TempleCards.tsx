import Image from "next/image";
import { MapPin } from "lucide-react";
import { temples } from "@/lib/data";

export default function TempleCards() {
  return (
    <section id="temples" className="section bg-lotus dark:bg-stone-900">
      <div className="container-x">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-semibold uppercase tracking-[0.28em] text-gold">Featured Temples</p>
            <h2 className="mt-2 text-3xl font-bold md:text-5xl">Sacred spaces for darshan and seva.</h2>
          </div>
          <a href="#contact" className="font-bold text-temple dark:text-gold">Plan a visit</a>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {temples.map((temple) => (
            <article key={temple.name} className="group overflow-hidden rounded-2xl bg-white shadow-xl shadow-amber-900/10 dark:bg-stone-950">
              <div className="relative h-64 overflow-hidden">
                <Image src={temple.image} alt={temple.name} fill className="object-cover transition duration-700 group-hover:scale-110" sizes="(min-width: 768px) 33vw, 100vw" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{temple.name}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-gold"><MapPin className="h-4 w-4" />{temple.location}</p>
                <p className="mt-4 text-sm leading-6 text-stone-600 dark:text-stone-300">{temple.description}</p>
                <button className="mt-5 rounded-full bg-temple px-5 py-2.5 text-sm font-bold text-white">View Details</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
