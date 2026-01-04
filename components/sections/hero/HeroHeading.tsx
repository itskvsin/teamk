"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface HeroHeadingProps {
  onLoaderComplete?: () => void;
}

export default function HeroHeading({ onLoaderComplete }: HeroHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useGSAP(() => {
    // Set initial states for heading
    if (headingRef.current) {
      if (prefersReducedMotion) {
        // If reduced motion, make visible immediately
        gsap.set(headingRef.current, { y: 0, opacity: 1 });
      } else {
        // Set initial state for animation, but ensure visibility
        gsap.set(headingRef.current, { y: 40, opacity: 0 });
        // Immediate fallback to ensure visibility
        const ensureVisible = setTimeout(() => {
          if (headingRef.current) {
            const computed = window.getComputedStyle(headingRef.current);
            if (parseFloat(computed.opacity) < 0.5) {
              gsap.set(headingRef.current, { opacity: 1, y: 0 });
            }
          }
        }, 100);
        // Also check after animation should complete
        const finalCheck = setTimeout(() => {
          if (headingRef.current) {
            gsap.set(headingRef.current, { opacity: 1, y: 0 });
          }
        }, 3000);
        return () => {
          clearTimeout(ensureVisible);
          clearTimeout(finalCheck);
        };
      }
    }
  });

  // Listen for loader completion and animate
  useEffect(() => {
    const handleLoaderComplete = () => {
      // Feature: Word-by-word text reveal
      if (headingRef.current) {
        const words = headingRef.current.textContent?.split(" ") || [];
        headingRef.current.innerHTML = words
          .map((word) => `<span class="word">${word}</span>`)
          .join(" ");

        const wordElements = headingRef.current.querySelectorAll(".word");
        wordElements.forEach((word, index) => {
          gsap.fromTo(
            word as HTMLElement,
            {
              y: 60,
              opacity: 0,
              rotationX: -90,
            },
            {
              y: 0,
              opacity: 1,
              rotationX: 0,
              duration: 0.8,
              delay: index * 0.1,
              ease: "power3.out",
              onComplete: () => {
                // Ensure heading is fully visible after animation
                if (index === wordElements.length - 1) {
                  gsap.set(headingRef.current, { opacity: 1 });
                }
              },
            }
          );
        });
      }
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
      if (headingRef.current && headingRef.current.style.opacity === "0") {
        handleLoaderComplete();
      }
    }, 100);

    return () => {
      window.removeEventListener("loaderComplete", handleLoaderComplete);
      clearTimeout(timeout);
      clearTimeout(immediateCheck);
    };
  }, []);

  return (
    <div className="relative h-[55vh] z-10">
      <h1
        ref={headingRef}
        className="font-space-grotesk text-5xl uppercase sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-black leading-tight tracking-tight"
        style={{ opacity: 1, visibility: "visible" }}
      >
        Hi, We are teamK
      </h1>
    </div>
  );
}

