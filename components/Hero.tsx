"use client";

import { JSX, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {Particle_effect} from "@/components/Particle_effect"
import { Wrapper_Particle_Effect } from "./Wrapper_Particle_Effect";

export default function Hero(): JSX.Element {
  const cursor = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const blob1Ref = useRef<HTMLDivElement | null>(null);
  const blob2Ref = useRef<HTMLDivElement | null>(null);
  const blob3Ref = useRef<HTMLDivElement | null>(null);
  const geometricRef = useRef<HTMLDivElement | null>(null);
  const gradientRef = useRef<HTMLDivElement | null>(null);
  const canvasContainer = useRef<HTMLDivElement | null>(null);


  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const cursorEl = cursor.current;
    const heroEl = heroRef.current;
    const imageContainerEl = imageContainerRef.current;
    const backgroundEl = backgroundRef.current;
    const blob1El = blob1Ref.current;
    const blob2El = blob2Ref.current;
    const blob3El = blob3Ref.current;
    const geometricEl = geometricRef.current;
    const gradientEl = gradientRef.current;

    if (!cursorEl || !heroEl || !imageContainerEl || !backgroundEl) return;

    // Only enable custom cursor on desktop
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    let rafId: number | null = null;
    const moveCursor = (e: MouseEvent) => {
      if (!cursorEl || isMobile) return;

      const targetX = e.clientX - 12;
      const targetY = e.clientY - 12;

      // --- sponge/squeeze effect based on velocity ---
      const dx = e.clientX - (cursorEl as any)._lastX || 0;
      const dy = e.clientY - (cursorEl as any)._lastY || 0;

      (cursorEl as any)._lastX = e.clientX;
      (cursorEl as any)._lastY = e.clientY;

      const velocity = Math.min(Math.sqrt(dx * dx + dy * dy) / 80, 1);

      const squeezeX = 1 + velocity * 0.85;
      const squeezeY = 1 - velocity * 0.55;

      // prevent RAF spam
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        gsap.to(cursorEl, {
          x: targetX,
          y: targetY,
          scaleX: squeezeX,
          scaleY: squeezeY,
          duration: 0.2,
          ease: "power3.out",
        });

        // snap back to normal
        gsap.to(cursorEl, {
          scaleX: 1,
          scaleY: 1,
          duration: 0.35,
          delay: 0.05,
          ease: "elastic.out(1, 0.4)",
        });

        rafId = null;
      });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      if (isMobile) return;
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 1 - 10;
      const centerY = rect.top + rect.height / 1 - 10;

      gsap.to(cursorEl, {
        x: centerX,
        y: centerY,
        scale: 2,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 1;
      const centerY = rect.top + rect.height / 1;

      const deltaX = (e.clientX - centerX) * 0;
      const deltaY = (e.clientY - centerY) * 0;

      gsap.to(cursorEl, {
        x: centerX + deltaX - 10,
        y: centerY + deltaY - 10,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      if (isMobile) return;
      gsap.to(cursorEl, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    if (!isMobile) {
      window.addEventListener("mousemove", moveCursor);
    }

    const magneticElements = heroEl.querySelectorAll<HTMLElement>(".magnetic");
    if (!isMobile) {
      magneticElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter as EventListener);
        el.addEventListener("mousemove", handleMouseMove as EventListener);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroEl,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true,
      },
    });

    tl.to(backgroundEl, {
      scale: 50,
      duration: 0.8,
      ease: "power2.inOut",
    }).to(
      imageContainerEl,
      {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
      },
      0
    );

    if (blob1El) {
      gsap.to(blob1El, {
        y: -50,
        x: 30,
        scrollTrigger: {
          trigger: heroEl,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    if (blob2El) {
      gsap.to(blob2El, {
        y: 40,
        x: -20,
        scrollTrigger: {
          trigger: heroEl,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    if (blob3El) {
      gsap.to(blob3El, {
        y: -30,
        x: -40,
        scrollTrigger: {
          trigger: heroEl,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    if (geometricEl) {
      gsap.to(geometricEl, {
        rotation: 15,
        scale: 1.1,
        scrollTrigger: {
          trigger: heroEl,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    if (gradientEl) {
      gsap.to(gradientEl, {
        opacity: 0.6,
        scale: 1.2,
        scrollTrigger: {
          trigger: heroEl,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    return () => {
      if (!isMobile) {
        window.removeEventListener("mousemove", moveCursor);
        magneticElements.forEach((el) => {
          el.removeEventListener(
            "mouseenter",
            handleMouseEnter as EventListener
          );
          el.removeEventListener("mousemove", handleMouseMove as EventListener);
          el.removeEventListener("mouseleave", handleMouseLeave);
        });
      }

      try {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === heroEl) st.kill();
        });
      } catch {
        /* ignore */
      }

      gsap.killTweensOf(cursorEl);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="h-screen uppercase flex flex-col items-center justify-center font-extrabold  relative overflow-hidden md:px-0"
    >
      <div
        ref={gradientRef}
        className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 pointer-events-none z-0"
        style={{ willChange: "opacity, transform" }}
      />

      <div
        ref={blob1Ref}
        className="absolute w-48 h-48 md:w-96 md:h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none z-0"
        style={{
          top: "10%",
          left: "5%",
          willChange: "transform",
        }}
      />

      <div
        ref={blob2Ref}
        className="absolute w-40 h-40 md:w-80 md:h-80 bg-purple-200/20 rounded-full blur-3xl pointer-events-none z-0"
        style={{
          bottom: "15%",
          right: "10%",
          willChange: "transform",
        }}
      />

      <div
        ref={blob3Ref}
        className="absolute w-36 h-36 md:w-72 md:h-72 bg-pink-200/20 rounded-full blur-3xl pointer-events-none z-0"
        style={{
          top: "50%",
          right: "15%",
          willChange: "transform",
        }}
      />

      <div
        ref={geometricRef}
        className="absolute inset-0  z-0"
        style={{ willChange: "transform" }}
      >
        <div className="absolute top-10 left-5 md:top-20 md:left-20 w-16 h-16 md:w-32 md:h-32 border-2 border-gray-300/20 rotate-45" />
        <div className="absolute bottom-16 right-8 md:bottom-32 md:right-24 w-12 h-12 md:w-24 md:h-24 border-2 border-gray-300/20 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-8 h-8 md:w-16 md:h-16 border-2 border-gray-300/20 rotate-12" />
      </div>

      <div
        ref={backgroundRef}
        className="absolute w-20 h-20 bg-[#f5f5f5] hover:invert rounded-full  z-42"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%) scale(0)",
          willChange: "transform",
        }}
      />

      <div
        ref={cursor}
        className="hidden md:block cursor h-6 w-6 bg-gray-300 rounded-full absolute  z-100 mix-blend-exclusion"
        style={{ left: 0, top: 0 }}
      ></div>

      <div className="relative z-10">
        <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-10 text-center mix-blend-difference px-4">
          We don't overthink
        </p>
      </div>

      <div ref={imageContainerRef} className="leading-none h-80 w-100 relative z-40">
        <Canvas className="flex items-center justify-center bg-black">
          <ambientLight intensity={10} />
          <directionalLight position={[20, 20, 10]} intensity={100} />
          <OrbitControls enableDamping enableZoom />
          <Particle_effect />
        </Canvas>
      </div>

      <div className="flex text-black items-center justify-center mt-10 text-3xl sm:text-4xl md:text-6xl lg:text-7xl relative z-10 px-4">
        <p className="text-black text-center">We overdeliver.</p>
      </div>
    </div>
  );
}

// <CardContainer className="inter-var">
//   <CardBody className="relative group/card dark:hover:shadow-2xl items-center dark:bg-black w-auto h-auto rounded-xl">
//     <CardItem translateZ="150">
//       <Image
//         src="/images/image__2_-removebg-preview.png"
//         height={600}
//         width={600}
//         className="h-50 w-50 sm:h-62 sm:w-62 md:h-64 md:w-64 lg:h-80 lg:w-80 object-contain rounded-xl"
//         alt="thumbnail"
//       />
//     </CardItem>
//   </CardBody>
// </CardContainer>
