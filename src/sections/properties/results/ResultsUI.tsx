"use client";
import { Button, Col, Flex, Pagination, PaginationProps, Row } from "antd";
import {
  CustomText,
  CustomTitle,
  VerticalCard,
  VerticalCardSkeleton,
} from "@/components";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { TListing, TPaginationMetadata } from "@/types";
import { APP } from "@/constants";
import { usePathname, useRouter } from "@/i18n/routing"; // Add useSearchParams
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Add useEffect

type TResultsUI = {
  listings: TListing[];
  pagination: TPaginationMetadata;
};

export function ResultsUI({ listings, pagination }: TResultsUI) {
  const translate = useTranslations("PropertiesPage");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams(); // Get searchParams from the URL
  const [loading, setLoading] = useState(false); // Add loading state

  // Get the current page from searchParams (default to 1 if not provided)
  const currentPage = Number(searchParams.get("page")) || 1;

  // Reset loading state when the URL changes
  useEffect(() => {
    setLoading(false); // Reset loading when the URL changes
  }, [searchParams]); // Trigger effect when searchParams change

  const handlePageChange: PaginationProps["onChange"] = (page) => {
    setLoading(true); // Set loading to true when the page changes

    // Update the URL with the new page parameter
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());

    // Navigate to the new URL on the same page
    router.replace(`${pathname}?${newSearchParams.toString()}`);
    // Update the browser's URL instantly without triggering navigation
  };

  return (
    <Flex vertical gap={4} style={{ width: "87%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Flex gap={4} align="center">
          <CustomTitle level={3} style={{ margin: 0 }}>
            {translate("filterResults")}
          </CustomTitle>
          <CustomText type="secondary" style={{ paddingTop: 5 }}>
            ({translate("foundItems", { count: pagination.total })})
          </CustomText>
        </Flex>
        <Button
          type="text"
          styles={{
            icon: {
              width: 24,
              height: 24,
            },
          }}
          icon={
            <Image
              src="/images/icons/preview-property.svg"
              alt="preview-property"
              width={24}
              height={24}
            />
          }
        />
      </div>
      {loading ? ( // Show skeleton UI if loading is true
        <Row gutter={[16, 16]} style={{ margin: "20px 0" }}>
          {Array.from({ length: 12 }).map((_, index) => (
            <Col key={index} xs={24} md={12} lg={8} xl={6}>
              <VerticalCardSkeleton /> {/* Use the custom skeleton component */}
            </Col>
          ))}
        </Row>
      ) : (
        <>
          <Row gutter={[16, 16]} style={{ margin: "20px 0" }}>
            {listings.map((listing) => (
              <Col key={listing.id} xs={24} md={12} lg={8} xl={6}>
                <VerticalCard listing={listing} />
              </Col>
            ))}
          </Row>
          <Flex justify="center" style={{ margin: "20px 0" }}>
            <Pagination
              current={currentPage}
              pageSize={APP.paginationSize}
              total={pagination.total}
              hideOnSinglePage
              responsive
              showSizeChanger={false}
              onChange={handlePageChange}
            />
          </Flex>
        </>
      )}
    </Flex>
  );
}
