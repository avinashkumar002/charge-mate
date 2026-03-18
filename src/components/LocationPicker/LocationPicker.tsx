"use client";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import Spinner from "@/components/Spinner/Spinner";

interface LocationPickerProps {
  latitude?: number | null;
  longitude?: number | null;
  onLocationChange: (lat: number, lng: number) => void;
}

// Dynamically import map to avoid SSR issues
const MapComponent = dynamic(() => import("./MapPicker"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-[#F9F9F9] rounded-lg flex items-center justify-center">
      <Spinner size="md" color="#365314" />
    </div>
  ),
});

export default function LocationPicker({
  latitude,
  longitude,
  onLocationChange,
}: LocationPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [tempLat, setTempLat] = useState<number>(latitude || 20.5937);
  const [tempLng, setTempLng] = useState<number>(longitude || 78.9629);
  const [error, setError] = useState("");

  const hasLocation = latitude && longitude;

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setIsDetecting(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setTempLat(lat);
        setTempLng(lng);
        setIsDetecting(false);
        setIsOpen(true);
      },
      (err) => {
        setError("Unable to detect location. Please pick manually.");
        setIsDetecting(false);
        setIsOpen(true);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleConfirm = () => {
    onLocationChange(tempLat, tempLng);
    setIsOpen(false);
  };

  const handleMarkerMove = (lat: number, lng: number) => {
    setTempLat(lat);
    setTempLng(lng);
  };

  return (
    <div className="flex flex-col gap-2">
      <Typography variant="chip" weight={500} className="text-black-900">
        Charger Location
      </Typography>

      {hasLocation && !isOpen && (
        <div className="bg-[#f5f9f0] rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>📍</span>
            <Typography variant="chip" className="text-[#365314]">
              Location set ({latitude?.toFixed(4)}, {longitude?.toFixed(4)})
            </Typography>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="text-[#2C7FFF] text-sm font-medium hover:underline"
          >
            Change
          </button>
        </div>
      )}

      {!isOpen && !hasLocation && (
        <div className="flex gap-3">
          <Button
            text={isDetecting ? "Detecting..." : "📍 Use My Location"}
            type="button"
            bg="#FFFFFF"
            color="#365314"
            hoverBg="#f5f9f0"
            boxShadow="inset 0 0 0 1px #E5E5E5"
            variant="sm"
            onClick={detectLocation}
            icon={isDetecting ? <Spinner size="sm" color="#365314" /> : undefined}
            iconPosition="left"
          />
          <Button
            text="📌 Pick on Map"
            type="button"
            bg="#FFFFFF"
            color="#365314"
            hoverBg="#f5f9f0"
            boxShadow="inset 0 0 0 1px #E5E5E5"
            variant="sm"
            onClick={() => setIsOpen(true)}
          />
        </div>
      )}

      {error && (
        <Typography variant="chip" className="text-red-500">
          {error}
        </Typography>
      )}

      {isOpen && (
        <div className="flex flex-col gap-3">
          <div className="rounded-lg overflow-hidden border border-[#E5E5E5]">
            <MapComponent
              latitude={tempLat}
              longitude={tempLng}
              onMarkerMove={handleMarkerMove}
            />
          </div>
          <Typography variant="chip" className="text-black-500">
            Drag the marker to your charger&apos;s exact location
          </Typography>
          <div className="flex gap-3">
            <Button
              text="Confirm Location"
              type="button"
              bg="#d9f99d"
              color="#101010"
              hoverBg="#bef264"
              variant="sm"
              onClick={handleConfirm}
            />
            <Button
              text="Cancel"
              type="button"
              bg="#FFFFFF"
              color="#365314"
              hoverBg="#F9F9F9"
              boxShadow="inset 0 0 0 1px #E5E5E5"
              variant="sm"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}