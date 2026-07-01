"use client";

import { useState } from "react";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
  CheckCircle,
} from "lucide-react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) return;

    const newMessage = {
      id: `MSG-${Date.now().toString().slice(-6)}`,
      name,
      email,
      phone: phone || "Not provided",
      message,
      date: new Date().toLocaleDateString("en-IN", {
        dateStyle: "medium",
      }),
      status: "Pending",
      replyText: "",
    };

    try {
      const stored = localStorage.getItem("sasra-contact-messages");
      const list = stored ? JSON.parse(stored) : [];
      list.unshift(newMessage);
      localStorage.setItem(
        "sasra-contact-messages",
        JSON.stringify(list)
      );
      window.dispatchEvent(new Event("sasra-messages-updated"));
    } catch {}

    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      id="contact"
      className="section bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100"
    >
      <div className="container-x grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="font-semibold uppercase tracking-[0.28em] text-gold">
            Contact Us
          </p>

          <h2 className="mt-2 text-3xl font-bold md:text-5xl">
            Reach the Ashramam office.
          </h2>

          <div className="mt-8 overflow-hidden rounded-2xl border border-gold/20">
            <iframe
              title="Ashramam location map"
              src="https://www.google.com/maps?q=Andhra%20Pradesh%20temple&output=embed"
              className="h-80 w-full"
              loading="lazy"
            />
          </div>

          <div className="mt-6 grid gap-3 text-sm text-stone-700 dark:text-stone-300">
            <p className="flex gap-3">
              <MapPin className="h-5 w-5 text-gold flex-shrink-0" />
              Sri Adhinarayana Swamy Rajayogashramam, Andhra Pradesh, India
            </p>

            <p className="flex gap-3">
              <Mail className="h-5 w-5 text-gold flex-shrink-0" />
              contact@sasra.org
            </p>

            <p className="flex gap-3">
              <Phone className="h-5 w-5 text-gold flex-shrink-0" />
              +91 90000 00000
            </p>
          </div>

          <div className="mt-5 flex gap-3">
            {[Youtube, Facebook, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social media"
                className="grid h-11 w-11 place-items-center rounded-full bg-gold text-white transition hover:opacity-90"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass rounded-3xl border border-amber-100 p-6 dark:border-white/5 space-y-4"
        >
          <div className="grid gap-4">
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name *"
              className="rounded-xl border border-gold/30 bg-white/80 px-4 py-3 outline-none focus:ring-2 focus:ring-gold dark:border-white/10 dark:bg-stone-900"
            />

            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email Address *"
              className="rounded-xl border border-gold/30 bg-white/80 px-4 py-3 outline-none focus:ring-2 focus:ring-gold dark:border-white/10 dark:bg-stone-900"
            />

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number (Optional)"
              className="rounded-xl border border-gold/30 bg-white/80 px-4 py-3 outline-none focus:ring-2 focus:ring-gold dark:border-white/10 dark:bg-stone-900"
            />

            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message *"
              rows={6}
              className="rounded-xl border border-gold/30 bg-white/80 px-4 py-3 outline-none focus:ring-2 focus:ring-gold dark:border-white/10 dark:bg-stone-900"
            />
          </div>

          <button
            type="submit"
            disabled={!message.trim()}
            className={`w-full rounded-full bg-temple px-7 py-3 font-bold text-white shadow-lg transition duration-200 hover:opacity-95 ${
              !message.trim()
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
          >
            Send Message
          </button>

          {submitted && (
            <div className="flex items-center gap-2 rounded-xl border border-green-200/50 bg-green-50 p-3 text-sm font-semibold text-green-700 dark:bg-green-950/20 dark:text-green-400">
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              Message sent successfully! Our office will get back to you
              shortly.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}