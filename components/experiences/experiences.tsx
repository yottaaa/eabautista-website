import React from "react";
import ExperienceItem from "./experience-item";

interface Experience {
    id: number;
    title: string;
    company: string;
    href: string;
    startDate: string;
    endDate: string;
    description: string;
    logo: string;
    skills: string[];
  }

interface ExperienceProps {
  data: {
    id: number;
    title: string;
    company: string;
    href: string;
    startDate: string;
    endDate: string;
    description: string;
    logo: string;
    skills: string[];
  }[];
}

const Experiences: React.FC<ExperienceProps> = (props) => {
    return (
        <div data-section id='experiences' className='mb-16'>
            <h2 className='mb-8 visible lg:invisible font-medium tracking-widest'>Experiences</h2>
            {props.data.map(function(item: Experience, index: number){
                return <ExperienceItem  
                    key={index}
                    title={item.title}
                    company={item.company}
                    href={item.href}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    description={item.description}
                    logo={item.logo}
                    skills={item.skills}
                />
            })}
        </div>
    )
}

export default Experiences