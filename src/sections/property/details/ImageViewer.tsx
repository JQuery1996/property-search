"use client";
import React, { useState } from "react";
import { Col, Row, Button, Image as AntdImage } from "antd";
import { ImageWithSkeleton } from "@/components";

type TImageViewer = {
  images: string[];
};

export function ImageViewer({ images }: TImageViewer) {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  return (
    <>
      <Row gutter={[8, 8]}>
        {/* Main image */}
        <Col xs={24} lg={12} style={{ maxHeight: 610 }}>
          <ImageWithSkeleton
            src={images[0]}
            alt="property image"
            style={{ borderRadius: 5, maxHeight: 610 }}
            skeletonStyle={{ borderRadius: 5, maxHeight: 610 }}
          />
        </Col>
        {/* Additional images */}
        <Col xs={24} lg={12} style={{ maxHeight: 610 }}>
          <Row gutter={[8, 4]} style={{ height: "100%" }}>
            {images.slice(1, 5).map((image, index, slicedImages) => (
              <Col xs={12} key={index} style={{ height: "50%" }}>
                <div
                  key={index}
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    padding: 0,
                    margin: 0,
                    maxHeight: 300,
                  }}
                >
                  <ImageWithSkeleton
                    src={image}
                    alt="property image"
                    style={{ borderRadius: 5 }}
                    skeletonStyle={{ borderRadius: 5 }}
                  />
                  {/* Show "Show All Images" button on the last image */}
                  {index === slicedImages.length - 1 && (
                    <Button
                      type="primary"
                      style={{
                        position: "absolute",
                        bottom: 10,
                        insetInlineEnd: 10,
                        zIndex: 1,
                        backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background
                        padding: 10,
                        border: "none",
                        outline: "none",
                      }}
                      onClick={() => setIsPreviewVisible(true)} // Open the preview modal
                    >
                      Show All Images
                    </Button>
                  )}
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Ant Design Image Preview Modal */}
      <AntdImage.PreviewGroup
        items={images}
        preview={{
          visible: isPreviewVisible,
          onVisibleChange: (visible) => setIsPreviewVisible(visible),
        }}
      />
    </>
  );
}
