"use client";

import React, { JSX, useEffect, useRef, useState } from "react";

let gsap: any = null;
let ScrollTrigger: any = null;

const loadGSAP = async () => {
  if (!gsap) {
    const gsapModule = await import("gsap");
    gsap = gsapModule.default;
    const st = await import("gsap/ScrollTrigger");
    ScrollTrigger = st.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
  }
};

// ------------------------------------------------------
// TYPES
// ------------------------------------------------------
interface ServiceCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
  index: number;
}

interface HoverIconProps {
  isHovered?: boolean;
}

// ------------------------------------------------------
// SERVICE CARD
// ------------------------------------------------------
const ServiceCard = ({ icon, title, description, index }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    loadGSAP().then(() => {
      if (!cardRef.current) return;

      gsap.fromTo(
        cardRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: index * 2,
          scrollTrigger: {
            trigger: cardRef.current,
            pin: true,
            start: "center center",
            end: "bottom bottom",
            scrub: 1,
            // snap: {
            //   snapTo: "labels",
            //   duration: { min: 0.2, max: 3 },
            //   delay: 0.2,
            // },
          },
        }
      );
    });
  }, [index]);

  return (
    <div
      className="overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={cardRef}
        className="flex flex-col h-70 items-start gap-4 p-6 opacity-0"
      >
        <div className="w-16 h-16 flex items-center justify-center">
          {React.cloneElement(icon, { isHovered })}
        </div>

        <h3 className="text-xl font-semibold text-gray-900 capitalize">
          {title}
        </h3>

        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

// ------------------------------------------------------
// ICONS (NO LOGIC CHANGED — ONLY ADDED TYPES)
// ------------------------------------------------------

const AnimatedIcon1 = ({ isHovered = false }: HoverIconProps) => (
  <svg width="64" height="64" viewBox="0 0 64 64">
    <circle
      cx="32"
      cy="24"
      r="10"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      style={{
        transition: "all 0.4s ease",
        transform: isHovered ? "scale(1.1)" : "scale(1)",
      }}
    />
    <circle
      cx="32"
      cy="32"
      r="18"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      style={{
        transition: "all 0.5s ease",
        transform: isHovered ? "scale(0.95)" : "scale(1)",
        transformOrigin: "center",
      }}
    />
  </svg>
);

const AnimatedIcon2 = ({ isHovered = false }: HoverIconProps) => (
  <svg width="64" height="64" viewBox="0 0 64 64">
    <circle
      cx="38"
      cy="26"
      r="10"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      style={{
        transition: "all 0.4s ease",
        transform: isHovered ? "translate(-3px, -3px)" : "translate(0, 0)",
      }}
    />
    <circle
      cx="26"
      cy="38"
      r="10"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      style={{
        transition: "all 0.4s ease",
        transform: isHovered ? "translate(3px, 3px)" : "translate(0, 0)",
      }}
    />
  </svg>
);

const AnimatedIcon3 = ({ isHovered = false }: HoverIconProps) => (
  <svg width="64" height="64" viewBox="0 0 64 64">
    <ellipse
      cx="32"
      cy="32"
      rx="14"
      ry="10"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      transform="rotate(-30 32 32)"
      style={{
        transition: "all 0.5s ease",
        transform: isHovered ? "rotate(-45deg)" : "rotate(-30deg)",
        transformOrigin: "center",
      }}
    />
    <ellipse
      cx="32"
      cy="32"
      rx="14"
      ry="10"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      transform="rotate(30 32 32)"
      style={{
        transition: "all 0.5s ease",
        transform: isHovered ? "rotate(45deg)" : "rotate(30deg)",
        transformOrigin: "center",
      }}
    />
  </svg>
);

const AnimatedIcon4 = ({ isHovered = false }: HoverIconProps) => (
  <svg width="64" height="64" viewBox="0 0 64 64">
    <circle
      cx="32"
      cy="32"
      r="6"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      style={{
        transition: "all 0.4s ease",
        transform: isHovered ? "scale(1.3)" : "scale(1)",
        transformOrigin: "center",
      }}
    />
    <circle
      cx="32"
      cy="32"
      r="12"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      style={{
        transition: "all 0.5s ease",
        opacity: isHovered ? 0.6 : 1,
      }}
    />
    <circle
      cx="32"
      cy="32"
      r="18"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      style={{
        transition: "all 0.6s ease",
        transform: isHovered ? "scale(1.1)" : "scale(1)",
        opacity: isHovered ? 0.4 : 1,
        transformOrigin: "center",
      }}
    />
  </svg>
);

const AnimatedIcon5 = ({ isHovered = false }: HoverIconProps) => (
  <svg width="64" height="64" viewBox="0 0 64 64">
    <circle
      cx="32"
      cy="32"
      r="6"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      style={{
        transition: "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        transform: isHovered ? "rotate(180deg)" : "rotate(0deg)",
        transformOrigin: "center",
      }}
    />
    <circle
      cx="32"
      cy="32"
      r="12"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      style={{
        transition: "all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        transform: isHovered ? "rotate(-180deg)" : "rotate(0deg)",
        transformOrigin: "center",
      }}
    />
    <circle
      cx="32"
      cy="32"
      r="18"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      style={{
        transition: "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        transform: isHovered ? "rotate(180deg)" : "rotate(0deg)",
        transformOrigin: "center",
      }}
    />
  </svg>
);

const AnimatedIcon6 = ({ isHovered = false }: HoverIconProps) => (
  <svg width="64" height="64" viewBox="0 0 64 64">
    <circle
      cx="32"
      cy="32"
      r="6"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      style={{
        transition: "all 0.4s ease",
        transform: isHovered ? "scale(0.8)" : "scale(1)",
        transformOrigin: "center",
      }}
    />
    <circle
      cx="32"
      cy="32"
      r="12"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      style={{
        transition: "all 0.5s ease",
        transform: isHovered ? "scale(1.15)" : "scale(1)",
        transformOrigin: "center",
      }}
    />
    <circle
      cx="32"
      cy="32"
      r="18"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      style={{
        transition: "all 0.6s ease",
        transform: isHovered ? "scale(0.9)" : "scale(1)",
        transformOrigin: "center",
      }}
    />
  </svg>
);

// ------------------------------------------------------
// SERVICES
// ------------------------------------------------------
const Services = () => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    loadGSAP().then(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            pin: true,
            start: "bottom bottom",
            end: "bottom bottom",
            scrub: 1,
            // snap: {
            //   snapTo: "labels",
            //   duration: { min: 0.2, max: 3 },
            //   delay: 0.2,
            // },
          },
        }
      );
    });
  }, []);

  const services = [
    {
      icon: <AnimatedIcon1 />,
      title: "Social Media Marketing",
      description:
        "Key to standout success. We shape unique brand identities that last and resonate in dynamic evolved and competitive markets.",
    },
    {
      icon: <AnimatedIcon2 />,
      title: "content strategy",
      description:
        "Essential for user loyalty. We design intuitive interfaces that boost business growth and brings creative concepts to life.",
    },
    {
      icon: <AnimatedIcon3 />,
      title: "brand identity",
      description:
        "Design drives business growth. We offer collaborative design maintenance to amplify teams capabilities, ensuring a seamless flow from concept to execution.",
    },
    {
      icon: <AnimatedIcon4 />,
      title: "video production",
      description:
        "Digital presence matters. We deliver a spectrum of web solutions, from one-page landing sites to full-scale corporate websites.",
    },
    {
      icon: <AnimatedIcon5 />,
      title: "2d animation",
      description:
        "Digital presence matters. We deliver a spectrum of web solutions, from one-page landing sites to full-scale corporate websites.",
    },
    {
      icon: <AnimatedIcon6 />,
      title: "scripting & storytelling",
      description:
        "Digital presence matters. We deliver a spectrum of web solutions, from one-page landing sites to full-scale corporate websites.",
    },
  ];

  return (
    <div className="min-h-screen relative bg-[#f5f5f5] flex items-center justify-between px-20">
      <section className="px-8  py-16 w-full lg:gap-20 flex justify-between">
        <h1
          ref={titleRef}
          className="text-5xl sticky top-10 md:text-6xl font-bold mb-16 opacity-0"
        >
          Services
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl lg:grid-cols-3 gap-x-12 gap-y-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              description={service.description}
              index={index}
              title={service.title}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;
