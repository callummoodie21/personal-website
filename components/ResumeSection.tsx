"use client";

import { motion } from "framer-motion";
import { fadeInUp, slideInLeft, slideInRight } from "@/lib/motion";
import { resumeEntries } from "@/data/resume";
import SectionWrapper from "./SectionWrapper";

function TimelineEntry({
  entry,
  index,
}: {
  entry: (typeof resumeEntries)[0];
  index: number;
}) {
  const isLeft = index % 2 === 0;
  const isWork = entry.type === "work";

  return (
    <motion.div
      variants={isLeft ? slideInLeft : slideInRight}
      className={`relative flex w-full items-start gap-8 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Card */}
      <div
        className={`glass glass-hover w-full rounded-2xl p-6 md:w-1/2 ${
          isLeft ? "md:text-right" : ""
        }`}
      >
        <span
          className={`mb-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${
            isWork
              ? "bg-cyan/10 text-cyan"
              : "bg-purple/10 text-purple"
          }`}
        >
          {isWork ? "Work" : "Education"}
        </span>
        <h3 className="mb-1 text-lg font-semibold text-foreground">
          {entry.title}
        </h3>
        <p className="mb-2 text-sm font-medium text-foreground/60">
          {entry.organization}
        </p>
        <p className="mb-2 text-xs text-foreground/40">{entry.period}</p>
        <p className="text-sm leading-relaxed text-foreground/50">
          {entry.description}
        </p>
      </div>

      {/* Timeline dot - visible on md+ */}
      <div className="absolute left-1/2 top-6 hidden -translate-x-1/2 md:block">
        <div
          className={`h-4 w-4 rounded-full border-2 ${
            isWork
              ? "border-cyan bg-cyan/20"
              : "border-purple bg-purple/20"
          }`}
        />
      </div>

      {/* Spacer for the other side */}
      <div className="hidden w-1/2 md:block" />
    </motion.div>
  );
}

export default function ResumeSection() {
  return (
    <SectionWrapper id="resume">
      <div className="mx-auto max-w-4xl">
        <motion.div variants={fadeInUp} className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold sm:text-4xl">
            <span className="gradient-text">Resume</span>
          </h2>
          <p className="text-foreground/50">
            My journey so far.
          </p>
        </motion.div>

        {/* Timeline line - visible on md+ */}
        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-cyan/50 via-purple/50 to-magenta/50 md:block" />

          <div className="flex flex-col gap-8">
            {resumeEntries.map((entry, i) => (
              <TimelineEntry key={entry.title} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
