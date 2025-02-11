import { NotificationsWrapper } from "@/sections";
import { CustomTitle, NotificationsSkeleton } from "@/components";
import { useTranslations } from "next-intl";
import { Flex } from "antd";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { APP, KEY_WORDS } from "@/constants";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const translate = await getTranslations({ locale: params.locale });
  const pageTranslate = (key: string) =>
    translate(`Pages.Notifications.${key}`);
  const keywordTranslate = (key: string) => translate(`Pages.Keywords.${key}`);
  return {
    title: pageTranslate("title"),
    description: pageTranslate("description"),
    keywords: KEY_WORDS.map((key) => keywordTranslate(key)),
    openGraph: {
      title: pageTranslate("title"),
      description: pageTranslate("description"),
      url: "https://www.yourpropertywebsite.com",
      siteName: APP.name,
      images: [
        {
          url: "https://www.yourpropertywebsite.com/images/og-image.jpg", // Add your OpenGraph image URL
          width: 1200,
          height: 630,
          alt: "Your Property Search Website",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTranslate("title"),
      description: pageTranslate("title"),
      images: ["https://www.yourpropertywebsite.com/images/twitter-image.jpg"], // Add your Twitter image URL
    },
  };
}
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
