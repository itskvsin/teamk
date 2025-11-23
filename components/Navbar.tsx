"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Work from "@/components/Work";
import Hero from "@/components/Hero";

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

    // Navbar blend and scale animation
    gsap
      .timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top bottom",
          end: "top top",
          scrub: 1,
          onUpdate: (self) => {
            // Blend navbar background with footer
            const progress = self.progress;
          },
        },
      })
      .to(nav, {
        duration: 0.2,
      })
      .to(
        logo,
        {
          scale: 6,
          x: -200,
          y: 400,
          duration: 0.2,
        },
        0
      )
      .to(
        navLinks,
        {
          opacity: 0,
          y: -20,
          duration: 0.5,
        },
        0
      );

    // Additional scroll effects for nav items
    gsap.from(".nav-item", {
      scrollTrigger: {
        trigger: nav,
        start: "top top",
        toggleActions: "play none none reverse",
      },
      y: -50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "power3.out",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navbar */}
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
          <div ref={navLinksRef} className="flex text-lg gap-8 items-center">
            <a
              href="#home"
              className="nav-item text-black hover:text-[#f5f5f5] transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              className="nav-item text-black hover:text-[#f5f5f5] transition-colors"
            >
              About
            </a>
            <a
              href="#services"
              className="nav-item text-black hover:text-[#f5f5f5] transition-colors"
            >
              Services
            </a>
            <a
              href="#contact"
              className="nav-item text-black hover:text-[#f5f5f5] transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      <Hero />
      <Services />
      <Testimonials />
      <Work />

      {/* Footer - The navbar will blend into this */}
      <footer
        ref={footerRef}
        className="min-h-screen w-full bg-[#f5f5f5] px-8 flex items-end justify-between py-20"
      >
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Left column - kept empty for the blended logo */}
            <div className="md:col-span-1">
              {/* This space is reserved for the navbar logo that will blend in */}
            </div>

            {/* Middle column - About */}
            <div className="flex flex-col items-end justfy-start">
              <h3 className="text-xl font-bold text-black mb-4">About Us</h3>
              <p className="text-black/80 leading-relaxed w-2/3 text-right">
                We create compelling video content that captivates audiences and
                drives results. From podcasts to viral shorts, we help brands
                tell their stories.
              </p>
            </div>

            {/* Right column - Quick Links */}
            <div>
              <h3 className="text-xl font-bold text-black mb-4 flex items-center justify-end">Quick Links</h3>
              <ul className="space-y-3 flex items-end flex-col justify-end">
                <li>
                  <a
                    href="#home"
                    className="text-black/80 hover:text-black transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-black/80 hover:text-black transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-black/80 hover:text-black transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="border-t border-black pt-12 mb-12">
            <h3 className="text-xl font-bold text-black mb-6">Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-black/80">
              <div>
                <p className="hover:text-black transition-colors">
                  krishncreates@gmail.com
                </p>
              </div>
              <div>
                <p className="hover:text-black transition-colors">
                  +91 9219194571
                </p>
              </div>
              <div>
                <p className="hover:text-black transition-colors">
                  Bhopal, Madhya Pradesh, India
                </p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-black pt-8 text-center">
            <p className="text-gray-500">© 2025 Team K. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}