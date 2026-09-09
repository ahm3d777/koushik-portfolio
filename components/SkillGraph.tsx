
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Code, Server, Cloud, Terminal, Cpu } from 'lucide-react';
import { PROJECTS } from '../constants';

// Types
interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  group: 'core' | 'frontend' | 'backend' | 'cloud' | 'tools';
  icon?: React.ReactNode;
  level?: number;
  description?: string;
}

interface GraphLink {
  source: string;
  target: string;
}

// Graph Data
const NODES: GraphNode[] = [
  // Center
  { id: 'core', label: 'Engineering', x: 400, y: 300, group: 'core', icon: <Cpu size={24} />, description: 'The intersection of creativity and logic.' },
  
  // Categories
  { id: 'frontend', label: 'Frontend', x: 200, y: 200, group: 'frontend', icon: <Code size={20} />, description: 'Building accessible and performant UIs.' },
  { id: 'backend', label: 'Backend', x: 600, y: 200, group: 'backend', icon: <Server size={20} />, description: 'Scalable server-side architectures.' },
  { id: 'cloud', label: 'Cloud & DevOps', x: 400, y: 500, group: 'cloud', icon: <Cloud size={20} />, description: 'Infrastructure as code and deployment.' },

  // Frontend Skills
  { id: 'react', label: 'React / Next.js', x: 100, y: 150, group: 'frontend', level: 98, description: 'Component-based architecture, SSR, and state management mastery.' },
  { id: 'ts', label: 'TypeScript', x: 180, y: 80, group: 'frontend', level: 95, description: 'Type-safe development for robust applications.' },
  { id: 'tailwind', label: 'Tailwind CSS', x: 280, y: 140, group: 'frontend', level: 90, description: 'Utility-first CSS for rapid UI development.' },
  { id: 'motion', label: 'Framer Motion', x: 60, y: 250, group: 'frontend', level: 85, description: 'Complex animations and gesture handling.' },

  // Backend Skills
  { id: 'node', label: 'Node.js', x: 700, y: 150, group: 'backend', level: 92, description: 'Event-driven architecture and RESTful APIs.' },
  { id: 'python', label: 'Python', x: 620, y: 80, group: 'backend', level: 75, description: 'Data processing and scripting.' },
  { id: 'postgres', label: 'PostgreSQL', x: 520, y: 140, group: 'backend', level: 85, description: 'Relational database design and optimization.' },
  { id: 'redis', label: 'Redis', x: 740, y: 250, group: 'backend', level: 80, description: 'Caching strategies and pub/sub systems.' },

  // Cloud Skills
  { id: 'aws', label: 'AWS', x: 300, y: 580, group: 'cloud', level: 88, description: 'EC2, S3, Lambda, and serverless architectures.' },
  { id: 'docker', label: 'Docker', x: 400, y: 620, group: 'cloud', level: 85, description: 'Containerization and microservices orchestration.' },
  { id: 'cicd', label: 'CI/CD', x: 500, y: 580, group: 'cloud', level: 82, description: 'Automated testing and deployment pipelines.' },
];

const LINKS: GraphLink[] = [
  { source: 'core', target: 'frontend' },
  { source: 'core', target: 'backend' },
  { source: 'core', target: 'cloud' },
  
  { source: 'frontend', target: 'react' },
  { source: 'frontend', target: 'ts' },
  { source: 'frontend', target: 'tailwind' },
  { source: 'frontend', target: 'motion' },
  
  { source: 'react', target: 'ts' }, // Inter-skill connection

  { source: 'backend', target: 'node' },
  { source: 'backend', target: 'python' },
  { source: 'backend', target: 'postgres' },
  { source: 'backend', target: 'redis' },

  { source: 'cloud', target: 'aws' },
  { source: 'cloud', target: 'docker' },
  { source: 'cloud', target: 'cicd' },
  
  { source: 'node', target: 'postgres' }, // Inter-skill
  { source: 'aws', target: 'docker' }, // Inter-skill
];

