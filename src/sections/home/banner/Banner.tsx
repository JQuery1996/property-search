"use client";
import Image from "next/image";
import { CustomText, CustomTitle } from "@/components";
import { Button, Flex } from "antd";
import { useMediaQuery } from "@/hooks";
import { Filter } from "../filter";
import { useTranslations } from "next-intl";
import { TFilterSettings } from "@/types";

export function Banner({
  filterSettings,
}: {
  filterSettings: TFilterSettings;
}) {
  const { lessThan } = useMediaQuery();
  const translate = useTranslations("HomePage.Banner");
  const isSmall = lessThan("sm");
  return (
    <div style={{ position: "relative", height: "659px", width: "100%" }}>
      <Image
        src="/images/home/banner.png"
        alt="home page banner"
        width={0}
        height={0}
        sizes="100vw"
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
        priority
      />
      <Flex
        style={{
          position: "absolute",
          top: "20%",
          padding: "0 40px",
          maxWidth: "1000px",
        }}
        vertical
        gap={8}
      >
        <CustomTitle level={4} style={{ color: "white", margin: 0 }}>
          {translate("greeting")}
        </CustomTitle>
        <CustomTitle
          level={1}
          style={{
            color: "white",
            margin: 0,
            fontSize: isSmall ? "40px" : "68px",
            lineHeight: isSmall ? "60px" : "102px",
          }}
        >
          {translate("vision")}
        </CustomTitle>
        <CustomText
          style={{
            color: "white",
            margin: 0,
            fontSize: "24px",
          }}
        >
          {translate("description")}
        </CustomText>
        <Button
          type="primary"
          size="large"
          style={{ width: "fit-content", padding: "0 60px" }}
        >
          {translate("publishProperty")}
        </Button>
      </Flex>
      <div
        style={{
          position: "absolute",
          bottom: "-40px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Filter filterSettings={filterSettings} />
      </div>
    </div>
  );
}
