"use client";

import React, { useRef, useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Input, Spin } from "antd";
import Image from "next/image";
import { useLocale } from "use-intl";

const libraries: ("places" | "drawing" | "geometry")[] = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  position: "relative",
} as any;

const center = {
  lat: 25.2048, // Default center (Dubai)
  lng: 55.2708,
};

interface MapWithSearchProps {
  onLocationSelect: (lat: number, lng: number) => void;
  initialLocation?: { lat: number; lng: number }; // Add initialLocation prop
}

export function MapWithSearch({
  onLocationSelect,
  initialLocation,
}: MapWithSearchProps) {
  const locale = useLocale();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
    language: locale === "cn" ? "zh-CN" : locale,
  });

  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(initialLocation || null); // Initialize with initialLocation
  const [searchQuery, setSearchQuery] = useState("");
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isLoaded && inputRef.current) {
      autocompleteRef.current = new google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["geocode"],
        },
      );

      autocompleteRef.current.addListener("place_changed", onPlaceChanged);
    }
  }, [isLoaded]);

  function onPlaceChanged() {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setSelectedLocation({ lat, lng });
        onLocationSelect(lat, lng);
        setSearchQuery(place.formatted_address || "");

        if (mapRef.current) {
          mapRef.current.panTo({ lat, lng });
          mapRef.current.setZoom(15);
        }
      }
    }
  }

  const onMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setSelectedLocation({ lat, lng });
      onLocationSelect(lat, lng);

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results?.[0]) {
          setSearchQuery(results[0].formatted_address);
        }
      });
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded)
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          minHeight: 200,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );

  return (
    <div style={mapContainerStyle}>
      {/* Search input */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Input
          ref={(node) => {
            if (node?.input) inputRef.current = node.input; // Get native <input> reference
          }}
          size="large"
          prefix={
            <Image
              src="/images/icons/search.svg"
              alt="search"
              width={20}
              height={20}
            />
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          style={{ maxWidth: 300, backgroundColor: "rgba(255,255,255,.8)" }}
          allowClear
        />
      </div>

      {/* Google Map */}
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%", borderRadius: 10 }}
        zoom={12}
        center={selectedLocation || center} // Use selectedLocation or default center
        onClick={onMapClick}
        onLoad={(map) => (mapRef.current = map) as any}
      >
        {selectedLocation && <Marker position={selectedLocation} />}
      </GoogleMap>
    </div>
  );
}
