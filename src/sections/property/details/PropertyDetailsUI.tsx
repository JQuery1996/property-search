"use client";
import { TListing } from "@/types";
import {
  App,
  Button,
  Descriptions,
  Divider,
  Flex,
  Modal,
  Tag,
  theme,
} from "antd";
import {
  Contact,
  CustomText,
  CustomTitle,
  EarthIcon,
  Label,
  Map,
  ShareIcon,
  ShareWrapper,
} from "@/components";
import { useResponsive } from "antd-style";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ImageViewer } from "./ImageViewer";
import { DeleteFilled, EditFilled, HeartOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "@/i18n/routing";
import { useState } from "react";
import { axiosInstance } from "@/client";
import { LISTING_URL, PAGES } from "@/constants";
const { useToken } = theme;
type TPropertyDetailsUI = {
  details: TListing;
};
export function PropertyDetailsUI({ details }: TPropertyDetailsUI) {
  const { lg } = useResponsive();
  const translate = useTranslations("listing");
  const commonTranslate = useTranslations("Common");
  const { push, replace } = useRouter();
  const pathname = usePathname();
  const { token } = useToken();
  const { message } = App.useApp();
  const [deleteLoading, setDeleteLoading] = useState(false);
  // State to control the visibility of the delete confirmation modal
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

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

  // Function to handle the delete action
  const handleDeleteProperty = async () => {
    try {
      setDeleteLoading(true);
      await axiosInstance.delete(`${LISTING_URL}/${details.id}`);
      message.success(commonTranslate("propertyHasBeenDeletedSuccessfully"));
      replace(PAGES.MY_PROPERTIES);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      message.error(commonTranslate("propertyDeletedFailed"));
    } finally {
      setDeleteLoading(false);
      setIsDeleteModalVisible(false);
    }
  };
  return (
    <Flex vertical gap={12} style={{ padding: "24px 48px" }}>
      <Flex gap={8} justify="space-between" wrap>
        {details.is_approved ? (
          <Tag color="success" style={{ fontWeight: "bold" }}>
            {commonTranslate("approved")}
          </Tag>
        ) : (
          <Tag color="warning" style={{ fontWeight: "bold" }}>
            {commonTranslate("pending")}
          </Tag>
        )}
        <Flex gap={12} justify="end" align="end">
          <Button
            color="danger"
            variant="text"
            icon={<HeartOutlined style={{ fontSize: 25 }} />}
          />
          <ShareWrapper
            shareData={{
              title: details.title,
              text: details.description,
              url: details.url,
            }}
          >
            <Button
              color="danger"
              variant="text"
              icon={<ShareIcon width={24} height={24} />}
              disabled={!details.url}
            />
          </ShareWrapper>
          <Button
            color="danger"
            variant="link"
            disabled={!details.url}
            href={details.url}
            title={commonTranslate("website")}
            target="_blank"
            icon={<EarthIcon width={24} height={24} />}
          />
          {details.is_mine && (
            <>
              <Button
                type="text"
                color="danger"
                icon={
                  <EditFilled
                    style={{ fontSize: 24, color: token.colorPrimary }}
                  />
                }
                title="edit"
                onClick={() => push(`${pathname}/edit`)}
              />
              <Button
                type="text"
                color="danger"
                icon={
                  <DeleteFilled
                    style={{ fontSize: 24, color: token.colorPrimary }}
                  />
                }
                title="delete"
                onClick={() => setIsDeleteModalVisible(true)} // Show the modal on click
              />
            </>
          )}
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
      {/* Delete Confirmation Modal */}
      <Modal
        title={commonTranslate("deleteProperty")}
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)} // Close the modal on cancel
        footer={[
          <Button key="cancel" onClick={() => setIsDeleteModalVisible(false)}>
            {commonTranslate("cancel")}
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            onClick={handleDeleteProperty} // Call the delete function on confirm
            loading={deleteLoading}
          >
            {commonTranslate("delete")}
          </Button>,
        ]}
      >
        <p>{commonTranslate("deletePropertyMessage")}</p>
      </Modal>
    </Flex>
  );
}
