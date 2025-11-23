"use client";
import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Particle_effect } from "./Particle_effect";

export function Wrapper_Particle_Effect() {
  const modelRef = useRef<THREE.Group>(null!);
  const { viewport } = useThree();

  const [hovered, setHovered] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });

  const gltf = useGLTF("/models/yourModel.glb"); // <-- your model

  // Track mouse inside canvas only
  const handlePointerMove = (e: any) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  useFrame(() => {
    if (!modelRef.current) return;

    if (hovered) {
      // Magnetic movement
      modelRef.current.position.x += (mouse.current.x * 1.2 - modelRef.current.position.x) * 0.12;
      modelRef.current.position.y += (mouse.current.y * 1.2 - modelRef.current.position.y) * 0.12;

      // Magnetic rotation
      modelRef.current.rotation.y += ((mouse.current.x * 0.8) - modelRef.current.rotation.y) * 0.08;
      modelRef.current.rotation.x += ((mouse.current.y * 0.8) - modelRef.current.rotation.x) * 0.08;
    } else {
      // Return to center smoothly
      modelRef.current.position.x *= 0.9;
      modelRef.current.position.y *= 0.9;
      modelRef.current.rotation.x *= 0.9;
      modelRef.current.rotation.y *= 0.9;
    }
  });

  return (
    <group
      ref={modelRef}
      onPointerEnter={() => setHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setHovered(false)}
    >
      <Particle_effect />
    </group>
  );
}
