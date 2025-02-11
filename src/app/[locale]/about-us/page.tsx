import Image from "next/image";
import { Flex } from "antd";
import { useTranslations } from "next-intl";
import { CustomText, CustomTitle } from "@/components";

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
