"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const trackCursor = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = trackCursor.current;

    let lastX = 0;
    let lastY = 0;
    let resetTimeout: number;

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;

      // Movement vector
      const dx = clientX - lastX;
      const dy = clientY - lastY;

      lastX = clientX;
      lastY = clientY;

      // Movement angle (radians → degrees)
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      // Cursor speed
      const speed = Math.min(Math.sqrt(dx * dx + dy * dy), 100);

      // Stretch amount
      const stretch = 1 + speed * 0.02; // how long the cursor becomes

      // Direction-aware stretching
      gsap.to(cursor, {
        rotation: angle,
        scaleX: stretch,
        scaleY: 1 - speed * 0.001, // slightly thinner
        // transformOrigin: "center",
        duration: 0.15,
        ease: "power2.out",
      });

      // Cursor follow movement
      gsap.to(cursor, {
        x: clientX - 12,
        y: clientY - 12,
        duration: 0.3,
        ease: "power3.out",
      });

      // Reset shape after movement stops
      clearTimeout(resetTimeout);
      resetTimeout = window.setTimeout(() => {
        gsap.to(cursor, {
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
          duration: 0.4,
          ease: "power4.in",
        });
      }, 80);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(resetTimeout);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={trackCursor}
      id="cursor"
      className="fixed pointer-events-none z-9999 h-5 w-5 rounded-full bg-white mix-blend-difference top-0 left-0"
    />
  );
}
