"use client";
import { Col, Flex, Row, Skeleton } from "antd";
import { DeveloperCardSkeleton } from "./DeveloperCardSkeleton";

export function DevelopersSkeleton() {
  return (
    <>
      <Row gutter={[16, 16]} style={{ margin: "20px 0" }}>
        {Array.from({ length: 12 }).map((_, index) => (
          <Col key={index} xs={24} md={12} lg={8} xl={6}>
            <DeveloperCardSkeleton /> {/* Use the custom skeleton component */}
          </Col>
        ))}
      </Row>

      {/* Pagination Section */}
      <Flex justify="center" style={{ margin: "20px 0" }}>
        <Skeleton.Button active size="large" style={{ width: 300 }} />
      </Flex>
    </>
  );
}
