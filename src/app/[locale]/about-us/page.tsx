import Image from "next/image";
import { Flex } from "antd";
import { useTranslations } from "next-intl";
import { CustomText, CustomTitle } from "@/components";
import { getTranslations } from "next-intl/server";
import { APP, KEY_WORDS } from "@/constants";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const translate = await getTranslations({ locale: params.locale });
  const pageTranslate = (key: string) => translate(`Pages.About.${key}`);
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

export default function AboutUs() {
  const translate = useTranslations("About");

  return (
    <>
      <div style={{ position: "relative", height: 500, width: "100%" }}>
        <Image
          src="/images/home/banner.svg"
          alt="home page banner"
          width={0}
          height={0}
          sizes="100vw"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          priority
        />
      </div>
      <Flex vertical gap={12} style={{ padding: "24px 48px 48px 48px" }}>
        <CustomTitle level={3}>{translate("title")}</CustomTitle>
        <CustomText type="secondary" style={{ fontSize: "16" }}>
          Welcome to Property Search, your trusted platform for finding and
          listing properties with ease. Whether you&#39;re searching for your
          dream home or an investment opportunity, our user-friendly marketplace
          connects buyers, renters, and real estate agents seamlessly. We
          empower property seekers with advanced search tools and provide agents
          with a hassle-free way to showcase their listings. Our mission is to
          make real estate transactions simple, transparent, and accessible to
          everyone.
        </CustomText>
      </Flex>
    </>
  );
}
