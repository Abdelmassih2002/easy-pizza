"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// تصليح مشكلة أيقونة Leaflet في Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapPickerProps {
  onLocationSelect: (lat: number, lng: number) => void;
  initialLat?: number;
  initialLng?: number;
}

function MapEvents({ onMove }: { onMove: (lat: number, lng: number) => void }) {
  const map = useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      onMove(center.lat, center.lng);
    },
  });
  return null;
}

export default function MapPicker({ onLocationSelect, initialLat, initialLng }: MapPickerProps) {
  const defaultPos: [number, number] = [initialLat || 30.0872, initialLng || 31.3386];
  const [pos, setPos] = useState<[number, number]>(defaultPos);

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={defaultPos}
        zoom={15}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={pos} icon={icon} />
        <MapEvents
          onMove={(lat, lng) => {
            setPos([lat, lng]);
            onLocationSelect(lat, lng);
          }}
        />
      </MapContainer>
      {/* مؤشر في المنتصف لزيادة دقة الاختيار */}
      <div className="pointer-events-none absolute inset-0 z-[1000] flex items-center justify-center">
        <div className="mb-10 text-4xl">📍</div>
      </div>
    </div>
  );
}