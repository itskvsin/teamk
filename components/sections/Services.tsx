"use client";

import React, { JSX, useEffect, useRef, useState } from "react";
import { services } from "@/data/Services";

let gsap: any = null;
let ScrollTrigger: any = null;
let ScrollSmoother: any = null;

const loadGSAP = async () => {
  if (!gsap) {
    const gsapModule = await import("gsap");
    gsap = gsapModule.default;
    const st = await import("gsap/ScrollTrigger");
    ScrollTrigger = st.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
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

// ------------------------------------------------------
// SERVICE CARD
// ------------------------------------------------------
const ServiceCard = ({ icon, title, description, index }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const cardInnerRef = useRef<HTMLDivElement | null>(null); // NEW WRAPPER
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    loadGSAP().then(() => {
      if (!cardInnerRef.current) return;

      gsap.fromTo(
        cardInnerRef.current,
        {
          y: 140,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power4.out",
          delay: index * 0.12,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    });
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="cursor-pointer transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={cardInnerRef}
        className="flex w-full border-b-4 border-dotted sm:border-0 overflow-hidden flex-col py-6 items-start gap-4 lg:p-6 opacity-0 will-change-transform"
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
// SERVICES
// ------------------------------------------------------
const Services = () => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    loadGSAP().then(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Magnetic scroll snap
      ScrollTrigger.create({
        trigger: ".services-section",
        start: "top top",
        end: "bottom bottom",
        snap: {
          snapTo: "labels",
          duration: { min: 0.3, max: 0.6 },
          ease: "power2.inOut",
        },
      });
    });
  }, []);


return (
  <div id="services" className="min-h-screen relative bg-[#f5f5f5] flex items-center justify-center px-4 md:px-12 lg:px-20">
    <section className="services-section px-4 md:px-8 py-16 w-full flex flex-col md:flex-row md:justify-between gap-10">
      <h1
        ref={titleRef}
        className="text-4xl sm:text-5xl md:text-6xl font-bold opacity-0 md:sticky md:top-20"
      >
        Services
      </h1>

      <div className="grid grid-cols-1 md:border-l border-black pt-6 md:pt-0 md:pl-8 md:grid-cols-2 lg:grid-cols-3  w-full max-w-6xl">
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
