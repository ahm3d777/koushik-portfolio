
import React, { useState, useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Html,
  Sparkles,
  Center,
  useCursor,
  OrbitControls
} from '@react-three/drei';
import * as THREE from 'three';
import { Loader2 } from 'lucide-react';
import { Article } from '../types';

// The desktop 3D "laboratory shelf" for /articles — pulled out of
// pages/Articles.tsx into its own component so it can be lazy-loaded ONLY
// when the >=768px, motion-capable branch actually renders. See
// components/WorkUniverse.tsx (same pattern, applied first) for why this
// split matters: a static three.js import at the top of an already
// route-lazy page still executes — and fetches its whole chunk — the
// moment that page's own chunk is evaluated, regardless of which branch
// of a runtime `if (isMobile)` check actually renders.

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Frontend': return '#3b82f6'; // Blue
    case 'Backend': return '#a855f7'; // Purple
    case 'Tutorial': return '#10b981'; // Emerald
    case 'System Design': return '#f43f5e'; // Rose
    default: return '#f59e0b'; // Amber
  }
};

const getLiquidHeight = (readTime: string) => {
  // Extract number from "6 min read" -> 6. Max height 1.5 units.
  const mins = parseInt(readTime) || 5;
  // Map 2min - 15min to 0.3 - 1.4 height
  return Math.min(Math.max((mins / 15) * 1.4, 0.3), 1.4);
};

// A DOM label via drei's <Html> rather than a WebGL <Text> mesh (troika-
// three-text) — matching the pattern WorkUniverse already uses for its
// planet labels. troika always fetches its glyph font over the network
// (its own bundled default, or a `font` prop URL — either way, remote),
// and a failure there doesn't just leave the label blank: it throws
// asynchronously outside any Suspense/error boundary React can catch,
// which was silently killing the whole scene's render loop on any
// network hiccup (blocked CDN, offline, ad-blocker). A DOM node has none
// of that risk and costs less to render besides.
const SpecimenLabel = ({ text, position }: { text: string, position: [number, number, number] }) => {
  return (
    <Html position={position} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
      <div className="px-3 py-1.5 bg-black/85 border border-white/15 rounded-md whitespace-nowrap">
        <span className="text-xs font-bold text-white tracking-wide">{text}</span>
      </div>
    </Html>
  );
};

