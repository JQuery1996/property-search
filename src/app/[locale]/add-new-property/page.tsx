import { Flex } from "antd";
import { CustomTitle } from "@/components";
import { useTranslations } from "next-intl";
import { PropertyFormWrapper } from "@/sections";
import { Suspense } from "react";

export default function AddNewPropertyPage() {
  const translate = useTranslations("Common");
  return (
    <Flex vertical gap={16} style={{ padding: 48 }}>
      <CustomTitle level={3}>{translate("addNewProperty")}</CustomTitle>
      <Suspense key={Math.random()} fallback="Loading...">
        <PropertyFormWrapper />
      </Suspense>
    </Flex>
  );
}
