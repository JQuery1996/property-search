"use client";
import { Card, Flex, Tooltip, App, Spin, Skeleton, Tag } from "antd";
import { TListing } from "@/types";
import Meta from "antd/es/card/Meta";
import { CustomText, Label } from "@/components";
import Image from "next/image";
import Slider from "react-slick";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { PAGES, SAVED_ITEMS } from "@/constants";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { axiosInstance } from "@/client";
import styles from "./styles.module.css";
import { useAuth } from "@/contexts"; // Import useState for state management

export function VerticalCard({
  listing,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showStatus = false,
}: {
  listing: TListing;
  showStatus?: boolean;
}) {
  const translate = useTranslations();
  const { message } = App.useApp();
  const { push } = useRouter();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(listing?.is_saved ?? false);
  const borderRadius = 5;

  // State to track loading status of each image
  const [imageLoadingStates, setImageLoadingStates] = useState<boolean[]>(
    listing.image_urls.map(() => true), // Initialize all images as loading
  );

  // Function to handle image load
  const handleImageLoad = (index: number) => {
    setImageLoadingStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = false; // Mark this image as loaded
      return newStates;
    });
  };
  const openWhatsapp = (e: any) => {
    e.stopPropagation();
    if (!listing.whatsapp_number) return;
    const url = `https://wa.me/${listing.whatsapp_number}`;
    window.open(url, "_blank");
  };

  async function toggleFromFavorite(e: any) {
    e.stopPropagation();
    if (!isAuthenticated) {
      router.push(PAGES.LOGIN);
      message.error(translate("Common.eligibleProcess"));
      return;
    }
    setFavoriteLoading(true);
    try {
      await axiosInstance.post(`${SAVED_ITEMS}/${listing.id}`);
      if (listing.is_saved)
        message.success(translate("Common.propertyRemovedFromYourFavorite"));
      else message.success(translate("Common.propertyAddedToYourFavorite"));
      // toggle in_favorite
      setIsSaved((prev) => !prev);
    } catch (error: any) {
      console.log(error);
      message.error(translate("Common.operationFailed"));
    } finally {
      setFavoriteLoading(false);
    }
  }

  const handlePropertyClick = (id: string | number) => () => {
    push(`${PAGES.PROPERTIES}/${id}`);
  };
  return (
    <Card
      hoverable
      style={{
        borderRadius,
        cursor: "pointer",
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
              <div key={index} style={{ outline: "none", userSelect: "none" }}>
                {/* Skeleton placeholder while image is loading */}
                {imageLoadingStates[index] && (
                  <div className={styles.skeletonImageWrapper}>
                    <Skeleton.Image
                      active
                      style={{
                        width: "100%",
                        height: 200,
                      }}
                    />
                  </div>
                )}

                {/* Image component (always rendered but hidden while loading) */}
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
                    visibility: imageLoadingStates[index]
                      ? "hidden"
                      : "visible", // Hide image while loading
                  }}
                  onLoad={() => handleImageLoad(index)} // Hide skeleton when image is loaded
                  loading="lazy" // Enable lazy loading
                />
              </div>
            ))}
          </Slider>

          {/* Share and Bookmark Icons */}
          <div
            style={{
              position: "absolute",
              top: "4%",
              insetInlineStart: "4%",
              width: 35,
              height: 28,
              backgroundColor: "white",
              borderRadius: 6,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
              zIndex: 2, // Ensure icons are above the image and skeleton
            }}
          >
            <Image
              src="/images/icons/whatsapp.svg"
              width={20}
              height={20}
              alt="share"
              onClick={openWhatsapp}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: "4%",
              insetInlineEnd: "4%",
              width: 35,
              height: 27,
              backgroundColor: "white",
              borderRadius: 6,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
              zIndex: 2, // Ensure icons are above the image and skeleton
            }}
          >
            {favoriteLoading ? (
              <Spin size="small" />
            ) : isSaved ? (
              <HeartFilled
                style={{ fontSize: 18, color: "red" }}
                onClick={toggleFromFavorite}
              />
            ) : (
              <HeartOutlined
                style={{ fontSize: 18 }}
                onClick={toggleFromFavorite}
              />
            )}
          </div>
        </div>
      }
      onClick={handlePropertyClick(listing.id)}
    >
      <Meta
        title={<Tooltip title={listing.title}>{listing.title ?? "-"}</Tooltip>}
        description={
          <CustomText style={{ fontWeight: "bold" }}>
            {listing.price_value ?? "-"} {listing.price_currency}
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
          {listing.location ?? "-"}
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
      <Flex justify="space-between" gap={16} style={{ marginTop: 10 }}>
        {listing.is_mine && (
          <>
            {listing.is_approved ? (
              <Tag color="success" style={{ fontWeight: "bold" }}>
                {translate("Common.approved")}
              </Tag>
            ) : (
              <Tag color="warning" style={{ fontWeight: "bold" }}>
                {translate("Common.pending")}
              </Tag>
            )}
          </>
        )}
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
