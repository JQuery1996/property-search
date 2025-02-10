"use client";
import { Flex, Image, Button } from "antd";
import { CustomText, CustomTitle } from "@/components";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useLocale } from "use-intl";
import { getDirectionFromLocale } from "@/helpers";
import { TLOCALE } from "@/types";
import { CSSProperties } from "react"; // Import CSSProperties for type safety

export default function NotFoundPage() {
  const translate = useTranslations("NotFoundPage");
  const router = useRouter(); // Initialize the router
  const locale = useLocale();
  const direction = getDirectionFromLocale(locale as TLOCALE);

  // Function to handle navigation to the home page
  const handleGoHome = () => {
    router.push("/"); // Navigate to the home page
  };

  // CSS styles for the arrow animation
  const arrowAnimation: CSSProperties = {
    animation: "moveArrow 1s infinite", // Apply the animation
  };

  return (
    <Flex
      vertical
      gap={8}
      justify="center"
      align="center"
      style={{ padding: 48 }}
    >
      {/* Image */}
      <Image
        src="/images/common/house.svg"
        width={300}
        height={300}
        alt="not found"
        preview={false} // Disable image preview
      />

      {/* Title */}
      <CustomTitle level={2} style={{ textAlign: "center" }}>
        {translate("title")}
      </CustomTitle>

      {/* Description */}
      <CustomText type="secondary" style={{ textAlign: "center" }}>
        {translate("description")}
      </CustomText>

      {/* Button to return to the home page */}
      <Button
        size="middle"
        onClick={handleGoHome} // Navigate to home on click
        style={{ marginTop: 24 }}
        icon={
          direction === "rtl" ? (
            <ArrowRightOutlined style={arrowAnimation} /> // Apply animation to the icon
          ) : (
            <ArrowLeftOutlined style={arrowAnimation} /> // Apply animation to the icon
          )
        }
        iconPosition={direction === "rtl" ? "end" : "start"}
      >
        {translate("goBackToHomePage")}
      </Button>

      {/* CSS for the animation */}
      <style jsx global>{`
        @keyframes moveArrow {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(${direction === "rtl" ? "-5px" : "5px"});
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </Flex>
  );
}
