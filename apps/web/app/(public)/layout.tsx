import { BreakingNews } from "@/components/layout/breaking-news";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { getNewsArticles } from "@/services/articles.service";

const TICKER_MAX_AGE_MS = 72 * 60 * 60 * 1000;
const TICKER_MAX_ITEMS = 10;

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const articles = await getNewsArticles();
  const latest = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  const recent = latest.filter((a) => Date.now() - new Date(a.publishedAt).getTime() <= TICKER_MAX_AGE_MS);
  // Sem matérias recentes, mostra as mais novas disponíveis em vez de esconder a faixa.
  const headlines = (recent.length > 0 ? recent : latest)
    .slice(0, TICKER_MAX_ITEMS)
    .map((a) => ({ title: a.title, slug: a.slug }));

  return (
    <>
      <Navbar />
      {/* pt compensa navbar fixo: mobile 76px + borda, desktop topbar(140) + catNav(52) = 192px */}
      <div className="pt-[77px] lg:pt-[192px]">
        <div className="h-6" />
        <BreakingNews headlines={headlines} />
        <div className="h-3" />
        {children}
      </div>
      <Footer />
    </>
  );
}
