"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const update = () => {
      const dx = mouseX - posX;
      const dy = mouseY - posY;

      posX += dx * 0.18;
      posY += dy * 0.18;

      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      const velocity = Math.min(Math.sqrt(dx * dx + dy * dy), 100);

      const stretch = velocity * 0.01;

      gsap.set(cursor, {
        x: posX,
        y: posY,
        rotation: angle,
        scaleX: 1 + stretch,
        scaleY: 1 - stretch * 0.1,
        transformOrigin: "center",
      });

      // Rubber snap-back when slow
      if (velocity < 0.5) {
        gsap.to(cursor, {
          scaleX: 1,
          scaleY: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.35)",
          overwrite: "auto",
        });
      }
    };

    gsap.ticker.add(update);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(update);
    };
  }, []);

  return <div ref={cursorRef} className="cursor" />;
}
