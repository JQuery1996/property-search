"use client";
import { Skeleton, Flex, Card } from "antd";

export function NotificationsSkeleton() {
  return (
    <div>
      {/* Skeleton for Notifications */}
      {Array.from({ length: 5 }).map((_, index) => (
        <Card
          key={index}
          styles={{
            body: {
              padding: 10,
            },
          }}
        >
          <Flex gap={12}>
            {/* Skeleton for Image */}
            <Skeleton.Image active style={{ width: 100, height: 100 }} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
            >
              {/* Skeleton for Title */}
              <Skeleton.Input
                active
                size="small"
                style={{ width: "80%", marginBottom: 8 }}
              />
              {/* Skeleton for Type */}
              <Skeleton.Input
                active
                size="small"
                style={{ width: "60%", marginBottom: 8 }}
              />
              {/* Skeleton for Date */}
              <Skeleton.Input
                active
                size="small"
                style={{ width: "40%", marginBottom: 8 }}
              />
            </div>
          </Flex>
        </Card>
      ))}

      {/* Skeleton for Pagination */}
      <Flex justify="center" style={{ margin: "20px 0" }}>
        <Skeleton.Button active size="large" shape="round" />
      </Flex>
    </div>
  );
}
