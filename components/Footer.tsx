"use client";

import Logo from "@/components/Logo";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-950 py-12 text-amber-50">
      <div className="container-x grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-5 max-w-lg text-sm text-amber-100/75">
            Official devotional portal for darshan, sevas, donations, festivals, spiritual content and community updates.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-gold">Quick Links</h3>
          <div className="mt-4 grid gap-2 text-sm">
            <Link href="/">Home</Link>
            <Link href="/#about">About</Link>
            <Link href="/#donations">Donations</Link>
            <Link href="/#contact">Contact Us</Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-gold">Legal</h3>
          <div className="mt-4 grid gap-2 text-sm">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
          <p className="mt-5 text-sm">Sri Adhinarayana Swamy Rajayogashramam, Andhra Pradesh, India</p>
        </div>
      </div>
      <div className="container-x mt-10 border-t border-white/10 pt-6 text-sm text-amber-100/70">
        © Sri Adhinarayana Swamy Rajayogashramam
      </div>
    </footer>
  );
}
