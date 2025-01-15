"use client";
import { Col, Flex, Row, Skeleton } from "antd";
import { VerticalCardSkeleton } from "@/components";

export function PropertiesSkeleton() {
  return (
    <Flex vertical gap={4} style={{ width: "87%" }}>
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        {/* Title and Subtitle Skeleton */}
        <Flex gap={4} align="center">
          <Skeleton.Input active size="default" style={{ width: 200 }} />
          <Skeleton.Input active size="small" style={{ width: 100 }} />
        </Flex>

        {/* Button Skeleton */}
        <Skeleton.Button active size="default" shape="circle" />
      </div>

      {/* Listings Section */}
      <Row gutter={[16, 16]} style={{ margin: "20px 0" }}>
        {Array.from({ length: 12 }).map((_, index) => (
          <Col key={index} xs={24} md={12} lg={8} xl={6}>
            <VerticalCardSkeleton /> {/* Use the custom skeleton component */}
          </Col>
        ))}
      </Row>

      {/* Pagination Section */}
      <Flex justify="center" style={{ margin: "20px 0" }}>
        <Skeleton.Button active size="large" style={{ width: 300 }} />
      </Flex>
    </Flex>
  );
}
