"use client";

import ReactLenis, { useLenis } from "lenis/react";

export default function SmoothScrollingWrapper({ children }: any) {
  const lenisOptions = {
    lerp: 0.1, // Adjust for desired smoothness
    duration: 1.5,
    smoothTouch: false, // Enable/disable smooth scroll for touch devices
    smooth: true,
  };

  return (
    <ReactLenis root options={lenisOptions}>
        {children}
    </ReactLenis>
  )
}
