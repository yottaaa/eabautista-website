'use client';

import React, { useState, useEffect, useRef } from "react";
import NavItem from "./nav-item";

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting)?.target;
        if (visibleSection instanceof HTMLElement) {
          setActiveSection(visibleSection.id);
        }
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('[data-section]');

    sections.forEach((section) => {
      if (observer.current) {
        observer.current.observe(section);
      }
    });

    return () => {
      sections.forEach((section) => {
        if (observer.current) {
          observer.current.unobserve(section);
        }
      });
    };
  }, []);

  return (
    <div id="navigation" className="flex flex-col py-10 font-medium tracking-widest">
      <NavItem active={activeSection === 'tech-stacks'} href="#tech-stacks" num="01" name="TECH STACKS" />
      <NavItem active={activeSection === 'experiences'} href="#experiences" num="02" name="EXPERIENCES" />
      <NavItem
        active={activeSection === 'projects' || activeSection === 'footer'}
        href="#projects"
        num="03"
        name="PROJECTS"
      />
    </div>
  );
};

export default Navigation;