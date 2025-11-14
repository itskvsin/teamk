"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const cursor = useRef(null);
  const heroRef = useRef(null);

  useGSAP(() => {
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor.current, {
        x: e.clientX - 40, // Subtract half of cursor width (80px / 2)
        y: e.clientY - 40, // Subtract half of cursor height (80px / 2)
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2 - 40;
      const centerY = rect.top + rect.height / 2 - 40;

      gsap.to(cursor.current, {
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

      // Magnetic effect - pull towards center with reduced strength
      const deltaX = (e.clientX - centerX) * 0.3;
      const deltaY = (e.clientY - centerY) * 0.3;

      gsap.to(cursor.current, {
        x: centerX + deltaX - 40,
        y: centerY + deltaY - 40,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // Add global mouse move listener
    window.addEventListener("mousemove", moveCursor);

    // Add magnetic effect to interactive elements
    const magneticElements = heroRef.current?.querySelectorAll(".magnetic");
    magneticElements?.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter as EventListener);
      el.addEventListener("mousemove", handleMouseMove as EventListener);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      magneticElements?.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter as EventListener);
        el.removeEventListener("mousemove", handleMouseMove as EventListener);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="h-screen flex flex-col items-center justify-center font-extrabold cursor-none"
    >
      {/* Magnetic Cursor */}
      <div
        ref={cursor}
        className="cursor h-10 w-10 bg-white rounded-full absolute pointer-events-none z-20 mix-blend-difference"
        style={{ left: 0, top: 0 }}
      ></div>

      {/* Part1 */}
      <div className="magnetic">
        <p className="text-8xl text-center">We don't overthink</p>
      </div>

      {/* image */}
      <div className=" magnetic leading-none">
        <CardContainer className="inter-var">
          <CardBody className=" relative group/card dark:hover:shadow-2xl items-center dark:bg-black w-auto h-auto rounded-xl">
            <CardItem translateZ="150">
              <Image
                src="/images/3dImage.png"
                height={350}
                width={350}
                className="h-70 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>

      {/* Part2 */}
      <div className="flex items-center justify-center text-8xl magnetic">
        <p>We overdeliver.</p>
      </div>

      {/* Black Lines */}
      <div className="flex flex-col gap-6 w-full mt-8">
        <div className="h-0.5 bg-black w-full mb-2"></div>
        <div className="h-1 bg-black w-full mb-4"></div>
        <div className="h-5 bg-black w-full mb-6"></div>
        <div className="h-16 bg-black w-full"></div>
      </div>
    </div>
  );
}
