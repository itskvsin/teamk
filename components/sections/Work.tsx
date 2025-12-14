"use client";

import { useEffect, useRef, useState } from "react";
// import { AiOutlineAudioMuted } from "react-icons/ai";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";
import { allVideos } from "@/data/WorkVideos";

export default function Work() {
  const imageRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mutedStates, setMutedStates] = useState<boolean[]>(() =>
    allVideos.map(() => true)
  );

  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      imageRefs.current.forEach((video, index) => {
        if (
          video &&
          overlayRefs.current[index] &&
          containerRefs.current[index]
        ) {
          // GSAP reveal animation
          gsap.set(video, { scale: 1.3, opacity: 0 });
          gsap.set(overlayRefs.current[index], { scaleX: 1 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: video.parentElement,
              start: "top 60%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          });

          tl.to(overlayRefs.current[index], {
            scaleX: 0,
            duration: 1,
            ease: "power3.inOut",
            transformOrigin: "right",
          }).to(
            video,
            {
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
            },
            "-=0.6"
          );

          // PARALLAX EFFECT
          gsap.to(containerRefs.current[index], {
            y: -80,
            ease: "none",
            scrollTrigger: {
              trigger: containerRefs.current[index],
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });

          // VIDEO PLAY / PAUSE CONTROL BASED ON VISIBILITY
          ScrollTrigger.create({
            trigger: video.parentElement,
            start: "top 60%",
            end: "bottom 50%",
            // markers: true,
            onEnter: () => {
              video.play().catch(() => {});
            },
            onEnterBack: () => {
              video.play().catch(() => {});
            },
            onLeave: () => {
              video.pause();
            },
            onLeaveBack: () => {
              video.pause();
            },
          });
        }
      });
    };

    loadGSAP();
  }, []);

  return (
    <div
      id="work"
      className="min-h-screen bg-[#f5f5f5] lg:py-20 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl uppercase font-bold text-black mb-4 text-center">
          Glimpses
        </h1>
        <div className="flex items-center justify-center gap-6 lg:gap-0 lg:justify-between mb-20">
          <div className="h-1 w-20 lg:w-100 bg-gray-400"></div>
          <p className="text-zinc-400 ">Our Portfolio</p>
          <div className="h-1 w-20 lg:w-100 bg-gray-400"></div>
        </div>

        <div className="space-y-20 lg:-space-y-40">
          {allVideos.map((video, index) => (
            <div
              key={video.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "items-start" : "items-end"
              }`}
            >
              <div
                ref={(el) => {
                  containerRefs.current[index] = el;
                }}
                className="relative overflow-hidden rounded-2xl h-[600px] lg:h-[700] w-full md:w-5/12 shadow-2xl"
              >
                {/* Video */}
                <video
                  ref={(el) => {
                    imageRefs.current[index] = el;
                  }}
                  src={video.videoUrl}
                  className="w-full h-full object-fill"
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />

                {/* MUTE / UNMUTE BUTTON */}
                <button
                  ref={(el) => {
                    btnRefs.current[index] = el;
                  }}
                  aria-label={
                    mutedStates[index] ? "Unmute video" : "Mute video"
                  }
                  onClick={() => {
                    const vid = imageRefs.current[index];
                    if (!vid) return;

                    const newMuted = !mutedStates[index];
                    vid.muted = newMuted;

                    setMutedStates((prev) => {
                      const updated = [...prev];
                      updated[index] = newMuted;
                      return updated;
                    });
                  }}
                  className="sound-btn absolute bottom-4 left-4 z-10 px-4 py-2 text-xl rounded-lg backdrop-blur-md"
                >
                  {mutedStates[index] ? <GiSpeakerOff /> : <GiSpeaker />}
                </button>

                {/* Overlay */}
                <div
                  ref={(el) => {
                    overlayRefs.current[index] = el;
                  }}
                  className="absolute inset-0 bg-linear-to-r from-[#f3f3f3] to-[#f5f5f5] pointer-events-none"
                  style={{ transformOrigin: "right" }}
                />
              </div>

              {/* Heading and Description below card */}
              <div className="px-2 w-full md:w-5/12">
                <h3 className="text-2xl font-bold text-black mb-2">
                  {video.category}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {video.categoryDescription}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
