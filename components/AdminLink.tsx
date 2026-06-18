import { Settings } from "lucide-react";

export default function AdminLink() {
  return (
    <a href="/admin" className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-temple text-white shadow-2xl" aria-label="Open admin dashboard">
      <Settings />
    </a>
  );
}
