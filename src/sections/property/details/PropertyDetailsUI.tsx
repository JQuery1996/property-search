"use client";
import { TListing } from "@/types";
import { Button, Descriptions, Divider, Flex, Tag } from "antd";
import {
  BookmarkIcon,
  Contact,
  CustomText,
  CustomTitle,
  EarthIcon,
  Label,
  Map,
  ShareIcon,
} from "@/components";
import { useResponsive } from "antd-style";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ImageViewer } from "./ImageViewer";

type TPropertyDetailsUI = {
  details: TListing;
};
export function PropertyDetailsUI({ details }: TPropertyDetailsUI) {
  const { lg } = useResponsive();
  const translate = useTranslations("listing");
  const commonTranslate = useTranslations("Common");

  const propertyDetails = [
    {
      key: "1",
      label: translate("propertyType"),
      children: details.property_type,
    },
    {
      key: "2",
      label: translate("propertySize"),
      children: details.size_value + " " + details.size_unit,
    },
    {
      key: "3",
      label: translate("bedrooms"),
      children: details.bedrooms,
    },
    {
      key: "4",
      label: translate("bathrooms"),
      children: details.bathrooms,
    },
  ];
  return (
    <Flex vertical gap={12} style={{ padding: "24px 48px" }}>
      <Flex gap={8} justify="end" wrap>
        <Flex gap={8} justify="end" align="end">
          <Button
            color="danger"
            variant="text"
            icon={<BookmarkIcon width={24} height={24} color="white" />}
          />
          <Button
            color="danger"
            variant="text"
            icon={<ShareIcon width={24} height={24} />}
          />
          <Button
            color="danger"
            variant="text"
            icon={<EarthIcon width={24} height={24} />}
          />
        </Flex>
      </Flex>
      {/*<ThumbnailCarousel images={details.image_urls} />*/}
      <ImageViewer images={details.image_urls} />
      <Flex vertical gap={8} style={{ marginTop: 10 }}>
        <CustomTitle type="primary" level={3}>
          {details.title}
        </CustomTitle>
        <Flex gap={32} wrap>
          <Label
            justify="start"
            icon={
              <Image
                src="/images/icons/calendar.svg"
                alt="bed"
                width={16}
                height={16}
              />
            }
            text={
              <CustomText type="secondary">
                {details.added_date.toString()}
              </CustomText>
            }
          />
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
              <CustomText type="secondary">
                {details.bedrooms ?? "-"} {translate("bedrooms")}
              </CustomText>
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
              <CustomText type="secondary">
                {details.bathrooms ?? "-"} {translate("bathrooms")}
              </CustomText>
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
                {details.size_value} {details.size_unit}
              </CustomText>
            }
          />
        </Flex>
      </Flex>

      <Flex style={{ marginTop: 10 }} vertical gap={8}>
        <CustomTitle level={3} style={{ fontWeight: 900 }}>
          [{translate("price")}]
        </CustomTitle>
        <CustomTitle level={4}>
          {Number(details.price_value).toLocaleString() +
            " " +
            details.price_currency}
        </CustomTitle>
      </Flex>

      <Divider style={{ margin: "10px 0" }} />

      <Flex vertical gap={8}>
        <CustomTitle level={3} style={{ fontWeight: 900 }}>
          [{translate("description")}]
        </CustomTitle>
        <CustomText style={{ fontSize: 15 }}>{details.description}</CustomText>
      </Flex>
      <Divider style={{ margin: "10px 0" }} />

      <Descriptions
        style={{ width: lg ? "70%" : "100%" }}
        title={
          <CustomTitle level={3} style={{ fontWeight: 900 }}>
            [{translate("propertyDetails")}]
          </CustomTitle>
        }
        items={propertyDetails}
      />

      <Flex vertical gap={20} style={{ marginTop: 20 }}>
        <CustomTitle level={3} style={{ fontWeight: 900 }}>
          [{translate("amenities")}]
        </CustomTitle>
        <Flex gap={8} wrap>
          {details.amenities.map((amenity, index) => (
            <Tag key={index} style={{ fontSize: 14 }}>
              {amenity}
            </Tag>
          ))}
        </Flex>
      </Flex>

      <Flex vertical gap={20} style={{ marginTop: 20 }}>
        <Flex vertical gap={12}>
          <CustomTitle level={3} style={{ fontWeight: 900 }}>
            [{translate("locationAndNearby")}]
          </CustomTitle>

          <Label
            justify="start"
            align="center"
            icon={
              <Image
                src="/images/icons/location.svg"
                alt="bed"
                width={15}
                height={15}
              />
            }
            text={
              <CustomText type="secondary" style={{ fontSize: 15 }}>
                {details.location}
              </CustomText>
            }
          />
        </Flex>

        <div style={{ borderRadius: 5, overflow: "hidden" }}>
          <Map
            position={{
              lat: Number(details.latitude),
              lng: Number(details.longitude),
            }}
          />
        </div>
      </Flex>
      <Contact
        containerProps={{
          style: { margin: "20px 0 " },
        }}
        title={"[" + commonTranslate("contactInformation") + "]"}
        titleProps={{
          style: { fontWeight: 900 },
        }}
        description={commonTranslate(
          "youCanContactUsThroughTheFollowingNumbers",
        )}
        descriptionProps={{
          type: "secondary",
          style: { fontSize: 16 },
        }}
        mobile={details.agent_number}
        whatsapp={details.whatsapp_number}
      />
    </Flex>
  );
}
