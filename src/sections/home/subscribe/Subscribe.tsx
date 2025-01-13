"use client";
import { Button, Col, Input, Row, theme } from "antd";
import { CustomText, CustomTitle } from "@/components";
import { useTranslations } from "next-intl";

const { useToken } = theme;

export function Subscribe() {
  const { token } = useToken();
  const translate = useTranslations("HomePage.subscribe");
  return (
    <Row
      gutter={[0, 16]}
      style={{ backgroundColor: token.pinkLight, padding: 80, marginTop: 60 }}
    >
      <Col xs={24} lg={12}>
        <CustomTitle level={5}>{translate("title")}</CustomTitle>
        <CustomTitle level={3} style={{ fontWeight: "bold" }}>
          {translate.rich("description", {
            space: () => <br />,
          })}
        </CustomTitle>
        <CustomText style={{ marginTop: 20, display: "block" }}>
          {translate("subDescription")}
        </CustomText>
      </Col>
      <Col xs={24} lg={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            gap: 8,
            height: "100%",
          }}
        >
          <Input
            type="email"
            placeholder="Insert your email here"
            style={{ padding: 10, maxWidth: 350 }}
          />
          <Button type="primary" size="large">
            Subscribe
          </Button>
        </div>
      </Col>
    </Row>
  );
}
