"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GSAPConditions {
  isDesktop: boolean;
  isMobile: boolean;
}

function Model() {
  const { scene } = useGLTF("/wine_bottle.glb");
  const canRef = useRef<THREE.Group>(null);

  // Type-safe material transparency setup
  useLayoutEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((m) => {
          if (m instanceof THREE.MeshStandardMaterial || m instanceof THREE.MeshPhysicalMaterial || m instanceof THREE.MeshBasicMaterial) {
            m.transparent = true;
            m.opacity = 1;
          }
        });
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (!canRef.current) return;
    const t = state.clock.getElapsedTime();
    canRef.current.rotation.y += 0.005;
    // gentle bob — oscillates around current position rather than absolute 0
    canRef.current.position.y += Math.sin(t * 1.2) * 0.0008;
  });

  useLayoutEffect(() => {
    if (!canRef.current) return;

    const mm = gsap.matchMedia();

    // ─── A. INTRO (Common) ───
    const introTl = gsap.timeline();
    gsap.set(canRef.current.position, { y: 5, x: 0 });
    gsap.set(canRef.current.rotation, { x: 2, z: 1 });
    gsap.set(canRef.current.scale, { x: 0.5, y: 0.5, z: 0.5 });

    introTl.to(canRef.current.position, { y: -0.2, duration: 1.5, ease: "power4.out" })
           .to(canRef.current.rotation, { x: 0, z: 0, y: Math.PI * 2, duration: 1.5, ease: "power4.out" }, 0);

    // ─── B. RESPONSIVE SCROLL LOGIC ───
    mm.add({ isDesktop: "(min-width: 768px)", isMobile: "(max-width: 767px)" }, (context) => {
      const { isDesktop } = context.conditions as unknown as GSAPConditions;
      const scrollTl = gsap.timeline({ scrollTrigger: { trigger: ".main-wrapper", start: "top top", end: "+=50%", scrub: true} });
      const scrollRot = gsap.timeline({ scrollTrigger: { trigger: ".main-wrapper", start: "top top", end: "bottom bottom", scrub: true} });

      if (isDesktop) {
        // Desktop: Slide to the right and scroll away (Your custom logic)
        scrollTl.to(canRef.current!.position, { x: 2.5, y: -0.3, duration: 2.2 })
                .to(canRef.current!.rotation, { x: 0.2, z: -0.1, y: Math.PI * 3.5, duration: 2 }, 0)
                // .to(canRef.current!.position, { y: 10, duration: 8, ease: "none" })
        scrollRot.to(canRef.current!.rotation, { y: Math.PI * 3, duration: 8, ease: "none" }, "-=8");
      } else {
        // Mobile: No X/Y movement, fade bottle and fade in background overlay
        scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const materials = Array.isArray(child.material) ? child.material : [child.material];
            materials.forEach((m) => {
              if ('opacity' in m) { scrollTl.to(m, { opacity: 0.2, duration: 2 }, 0); }
            });
          }
        });
        
        // Fade in the beige background veil from page.tsx

        scrollRot.to(canRef.current!.rotation, { y: Math.PI * 4, duration: 10, ease: "none" }, 0);
      }
    });

    return () => mm.revert();
  }, [scene]);

  return <primitive ref={canRef} object={scene} />;
}

export default function Scene() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true }}>
        <ambientLight intensity={2.0} />
        <spotLight position={[0, 10, 3]} intensity={3.0} angle={0.2} />
        <Suspense fallback={null}>
          <Model />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
}