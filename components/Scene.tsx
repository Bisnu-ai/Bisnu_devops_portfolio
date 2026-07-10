"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

const ParticleSystem = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const [scrollY, setScrollY] = useState(0);

  // Generate original sphere positions and random scatter directions
  const { positions, scatterDirs } = useMemo(() => {
    const count = 4000; // High particle count for smooth look
    const positions = new Float32Array(count * 3);
    const scatterDirs = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Golden ratio spiral for even sphere distribution
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const r = 1.8;
      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);

      positions.set([x, y, z], i * 3);

      // Random direction for scattering outward
      const dx = (Math.random() - 0.5) * 15;
      const dy = (Math.random() - 0.5) * 15;
      const dz = (Math.random() - 0.5) * 15;
      scatterDirs.set([dx, dy, dz], i * 3);
    }
    
    return { positions, scatterDirs };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    
    // Rotate slowly over time
    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    pointsRef.current.rotation.x = clock.getElapsedTime() * 0.02;

    const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Max scroll where it's fully shattered
    const maxScroll = typeof window !== 'undefined' ? document.body.scrollHeight - window.innerHeight : 2000; 
    // Normalized scroll progress 0 to 1
    let progress = maxScroll > 0 ? scrollY / maxScroll : 0;
    progress = Math.min(Math.max(progress, 0), 1);
    
    // Easing function for smoother shatter (ease-in-out)
    const easeProgress = progress * progress * (3 - 2 * progress);

    for (let i = 0; i < positionsArray.length; i += 3) {
      // Base position (the sphere)
      const bx = positions[i];
      const by = positions[i + 1];
      const bz = positions[i + 2];

      // Scatter direction
      const sx = scatterDirs[i];
      const sy = scatterDirs[i + 1];
      const sz = scatterDirs[i + 2];

      // Interpolate based on scroll
      positionsArray[i] = bx + sx * easeProgress;
      positionsArray[i + 1] = by + sy * easeProgress;
      positionsArray[i + 2] = bz + sz * easeProgress;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <float32BufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00f0ff"
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default function Scene() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#050505]">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ParticleSystem />
      </Canvas>
    </div>
  );
}
