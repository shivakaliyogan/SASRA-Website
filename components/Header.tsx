"use client";

import { useTheme } from "@/components/ThemeContext";
import { useEffect, useState } from "react";
import { ArrowLeft, Bell, ChevronDown, Menu, Moon, Sun, UserCircle, X } from "lucide-react";
import Logo from "@/components/Logo";
import { navItems } from "@/lib/data";
import { cn, formatDateTime } from "@/lib/utils";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(false);
const [notifications, setNotifications] = useState(false);  const [now, setNow] = useState<Date | null>(null);
  const [active, setActive] = useState("home");
  const [loggedIn, setLoggedIn] = useState(false);
  const { dark, toggleTheme } = useTheme();


  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    const syncAuth = () => setLoggedIn(localStorage.getItem("sasra-user-logged-in") === "true");
    syncAuth();
    window.addEventListener("sasra-auth-changed", syncAuth);
    window.addEventListener("storage", syncAuth);
    return () => {
      window.removeEventListener("sasra-auth-changed", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  useEffect(() => {
  const onScroll = () => {
    const sections = navItems
      .map(([, id]) => document.getElementById(id))
      .filter(Boolean);

    let currentSection = "home";

    sections.forEach((section) => {
      const rect = section!.getBoundingClientRect();

      if (rect.top <= 150 && rect.bottom >= 150) {
        currentSection = section!.id;
      }
    });

    setActive(currentSection);
  };

  window.addEventListener("scroll", onScroll);
  onScroll();

  return () => {
    window.removeEventListener("scroll", onScroll);
  };
}, []);

  const nav = (
    <nav className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-1" aria-label="Primary">
      {navItems.map(([label, id]) => (
        <a
          key={id}
          href={ id === "books"? "/books" : id === "receipts" ? "/receipts" : `/#${id}`}
          onClick={() => setOpen(false)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-gold/15 hover:text-temple dark:hover:text-gold",
            active === id && "bg-gold text-white shadow-lg shadow-amber-300/30"
          )}
        >
          {label}
        </a>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-amber-200/70 bg-lotus/90 backdrop-blur-xl dark:border-white/10 dark:bg-stone-950/90">
      <div className="container-x grid gap-3 py-3 lg:grid-cols-[1fr_0.9fr_1fr] lg:items-center">
        <Logo />
        <div className="min-w-0 overflow-hidden rounded-full border border-gold/30 bg-white/70 px-4 py-2 text-center text-sm dark:bg-white/10">
          <div className="marquee whitespace-nowrap font-semibold text-temple dark:text-gold">
            Welcome to Sri Adhinarayana Swamy Rajayogashramam
          </div>
          <time className="block text-xs text-stone-600 dark:text-stone-300">{now ? formatDateTime(now) : "Loading time..."}</time>
        </div>
        <div className="flex items-center justify-between gap-2 lg:justify-end">

                    <button
            type="button"
            onClick={() => {
              if (window.history.length > 1) window.history.back();
              else window.location.href = "/";
            }}
            className="grid h-10 w-10 place-items-center rounded-full border border-gold/30 bg-white/70 transition hover:bg-gold hover:text-white dark:bg-white/10"
            aria-label="Go back"
            title="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>


          <button
            title={dark ? "Light Mode" : "Dark Mode"}
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center rounded-full bg-gold text-white"
            aria-label="Toggle dark mode">
           {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
             title="Notifications"
              className="grid h-10 w-10 place-items-center rounded-full border border-gold/30 bg-white/70 dark:bg-white/10"
              aria-label="Temple bell sound"> 
            <Bell className="h-5 w-5" />
          </button>
          <div className="relative">
          <button
            title="Profile"
            onClick={() => setProfile((v) => !v)}
            className="flex items-center gap-1 rounded-full bg-temple px-3 py-2 text-white"
            aria-haspopup="menu">              <UserCircle className="h-5 w-5" />
              <ChevronDown className="h-4 w-4" />
            </button>
            {profile && (
              <div className="absolute right-0 mt-3 w-48 rounded-2xl bg-white p-2 shadow-2xl dark:bg-stone-900" role="menu">
                {!loggedIn ? (
                  <>
                    <a href="/login" className="block w-full rounded-xl px-4 py-2 text-left text-sm hover:bg-amber-50 dark:hover:bg-white/10">Login</a>
                    <a href="/signup" className="block w-full rounded-xl px-4 py-2 text-left text-sm hover:bg-amber-50 dark:hover:bg-white/10">Sign Up</a>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.removeItem("sasra-user-logged-in");
                      window.dispatchEvent(new Event("sasra-auth-changed"));
                      setProfile(false);
                    }}
                    className="block w-full rounded-xl px-4 py-2 text-left text-sm hover:bg-amber-50 dark:hover:bg-white/10"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
          <button
            title={open ? "Close Menu" : "Open Menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-gold/30 lg:hidden"
            aria-label="Open menu">            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <div className="container-x hidden pb-3 lg:block">{nav}</div>
      {open && <div className="container-x max-h-[calc(100vh-132px)] overflow-y-auto overscroll-contain pb-4 lg:hidden">{nav}</div>}
    </header>
  );
}
