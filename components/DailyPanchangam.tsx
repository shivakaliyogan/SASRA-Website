import { CalendarDays } from "lucide-react";
import { panchangam } from "@/lib/data";

export default function DailyPanchangam() {
  return (
    <section
      className="section bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-stone-900 dark:via-stone-950 dark:to-black">      <div className="container-x glass rounded-3xl p-8">
        <div className="mb-7 flex items-center gap-3">
          <CalendarDays className="h-8 w-8 text-gold" />
          <div>
            <p className="font-semibold uppercase tracking-[0.28em] text-gold">Daily Panchangam</p>
            <h2 className="text-3xl font-bold">Today&apos;s spiritual calendar</h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {Object.entries(panchangam).map(([key, value]) => (
            <div key={key} className="rounded-2xl bg-white/80 p-5 text-center shadow-sm dark:bg-white/10">
              <p className="text-xs font-bold uppercase tracking-widest text-stone-500">{key}</p>
              <p className="mt-2 font-bold text-temple dark:text-gold">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
