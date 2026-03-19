"use client";
import { useState, useEffect } from "react";

interface DriverLocation {
  latitude: number;
  longitude: number;
}

export function useDriverLocation() {
  const [location, setLocation] = useState<DriverLocation | null>(null);
  const [isDetecting, setIsDetecting] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setIsDetecting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setIsDetecting(false);
      },
      (err) => {
        setError("Location access denied");
        setIsDetecting(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  return { location, isDetecting, error };
}