"use client";

import { useState } from "react";
import Preloader from "@/components/layout/Preloader";
import AmbientBackground from "@/components/layout/AmbientBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [animReady, setAnimReady] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setAnimReady(true)} />
      <AmbientBackground />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero animReady={animReady} />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
