"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion, AnimatePresence, Transition } from "motion/react";
import { cn } from "@/lib/utils";

interface StickyScrollProps {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}

export const StickyScroll = ({
  content,
  contentClassName,
}: StickyScrollProps) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });

  const cardLength = content.length;

  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, []);

  const backgroundColors = ["#f5f5f5", "#f5f5f5", "#f5f5f5"];
  const linearGradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)",
    "linear-gradient(to bottom right, #ec4899, #6366f1)",
    "linear-gradient(to bottom right, #f97316, #eab308)",
  ];

  const [activeGradientIndex, setActiveGradientIndex] = useState(0);

  useEffect(() => {
    setActiveGradientIndex(activeCard % linearGradients.length);
  }, [activeCard, linearGradients.length]);

  const rafRef = useRef<number | null>(null);
  useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    let closest = 0;
    let bestDistance = Infinity;
    for (let i = 0; i < cardsBreakpoints.length; i++) {
      const d = Math.abs(latest - cardsBreakpoints[i]);
      if (d < bestDistance) {
        bestDistance = d;
        closest = i;
      }
    }

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setActiveCard(closest);
    });
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        setActiveCard((s) => Math.min(cardLength - 1, s + 1));
        if (ref.current) {
          ref.current.scrollTo({
            top: (ref.current.scrollHeight - ref.current.clientHeight) * ((activeCard + 1) / Math.max(1, cardLength - 1)),
            behavior: reduceMotion ? "auto" : "smooth",
          });
        }
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        setActiveCard((s) => Math.max(0, s - 1));
        if (ref.current) {
          ref.current.scrollTo({
            top: (ref.current.scrollHeight - ref.current.clientHeight) * ((activeCard - 1) / Math.max(1, cardLength - 1)),
            behavior: reduceMotion ? "auto" : "smooth",
          });
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cardLength, activeCard, reduceMotion]);

  const springTransition: Transition = reduceMotion
    ? { duration: 0.28 }
    : { type: "spring", stiffness: 160, damping: 22 };

  const [scrollProgress, setScrollProgress] = useState(0);
  
  useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
    setScrollProgress(latest);
  });

  return (
    <div className="h-[60vh] min-h-[800px] relative">
      <motion.div
        animate={{
          backgroundColor: backgroundColors[activeCard % backgroundColors.length],
        }}
        className="relative flex h-[60vh] justify-center space-x-10 overflow-y-auto rounded-md p-10 pb-24 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        ref={ref}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="relative flex justify-start items-start px-4 flex-1 max-w-3xl">
          <div className="w-full">
            {content.map((item, index) => {
              const isActive = activeCard === index;
              const distance = Math.abs(index - activeCard);
              
              return (
                <motion.div
                  key={item.title + index}
                  className="my-6 relative"
                  initial={{ opacity: 0, y: 20, scale: 0.995 }}
                  animate={{
                    opacity: isActive ? 1 : Math.max(0.2, 0.6 - distance * 0.15),
                    y: isActive ? 0 : 8 + distance * 2,
                    scale: isActive ? 1 : 0.98 - distance * 0.01,
                  }}
                  transition={springTransition}
                >
                  <motion.div
                    className="absolute -left-8 top-0 w-1 h-full bg-gradient-to-b from-black/20 via-black/10 to-transparent rounded-full origin-top"
                    animate={{
                      scaleY: isActive ? 1 : 0.2,
                      opacity: isActive ? 1 : 0.2,
                    }}
                    transition={springTransition}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute top-0 left-0 w-full bg-black/40 rounded-full"
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    )}
                  </motion.div>
                  <motion.h2
                    className="text-4xl md:text-5xl font-bold text-black relative group"
                    style={{ 
                      willChange: "transform, opacity",
                    }}
                    animate={{
                      x: isActive ? 0 : -10,
                    }}
                    transition={springTransition}
                  >
                    <motion.span
                      className="absolute -left-12 top-1/2 -translate-y-1/2 text-sm font-normal text-gray-400"
                      animate={{
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 1 : 0.8,
                      }}
                      transition={springTransition}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </motion.span>
                    <span className="inline-block">
                      {item.title}
                    </span>
                  </motion.h2>
                  <motion.div
                    className="mt-6 max-w-4xl"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: isActive ? 1 : Math.max(0.2, 0.5 - distance * 0.1),
                      x: isActive ? 0 : -5,
                    }}
                    transition={springTransition}
                  >
                    <motion.p
                      className="text-lg md:text-xl text-black/80 leading-relaxed"
                    >
                      {item.description}
                    </motion.p>
                    {isActive && (
                      <motion.div
                        className="mt-4 h-0.5 bg-gradient-to-r from-black/20 to-transparent w-24"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 96, opacity: 1 }}
                        transition={{ delay: 0.2, ...springTransition }}
                      />
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
            <div className="h-[70vh]" />
          </div>
        </div>

        <div
          style={{ position: "sticky", top: "5vh" }}
          className={cn(
            "hidden h-[70vh] w-[500px] overflow-hidden rounded-2xl text-black bg-[#f5f5f5] lg:block shrink-0 shadow-2xl border border-black/5",
            contentClassName,
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`grad-${activeGradientIndex}`}
              initial={{ opacity: 0, scale: 1.1, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.95, rotate: -5 }}
              transition={{ duration: reduceMotion ? 0.12 : 0.7, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: 0,
                background: linearGradients[activeGradientIndex],
                zIndex: 0,
              }}
            />
          </AnimatePresence>

          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10 z-[1] pointer-events-none"
            animate={{
              opacity: activeCard === 0 ? 0.3 : activeCard === cardLength - 1 ? 0.5 : 0.4,
            }}
            transition={springTransition}
          />

          <motion.div
            style={{ position: "relative", zIndex: 5, height: "100%", padding: 20, boxSizing: "border-box" }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springTransition}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`content-${activeCard}`}
                initial={{ opacity: 0, y: 20, scale: 0.9, rotateX: -10 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, y: -20, scale: 0.9, rotateX: 10 }}
                transition={{
                  ...springTransition,
                  duration: reduceMotion ? 0.2 : 0.6,
                }}
                className="h-full w-full relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl pointer-events-none"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {content[activeCard].content ?? null}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2.5 items-center bg-black/10 backdrop-blur-sm px-4 py-2 rounded-full">
            {content.map((_, index) => (
              <motion.button
                key={index}
                className={`rounded-full transition-all relative ${
                  activeCard === index ? "bg-white shadow-lg" : "bg-white/50"
                }`}
                animate={{
                  scale: activeCard === index ? 1.3 : 1,
                  width: activeCard === index ? 32 : 8,
                  height: 8,
                }}
                transition={springTransition}
                onClick={() => {
                  if (ref.current) {
                    const scrollHeight = ref.current.scrollHeight - ref.current.clientHeight;
                    const targetScroll = (scrollHeight / (cardLength - 1)) * index;
                    ref.current.scrollTo({
                      top: targetScroll,
                      behavior: reduceMotion ? "auto" : "smooth",
                    });
                  }
                }}
                aria-label={`Go to service ${index + 1}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeCard === index && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white"
                    layoutId="activeDot"
                    transition={springTransition}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="absolute top-4 right-4 z-20 hidden lg:block">
        <motion.div 
          className="bg-white/90 backdrop-blur-md rounded-full px-5 py-2.5 shadow-xl border border-black/5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={springTransition}
        >
          <span className="text-sm font-semibold text-black flex items-center gap-2">
            <motion.span
              key={activeCard}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {String(activeCard + 1).padStart(2, "0")}
            </motion.span>
            <span className="text-black/30">/</span>
            <span className="text-black/60">{String(cardLength).padStart(2, "0")}</span>
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default StickyScroll;

