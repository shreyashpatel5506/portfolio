import HeroSection from "@/components/HeroSection";
import QuestionAnswer from "@/components/questionanswer";
import ActiveTrack from "@/components/ActiveTrack";
import FeaturedProjects from "@/components/FeaturedProjects";
import SkillsSection from "@/components/SkillsSection";
import ExperiencePreview from "@/components/ExperiencePreview";
import CertificatesPreview from "@/components/CertificatesPreview";
import GitHubStats from "@/components/GitHubStats";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-[#030712] w-full">
      <HeroSection />
      <QuestionAnswer />
      <FeaturedProjects />
      <SkillsSection />
      <ExperiencePreview />
      <CertificatesPreview />
      <GitHubStats />
      <ContactSection />
      <Footer />
    </div>
  );
}
