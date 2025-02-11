"use client";
import { TNotification, TPaginationMetadata } from "@/types";
import Image from "next/image";
import { CustomText, CustomTitle, ImageWithSkeleton } from "@/components";
import { useTranslations } from "next-intl";
import { Card, Flex, Pagination, PaginationProps } from "antd";
import { APP } from "@/constants";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

export function NotificationsUi({
  notifications,
  pagination,
}: {
  notifications: TNotification[];
  pagination: TPaginationMetadata;
}) {
  const translate = useTranslations("Common");

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

  // case no notifications
  if (notifications.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          minHeight: "50vh",
        }}
      >
        <Image
          src="/images/icons/no-notifications.svg"
          alt="no-notifications"
          width={80}
          height={80}
        />
        <CustomText type="secondary">
          {translate("youHaveNoNotifications")}
        </CustomText>
      </div>
    );
  }

  // case there are notifications
  return (
    <div>
      {notifications.map((notify, index) => (
        <Card
          key={index}
          style={{ marginBottom: 10 }}
          styles={{
            body: {
              padding: 10,
            },
          }}
        >
          <Flex gap={12}>
            <ImageWithSkeleton
              src={notify.image}
              alt="notification image"
              skeletonStyle={{ width: 100, height: 100 }}
              style={{ width: 100, height: 100 }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
            >
              <CustomTitle
                ellipsis={{
                  rows: 2,
                }}
                level={5}
              >
                {notify.content}
              </CustomTitle>
              <CustomText ellipsis>{notify.type}</CustomText>
              <div
                style={{ position: "absolute", bottom: 4, insetInlineEnd: 4 }}
              >
                <CustomText ellipsis type="secondary" strong>
                  {new Date(notify.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CustomText>
              </div>
            </div>
          </Flex>
        </Card>
      ))}

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
    </div>
  );
}
