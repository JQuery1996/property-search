"use client";
import { Button, Flex, Input, theme } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useTranslations } from "next-intl";

const { useToken } = theme;

export function Filter() {
  const { token } = useToken();
  const translate = useTranslations("HomePage.Filter");
  return (
    <Flex
      style={{
        padding: "20px",
        backgroundColor: token.colorPrimary,
        borderRadius: "12px",
        width: "90%",
      }}
      gap={12}
    >
      <Input
        size="large"
        placeholder={translate("searchProperty")}
        suffix={<SearchOutlined />}
      />
      <Button
        type="text"
        style={{ width: "32px", height: "40px" }}
        icon={<Image fill src="/images/icons/filter.svg" alt="filter icon" />}
      />
      <Button
        type="text"
        style={{ width: "32px", height: "40px" }}
        icon={
          <Image
            src="/images/icons/mic.svg"
            alt="mic icon"
            width={28}
            height={23}
          />
        }
      />
    </Flex>
  );
}
