"use client";
import { Flex, theme } from "antd";
import { CategoryList, CustomText, CustomTitle } from "@/components";
import { useResponsive } from "antd-style";
const { useToken } = theme;

export function PropertyCategory() {
  const { token } = useToken();
  const { xl } = useResponsive();
  return (
    <Flex
      align="center"
      vertical
      gap={8}
      style={{
        margin: "40px 0",
        backgroundColor: token.pinkLight,
        borderRadius: "8px 8px 24px 24px",
        padding: 40,
      }}
    >
      <CustomText type="primary" style={{ fontWeight: "500" }}>
        Property Category
      </CustomText>
      <CustomTitle level={1} style={{ fontWeight: "bold" }}>
        Choose Property by Category
      </CustomTitle>
      <CategoryList
        gutter={[16, 16]}
        style={{ width: xl ? "70%" : "100%", margin: "30px 0" }}
      />
    </Flex>
  );
}
