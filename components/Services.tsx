"use client";

import React, { useEffect, useRef, useState } from "react";

const ServiceCard = ({ icon, title, description, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Dynamically import gsap only on client side
    import("gsap").then((gsapModule) => {
      const gsap = gsapModule.default;

      // Animate card sliding up from nothing (complete opacity 0 to 1)
      gsap.fromTo(
        cardRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          
          // ease: 'power3.in',
          y: 0,
          opacity: 1,
          duration: 0.4,
          delay: index * 2,
          scrollTrigger: {
            trigger: cardRef.current,
            pin: true, // pin the trigger element while active
            start: "bottom bottom", // when the top of the trigger hits the top of the viewport
            end: "bottom bottom", // end after scrolling 500px beyond the start
            // markers: true,
            scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
            snap: {
              snapTo: "labels", // snap to the closest label in the timeline
              duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
              delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
              // ease: "power1.inOut", // the ease of the snap animation ("power3" by default)
            },
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

const AnimatedIcon1 = ({ isHovered }) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
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

const AnimatedIcon2 = ({ isHovered }) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
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

const AnimatedIcon3 = ({ isHovered }) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
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

const AnimatedIcon4 = ({ isHovered }) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
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

const AnimatedIcon5 = ({ isHovered }) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
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

const AnimatedIcon6 = ({ isHovered }) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
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

const Services = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    // Animate title
    import("gsap").then((gsapModule) => {
      const gsap = gsapModule.default;
      gsap.fromTo(
        titleRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
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
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-between px-20">
      <section className="px-8 py-16 w-full flex justify-between">
        <h1
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold mb-16 opacity-0"
        >
          Services
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl lg:grid-cols-3 gap-x-12 gap-y-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;
