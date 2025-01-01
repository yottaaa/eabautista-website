import React from "react";
import Navigation from "./navigation";
import Socials from "./socials";
import Image from "next/image";

interface HeaderProps {
  data: {
    name: string;
    role: string;
    photo: string;
    headline: string;
    socials: {
      email: string;
      github: string;
      linkedin: string;
    };
  };
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div className="lg:fixed h-screen flex flex-col justify-between pb-48 self-center lg:self-auto">
      <div className="lg:w-1/2 lg:max-w-5xl flex flex-col gap-4">
        <div className="group flex flex-col lg:flex-row items-center gap-4">
          <Image
            src={props.data.photo}
            alt="Profile Picture"
            width={150}
            height={100}
            className="object-contain object-top w-auto h-auto"
          />
          <div className="flex flex-col gap-2 items-center lg:items-start">
          <h1 className="text-4xl lg:pr-10 subpixel-antialiased tracking-wide">
              {props.data.name}
            </h1>
            <span className="text-surface-400 lg:pr-10 subpixel-antialiased tracking-wide">
              {props.data.role}
            </span>
          </div>
        </div>
        <h2 className="text-surface-600 pt-2 lg:pr-10 text-base text-justify font-normal tracking-wider">
          {props.data.headline}
        </h2>
      </div>
      <Navigation></Navigation>
      <Socials data={props.data.socials}></Socials>
    </div>
  );
};

export default Header;
