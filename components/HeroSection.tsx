"use client";

import { motion } from "framer-motion";
import {
  fadeInUp,
  letterStagger,
  letterChild,
  staggerContainer,
} from "@/lib/motion";

function AnimatedText({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span variants={letterStagger} initial="hidden" animate="show" className={className}>
      {text.split("").map((char, i) => (
        <motion.span key={i} variants={letterChild} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// 6 strings with realistic guitar thickness (high E → low E)
const guitarStrings = [
  { thickness: 0.5, color: "#fdcf58", vibration: 1.5 },
  { thickness: 0.75, color: "#f5a623", vibration: 1.8 },
  { thickness: 1, color: "#ff8c5a", vibration: 2.2 },
  { thickness: 1.5, color: "#ff6b35", vibration: 2.6 },
  { thickness: 2, color: "#ff4020", vibration: 3.0 },
  { thickness: 2.5, color: "#ff0040", vibration: 3.5 },
];

function GuitarStrings() {
  return (
    <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-[280px] w-[45%] overflow-hidden opacity-[0.12]">
      {/* Fret lines */}
      {[20, 40, 60, 80].map((left) => (
        <div
          key={left}
          className="absolute top-0 bottom-0 w-px bg-white/20"
          style={{ left: `${left}%` }}
        />
      ))}
      {/* Fret dot markers */}
      <div className="absolute top-1/2 left-[40%] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10" />
      <div className="absolute top-1/2 left-[80%] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10" />

      {/* Strings — tightly grouped like a real neck */}
      {guitarStrings.map((s, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 rounded-full"
          style={{
            top: `${15 + i * 14}%`,
            height: `${s.thickness}px`,
            background: `linear-gradient(90deg, ${s.color}40, ${s.color}, ${s.color}40)`,
          }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{
            scaleX: 1,
            y: [0, s.vibration, -s.vibration * 0.6, 0],
          }}
          transition={{
            scaleX: { duration: 1.2, delay: 0.3 + i * 0.08, ease: "easeOut" },
            y: {
              duration: 0.15 + i * 0.04,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: 2 + i * 0.15,
            },
          }}
        />
      ))}
    </div>
  );
}

function FloatingOrb({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -40, 20, 0],
        scale: [1, 1.1, 0.9, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

export default function HeroSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Background orbs */}
      <FloatingOrb
        className="h-72 w-72 bg-cyan/20 -top-20 -left-20"
        delay={0}
      />
      <FloatingOrb
        className="h-96 w-96 bg-purple/15 -bottom-32 -right-32"
        delay={2}
      />
      <FloatingOrb
        className="h-64 w-64 bg-magenta/10 top-1/3 right-1/4"
        delay={4}
      />

      {/* Guitar strings decoration */}
      <GuitarStrings />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-3xl text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {/* Small tag */}
        <motion.div variants={fadeInUp} className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-foreground/60">
            <span className="inline-block h-2 w-2 rounded-full bg-cyan animate-pulse" />
            Developer & All-Round Good Sport
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeInUp}
          className="mb-4 text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl"
        >
          <AnimatedText text="Callum Moodie" className="gradient-text" />
        </motion.h1>

        {/* Title */}
        <motion.p
          variants={fadeInUp}
          className="mb-6 text-lg text-foreground/60 sm:text-xl"
        >
          Graduate Apprentice Analyst/Developer
          <br />
          <span className="text-foreground/40">University of Glasgow</span>
        </motion.p>

        {/* Bio */}
        <motion.p
          variants={fadeInUp}
          className="mx-auto mb-10 max-w-xl text-foreground/50 leading-relaxed"
        >
          Final year software engineering student building production software
          used by 20,000+ people. I love building things that people find useful. When I&apos;m not shipping features,
          you&apos;ll find me playing guitar, exploring a new city, or having a pint.
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={fadeInUp} className="flex justify-center gap-4">
          <a
            href="#projects"
            className="gradient-border rounded-full bg-white/5 px-6 py-2.5 text-sm font-medium transition-colors hover:bg-white/10"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-full bg-gradient-to-r from-cyan to-purple px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-foreground/30"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs">Scroll</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
