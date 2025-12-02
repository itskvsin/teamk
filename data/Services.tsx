// ------------------------------------------------------
// ICONS (NO LOGIC CHANGED — ONLY ADDED TYPES)
// ------------------------------------------------------

interface HoverIconProps {
  isHovered?: boolean;
}


const AnimatedIcon1 = ({ isHovered = false }: HoverIconProps) => (
  <svg width="64" height="64" viewBox="0 0 64 64">
    <circle
      cx="32"
      cy="24"
      r="10"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      style={{
        transition: "all 0.4s ease",
        transform: isHovered ? "scale(1.1)" : "scale(1)",
      }}
    />
    <circle
      cx="32"
      cy="32"
      r="18"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      style={{
        transition: "all 0.5s ease",
        transform: isHovered ? "scale(0.95)" : "scale(1)",
        transformOrigin: "center",
      }}
    />
  </svg>
);

const AnimatedIcon2 = ({ isHovered = false }: HoverIconProps) => (
  <svg width="64" height="64" viewBox="0 0 64 64">
    <circle
      cx="38"
      cy="26"
      r="10"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      style={{
        transition: "all 0.4s ease",
        transform: isHovered ? "translate(-3px, -3px)" : "translate(0, 0)",
      }}
    />
    <circle
      cx="26"
      cy="38"
      r="10"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      style={{
        transition: "all 0.4s ease",
        transform: isHovered ? "translate(3px, 3px)" : "translate(0, 0)",
      }}
    />
  </svg>
);

const AnimatedIcon3 = ({ isHovered = false }: HoverIconProps) => (
  <svg width="64" height="64" viewBox="0 0 64 64">
    <ellipse
      cx="32"
      cy="32"
      rx="14"
      ry="10"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      transform="rotate(-30 32 32)"
      style={{
        transition: "all 0.5s ease",
        transform: isHovered ? "rotate(-45deg)" : "rotate(-30deg)",
        transformOrigin: "center",
      }}
    />
    <ellipse
      cx="32"
      cy="32"
      rx="14"
      ry="10"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      transform="rotate(30 32 32)"
      style={{
        transition: "all 0.5s ease",
        transform: isHovered ? "rotate(45deg)" : "rotate(30deg)",
        transformOrigin: "center",
      }}
    />
  </svg>
);

const AnimatedIcon4 = ({ isHovered = false }: HoverIconProps) => (
  <svg width="64" height="64" viewBox="0 0 64 64">
    <circle
      cx="32"
      cy="32"
      r="6"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      style={{
        transition: "all 0.4s ease",
        transform: isHovered ? "scale(1.3)" : "scale(1)",
        transformOrigin: "center",
      }}
    />
    <circle
      cx="32"
      cy="32"
      r="12"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      style={{
        transition: "all 0.5s ease",
        opacity: isHovered ? 0.6 : 1,
      }}
    />
    <circle
      cx="32"
      cy="32"
      r="18"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      style={{
        transition: "all 0.6s ease",
        transform: isHovered ? "scale(1.1)" : "scale(1)",
        opacity: isHovered ? 0.4 : 1,
        transformOrigin: "center",
      }}
    />
  </svg>
);

const AnimatedIcon5 = ({ isHovered = false }: HoverIconProps) => (
  <svg width="64" height="64" viewBox="0 0 64 64">
    <circle
      cx="32"
      cy="32"
      r="6"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      style={{
        transition: "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        transform: isHovered ? "rotate(180deg)" : "rotate(0deg)",
        transformOrigin: "center",
      }}
    />
    <circle
      cx="32"
      cy="32"
      r="12"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      style={{
        transition: "all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        transform: isHovered ? "rotate(-180deg)" : "rotate(0deg)",
        transformOrigin: "center",
      }}
    />
    <circle
      cx="32"
      cy="32"
      r="18"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      style={{
        transition: "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        transform: isHovered ? "rotate(180deg)" : "rotate(0deg)",
        transformOrigin: "center",
      }}
    />
  </svg>
);

const AnimatedIcon6 = ({ isHovered = false }: HoverIconProps) => (
  <svg width="64" height="64" viewBox="0 0 64 64">
    <circle
      cx="32"
      cy="32"
      r="6"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      style={{
        transition: "all 0.4s ease",
        transform: isHovered ? "scale(0.8)" : "scale(1)",
        transformOrigin: "center",
      }}
    />
    <circle
      cx="32"
      cy="32"
      r="12"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      style={{
        transition: "all 0.5s ease",
        transform: isHovered ? "scale(1.15)" : "scale(1)",
        transformOrigin: "center",
      }}
    />
    <circle
      cx="32"
      cy="32"
      r="18"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      style={{
        transition: "all 0.6s ease",
        transform: isHovered ? "scale(0.9)" : "scale(1)",
        transformOrigin: "center",
      }}
    />
  </svg>
);


export const services = [
    {
      icon: <AnimatedIcon1 />,
      title: "Social Media Marketing",
      description:
        "Key to standout success. We shape unique brand identities that last and resonate in dynamic evolved and competitive markets.",
    },
    {
      icon: <AnimatedIcon2 />,
      title: "content strategy",
      description:
        "Essential for user loyalty. We design intuitive interfaces that boost business growth and brings creative concepts to life.",
    },
    {
      icon: <AnimatedIcon3 />,
      title: "brand identity",
      description:
        "Design drives business growth. We offer collaborative design maintenance to amplify teams capabilities, ensuring a seamless flow from concept to execution.",
    },
    {
      icon: <AnimatedIcon4 />,
      title: "video production",
      description:
        "Digital presence matters. We deliver a spectrum of web solutions, from one-page landing sites to full-scale corporate websites.",
    },
    {
      icon: <AnimatedIcon5 />,
      title: "2d animation",
      description:
        "Digital presence matters. We deliver a spectrum of web solutions, from one-page landing sites to full-scale corporate websites.",
    },
    {
      icon: <AnimatedIcon6 />,
      title: "scripting & storytelling",
      description:
        "Digital presence matters. We deliver a spectrum of web solutions, from one-page landing sites to full-scale corporate websites.",
    },
  ];