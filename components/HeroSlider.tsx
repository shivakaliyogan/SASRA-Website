"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { heroSlides } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState(heroSlides);
  const slide = slides[index] ?? heroSlides[0];
  const go = (dir: number) => setIndex((current) => (current + dir + slides.length) % slides.length);

  useEffect(() => {
    const syncSlides = () => {
      try {
        const savedSlides = localStorage.getItem("sasra-hero-slides");
        if (!savedSlides) return;
        const parsedSlides = JSON.parse(savedSlides) as typeof heroSlides;
        if (Array.isArray(parsedSlides) && parsedSlides.length > 0) {
          setSlides(parsedSlides);
          setIndex(0);
        }
      } catch {
        localStorage.removeItem("sasra-hero-slides");
      }
    };
    syncSlides();
    window.addEventListener("sasra-hero-slides-updated", syncSlides);
    return () => window.removeEventListener("sasra-hero-slides-updated", syncSlides);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => go(1), 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative min-h-[76vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div key={slide.image} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute inset-0">
          <Image src={slide.image} alt="" fill priority className="object-cover" sizes="100vw" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-temple/35 to-transparent" />
      <div className="container-x relative flex min-h-[76vh] items-center py-16">
        <motion.div initial={{ y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="max-w-3xl text-white">
          <div className="float-soft mb-6 inline-flex rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">Om Namo Narayanaya</div>
          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">{slide.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-amber-50 md:text-2xl">{slide.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#donations" className="rounded-full bg-gold px-7 py-3 font-bold text-white shadow-glow transition hover:-translate-y-1">Donate Now</a>
            <a href="#about" className="rounded-full border border-white/40 bg-white/15 px-7 py-3 font-bold text-white backdrop-blur transition hover:-translate-y-1">Explore Ashramam</a>
          </div>
        </motion.div>
      </div>
      <button onClick={() => go(-1)} className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white backdrop-blur" aria-label="Previous slide"><ChevronLeft /></button>
      <button onClick={() => go(1)} className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white backdrop-blur" aria-label="Next slide"><ChevronRight /></button>
      <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((item, i) => (
          <button key={item.image} onClick={() => setIndex(i)} aria-label={`Go to slide ${i + 1}`} className={cn("h-2.5 rounded-full bg-white/60 transition-all", i === index ? "w-8 bg-gold" : "w-2.5")} />
        ))}
      </div>
    </section>
  );
}
