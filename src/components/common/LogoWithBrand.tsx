"use client";
import { Flex } from "antd";
import { Logo } from "@/components/common/Logo";
import Title, { TitleProps } from "antd/es/typography/Title";
import { APP, PAGES } from "@/constants";
import { useRouter } from "@/i18n/routing";

export function LogoWithBrand({
  titleStyle,
}: {
  titleStyle?: TitleProps["style"];
}) {
  const { push } = useRouter();
  return (
    <Flex
      justify="center"
      gap={8}
      style={{ cursor: "pointer" }}
      onClick={() => push(PAGES.HOME)}
    >
      <Logo style={{ width: "30px", height: "30px" }} />
      <Title level={4} style={{ margin: 0, fontWeight: 400, ...titleStyle }}>
        {APP.name}
      </Title>
    </Flex>
  );
}
