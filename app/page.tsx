import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SectionDivider from "@/components/SectionDivider";
import ProjectsSection from "@/components/ProjectsSection";
import MusicSection from "@/components/MusicSection";
import TravelMapLoader from "@/components/TravelMapLoader";
import ResumeSection from "@/components/ResumeSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SectionDivider />
        <ProjectsSection />
        <SectionDivider />
        <ResumeSection />
        <SectionDivider />
        <MusicSection />
        <SectionDivider />
        <TravelMapLoader />
        <SectionDivider />
        <ContactSection />
      </main>
    </>
  );
}
