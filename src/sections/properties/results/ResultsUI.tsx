"use client";
import {
  Button,
  Col,
  Empty,
  Flex,
  Pagination,
  PaginationProps,
  Row,
} from "antd";
import { CustomText, CustomTitle, VerticalCard } from "@/components";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { TListing, TPaginationMetadata } from "@/types";
import { APP } from "@/constants";
import { usePathname, useRouter } from "@/i18n/routing"; // Add useSearchParams
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

  // Get the current page from searchParams (default to 1 if not provided)
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange: PaginationProps["onChange"] = (page) => {
    // Update the URL with the new page parameter
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());

    // Navigate to the new URL on the same page
    router.replace(`${pathname}?${newSearchParams.toString()}`);
    // Update the browser's URL instantly without triggering navigation
  };

  return (
    <Flex vertical gap={4} style={{ width: "90%" }}>
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
      </div>
      {listings.length > 0 ? (
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
      ) : (
        <Empty style={{ margin: "40px 0" }} />
      )}
    </Flex>
  );
}
