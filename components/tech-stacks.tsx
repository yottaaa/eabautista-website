import React from "react";

interface TechStacksProps {
  data: {
    techStacks: string[];
  };
}

const TechStacks: React.FC<TechStacksProps> = (props) => {
  return (
    <div data-section id="tech-stacks" className="mb-16">
      <h2 className="mb-8 visible lg:invisible font-medium tracking-widest">
        Tech Stacks
      </h2>
      <div className="flex flex-wrap gap-2">
        {props.data.techStacks.map((item, index) => (
          <span
            key={index}
            className="bg-surface-300 text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded-full"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechStacks;
