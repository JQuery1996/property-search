"use client";
import { Col, Row, Tabs } from "antd";
import { useTranslations } from "next-intl";
import { HolidayHomesAgentForm } from "./HolidayHomesAgentForm";
import { RealEstateAgentForm } from "./RealEstateAgentForm";
import { AuthCard } from "@/sections";
import Image from "next/image";
import { useState } from "react";

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
  const [currentTab, setCurrentTab] = useState<string>("holiday-home");
  function handleTabChange(key: string) {
    setCurrentTab(key);
  }
  return (
    <Row style={{ margin: "24px" }}>
      {/* Auth Card Column */}
      <Col xs={24} xl={12}>
        <AuthCard action={translate("action")}>
          <Tabs
            defaultActiveKey="1"
            items={items.map((item) => ({
              ...item,
              label: translate(item.label),
            }))}
            onChange={handleTabChange}
          ></Tabs>
        </AuthCard>
      </Col>
      {/* Image Column */}
      <Col xs={0} xl={12}>
        <Image
          src={`/images/auth/register/agent/${currentTab}.svg`}
          width={769}
          height={769}
          alt="register image"
          style={{ marginLeft: "-250px", marginTop: "150px" }}
          priority
        />
      </Col>
    </Row>
  );
}
