
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, ChevronDown, ChevronUp } from 'lucide-react';
import { Project } from '../types';
import SpotlightCard from './SpotlightCard';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <SpotlightCard className="h-full">
      <div 
        className="flex flex-col h-full cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden border-b border-neutral-800">
          <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-transparent transition-colors z-10" />
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          {project.featured && (
            <div className="absolute top-4 right-4 z-20 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              FEATURED
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow bg-neutral-900/50">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-rose-500 text-xs font-bold tracking-wider uppercase mb-2 block">
                {project.category}
              </span>
              <h3 className="text-xl font-bold text-white group-hover:text-rose-400 transition-colors">
                {project.title}
              </h3>
            </div>
            <div className="flex space-x-2">
              {project.github && (
                <a 
                  href={project.github} 
                  onClick={handleLinkClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors p-1 hover:bg-neutral-800 rounded z-20"
                >
                  <Github size={20} />
                </a>
              )}
              {project.link && (
                <a 
                  href={project.link} 
                  onClick={handleLinkClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors p-1 hover:bg-neutral-800 rounded z-20"
                >
                  <ArrowUpRight size={20} />
                </a>
              )}
            </div>
          </div>

          <p className="text-neutral-400 text-sm leading-relaxed">
            {isExpanded ? project.description : project.shortDescription}
          </p>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mt-6 py-4 border-t border-neutral-800/50">
                  {project.stats.map((stat, idx) => (
                    <div key={idx}>
                      <div className="text-white font-bold">{stat.value}</div>
                      <div className="text-xs text-neutral-400 uppercase">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-neutral-800/50 text-neutral-300 text-xs rounded-full border border-neutral-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Button */}
          <div className="mt-6 flex items-center text-rose-500 text-xs font-bold uppercase tracking-wider group-hover:text-rose-400 transition-colors">
            {isExpanded ? (
               <>Show Less <ChevronUp size={14} className="ml-1" /></>
            ) : (
               <>View Details <ChevronDown size={14} className="ml-1" /></>
            )}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
};

export default ProjectCard;
