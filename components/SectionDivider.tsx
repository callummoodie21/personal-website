"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-4">
      <motion.div
        className="h-px w-full max-w-md"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(110,231,183,0.3), rgba(196,181,253,0.5), rgba(110,231,183,0.3), transparent)",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}
