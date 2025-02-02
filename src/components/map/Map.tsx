"use client";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

export function Map({ position }: { position: { lat: number; lng: number } }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAxr_-XbQy6lcqUnab2zF51gEKOfqDlo60", // Replace with your API key
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={13}
      center={position}
    >
      <Marker position={position} />
    </GoogleMap>
  );
}
