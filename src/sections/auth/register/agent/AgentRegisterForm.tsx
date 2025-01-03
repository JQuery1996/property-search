import { Tabs } from "antd";
import { useTranslations } from "next-intl";
import { HolidayHomesAgentForm } from "./HolidayHomesAgentForm";
import { RealEstateAgentForm } from "./RealEstateAgentForm";

const items = [
  { key: "1", label: "holidayHomesAgent", children: <HolidayHomesAgentForm /> },
  { key: "2", label: "realEstateAgent", children: <RealEstateAgentForm /> },
];
export function AgentRegisterForm() {
  const translate = useTranslations("RegisterPage.Agent");
  return (
    <Tabs
      defaultActiveKey="1"
      items={items.map((item) => ({ ...item, label: translate(item.label) }))}
    ></Tabs>
  );
}
