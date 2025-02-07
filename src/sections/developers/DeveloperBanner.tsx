"use client";
import Image from "next/image";
import { Flex } from "antd";
import { CustomTitle } from "@/components";
import { useResponsive } from "antd-style";
import { useTranslations } from "next-intl";

export function DeveloperBanner() {
  const translate = useTranslations("developers.Banner");
  const { lg } = useResponsive();
  return (
    <div style={{ position: "relative", height: 500, width: "100%" }}>
      <Image
        src="/images/developers/emmar.png"
        alt="home page banner"
        width={0}
        height={0}
        sizes="100vw"
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
        priority
      />
      <Flex
        vertical
        gap={16}
        style={{
          position: "absolute",
          top: "20%",
          insetInlineStart: lg ? "3%" : "1%",
          padding: "20px 40px",
          backgroundColor: "#0F0A0C4D",
          ...(lg && {
            minWidth: 900,
          }),
        }}
      >
        <CustomTitle
          level={1}
          style={{
            color: "white",
            fontWeight: 900,
            ...(lg && {
              letterSpacing: 1.5,
              fontSize: 68,
            }),
          }}
        >
          {translate("findDeveloper")}
        </CustomTitle>
        <CustomTitle
          level={2}
          style={{
            color: "white",
            ...(lg && {
              fontSize: 30,
              letterSpacing: 1.5,
            }),
          }}
        >
          {translate.rich("vision", {
            space: () => <br />,
          })}
        </CustomTitle>
      </Flex>
    </div>
  );
}
