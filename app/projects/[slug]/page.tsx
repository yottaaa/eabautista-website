import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { IoMdLink } from "react-icons/io";
import { content } from "@/app/data/content";

interface IProject {
  href: string;
  name: string;
  slug: string;
  description: string;
  img: string;
  subtitle: string;
  framework: string;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const data = content;
  const { slug } = await params;
  const project = data.projects.find(
    (project: IProject) => project.slug === slug
  );

  if (!project) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-6 lg:px-24">
      <div className="z-2 w-full max-w-5xl font-mono text-sm justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold text-balance">{project.name}</h1>
          {project.href && (
            <Link
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-all"
            >
              <IoMdLink size={25} />
            </Link>
          )}
        </div>
        <br />
        <p className="text-surface-600 text-xs">{project.framework}</p>
        <br />
        {project.img && (
          <div>
            <Image
              src={project.img}
              alt={project.name}
              width={1000}
              height={400}
            />
            <br />
          </div>
        )}
        <p>{project.description}</p>
        <br />
        <Link href="/">
          &larr;{" "}
          <span className="transition-all hover:pl-4">Return to Home</span>
        </Link>
      </div>
    </main>
  );
}
