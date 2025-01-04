import { AuthCard, LoginForm } from "@/sections";
import { Col, Row } from "antd";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const translate = useTranslations("LoginPage");
  return (
    <Row style={{ margin: "24px" }}>
      {/* Auth Card Column */}
      <Col xs={24} xl={12}>
        <AuthCard action={translate("action")}>
          <LoginForm />
        </AuthCard>
      </Col>
      {/* Image Column */}
      <Col xs={0} xl={12}>
        <Image
          src="/images/auth/login/login.svg"
          width={769}
          height={769}
          alt="login image"
          style={{ marginLeft: "-250px" }}
          priority
        />
      </Col>
    </Row>
  );
}
