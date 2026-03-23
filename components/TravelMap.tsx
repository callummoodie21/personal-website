"use client";

import { useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { fadeInUp } from "@/lib/motion";
import { travelData } from "@/data/travel";
import type { City } from "@/lib/types";
import SectionWrapper from "./SectionWrapper";
import ImageCarousel from "./ImageCarousel";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const isoAlpha3ToNumeric: Record<string, string> = {
  GBR: "826", ESP: "724", CYP: "196", GRC: "300", BEL: "056",
  CZE: "203", MLT: "470", ROU: "642", LVA: "428", HUN: "348",
  DNK: "208", SVK: "703", IRL: "372", ITA: "380", XKX: "-99",
  MKD: "807", SVN: "705", AUT: "040", PRT: "620", CAN: "124",
  POL: "616", DEU: "276",
};

const visitedNumericIDs = new Set(
  travelData.countries.map((c) => isoAlpha3ToNumeric[c.iso]).filter(Boolean)
);

const subscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

export default function TravelMap() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const mounted = useMounted();

  if (!mounted) {
    return (
      <section id="travel" className="relative px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-2 text-3xl font-bold sm:text-4xl">
            <span className="gradient-text">Travel</span>
          </h2>
          <p className="mb-12 text-foreground/50">Loading map...</p>
          <div className="glass aspect-[2/1] animate-pulse rounded-2xl" />
        </div>
      </section>
    );
  }

  return (
    <SectionWrapper id="travel">
      <div className="mx-auto max-w-6xl">
        <motion.div variants={fadeInUp} className="mb-12">
          <h2 className="mb-2 text-3xl font-bold sm:text-4xl">
            <span className="gradient-text">Travel</span>
          </h2>
          <p className="text-foreground/50">
            Places I&apos;ve explored. Click a city marker to see photos.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="glass overflow-hidden rounded-2xl"
        >
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 150,
              center: [10, 50],
            }}
            style={{ width: "100%", height: "auto" }}
          >
            <ZoomableGroup>
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const isVisited = visitedNumericIDs.has(geo.id);
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={isVisited ? "#ffa200" : "#1a1a2e"}
                        stroke="#2a2a3e"
                        strokeWidth={0.5}
                        style={{
                          default: {
                            outline: "none",
                            transition: "fill 0.3s",
                          },
                          hover: {
                            fill: isVisited ? "#fdcf58" : "#252540",
                            outline: "none",
                            cursor: isVisited ? "pointer" : "default",
                          },
                          pressed: { outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>

              {/* City markers */}
              {travelData.cities.map((city) => (
                <Marker
                  key={city.name}
                  coordinates={city.coordinates}
                  onClick={() => city.images.length > 0 && setSelectedCity(city)}
                  onMouseEnter={() => setHoveredCity(city.name)}
                  onMouseLeave={() => setHoveredCity(null)}
                >
                  <g style={{ cursor: city.images.length > 0 ? "pointer" : "default" }}>
                    <circle
                      r={2.5}
                      fill="#ff0040"
                      stroke="#0a0a0a"
                      strokeWidth={1}
                      opacity={0.9}
                    />
                  </g>
                  {hoveredCity === city.name && (
                    <text
                      textAnchor="middle"
                      y={-8}
                      style={{
                        fill: "#ededed",
                        fontSize: "6px",
                        fontFamily: "var(--font-geist-sans), system-ui",
                        pointerEvents: "none",
                      }}
                    >
                      {city.name}
                    </text>
                  )}
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>
        </motion.div>

        {/* Legend */}
        <motion.div
          variants={fadeInUp}
          className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-foreground/40"
        >
          <div className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-sm bg-cyan" />
            Countries visited
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-magenta" />
            City markers (clickable)
          </div>
          <span>
            {travelData.countries.length} countries · {travelData.cities.length}{" "}
            cities
          </span>
        </motion.div>
      </div>

      {/* Image carousel modal */}
      <AnimatePresence>
        {selectedCity && (
          <ImageCarousel
            city={selectedCity}
            onClose={() => setSelectedCity(null)}
          />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
