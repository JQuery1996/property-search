"use client";
import { Button, Col, Empty, Flex, Row } from "antd";
import { CustomTitle, DeveloperCard } from "@/components";
import { useTranslations } from "next-intl";
import { TDevelopmentProperty } from "@/types";
import { useRouter } from "@/i18n/routing";
import { PAGES } from "@/constants";

type TDevelopmentProjectsUI = {
  developmentProperties: TDevelopmentProperty[];
};
export function DevelopmentProjectsUI({
  developmentProperties,
}: TDevelopmentProjectsUI) {
  const translate = useTranslations("HomePage.developmentProjects");
  const commonTranslate = useTranslations("Common");
  const { push } = useRouter();
  return (
    <Flex vertical gap={4} style={{ width: "90%" }}>
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
          color="danger"
          style={{ fontSize: 16, fontWeight: "bold" }}
          onClick={() => push(PAGES.DEVELOPERS)}
        >
          {commonTranslate("viewAll")}
        </Button>
      </div>
      {developmentProperties.length > 0 ? (
        <Row gutter={[16, 16]} style={{ margin: "20px 0" }}>
          {developmentProperties.map((developmentProperty, index) => (
            <Col key={index} xs={24} md={12} lg={8} xl={6}>
              <DeveloperCard developmentProperty={developmentProperty} />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty style={{ margin: "40px 0" }} />
      )}
    </Flex>
  );
}
