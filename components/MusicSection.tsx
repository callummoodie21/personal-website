"use client";

import { motion } from "framer-motion";
import { fadeInUp, slideInRight } from "@/lib/motion";
import SectionWrapper from "./SectionWrapper";
import NowPlaying from "./NowPlaying";

export default function MusicSection() {
  return (
    <SectionWrapper id="music">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">
          {/* Vinyl + Now Playing */}
          <NowPlaying />

          {/* Text content */}
          <motion.div variants={slideInRight} className="flex-1 text-center md:text-left">
            <h2 className="mb-2 text-3xl font-bold sm:text-4xl">
              <span className="gradient-text">Music</span>
            </h2>
            <p className="mb-6 text-foreground/50">
              I&apos;ve played guitar for years, mainly taking inspiration from my dad and my papa, as well as a variety of artists.
            </p>

            <div className="space-y-4 text-foreground/60">
              <p>
                I&apos;ve been playing guitar casually for a number of years now - it&apos;s
                definitely one of my favourite hobbies.
              </p>
              <p>
                I listen to a bit of everything, including rock, hip-hop, EDM, metal, and more.
              </p>
            </div>

            <motion.div variants={fadeInUp} className="mt-8">
              <a
                href="https://open.spotify.com/user/cazyboy0301"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#ff0040] px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                My Spotify
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
