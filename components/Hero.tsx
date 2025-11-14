"use client";

import React, { JSX, useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

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

    let rafId: number | null = null;
    const moveCursor = (e: MouseEvent) => {
      if (!cursorEl) return;
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
      gsap.to(cursorEl, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    const magneticElements = heroEl.querySelectorAll<HTMLElement>(".magnetic");
    magneticElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter as EventListener);
      el.addEventListener("mousemove", handleMouseMove as EventListener);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

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
      scale: 30,
      duration: 1,
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
      window.removeEventListener("mousemove", moveCursor);
      magneticElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter as EventListener);
        el.removeEventListener("mousemove", handleMouseMove as EventListener);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });

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
      className="h-screen flex flex-col items-center justify-center font-extrabold cursor-none relative overflow-hidden"
    >
      <div
        ref={gradientRef}
        className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 pointer-events-none z-0"
        style={{ willChange: "opacity, transform" }}
      />

      <div
        ref={blob1Ref}
        className="absolute w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none z-0"
        style={{
          top: "10%",
          left: "10%",
          willChange: "transform",
        }}
      />

      <div
        ref={blob2Ref}
        className="absolute w-80 h-80 bg-purple-200/20 rounded-full blur-3xl pointer-events-none z-0"
        style={{
          bottom: "15%",
          right: "15%",
          willChange: "transform",
        }}
      />

      <div
        ref={blob3Ref}
        className="absolute w-72 h-72 bg-pink-200/20 rounded-full blur-3xl pointer-events-none z-0"
        style={{
          top: "50%",
          right: "20%",
          willChange: "transform",
        }}
      />

      <div
        ref={geometricRef}
        className="absolute inset-0 pointer-events-none z-0"
        style={{ willChange: "transform" }}
      >
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-gray-300/20 rotate-45" />
        <div className="absolute bottom-32 right-24 w-24 h-24 border-2 border-gray-300/20 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-gray-300/20 rotate-12" />
      </div>

      <div
        ref={backgroundRef}
        className="absolute w-20 h-20 bg-[#f5f5f5] rounded-full pointer-events-none z-20"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%) scale(0)",
          willChange: "transform",
        }}
      />

      <div
        ref={cursor}
        className="cursor h-10 w-10 bg-gray-300 rounded-full absolute pointer-events-none z-15 mix-blend-difference"
        style={{ left: 0, top: 0 }}
      ></div>

      <div className="relative z-10">
        <p className="text-8xl text-center mix-blend-difference">
          We don't overthink
        </p>
      </div>

      <div ref={imageContainerRef} className="leading-none relative z-10">
        <CardContainer className="inter-var">
          <CardBody className="relative group/card dark:hover:shadow-2xl items-center dark:bg-black w-auto h-auto rounded-xl">
            <CardItem translateZ="150">
              <Image
                src="/images/3dImage.png"
                height={400}
                width={400}
                className="h-70 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>

      <div className="flex items-center justify-center mix-blend-exclusion text-8xl relative z-10">
        <p>We overdeliver.</p>
      </div>

      <div className="flex flex-col gap-6 w-full mt-8 relative z-10">
        <div className="h-0.5 bg-black w-full mb-2"></div>
        <div className="h-1 bg-black w-full mb-4"></div>
        <div className="h-5 bg-black w-full mb-6"></div>
        <div className="h-16 bg-black w-full"></div>
      </div>
    </div>
  );
}
