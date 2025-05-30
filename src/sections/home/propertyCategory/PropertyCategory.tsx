"use client";
import { Flex, theme } from "antd";
import { CategoryList, CustomTitle } from "@/components";
import { useResponsive } from "antd-style";
import { useTranslations } from "next-intl";
const { useToken } = theme;

export function PropertyCategory() {
  const { token } = useToken();
  const { xl } = useResponsive();
  const translate = useTranslations("HomePage.category");

  return (
    <Flex
      align="center"
      vertical
      gap={8}
      style={{
        margin: "40px 0",
        backgroundColor: token.pinkLight,
        padding: 40,
      }}
    >
      <CustomTitle level={1} style={{ fontWeight: "bold" }}>
        {translate("chooseProperty")}
      </CustomTitle>
      <CategoryList
        gutter={[16, 16]}
        style={{ width: xl ? "70%" : "100%", margin: "30px 0" }}
      />
    </Flex>
  );
}
