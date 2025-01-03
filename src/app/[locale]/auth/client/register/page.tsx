import { Col, Row } from "antd";
import { AuthCard, ClientRegisterForm } from "@/sections";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function RegisterClientPage() {
  const translate = useTranslations("RegisterPage.Client");
  return (
    <Row style={{ margin: "24px" }}>
      {/* Auth Card Column */}
      <Col xs={24} xl={12}>
        <AuthCard action={translate("action")}>
          <ClientRegisterForm />
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
