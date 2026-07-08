"use client";

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// 3D Silicon Wafer with Microchip Logic Gate Structures
function SiliconWafer() {
  const waferRef = useRef<THREE.Group>(null);

  // Mouse tilt interaction
  useFrame((state, delta) => {
    if (waferRef.current) {
      const { x, y } = state.pointer;
      // Smooth lerp rotation toward mouse coordinates
      waferRef.current.rotation.x = THREE.MathUtils.lerp(
        waferRef.current.rotation.x,
        0.4 + y * 0.3,
        delta * 3
      );
      waferRef.current.rotation.y = THREE.MathUtils.lerp(
        waferRef.current.rotation.y,
        x * 0.5,
        delta * 3
      );
      waferRef.current.rotation.z += delta * 0.1; // Gentle continuous spin
    }
  });

  return (
    <group ref={waferRef} position={[0, -0.2, 0]} rotation={[0.4, 0, 0]}>
      {/* Silicon Wafer Base Disc */}
      <mesh receiveShadow castShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[2.6, 2.6, 0.12, 64]} />
        <meshStandardMaterial
          color="#161616"
          metalness={0.9}
          roughness={0.15}
          emissive="#0a192f"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Wafer Metallic Ring Border */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2.62, 2.62, 0.1, 64]} />
        <meshStandardMaterial color="#DA7438" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Grid Pattern representing IC Die Layouts */}
      <gridHelper
        args={[4.6, 14, "#1C8DF0", "#24B178"]}
        position={[0, 0.065, 0]}
      />

      {/* Microchip Logic Gate Structures (3D transistor blocks) */}
      <group position={[0, 0.12, 0]}>
        {[-1.2, -0.4, 0.4, 1.2].map((x, i) =>
          [-1.2, -0.4, 0.4, 1.2].map((z, j) => {
            // Skip corners to keep wafer circular shape
            if (x * x + z * z > 2.8) return null;
            const height = 0.1 + ((i * 3 + j * 7) % 5) * 0.05;
            const color =
              (i + j) % 3 === 0
                ? "#1C8DF0"
                : (i + j) % 3 === 1
                ? "#24B178"
                : "#F69B66";
            return (
              <mesh
                key={`gate-${i}-${j}`}
                position={[x, height / 2, z]}
                castShadow
              >
                <boxGeometry args={[0.55, height, 0.55]} />
                <meshStandardMaterial
                  color={color}
                  metalness={0.7}
                  roughness={0.2}
                  emissive={color}
                  emissiveIntensity={0.3}
                />
              </mesh>
            );
          })
        )}
      </group>

      {/* Central Quantum Processing Unit Core */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[0.9, 0.3, 0.9]} />
        <meshStandardMaterial
          color="#DA7438"
          metalness={0.95}
          roughness={0.1}
          emissive="#DA7438"
          emissiveIntensity={0.5}
          wireframe={false}
        />
      </mesh>
    </group>
  );
}

// Interactive Quantum Electron Particle Field
function ElectronCloud({ count = 1500 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random 3D coordinates around the wafer
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorChoices = [
      new THREE.Color("#1C8DF0"), // Dodger Blue
      new THREE.Color("#24B178"), // Emerald Green
      new THREE.Color("#F69B66"), // Salmon
      new THREE.Color("#EBD08C"), // Navajo White
    ];

    for (let i = 0; i < count; i++) {
      // Cylindrical coordinates for toroidal cloud around wafer
      const radius = 1.2 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 3.5;

      pos[i * 3] = radius * Math.cos(theta);
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = radius * Math.sin(theta);

      const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return [pos, col];
  }, [count]);

  // Animate wave equation motion
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.15;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

      // Pulse particle sizes dynamically
      const geom = pointsRef.current.geometry;
      if (geom.attributes.position) {
        geom.attributes.position.needsUpdate = true;
      }
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Loading Spinner Fallback for 3D Canvas
function LoaderFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gainsboro/50 neo-border p-8">
      <div className="w-12 h-12 border-4 border-charcoal border-t-brick rounded-full animate-spin mb-4" />
      <div className="font-mono text-xs uppercase tracking-widest text-charcoal font-bold animate-pulse">
        [ INITIALIZING 3D SILICON WAFER &amp; QUANTUM FIELD... ]
      </div>
    </div>
  );
}

// Main Export Component
export function SemiconductorScene() {
  return (
    <div className="w-full h-[420px] lg:h-[540px] relative rounded-none neo-border bg-gradient-to-b from-charcoal/90 to-charcoal overflow-hidden shadow-[6px_6px_0px_#161616]">
      {/* Telemetry HUD Overlay Top-Left */}
      <div className="absolute top-4 left-4 z-10 font-mono text-[10px] sm:text-xs text-floral-white/80 bg-charcoal/80 p-3 neo-border-sm border-floral-white/30 space-y-1 pointer-events-none">
        <div className="flex items-center gap-2 text-emerald-green font-bold">
          <span className="w-2 h-2 bg-emerald-green rounded-full animate-ping" />
          <span>SIMULATION: ACTIVE</span>
        </div>
        <div>GATE ARCHITECTURE: 3D FINFET / 5NM</div>
        <div>WAVE EQUATION: CRANK-NICOLSON TDSE</div>
        <div className="text-light-salmon-2">&gt; MOVE MOUSE TO TILT CRYSTAL LATTICE</div>
      </div>

      {/* Telemetry HUD Overlay Bottom-Right */}
      <div className="absolute bottom-4 right-4 z-10 font-mono text-[10px] text-floral-white/60 bg-charcoal/80 px-3 py-1.5 neo-border-sm border-floral-white/20 pointer-events-none">
        FPS: 60 &bull; WEBGL 2.0 &bull; R3F
      </div>

      <Suspense fallback={<LoaderFallback />}>
        <Canvas
          camera={{ position: [0, 2.8, 6.5], fov: 45 }}
          shadows
          gl={{ antialias: true, alpha: false }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <color attach="background" args={["#111111"]} />
          
          {/* Lighting Setup */}
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[10, 15, 10]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#1C8DF0" />
          <pointLight position={[10, -5, 10]} intensity={0.8} color="#DA7438" />

          {/* Floating Wafer & Electron Cloud */}
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
            <SiliconWafer />
          </Float>
          
          <ElectronCloud count={1800} />

          {/* Contact Shadows on bottom plane */}
          <ContactShadows
            position={[0, -2.2, 0]}
            opacity={0.6}
            scale={12}
            blur={2.5}
            far={4}
            color="#000000"
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
