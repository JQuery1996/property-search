import { DeveloperBanner, DevelopersServer, SearchInput } from "@/sections";
import { Flex } from "antd";
import { CustomTitle, DevelopersSkeleton } from "@/components";
import { Suspense } from "react";
import { ISearchParams } from "@/types";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { APP, KEY_WORDS } from "@/constants";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const translate = await getTranslations({ locale: params.locale });
  const pageTranslate = (key: string) => translate(`Pages.Developers.${key}`);
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

export default function Developers({
  searchParams,
}: {
  searchParams: ISearchParams;
}) {
  const translate = useTranslations("developers");
  return (
    <>
      <DeveloperBanner />
      <Flex vertical gap={16} style={{ padding: 48 }}>
        <Flex
          justify="space-between"
          align="center"
          wrap
          style={{ rowGap: 16 }}
        >
          <SearchInput />
          <CustomTitle level={2}>
            {translate("projectsUnderDevelopment")}
          </CustomTitle>
        </Flex>
        <Suspense key={Math.random()} fallback={<DevelopersSkeleton />}>
          <DevelopersServer searchParams={searchParams} />
        </Suspense>
      </Flex>
    </>
  );
}
