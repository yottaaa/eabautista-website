import React from "react";
import ProjectItem from "./project-item";
import { IProject } from "@/types/Project";

interface ProjectsProps {
  data: IProject[];
}

const Projects: React.FC<ProjectsProps> = (props) => {
    return (
        <div data-section id='projects' className='mb-16'>
            <h2 className='mb-8 visible lg:invisible font-medium tracking-widest'>Projects</h2>
            <div className='grid grid-cols-2 gap-2'>
                {props.data.map(function(item: IProject, index: number){
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