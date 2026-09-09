import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Play } from 'lucide-react';
import { Project } from '../types';

interface CinematicProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const CinematicProjectCard: React.FC<CinematicProjectCardProps> = ({ project, onClick }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(project);
    }
  };

  return (
    <motion.div
      layoutId={`project-card-${project.id}`}
      onClick={() => onClick(project)}
      onMouseMove={handleMouseMove}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className="group relative h-[360px] md:h-[450px] w-full rounded-2xl overflow-hidden cursor-pointer bg-neutral-900 border border-neutral-800 shadow-2xl outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
      whileHover={{ y: -8, transition: { duration: 0.4, ease: "easeOut" } }}
    >
      {/* Background Image with Ken Burns Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          layoutId={`project-image-${project.id}`}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:filter group-hover:brightness-[0.4] will-change-transform"
        />
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
      </div>

      {/* Spotlight Sweep Effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(244, 63, 94, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Content Layer */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
        {/* Play Button (Centered) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 pointer-events-none">
           <motion.div
             whileHover={{ scale: 1.1 }}
             className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-rose-600/90 backdrop-blur-sm flex items-center justify-center shadow-[0_0_30px_rgba(225,29,72,0.6)] border border-white/20"
           >
              <Play fill="white" className="ml-1 text-white" size={24} />
           </motion.div>
        </div>

        {/* Text Content */}
        <div className="relative z-20 transform translate-y-2 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <motion.div layoutId={`project-category-${project.id}`} className="text-rose-500 text-xs font-bold tracking-widest uppercase mb-2">
            {project.category}
          </motion.div>
          <motion.h3 layoutId={`project-title-${project.id}`} className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight">
            {project.title}
          </motion.h3>
          <motion.p 
            className="text-neutral-300 text-sm line-clamp-2 mb-4 opacity-100 md:opacity-0 md:h-0 md:group-hover:opacity-100 md:group-hover:h-auto transition-all duration-300"
          >
            {project.shortDescription}
          </motion.p>
          
          {/* Floating Tech Stack */}
          <div className="flex flex-wrap gap-2 opacity-100 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 md:delay-100">
             {project.tech.slice(0, 3).map((t, i) => (
               <span key={i} className="text-[10px] font-bold px-2 py-1 bg-white/10 backdrop-blur-md rounded border border-white/10 text-neutral-200">
                 {t}
               </span>
             ))}
             {project.tech.length > 3 && (
               <span className="text-[10px] font-bold px-2 py-1 bg-white/10 backdrop-blur-md rounded border border-white/10 text-neutral-200">
                 +{project.tech.length - 3}
               </span>
             )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CinematicProjectCard;