const SkillGraph: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const selectedNode = NODES.find(n => n.id === selectedNodeId);

  // Filter projects based on the selected skill label (simple matching)
  const relatedProjects = selectedNode 
    ? PROJECTS.filter(p => p.tech.some(t => selectedNode.label.includes(t) || t.includes(selectedNode.label.split('/')[0])))
    : [];
    
  // Group nodes for mobile list view
  const groups = {
      frontend: NODES.filter(n => n.group === 'frontend' && n.id !== 'frontend'),
      backend: NODES.filter(n => n.group === 'backend' && n.id !== 'backend'),
      cloud: NODES.filter(n => n.group === 'cloud' && n.id !== 'cloud')
  };

  return (
    <>
    {/* Desktop View: Interactive Graph */}
    <div className="hidden md:block relative w-full h-[600px] bg-neutral-900/50 rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          <Terminal size={18} className="text-rose-500" />
          Interactive Knowledge Map
        </h3>
        <p className="text-neutral-400 text-xs">Click on nodes to explore relationships and proficiency.</p>
      </div>

      {/* SVG Graph Layer */}
      <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 800 650">
        <defs>
          <linearGradient id="link-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#262626" />
            <stop offset="50%" stopColor="#f43f5e" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#262626" />
          </linearGradient>
        </defs>
        {LINKS.map((link, i) => {
          const source = NODES.find(n => n.id === link.source)!;
          const target = NODES.find(n => n.id === link.target)!;
          return (
            <motion.line
              key={i}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke="url(#link-gradient)"
              strokeWidth="1.5"
            />
          );
        })}
      </svg>

      {/* Interactive Nodes Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {NODES.map((node) => (
          <motion.button
            key={node.id}
            onClick={() => setSelectedNodeId(node.id)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.2, zIndex: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: Math.random() * 0.5 }}
            className={`absolute pointer-events-auto flex items-center justify-center rounded-full shadow-lg transition-colors duration-300 border-2 ${
               selectedNodeId === node.id ? 'border-white ring-4 ring-rose-500/20' : 'border-neutral-700 hover:border-rose-500'
            }`}
            style={{
              left: `${(node.x / 800) * 100}%`,
              top: `${(node.y / 650) * 100}%`,
              width: node.group === 'core' ? 60 : 40,
              height: node.group === 'core' ? 60 : 40,
              marginLeft: node.group === 'core' ? -30 : -20,
              marginTop: node.group === 'core' ? -30 : -20,
              backgroundColor: node.group === 'core' ? '#f43f5e' : '#171717',
            }}
          >
            {node.icon ? (
              <span className={node.group === 'core' ? 'text-white' : 'text-neutral-400'}>{node.icon}</span>
            ) : (
              <div className="w-2 h-2 bg-neutral-500 rounded-full" />
            )}
            
            {/* Label Tooltip */}
            <div className={`absolute top-full mt-2 whitespace-nowrap px-2 py-1 rounded bg-black/80 text-xs font-medium text-white backdrop-blur-sm pointer-events-none transition-opacity ${
                selectedNodeId === node.id || ['core', 'frontend', 'backend', 'cloud'].includes(node.group) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}>
                {node.label}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Details Side Panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-0 right-0 w-80 h-full bg-neutral-900/95 backdrop-blur-xl border-l border-neutral-800 p-6 z-20 overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <h4 className="text-xl font-bold text-white">{selectedNode.label}</h4>
              <button
                onClick={() => setSelectedNodeId(null)}
                className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white"
                aria-label="Close panel"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <p className="text-neutral-400 text-sm leading-relaxed">
                {selectedNode.description}
              </p>

              {selectedNode.level && (
                <div>
                  <div className="flex justify-between text-xs font-bold text-neutral-400 mb-2">
                    <span>PROFICIENCY</span>
                    <span>{selectedNode.level}%</span>
                  </div>
                  <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedNode.level}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-rose-500"
                    />
                  </div>
                </div>
              )}

              {relatedProjects.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-neutral-400 mb-3 uppercase">Related Projects</div>
                  <div className="space-y-3">
                    {relatedProjects.map(project => (
                      <div key={project.id} className="p-3 bg-neutral-800/50 rounded-lg border border-neutral-800 hover:border-rose-500/50 transition-colors group cursor-pointer">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors">{project.title}</span>
                          <ExternalLink size={12} className="text-neutral-400" />
                        </div>
                        <p className="text-xs text-neutral-400 line-clamp-2">{project.shortDescription}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    
    {/* Mobile View: Clean List */}
    <div className="md:hidden space-y-8">
        {Object.entries(groups).map(([groupName, groupNodes]) => (
            <div key={groupName} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white capitalize mb-4 flex items-center gap-2">
                    {groupName === 'frontend' && <Code size={20} className="text-rose-500"/>}
                    {groupName === 'backend' && <Server size={20} className="text-rose-500"/>}
                    {groupName === 'cloud' && <Cloud size={20} className="text-rose-500"/>}
                    {groupName}
                </h3>
                <div className="space-y-4">
                    {groupNodes.map(node => (
                        <div key={node.id}>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-neutral-300">{node.label}</span>
                                <span className="text-xs font-bold text-rose-500">{node.level}%</span>
                            </div>
                            <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                                <div className="h-full bg-neutral-600 rounded-full" style={{ width: `${node.level}%` }} />
                            </div>
                            <p className="text-xs text-neutral-400 mt-1">{node.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
    </>
  );
};

export default SkillGraph;
