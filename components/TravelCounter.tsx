"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

function CountUp({
  to,
  duration = 1.6,
  suffix = "",
}: {
  to: number;
  duration?: number;
  suffix?: string;
}) {
  const value = useMotionValue(0);
  const display = useTransform(
    value,
    (v) => `${Math.round(v).toLocaleString()}${suffix}`
  );
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          animate(value, to, { duration, ease: [0.22, 1, 0.36, 1] });
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to, duration, started, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

interface Stat {
  value: number;
  label: string;
  color: string;
  suffix?: string;
}

export default function TravelCounter({ stats }: { stats: Stat[] }) {
  return (
    <div className="mb-8 grid grid-cols-3 gap-3 sm:gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="glass relative overflow-hidden rounded-2xl px-4 py-5 sm:px-6 sm:py-6"
        >
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl"
            style={{ background: stat.color, opacity: 0.18 }}
          />
          <div className="relative">
            <div
              className="text-3xl font-bold tabular-nums sm:text-5xl"
              style={{
                color: stat.color,
                textShadow: `0 0 24px ${stat.color}40`,
              }}
            >
              <CountUp to={stat.value} suffix={stat.suffix} />
            </div>
            <div className="mt-1 text-xs uppercase tracking-widest text-foreground/40 sm:text-sm">
              {stat.label}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}