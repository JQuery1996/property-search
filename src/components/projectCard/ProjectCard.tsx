"use client";
import { Card, Flex, Skeleton, Tag } from "antd";
import { TDevelopmentProperty, TProject } from "@/types";
import { CustomText, CustomTitle } from "@/components";
import Image from "next/image";
import Slider from "react-slick";
import { useTranslations } from "next-intl";
import { useState } from "react";
import styles from "./styles.module.css";

export function ProjectCard({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  developer,
  project,
}: {
  developer: TDevelopmentProperty;
  project: TProject;
}) {
  const translate = useTranslations("developers");
  const borderRadius = 5;

  // State to track loading status of each image
  const [imageLoadingStates, setImageLoadingStates] = useState<boolean[]>(
    project.images.map(() => true), // Initialize all images as loading
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
    <Card
      hoverable
      style={{
        borderRadius,
        cursor: "default",
      }}
      styles={{
        body: {
          padding: 10,
        },
      }}
      cover={
        <div
          style={{
            borderRadius,
            overflow: "hidden",
            position: "relative",
            height: 200,
          }}
        >
          <Slider autoplay infinite speed={1000}>
            {project.images.map((url, index) => (
              <div key={index} style={{ outline: "none", userSelect: "none" }}>
                {/* Skeleton placeholder while image is loading */}
                {imageLoadingStates[index] && (
                  <div className={styles.skeletonImageWrapper}>
                    <Skeleton.Image
                      active
                      style={{
                        width: "100%",
                        height: 200,
                      }}
                    />
                  </div>
                )}

                {/* Image component (always rendered but hidden while loading) */}
                <Image
                  src={url} // Use the URL from the map function
                  alt="property-image"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: 200,
                    objectFit: "fill",
                    visibility: imageLoadingStates[index]
                      ? "hidden"
                      : "visible", // Hide image while loading
                  }}
                  onLoad={() => handleImageLoad(index)} // Hide skeleton when image is loaded
                  loading="lazy" // Enable lazy loading
                />
              </div>
            ))}
          </Slider>

          <div
            style={{
              position: "absolute",
              top: "4%",
              insetInlineStart: "4%",
              backgroundColor: "rgba(0,0,0,0.8)",
              color: "white",
              borderRadius: 6,
              padding: "2px 6px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.8)", // Add shadow
              zIndex: 2, // Ensure icons are above the image and skeleton
            }}
          >
            {project.status}
          </div>

          <div
            style={{
              position: "absolute",
              top: "4%",
              insetInlineEnd: "4%",
              backgroundColor: "rgba(0,0,0,0.8)",
              padding: "2px 6px",
              color: "white",
              borderRadius: 6,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",

              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.8)", // Add shadow
              zIndex: 2, // Ensure icons are above the image and skeleton
            }}
          >
            {translate("from")} : {project.price}
          </div>
        </div>
      }
    >
      <Flex vertical style={{ marginTop: 10 }} gap={8}>
        <CustomTitle level={4} ellipsis>
          {project.name}
        </CustomTitle>
        <CustomText
          type="secondary"
          title={project.description}
          className="truncated-text-2"
        >
          {project.description}
        </CustomText>
        <Flex gap={2} align="center">
          <Image
            src="/images/icons/address.svg"
            width={20}
            height={20}
            alt="address"
          />
          <CustomText>{project.address}</CustomText>
        </Flex>
        <Flex justify="space-between" wrap style={{ rowGap: 10 }}>
          <Tag color="pink">
            {translate("salesStarted")} :{" "}
            {new Date(project.sales_started).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Tag>
          <Tag color="success">
            {translate("deliveryDate")} :{" "}
            {new Date(project.delivery_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Tag>
        </Flex>
      </Flex>
    </Card>
  );
}
