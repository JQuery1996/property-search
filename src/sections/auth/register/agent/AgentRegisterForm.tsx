"use client";
import { Col, Row, Tabs } from "antd";
import { useTranslations } from "next-intl";
import { HolidayHomesAgentForm } from "./HolidayHomesAgentForm";
import { RealEstateAgentForm } from "./RealEstateAgentForm";
import { AuthCard } from "@/sections";
import { AuthSideImage } from "@/components";

const items = [
  {
    key: "holiday-home",
    label: "holidayHomesAgent",
    children: <HolidayHomesAgentForm />,
  },
  {
    key: "real-estate",
    label: "realEstateAgent",
    children: <RealEstateAgentForm />,
  },
];
export function AgentRegisterForm() {
  const translate = useTranslations("RegisterPage.Agent");

  return (
    <Row style={{ margin: "0px 5%" }}>
      {/* Image Column */}
      <Col xs={0} xl={12}>
        <AuthSideImage />
      </Col>
      {/* Auth Card Column */}
      <Col xs={24} xl={12}>
        <AuthCard action={translate("action")}>
          <Tabs
            defaultActiveKey="1"
            items={items.map((item) => ({
              ...item,
              label: translate(item.label),
            }))}
          ></Tabs>
        </AuthCard>
      </Col>
    </Row>
  );
}
