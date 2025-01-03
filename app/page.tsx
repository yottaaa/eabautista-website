import Header from "@/components/header";
import TechStacks from "@/components/tech-stacks";
import Experiences from "@/components/experiences/experiences";
import Projects from "@/components/projects/projects";
import Footer from "@/components/footer";
import { content } from "./data/content";

export default function Home() {

  const data = content;
  const experiences = data.experiences;
  experiences.reverse()
  const projects = data.projects;
  projects.reverse()

  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-6 lg:px-24">
      <div className="z-2 w-full max-w-5xl font-mono text-sm flex flex-col lg:flex-row justify-between">
        <Header data={data.general}></Header>
        <div className="lg:pl-[50%]">
          <TechStacks data={data.general}></TechStacks>
          <Experiences data={experiences}></Experiences>
          <Projects data={projects}></Projects>
          <Footer data={data.general} />
        </div>
      </div>
    </main>
  );
}
