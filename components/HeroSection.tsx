"use client";

import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const guitarStrings = [
  { thickness: 0.75, color: "#a7f3d0", vibration: 12, symbol: "♪" },
  { thickness: 1, color: "#6ee7b7", vibration: 14, symbol: "♫" },
  { thickness: 1.5, color: "#93c5fd", vibration: 17, symbol: "♪" },
  { thickness: 2, color: "#c4b5fd", vibration: 20, symbol: "♬" },
  { thickness: 2.5, color: "#ddd6fe", vibration: 24, symbol: "♫" },
  { thickness: 3, color: "#c4b5fd", vibration: 28, symbol: "♪" },
];

interface FloatingNote {
  id: number;
  x: number;
  y: number;
  symbol: string;
  color: string;
  drift: number;
  tilt: number;
}

function GuitarString({
  index,
  config,
  pluckSignal,
}: {
  index: number;
  config: (typeof guitarStrings)[number];
  pluckSignal: number;
}) {
  const y = useMotionValue(0);
  const glow = useMotionValue(0);
  const top = 30 + index * 8;

  useEffect(() => {
    if (pluckSignal === 0) return;
    const v = config.vibration;
    animate(y, [0, v, -v * 0.7, v * 0.45, -v * 0.25, v * 0.12, 0], {
      duration: 0.9,
      ease: "easeOut",
    });
    animate(glow, [1, 0.7, 0.4, 0.2, 0], { duration: 1.1, ease: "easeOut" });
  }, [pluckSignal, config.vibration, y, glow]);

  return (
    <motion.div
      className="absolute left-0 right-0 rounded-full"
      style={{
        top: `${top}%`,
        height: `${config.thickness}px`,
        background: `linear-gradient(90deg, transparent, ${config.color}90, ${config.color}, ${config.color}90, transparent)`,
        boxShadow: `0 0 8px ${config.color}40`,
        y,
        opacity: 0.22,
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.4, delay: 1.4 + index * 0.08, ease: "easeOut" }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${config.color}, transparent)`,
          opacity: glow,
          filter: "blur(2px)",
        }}
      />
    </motion.div>
  );
}

function InteractiveGuitarStrings() {
  const [plucks, setPlucks] = useState<number[]>(() => guitarStrings.map(() => 0));
  const [notes, setNotes] = useState<FloatingNote[]>([]);
  const noteIdRef = useRef(0);
  const lastYRef = useRef<number | null>(null);
  const lastPluckTimes = useRef<number[]>(guitarStrings.map(() => 0));

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const newY = e.clientY;
      const last = lastYRef.current;
      lastYRef.current = newY;
      if (last === null) return;

      const now = performance.now();
      guitarStrings.forEach((s, i) => {
        const stringY = ((30 + i * 8) / 100) * window.innerHeight;
        const crossed =
          (last < stringY && newY >= stringY) ||
          (last > stringY && newY <= stringY);
        if (!crossed) return;
        if (now - lastPluckTimes.current[i] < 120) return;
        lastPluckTimes.current[i] = now;

        setPlucks((p) => {
          const next = [...p];
          next[i] = next[i] + 1;
          return next;
        });
        const id = ++noteIdRef.current;
        const note: FloatingNote = {
          id,
          x: e.clientX,
          y: stringY,
          symbol: s.symbol,
          color: s.color,
          drift: (Math.random() - 0.5) * 80,
          tilt: (Math.random() - 0.5) * 40,
        };
        setNotes((n) => [...n, note]);
        window.setTimeout(
          () => setNotes((n) => n.filter((nn) => nn.id !== id)),
          1800
        );
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Frets */}
      <div className="absolute inset-0 opacity-[0.05]">
        {[15, 35, 55, 75, 95].map((left) => (
          <div
            key={left}
            className="absolute top-0 bottom-0 w-px bg-white"
            style={{ left: `${left}%` }}
          />
        ))}
      </div>

      {/* Strings */}
      {guitarStrings.map((s, i) => (
        <GuitarString key={i} index={i} config={s} pluckSignal={plucks[i]} />
      ))}

      {/* Floating musical notes */}
      {notes.map((note) => (
        <motion.div
          key={note.id}
          className="absolute select-none text-2xl font-bold"
          style={{
            left: note.x,
            top: note.y,
            color: note.color,
            textShadow: `0 0 14px ${note.color}, 0 0 28px ${note.color}80`,
            willChange: "transform, opacity",
          }}
          initial={{ opacity: 0, y: 0, x: 0, scale: 0.4, rotate: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: -110,
            x: note.drift,
            scale: [0.4, 1.3, 1, 0.8],
            rotate: note.tilt,
          }}
          transition={{ duration: 1.6, ease: "easeOut", times: [0, 0.2, 0.7, 1] }}
        >
          {note.symbol}
        </motion.div>
      ))}
    </div>
  );
}

function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute h-[700px] w-[700px] rounded-full blur-[140px]"
        style={{ background: "#6ee7b7", opacity: 0.14 }}
        initial={{ left: "0%", top: "0%" }}
        animate={{
          left: ["0%", "55%", "20%", "0%"],
          top: ["5%", "55%", "30%", "5%"],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-[600px] w-[600px] rounded-full blur-[140px]"
        style={{ background: "#c4b5fd", opacity: 0.14 }}
        initial={{ left: "55%", top: "50%" }}
        animate={{
          left: ["55%", "5%", "40%", "55%"],
          top: ["55%", "15%", "45%", "55%"],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-[500px] w-[500px] rounded-full blur-[140px]"
        style={{ background: "#93c5fd", opacity: 0.1 }}
        initial={{ left: "30%", top: "-10%" }}
        animate={{
          left: ["30%", "65%", "15%", "30%"],
          top: ["-10%", "25%", "5%", "-10%"],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function Starfield() {
  const stars = Array.from({ length: 32 }, (_, i) => ({
    id: i,
    left: (i * 37) % 100,
    top: (i * 53) % 100,
    delay: (i % 7) * 0.6,
    duration: 2 + ((i * 13) % 30) / 10,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute h-px w-px rounded-full bg-white"
          style={{ left: `${s.left}%`, top: `${s.top}%`, boxShadow: "0 0 4px #fff" }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
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
      <Starfield />
      <InteractiveGuitarStrings />

      {/* Vignette to deepen the edges */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.55)_100%)]" />

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
        <div className="mb-8 relative">
          {/* Soft glow behind the name */}
          <motion.div
            className="pointer-events-none absolute -inset-x-8 -inset-y-6 -z-10 rounded-[40%] blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at 30% 50%, rgba(110,231,183,0.18), transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(196,181,253,0.18), transparent 60%)",
            }}
            animate={{ opacity: [0.55, 0.9, 0.55] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
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
              style={{
                filter: "drop-shadow(0 0 30px rgba(110,231,183,0.25))",
              }}
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