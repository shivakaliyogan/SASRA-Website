import AdminLink from "@/components/AdminLink";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function SitePageShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <Header />
      {children}
      <AdminLink />
      <Footer />
    </main>
  );
}
