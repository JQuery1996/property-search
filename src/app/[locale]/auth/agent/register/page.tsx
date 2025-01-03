import { useTranslations } from "next-intl";
import { Row, Col } from "antd";
import { AgentRegisterForm, AuthCard } from "@/sections";
import Image from "next/image";

export default function RegisterAgentPage() {
  const translate = useTranslations("RegisterPage.Agent");
  return (
    <Row style={{ margin: "24px" }}>
      {/* Auth Card Column */}
      <Col xs={24} xl={12}>
        <AuthCard action={translate("action")}>
          <AgentRegisterForm />
        </AuthCard>
      </Col>
      {/* Image Column */}
      <Col xs={0} xl={12}>
        <Image
          src="/images/auth/register/client/register.svg"
          width={769}
          height={769}
          alt="register image"
          style={{ marginLeft: "-250px" }}
        />
      </Col>
    </Row>
  );
}
