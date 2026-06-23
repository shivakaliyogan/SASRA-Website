import { CalendarDays, Sparkles } from "lucide-react";
import { poojas } from "@/lib/data";

export default function PoojaBooking() {
  const schedules = poojas.map((pooja, index) => ({
    name: pooja,
    date: new Date(Date.now() + (index + 1) * 86400000).toLocaleDateString("en-IN", { dateStyle: "full" })
  }));

  return (
    <section id="programs" className="section bg-white dark:bg-stone-950">
      <div className="container-x grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="font-semibold uppercase tracking-[0.28em] text-gold">Pooja Schedule</p>
          <h2 className="mt-2 text-3xl font-bold md:text-5xl">Upcoming pooja names and dates.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {["No booking form", "Admin managed", "Date based"].map((item) => (
              <div key={item} className="glass rounded-2xl p-5"><Sparkles className="mb-3 h-6 w-6 text-gold" /><p className="text-sm font-bold">{item}</p></div>
            ))}
          </div>
        </div>
        <div className="glass rounded-2xl p-6">
          <div className="grid gap-4">
            {schedules.map((schedule) => (
              <div key={schedule.name} className="flex items-center justify-between gap-4 rounded-xl bg-white/80 px-4 py-3 dark:bg-white/10">
                <div>
                  <p className="font-bold">{schedule.name}</p>
                  <p className="text-sm text-stone-600 dark:text-stone-300">{schedule.date}</p>
                </div>
                <CalendarDays className="h-5 w-5 text-gold" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
