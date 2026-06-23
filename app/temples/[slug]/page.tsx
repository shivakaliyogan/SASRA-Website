import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { temples } from "@/lib/data";

export default async function TempleDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const temple = temples.find(
    (item) => item.slug === slug
  );

  if (!temple) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-lotus dark:bg-stone-950">
      <section className="container-x py-12">

        <Link
            href="/#temples"
            className="mb-6 inline-flex items-center rounded-full bg-temple px-5 py-2.5 text-sm font-bold text-white hover:opacity-90">
             ← BACK
        </Link>

        <div className="overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-stone-900">
          <div className="relative h-[400px] w-full">
            <Image
              src={temple.image}
              alt={temple.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-8">
            <h1 className="text-4xl font-bold">
              {temple.name}
            </h1>

            <p className="mt-3 text-gold font-semibold">
              {temple.location}
            </p>

            <p className="mt-6 text-lg leading-8 text-stone-700 dark:text-stone-300">
              {temple.description}
            </p>

            <div className="mt-8 rounded-2xl bg-amber-50 p-6 dark:bg-white/10">
              <h2 className="text-2xl font-bold">
                Temple Information
              </h2>

              <p className="mt-4">
                Detailed information about this temple,
                seva timings, festivals, history and
                spiritual significance can be displayed
                here.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}