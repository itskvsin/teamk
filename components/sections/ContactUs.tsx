"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { RiMailLine, RiPhoneLine, RiMapPinLine } from "react-icons/ri";

// gsap.registerPlugin(useGSAP)
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
  const buttonRef = useRef(null);

  useEffect(() => {
    let split = SplitText.create(headingRef.current, {
      type: "words, chars",
    });

    let targets = gsap.utils.toArray(headingRef.current);

    gsap.from(split.words, {
      duration: 1.4,
      y: 100, // animate from 100px below
      autoAlpha: 0, // fade in from opacity: 0 and visibility: hidden
      // stagger: 0.4, // 0.05 seconds between each
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
    <div className="h-screen bg-[#f5f5f5] text-black flex items-center justify-evenly flex-col">
      {/* Heading */}"
      <div>
        <h1
          ref={headingRef}
          className="text-center w-full overflow-hidden text-8xl h-36 pt-12 pb-4 font-thin"
        >
          Contact Us
        </h1>
        <div className="flex items-center justify-center gap-4">
          {" "}
          <div className="h-0.5 w-1/4 bg-black"></div>
          <p className="w-0.5/4 text-center">GET IN TOUCH</p>
          <div className="h-0.5 w-1/4 bg-black"></div>
        </div>
      </div>
      {/* Form */}
      <div className=" w-full max-w-7xl rounded-3xl p-10 flex items-start justify-around">
        <div>
          <div className="flex flex-col gap-6">
            <h1 className="text-6xl">Get In Touch</h1>
            <div className="text-xl">
              {" "}
              <p>Whether you have a question about our services, </p>{" "}
              <p>pricing, or anything else, our team is ready</p>{" "}
              <p> to answer all your questions.</p>
            </div>
          </div>
          <div>
            <div className="flex items-start gap-4 py-4 mt-6">
              <RiMailLine className="text-white bg-black rounded-full h-14 w-14 p-3" />
              <div className="flex flex-col gap-2">
                {" "}
                <h1 className="font-bold text-2xl">Email</h1>
                <p>krishncreates@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4 py-4 mt-6">
              <RiPhoneLine className="text-white bg-black rounded-full h-14 w-14 p-3" />
              <div className="flex flex-col gap-2">
                {" "}
                <h1 className="font-bold text-2xl">Email</h1>
                <p>krishncreates@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4 py-4 mt-6">
              <RiMapPinLine className="text-white bg-black rounded-full h-14 w-14 p-3" />
              <div className="flex flex-col gap-2">
                {" "}
                <h1 className="font-bold text-2xl">Email</h1>
                <p>krishncreates@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-semibold mb-8">Send us a Message</h2>

          <form className="space-y-6">
            {/* name & email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm mb-1">Name *</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="bg-black  border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 text-gray-200"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-1">Email *</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="bg-black  border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 text-gray-200"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">Subject *</label>
              <input
                type="text"
                placeholder="What's this about?"
                className="bg-black    border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 text-gray-200"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">Message *</label>
              <textarea
                placeholder="Tell us about your project..."
                rows={7}
                className="bg-black    border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 text-gray-200 resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center ">
              <button
                type="submit"
                className="btn relative overflow-hidden bg-[#B02A2A] w-full transition-all rounded-xl py-8 font-semibold cursor-pointer text-white"
                onMouseEnter={() => textEnter(true)}
                onMouseLeave={() => textEnter(false)}
              >
                <span className="btn-text absolute inset-0 flex items-center justify-center">
                  Send Message
                </span>
                <span className="btn-text-hover absolute inset-0 flex items-center justify-center translate-y-full opacity-0">
                  Let’s Go →
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
