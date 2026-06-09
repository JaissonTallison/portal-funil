import { BreakingNews } from "@/components/layout/breaking-news";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {/* pt compensa navbar fixo: mobile ~120px, desktop topbar(120) + catNav(52) = 172px */}
      <div className="pt-[120px] lg:pt-[172px]">
        <BreakingNews />
        {children}
      </div>
      <Footer />
    </>
  );
}
