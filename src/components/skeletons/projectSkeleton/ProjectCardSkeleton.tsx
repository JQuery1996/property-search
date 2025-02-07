"use client";
import { Card, Flex, Skeleton } from "antd";
import styles from "./styles.module.css";

export function ProjectCardSkeleton() {
  const borderRadius = 5;

  return (
    <Card
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
          {/* Skeleton for the image slider */}
          <div
            className={styles.skeletonImageWrapper}
            style={{ height: "100%" }}
          >
            <Skeleton.Image
              active
              style={{
                width: "100%",
                height: 200,
              }}
            />
          </div>
        </div>
      }
    >
      <Flex vertical style={{ marginTop: 10 }} gap={8}>
        {/* Skeleton for the project name */}
        <Skeleton.Input active block size="default" />

        {/* Skeleton for the project description */}
        <Skeleton paragraph={{ rows: 2 }} active />

        {/* Skeleton for the address */}
        <Flex gap={2} align="center">
          <Skeleton.Avatar active size="small" shape="square" />
          <Skeleton.Input active size="small" style={{ width: 150 }} />
        </Flex>

        {/* Skeleton for the tags */}
        <Flex justify="space-between" wrap style={{ rowGap: 10 }}>
          <Skeleton.Button active size="small" shape="round" />
          <Skeleton.Button active size="small" shape="round" />
        </Flex>
      </Flex>
    </Card>
  );
}
