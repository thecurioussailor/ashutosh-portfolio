import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import About from "@/components/About";
import Experience from "@/components/Experience";
import HowIWork from "@/components/HowIWork";
// Build Log is hidden until there are real posts — re-add <BuildLog /> below Experience
// import BuildLog from "@/components/BuildLog";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <HowIWork />
      <About />
      <Experience />
    </>
  );
}
