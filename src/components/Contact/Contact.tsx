"use client";
import { Flex, FlexProps } from "antd";
import { CustomText, CustomTitle, Label } from "@/components";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { TitleProps } from "antd/es/typography/Title";
import { TextProps } from "antd/es/typography/Text";

type TContact = {
  title: string;
  description: string;
  mobile: string;
  whatsapp: string;
  titleProps?: TitleProps;
  descriptionProps?: TextProps;
  containerProps?: Omit<FlexProps, "children">;
};

export function Contact({
  title,
  description,
  mobile,
  whatsapp,
  titleProps,
  descriptionProps,
  containerProps,
}: TContact) {
  const translate = useTranslations("Common");

  // Function to handle WhatsApp click
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsapp}`, "_blank");
  };

  // Function to handle phone click
  const handlePhoneClick = () => {
    window.open(`tel:${mobile}`, "_blank");
  };

  return (
    <Flex vertical gap={20} {...containerProps}>
      <Flex vertical gap={8}>
        <CustomTitle level={3} {...titleProps}>
          {title}
        </CustomTitle>
        <CustomText {...descriptionProps}>{description}</CustomText>
      </Flex>
      <Flex gap="10%" wrap style={{ rowGap: "20px !important" }}>
        <Label
          justify="start"
          align="center"
          gap={8}
          icon={
            <Image
              src="/images/icons/whatsapp-contact.svg"
              alt="WhatsApp"
              width={50}
              height={50}
            />
          }
          style={{ cursor: "pointer" }}
          onClick={handleWhatsAppClick}
          text={
            <Flex vertical>
              <CustomTitle level={4} style={{ fontWeight: "bold" }}>
                {translate("whatsapp")}
              </CustomTitle>
              <CustomText
                style={{
                  fontWeight: 400,
                  letterSpacing: 0.5,
                }}
              >
                {whatsapp}
              </CustomText>
            </Flex>
          }
        />
        <Label
          justify="start"
          align="center"
          gap={8}
          style={{ cursor: "pointer" }}
          onClick={handlePhoneClick}
          icon={
            <Image
              src="/images/icons/phone-contact.png"
              alt="Phone"
              width={45}
              height={45}
            />
          }
          text={
            <Flex vertical>
              <CustomTitle level={4} style={{ fontWeight: "bold" }}>
                {translate("mobile")}
              </CustomTitle>
              <CustomText
                style={{
                  fontWeight: 400,
                  letterSpacing: 0.5,
                }}
              >
                {mobile}
              </CustomText>
            </Flex>
          }
        />
      </Flex>
    </Flex>
  );
}
