"use client";

import Image from "next/image";
import React, {
  useState,
  useRef,
  useEffect,
  MouseEvent,
  TouchEvent,
} from "react";
import { testimonialsData } from "@/data/Testimonials";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

// const testimonials: Testimonial[] = [
//   {
//     id: 1,
//     name: "Sarah Johnson",
//     role: "CEO, TechStart",
//     content:
//       "This service transformed our business completely. The attention to detail and professional approach exceeded all expectations.",
//     avatar: "SJ",
//   },
//   {
//     id: 2,
//     name: "Michael Chen",
//     role: "Designer, Creative Co",
//     content:
//       "Outstanding work! The team delivered exactly what we needed, on time and within budget.",
//     avatar: "MC",
//   },
//   {
//     id: 3,
//     name: "Emily Rodriguez",
//     role: "Marketing Director",
//     content:
//       "Incredible results! Our engagement increased by 300% after implementing their solutions.",
//     avatar: "ER",
//   },
//   {
//     id: 4,
//     name: "David Kim",
//     role: "Founder, StartupX",
//     content:
//       "Professional, creative, and reliable. They took our vision and made it better than we imagined.",
//     avatar: "DK",
//   },
//   {
//     id: 5,
//     name: "Lisa Anderson",
//     role: "Product Manager",
//     content:
//       "The best investment we made this year. The ROI has been phenomenal and the support is outstanding.",
//     avatar: "LA",
//   },
//   {
//     id: 6,
//     name: "James Wilson",
//     role: "CTO, InnovateLabs",
//     content:
//       "Technical excellence combined with creative vision. They understand both the art and science.",
//     avatar: "JW",
//   },
// ];

export default function DraggableTestimonials() {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [velocity, setVelocity] = useState<number>(0);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const lastX = useRef<number>(0);
  const lastTime = useRef<number>(0);
  const autoScrollRef = useRef<number | null>(null);

  const extendedTestimonials = [
    ...testimonialsData,
    ...testimonialsData,
    ...testimonialsData,
    ...testimonialsData,
  ];

  // Auto-scroll when not dragging
  useEffect(() => {
    if (!isDragging && velocity === 0 && scrollRef.current) {
      const autoScroll = () => {
        if (scrollRef.current && !isDragging) {
          scrollRef.current.scrollLeft += 1;
          checkAndResetPosition();
        }
        autoScrollRef.current = requestAnimationFrame(autoScroll);
      };

      autoScrollRef.current = requestAnimationFrame(autoScroll);

      return () => {
        if (autoScrollRef.current) cancelAnimationFrame(autoScrollRef.current);
      };
    }
  }, [isDragging, velocity]);

  // Momentum scrolling
  useEffect(() => {
    if (!isDragging && velocity !== 0 && scrollRef.current) {
      let currentVelocity = velocity;
      const friction = 0.95;

      const animate = () => {
        currentVelocity *= friction;

        if (Math.abs(currentVelocity) < 0.5) {
          setVelocity(0);
          return;
        }

        scrollRef.current!.scrollLeft += currentVelocity;
        checkAndResetPosition();
        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }
  }, [isDragging, velocity]);

  const checkAndResetPosition = () => {
    if (!scrollRef.current) return;

    const singleSetWidth = scrollRef.current.scrollWidth / 4;
    const currentScroll = scrollRef.current.scrollLeft;

    if (currentScroll >= singleSetWidth * 3) {
      scrollRef.current.scrollLeft = currentScroll - singleSetWidth * 2;
    } else if (currentScroll <= singleSetWidth) {
      scrollRef.current.scrollLeft = currentScroll + singleSetWidth * 2;
    }
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;

    setIsDragging(true);
    setVelocity(0);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);

    lastX.current = e.pageX;
    lastTime.current = Date.now();
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;

    setIsDragging(true);
    setVelocity(0);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);

    lastX.current = e.touches[0].pageX;
    lastTime.current = Date.now();
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();

    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;

    const now = Date.now();
    const timeDelta = now - lastTime.current;
    const distance = e.pageX - lastX.current;

    if (timeDelta > 0) {
      setVelocity((distance / timeDelta) * 10);
    }

    lastX.current = e.pageX;
    lastTime.current = now;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;

    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;

    const now = Date.now();
    const timeDelta = now - lastTime.current;
    const distance = e.touches[0].pageX - lastX.current;

    if (timeDelta > 0) {
      setVelocity((distance / timeDelta) * 10);
    }

    lastX.current = e.touches[0].pageX;
    lastTime.current = now;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    checkAndResetPosition();
  };

  return (
    <div className="min-h-5/6 bg-[#f5f5f5] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Testimonials
          </h2>
          <h1 className="text-5xl font-bold text-black mb-4">
            What Our Clients Say
          </h1>
        </div>

        <div
          ref={scrollRef}
          className={`overflow-x-hidden ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          } select-none`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleDragEnd}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex gap-6 py-8 overflow-x-auto snap-x snap-mandatory md:overflow-visible">
            {extendedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="shrink-0 snap-center flex w-[85vw] md:w-2/4 h-auto md:h-[50vh] bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200"
                style={{ userSelect: "none" }}
              >
                <div className="flex flex-col md:flex-row w-full gap-4">
                  {/* IMAGE */}
<div
  className={`w-full md:w-2/4 h-96 md:h-full rounded-lg bg-no-repeat bg-top bg-cover`}
  style={{ backgroundImage: `url(${testimonial.image})` }}
></div>


                  {/* TEXT SECTION */}
                  <div className="w-full md:w-2/4 flex flex-col gap-4">
                    <div>
                      <h3 className="text-black font-semibold text-lg">
                        {testimonial.client}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {testimonial.title}
                      </p>
                    </div>

                    <p className="text-gray-700 leading-relaxed text-base">
                      "{testimonial.content}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
