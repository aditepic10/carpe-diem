"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Location } from "@/schemas/schemas";

interface MapProps {
  lng: number;
  lat: number;
  onMarkerSelect: (location: Location) => void;
  selectedLocation: Location | null;
  locations: Location[];
}

export default function Map({
  lng,
  lat,
  onMarkerSelect,
  selectedLocation,
  locations,
}: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (!mapboxgl.accessToken) {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || "";
    }
    if (!mapRef.current && mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [lng, lat],
        zoom: 12,
      });
      mapRef.current.on("load", () => {
        setIsMapReady(true);
      });
    }

    return () => {
      // Clean up markers
      Object.values(markersRef.current).forEach((marker) => marker.remove());
      markersRef.current = {};

      // Remove map instance
      mapRef.current?.remove();
      mapRef.current = null;
      setIsMapReady(false);
    };
  }, [lng, lat]);

  useEffect(() => {
    if (isMapReady && mapRef.current) {
      // Clear existing markers
      Object.values(markersRef.current).forEach((marker) => marker.remove());
      markersRef.current = {};

      // Add markers for each location
      locations.forEach((location) => {
        const el = document.createElement("div");
        el.className = "marker";

        const marker = new mapboxgl.Marker(el)
          .setLngLat([
            location.geocodes.main.longitude,
            location.geocodes.main.latitude,
          ])
          .addTo(mapRef.current!);

        marker
          .getElement()
          .addEventListener("click", () => onMarkerSelect(location));

        markersRef.current[location.fsq_id] = marker;
      });
    }
  }, [isMapReady, locations, onMarkerSelect]);

  useEffect(() => {
    if (isMapReady && mapRef.current && selectedLocation) {
      mapRef.current.flyTo({
        center: [
          selectedLocation.geocodes.main.longitude,
          selectedLocation.geocodes.main.latitude,
        ],
        zoom: 16,
      });

      // Highlight the selected marker
      Object.values(markersRef.current).forEach((marker) => {
        marker.getElement().style.border = "2px solid white";
      });
      const selectedMarker = markersRef.current[selectedLocation.fsq_id];
      if (selectedMarker) {
        selectedMarker.getElement().style.border = "2px solid #FF6F61";
      }
    }
  }, [isMapReady, selectedLocation]);

  return <div ref={mapContainerRef} className="h-full w-full" />;
}
