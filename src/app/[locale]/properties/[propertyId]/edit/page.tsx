import { Flex } from "antd";
import { CustomTitle, PropertyFormSkeleton } from "@/components";
import { Suspense } from "react";
import { PropertyFormWrapper } from "@/sections";
import { useTranslations } from "next-intl";
import { APP, KEY_WORDS } from "@/constants";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const translate = await getTranslations({ locale: params.locale });
  const pageTranslate = (key: string) => translate(`Pages.EditProperty.${key}`);
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
