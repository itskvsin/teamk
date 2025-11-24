"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Work from "@/components/sections/Work";
import Hero from "@/components/sections/Hero";

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
        let { isDesktop, isMobile } = context.conditions!;

        // ===========================
        // 🖥 DESKTOP LOGO MOVEMENT
        // ===========================
        if (isDesktop) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: footer,
              start: "top bottom",
              end: "top top",
              scrub: 1.3,
            },
          });

          tl.to(nav, { y: 120, duration: 1 }, 0)
            .to(
              logo,
              {
                scale: 7,
                x: -100,
                y: 100,
                duration: 1.2,
                ease: "power3.out",
              },
              0
            )
            .to(
              navLinks,
              {
                opacity: 0,
                y: -40,
                duration: 0.6,
              },
              0
            );

          return () => tl.kill();
        }

        // ===========================
        // 📱 MOBILE — No dragging, adaptive
        // ===========================
        if (isMobile) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: footer,
              start: "top bottom",
              end: "top 85%",
              scrub: false, // <- NO DRAGGING
              toggleActions: "play reverse play reverse",
            },
          });

          tl.to(
            nav,
            {
              y: 60,
              duration: 0.5,
              ease: "power2.out",
            },
            0
          )
            .to(
              logo,
              {
                scale: 3.2,
                x: -40,
                y: 160,
                duration: 0.6,
                ease: "power2.out",
              },
              0
            )
            .to(
              navLinks,
              {
                opacity: 0,
                y: -25,
                duration: 0.4,
              },
              0
            );

          return () => tl.kill();
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

          {/* NAV LINKS */}
          <div
            ref={navLinksRef}
            className="hidden md:flex text-lg gap-8 items-center"
          >
            <a href="#home" className="nav-item text-black hover:text-[#f5f5f5]">
              Home
            </a>
            <a href="#about" className="nav-item text-black hover:text-[#f5f5f5]">
              About
            </a>
            <a
              href="#services"
              className="nav-item text-black hover:text-[#f5f5f5]"
            >
              Services
            </a>
            <a
              href="#contact"
              className="nav-item text-black hover:text-[#f5f5f5]"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* MAIN SECTIONS */}
      <Hero />
      <Services />
      <Testimonials />
      <Work />

      {/* FOOTER */}
      <footer
        ref={footerRef}
        className="min-h-screen w-full bg-[#f5f5f5] px-8 flex items-end justify-between py-20"
      >
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* LEFT — Logo lands here */}
            <div className="md:col-span-1"></div>

            {/* ABOUT */}
            <div className="flex flex-col items-end">
              <h3 className="text-xl font-bold text-black mb-4">About Us</h3>
              <p className="text-black/80 leading-relaxed w-2/3 text-right">
                We create compelling video content that captivates audiences and
                drives results. From podcasts to viral shorts, we help brands
                tell their stories.
              </p>
            </div>

            {/* QUICK LINKS */}
            <div className="text-right">
              <h3 className="text-xl font-bold text-black mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a className="text-black/80 hover:text-black" href="#home">
                    Home
                  </a>
                </li>
                <li>
                  <a className="text-black/80 hover:text-black" href="#about">
                    About Us
                  </a>
                </li>
                <li>
                  <a className="text-black/80 hover:text-black" href="#contact">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* CONTACT */}
          <div className="border-t border-black pt-12 mb-12">
            <h3 className="text-xl font-bold text-black mb-6">Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-black/80">
              <p>krishncreates@gmail.com</p>
              <p>+91 9219194571</p>
              <p>Bhopal, Madhya Pradesh, India</p>
            </div>
          </div>

          {/* COPYRIGHT */}
          <div className="border-t border-black pt-8 text-center">
            <p className="text-gray-500">© 2025 Team K. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
