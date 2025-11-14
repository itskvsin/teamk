"use client";

import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { motion } from "motion/react";

const content = [
  {
    title: "Collaborative Editing",
    description:
      "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white rounded-xl overflow-hidden">
        <div className="text-center p-8">
          <div className="text-4xl mb-4">✨</div>
          <div className="text-2xl font-bold">Collaborative Editing</div>
        </div>
      </div>
    ),
  },
  {
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white rounded-xl overflow-hidden relative">
        <img
          src="/linear.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
    ),
  },
  {
    title: "Version control",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white rounded-xl overflow-hidden">
        <div className="text-center p-8">
          <div className="text-4xl mb-4">🔄</div>
          <div className="text-2xl font-bold">Version control</div>
        </div>
      </div>
    ),
  },
];

export function Services() {
  return (
    <section className="w-full bg-[#f5f5f5] py-20 -mt-px relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent pointer-events-none" />
      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-extrabold text-black">
            Our Services
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto">
            Discover what we offer and how we can help transform your vision into reality
          </p>
        </motion.div>
        <div className="w-full">
          <StickyScroll content={content} />
        </div>
      </div>
    </section>
  );
}
