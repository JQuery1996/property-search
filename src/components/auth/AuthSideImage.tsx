import Image from "next/image";
import { CustomText, Logo } from "@/components";
import { Flex } from "antd";
import React from "react";
import { useTranslations } from "next-intl";

export function AuthSideImage() {
  const translate = useTranslations("Common.Auth");
  return (
    <>
      <div
        style={{
          position: "relative",
          height: "100%",
          padding: "0 10px",
        }}
      >
        <Image
          src="/images/auth/auth.jpg"
          width={606}
          height={615}
          alt="login image"
          priority
          style={{ borderRadius: "5px", width: "100%", height: "100%" }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: "10%",
          insetInlineStart: "10%",
          paddingRight: "10px",
        }}
      >
        <CustomText
          style={{ color: "white", fontSize: "54px", fontWeight: "bold" }}
        >
          {translate("startJourney")}
        </CustomText>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          insetInlineEnd: "14%",
          width: 350,
        }}
      >
        <Flex gap="8px" align={"center"}>
          <Logo
            style={{
              width: "50px",
              height: "34px",
              background: "white",
              borderRadius: "20px",
              padding: "5px",
            }}
          />
          <CustomText style={{ color: "white", fontSize: "16px" }}>
            {translate("propertySearchDescription")}
          </CustomText>
        </Flex>
      </div>
    </>
  );
}
