
import React, { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Stars,
  Float,
  Html,
  Sparkles,
  CameraControls
} from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Layers } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import Breadcrumbs from './Breadcrumbs';

// The full WebGL "solar system" desktop experience for /work — pulled out
// of pages/Work.tsx into its own component so it can be lazy-loaded ONLY
// when the >=768px, motion-capable branch actually renders. Keeping the
// three.js/@react-three imports confined to this file (rather than at the
// top of Work.tsx, which is itself already route-lazy) is what actually
// keeps the ~1MB three.js chunk out of the mobile visitor's network
// waterfall — an ES module's imports execute at evaluation time, so a
// runtime `if (mobile) return <MobileWork />` above a *static* three.js
// import doesn't stop that import from being fetched.

// --- Types ---
interface PlanetProps {
  project: Project;
  index: number;
  total: number;
  onSelect: (project: Project, position: THREE.Vector3) => void;
  activeProjectId: string | null;
}

// --- 3D Components ---

const Sun = () => {
  return (
    <group>
      {/* Core Sun */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          emissive="#f43f5e"
          emissiveIntensity={2}
          color="#f43f5e"
          toneMapped={false}
        />
      </mesh>
      {/* Inner Glow */}
      <pointLight intensity={10} distance={50} color="#f43f5e" decay={2} />
      {/* Outer Halo */}
      <mesh scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#f43f5e" transparent opacity={0.1} side={THREE.BackSide} />
      </mesh>
    </group>
  );
};

const Planet: React.FC<PlanetProps> = ({ project, index, total, onSelect, activeProjectId }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Orbital parameters - Distribute planets based on index
  const radius = 5 + (index * 2.5);
  const speed = 0.2 / (index + 1); // Inner planets move faster
  const size = project.featured ? 0.6 : 0.4;
  const offset = index * (Math.PI * 2) / total; // Start at different angles

  // Planet Visuals based on category
  const getPlanetColor = (category: string) => {
    switch(category) {
      case 'Enterprise': return ['#3b82f6', '#1e40af']; // Blue Gas Giant
      case 'Web': return ['#f43f5e', '#9f1239']; // Rose Rocky
      case 'Mobile': return ['#10b981', '#065f46']; // Green Earth-like
      case 'Backend': return ['#a855f7', '#6b21a8']; // Purple Metallic
      default: return ['#737373', '#404040']; // Grey Moon
    }
  };

  const [color1, color2] = getPlanetColor(project.category);

  useFrame((state) => {
    if (!groupRef.current || activeProjectId) return; // Pause orbits when project selected

    const t = state.clock.getElapsedTime() * speed + offset;
    groupRef.current.position.x = Math.cos(t) * radius;
    groupRef.current.position.z = Math.sin(t) * radius;

    // Self rotation
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  // Handle Click
  const handleClick = (e: any) => {
    e.stopPropagation();
    if (groupRef.current) {
        // Get world position for camera to look at
        const vec = new THREE.Vector3();
        groupRef.current.getWorldPosition(vec);
        onSelect(project, vec);
    }
  };

  return (
    <group ref={groupRef}>
      {/* Orbit Trail */}
      <mesh rotation-x={Math.PI / 2} rotation-y={0} position={[-groupRef.current?.position.x || 0, 0, -groupRef.current?.position.z || 0]}>
         <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
         <meshBasicMaterial color={hovered ? color1 : "#333"} opacity={hovered ? 0.5 : 0.1} transparent side={THREE.DoubleSide} />
      </mesh>

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group onClick={handleClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
           {/* Rings for featured projects */}
           {project.featured && (
             <mesh rotation={[Math.PI / 3, 0, 0]}>
               <ringGeometry args={[size * 1.4, size * 1.8, 32]} />
               <meshStandardMaterial color={color1} opacity={0.4} transparent side={THREE.DoubleSide} />
             </mesh>
           )}

           <mesh ref={meshRef}>
              <sphereGeometry args={[size, 32, 32]} />
              <meshStandardMaterial
                color={hovered ? "#fff" : color1}
                roughness={0.7}
                metalness={project.category === 'Backend' ? 0.8 : 0.2}
                emissive={color1}
                emissiveIntensity={hovered ? 0.5 : 0}
              />
           </mesh>

           {/* Label on Hover */}
           <Html position={[0, size + 0.5, 0]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: hovered || activeProjectId === project.id ? 1 : 0, y: hovered || activeProjectId === project.id ? 0 : 10 }}
                className="px-3 py-1 bg-black/80 backdrop-blur border border-white/20 rounded-full whitespace-nowrap"
              >
                 <span className="text-xs font-bold text-white tracking-widest uppercase">{project.title}</span>
              </motion.div>
           </Html>
        </group>
      </Float>
    </group>
  );
};

const Scene = ({ onProjectSelect, activeProject }: { onProjectSelect: (p: Project | null) => void, activeProject: Project | null }) => {
  const cameraControlsRef = useRef<CameraControls>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!activeProject && cameraControlsRef.current) {
       // Reset Camera
       setActiveId(null);
       cameraControlsRef.current.setLookAt(0, 20, 30, 0, 0, 0, true);
    }
  }, [activeProject]);

  const handlePlanetSelect = (project: Project, position: THREE.Vector3) => {
    setActiveId(project.id);
    onProjectSelect(project);

    if (cameraControlsRef.current) {
      // Zoom in close to planet
      const offset = 3; // Distance from planet
      cameraControlsRef.current.setLookAt(
        position.x + offset, position.y + offset, position.z + offset, // Camera Pos
        position.x, position.y, position.z, // Look At
        true // Animate
      );
    }
  };

  return (
    <>
      <CameraControls ref={cameraControlsRef} maxDistance={60} minDistance={5} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={200} scale={30} size={2} speed={0.4} opacity={0.5} color="#f43f5e" />

      {/* Background Nebula Effect (Fake) */}
      <mesh scale={[100, 100, 100]}>
         <sphereGeometry />
         <meshBasicMaterial color="#050203" side={THREE.BackSide} />
      </mesh>

      <Sun />

      {PROJECTS.map((project, index) => (
        <Planet
          key={project.id}
          project={project}
          index={index}
          total={PROJECTS.length}
          onSelect={handlePlanetSelect}
          activeProjectId={activeId}
        />
      ))}
    </>
  );
};

