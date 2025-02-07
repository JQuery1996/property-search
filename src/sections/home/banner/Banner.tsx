"use client";
import Image from "next/image";
import { CustomTitle } from "@/components";
import { Flex } from "antd";
import { Filter } from "../filter";
import { useTranslations } from "next-intl";
import { TFilterSettings } from "@/types";
import { useResponsive } from "antd-style";

export function Banner({
  filterSettings,
}: {
  filterSettings: TFilterSettings;
}) {
  const translate = useTranslations("HomePage.Banner");
  const { lg } = useResponsive();
  return (
    <div style={{ position: "relative", height: 500, width: "100%" }}>
      <Image
        src="/images/home/banner.svg"
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
          insetInlineStart: lg ? "3%" : "1%",
          padding: "20px 40px",
          backgroundColor: "#0F0A0C4D",
          ...(lg && {
            minWidth: 900,
          }),
          maxWidth: 1000,
        }}
        vertical
        gap={16}
      >
        <CustomTitle level={4} style={{ color: "white", margin: 0 }}>
          {translate("greeting")}
        </CustomTitle>
        <CustomTitle
          level={1}
          style={{
            color: "white",
            fontWeight: 700,
            ...(lg && {
              letterSpacing: 1.5,
              fontSize: 68,
            }),
          }}
        >
          {translate("vision")}
        </CustomTitle>
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
