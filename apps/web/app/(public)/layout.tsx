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
      {/* pt compensa navbar fixo: mobile (py-3 + h-148 + py-3) = 172px, desktop + menu ~62px = 234px */}
      <div className="pt-[174px] lg:pt-[236px]">
        <BreakingNews />
        {children}
      </div>
      <Footer />
    </>
  );
}
