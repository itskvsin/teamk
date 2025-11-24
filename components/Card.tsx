"use client";

interface CardProps {
  title: string;
  content: string; // image URL
}

export default function Card({ title, content }: CardProps) {
  return (
    <div
      className={`h-[50vh] sm:h-[55vh] md:h-[60vh] rounded-xl w-[90%] sm:w-[85%] md:w-3/4 flex items-end justify-start text-white bg-center bg-no-repeat bg-cover`}
      style={{ backgroundImage: `url(${content})` }}
    >
      <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-black p-2 sm:p-3 md:p-4 leading-tight">
        {title}
      </p>
    </div>
  );
} 