const SpecimenVial: React.FC<{ article: Article, position: [number, number, number], onClick: (a: Article) => void }> = ({ article, position, onClick }) => {
  const [hovered, setHover] = useState(false);
  const liquidHeight = useMemo(() => getLiquidHeight(article.readTime), [article.readTime]);
  const color = useMemo(() => getCategoryColor(article.category), [article.category]);
  const meshRef = useRef<THREE.Group>(null);

  useCursor(hovered);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation offset by position to desync
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.05;

      // Hover emphasis
      const targetScale = hovered ? 1.1 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onClick={(e) => { e.stopPropagation(); onClick(article); }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/* Glass Container. transmission this high normally leans on an HDR
          environment map for its reflections/refraction — with the remote
          <Environment> removed (see the lighting rig below), that's now a
          plain point-lit rig instead, so `clearcoat` is added to keep a
          visible specular highlight without one, and opacity is nudged up
          so the glass doesn't read as invisible against the black bg. */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
        <meshPhysicalMaterial
          roughness={0.1}
          transmission={0.75}
          thickness={0.5}
          transparent
          opacity={0.45}
          color="#ffffff"
          clearcoat={0.8}
          clearcoatRoughness={0.15}
        />
      </mesh>

      {/* Cork / Cap */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.52, 0.52, 0.2, 32]} />
        <meshStandardMaterial color="#262626" roughness={0.8} />
      </mesh>

      {/* Liquid */}
      <group position={[0, -1 + liquidHeight / 2, 0]}>
        <mesh>
          <cylinderGeometry args={[0.42, 0.42, liquidHeight, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.8 : 0.4}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Bubbles */}
        <Sparkles
          count={10}
          scale={[0.3, liquidHeight, 0.3]}
          size={2}
          speed={0.4}
          opacity={0.7}
          color="#ffffff"
        />
      </group>

      {/* Category Ring */}
      <mesh position={[0, -1.05, 0]}>
        <cylinderGeometry args={[0.52, 0.52, 0.1, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>

      {/* Floating Label (Visible on Hover) */}
      {hovered && <SpecimenLabel text={article.title} position={[0, 1.8, 0]} />}
    </group>
  );
};

const LaboratoryShelf = ({ articles, onSelect }: { articles: Article[], onSelect: (a: Article) => void }) => {
  return (
    <group rotation={[0, -Math.PI / 4, 0]}>
       {/* Shelf Structure */}
       <mesh position={[0, -1.2, 0]} receiveShadow>
          <boxGeometry args={[10, 0.2, 4]} />
          <meshStandardMaterial color="#171717" roughness={0.8} metalness={0.5} />
       </mesh>
       <mesh position={[0, -1.2, -2]} receiveShadow>
          <boxGeometry args={[10, 4, 0.2]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.8} metalness={0.8} />
       </mesh>

       {/* Articles Row */}
       {articles.map((article, i) => {
         // Grid logic
         const rowSize = 3;
         const x = (i % rowSize - 1) * 2.5;
         const z = Math.floor(i / rowSize) * 1.5;

         return (
            <SpecimenVial
              key={article.id}
              article={article}
              position={[x, 0.2, z - 0.5]}
              onClick={onSelect}
            />
         );
       })}

       {/* Ambient Lab Lighting — a small hand-placed rig instead of
           drei's <Environment preset="city">, which fetches an HDR map
           from an external CDN. That fetch failing (blocked network,
           offline, CDN hiccup) threw past every boundary and blanked the
           entire app, not just this scene; a self-contained light rig
           can't fail that way, and reads just as "premium lab" lit. */}
       <ambientLight intensity={0.35} />
       <hemisphereLight args={['#ffffff', '#1a0510', 0.7]} />
       <pointLight position={[6, 6, 6]} intensity={1.4} color="#ffffff" />
       <pointLight position={[-6, 4, -4]} intensity={0.8} color="#60a5fa" />
       <pointLight position={[0, 3, 6]} intensity={0.9} color="#f43f5e" />
    </group>
  );
};

const ArticlesLab: React.FC<{ articles: Article[], onSelect: (article: Article) => void, onClearFilters?: () => void }> = ({ articles, onSelect, onClearFilters }) => {
  if (articles.length === 0) {
    return (
      <div className="absolute inset-0 top-0 h-screen w-full flex flex-col items-center justify-center gap-4">
        <p className="text-neutral-500 text-sm uppercase tracking-widest">No specimens match that filter.</p>
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="px-4 py-2 text-sm font-bold text-rose-400 border border-rose-500/30 rounded-lg hover:bg-rose-500/10 transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 top-0 h-screen w-full">
       <Canvas shadows dpr={[1, 2]} camera={{ position: [10, 10, 10], zoom: 50 }} orthographic>
          <Suspense fallback={
             <Html center>
                <div className="flex items-center gap-2 text-neutral-400 text-xs uppercase tracking-widest whitespace-nowrap">
                   <Loader2 className="animate-spin" size={14} /> Calibrating specimens...
                </div>
             </Html>
          }>
             <color attach="background" args={['#0a0a0a']} />
             <group position={[0, -2, 0]}>
                <Center key={articles.map(a => a.id).join(',')}>
                   <LaboratoryShelf articles={articles} onSelect={onSelect} />
                </Center>
             </group>
             <OrbitControls
                enableZoom={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2.5}
                minAzimuthAngle={-Math.PI / 3}
                maxAzimuthAngle={Math.PI / 6}
             />
          </Suspense>
       </Canvas>

       {/* Hint */}
       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-400 text-xs uppercase tracking-widest animate-pulse pointer-events-none">
          Rotate to Inspect • Click to Read
       </div>
    </div>
  );
};

export default ArticlesLab;
