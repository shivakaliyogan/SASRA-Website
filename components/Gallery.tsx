"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import { gallery } from "@/lib/data";

const filters = ["Images", "Videos", "Event Photos", "Virtual Temple Tour"];

export default function Gallery() {
  const [active, setActive] = useState("Images");
  const [lightbox, setLightbox] = useState<string | null>(null);
  return (
    <section id="gallery" className="section bg-lotus dark:bg-stone-900">
      <div className="container-x">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-semibold uppercase tracking-[0.28em] text-gold">Gallery</p>
            <h2 className="mt-2 text-3xl font-bold md:text-5xl">Moments of worship and service.</h2>
          </div>
          <div className="flex flex-wrap gap-2">{filters.map((item) => <button key={item} onClick={() => setActive(item)} className={`rounded-full px-4 py-2 text-sm font-bold ${active === item ? "bg-gold text-white" : "bg-white dark:bg-stone-950"}`}>{item}</button>)}</div>
        </div>
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {gallery.map((src, i) => (
            <button key={src} onClick={() => setLightbox(src)} className="relative mb-4 block h-64 w-full overflow-hidden rounded-2xl bg-white shadow-lg odd:h-80">
              <Image src={src} alt={`Ashramam gallery ${i + 1}`} fill className="object-cover transition hover:scale-105" sizes="(min-width: 1024px) 33vw, 100vw" />
            </button>
          ))}
        </div>
      </div>
      {lightbox && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/85 p-4" role="dialog" aria-modal="true">
          <button onClick={() => setLightbox(null)} className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white text-stone-900"><X /></button>
          <div className="relative h-[78vh] w-full max-w-5xl"><Image src={lightbox} alt="Expanded gallery item" fill className="object-contain" /></div>
        </div>
      )}
    </section>
  );
}
