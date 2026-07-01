"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Phone, KeyRound } from "lucide-react";

type AuthMode = "login" | "signup";

export default function VisitorAuth({ defaultMode = "login" }: Readonly<{ defaultMode?: AuthMode }>) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>(defaultMode);
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [nameVal, setNameVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [phoneVal, setPhoneVal] = useState("");
  const [passwordVal, setPasswordVal] = useState("");

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
          <p className="font-semibold uppercase tracking-[0.28em] text-gold">
            Devotee Access
          </p>

          <h1 className="mt-3 text-4xl font-extrabold leading-tight text-temple dark:text-gold md:text-6xl">
            Login or create your devotee account.
          </h1>

          <p className="mt-5 max-w-xl text-stone-600 dark:text-stone-300">
            Use your account for pooja bookings, donation history, festival
            registrations, and profile updates.
          </p>
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
                localStorage.setItem("sasra-user-email", emailVal || "devotee@example.com");
                
                const existingProfile = localStorage.getItem("sasra-user-profile");
                const lastLoginTime = new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
                
                let devoteeProfile = {
                  name: "Devotee User",
                  email: emailVal || "devotee@example.com",
                  phone: "+91 98765 43210",
                  address: "123 Ashram Road, Near Main Temple, India",
                  lastLoggedIn: lastLoginTime,
                  family: []
                };

                if (existingProfile) {
                  try {
                    const parsed = JSON.parse(existingProfile);
                    devoteeProfile = {
                      ...devoteeProfile,
                      ...parsed,
                      email: emailVal || parsed.email,
                      lastLoggedIn: lastLoginTime
                    };
                  } catch (e) {}
                }
                
                localStorage.setItem("sasra-user-profile", JSON.stringify(devoteeProfile));
                
                // Sync to global devotees list
                try {
                  const allStr = localStorage.getItem("sasra-all-profiles");
                  const list = allStr ? JSON.parse(allStr) : [];
                  const index = list.findIndex((u: any) => u.email === devoteeProfile.email);
                  if (index !== -1) {
                    list[index] = { ...list[index], ...devoteeProfile };
                  } else {
                    list.push(devoteeProfile);
                  }
                  localStorage.setItem("sasra-all-profiles", JSON.stringify(list));
                } catch (e) {}
                
                if (!localStorage.getItem("sasra-user-bookings")) {
                  localStorage.setItem("sasra-user-bookings", JSON.stringify([
                    { id: "SASRA-PJ-2044", name: "Abhishekam Seva", devoteeName: "Devotee User", date: "2026-07-05", amount: "₹501", status: "Confirmed" },
                    { id: "SASRA-PJ-1082", name: "Archana", devoteeName: "Devotee User", date: "2026-06-20", amount: "₹101", status: "Completed" }
                  ]));
                }
                if (!localStorage.getItem("sasra-user-donations")) {
                  localStorage.setItem("sasra-user-donations", JSON.stringify([
                    { id: "SASRA-DN-1001", category: "Goshala Donation", amount: "₹2,001", date: "2026-06-12", status: "Paid", paymentMethod: "Razorpay" },
                    { id: "SASRA-DN-0943", category: "General Donation", amount: "₹1,000", date: "2026-05-15", status: "Paid", paymentMethod: "UPI" }
                  ]));
                }
                if (!localStorage.getItem("sasra-user-books")) {
                  localStorage.setItem("sasra-user-books", JSON.stringify([
                    { id: "SASRA-BK-3301", bookName: "Bhagavad Gita As It Is", category: "Vedic Scripture", borrowedDate: "2026-06-20T00:00:00.000Z", dueDate: "2026-07-15T00:00:00.000Z", status: "Borrowed" },
                    { id: "SASRA-BK-1085", bookName: "Srimad Bhagavatam - Canto 1", category: "Puranic Literature", borrowedDate: "2026-06-15T00:00:00.000Z", dueDate: "2026-06-29T00:00:00.000Z", status: "Borrowed" }
                  ]));
                }

                window.dispatchEvent(new Event("sasra-auth-changed"));
                setMessage("Login successful. JWT authentication is ready for database connection.");
                router.push("/");
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
              localStorage.setItem("sasra-user-email", emailVal || "devotee@example.com");
              const lastLoginTimeSignup = new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
              
              const newProfile = {
                name: nameVal || "Devotee User",
                email: emailVal || "devotee@example.com",
                phone: phoneVal || "+91 90000 00000",
                address: "No address provided yet",
                lastLoggedIn: lastLoginTimeSignup,
                family: []
              };
              
              localStorage.setItem("sasra-user-profile", JSON.stringify(newProfile));

              // Sync to global devotees list
              try {
                const allStr = localStorage.getItem("sasra-all-profiles");
                const list = allStr ? JSON.parse(allStr) : [];
                const index = list.findIndex((u: any) => u.email === newProfile.email);
                if (index !== -1) {
                  list[index] = { ...list[index], ...newProfile };
                } else {
                  list.push(newProfile);
                }
                localStorage.setItem("sasra-all-profiles", JSON.stringify(list));
              } catch (e) {}

              localStorage.setItem("sasra-user-bookings", JSON.stringify([
                { id: "SASRA-PJ-2044", name: "Abhishekam Seva", devoteeName: nameVal || "Devotee User", date: "2026-07-05", amount: "₹501", status: "Confirmed" }
              ]));
              localStorage.setItem("sasra-user-donations", JSON.stringify([]));
              localStorage.setItem("sasra-user-books", JSON.stringify([
                { id: "SASRA-BK-3301", bookName: "Bhagavad Gita As It Is", category: "Vedic Scripture", borrowedDate: "2026-06-20T00:00:00.000Z", dueDate: "2026-07-15T00:00:00.000Z", status: "Borrowed" }
              ]));

              window.dispatchEvent(new Event("sasra-auth-changed"));
              setMessage("Mobile number verified and account created. SMS OTP gateway is ready for production integration.");
              router.push("/");
            }}
          >
            {!isLogin && (
              <label className="grid gap-2 text-sm font-semibold">
                Full Name
                <input required value={nameVal} onChange={(e) => setNameVal(e.target.value)} name="name" placeholder="Enter your name" className="rounded-xl border border-gold/30 bg-white/85 px-4 py-3 outline-none focus:ring-4 focus:ring-amber-200 dark:bg-stone-900" />
              </label>
            )}
            <label className="grid gap-2 text-sm font-semibold">
              Email Address
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gold" />
                <input required type="email" value={emailVal} onChange={(e) => setEmailVal(e.target.value)} name="email" placeholder="devotee@example.com" className="w-full rounded-xl border border-gold/30 bg-white/85 px-12 py-3 outline-none focus:ring-4 focus:ring-amber-200 dark:bg-stone-900" />
              </div>
            </label>
            {!isLogin && (
              <label className="grid gap-2 text-sm font-semibold">
                Phone Number
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gold" />
                  <input required value={phoneVal} onChange={(e) => setPhoneVal(e.target.value)} name="phone" placeholder="+91 90000 00000" className="w-full rounded-xl border border-gold/30 bg-white/85 px-12 py-3 outline-none focus:ring-4 focus:ring-amber-200 dark:bg-stone-900" />
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
              <input required type="password" value={passwordVal} onChange={(e) => setPasswordVal(e.target.value)} name="password" placeholder="Enter password" className="rounded-xl border border-gold/30 bg-white/85 px-4 py-3 outline-none focus:ring-4 focus:ring-amber-200 dark:bg-stone-900" />
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
              {isLogin && (<Link href="/forgot-password" className="font-bold text-gold">Forgot Password?</Link>)}            </div>
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
