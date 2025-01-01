import Link from "next/link";

interface ProjectItemProps {
  href: string;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  framework: string;
  img: string;
}

const ProjectItem: React.FC<ProjectItemProps> = (props) => {
  return (
      <Link href={`/projects/${props.slug}`} className="group flex flex-col p-5 transition-all bg-surface-200 hover:scale-110 brightness-75 hover:brightness-100 hover:z-10">
          <span className="text-surface-600 text-xs">{props.framework}</span>
          <h1 className="mb-4 text-xl subpixel-antialiased">{props.name}</h1>
          <div className="text-surface-600 text-xs">{props.subtitle}</div> 
      </Link>
  )
}

export default ProjectItem