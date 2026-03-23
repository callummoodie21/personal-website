"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { City } from "@/lib/types";

interface ImageCarouselProps {
  city: City;
  onClose: () => void;
}

export default function ImageCarousel({ city, onClose }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => {
      const next = prev + dir;
      if (next < 0) return city.images.length - 1;
      if (next >= city.images.length) return 0;
      return next;
    });
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative mx-4 w-full max-w-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-foreground">{city.name}</h3>
            <p className="text-sm text-foreground/50">{city.country}</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-foreground/60 transition-colors hover:bg-white/20 hover:text-foreground"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </div>

        {/* Image area */}
        <div className="glass relative flex items-center justify-center overflow-hidden rounded-2xl" style={{ height: "75vh" }}>
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.img
              key={current}
              src={city.images[current]}
              alt={`${city.name} photo ${current + 1}`}
              className="absolute inset-0 h-full w-full object-contain"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>

          {/* Navigation arrows */}
          {city.images.length > 1 && (
            <>
              <button
                onClick={() => navigate(-1)}
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                aria-label="Previous"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 4l-4 4 4 4" />
                </svg>
              </button>
              <button
                onClick={() => navigate(1)}
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                aria-label="Next"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 4l4 4-4 4" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {city.images.length > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            {city.images.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`h-2 w-2 rounded-full transition-colors ${
                  i === current ? "bg-cyan" : "bg-white/20"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
