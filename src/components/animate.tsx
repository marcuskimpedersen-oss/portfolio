"use client";

import { useInView } from "@/hooks/use-in-view";

type Direction = "up" | "down" | "left" | "right";

const offsets: Record<Direction, string> = {
  up: "translate-y-8",
  down: "-translate-y-8",
  left: "translate-x-8",
  right: "-translate-x-8",
};

export default function Animate({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView
          ? "translate-x-0 translate-y-0 opacity-100"
          : `opacity-0 ${offsets[direction]}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
