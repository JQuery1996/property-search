"use client";
import { Col, Flex, Row, Skeleton } from "antd";
import { ProjectCardSkeleton } from "./ProjectCardSkeleton";
import styles from "./styles.module.css";

export function ProjectsSkeleton() {
  return (
    <>
      <div
        style={{ height: 500, width: "100%" }}
        className={styles.skeletonImageWrapper}
      >
        <Skeleton.Image active style={{ width: "100%", height: "100%" }} />
      </div>
      <Flex vertical gap={16} style={{ padding: 48 }}>
        <Skeleton.Button
          active
          size="small"
          shape="round"
          style={{ width: "30%" }}
        />
        <Skeleton paragraph={{ rows: 1 }} active />

        <Skeleton.Button
          active
          size="small"
          shape="round"
          style={{ width: "20%" }}
        />

        <Row gutter={[16, 16]} style={{ margin: "20px 0" }}>
          {Array.from({ length: 12 }).map((_, index) => (
            <Col key={index} xs={24} md={12} lg={8} xl={6}>
              <ProjectCardSkeleton /> {/* Use the custom skeleton component */}
            </Col>
          ))}
        </Row>
      </Flex>
    </>
  );
}
