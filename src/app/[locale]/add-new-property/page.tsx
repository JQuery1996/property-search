import { Flex } from "antd";
import { CustomTitle, PropertyFormSkeleton } from "@/components";
import { useTranslations } from "next-intl";
import { PropertyFormWrapper } from "@/sections";
import { Suspense } from "react";
import { APP, KEY_WORDS } from "@/constants";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const translate = await getTranslations({ locale: params.locale });
  const pageTranslate = (key: string) =>
    translate(`Pages.AddNewProperty.${key}`);
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

export default function AddNewPropertyPage() {
  const translate = useTranslations("Common");
  return (
    <Flex vertical gap={16} style={{ padding: 48 }}>
      <CustomTitle level={3}>{translate("addNewProperty")}</CustomTitle>
      <Suspense key={Math.random()} fallback={<PropertyFormSkeleton />}>
        <PropertyFormWrapper />
      </Suspense>
    </Flex>
  );
}
