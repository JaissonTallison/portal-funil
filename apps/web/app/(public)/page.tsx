import { HeroSlider } from "@/components/hero/hero-slider";
import { AgendaHighlight } from "@/components/home/agenda-highlight";
import { CityCameras } from "@/components/home/city-cameras";
import { ClassifiedsHighlight } from "@/components/home/classifieds-highlight";
import { ColumnistsSpotlight } from "@/components/home/columnists-spotlight";
import { DailyDigest } from "@/components/home/daily-digest";
import { DiaEspecial } from "@/components/home/dia-especial";
import { EconomicPanel } from "@/components/home/economic-panel";
import { MostRead } from "@/components/home/most-read";
import { OperationalGrid } from "@/components/home/operational-grid";
import { PoliticsHub } from "@/components/home/politics-hub";
import { ReaderHub } from "@/components/home/reader-hub";
import { SponsoredContent } from "@/components/home/sponsored-content";
import { TrendingTopics } from "@/components/home/trending-topics";
import { UrgentAlert } from "@/components/home/urgent-alert";
import { LiveExperience } from "@/components/live/live-experience";
import { OperationsMap } from "@/components/map/operations-map";
import { NewsCarousel } from "@/components/news/news-carousel";
import { NewsSection } from "@/components/news/news-section";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-surface text-navy">
      {/* WATERMARK */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage: "url('/images/logo4k-transparent.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "1200px",
          backgroundAttachment: "fixed",
        }}
      />

      <div className="relative z-10">
      <HeroSlider />
      <DailyDigest />
      <DiaEspecial />
      <UrgentAlert />
      <TrendingTopics />
      <OperationalGrid />
      <EconomicPanel />
      <NewsCarousel />
      <SponsoredContent />
      <LiveExperience />
      <MostRead />
      <ReaderHub />
      <NewsSection />
      <PoliticsHub />
      <ClassifiedsHighlight />
      <AgendaHighlight />
      <ColumnistsSpotlight />
      <OperationsMap />
      <CityCameras />
      </div>
    </main>
  );
}
