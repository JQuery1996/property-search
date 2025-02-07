"use client";
import { TDevelopmentProperty, TPaginationMetadata } from "@/types";
import { Col, Flex, Pagination, PaginationProps, Row } from "antd";
import { DeveloperCard } from "@/components";
import { APP } from "@/constants";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

type TDevelopersUi = {
  developmentProperties: TDevelopmentProperty[];
  pagination: TPaginationMetadata;
};
export function DevelopersUi({
  developmentProperties,
  pagination,
}: TDevelopersUi) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams(); // Get searchParams from the URL

  // Get the current page from searchParams (default to 1 if not provided)
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange: PaginationProps["onChange"] = (page) => {
    // Update the URL with the new page parameter
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());

    // Navigate to the new URL on the same page
    replace(`${pathname}?${newSearchParams.toString()}`);
    // Update the browser's URL instantly without triggering navigation
  };

  return developmentProperties.length > 0 ? (
    <>
      <Row gutter={[16, 16]} style={{ margin: "20px 0" }}>
        {developmentProperties.map((developmentProperty, index) => (
          <Col key={index} xs={24} md={12} lg={8} xl={6}>
            <DeveloperCard developmentProperty={developmentProperty} />
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
  ) : null;
}
