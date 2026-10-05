import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import About from "@/components/About";
import Experience from "@/components/Experience";
import HowIWork from "@/components/HowIWork";
import Toolkit from "@/components/Toolkit";
import BuildLog from "@/components/BuildLog";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <HowIWork />
      <About />
      <Experience />
      <Toolkit />
      <BuildLog />
      <Contact />
    </>
  );
}
