"use client";
import { useTranslations } from "next-intl";
import { Button, Card, Flex, Skeleton } from "antd"; // Import Skeleton
import Image from "next/image";
import { TDevelopmentProperty } from "@/types";
import { CustomText, CustomTitle } from "@/components";
import { useState } from "react"; // Import useState
import styles from "./styles.module.css";
import { MailOutlined } from "@ant-design/icons";
import { useRouter } from "@/i18n/routing";
import { PAGES } from "@/constants";

export function DeveloperCard({
  developmentProperty,
}: {
  developmentProperty: TDevelopmentProperty;
}) {
  const { push } = useRouter();
  const translate = useTranslations();
  const borderRadius = 5;

  // State to track image loading and error
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Determine the image source
  const imageSrc =
    developmentProperty.developer.image && !imageError
      ? developmentProperty.developer.image
      : "/images/developers/emmar.png";

  const openWhatsapp = (e: any) => {
    e.stopPropagation();
    if (!developmentProperty.phone) return;
    const url = `https://wa.me/${developmentProperty.phone}`;
    window.open(url, "_blank");
  };

  const openEmail = (e: any) => {
    e.stopPropagation(); // Prevent card click event from firing
    if (developmentProperty.email) {
      window.open(`mailto:${developmentProperty.email}`, "_blank");
    }
  };
  function handleCardClick() {
    push(`${PAGES.DEVELOPERS}/${developmentProperty.developer.id}`);
  }
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
      onClick={handleCardClick}
      cover={
        <div
          style={{
            borderRadius,
            overflow: "hidden",
            position: "relative",
            height: 200,
          }}
        >
          {/* Skeleton placeholder while image is loading */}
          {!isImageLoaded && (
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
            src={imageSrc}
            alt="property-image"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: 200,
              objectFit: "fill",
              visibility: isImageLoaded ? "visible" : "hidden", // Hide image while loading
            }}
            onLoad={() => setIsImageLoaded(true)} // Set loaded state to true
            onError={() => {
              setImageError(true); // Set error state to true
              setIsImageLoaded(true); // Ensure the image is visible even if it errors
            }}
          />
          {/* Bookmark icon */}
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
              src="/images/icons/whatsapp.svg"
              width={15}
              height={15}
              alt="bookmark"
              onClick={openWhatsapp}
            />
          </div>

          <div
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "4%",
              insetInlineStart: "4%",
              backgroundColor: "white",
              padding: "2px 5px",
              borderRadius: 6,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
            }}
          >
            <Image
              src="/images/icons/verified.svg"
              width={15}
              height={15}
              alt="bookmark"
            />
            Verified
          </div>
        </div>
      }
    >
      <Flex vertical gap={12}>
        <CustomTitle level={4} style={{ fontWeight: "bold" }} ellipsis>
          {developmentProperty.name}
        </CustomTitle>
        <CustomText type="secondary" className="truncated-text-2">
          {developmentProperty.developer.description ??
            "Off-plan & New Project By " +
              developmentProperty.name +
              " Properties"}
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
          icon={<MailOutlined />}
          onClick={openEmail}
        >
          {translate("Common.email")}
        </Button>
      </Flex>
    </Card>
  );
}
