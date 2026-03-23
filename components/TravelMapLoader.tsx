"use client";

import dynamic from "next/dynamic";

const TravelMap = dynamic(() => import("./TravelMap"), { ssr: false });

export default function TravelMapLoader() {
  return <TravelMap />;
}
