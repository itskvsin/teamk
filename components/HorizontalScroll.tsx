"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Card from "./Demo";
import { easeInOut } from "motion";

export default function HorizontalScroll() {
  const data = [
    {
      title: "2D Animation",
      content: "https://assets.aceternity.com/templates/startup-1.webp",
    },
    {
      title: "Scripting And Storytelling",
      content: "https://assets.aceternity.com/pro/hero-sections.png"
    },
    {
      title: "Motion Design",
      content: "https://assets.aceternity.com/pro/hero-sections.png"
    },
    {
      title: "Web Design",
      content: "https://assets.aceternity.com/pro/hero-sections.png"
    },
    {
      title: "Organic Growth",
      content: "https://assets.aceternity.com/pro/hero-sections.png"
    },
    {
      title: "Social Media Marketing",
      content: "https://assets.aceternity.com/pro/hero-sections.png"
    },
    {
      title: "Content Strategy",
      content: "https://assets.aceternity.com/pro/hero-sections.png"
    },
  ];
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: "-240vw",
        ease: easeInOut,
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "1900 top",
          scrub: 0.6,
          pin: true,
        },
      }
    );

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <section className="scroll-section-outer">
      <div>
        <p className="text-8xl font-bold text-center mb-8">Our Services</p>
        <div className="flex items-center gap-10 justify-center">
            <div className="bg-black h-1 w-1/4"></div><p className="text-3xl text-center">What We Do</p><div className="bg-black h-1 w-1/4"></div>
        </div>
      </div>
      <div ref={triggerRef}>
        <div ref={sectionRef} className="scroll-section-inner">
          {data.map((item, index) => (
            // <div
            //   key={index}
            //   className="flex flex-col items-center justify-center pt-10 md:pt-40 md:gap-10"
            // >
            //   <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
            //     {/* <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
            //       <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
            //     </div> */}
            //     <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500 ">
            //       {item.title}
            //     </h3>
            //   </div>

            //   <div className="relative pl-20 pr-4 md:pl-4 w-full">
            //     <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
            //       {item.title}
            //     </h3>
            //     {item.content}{" "}
            //   </div>
            // </div>
            <div
              key={index}
              className="flex items-center justify-center h-screen w-full pr-10"
            >
              <Card title={item.title} content={item.content} />{" "}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

//   <div className="scroll-section">
{
  /* <h3>{data.title}</h3> */
}
{
  /* </div> */
}
//   <div className="scroll-section">
{
  /* <h3>Section 2</h3> */
}
{
  /* </div> */
}
//   <div className="scroll-section">
{
  /* <h3>Section 3</h3> */
}
{
  /* </div> */
}
