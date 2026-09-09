
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// A real WebGL scene (react-three-fiber + drei — already dependencies used
// elsewhere on the Work/Articles pages, so this brings the homepage hero up
// to the same technical level rather than faking depth with CSS 3D
// transforms). A distorted rose core, two orbit rings, a couple of small
// floating accent shapes, and ambient sparkles — all gently tilting toward
// the pointer.

const Scene: React.FC = () => {
  const group = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    // Parallax: the whole composition eases toward the pointer position.
    if (group.current) {
      const targetY = state.pointer.x * 0.5;
      const targetX = -state.pointer.y * 0.3;
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 4, delta);
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 4, delta);
    }
    if (ring1.current) ring1.current.rotation.x += delta * 0.35;
    if (ring2.current) ring2.current.rotation.y += delta * 0.25;
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 2, 4]} intensity={12} color="#f43f5e" distance={12} decay={2} />
      <pointLight position={[-3, -2, -3]} intensity={4} color="#ffffff" distance={12} decay={2} />

      {/* Core */}
      <Float speed={2.2} rotationIntensity={0.5} floatIntensity={0.9}>
        <mesh>
          <icosahedronGeometry args={[1.05, 6]} />
          <MeshDistortMaterial
            color="#e11d48"
            emissive="#9f1239"
            emissiveIntensity={0.5}
            distort={0.35}
            speed={2.5}
            roughness={0.25}
            metalness={0.4}
          />
        </mesh>
      </Float>

      {/* Orbit rings, echoing the site's ring motif (favicon / OG image) */}
      <mesh ref={ring1} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[1.75, 0.012, 16, 100]} />
        <meshStandardMaterial color="#f5f5f5" transparent opacity={0.45} roughness={0.3} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[1.45, 0.01, 16, 100]} />
        <meshStandardMaterial color="#fb7185" transparent opacity={0.5} roughness={0.3} />
      </mesh>

      {/* Small floating accents */}
      <Float speed={3} rotationIntensity={1.2} floatIntensity={1.4} position={[-1.6, 1.1, 0.6]}>
        <mesh>
          <sphereGeometry args={[0.14, 24, 24]} />
          <meshStandardMaterial color="#e5e5e5" metalness={0.6} roughness={0.2} />
        </mesh>
      </Float>
      <Float speed={2.4} rotationIntensity={1.5} floatIntensity={1.1} position={[1.7, -1, 0.4]}>
        <mesh rotation={[0.4, 0.4, 0]}>
          <boxGeometry args={[0.22, 0.22, 0.22]} />
          <meshStandardMaterial color="#404040" metalness={0.7} roughness={0.3} />
        </mesh>
      </Float>

      <Sparkles count={40} scale={4} size={2} speed={0.25} color="#fda4af" opacity={0.6} />
    </group>
  );
};

const GeometricSculpture: React.FC = () => (
  <div className="relative w-full max-w-md aspect-square mx-auto">
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
    >
      <Scene />
    </Canvas>
  </div>
);

export default GeometricSculpture;
