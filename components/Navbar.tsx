"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Work from "@/components/sections/Work";
import Hero from "@/components/sections/Hero";
import ContactUs from "./sections/ContactUs";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const navLinksRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    const logo = logoRef.current;
    const navLinks = navLinksRef.current;
    const footer = footerRef.current;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions!;

        // ===========================
        // DESKTOP
        // ===========================
        if (isDesktop) {
          // Soft drag of navbar ONLY
          const tlScroll = gsap.timeline({
            scrollTrigger: {
              trigger: footer,
              start: "top bottom",
              end: "top 40%", // navbar moves only until mid-range
              scrub: 1.2,
            },
          });

          tlScroll.to(nav, { y: 120, duration: 1, ease: "power2.out" }, 0)
                 .to(navLinks, { opacity: 0, y: -30, duration: 0.4 }, 0);

          // Final scale + reposition ONLY at final scroll stage
          const tlFinal = gsap.timeline({
            scrollTrigger: {
              trigger: footer,
              start: "top 40%", // start much later
              end: "top top",
              scrub: 1.5,
            },
          });

          tlFinal.to(logo, {
            scale: 7,
            x: -90,
            y: 120,
            duration: 1.2,
            ease: "power3.out",
          });

          return () => {
            tlScroll.kill();
            tlFinal.kill();
          };
        }

        // ===========================
        // MOBILE — No drag / No scaling based on screen
        // ===========================
        if (isMobile) {
          const tlMobile = gsap.timeline({
            scrollTrigger: {
              trigger: footer,
              start: "top bottom",
              end: "top 85%",
              scrub: false,
              toggleActions: "play reverse play reverse",
            },
          });

          tlMobile.to(nav, { y: 40, duration: 0.4, ease: "power2.out" }, 0)
                  .to(navLinks, { opacity: 0, y: -20, duration: 0.3 }, 0);

          return () => tlMobile.kill();
        }
      }
    );

    return () => {
      mm.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* NAVBAR */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-8 py-4 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div
            ref={logoRef}
            className="text-black transition-all duration-300 origin-left"
          >
            <Image
              src="/images/logo_no_bg.png"
              width={100}
              height={100}
              alt="logo of team k"
            />
          </div>

          <div
            ref={navLinksRef}
            className="hidden md:flex text-lg gap-8 items-center"
          >
            <a href="#home" className="nav-item text-black hover:text-gray-600">Home</a>
            <a href="#about" className="nav-item text-black hover:text-gray-600">About</a>
            <a href="#services" className="nav-item text-black hover:text-gray-600">Services</a>
            <a href="#contact" className="nav-item text-black hover:text-gray-600">Contact</a>
          </div>
        </div>
      </nav>

      {/* MAIN SECTIONS */}
      <Hero />
      <Services />
      <Testimonials />
      <Work />
      <ContactUs />

      {/* FOOTER */}
      <footer
        ref={footerRef}
        className="min-h-screen w-full bg-[#f5f5f5] px-8 flex items-end justify-between py-20"
      >
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-1"></div>

            <div className="flex flex-col items-end">
              <h3 className="text-xl font-bold text-black mb-4">About Us</h3>
              <p className="text-black/80 leading-relaxed w-2/3 text-right">
                We create compelling video content that captivates audiences and drives results.
              </p>
            </div>

            <div className="text-right">
              <h3 className="text-xl font-bold text-black mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#home" className="text-black/80 hover:text-black">Home</a></li>
                <li><a href="#about" className="text-black/80 hover:text-black">About Us</a></li>
                <li><a href="#contact" className="text-black/80 hover:text-black">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-black pt-12 mb-12">
            <h3 className="text-xl font-bold text-black mb-6">Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-black/80">
              <p>krishncreates@gmail.com</p>
              <p>+91 9219194571</p>
              <p>Bhopal, Madhya Pradesh, India</p>
            </div>
          </div>

          <div className="border-t border-black pt-8 text-center">
            <p className="text-gray-500">© 2025 Team K. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
