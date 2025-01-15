"use client";
import { Card, Flex, Skeleton } from "antd";
import styles from "./styles.module.css";
export function VerticalCardSkeleton() {
  const borderRadius = 5;
  return (
    <Card
      style={{
        borderRadius,
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
          }}
        >
          <div
            style={{ width: "100%", height: 200 }}
            className={styles.skeletonImageWrapper}
          >
            <Skeleton.Image
              active
              style={{
                borderRadius,
              }}
            />
          </div>
        </div>
      }
    >
      <Skeleton
        active
        paragraph={{ rows: 1, width: "50%" }}
        style={{ marginBottom: 10 }}
      />
      <Skeleton
        active
        paragraph={{ rows: 1, width: "100%" }}
        style={{ marginBottom: 10 }}
      />
      <Flex gap={4} align="center">
        <Skeleton.Avatar active size={16} shape="circle" />
        <Skeleton.Input active size="small" style={{ width: 150 }} />
      </Flex>
      <Flex gap={25} style={{ margin: "10px 0" }}>
        <Skeleton.Button active size="small" shape="round" />
        <Skeleton.Button active size="small" shape="round" />
        <Skeleton.Button active size="small" shape="round" />
      </Flex>
      <Flex justify="space-between" gap={16}>
        <Skeleton.Button active size="large" block />
        <Skeleton.Button active size="small" shape="round" />
      </Flex>
    </Card>
  );
}
