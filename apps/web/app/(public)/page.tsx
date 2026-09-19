import { HERO_SLUGS, pickDiverse, pickLiveLead, pickPowerFeatured } from "@/lib/home-highlights";
import { timeAgo } from "@/lib/utils";
import { getLiveCameras } from "@/lib/cameras";
import { getManausWeather } from "@/lib/weather";
import { getNewsArticles } from "@/services/articles.service";

export const revalidate = 60;
import { HeroSlider } from "@/components/hero/hero-slider";
import { AgendaHighlight } from "@/components/home/agenda-highlight";
import { CityCameras } from "@/components/home/city-cameras";
import { ClassifiedsHighlight } from "@/components/home/classifieds-highlight";
import { ColumnistsSpotlight } from "@/components/home/columnists-spotlight";
import { DailyDigest } from "@/components/home/daily-digest";
import { DiaEspecial } from "@/components/home/dia-especial";
import { AmazonasLocal } from "@/components/home/amazonas-local";
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

export default async function HomePage() {
  const [articles, weather, cameras] = await Promise.all([
    getNewsArticles(),
    getManausWeather(),
    getLiveCameras(),
  ]);
  const byDate = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  const liveLeadSlug = pickLiveLead(articles)?.slug;
  const powerSlug = pickPowerFeatured(articles)?.slug;
  const carouselArticles = pickDiverse(
    articles.filter((a) => !HERO_SLUGS.includes(a.slug) && a.slug !== liveLeadSlug && a.slug !== powerSlug),
    6,
  );
  const heroPanel = {
    weather,
    weekCount: byDate.filter((a) => Date.now() - new Date(a.publishedAt).getTime() <= 7 * 24 * 60 * 60 * 1000).length,
    latest: byDate
      .filter((a) => !HERO_SLUGS.includes(a.slug))
      .slice(0, 3)
      .map((a) => ({ title: a.title, slug: a.slug, time: timeAgo(a.publishedAt) })),
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-surface text-navy">
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
        <HeroSlider panel={heroPanel} />
        <DailyDigest />
        <DiaEspecial />
        <UrgentAlert />
        <TrendingTopics />
        <OperationalGrid articles={articles} cameraCount={cameras.filter((c) => !c.replay).length} />
        <EconomicPanel />
        <NewsCarousel articles={carouselArticles} />
        <SponsoredContent />
        <LiveExperience />
        <MostRead />
        <ReaderHub />
        <NewsSection />
        <AmazonasLocal />
        <PoliticsHub />
        <ClassifiedsHighlight />
        <AgendaHighlight />
        <ColumnistsSpotlight />
        <OperationsMap articles={articles} />
        <CityCameras cameras={cameras} />
      </div>
    </main>
  );
}
