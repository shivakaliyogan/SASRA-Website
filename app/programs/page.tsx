import LiveSpiritual from "@/components/LiveSpiritual";
import PoojaBooking from "@/components/PoojaBooking";
import SitePageShell from "@/components/SitePageShell";

export default function ProgramsPage() {
  return (
    <SitePageShell>
      <PoojaBooking />
      <LiveSpiritual />
    </SitePageShell>
  );
}
