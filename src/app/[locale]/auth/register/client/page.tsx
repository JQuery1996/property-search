import { Col, Row } from "antd";
import { AuthCard } from "@/sections";
import Image from "next/image";

export default function RegisterClientPage() {
  return (
    <Row style={{ margin: "48px 24px" }}>
      {/* Auth Card Column */}
      <Col xs={24} xl={12}>
        {/*<AuthCard></AuthCard>*/}
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
