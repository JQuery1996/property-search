"use client";
import Image from "next/image";
import { useState } from "react";

export function DeveloperImage({ image }: { image?: string }) {
  const [imageError, setImageError] = useState(false);

  // Determine the image source
  const imageSrc =
    image && !imageError ? image : "/images/developers/emmar.png";

  return (
    <div style={{ height: 500, width: "100%" }}>
      <Image
        src={imageSrc}
        alt="developer image"
        width={0}
        height={0}
        sizes="100vw"
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
        priority
        onError={() => setImageError(true)} // Handle image loading errors
      />
    </div>
  );
}
