"use client";
import { Flex } from "antd";
import { useTranslations } from "next-intl";
import { CustomText, CustomTitle } from "@/components";
import { useMediaQuery } from "@/hooks";

export function Welcome() {
  const translate = useTranslations("Common.Welcome");

  return (
    <Flex vertical gap={8}>
      <CustomTitle
        level={1}
        style={{
          marginBottom: 0,
          marginTop: 0,
        }}
      >
        {translate.rich("title", {
          span: (chunks) => (
            <CustomText style={{ fontSize: "inherit" }} type="primary">
              {chunks}
            </CustomText>
          ),
        })}
      </CustomTitle>
      <CustomTitle
        level={5}
        type="secondary"
        style={{ margin: 0, fontWeight: 400 }}
      >
        {translate.rich("description", {
          span: (chunks) => <CustomText>{chunks}</CustomText>,
        })}
      </CustomTitle>
    </Flex>
  );
}