// --- UI Overlay Components ---

const ProjectDetailsPanel = ({ project, onClose }: { project: Project, onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: "spring", damping: 20 }}
      className="absolute top-0 right-0 w-full md:w-[500px] h-full bg-neutral-900/90 backdrop-blur-xl border-l border-white/10 p-8 z-50 overflow-y-auto"
    >
       <button
         onClick={onClose}
         aria-label="Close"
         className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/20 text-white transition-colors"
       >
         <ArrowLeft size={20} />
       </button>

       <div className="mt-12 space-y-8">
          <div>
             <span className="inline-block px-3 py-1 rounded bg-rose-500/20 border border-rose-500/30 text-rose-500 text-xs font-bold uppercase tracking-widest mb-4">
                {project.category}
             </span>
             <h2 className="text-4xl font-black text-white leading-tight mb-4">{project.title}</h2>
             <p className="text-lg text-neutral-300 leading-relaxed">{project.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             {project.stats.map((stat, i) => (
                <div key={i} className="bg-black/40 p-4 rounded-xl border border-white/5">
                   <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                   <div className="text-xs text-neutral-400 uppercase">{stat.label}</div>
                </div>
             ))}
          </div>

          <div>
             <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <Layers size={16} className="text-rose-500" /> Tech Stack
             </h3>
             <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                   <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-neutral-300">
                      {t}
                   </span>
                ))}
             </div>
          </div>

          <div className="flex gap-4 pt-8 border-t border-white/10">
             {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-colors">
                   <ExternalLink size={18} /> View Live
                </a>
             )}
             {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-colors">
                   <Github size={18} /> Code
                </a>
             )}
          </div>
       </div>
    </motion.div>
  );
};

const HUD = ({ activeProject }: { activeProject: Project | null }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
       {/* Top Bar — offset below the fixed Navbar (h-20) so the HUD's own
           badges don't sit underneath the site nav. */}
       <div className="absolute top-20 left-0 w-full p-6 flex justify-between items-start pointer-events-auto">
          <div className="hidden md:block">
             <Breadcrumbs />
          </div>
          <div className="flex gap-4">
             <div className="px-4 py-2 bg-black/50 backdrop-blur border border-white/10 rounded-full text-xs font-mono text-neutral-400">
                UNIVERSE MODE: ACTIVE
             </div>
             <div className="px-4 py-2 bg-black/50 backdrop-blur border border-white/10 rounded-full text-xs font-mono text-rose-500 animate-pulse">
                {PROJECTS.length} ORBITING SYSTEMS
             </div>
          </div>
       </div>

       {/* Bottom Legend */}
       {!activeProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-6 px-6 py-3 bg-black/60 backdrop-blur rounded-full border border-white/10 pointer-events-auto"
          >
             <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-blue-600" /> Enterprise
             </div>
             <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-rose-600" /> Web
             </div>
             <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-green-600" /> Mobile
             </div>
             <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-purple-600" /> Backend
             </div>
          </motion.div>
       )}

       {/* Instructions */}
       {!activeProject && (
          <div className="absolute bottom-8 right-8 text-right hidden md:block">
             <div className="text-xs font-mono text-neutral-400 mb-1">NAVIGATE</div>
             <div className="text-sm font-bold text-white">DRAG TO ROTATE • SCROLL TO ZOOM</div>
          </div>
       )}
    </div>
  );
};

// --- Entry point for this chunk ---

const WorkUniverse: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="w-full h-screen bg-neutral-950 relative overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 20, 30], fov: 45 }}>
           <Suspense fallback={null}>
              <Scene
                onProjectSelect={setSelectedProject}
                activeProject={selectedProject}
              />
           </Suspense>
        </Canvas>
      </div>

      {/* 2D Overlay */}
      <HUD activeProject={selectedProject} />

      <AnimatePresence>
         {selectedProject && (
            <ProjectDetailsPanel
               project={selectedProject}
               onClose={() => setSelectedProject(null)}
            />
         )}
      </AnimatePresence>
    </div>
  );
};

export default WorkUniverse;
