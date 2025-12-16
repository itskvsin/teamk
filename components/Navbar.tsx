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
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const navLinksRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);

  // ===============================
  // GSAP SCROLL FUNCTION (OPTION 3)
  // ===============================
  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    gsap.to(window, {
      duration: 1.2,
      scrollTo: {
        y: target,
        offsetY: 0, // navbar height
      },
      ease: "power2.inOut",
    });
  };

  useGSAP(() => {
    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".lastSection",
        endTrigger: footerRef.current,
        start: "center top",
        end: "bottom",
        scrub: 1,
        markers: true,
      },
    });


    t1.to(logoRef.current, {translateY: "44vh",scale: 6, duration: 1, ease: "power1.inOut"})

  });
  return (
    <div className="min-h-screen">
      {/* NAVBAR */}
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div ref={logoRef} className="origin-left">
            <Image
              src="/images/logo_no_bg.png"
              width={100}
              height={100}
              alt="logo"
            />
          </div>

          <div
            ref={navLinksRef}
            className="hidden md:flex text-lg gap-8 items-center"
          >
            <button
              onClick={() => scrollToSection("home")}
              className="nav-item text-black hover:text-gray-600"
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection("services")}
              className="nav-item text-black hover:text-gray-600"
            >
              Services
            </button>

            <button
              onClick={() => scrollToSection("testimonials")}
              className="nav-item text-black hover:text-gray-600"
            >
              Testimonials
            </button>

            <button
              onClick={() => scrollToSection("work")}
              className="nav-item text-black hover:text-gray-600"
            >
              Our Work
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="nav-item text-black hover:text-gray-600"
            >
              Contact Us
            </button>
          </div>
        </div>
      </nav>

      {/* SECTIONS */}
      <div>
        <Hero />
      </div>
      <div>
        <Services />
      </div>
      <div>
        <Testimonials />
      </div>
      <div>
        <Work />
      </div>
      <div className="lastSection">
        <ContactUs />
      </div>

      {/* FOOTER */}
      <footer
        ref={footerRef}
        className="min-h-screen w-full bg-[#f5f5f5] px-8 flex items-end justify-between py-20"
      >
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-1"></div>

            <div className="flex flex-col items-center lg:items-end">
              <h3 className="text-xl font-bold text-black mb-4">About Us</h3>
              <p className="text-black/80 leading-relaxed w-full lg:w-2/3 text-sm text-center lg:text-end">
                We create compelling video content that captivates audiences and
                drives results. From podcasts to viral shorts, we help brands
                tell their stories.
              </p>
            </div>

            <div className="text-center lg:text-right">
              <h3 className="text-xl font-bold text-black mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#home" className="text-black/80 hover:text-black">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-black/80 hover:text-black">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-black/80 hover:text-black">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t text-center border-black pt-12 mb-12">
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
