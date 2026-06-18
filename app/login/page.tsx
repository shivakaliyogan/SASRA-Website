import SitePageShell from "@/components/SitePageShell";
import VisitorAuth from "@/components/VisitorAuth";

export const metadata = {
  title: "Login | Sri Adhinarayana Swamy Rajayogashramam"
};

export default function LoginPage() {
  return (
    <SitePageShell>
      <VisitorAuth defaultMode="login" />
    </SitePageShell>
  );
}
