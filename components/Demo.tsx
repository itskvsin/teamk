"use client";

interface CardProps {
  title: string;
  content: string; // image URL
}

export default function Card({ title, content }: CardProps) {
  return (
    <div
      className={`h-[60vh] rounded-xl w-3/4 flex items-end justify-start text-white bg-center bg-no-repeat bg-cover`}
      style={{ backgroundImage: `url(${content})` }}
    >
      <p className="text-8xl font-semibold text-black p-4">{title}</p>
    </div>
  );
}
