"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroMorphingText() {
  const morphingTextRef = useRef<HTMLHeadingElement>(null);
  const [currentMorphingText, setCurrentMorphingText] = useState("DON'T OVERTHINK");

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useGSAP(() => {
    if (morphingTextRef.current) {
      if (prefersReducedMotion) {
        gsap.set(morphingTextRef.current, { y: 0, opacity: 1 });
      } else {
        gsap.set(morphingTextRef.current, { y: 40, opacity: 0 });
      }
    }
  });

  // Listen for loader completion and animate
  useEffect(() => {
    const handleLoaderComplete = () => {
      // Animate morphing text with delay
      setTimeout(() => {
        if (morphingTextRef.current) {
          gsap.fromTo(
            morphingTextRef.current,
            {
              y: 40,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              delay: 0.8,
              ease: "power3.out",
            }
          );
        }
      }, 100);
    };

    // Listen for the custom event
    window.addEventListener("loaderComplete", handleLoaderComplete);

    // Also check if loader is already complete (in case event was missed)
    const checkLoader = () => {
      const loader = document.querySelector('[class*="z-9999"]');
      if (!loader || window.getComputedStyle(loader).display === "none") {
        handleLoaderComplete();
      }
    };

    // Check after a short delay
    const timeout = setTimeout(checkLoader, 500);
    
    // Also trigger immediately if loader is already gone (fallback)
    const immediateCheck = setTimeout(() => {
      if (morphingTextRef.current && morphingTextRef.current.style.opacity === "0") {
        handleLoaderComplete();
      }
    }, 100);

    return () => {
      window.removeEventListener("loaderComplete", handleLoaderComplete);
      clearTimeout(timeout);
      clearTimeout(immediateCheck);
    };
  }, []);

  // Morphing text animation - only the second part cycles with 3D roll
  useEffect(() => {
    const morphingText = morphingTextRef.current;
    if (!morphingText) return;

    const texts = ["DON'T OVERTHINK", "OVERDELIVER"];
    let currentIndex = 0;

    const morphText = () => {
      // Find the span element that contains the changing text
      const changingPart = morphingText.querySelector(".changing-text") as HTMLElement;
      if (!changingPart) return;

      // 3D roll animation - rotate out
      gsap.to(changingPart, {
        opacity: 0,
        rotationX: -90,
        y: -20,
        duration: 0.5,
        ease: "power2.in",
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
        onComplete: () => {
          // Change text
          currentIndex = (currentIndex + 1) % texts.length;
          setCurrentMorphingText(texts[currentIndex]);

          // Reset position for roll in
          gsap.set(changingPart, {
            rotationX: 90,
            y: 20,
          });

          // 3D roll animation - rotate in
          gsap.to(changingPart, {
            opacity: 1,
            rotationX: 0,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000,
            transformStyle: "preserve-3d",
          });
        },
      });
    };

    // Start morphing after initial animation (2.3s delay)
    let intervalId: NodeJS.Timeout;
    const startMorphing = setTimeout(() => {
      intervalId = setInterval(morphText, 3000);
    }, 2300);

    return () => {
      clearTimeout(startMorphing);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="relative z-10 text-center">
      <h2
        ref={morphingTextRef}
        className="font-space-grotesk text-5xl uppercase sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-black leading-tight tracking-tight"
        aria-live="polite"
        aria-atomic="true"
      >
        WE <span className="changing-text inline-block" style={{ transformStyle: "preserve-3d" }}>{currentMorphingText}</span>
      </h2>
    </div>
  );
}

