"use client";
import { useState, useEffect } from "react";
import { BellOutlined } from "@ant-design/icons";
import { Popover, Badge, Spin, Flex, Divider, Card, Button } from "antd";
import { axiosInstance } from "@/client";
import { NOTIFICATIONS_URL, PAGES } from "@/constants";
import { TNotification } from "@/types";
import { CustomText, CustomTitle, ImageWithSkeleton } from "@/components";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";

export function Notifications() {
  const translate = useTranslations("Common");
  const [notifications, setNotifications] = useState<TNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const { push } = useRouter();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get(NOTIFICATIONS_URL);
        setNotifications(response.data.data as TNotification[]);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  function handleNavigate() {
    setVisible(false);
    push(PAGES.NOTIFICATIONS);
  }
  // Render notifications content inside Popover
  const content = (
    <div
      style={{
        maxWidth: 400,
        minWidth: 400,
      }}
    >
      {loading ? (
        <div
          style={{
            minHeight: 500,
            maxHeight: 500,
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Spin />
        </div>
      ) : notifications.length > 0 ? (
        <Flex
          vertical
          gap={8}
          style={{
            maxHeight: 500,
            minHeight: 500,
            overflow: "hidden",
            overflowY: "auto",
            scrollbarWidth: "thin",
          }}
        >
          {notifications.map((notify, index) => {
            return (
              <Card
                key={index}
                styles={{
                  body: {
                    padding: 5,
                  },
                }}
              >
                <Flex gap={12}>
                  <ImageWithSkeleton
                    src={notify.image}
                    alt="notification image"
                    skeletonStyle={{ width: 70, height: 70 }}
                    style={{ width: 70, height: 70 }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      overflow: "hidden",
                      width: "100%",
                    }}
                  >
                    <CustomText ellipsis>{notify.content}</CustomText>
                    <CustomText ellipsis>{notify.type}</CustomText>
                    <div style={{ textAlign: "end" }}>
                      <CustomText
                        ellipsis
                        type="secondary"
                        style={{ fontSize: 12 }}
                      >
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
            );
          })}
        </Flex>
      ) : (
        <div
          style={{
            maxHeight: 500,
            minHeight: 500,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
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
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "end",
          alignContent: "end",
          marginTop: 10,
        }}
      >
        <Button
          style={{
            fontWeight: "bold",
          }}
          onClick={handleNavigate}
        >
          {translate("viewAll")}
        </Button>
      </div>
    </div>
  );

  return (
    <Popover
      content={content}
      title={
        <>
          <Flex justify="space-between" align="center">
            <CustomTitle level={3} style={{ fontWeight: "normal" }}>
              {translate("notifications")}
            </CustomTitle>
            <Button
              size="small"
              icon={
                <Image
                  src="/images/icons/close-icon.svg"
                  alt="close icon"
                  width={20}
                  height={20}
                />
              }
              style={{ border: "none", outline: "none" }}
              onClick={() => setVisible(false)}
            />
          </Flex>
          <Divider style={{ margin: "8px 0" }} />
        </>
      }
      trigger="click"
      placement="bottomLeft"
      open={visible}
      onOpenChange={setVisible}
    >
      <Badge count={notifications.length}>
        <BellOutlined style={{ fontSize: "24px", cursor: "pointer" }} />
      </Badge>
    </Popover>
  );
}
