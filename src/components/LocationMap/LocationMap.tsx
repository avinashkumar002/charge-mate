"use client";
import dynamic from "next/dynamic";
import Spinner from "@/components/Spinner/Spinner";

interface LocationMapProps {
  latitude: number;
  longitude: number;
  title?: string;
}

const MapDisplay = dynamic(() => import("./MapDisplay"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-48 bg-[#F9F9F9] rounded-lg flex items-center justify-center">
      <Spinner size="md" color="#365314" />
    </div>
  ),
});

export default function LocationMap({ latitude, longitude, title }: LocationMapProps) {
  return (
    <div className="rounded-lg overflow-hidden border border-[#E5E5E5]">
      <MapDisplay latitude={latitude} longitude={longitude} title={title} />
    </div>
  );
}