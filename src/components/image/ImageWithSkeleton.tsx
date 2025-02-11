"use client";
import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Skeleton } from "antd";
import styles from "./styles.module.css";

// Extend ImageProps with custom skeletonStyle prop
type ImageWithSkeletonProps = Omit<ImageProps, "src"> & {
  src?: string | null | undefined;
  skeletonStyle?: React.CSSProperties;
};

export function ImageWithSkeleton({
  src,
  alt,
  style,
  skeletonStyle,
  ...rest
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Handle image load success
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // Handle image loading errors
  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <>
      {/* Render skeleton if loading or on error */}
      {(isLoading || hasError) && (
        <div
          className={styles.skeletonImageWrapper}
          style={{ width: "100%", height: "100%", ...skeletonStyle }}
        >
          <Skeleton.Image
            active
            style={{
              width: "100%",
              height: "100%",
              ...skeletonStyle,
            }}
          />
        </div>
      )}

      {/* Render the image */}
      {src && (
        <Image
          src={src}
          width={0}
          height={0}
          sizes="100vw"
          priority
          style={{
            width: "100%",
            height: "100%",
            objectFit: "fill",
            visibility: isLoading || hasError ? "hidden" : "visible", // Hide if loading or error
            ...style,
          }}
          alt={alt}
          onLoad={handleImageLoad} // Triggered when the image is successfully loaded
          onError={handleImageError} // Triggered on image load error
          {...rest} // Pass all other next/image props
        />
      )}
    </>
  );
}
