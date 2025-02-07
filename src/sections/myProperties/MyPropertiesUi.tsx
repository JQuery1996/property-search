"use client";
import { TListing, TPaginationMetadata } from "@/types";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { Col, Flex, Pagination, PaginationProps, Row } from "antd";
import { CustomText, CustomTitle, VerticalCard } from "@/components";
import { APP } from "@/constants";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function MyPropertiesUi({
  listings,
  pagination,
}: {
  listings: TListing[];
  pagination: TPaginationMetadata;
}) {
  const translate = useTranslations("MyProperties");
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams(); // Get searchParams from the URL

  // Get the current page from searchParams (default to 1 if not provided)
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePagination: PaginationProps["onChange"] = (page) => {
    // Update the URL with the new page parameter
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());

    // Navigate to the new URL on the same page
    replace(`${pathname}?${newSearchParams.toString()}`);
    // Update the browser's URL instantly without triggering navigation
  };
  return listings?.length > 0 ? (
    <>
      <Row gutter={[16, 16]} style={{ margin: "20px 0" }}>
        {listings.map((listing) => (
          <Col key={listing.id} xs={24} md={12} lg={8} xl={6}>
            <VerticalCard listing={listing} showStatus={true} />
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
          onChange={handlePagination}
        />
      </Flex>
    </>
  ) : (
    <Flex vertical gap={8} justify="center" align="center">
      <Image
        src="/images/common/house.svg"
        width={250}
        height={250}
        alt="not found"
      />
      <CustomTitle level={3} style={{ textAlign: "center" }}>
        {translate("youDontAddAnyProperty")}
      </CustomTitle>
      <CustomText type="secondary" style={{ textAlign: "center" }}>
        {translate("startAddingYourProperties")}
      </CustomText>
    </Flex>
  );
}
