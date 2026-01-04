"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function HeroImage() {
  const imageRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useGSAP(() => {
    if (imageRef.current && !prefersReducedMotion) {
      gsap.set(imageRef.current, { y: 40, opacity: 0 });
    }

    // Set initial state for button
    if (buttonRef.current) {
      gsap.set(buttonRef.current, {
        opacity: 0,
        scale: 0.8,
      });
    }
  });

  // Listen for loader completion and animate
  useEffect(() => {
    const handleLoaderComplete = () => {
      // Animate image with delay
      setTimeout(() => {
        if (imageRef.current) {
          gsap.fromTo(
            imageRef.current,
            {
              y: 40,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              delay: 0.5,
              ease: "power3.out",
            }
          );
        }
      }, 100);
    };

    // Listen for the custom event
    window.addEventListener("loaderComplete", handleLoaderComplete);

    // Also check if loader is already complete (in case event was missed)
    const checkLoader = () => {
      const loader = document.querySelector('[class*="z-9999"]');
      if (!loader || window.getComputedStyle(loader).display === "none") {
        handleLoaderComplete();
      }
    };

    // Check after a short delay
    const timeout = setTimeout(checkLoader, 500);
    
    // Also trigger immediately if loader is already gone (fallback)
    const immediateCheck = setTimeout(() => {
      if (imageRef.current && imageRef.current.style.opacity === "0") {
        handleLoaderComplete();
      }
    }, 100);

    return () => {
      window.removeEventListener("loaderComplete", handleLoaderComplete);
      clearTimeout(timeout);
      clearTimeout(immediateCheck);
    };
  }, []);

  // Button follows mouse movement relative to image
  useEffect(() => {
    const imageContainer = imageContainerRef.current;
    const button = buttonRef.current;
    if (!imageContainer || !button) return;

    let isHovering = false;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseEnter = () => {
      isHovering = true;
      setIsButtonVisible(true);
      
      // Fade in button
      gsap.to(button, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      isHovering = false;
      setIsButtonVisible(false);
      
      // Fade out button
      gsap.to(button, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering || !imageContainer || !button) return;

      const rect = imageContainer.getBoundingClientRect();
      const buttonWidth = button.offsetWidth || 140;
      const buttonHeight = button.offsetHeight || 50;
      
      // Calculate target position (mouse position relative to container)
      // Offset by half button size to center it on cursor
      targetX = e.clientX - rect.left - buttonWidth / 2;
      targetY = e.clientY - rect.top - buttonHeight / 2;
      
      // Clamp to container bounds
      targetX = Math.max(0, Math.min(targetX, rect.width - buttonWidth));
      targetY = Math.max(0, Math.min(targetY, rect.height - buttonHeight));
    };

    // Smooth animation loop
    const animateButton = () => {
      if (isHovering) {
        // Smooth interpolation
        currentX += (targetX - currentX) * 0.15;
        currentY += (targetY - currentY) * 0.15;

        gsap.set(button, {
          left: `${currentX}px`,
          top: `${currentY}px`,
        });
      }

      requestAnimationFrame(animateButton);
    };

    animateButton();

    imageContainer.addEventListener("mouseenter", handleMouseEnter);
    imageContainer.addEventListener("mouseleave", handleMouseLeave);
    imageContainer.addEventListener("mousemove", handleMouseMove);

    return () => {
      imageContainer.removeEventListener("mouseenter", handleMouseEnter);
      imageContainer.removeEventListener("mouseleave", handleMouseLeave);
      imageContainer.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Button click handler - scroll to contact
  const handleButtonClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: contactSection,
          offsetY: 0,
        },
        ease: "power2.inOut",
      });
    }
  };

  return (
    <div ref={imageRef} className="absolute top-40 left-1/2 -translate-x-1/2 z-10">
      <div
        ref={imageContainerRef}
        className="relative z-10"
      >
        <div className="relative overflow-hidden rounded-xl">
          <Image
            src="/images/joining_hands.png"
            height={500}
            width={500}
            className="h-50 w-50 sm:h-62 sm:w-62 md:h-64 md:w-64 lg:h-76 lg:w-80 object-contain rounded-xl"
            alt="thumbnail"
          />
        </div>

        {/* Button that appears from center to right on hover */}
        <button
          ref={buttonRef}
          onClick={handleButtonClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleButtonClick();
            }
          }}
          className="absolute bg-black text-white font-space-grotesk font-semibold text-sm uppercase tracking-wider px-6 py-3 rounded-full whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 z-[50] pointer-events-none"
          style={{ 
            zIndex: 50,
            opacity: isButtonVisible ? 1 : 0,
            pointerEvents: isButtonVisible ? "auto" : "none",
          }}
          aria-label="Get started - navigate to contact section"
          tabIndex={isButtonVisible ? 0 : -1}
        >
          GET STARTED
        </button>
      </div>
    </div>
  );
}

