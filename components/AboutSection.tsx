export default function AboutSection() {
  return (
    <section id="about" className="section bg-white/60 dark:bg-stone-950">
      <div className="container-x grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="glass rounded-2xl p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">About Ashramam</p>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">A sanctuary for devotion, service and inner growth.</h2>
        </div>
        <div className="space-y-5 text-stone-700 dark:text-stone-200">
          <p>
            Sri Adhinarayana Swamy Rajayogashramam brings devotees together through daily worship, spiritual programs,
            temple festivals, annadanam, goshala care, and compassionate community service.
          </p>
          <p>
            The website is designed as a trusted digital gateway for pooja bookings, secure donations, spiritual
            learning, festival registrations, media galleries and administrative management.
          </p>
        </div>
      </div>
    </section>
  );
}
