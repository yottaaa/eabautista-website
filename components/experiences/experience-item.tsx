import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ExperienceItemProps {
  logo: string;
  href: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  skills: string[];
}

const ExperienceItem: React.FC<ExperienceItemProps> = (props) => {
    return (
        <div className="group flex flex-row mb-4 p-5 transition-all hover:bg-surface-200">
            <div className="basis-1/4 mr-2">
                <Image src={props.logo} alt="Company Logo" width={70} height={70} className='object-contain object-top pt-2' />
            </div>
            <div className='basis-3/4'>
                <Link href={props.href} target="_blank" rel="noopener noreferrer" className='font-medium transition-all'>{props.title} | {props.company} </Link>
                <div className='mb-2 text-surface-600'>{props.startDate} - {props.endDate}</div>
                <div className='text-surface-600 mb-4'>{props.description}</div>
                <div className='flex flex-wrap gap-2'>
                    {props.skills ? props.skills.map(function(item, index){
                        return <div key={index} className='bg-surface-400 py-1 px-3 rounded-full text-xs mr-2'>{item}</div>
                    }) : ""}
                </div>
            </div>
        </div>
    )
}

export default ExperienceItem