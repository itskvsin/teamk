"use client";

import { JSX, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Spotlight } from '@/components/motion-primitives/spotlight';


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
      const targetX = e.clientX - 40;
      const targetY = e.clientY - 40;

      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        gsap.to(cursorEl, {
          x: targetX,
          y: targetY,
          duration: 0.3,
          ease: "power2.out",
        });
        rafId = null;
      });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      if (isMobile) return;
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2 - 40;
      const centerY = rect.top + rect.height / 2 - 40;

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
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * 0.3;
      const deltaY = (e.clientY - centerY) * 0.3;

      gsap.to(cursorEl, {
        x: centerX + deltaX - 40,
        y: centerY + deltaY - 40,
        duration: 0.2,
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
          el.removeEventListener("mouseenter", handleMouseEnter as EventListener);
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
      className="h-screen flex flex-col items-center justify-center font-extrabold cursor-none md:cursor-none relative overflow-hidden md:px-0"
    >
      <Spotlight
        className='bg-zinc-700 blur-2xl'
        size={64}
        springOptions={{
          bounce: 0.3,
          duration: 0.1,
        }}
      />
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
        className="absolute inset-0 pointer-events-none z-0"
        style={{ willChange: "transform" }}
      >
        <div className="absolute top-10 left-5 md:top-20 md:left-20 w-16 h-16 md:w-32 md:h-32 border-2 border-gray-300/20 rotate-45" />
        <div className="absolute bottom-16 right-8 md:bottom-32 md:right-24 w-12 h-12 md:w-24 md:h-24 border-2 border-gray-300/20 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-8 h-8 md:w-16 md:h-16 border-2 border-gray-300/20 rotate-12" />
      </div>

      <div
        ref={backgroundRef}
        className="absolute w-20 h-20 bg-[#f5f5f5] rounded-full pointer-events-none z-42"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%) scale(0)",
          willChange: "transform",
        }}
      />

      <div
        ref={cursor}
        className="hidden md:block cursor h-10 w-10 bg-gray-300 rounded-full absolute pointer-events-none z-41 mix-blend-difference"
        style={{ left: 0, top: 0 }}
      ></div>

      <div className="relative z-10">
        <p className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-center mix-blend-difference px-4">
          We don't overthink
        </p>
      </div>

      <div ref={imageContainerRef} className="leading-none relative z-40">
        <CardContainer className="inter-var">
          <CardBody className="relative group/card dark:hover:shadow-2xl items-center dark:bg-black w-auto h-auto rounded-xl">
            <CardItem translateZ="150">
              <Image
                src="/images/duckBg-removebg-preview.png"
                height={450}
                width={450}
                className="h-50 w-50 sm:h-62 sm:w-62 md:h-64 md:w-64 lg:h-80 lg:w-80 object-cover rounded-xl"
                alt="thumbnail"
              />
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>

      <div className="flex text-black items-center justify-center text-3xl sm:text-4xl md:text-6xl lg:text-8xl relative z-10 px-4">
        <p className="text-black text-center">We overdeliver.</p>
      </div>

      <div className="flex flex-col gap-3 md:gap-6 w-full mt-4 md:mt-8 relative z-10 px-4">
        <div className="h-0.5 md:h-1 bg-black w-full mb-1 md:mb-4"></div>
        <div className="h-2 md:h-5 bg-black w-full mb-2 md:mb-6"></div>
        <div className="h-8 md:h-16 bg-black w-full"></div>
      </div>
    </div>
  );
}