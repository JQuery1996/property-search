"use client";
import { Button, Card, Divider, Flex, Tooltip } from "antd";
import { TListing } from "@/types";
import Meta from "antd/es/card/Meta";
import { CustomText, CustomTitle, Label } from "@/components";
import Image from "next/image";
import Slider from "react-slick";
import { useTranslations } from "next-intl";

export function VerticalCard({ listing }: { listing: TListing }) {
  const translate = useTranslations();
  const borderRadius = 5;
  return (
    <Card
      hoverable
      style={{
        borderRadius,
      }}
      styles={{
        body: {
          padding: 10,
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
          <Slider autoplay infinite speed={1000}>
            {listing.image_urls.map((url, index) => (
              <div key={index}>
                <Image
                  src={url} // Use the URL from the map function
                  alt="property-image"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: 200,
                    objectFit: "fill",
                  }}
                />
              </div>
            ))}
          </Slider>
          <div
            style={{
              position: "absolute",
              top: "4%",
              insetInlineStart: "4%",
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
              src="/images/icons/share.svg"
              width={15}
              height={15}
              alt="share"
            />
          </div>
          <div
            style={{
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
      <CustomTitle level={5}>
        {translate("listing.source")} : {listing.source}
      </CustomTitle>
      <Divider style={{ margin: "10px 0" }} />
      <Meta
        title={<Tooltip title={listing.title}>{listing.title}</Tooltip>}
        description={
          <CustomText style={{ fontWeight: "bold" }}>
            {listing.price_value} {listing.price_currency}
          </CustomText>
        }
      />
      <Flex gap={4} align="center">
        <Image
          src="/images/icons/location.svg"
          width={16}
          height={16}
          priority
          alt="location"
        />
        <CustomText ellipsis type="secondary" style={{ margin: "10px 0" }}>
          {listing.location}
        </CustomText>
      </Flex>
      <Flex gap={25} style={{ margin: "10px 0" }}>
        <Label
          icon={
            <Image
              src="/images/icons/bed.svg"
              alt="bed"
              width={16}
              height={16}
            />
          }
          text={
            <CustomText type="secondary">{listing.bedrooms ?? "-"}</CustomText>
          }
        />
        <Label
          icon={
            <Image
              src="/images/icons/bath.svg"
              alt="bed"
              width={16}
              height={16}
            />
          }
          text={
            <CustomText type="secondary">{listing.bathrooms ?? "-"}</CustomText>
          }
        />
        <Label
          icon={
            <Image
              src="/images/icons/area.svg"
              alt="bed"
              width={16}
              height={16}
            />
          }
          text={
            <CustomText type="secondary">
              {listing.size_value} {listing.size_unit}
            </CustomText>
          }
        />
      </Flex>
      <Flex justify="space-between" gap={16}>
        <Button
          color="danger"
          variant="filled"
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
        <Label
          icon={
            <Image
              src="/images/icons/calendar.svg"
              width={16}
              height={16}
              alt="date"
            />
          }
          text={
            <CustomText type="secondary">
              {listing.added_date.toString()}
            </CustomText>
          }
        />
      </Flex>
    </Card>
  );
}
