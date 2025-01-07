"use client";
import Image from "next/image";
import { CustomText, CustomTitle } from "@/components";
import { Button, Flex } from "antd";
import { useMediaQuery } from "@/hooks";
import { Filter } from "../filter";
import { useTranslations } from "next-intl";

export function Banner() {
  const { lessThan } = useMediaQuery();
  const translate = useTranslations("HomePage.Banner");
  const isSmall = lessThan("sm");
  return (
    <div style={{ position: "relative", height: "659px", width: "100%" }}>
      <Image
        src="/images/home/banner.png"
        alt="home page banner"
        fill
        style={{ objectFit: "cover" }}
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
        <Filter />
      </div>
    </div>
  );
}
