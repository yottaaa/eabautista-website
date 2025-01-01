import React from "react";

interface FooterProps {
  data: {
    name: string;
  }
}

const Footer: React.FC<FooterProps> = (props) => {

  const date = new Date();

  return (
    <div data-section id="footer" className="group mt-32">
      <div className="text-surface-600">
        <div className="flex flex-row justify-between">
          <span>{props.data.name} | {date.getFullYear()}</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
