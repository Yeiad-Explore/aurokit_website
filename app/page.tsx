import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Capabilities from "@/components/Capabilities";
import Process from "@/components/Process";
import Showcase from "@/components/Showcase";
import Metrics from "@/components/Metrics";
import Manifesto from "@/components/Manifesto";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import PipelineSandbox from "@/components/PipelineSandbox";
import ROICalculator from "@/components/ROICalculator";
import SmoothScroll from "@/components/SmoothScroll";
import Reveals from "@/components/Reveals";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-ink-base text-text-primary">
      <SmoothScroll />
      <Reveals />

      <Navbar />

      <Hero />
      <TrustStrip />
      <Capabilities />
      <PipelineSandbox />
      <Process />
      <Showcase />
      <Metrics />
      <ROICalculator />
      <Manifesto />
      <CTA />
      <Footer />
    </main>
  );
}
