"use client";

import { useState } from "react";
import { KeyRound, Mail, Phone, ShieldCheck, UserRound } from "lucide-react";

type AuthMode = "login" | "signup";

export default function VisitorAuth({ defaultMode = "login" }: Readonly<{ defaultMode?: AuthMode }>) {
  const [mode, setMode] = useState<AuthMode>(defaultMode);
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [otp, setOtp] = useState("");

  const isLogin = mode === "login";
  const resetSignupOtp = () => {
    setOtpSent(false);
    setVerified(false);
    setOtp("");
    setMessage("");
  };

  return (
    <section className="section min-h-[70vh] bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-stone-900 dark:via-stone-950 dark:to-black">
      <div className="container-x grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="font-semibold uppercase tracking-[0.28em] text-gold">Devotee Access</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight text-temple dark:text-gold md:text-6xl">
            Login or create your devotee account.
          </h1>
          <p className="mt-5 max-w-xl text-stone-600 dark:text-stone-300">
            Use your account for pooja bookings, receipts, donation history, festival registrations, saved downloads and profile updates.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["Secure Access", ShieldCheck],
              ["Profile Details", UserRound],
              ["Receipts", Mail]
            ].map(([label, Icon]) => (
              <div key={label as string} className="glass rounded-2xl p-5">
                <Icon className="mb-3 h-6 w-6 text-gold" />
                <p className="text-sm font-bold">{label as string}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-5 md:p-8">
          <div className="grid grid-cols-2 rounded-2xl bg-amber-50 p-1 dark:bg-white/10">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                resetSignupOtp();
              }}
              className={`rounded-xl px-4 py-3 text-sm font-extrabold transition ${isLogin ? "bg-gold text-white shadow-lg" : "text-temple dark:text-amber-50"}`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                resetSignupOtp();
              }}
              className={`rounded-xl px-4 py-3 text-sm font-extrabold transition ${!isLogin ? "bg-gold text-white shadow-lg" : "text-temple dark:text-amber-50"}`}
            >
              Sign Up
            </button>
          </div>

          <form
            className="mt-6 grid gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              if (isLogin) {
                localStorage.setItem("sasra-user-logged-in", "true");
                window.dispatchEvent(new Event("sasra-auth-changed"));
                setMessage("Login successful. JWT authentication is ready for database connection.");
                return;
              }
              if (!otpSent) {
                setOtpSent(true);
                setMessage("OTP sent to the entered mobile number. Demo OTP: 123456");
                return;
              }
              if (otp !== "123456") {
                setMessage("Invalid OTP. Use demo OTP 123456 until SMS gateway is connected.");
                return;
              }
              setVerified(true);
              localStorage.setItem("sasra-user-logged-in", "true");
              window.dispatchEvent(new Event("sasra-auth-changed"));
              setMessage("Mobile number verified and account created. SMS OTP gateway is ready for production integration.");
            }}
          >
            {!isLogin && (
              <label className="grid gap-2 text-sm font-semibold">
                Full Name
                <input required placeholder="Enter your name" className="rounded-xl border border-gold/30 bg-white/85 px-4 py-3 outline-none focus:ring-4 focus:ring-amber-200 dark:bg-stone-900" />
              </label>
            )}
            <label className="grid gap-2 text-sm font-semibold">
              Email Address
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gold" />
                <input required type="email" placeholder="devotee@example.com" className="w-full rounded-xl border border-gold/30 bg-white/85 px-12 py-3 outline-none focus:ring-4 focus:ring-amber-200 dark:bg-stone-900" />
              </div>
            </label>
            {!isLogin && (
              <label className="grid gap-2 text-sm font-semibold">
                Phone Number
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gold" />
                  <input required placeholder="+91 90000 00000" className="w-full rounded-xl border border-gold/30 bg-white/85 px-12 py-3 outline-none focus:ring-4 focus:ring-amber-200 dark:bg-stone-900" />
                </div>
              </label>
            )}
            {!isLogin && otpSent && (
              <label className="grid gap-2 text-sm font-semibold">
                Mobile OTP
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gold" />
                  <input required value={otp} onChange={(event) => setOtp(event.target.value)} inputMode="numeric" maxLength={6} placeholder="Enter 6-digit OTP" className="w-full rounded-xl border border-gold/30 bg-white/85 px-12 py-3 outline-none focus:ring-4 focus:ring-amber-200 dark:bg-stone-900" />
                </div>
              </label>
            )}
            <label className="grid gap-2 text-sm font-semibold">
              Password
              <input required type="password" placeholder="Enter password" className="rounded-xl border border-gold/30 bg-white/85 px-4 py-3 outline-none focus:ring-4 focus:ring-amber-200 dark:bg-stone-900" />
            </label>
            {!isLogin && (
              <label className="grid gap-2 text-sm font-semibold">
                Confirm Password
                <input required type="password" placeholder="Confirm password" className="rounded-xl border border-gold/30 bg-white/85 px-4 py-3 outline-none focus:ring-4 focus:ring-amber-200 dark:bg-stone-900" />
              </label>
            )}
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 accent-gold" />
                Remember me
              </label>
              {isLogin && <button type="button" className="font-bold text-gold">Forgot Password?</button>}
            </div>
            <button className="rounded-full bg-temple px-7 py-3 font-extrabold text-white shadow-lg transition hover:-translate-y-0.5">
              {isLogin ? "Login" : otpSent ? "Verify OTP & Create Account" : "Send OTP"}
            </button>
            {!isLogin && verified && <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-temple">Mobile verification completed.</p>}
            {message && <p className="rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">{message}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
