"use client";

import { JSX, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import HeroHeading from "./hero/HeroHeading";
import HeroImage from "./hero/HeroImage";
import HeroMorphingText from "./hero/HeroMorphingText";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Hero(): JSX.Element {
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fade background from black to white immediately on render
  useEffect(() => {
    if (heroContainerRef.current) {
      gsap.fromTo(
        heroContainerRef.current,
        { backgroundColor: "#000000" },
        {
          backgroundColor: "#ffffff",
          duration: 0.3,
          ease: "power2.out",
        }
      );
    }
  }, []);

  // Ensure wrapper is visible by default
  useGSAP(() => {
    if (wrapperRef.current) {
      gsap.set(wrapperRef.current, { opacity: 1 });
    }
  });

  const gradientBgRef = useRef<HTMLDivElement>(null);
  const gridOverlayRef = useRef<HTMLDivElement>(null);

  // Animated gradient background - orange and white, only on borders, constantly moving
  useEffect(() => {
    const gradientBg = gradientBgRef.current;
    if (!gradientBg) return;

    let animationId: number;
    let time = 0;

    const animateGradient = () => {
      time += 0.01;
      
      // Synchronized movement along edges - all gradients move together
      // Top edge: left to right
      const topX = (Math.sin(time) * 0.5 + 0.5) * 100; // 0% to 100%
      const topY = 0;
      
      // Right edge: top to bottom
      const rightX = 100;
      const rightY = (Math.sin(time) * 0.5 + 0.5) * 100; // 0% to 100%
      
      // Bottom edge: right to left
      const bottomX = (Math.sin(time + Math.PI) * 0.5 + 0.5) * 100; // 100% to 0%
      const bottomY = 100;
      
      // Left edge: bottom to top
      const leftX = 0;
      const leftY = (Math.sin(time + Math.PI) * 0.5 + 0.5) * 100; // 100% to 0%

      gradientBg.style.background = `
        radial-gradient(circle 1200px at ${topX}% ${topY}%, rgba(255, 165, 0, 0.17) 0%, transparent 70%),
        radial-gradient(circle 1200px at ${rightX}% ${rightY}%, rgba(255, 200, 100, 0.17) 0%, transparent 70%),
        radial-gradient(circle 1200px at ${bottomX}% ${bottomY}%, rgba(255, 220, 150, 0.17) 0%, transparent 70%),
        radial-gradient(circle 1200px at ${leftX}% ${leftY}%, rgba(255, 165, 0, 0.17) 0%, transparent 70%)
      `;

      animationId = requestAnimationFrame(animateGradient);
    };

    animateGradient();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  // Dynamic grid overlay - trail effect, only visible where mouse is
  useEffect(() => {
    const gridOverlay = gridOverlayRef.current;
    const heroContainer = heroContainerRef.current;
    if (!gridOverlay || !heroContainer) return;

    // Create a canvas for the trail effect
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "1";
    canvas.style.opacity = "0.12"; // Lower opacity
    gridOverlay.appendChild(canvas);

    const resizeCanvas = () => {
      const rect = heroContainer.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let mouseX = 0;
    let mouseY = 0;
    const trail: Array<{ x: number; y: number; opacity: number }> = [];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroContainer.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;      

      // Add point to trail
      trail.push({ x: mouseX, y: mouseY, opacity: 1 });
      if (trail.length > 15) trail.shift(); // Limit trail length
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient for bottom fadeout
      const fadeStart = canvas.height * 0.8; // Start fading at 80% from top
      const fadeEnd = canvas.height;
      
      // Draw grid lines at trail points with fade
      trail.forEach((point, index) => {
        const baseFade = point.opacity * (index / trail.length) * 0.15;
        ctx.strokeStyle = `rgba(0, 0, 0, ${baseFade})`;
        ctx.lineWidth = 1;

        // Draw grid lines around the point
        const gridSize = 50;
        const startX = Math.floor(point.x / gridSize) * gridSize;
        const startY = Math.floor(point.y / gridSize) * gridSize;

        // Vertical line with bottom fadeout
        if (startY < fadeStart) {
          ctx.beginPath();
          ctx.moveTo(startX, 0);
          ctx.lineTo(startX, fadeStart);
          ctx.stroke();
        }
        
        // Fade out section for vertical line
        if (startY < fadeEnd) {
          const gradient = ctx.createLinearGradient(startX, fadeStart, startX, fadeEnd);
          gradient.addColorStop(0, `rgba(0, 0, 0, ${baseFade})`);
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
          ctx.strokeStyle = gradient;
          ctx.beginPath();
          ctx.moveTo(startX, fadeStart);
          ctx.lineTo(startX, fadeEnd);
          ctx.stroke();
        }

        // Horizontal line with bottom fadeout
        const lineY = startY;
        if (lineY < fadeStart) {
          ctx.strokeStyle = `rgba(0, 0, 0, ${baseFade})`;
          ctx.beginPath();
          ctx.moveTo(0, lineY);
          ctx.lineTo(canvas.width, lineY);
          ctx.stroke();
        } else if (lineY < fadeEnd) {
          // Fade out for horizontal line near bottom
          const fadeAmount = 1 - ((lineY - fadeStart) / (fadeEnd - fadeStart));
          ctx.strokeStyle = `rgba(0, 0, 0, ${baseFade * fadeAmount})`;
          ctx.beginPath();
          ctx.moveTo(0, lineY);
          ctx.lineTo(canvas.width, lineY);
          ctx.stroke();
        }
      });

      // Fade out trail points
      trail.forEach((point) => {
        point.opacity = Math.max(0, point.opacity - 0.06);
      });

      requestAnimationFrame(animate);
    };

    animate();

    heroContainer.addEventListener("mousemove", handleMouseMove);

    return () => {
      heroContainer.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div ref={wrapperRef} className="bg-white relative opacity-100">
      <div
        id="home"
        ref={heroContainerRef}
        className="hero-container h-screen w-full pt-20 bg-transparent flex flex-col gap-8 items-center relative overflow-hidden px-6 md:px-12 lg:px-20 z-10"
      >
        {/* Animated gradient background - orange and white, only on borders */}
        <div
          ref={gradientBgRef}
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            opacity: 1,
            filter: "blur(60px)",
            WebkitFilter: "blur(60px)",
          }}
        />

        {/* Dynamic grid overlay - trail effect with fadeout at bottom */}
        <div
          ref={gridOverlayRef}
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            maskImage: "linear-gradient(to bottom, black 0%, black 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 80%, transparent 100%)",
          }}
        />
        {/* Top - Heading with word-by-word reveal */}
        <HeroHeading />
        
        {/* Center - Image with modern hover effect */}
        <HeroImage />
        
        {/* Below image - Morphing text (same size as heading) */}
        <HeroMorphingText />
      </div>
    </div>
  );
}
