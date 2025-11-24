"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [spreading, setSpreading] = useState(false);
  const [showStack, setShowStack] = useState(false);

  // Image cycle
  const images = [
    '/services_illustration/2d_animation.png',
    '/services_illustration/video_editing.png',
    '/services_illustration/content_strategy.png',
    '/services_illustration/motion_design.png',
    '/services_illustration/organic_growth.png',
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    // Show stack before spreading
    const stackTimer = setTimeout(() => {
      setShowStack(true);
    }, 2000);

    // Start spreading
    const spreadTimer = setTimeout(() => {
      setSpreading(true);
      setTimeout(() => setLoading(false), 1800);
    }, 2001);

    if (loading) {
      document.body.style.overflow = "hidden";
    }

    // Faster image cycling - 600ms instead of 900ms
    const interval = setInterval(() => {
      if (loading && !spreading && !showStack) {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }
    }, 300);

    return () => {
      clearTimeout(stackTimer);
      clearTimeout(spreadTimer);
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, [loading, spreading, showStack]);

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {loading && (
        <motion.div
          className="fixed inset-0 z-9999 flex  items-center px-10 justify-between bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >

      <p className="text-white w-1/12 uppercase">Built in India</p>
          <AnimatePresence mode="wait">
            {!showStack && !spreading ? (
              // Phase 1: Cycling images
              <motion.img
                key={currentImage}
                src={images[currentImage]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
                className="w-30 h-46 object-cover rounded-xl shadow-lg"
              />
            ) : showStack && !spreading ? (
              // Phase 2: Stacked cards
              <div className="relative w-30 h-46">
                {images.map((img, index) => (
                  <motion.img
                    key={`stack-${index}`}
                    src={img}
                    initial={{ 
                      y: 0,
                      zIndex: index
                    }}
                    animate={{ 
                      y: index * 8,
                      translateY: index * 8,
                      translateX: index * 12,
                      zIndex: images.length - index
                    }}
                    transition={{ 
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-2xl"
                  />
                ))}
              </div>
            ) : (
              // Phase 3: Spreading animation
              <div className="relative w-3/4 flex items-center justify-center">
                {images.map((img, index) => (
                  <motion.img
                    key={`spread-${index}`}
                    src={img}
                    initial={{ 
                      y: (index - images.length + 1) * -8,
                      opacity: 1
                    }}
                    animate={{ 
                      y: (index - 2) * 180,
                      gap: 10,
                    }}
                    transition={{ 
                      duration: 1,
                      ease: "easeInOut",
                      delay: index * 0.05
                    }}
                    className="absolute w-30 h-40 object-cover rounded-xl shadow-2xl"
                  />

                  
                ))}
              </div>
            )}
          </AnimatePresence>
      <p className="text-white uppercase">Scaling globally.</p>

        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
}
  // A multi-awarded interactive digital studio crafting
  // immersive & interactive experiences for global brands since 2006
  // HUMAN THINKERS
  // DIGITAL MAKERS