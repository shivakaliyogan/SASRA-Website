import { Music, PlayCircle, Video } from "lucide-react";

export default function LiveSpiritual() {
  return (
    <section className="section bg-white dark:bg-stone-950">
      <div className="container-x grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-2xl p-6">
          <Music className="h-8 w-8 text-gold" />
          <h2 className="mt-3 text-3xl font-bold">Bhajans</h2>
          <p className="mt-2 text-stone-600 dark:text-stone-300">Playlist support for morning chants, evening harathi and festival recordings.</p>
          <audio className="mt-6 w-full" controls preload="none" />
          <div className="mt-5 grid gap-3">
            {["Suprabhatam", "Vishnu Sahasranamam", "Evening Harathi"].map((item) => <button key={item} className="rounded-xl bg-amber-50 px-4 py-3 text-left font-semibold dark:bg-white/10">{item}</button>)}
          </div>
        </div>
        <div className="glass rounded-2xl p-6">
          <Video className="h-8 w-8 text-gold" />
          <h2 className="mt-3 text-3xl font-bold">Spiritual Discourses</h2>
          <div className="mt-6 grid aspect-video place-items-center rounded-2xl bg-stone-900 text-white">
            <PlayCircle className="h-16 w-16 text-gold" />
          </div>
          <p className="mt-4 text-stone-600 dark:text-stone-300">Embed YouTube teachings, featured videos and recent pravachanam playlists here.</p>
        </div>
      </div>
    </section>
  );
}
