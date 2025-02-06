"use client";
import { Col, Flex, Row, Skeleton } from "antd";
import { VerticalCardSkeleton } from "@/components";

export function SavedItemSkeleton() {
  return (
    <Flex vertical style={{ padding: 48 }} gap={48}>
      <Skeleton.Input active size="default" style={{ width: 200 }} />

      {/* Listings Section */}
      <Row gutter={[16, 16]} style={{ margin: "20px 0" }}>
        {Array.from({ length: 4 }).map((_, index) => (
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
