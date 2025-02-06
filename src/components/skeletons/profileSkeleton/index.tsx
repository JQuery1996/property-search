"use client";
import { Card, Flex, Skeleton } from "antd";

export function ProfileSkeleton() {
  return (
    <Flex vertical gap={32} style={{ padding: 48 }}>
      {/* Title Skeleton */}
      <Skeleton.Input active size="large" style={{ width: 200 }} />

      {/* User Info Card Skeleton */}
      <Card>
        <Flex gap={16}>
          {/* Avatar Skeleton */}
          <Skeleton.Avatar active size={50} shape="circle" />

          {/* User Info Skeleton */}
          <Flex vertical gap={8} style={{ flex: 1 }}>
            <Skeleton.Input active size="small" style={{ width: 150 }} />
            <Skeleton.Input active size="small" style={{ width: 200 }} />
          </Flex>
        </Flex>
      </Card>

      {/* Profile Form Skeleton */}
      <Card>
        <Flex vertical gap={16}>
          {/* Form Fields Skeleton */}
          <Skeleton.Input active block size="large" />
          <Skeleton.Input active block size="large" />
          <Skeleton.Input active block size="large" />
          <Skeleton.Input active block size="large" />
          <Skeleton.Input active block size="large" />
          <Skeleton.Input active block size="large" />

          {/* Buttons Skeleton */}
          <Flex justify="center" gap={16}>
            <Skeleton.Button active size="large" />
            <Skeleton.Button active size="large" />
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
