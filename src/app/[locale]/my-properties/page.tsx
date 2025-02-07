import { Flex } from "antd";
import { CustomTitle, MyPropertiesSkeleton } from "@/components";
import { useTranslations } from "next-intl";
import { MyPropertiesServer } from "@/sections";
import { Suspense } from "react";

export default function MyProperties() {
  const translate = useTranslations("Common");
  return (
    <Flex vertical gap={16} style={{ padding: 48 }}>
      <CustomTitle>{translate("myProperties")}</CustomTitle>
      <Suspense key={Math.random()} fallback={<MyPropertiesSkeleton />}>
        <MyPropertiesServer />
      </Suspense>
    </Flex>
  );
}
