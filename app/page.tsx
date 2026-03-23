import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import TravelMapLoader from "@/components/TravelMapLoader";
import ResumeSection from "@/components/ResumeSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProjectsSection />
        <TravelMapLoader />
        <ResumeSection />
        <ContactSection />
      </main>
    </>
  );
}
