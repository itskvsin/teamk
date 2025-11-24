"use client";

import { useEffect, useRef } from "react";
import { AiOutlineAudioMuted } from "react-icons/ai";

export default function Work() {
  const imageRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

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
            y: -100,
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

  const allVideos = [
    {
      id: "growthx-trailer",
      videoUrl: "https://pratt-css.com/TeamK/Vertical/Ep 01 - Sports F1.webm",
      category: "Podcasts",
      categoryDescription:
        "We create podcasts so captivating, they'll have listeners forgetting they're out of snacks.",
      duration: "1:45",
      views: "8.2K",
    },
    {
      id: "aashna-podcast",
      videoUrl:
        "https://pratt-css.com/TeamK/Vertical/Ep 02 - Red Bull Racing - Built to Win.webm",
      category: "Podcasts",
      categoryDescription:
        "We create podcasts so captivating, they'll have listeners forgetting they're out of snacks.",
      duration: "3:12",
      views: "12.5K",
    },
    {
      id: "prachyam",
      videoUrl: "https://pratt-css.com/TeamK/Vertical/Ep3.webm",
      category: "Podcasts",
      categoryDescription:
        "We create podcasts so captivating, they'll have listeners forgetting they're out of snacks.",
      duration: "2:18",
      views: "9.8K",
    },
    {
      id: "growth-school",
      videoUrl:
        "https://pratt-css.com/TeamK/Vertical/Ep 04 - Ferrari - Built from Blood.webm",
      category: "Shorts & Reels",
      categoryDescription:
        "We make shorts and reels so good, even your ex might double-tap. Quick, punchy, and scroll-stopping—because who has time for boring?",
      duration: "0:45",
      views: "25.3K",
    },
    {
      id: "amish-intro",
      videoUrl: "https://pratt-css.com/TeamK/Vertical/Ep5.webm",
      category: "Shorts & Reels",
      categoryDescription:
        "We make shorts and reels so good, even your ex might double-tap. Quick, punchy, and scroll-stopping—because who has time for boring?",
      duration: "1:15",
      views: "18.7K",
    },
    {
      id: "kuku-fm",
      videoUrl: "https://pratt-css.com/TeamK/Vertical/Ep6.webm",
      category: "Shorts & Reels",
      categoryDescription:
        "We make shorts and reels so good, even your ex might double-tap. Quick, punchy, and scroll-stopping—because who has time for boring?",
      duration: "2:30",
      views: "15.1K",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl uppercase font-bold text-black mb-4 text-center">
          Glimpses
        </h1>
        <div className="flex items-center justify-between mb-20">
          <div className="h-1 w-100 bg-gray-400"></div>
          <p className="text-zinc-400 ">Our Portfolio</p>
          <div className="h-1 w-100 bg-gray-400"></div>
        </div>

        <div className="-space-y-40">
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
                className="relative overflow-hidden rounded-2xl h-[750px] w-full md:w-5/12 shadow-2xl"
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
                  onClick={() => {
                    const vid = imageRefs.current[index];
                    if (!vid) return;

                    vid.muted = !vid.muted;
                  }}
                  className="absolute bottom-4 left-4 border-2 hover:bg-black hover:text-white transition-all duration-400 z-10 text-black px-4 py-2 text-xl rounded-lg backdrop-blur-md"
                >
                  <AiOutlineAudioMuted />
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
              <div className="mt-6 px-2 w-full md:w-5/12">
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