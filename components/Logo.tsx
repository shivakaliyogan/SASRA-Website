"use client";

import { useEffect, useState } from "react";
import { Flame } from "lucide-react";

export default function Logo() {
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    const loadLogo = () => setLogo(localStorage.getItem("sasra-logo"));
    loadLogo();
    window.addEventListener("sasra-logo-updated", loadLogo);
    return () => window.removeEventListener("sasra-logo-updated", loadLogo);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-gold via-saffron to-vermilion text-white shadow-glow">
        {logo ? (
          <span
            aria-label="Ashramam Logo"
            className="h-12 w-12 rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${logo})` }}
          />
        ) : (
          <Flame className="h-8 w-8" aria-hidden />
        )}
      </div>
      <div>
        <p className="max-w-[320px] text-base font-extrabold leading-tight md:text-lg">Sri Adhinarayana Swamy Rajayogashramam</p>
        <p className="text-xs font-medium text-stone-600 dark:text-stone-300">Devotion, Dharma and Divine Grace</p>
      </div>
    </div>
  );
}
