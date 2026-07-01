"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  return (
    <main className="min-h-screen bg-lotus py-12 dark:bg-stone-950">
      <div className="container-x max-w-lg">
        <div className="rounded-3xl bg-white p-8 shadow-xl dark:bg-stone-900">

          <h1 className="text-center text-4xl font-bold">
            Forgot Password
          </h1>

          <p className="mt-3 text-center text-stone-600 dark:text-stone-300">
            Enter your registered email address to receive an OTP.
          </p>

          {step === 1 && (
            <div className="mt-8 space-y-5">

              <div>
                <label className="mb-2 block font-semibold">
                  Email Address <span className="text-red-500">*</span>
                </label>

                <input
                  required
                  type="email"
                  placeholder="Enter Email Address"
                  className="w-full rounded-xl border border-gold/30 px-4 py-3 dark:bg-stone-800"
                />
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full rounded-xl bg-gold px-6 py-3 font-bold text-white"
              >
                Send OTP
              </button>

            </div>
          )}

          {step === 2 && (
            <div className="mt-8 space-y-5">

              <div>
                <label className="mb-2 block font-semibold">
                  Enter OTP <span className="text-red-500">*</span>
                </label>

                <input
                  required
                  placeholder="Enter OTP code"
                  className="w-full rounded-xl border border-gold/30 px-4 py-3 dark:bg-stone-800"
                />
              </div>

              <button
                onClick={() => setStep(3)}
                className="w-full rounded-xl bg-gold px-6 py-3 font-bold text-white"
              >
                Verify OTP
              </button>

            </div>
          )}

          {step === 3 && (
            <div className="mt-8 space-y-5">

              <div>
                <label className="mb-2 block font-semibold">
                  New Password <span className="text-red-500">*</span>
                </label>

                <input
                  required
                  type="password"
                  placeholder="Enter New Password"
                  className="w-full rounded-xl border border-gold/30 px-4 py-3 dark:bg-stone-800"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  Confirm Password <span className="text-red-500">*</span>
                </label>

                <input
                  required
                  type="password"
                  placeholder="Confirm New Password"
                  className="w-full rounded-xl border border-gold/30 px-4 py-3 dark:bg-stone-800"
                />
              </div>

              <button className="w-full rounded-xl bg-gold px-6 py-3 font-bold text-white">
                Reset Password
              </button>

            </div>
          )}

          <div className="mt-8 text-center">
            <button
            onClick={() => router.replace("/login")}
            className="font-bold text-gold hover:underline">← Back to Login</button>
          </div>

        </div>
      </div>
    </main>
  );
}