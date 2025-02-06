"use client";
import { useAuth, useSettings } from "@/contexts";
import { CustomText, CustomTitle, ProfileSkeleton } from "@/components";
import { useTranslations } from "next-intl";
import { Avatar, Card, Flex, theme } from "antd";
import { ProfileForm } from "./ProfileForm";
const { useToken } = theme;

export function ProfileUi() {
  const { token } = useToken();
  const { user } = useAuth();
  const { loading } = useSettings();
  const translate = useTranslations("Common");

  return user && !loading ? (
    <Flex vertical gap={32} style={{ padding: 48 }}>
      <CustomTitle level={2}>{translate("myAccount")}</CustomTitle>
      <Card
        styles={{
          body: { padding: 10 },
        }}
      >
        <Flex gap={16}>
          <Avatar
            style={{
              backgroundColor: token.colorPrimary,
              color: "white",
              fontSize: 24,
              width: 50,
              height: 50,
            }}
            size="large"
          >
            {user.name[0].toUpperCase()}
          </Avatar>
          <Flex vertical>
            <CustomText strong style={{ fontSize: 18, fontWeight: "bold" }}>
              {user.name}
            </CustomText>
            <CustomText type="secondary" style={{ fontSize: 14 }}>
              {user.email}
            </CustomText>
          </Flex>
        </Flex>
      </Card>
      <Card>
        <ProfileForm />
      </Card>
    </Flex>
  ) : (
    <ProfileSkeleton /> // Use the skeleton component
  );
}
