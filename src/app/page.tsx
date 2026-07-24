import Education from "@/components/Education";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import WhoAmI from "@/components/WhoAmI";

export default function Home() {
  return (
   <div>
    <Hero/>
    <WhoAmI/>
    <TechStack/>
    <Education/>
    <Projects/>
   </div>
  );
}
