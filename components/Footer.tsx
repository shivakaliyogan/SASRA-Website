"use client";

import Logo from "@/components/Logo";
import { useLanguage } from "@/components/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-stone-950 py-12 text-amber-50">
      <div className="container-x grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2"><Logo /><p className="mt-5 max-w-lg text-sm text-amber-100/75">{t("footer.description")}</p></div>
        <div>
          <h3 className="font-bold text-gold">{t("footer.quickLinks")}</h3>
          <div className="mt-4 grid gap-2 text-sm"><a href="#home">{t("nav.home")}</a><a href="#about">{t("footer.about")}</a><a href="#donations">{t("nav.donations")}</a><a href="#contact">{t("nav.contact")}</a></div>
        </div>
        <div>
          <h3 className="font-bold text-gold">{t("footer.legal")}</h3>
          <div className="mt-4 grid gap-2 text-sm"><a href="#">{t("footer.privacy")}</a><a href="#">{t("footer.terms")}</a></div>
          <p className="mt-5 text-sm">Sri Adhinarayana Swamy Rajayogashramam, Andhra Pradesh, India</p>
        </div>
      </div>
      <div className="container-x mt-10 border-t border-white/10 pt-6 text-sm text-amber-100/70">© Sri Adhinarayana Swamy Rajayogashramam</div>
    </footer>
  );
}
