"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { useFetchPlaces } from "@/hooks/useFetchPlaces";
import { Location } from "@/schemas/schemas";
import Sidebar from "@/components/Sidebar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";

const Map = dynamic(() => import("@/components/Map"), {
  loading: () => <p>Loading map...</p>,
  ssr: false,
});

export default function Home() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocationError(
            "Unable to retrieve your location. Using default location."
          );
          // Fallback to a default location (e.g., Austin, TX)
          setLocation({ lat: 30.2672, lng: -97.7431 });
        }
      );
    } else {
      setLocationError(
        "Geolocation is not supported by your browser. Using default location."
      );
      setLocation({ lat: 30.2672, lng: -97.7431 });
    }
  }, []);

  const { places, isLoading, error } = useFetchPlaces(
    location?.lat ?? 0,
    location?.lng ?? 0
  );

  const handleMarkerSelect = (place: Location) => {
    setSelectedLocation(place);
    const element = document.getElementById(`sidebar-item-${place.fsq_id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSurpriseClick = () => {
    if (places.length > 0) {
      const topPlaces = places.slice(0, 10);
      const randomPlace =
        topPlaces[Math.floor(Math.random() * topPlaces.length)];
      setSelectedLocation(randomPlace);
      const element = document.getElementById(
        `sidebar-item-${randomPlace.fsq_id}`
      );
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  if (!location) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-2">Loading your location...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      {(locationError || error) && (
        <Alert variant="destructive" className="m-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{locationError || error}</AlertDescription>
        </Alert>
      )}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          onSurpriseClick={handleSurpriseClick}
          locations={places}
          selectedLocation={selectedLocation}
          onLocationSelect={handleMarkerSelect}
          isLoading={isLoading}
          error={error}
        />
        <div className="w-2/3">
          <Map
            lng={location.lng}
            lat={location.lat}
            onMarkerSelect={handleMarkerSelect}
            selectedLocation={selectedLocation}
            locations={places}
          />
        </div>
      </div>
    </div>
  );
}
