"use client";

import { motion } from "framer-motion";
import { staggerContainer, viewportConfig } from "@/lib/motion";

interface SectionWrapperProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

export default function SectionWrapper({
  children,
  id,
  className = "",
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      className={`relative px-6 py-24 md:px-12 lg:px-24 ${className}`}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
    >
      {children}
    </motion.section>
  );
}
