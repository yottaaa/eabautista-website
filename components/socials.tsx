import React from "react";
import Image from "next/image";

interface SocialsProps {
  data: {
    email: string;
    github: string;
    linkedin: string;
  };
}

const Socials: React.FC<SocialsProps> = (props) => {
  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-row">
        <a
          href={`mailto:${props.data.email}`}
          className="mr-10 flex flex-row content-center justify-center"
        >
          <Image
            src="/logos/email-white.png"
            alt="Email Logo"
            width={20}
            height={20}
            className="object-contain object-top mr-2"
          />
          <div className="">Email</div>
        </a>
        <a
          href={props.data.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mr-10 flex flex-row content-center justify-center"
        >
          <Image
            src="/logos/github-mark-white.png"
            alt="GitHub Logo"
            width={20}
            height={20}
            className="object-contain object-top mr-2"
          />
          <div className="">GitHub</div>
        </a>
        <a
          href={props.data.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row content-center justify-center"
        >
          <Image
            src="/logos/linkedin-mark-white.png"
            alt="LinkedIn Logo"
            width={20}
            height={20}
            className="object-contain object-top mr-2"
          />
          <div className="">LinkedIn</div>
        </a>
      </div>
    </div>
  );
};

export default Socials;
