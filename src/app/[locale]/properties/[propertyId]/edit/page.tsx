import { Flex } from "antd";
import { CustomTitle, PropertyFormSkeleton } from "@/components";
import { Suspense } from "react";
import { PropertyFormWrapper } from "@/sections";
import { useTranslations } from "next-intl";

export default function EditProperty({
  params,
}: {
  params: { propertyId: string };
}) {
  const translate = useTranslations("Common");
  const { propertyId } = params;
  return (
    <Flex vertical gap={16} style={{ padding: 48 }}>
      <CustomTitle level={3}>{translate("editProperty")}</CustomTitle>
      <Suspense key={Math.random()} fallback={<PropertyFormSkeleton />}>
        <PropertyFormWrapper propertyId={propertyId} />
      </Suspense>
    </Flex>
  );
}
