import HeroSection from "@/components/HeroSection";
import QuestionAnswer from "@/components/questionanswer";
import ActiveTrack from "@/components/ActiveTrack";
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroSection />
      <QuestionAnswer />
      <ActiveTrack />
    </div>
  );
}
