import { ClassSection } from "@/components/ClassSection";
import { CraftSection } from "@/components/CraftSection";
import { CraftTabs } from "@/components/CraftTabs";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <CraftTabs exhibition={<CraftSection />} classes={<ClassSection />} />
    </>
  );
}
