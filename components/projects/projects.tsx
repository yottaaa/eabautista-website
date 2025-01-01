import React from "react";
import ProjectItem from "./project-item";

interface Project {
    href: string;
    name: string;
    slug: string;
    description: string;
    subtitle: string;
    framework: string;
    img: string;
}

interface ProjectsProps {
  data: {
    href: string;
    name: string;
    slug: string;
    description: string;
    subtitle: string;
    framework: string;
    img: string;
  }[];
}

const Projects: React.FC<ProjectsProps> = (props) => {
    return (
        <div data-section id='projects' className='mb-16'>
            <h2 className='mb-8 visible lg:invisible font-medium tracking-widest'>Projects</h2>
            <div className='grid grid-cols-2 gap-2'>
                {props.data.map(function(item: Project, index: number){
                    return <ProjectItem
                        key={index}
                        name={item.name}
                        slug={item.slug}
                        description={item.description}
                        href={item.href}
                        subtitle={item.subtitle}
                        framework={item.framework}
                        img={item.img}
                    />
                })}
            </div>
        </div>
    )
}

export default Projects