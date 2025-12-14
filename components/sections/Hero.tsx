"use client";

import { JSX, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useGSAP } from "@gsap/react";

export default function Hero(): JSX.Element {
  useGSAP(() => {
    gsap.set(".hero-text", {
      // clipPath: "polygon(20% 0%, 80% 0%, 92% 82%, 4% 90%)",
      // rotatey: "20%",
      skewX: "10px",
    });

    gsap.from(".hero-text", {
      // clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      // rotatey: "0%",
      skewX: "0px",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".hero-container",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="bg-black">
      <div
        id="home"
        className="hero-container h-screen uppercase bg-[#f6f6f6] flex flex-col items-center justify-center font-extrabold  relative overflow-hidden md:px-0"
      >
        <div className="relative z-10">
          <p className="hero-text text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-center mix-blend-difference px-4">
            We don't overthink
          </p>
        </div>

        <div>
          <CardContainer className="inter-var">
            <CardBody className="relative group/card dark:hover:shadow-2xl items-center dark:bg-black w-auto h-auto rounded-xl">
              <CardItem className="text-xl">
                <Image
                  src="/images/joining_hands.png"
                  height={500}
                  width={500}
                  className="h-50 w-50 sm:h-62 sm:w-62 md:h-64 md:w-64 lg:h-80 lg:w-80 object-contain rounded-xl"
                  alt="thumbnail"
                />
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>

        <div className="flex text-black items-center justify-center text-3xl sm:text-4xl md:text-6xl lg:text-7xl absolute bottom-31 right-128 z-999 px-4">
          <p className="hero-text text-black text-center">We overdeliver.</p>
        </div>
      </div>
    </div>
  );
}
