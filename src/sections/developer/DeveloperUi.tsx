import { TDevelopmentProperty, TProject } from "@/types";
import { DeveloperImage } from "./DeveloperImage";
import { Col, Flex, Row } from "antd";
import { Contact, CustomText, CustomTitle, ProjectCard } from "@/components";
import { useTranslations } from "next-intl";
type TDeveloperUi = {
  developer: TDevelopmentProperty;
  projects: TProject[];
};
export function DeveloperUi({ developer, projects }: TDeveloperUi) {
  const translate = useTranslations("developers");
  const commonTranslate = useTranslations("Common");

  return (
    <>
      <DeveloperImage image={developer.developer.image} />
      <Flex vertical gap={16} style={{ padding: 48 }}>
        <CustomTitle level={2}>{developer.name}</CustomTitle>
        <CustomText type="secondary">
          {developer.developer.description ??
            translate("offPlanAndNewProjectBy") +
              " " +
              developer.name +
              " " +
              translate("properties")}
        </CustomText>
        <CustomTitle level={4}>
          {translate("projects")} ({projects.length})
        </CustomTitle>

        <Row gutter={[16, 16]} style={{ margin: "20px 0" }}>
          {projects.map((project, index) => (
            <Col key={index} xs={24} md={12} lg={8} xl={6}>
              <ProjectCard developer={developer} project={project} />
            </Col>
          ))}
        </Row>

        <Contact
          containerProps={{
            style: { margin: "20px 0 " },
          }}
          title={commonTranslate("contactInformation")}
          titleProps={{
            style: { fontWeight: 900 },
          }}
          description={commonTranslate(
            "youCanContactUsThroughTheFollowingNumbers",
          )}
          descriptionProps={{
            type: "secondary",
            style: { fontSize: 16 },
          }}
          whatsapp={developer.phone}
          mobile={developer.phone}
          email={developer.email}
        />
      </Flex>
    </>
  );
}
