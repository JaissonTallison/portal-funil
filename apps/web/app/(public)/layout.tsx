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
      {/* pt compensa navbar fixo: mobile ~140px, desktop topbar(140) + catNav(52) = 192px */}
      <div className="pt-[140px] lg:pt-[192px]">
        <BreakingNews />
        {children}
      </div>
      <Footer />
    </>
  );
}
