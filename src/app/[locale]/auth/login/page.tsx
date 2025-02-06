"use client";
import { AuthCard, LoginForm } from "@/sections";
import { Col, Flex, Row } from "antd";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CustomText, Logo } from "@/components";
import React from "react";
import { AuthSideImage } from "@/components/auth/AuthSideImage";

export default function LoginPage() {
  const translate = useTranslations("LoginPage");
  return (
    <Row style={{ margin: "48px 5%" }}>
      {/* Image Column */}
      <Col xs={0} xl={12}>
        <AuthSideImage />
      </Col>
      {/* Auth Card Column */}
      <Col xs={24} xl={12}>
        <AuthCard action={translate("action")}>
          <LoginForm />
        </AuthCard>
      </Col>
    </Row>
  );
}
