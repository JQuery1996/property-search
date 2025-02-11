import { NotificationsWrapper } from "@/sections";
import { CustomTitle, NotificationsSkeleton } from "@/components";
import { useTranslations } from "next-intl";
import { Flex } from "antd";
import { Suspense } from "react";

export default function Notifications() {
  const translate = useTranslations("Common");
  return (
    <Flex vertical gap={24} style={{ padding: 48 }}>
      <CustomTitle level={3}>{translate("notifications")}</CustomTitle>
      <Suspense key={Math.random()} fallback={<NotificationsSkeleton />}>
        <NotificationsWrapper />
      </Suspense>
    </Flex>
  );
}
