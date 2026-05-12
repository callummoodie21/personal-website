"use client";

import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const guitarStrings = [
  { thickness: 0.5, color: "#a7f3d0", vibration: 1.5 },
  { thickness: 0.75, color: "#6ee7b7", vibration: 1.8 },
  { thickness: 1, color: "#93c5fd", vibration: 2.2 },
  { thickness: 1.5, color: "#c4b5fd", vibration: 2.6 },
  { thickness: 2, color: "#ddd6fe", vibration: 3.0 },
  { thickness: 2.5, color: "#c4b5fd", vibration: 3.5 },
];

function GuitarStrings() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.07]">
      {[25, 45, 65, 85].map((left) => (
        <div
          key={left}
          className="absolute top-0 bottom-0 w-px bg-white/20"
          style={{ left: `${left}%` }}
        />
      ))}
      {guitarStrings.map((s, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 rounded-full"
          style={{
            top: `${30 + i * 8}%`,
            height: `${s.thickness}px`,
            background: `linear-gradient(90deg, transparent, ${s.color}60, ${s.color}, ${s.color}60, transparent)`,
          }}
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: 1,
            y: [0, s.vibration, -s.vibration * 0.6, 0],
          }}
          transition={{
            scaleX: { duration: 1.5, delay: 1.5 + i * 0.08, ease: "easeOut" },
            y: {
              duration: 0.15 + i * 0.04,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: 3 + i * 0.15,
            },
          }}
        />
      ))}
    </div>
  );
}

function ScotlandFlag() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" className="rounded-[3px] overflow-hidden">
      <rect width="22" height="16" fill="#005EB8" />
      <path d="M0 0L22 16M22 0L0 16" stroke="white" strokeWidth="2.5" />
    </svg>
  );
}

function InfoPill({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.span
      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease }}
    >
      {children}
    </motion.span>
  );
}

export default function HeroSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-end overflow-hidden px-6 pb-24 pt-32 md:items-center md:pb-0 md:pt-0"
    >
      <GuitarStrings />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#c4b5fd]/8 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Top row: tag + info pills */}
        <motion.div
          className="mb-8 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#6ee7b7]/30 bg-[#6ee7b7]/10 px-3 py-1 text-xs font-medium text-[#6ee7b7]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#6ee7b7] animate-pulse" />
            Available for opportunities
          </span>
          <InfoPill delay={0.4}>
            <ScotlandFlag /> Scotland
          </InfoPill>
          <InfoPill delay={0.5}>20 years old</InfoPill>
        </motion.div>

        {/* Name - huge, left-aligned, staggered lines */}
        <div className="mb-8">
          <motion.h1
            className="text-6xl font-bold tracking-tighter sm:text-8xl md:text-9xl lg:text-[10rem] leading-[0.85]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <motion.span
              className="block gradient-text"
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
            >
              Callum
            </motion.span>
            <motion.span
              className="block text-foreground"
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease }}
            >
              Moodie
              <motion.span
                className="gradient-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.2 }}
              >
                .
              </motion.span>
            </motion.span>
          </motion.h1>
        </div>

        {/* Bottom row: role + bio on left, CTA on right */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.div
            className="max-w-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease }}
          >
            <p className="mb-3 text-lg font-medium text-foreground/70 sm:text-xl">
              Graduate Apprentice Analyst/Developer
              <span className="text-foreground/30"> - </span>
              <span className="text-foreground/50">University of Glasgow</span>
            </p>
            <p className="text-sm leading-relaxed text-foreground/40">
              Final year software engineering student building production software
              used by 20,000+ people. When I&apos;m not writing code,
              you&apos;ll find me playing guitar, exploring a new city, or having a pint.
            </p>
          </motion.div>

          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease }}
          >
            <a
              href="#projects"
              className="gradient-border rounded-full bg-white/5 px-6 py-2.5 text-sm font-medium transition-colors hover:bg-white/10"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-full bg-gradient-to-r from-[#6ee7b7] to-[#c4b5fd] px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-foreground/20"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 6l4 4 4-4" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
