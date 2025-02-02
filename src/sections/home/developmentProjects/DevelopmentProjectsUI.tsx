"use client";
import { Button, Col, Flex, Row } from "antd";
import { CustomTitle, DeveloperCard } from "@/components";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { TDevelopmentProperty } from "@/types";

type TDevelopmentProjectsUI = {
  developmentProperties: TDevelopmentProperty[];
};
export function DevelopmentProjectsUI({
  developmentProperties,
}: TDevelopmentProjectsUI) {
  const translate = useTranslations("HomePage.developmentProjects");
  console.log({ developmentProperties });
  return (
    <Flex vertical gap={4} style={{ width: "87%" }}>
      <CustomTitle type="primary" level={4} style={{ margin: 0 }}>
        {translate("title")}
      </CustomTitle>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <CustomTitle level={3} style={{ margin: 0 }}>
          {translate("developmentProjects")}
        </CustomTitle>
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
      {developmentProperties.length > 0 && (
        <Row gutter={[16, 16]} style={{ margin: "20px 0" }}>
          {developmentProperties.map((developmentProperty, index) => (
            <Col key={index} xs={24} md={12} lg={8} xl={6}>
              <DeveloperCard developmentProperty={developmentProperty} />
            </Col>
          ))}
        </Row>
      )}
    </Flex>
  );
}
