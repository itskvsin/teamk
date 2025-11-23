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
    "/images/3dImage.png",
    "/images/image_(2).png",
    "/images/image__2_-removebg-preview.png",
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    // Show stack before spreading
    const stackTimer = setTimeout(() => {
      setShowStack(true);
    }, 2600);

    // Start spreading
    const spreadTimer = setTimeout(() => {
      setSpreading(true);
      setTimeout(() => setLoading(false), 1000);
    }, 3000);

    if (loading) {
      document.body.style.overflow = "hidden";
    }

    // Faster image cycling - 600ms instead of 900ms
    const interval = setInterval(() => {
      if (loading && !spreading && !showStack) {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }
    }, 600);

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
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          <AnimatePresence mode="wait">
            {!showStack && !spreading ? (
              // Phase 1: Cycling images
              <motion.img
                key={currentImage}
                src={images[currentImage]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
                className="w-40 h-56 object-cover rounded-xl shadow-lg"
              />
            ) : showStack && !spreading ? (
              // Phase 2: Stacked cards
              <div className="relative w-40 h-56">
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
                      translateY: index *4,
                      translateX: index * 4,
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
              <div className="relative w-full h-full flex items-center justify-center">
                {images.map((img, index) => (
                  <motion.img
                    key={`spread-${index}`}
                    src={img}
                    initial={{ 
                      y: (index - images.length + 1) * -8,
                      // rotate: (index - 1) * 3,
                      // scale: 1 - (images.length - index - 1) * 0.03,
                      opacity: 1
                    }}
                    animate={{ 
                      y: (index - 1) * 280,
                      // rotate: 0,
                      // scale: 0.85,
                      // opacity: 0.3
                    }}
                    transition={{ 
                      duration: 1,
                      ease: "easeInOut",
                      // delay: index * 0.05
                    }}
                    className="absolute w-40 h-56 object-cover rounded-xl shadow-2xl"
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
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