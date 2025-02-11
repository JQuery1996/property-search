"use client";
import { Button, Col, Flex, Row, theme } from "antd";
import { CustomText, CustomTitle } from "@/components";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useResponsive } from "antd-style";
const { useToken } = theme;

export function OurApplication() {
  const { token } = useToken();
  const translate = useTranslations("HomePage.ourApplication");
  const { lg } = useResponsive();
  return (
    <Row
      style={{
        backgroundColor: token.colorPrimary,
        padding: "40px 80px",
        marginTop: 30,
        marginBottom: 50,
        height: 400,
        maxHeight: 400,
        overflow: "hidden",
      }}
    >
      <Col xs={24} lg={12} style={{ height: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <CustomText style={{ color: "white" }}>
            {translate("title")}
          </CustomText>
          <CustomTitle
            level={lg ? 3 : 5}
            style={{ fontWeight: "bold", color: "white" }}
          >
            {translate("description")}
          </CustomTitle>
          <CustomText
            style={{ color: "white", display: "block", marginTop: 20 }}
          >
            {translate("miniDescription")}
          </CustomText>
          <Flex gap={12} style={{ marginTop: 40 }}>
            <Button
              style={{
                backgroundColor: "white",
                borderColor: "white",
                padding: 15,
              }}
              icon={
                <Image
                  src="/images/icons/apple.svg"
                  width={20}
                  height={20}
                  alt="apple"
                />
              }
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <CustomText
                  style={{ fontSize: 9, lineHeight: 1.1, textAlign: "start" }}
                >
                  {translate("downloadOnThe")}
                </CustomText>
                <CustomText
                  style={{
                    lineHeight: 1.1,
                    fontWeight: "bold",
                    textAlign: "start",
                  }}
                >
                  {translate("appleStore")}
                </CustomText>
              </div>
            </Button>
            <Button
              style={{
                backgroundColor: "white",
                borderColor: "white",
                padding: 15,
              }}
              icon={
                <Image
                  src="/images/icons/googleStore.svg"
                  width={20}
                  height={20}
                  alt="apple"
                />
              }
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <CustomText
                  style={{ fontSize: 9, lineHeight: 1.1, textAlign: "start" }}
                >
                  {translate("getItOn")}
                </CustomText>
                <CustomText
                  style={{
                    lineHeight: 1.1,
                    fontWeight: "bold",
                    textAlign: "start",
                  }}
                >
                  {translate("googlePlay")}
                </CustomText>
              </div>
            </Button>
          </Flex>
        </div>
      </Col>
      <Col xs={0} lg={12}>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "end",
            overflow: "hidden",
          }}
        >
          <Image
            src="/images/home/mobile.svg"
            alt="mobile"
            width={400}
            height={420}
          />
        </div>
      </Col>
    </Row>
  );
}
