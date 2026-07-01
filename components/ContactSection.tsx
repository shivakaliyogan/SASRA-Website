"use client";

import { useState } from "react";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="section bg-white dark:bg-stone-950">
      <div className="container-x grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="font-semibold uppercase tracking-[0.28em] text-gold">Contact Us</p>
          <h2 className="mt-2 text-3xl font-bold md:text-5xl">Reach the Ashramam office.</h2>
          <div className="mt-8 overflow-hidden rounded-2xl border border-gold/20">
            <iframe title="Ashramam location map" src="https://www.google.com/maps?q=Andhra%20Pradesh%20temple&output=embed" className="h-80 w-full" loading="lazy" />
          </div>
          <div className="mt-6 grid gap-3 text-sm text-stone-700 dark:text-stone-200">
            <p className="flex gap-3"><MapPin className="h-5 w-5 text-gold" />Sri Adhinarayana Swamy Rajayogashramam, Andhra Pradesh, India</p>
            <p className="flex gap-3"><Mail className="h-5 w-5 text-gold" />contact@sasra.org</p>
            <p className="flex gap-3"><Phone className="h-5 w-5 text-gold" />+91 90000 00000</p>
          </div>
          <div className="mt-5 flex gap-3">{[Youtube, Facebook, Instagram].map((Icon, i) => <a key={i} href="#" aria-label="Social media" className="grid h-11 w-11 place-items-center rounded-full bg-gold text-white"><Icon /></a>)}</div>
        </div>
        <form className="glass rounded-2xl p-6">
          <div className="grid gap-4">
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="rounded-xl border border-gold/30 bg-white/80 px-4 py-3 dark:bg-stone-900"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="rounded-xl border border-gold/30 bg-white/80 px-4 py-3 dark:bg-stone-900"
            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="rounded-xl border border-gold/30 bg-white/80 px-4 py-3 dark:bg-stone-900"
            />

            <textarea
              name="message"
              placeholder="Message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="rounded-xl border border-gold/30 bg-white/80 px-4 py-3 dark:bg-stone-900"
            />
          </div>

          <button
            type="submit"
            disabled={!formData.message.trim()}
            className={`mt-5 rounded-full bg-temple px-7 py-3 font-bold text-white ${!formData.message.trim()
                ? "cursor-not-allowed opacity-50"
                : ""
              }`}
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
