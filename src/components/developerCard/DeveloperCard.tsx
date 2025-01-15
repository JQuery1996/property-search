"use client";
import { useTranslations } from "next-intl";
import { Button, Card, Flex } from "antd";
import Image from "next/image";
import { TDevelopmentProperty, TLOCALE } from "@/types";
import { useLocale } from "use-intl";
import { getDirectionFromLocale } from "@/helpers";
import { CustomText, CustomTitle } from "@/components";

export function DeveloperCard({
  developmentProperty,
}: {
  developmentProperty: TDevelopmentProperty;
}) {
  const translate = useTranslations();
  const locale = useLocale();
  const direction = getDirectionFromLocale(locale as TLOCALE);
  const borderRadius = 5;
  return (
    <Card
      hoverable
      style={{
        borderRadius,
      }}
      styles={{
        body: {
          padding: 20,
        },
      }}
      cover={
        <div
          style={{
            borderRadius,
            overflow: "hidden",
            position: "relative",
            height: 200,
          }}
        >
          <Image
            src={developmentProperty.developer.image} // Use the URL from the map function
            alt="property-image"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: 200,
              objectFit: "fill",
            }}
            objectFit="fill"
          />
          <div
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "4%",
              insetInlineEnd: "4%",
              width: 31,
              height: 23,
              backgroundColor: "white",
              borderRadius: 6,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
            }}
          >
            <Image
              src="/images/icons/bookmark.svg"
              width={15}
              height={15}
              alt="bookmark"
            />
          </div>
        </div>
      }
    >
      <Flex vertical gap={12}>
        <div
          style={{
            backgroundImage: `url('/images/icons/polygon_${direction}.svg')`,
            backgroundRepeat: "no-repeat",
            padding: 5,
            backgroundSize: "contain",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            alignContent: "center",
            gap: 8,
          }}
        >
          <Image
            src="/images/icons/verify.svg"
            width="20"
            height="20"
            alt="verify"
          />
          <CustomText>{translate("developers.verify")}</CustomText>
        </div>

        <CustomTitle level={4} style={{ fontWeight: "bold" }}>
          {developmentProperty.name}
        </CustomTitle>
        <CustomText className="line-clamp" style={{ fontWeight: 400 }}>
          {developmentProperty.developer.description}
        </CustomText>

        <Button
          color="danger"
          variant="filled"
          style={{ width: "fit-content", marginTop: 10 }}
          styles={{
            icon: {
              width: 16,
              height: 16,
            },
          }}
          icon={
            <Image
              src="/images/icons/hang.svg"
              alt="contact us"
              width={16}
              height={16}
            />
          }
        >
          {translate("Common.contactUs")}
        </Button>
      </Flex>
    </Card>
  );
}
