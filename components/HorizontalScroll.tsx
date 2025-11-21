"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Card from "./Card";

export default function HorizontalScroll() {
  const data = [
    {
      title: "2D Animation",
      content: "https://assets.aceternity.com/templates/startup-1.webp",
    },
    {
      title: "Scripting And Storytelling",
      content: "https://assets.aceternity.com/pro/hero-sections.png",
    },
    {
      title: "Motion Design",
      content: "https://assets.aceternity.com/pro/hero-sections.png",
    },
    {
      title: "Web Design",
      content: "https://assets.aceternity.com/pro/hero-sections.png",
    },
    {
      title: "Organic Growth",
      content: "https://assets.aceternity.com/pro/hero-sections.png",
    },
    {
      title: "Social Media Marketing",
      content: "https://assets.aceternity.com/pro/hero-sections.png",
    },
    {
      title: "Content Strategy",
      content: "https://assets.aceternity.com/pro/hero-sections.png",
    },
  ];

  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Calculate translation based on screen size
    const getTranslateX = () => {
      if (window.innerWidth < 768) {
        return "-400vw"; // Mobile
      } else if (window.innerWidth < 1024) {
        return "-400vw"; // Tablet
      } else {
        return "-400vw"; // Desktop
      }
    };

    // Calculate scroll distance based on screen size
    const getScrollEnd = () => {
      if (window.innerWidth < 768) {
        return "2500 top"; // Mobile
      } else if (window.innerWidth < 1024) {
        return "2200 top"; // Tablet
      } else {
        return "1900 top"; // Desktop
      }
    };

    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: getTranslateX(),
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
        },
      }
    );

    return () => {
      pin.kill();
    };
  }, [isMobile]);

  return (
    <section className="scroll-section-outer overflow-hidden">
      <div ref={triggerRef}>
        <div className="py-10 md:py-20 px-4">
          <p className="text-4xl md:text-6xl lg:text-8xl font-bold text-center mb-4 md:mb-8">
            Our Services
          </p>
          <div className="flex items-center gap-4 md:gap-10 justify-center px-4">
            <div className="bg-black h-0.5 md:h-1 w-1/4"></div>
            <p className="text-lg md:text-2xl lg:text-3xl text-center whitespace-nowrap">
              What We Do
            </p>
            <div className="bg-black h-0.5 md:h-1 w-1/4"></div>
          </div>
        </div>
        <div ref={sectionRef} className="flex scroll-section-inner">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex  justify-center h-screen w-screen flex-shrink-0 px-4 md:px-10"
            >
              <Card title={item.title} content={item.content} />
            </div>
          ))}
        </div>
      </div>
      <div className="h-screen"></div>
    </section>
  );
}
