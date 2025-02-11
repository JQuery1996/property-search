import { Col, Row } from "antd";
import { AuthCard, ClientRegisterForm } from "@/sections";
import { useTranslations } from "next-intl";
import { AuthSideImage } from "@/components";
import React from "react";
import { getTranslations } from "next-intl/server";
import { APP, KEY_WORDS } from "@/constants";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const translate = await getTranslations({ locale: params.locale });
  const pageTranslate = (key: string) =>
    translate(`Pages.ClientRegister.${key}`);
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
export default function RegisterClientPage() {
  const translate = useTranslations("RegisterPage.Client");
  return (
    <Row style={{ margin: "0 5%" }}>
      {/* Image Column */}
      <Col xs={0} xl={12}>
        <AuthSideImage />
      </Col>
      {/* Auth Card Column */}
      <Col xs={24} xl={12}>
        <AuthCard action={translate("action")}>
          <ClientRegisterForm />
        </AuthCard>
      </Col>
    </Row>
  );
}
