"use client";

import { cn } from "@/lib/utils";
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
  ElementType,
  ReactNode,
  forwardRef,
} from "react";

// ===========================================================================
// CONTEXT
// ===========================================================================
const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (!context) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};

// ===========================================================================
// INTERFACES
// ===========================================================================
interface CardProps {
  children?: ReactNode;
  className?: string;
}

// ===========================================================================
// CARD CONTAINER (with stronger sticky rotation)
// ===========================================================================
export const CardContainer = ({
  children,
  className,
  containerClassName,
}: CardProps & { containerClassName?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  // Stronger magnet pull
  const intensity = 12;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();

    const x = (e.clientX - left - width / 2) / intensity;
    const y = (e.clientY - top - height / 2) / intensity;

    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = () => setIsMouseEntered(true);

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn(
          "py-20 flex items-center justify-center",
          containerClassName
        )}
        style={{ perspective: "1200px" }} // enhanced depth
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "flex items-center justify-center relative transition-all duration-300 ease-out",
            className
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

// ===========================================================================
// CARD BODY
// ===========================================================================
export const CardBody = ({ children, className }: CardProps) => (
  <div
    className={cn(
      "h-96 w-96 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
      className
    )}
  >
    {children}
  </div>
);

// ===========================================================================
// CARD ITEM (with deeper sticky hover lift)
// ===========================================================================
export const CardItem = forwardRef<
  HTMLDivElement,
  {
    as?: ElementType;
    children?: React.ReactNode;
    className?: string;
    translateX?: number | string;
    translateY?: number | string;
    translateZ?: number | string;
    rotateX?: number | string;
    rotateY?: number | string;
    rotateZ?: number | string;
    [key: string]: any;
  }
>(
  (
    {
      as: Tag = "div",
      children,
      className,
      translateX = 0,
      translateY = 0,
      translateZ = 0,
      rotateX = 0,
      rotateY = 0,
      rotateZ = 0,
      ...rest
    },
    ref
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const [isMouseEntered] = useMouseEnter();

    useEffect(() => {
      handleAnimations();
    }, [isMouseEntered]);

    const handleAnimations = () => {
      const el = internalRef.current;
      if (!el) return;

      if (isMouseEntered) {
        el.style.transform = `
          translateX(${translateX}px)
          translateY(${translateY}px)
          translateZ(${Number(translateZ) + 40}px)   /* added depth */
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          rotateZ(${rotateZ}deg)
        `;
      } else {
        el.style.transform = `
          translateX(0px)
          translateY(0px)
          translateZ(0px)
          rotateX(0deg)
          rotateY(0deg)
          rotateZ(0deg)
        `;
      }
    };

    return (
      <Tag
        ref={ref || internalRef}
        className={cn(
          "w-fit transition-transform duration-300 ease-out",
          className
        )}
        {...rest}
      >
        {children}
      </Tag>
    );
  }
);

CardItem.displayName = "CardItem";
