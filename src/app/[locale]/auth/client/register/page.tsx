import { Col, Row } from "antd";
import { AuthCard, ClientRegisterForm } from "@/sections";
import { useTranslations } from "next-intl";
import { AuthSideImage } from "@/components";
import React from "react";

export default function RegisterClientPage() {
  const translate = useTranslations("RegisterPage.Client");
  return (
    <Row style={{ margin: "0 5%" }}>
      {/* Image Column */}
      <Col xs={0} xl={12}>
        <AuthSideImage />
      </Col>
      {/* Auth Card Column */}
      <Col xs={24} xl={12}>
        <AuthCard action={translate("action")}>
          <ClientRegisterForm />
        </AuthCard>
      </Col>
    </Row>
  );
}
