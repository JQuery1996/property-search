"use client";
import { Flex } from "antd";
import { Logo } from "@/components/common/Logo";
import Title from "antd/es/typography/Title";
import { APP } from "@/constants";

export function LogoWithBrand() {
  return (
    <Flex justify="center" gap={8}>
      <Logo style={{ width: "30px", height: "30px" }} />
      <Title level={4} style={{ margin: 0, fontWeight: 400 }}>
        {APP.name}
      </Title>
    </Flex>
  );
}
