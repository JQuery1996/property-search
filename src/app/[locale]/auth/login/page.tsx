import { AuthCard, LoginForm } from "@/sections";
import { Col, Row } from "antd";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const translate = useTranslations("LoginPage");
  return (
    <Row style={{ margin: "48px 24px" }}>
      {/* Auth Card Column */}
      <Col xs={24} xl={12}>
        <AuthCard action={translate("action")}>
          <LoginForm />
        </AuthCard>
      </Col>
      {/* Image Column */}
      <Col xs={0} xl={12} style={{ textAlign: "left" }}>
        <Image
          src="/images/auth/login/login.svg"
          width={569}
          height={569}
          alt="login image"
          style={{ marginLeft: "-200px", marginTop: "70px" }}
        />
      </Col>
    </Row>
  );
}
