import React, { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { X, Github, ExternalLink, Code2, Cpu, BarChart3, ChevronRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

const CountUp: React.FC<{ value: string; delay?: number }> = ({ value, delay = 0 }) => {
  // Extract number from string (e.g. "50K+" -> 50)
  const numValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
  // Extract suffix (e.g. "K+")
  const suffix = value.replace(/[0-9.]/g, '');
  
  // `delay` isn't a valid useSpring option in this framer-motion version —
  // stagger the count-up by delaying when we set the target value instead.
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 20 });
  const display = useTransform(spring, (current) =>
    `${Math.floor(current).toLocaleString()}${suffix}`
  );

  useEffect(() => {
    const timeout = setTimeout(() => spring.set(numValue), delay * 1000);
    return () => clearTimeout(timeout);
  }, [spring, numValue, delay]);

  return <motion.span>{display}</motion.span>;
};

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        layoutId={`project-card-${project.id}`}
        className="w-full h-full md:h-auto md:max-h-[90vh] md:max-w-6xl bg-neutral-900 md:rounded-2xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row border border-neutral-800"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-rose-500 rounded-full text-white transition-colors backdrop-blur-md"
        >
          <X size={24} />
        </button>

        {/* Hero Section (Left/Top) */}
        <div className="w-full md:w-7/12 h-48 md:h-auto relative bg-black shrink-0">
           <motion.img
             layoutId={`project-image-${project.id}`}
             src={project.image}
             alt={project.title}
             className="w-full h-full object-cover opacity-60"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent md:bg-gradient-to-r" />
           
           <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
              <motion.div 
                 layoutId={`project-category-${project.id}`}
                 className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-500 text-xs font-bold uppercase tracking-widest mb-4"
              >
                <Code2 size={12} /> {project.category}
              </motion.div>
              <motion.h2 
                 layoutId={`project-title-${project.id}`}
                 className="text-3xl md:text-5xl font-black text-white mb-4 leading-none"
              >
                {project.title}
              </motion.h2>

              <div className="hidden md:flex gap-4">
                 {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-neutral-200 transition-colors">
                       <ExternalLink size={18} /> Live Demo
                    </a>
                 )}
                 {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-neutral-800 text-white font-bold rounded-lg border border-neutral-700 hover:bg-neutral-700 transition-colors">
                       <Github size={18} /> Source Code
                    </a>
                 )}
              </div>
           </div>
        </div>

        {/* Details Section (Right/Bottom) */}
        <div className="w-full md:w-5/12 flex-1 overflow-y-auto bg-neutral-900 custom-scrollbar p-6 md:p-10">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="space-y-8 pb-20 md:pb-0"
           >
              {/* Mobile Only Buttons */}
              <div className="flex md:hidden gap-3 mb-6">
                 {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center gap-2 px-4 py-3 bg-white text-black font-bold rounded-lg text-sm">
                       <ExternalLink size={16} /> Live Demo
                    </a>
                 )}
                 {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center gap-2 px-4 py-3 bg-neutral-800 text-white font-bold rounded-lg border border-neutral-700 text-sm">
                       <Github size={16} /> Code
                    </a>
                 )}
              </div>

              <div>
                 <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <Cpu size={20} className="text-rose-500" /> 
                    Tech Stack
                 </h3>
                 <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                       <span key={tech} className="px-3 py-1.5 bg-neutral-800 text-neutral-300 text-xs font-medium rounded border border-neutral-700">
                          {tech}
                       </span>
                    ))}
                 </div>
              </div>

              <div>
                 <h3 className="text-lg font-bold text-white mb-3">About the Project</h3>
                 <p className="text-neutral-400 leading-relaxed text-sm md:text-base">
                    {project.description}
                 </p>
                 <p className="text-neutral-400 leading-relaxed mt-4 text-sm md:text-base">
                    This project was built to address specific scalability challenges. By implementing a microservices architecture, we were able to isolate failure domains and scale individual components independently.
                 </p>
              </div>

              <div>
                 <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <BarChart3 size={20} className="text-rose-500" />
                    Key Metrics
                 </h3>
                 <div className="grid grid-cols-2 gap-4">
                    {project.stats.map((stat, i) => (
                       <div key={i} className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-800">
                          <div className="text-2xl md:text-3xl font-black text-white mb-1">
                             <CountUp value={stat.value} delay={0.4 + (i * 0.1)} />
                          </div>
                          <div className="text-xs text-neutral-400 uppercase font-bold tracking-wider">
                             {stat.label}
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="pt-8 border-t border-neutral-800">
                 <button className="text-rose-500 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                    Read Full Case Study <ChevronRight size={16} />
                 </button>
              </div>
           </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetailModal;