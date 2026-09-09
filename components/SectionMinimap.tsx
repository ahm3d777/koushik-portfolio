
import React, { useEffect, useState } from 'react';

export interface Section {
  id: string;
  label: string;
}

const SectionMinimap: React.FC<{ sections: Section[] }> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        threshold: 0.2, // Trigger when 20% visible
        rootMargin: "-20% 0px -20% 0px" // Focus on center of screen
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
          className="group relative flex items-center justify-end py-2 pl-8"
          aria-label={`Scroll to ${section.label}`}
        >
          <span className={`absolute right-6 px-2 py-1 bg-neutral-900/90 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider rounded border border-neutral-800 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 pointer-events-none whitespace-nowrap`}>
            {section.label}
          </span>
          <div
            className={`w-2 h-2 rounded-full border transition-all duration-500 ease-out ${
              activeSection === section.id
                ? 'bg-rose-500 border-rose-500 scale-150 ring-4 ring-rose-500/20'
                : 'bg-neutral-800 border-neutral-600 group-hover:border-white group-hover:bg-neutral-500'
            }`}
          />
        </button>
      ))}
      
      {/* Connection Line */}
      <div className="absolute top-4 bottom-4 right-[3px] w-px bg-neutral-800 -z-10" />
    </div>
  );
};

export default SectionMinimap;
