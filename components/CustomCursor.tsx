"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue } from "framer-motion";

const subscribe = () => () => {};
function useIsTouch() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia("(pointer: coarse)").matches,
    () => false
  );
}

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const isTouch = useIsTouch();
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  useEffect(() => {
    if (isTouch) return;

    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const addHover = () => setHovering(true);
    const removeHover = () => setHovering(false);

    const observe = () => {
      document
        .querySelectorAll("a, button, [role='button'], input, textarea, select, [data-cursor-hover]")
        .forEach((el) => {
          el.addEventListener("mouseenter", addHover);
          el.addEventListener("mouseleave", removeHover);
        });
    };

    window.addEventListener("mousemove", move);
    observe();

    const observer = new MutationObserver(observe);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      observer.disconnect();
    };
  }, [dotX, dotY, visible, isTouch]);

  if (isTouch) return null;

  return (
    <>
      <style jsx global>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>

      {/* Guitar pick */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-95%",
          transformOrigin: "50% 95%",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          scale: hovering ? 1.3 : 1,
          rotate: hovering ? 35 : 10,
        }}
        transition={{ duration: 0.2 }}
      >
        <svg
          width="20"
          height="24"
          viewBox="0 0 20 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 23C10 23 1 15 1 8.5C1 4.36 4.58 1 10 1C15.42 1 19 4.36 19 8.5C19 15 10 23 10 23Z"
            fill="url(#pickGradient)"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="0.75"
          />
          <defs>
            <linearGradient id="pickGradient" x1="10" y1="1" x2="10" y2="23" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" />
              <stop offset="0.4" stopColor="#fde68a" />
              <stop offset="1" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </>
  );
}
