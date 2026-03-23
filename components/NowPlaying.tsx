"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slideInLeft } from "@/lib/motion";

interface NowPlayingData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumArt?: string;
  songUrl?: string;
}

const VINYL_SIZE = 280;
const GROOVE_COUNT = 30;

function EqBars() {
  return (
    <div className="flex items-end gap-[2px] h-3">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-[#ff6b35]"
          animate={{ height: ["40%", "100%", "60%", "100%", "40%"] }}
          transition={{
            duration: 0.8 + i * 0.15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}

function SkipIcon({ flip }: { flip?: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="currentColor"
      className={`text-foreground/30 ${flip ? "rotate-180" : ""}`}
    >
      <path d="M0 0.5 L6 5 L0 9.5Z" />
      <rect x="7" y="0.5" width="2" height="9" rx="0.5" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" className="text-foreground/60">
      <rect x="0" y="0" width="3" height="12" rx="1" />
      <rect x="7" y="0" width="3" height="12" rx="1" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" className="text-foreground/60">
      <path d="M0 0.5 L10 6 L0 11.5Z" />
    </svg>
  );
}

function VinylDisc({ albumArt, isPlaying }: { albumArt?: string; isPlaying: boolean }) {
  return (
    <div
      className="relative mx-auto shrink-0"
      style={{ width: VINYL_SIZE, height: VINYL_SIZE }}
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-20"
        style={{ background: "radial-gradient(circle, #ff6b35, transparent 70%)" }}
      />

      {/* Spinning disc */}
      <motion.div
        className="relative h-full w-full rounded-full"
        style={{
          background: "radial-gradient(circle, #1a1a1a 30%, #0d0d0d 60%, #1a1a1a 100%)",
          boxShadow: "0 0 0 3px #333, 0 0 0 5px #111, 0 8px 32px rgba(0,0,0,0.6)",
        }}
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={
          isPlaying
            ? { duration: 8, repeat: Infinity, ease: "linear" }
            : { duration: 0.5, ease: "easeOut" }
        }
      >
        {/* Grooves */}
        {Array.from({ length: GROOVE_COUNT }, (_, i) => {
          const r = 25 + (i / GROOVE_COUNT) * 55;
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 rounded-full border"
              style={{
                width: `${r * 2}%`,
                height: `${r * 2}%`,
                transform: "translate(-50%, -50%)",
                borderColor:
                  i % 5 === 0
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(255,255,255,0.02)",
              }}
            />
          );
        })}

        {/* Sheen */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.04) 10%, transparent 20%, transparent 50%, rgba(255,255,255,0.03) 60%, transparent 70%)",
          }}
        />

        {/* Label — album art or gradient fallback */}
        <div
          className="absolute left-1/2 top-1/2 overflow-hidden rounded-full"
          style={{
            width: "38%",
            height: "38%",
            transform: "translate(-50%, -50%)",
            boxShadow: "inset 0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          {albumArt ? (
            <img
              src={albumArt}
              alt="Album art"
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className="h-full w-full flex items-center justify-center"
              style={{
                background: "radial-gradient(circle, #fdcf58, #ff6b35 60%, #ff0040 100%)",
              }}
            >
              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#0a0a0a]/70">
                Callum
              </span>
            </div>
          )}

          {/* Spindle hole overlay */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0a0a0a]"
            style={{
              width: "14%",
              height: "14%",
              boxShadow: "0 0 0 2px #333",
            }}
          />
        </div>
      </motion.div>

      {/* Tonearm */}
      <motion.div
        className="absolute"
        style={{
          top: "-5%",
          right: "5%",
          width: "35%",
          transformOrigin: "90% 10%",
        }}
        initial={{ rotate: -30 }}
        animate={{ rotate: isPlaying ? -12 : -25 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div
          className="absolute right-0 top-0 h-4 w-4 rounded-full"
          style={{
            background: "#444",
            boxShadow: "0 0 0 2px #666, 0 2px 8px rgba(0,0,0,0.5)",
          }}
        />
        <div
          className="absolute right-2 top-1.5 h-[2px] w-[85%] rounded-full"
          style={{
            background: "linear-gradient(90deg, #888, #555)",
            transformOrigin: "right center",
            rotate: "-5deg",
          }}
        />
        <div
          className="absolute left-0 top-0 h-3 w-4 rounded-sm"
          style={{
            background: "#666",
            transform: "translateY(-25%) rotate(-5deg)",
          }}
        />
      </motion.div>
    </div>
  );
}

export default function NowPlaying() {
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

  const isPlaying = data?.isPlaying ?? false;

  return (
    <motion.div variants={slideInLeft} className="flex flex-col items-center">
      {/* Vinyl */}
      <VinylDisc albumArt={data?.albumArt} isPlaying={isPlaying} />

      {/* Track info card */}
      <AnimatePresence mode="wait">
        {data?.title && (
          <motion.a
            key={data.title}
            href={data.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block w-64 overflow-hidden rounded-xl glass transition-colors hover:bg-white/10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative bg-black/40 p-3">
              <div className="flex items-center gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-foreground/30 mb-0.5">
                    {isPlaying ? "Now Playing" : "Last Played"}
                  </p>
                  <p className="truncate text-sm font-medium text-foreground/90">
                    {data.title}
                  </p>
                  <p className="truncate text-xs text-foreground/40">
                    {data.artist}
                  </p>
                </div>

                <div className="shrink-0">
                  {isPlaying ? (
                    <EqBars />
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-[#1DB954]"
                    >
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-2.5 h-[2px] w-full rounded-full bg-white/10 overflow-hidden">
                {isPlaying ? (
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #ff6b35, #fdcf58)" }}
                    initial={{ width: "15%" }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 30, ease: "linear" }}
                  />
                ) : (
                  <div
                    className="h-full w-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #ff6b35, #fdcf58)" }}
                  />
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-5 px-3 py-2 bg-white/[0.02]">
              <SkipIcon flip />
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
              <SkipIcon />
            </div>
          </motion.a>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
