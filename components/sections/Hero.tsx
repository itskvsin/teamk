"use client";

import { JSX, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export default function Hero(): JSX.Element {
  return (
    <div className="h-screen uppercase flex flex-col items-center justify-center font-extrabold  relative overflow-hidden md:px-0">
      <div className="relative z-10">
        <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-10 text-center mix-blend-difference px-4">
          We don't overthink
        </p>
      </div>

      <div>
        <CardContainer className="inter-var">
          <CardBody className="relative group/card dark:hover:shadow-2xl items-center dark:bg-black w-auto h-auto rounded-xl">
            <CardItem className="text-xl">
              <Image
                src="/images/kk.png"
                height={600}
                width={600}
                className="h-60 w-60 sm:h-62 sm:w-62 md:h-64 md:w-64 lg:h-80 lg:w-80 object-contain rounded-xl"
                alt="thumbnail"
              />
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>

      <div className="flex text-black items-center justify-center mt-10 text-3xl sm:text-4xl md:text-6xl lg:text-7xl relative z-10 px-4">
        <p className="text-black text-center">We overdeliver.</p>
      </div>
    </div>
  );
}