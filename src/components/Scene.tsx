"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Model() {
  const { scene } = useGLTF("/wine_bottle.glb");
  const canRef = useRef<THREE.Group>(null);

  // 1. CONSTANT IDLE ANIMATION
  // This keeps the can "alive" with gentle rotation and bobbing
  useFrame((state) => {
    if (!canRef.current) return;
    const t = state.clock.getElapsedTime();
    canRef.current.rotation.y += 0.005; 
    canRef.current.position.y += Math.sin(t) * 0.001; 
  });

  useLayoutEffect(() => {
    if (!canRef.current) return;

    // --- A. INTRO ANIMATION (Independent of scroll) ---
    const introTl = gsap.timeline();
    
    // Starting state (Above the screen)
    gsap.set(canRef.current.position, { y: 5, x: 0, z: 0 });
    gsap.set(canRef.current.rotation, { x: 2, z: 1 });
    gsap.set(canRef.current.scale, { x: 0.5, y: 0.5, z: 0.5 });

    // Landing in the center
    introTl.to(canRef.current.position, {
      y: 0,
      duration: 1.5,
      ease: "power4.out",
    })
    .to(canRef.current.rotation, {
      x: 0, z: 0, y: Math.PI * 2,
      duration: 1.5,
      ease: "power4.out",
    }, 0);

    // --- B. THE SCROLL & LEAVE TIMELINE ---
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".main-wrapper",
        start: "top top",
        end: "bottom bottom",
        scrub: true, // 1:1 ratio makes it feel "attached" to the page
      },
    });

    scrollTl
      // STEP 1: Glide to Anchor Position (Middle-Right)
      // This part happens during the first ~30% of your scroll
      .to(canRef.current.position, {
        x: 2.5,
        y: -1,
        z: 0,
        duration: 2.2,
      })
      .to(canRef.current.rotation, {
        x: 0.2, z: -0.1, y: Math.PI * 3.5,
        duration: 2,
      }, 0)

      // STEP 2: "LEAVE BEHIND" (Scroll out of view)
      // This animates the can UP out of the fixed viewport.
      // Adjust the final 'y' value to match the speed of your text.
      .to(canRef.current.position, {
        y: 10,       // Moves it way up off the top of the screen
        duration: 8, // Takes a longer portion of the scroll to happen
        ease: "none",
      })
      .to(canRef.current.rotation, {
        y: Math.PI * 6,
        duration: 8,
        ease: "none",
      }, "-=8");

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <primitive ref={canRef} object={scene} />;
}

export default function Scene() {
  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={1.5} />
        <spotLight position={[5, 10, 5]} intensity={2.5} angle={0.15} />
        
        <Suspense fallback={null}>
          <Model />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}