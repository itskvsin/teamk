"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { RiMailLine, RiPhoneLine, RiMapPinLine } from "react-icons/ri";

gsap.registerPlugin(SplitText);

const textEnter = (hovering: boolean) => {
  const tl = gsap.timeline({ defaults: { duration: 0.4, ease: "power3.out" } });

  if (hovering) {
    tl.to(".btn-text", { y: "-100%", opacity: 0 }, 0).to(
      ".btn-text-hover",
      { y: "0%", opacity: 1 },
      0
    );
  } else {
    tl.to(".btn-text", { y: "0%", opacity: 1 }, 0).to(
      ".btn-text-hover",
      { y: "100%", opacity: 0 },
      0
    );
  }
};

export default function ContactUs() {
  const headingRef = useRef(null);

  useEffect(() => {
    let split = SplitText.create(headingRef.current, { type: "words, chars" });

    gsap.from(split.words, {
      duration: 1.4,
      y: 100,
      autoAlpha: 0,
      scrollTrigger: {
        trigger: headingRef.current,
        scrub: 1,
        pin: true,
        start: "90% center",
        end: "top center",
      },
    });
  }, []);

  return (
<div id="contact" className="min-h-screen flex items-center justify-center">
      <div className="min-h-screen bg-[#f5f5f5] text-black flex flex-col justify-around items-center px-4 sm:px-8">
      {/* Heading */}
      <div className="w-full max-w-6xl">
        <h1
          ref={headingRef}
          className="text-center w-full overflow-hidden text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight pt-10 lg:pt-12 pb-4 font-thin"
        >
          Contact Us
        </h1>

        <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
          <div className="h-0.5 w-1/5 sm:w-1/4 bg-black"></div>
          <p>GET IN TOUCH</p>
          <div className="h-0.5 w-1/5 sm:w-1/4 bg-black"></div>
        </div>
      </div>

      {/* Contact + Form Container */}
      <div className="w-full max-w-7xl rounded-3xl p-4 sm:p-10 flex flex-col lg:flex-row gap-10 sm:gap-14 lg:gap-20 items-start justify-between">
        
        {/* LEFT SECTION */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold">Get In Touch</h1>

          <div className="text-base sm:text-lg">
            <p>Whether you have a question about our services,</p>
            <p>pricing, or anything else, our team is ready</p>
            <p>to answer all your questions.</p>
          </div>

          <div className="space-y-6 sm:space-y-8 pt-4">
            <div className="flex items-center gap-4">
              <RiMailLine className="text-white bg-black rounded-full h-12 w-12 sm:h-14 sm:w-14 p-3" />
              <div>
                <h1 className="font-bold text-xl sm:text-2xl">Email</h1>
                <p className="text-sm sm:text-base">krishncreates@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <RiPhoneLine className="text-white bg-black rounded-full h-12 w-12 sm:h-14 sm:w-14 p-3" />
              <div>
                <h1 className="font-bold text-xl sm:text-2xl">Phone</h1>
                <p className="text-sm sm:text-base">+91 9219194571</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <RiMapPinLine className="text-white bg-black rounded-full h-12 w-12 sm:h-14 sm:w-14 p-3" />
              <div>
                <h1 className="font-bold text-xl sm:text-2xl">Location</h1>
                <p className="text-sm sm:text-base">Bhopal, Madhya Pradesh, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="w-full lg:w-1/2 mt-8 lg:m-0">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8">
            Send us a Message
          </h2>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-xs sm:text-sm mb-1">Name *</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="bg-black border border-gray-600 rounded-lg px-4 py-3 text-gray-200"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs sm:text-sm mb-1">Email *</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="bg-black border border-gray-600 rounded-lg px-4 py-3 text-gray-200"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs sm:text-sm mb-1">Subject *</label>
              <input
                type="text"
                placeholder="What's this about?"
                className="bg-black border border-gray-600 rounded-lg px-4 py-3 text-gray-200"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs sm:text-sm mb-1">Message *</label>
              <textarea
                rows={6}
                placeholder="Tell us about your project..."
                className="bg-black border border-gray-600 rounded-lg px-4 py-3 text-gray-200 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              onMouseEnter={() => textEnter(true)}
              onMouseLeave={() => textEnter(false)}
              className="btn relative overflow-hidden bg-[#B02A2A] w-full rounded-xl py-6 sm:py-8 font-semibold text-white text-base sm:text-lg"
            >
              <span className="btn-text absolute inset-0 flex items-center justify-center">
                Send Message
              </span>
              <span className="btn-text-hover absolute inset-0 flex items-center justify-center translate-y-full opacity-0">
                Let’s Go →
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
</div>
  );
}
