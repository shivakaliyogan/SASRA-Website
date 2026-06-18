import SitePageShell from "@/components/SitePageShell";
import VisitorAuth from "@/components/VisitorAuth";

export const metadata = {
  title: "Sign Up | Sri Adhinarayana Swamy Rajayogashramam"
};

export default function SignUpPage() {
  return (
    <SitePageShell>
      <VisitorAuth defaultMode="signup" />
    </SitePageShell>
  );
}
