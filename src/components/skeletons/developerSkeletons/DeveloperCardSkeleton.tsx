"use client";
import { Card, Skeleton } from "antd";
import styles from "./styles.module.css";
export function DeveloperCardSkeleton() {
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
        paragraph={{ rows: 1, width: "100%" }}
        style={{ marginBottom: 10 }}
      />
      <Skeleton.Button active size="large" />
    </Card>
  );
}
