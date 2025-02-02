"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useState } from "react";
import { useResponsive } from "antd-style";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import styles from "./styles.module.css";
import { Skeleton } from "antd";
import Image from "next/image";

const slidesPerViewConfig = {
  xs: 3, // Extra small screens
  sm: 3, // Small screens
  md: 4, // Medium screens
  lg: 6, // Large screens
  xl: 8, // Extra large screens
  xxl: 10, // Extra extra large screens
};

export function ThumbnailCarousel({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { xs, sm, md, lg, xl, xxl, mobile } = useResponsive();
  // Determine the current breakpoint
  const getCurrentBreakpoint = () => {
    if (xxl) return "xxl";
    if (xl) return "xl";
    if (lg) return "lg";
    if (md) return "md";
    if (sm) return "sm";
    if (xs) return "xs";
    return "xs"; // Default fallback
  };
  // Get the slidesPerView value for the current breakpoint
  const currentBreakpoint = getCurrentBreakpoint();
  const slidesPerView = slidesPerViewConfig[currentBreakpoint];

  const sliderHeight = mobile ? 300 : 550;

  const [imageLoadingStates, setImageLoadingStates] = useState<boolean[]>(
    images.map(() => true), // Initialize all images as loading
  );

  // Function to handle image load
  const handleImageLoad = (index: number) => {
    setImageLoadingStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = false; // Mark this image as loaded
      return newStates;
    });
  };
  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
        style={{ height: sliderHeight }}
      >
        {images.map((url, index) => (
          <SwiperSlide key={index}>
            {/* Skeleton placeholder while image is loading */}
            {imageLoadingStates[index] && (
              <div className={styles.skeletonImageWrapper}>
                <Skeleton.Image
                  active
                  style={{
                    width: "100%",
                    height: sliderHeight,
                  }}
                />
              </div>
            )}

            {/* Image component (always rendered but hidden while loading) */}
            <Image
              src={url}
              alt="property-image"
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: sliderHeight,
                objectFit: "fill",
                visibility: imageLoadingStates[index] ? "hidden" : "visible",
              }}
              onLoad={() => handleImageLoad(index)}
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper as any}
        spaceBetween={10}
        slidesPerView={slidesPerView}
        freeMode={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((url, index) => (
          <SwiperSlide key={index}>
            {/* Skeleton placeholder while image is loading */}
            {imageLoadingStates[index] && (
              <div className={styles.skeletonImageWrapper}>
                <Skeleton.Image
                  active
                  style={{
                    width: "100%",
                    height: 100,
                    margin: "0 5px",
                  }}
                />
              </div>
            )}

            {/* Image component (always rendered but hidden while loading) */}
            <Image
              src={url}
              alt="property-image"
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: 100,
                objectFit: "fill",
                visibility: imageLoadingStates[index] ? "hidden" : "visible",
              }}
              onLoad={() => handleImageLoad(index)}
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
