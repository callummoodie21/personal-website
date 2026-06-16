"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface NowPlayingData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumArt?: string;
  songUrl?: string;
}

function MiniBars({ playing }: { playing: boolean }) {
  return (
    <div className="flex h-3 items-end gap-[2px]">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-[2px] rounded-full bg-[#6ee7b7]"
          animate={
            playing
              ? { height: ["35%", "100%", "55%", "100%", "35%"] }
              : { height: "35%" }
          }
          transition={
            playing
              ? {
                  duration: 0.8 + i * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1,
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}

export default function NowPlayingTicker() {
  const [data, setData] = useState<NowPlayingData | null>(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch("/api/now-playing");
        const json = await res.json();
        setData(json);
      } catch {
        setData({ isPlaying: false });
      }
    };
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!data?.title) return null;

  const isPlaying = data.isPlaying;
  const label = isPlaying ? "Now playing" : "Last played";

  return (
    <AnimatePresence>
      <motion.a
        key={data.title}
        href={data.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group hidden max-w-[260px] items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs transition-colors hover:bg-white/[0.08] sm:inline-flex"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4 }}
        aria-label={`${label}: ${data.title} by ${data.artist}`}
      >
        {data.albumArt ? (
          <img
            src={data.albumArt}
            alt=""
            className="h-5 w-5 shrink-0 rounded-sm object-cover"
          />
        ) : (
          <span className="h-5 w-5 shrink-0 rounded-sm bg-gradient-to-br from-cyan to-magenta" />
        )}
        <MiniBars playing={isPlaying} />
        <span className="hidden text-[10px] uppercase tracking-wider text-foreground/40 md:inline">
          {label}
        </span>
        <span className="min-w-0 flex-1 truncate text-foreground/80">
          {data.title}
          <span className="text-foreground/40"> — {data.artist}</span>
        </span>
      </motion.a>
    </AnimatePresence>
  );
}