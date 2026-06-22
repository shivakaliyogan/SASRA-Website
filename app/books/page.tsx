import AdminLink from "@/components/AdminLink";
import BooksSection from "@/components/BooksSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = {
  title: "Books | Sri Adhinarayana Swamy Rajayogashramam"
};

export default function BooksPage() {
  return (
    <main>
      <Header />
      <BooksSection />
      <AdminLink />
      <Footer />
    </main>
  );
}
