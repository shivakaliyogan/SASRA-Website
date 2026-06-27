"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function FestivalRegistrationContent() {
  const searchParams = useSearchParams();

  const festivalName =
    searchParams.get("festival") || "";

  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen bg-lotus py-12 dark:bg-stone-950">
      <div className="container-x max-w-3xl">
        <div className="rounded-3xl bg-white p-8 shadow-xl dark:bg-stone-900">
          <h1 className="text-center text-4xl font-bold">
            Festival Registration
          </h1>

          <p className="mt-3 text-center text-stone-600 dark:text-stone-300">
            Register for upcoming spiritual festivals and events.
          </p>

          <p className="mt-2 text-center text-sm text-red-500">
            * Indicates required fields
          </p>

          {!submitted ? (
            <form
              className="mt-8 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div>
                <label className="mb-2 block font-semibold">
                  Festival Name <span className="text-red-500">*</span>
                </label>

                <input
                  required
                  type="text"
                  defaultValue={festivalName}
                  className="w-full rounded-xl border border-gold/30 px-4 py-3 dark:bg-stone-800"
                  placeholder="Festival Name"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  Full Name <span className="text-red-500">*</span>
                </label>

                <input
                  required
                  type="text"
                  className="w-full rounded-xl border border-gold/30 px-4 py-3 dark:bg-stone-800"
                  placeholder="Enter Full Name"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  Mobile Number <span className="text-red-500">*</span>
                </label>

                <input
                  required
                  type="tel"
                  className="w-full rounded-xl border border-gold/30 px-4 py-3 dark:bg-stone-800"
                  placeholder="Enter Mobile Number"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  Email Address <span className="text-red-500">*</span>
                </label>

                <input
                  required
                  type="email"
                  className="w-full rounded-xl border border-gold/30 px-4 py-3 dark:bg-stone-800"
                  placeholder="Enter Email Address"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  Gender <span className="text-red-500">*</span>
                </label>

                <select
                  required
                  className="w-full rounded-xl border border-gold/30 px-4 py-3 dark:bg-stone-800"
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  Address <span className="text-red-500">*</span>
                </label>

                <textarea
                  required
                  rows={4}
                  className="w-full rounded-xl border border-gold/30 px-4 py-3 dark:bg-stone-800"
                  placeholder="Enter Address"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  Number of Participants{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  required
                  type="number"
                  min="1"
                  defaultValue="1"
                  className="w-full rounded-xl border border-gold/30 px-4 py-3 dark:bg-stone-800"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  Special Requests
                </label>

                <textarea
                  rows={3}
                  className="w-full rounded-xl border border-gold/30 px-4 py-3 dark:bg-stone-800"
                  placeholder="Any special requirements (Optional)"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gold px-6 py-3 font-bold text-white transition hover:opacity-90"
              >
                Register
              </button>
            </form>
          ) : (
            <div className="mt-8 rounded-2xl bg-green-50 p-6 text-center dark:bg-green-900/20">
              <h2 className="text-2xl font-bold text-green-700 dark:text-green-400">
                Registration Submitted Successfully
              </h2>

              <p className="mt-3">
                Thank you for registering for the festival.
                Our team will contact you soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
export default function FestivalRegistrationPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-lotus py-12 dark:bg-stone-950" />}>
      <FestivalRegistrationContent />
    </Suspense>
  );
}