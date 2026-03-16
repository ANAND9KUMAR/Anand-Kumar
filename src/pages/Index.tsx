import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// Lazy load heavy components like the 3D canvas and dynamic cursor
const PremiumBackground = React.lazy(() => import("@/components/PremiumBackground"));
const MagicalCursor = React.lazy(() => import("@/components/MagicalCursor"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Fallback for background is an empty div to prevent visual artifacts */}
      <Suspense fallback={<div className="fixed inset-0 bg-background -z-10" />}>
        <PremiumBackground />
        <MagicalCursor />
      </Suspense>
      <ScrollProgress />
      <Navbar />
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
