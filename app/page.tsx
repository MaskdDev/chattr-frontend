import HomePageHeader from "@/components/HomePageHeader";
import HomePageHero from "@/components/HomePageHero";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <HomePageHeader />
      <HomePageHero />
    </div>
  );
}
