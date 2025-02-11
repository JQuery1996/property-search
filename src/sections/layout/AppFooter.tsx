"use client";
import { theme, Layout, Row, Col, Flex, Button } from "antd";
import { CustomText, CustomTitle, LogoWithBrand } from "@/components";
import { Link } from "@/i18n/routing";
import { useResponsive } from "antd-style";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { PAGES } from "@/constants";

const { Footer } = Layout;
const { useToken } = theme;

export function AppFooter() {
  const { token } = useToken();
  const { lg, mobile } = useResponsive();
  const translate = useTranslations("Layout.Header.Items");

  return (
    <Footer
      style={{
        padding: 40,
        backgroundColor: token.greyPink,
      }}
    >
      <CustomTitle level={3} style={{ color: "white", fontWeight: "bold" }}>
        {translate("discover")}
      </CustomTitle>
      <Row style={{ marginTop: 40 }} gutter={[16, 16]}>
        <Col xs={24} md={8} lg={8}>
          <Flex gap={8}>
            <LogoWithBrand titleStyle={{ color: "white" }} />
          </Flex>
        </Col>
        <Col xs={24} md={16} lg={16}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${mobile ? "2" : "3"}, 1fr)`,
              rowGap: "20px",
              columnGap: "60px",
              alignItems: "center",
            }}
          >
            <Link href={PAGES.HOME}>
              <CustomText
                style={{
                  borderLeft: `1px solid ${token.colorPrimary}`,
                  color: "white",
                  padding: "0 10px",
                  whiteSpace: "nowrap",
                }}
              >
                {translate("home")}
              </CustomText>
            </Link>
            <Link href={PAGES.PROPERTIES}>
              <CustomText
                style={{
                  borderLeft: `1px solid ${token.colorPrimary}`,
                  color: "white",
                  padding: "0 10px",
                  whiteSpace: "nowrap",
                }}
              >
                {translate("properties")}
              </CustomText>
            </Link>
            <Link href={PAGES.DEVELOPERS}>
              <CustomText
                style={{
                  borderLeft: `1px solid ${token.colorPrimary}`,
                  color: "white",
                  padding: "0 10px",
                  whiteSpace: "nowrap",
                }}
              >
                {translate("developers")}
              </CustomText>
            </Link>
            <Link href={PAGES.MOST_SEARCH_AREA}>
              <CustomText
                style={{
                  borderLeft: `1px solid ${token.colorPrimary}`,
                  color: "white",
                  padding: "0 10px",
                  whiteSpace: "nowrap",
                }}
              >
                {translate("mostSearchArea")}
              </CustomText>
            </Link>
            <Link href={PAGES.ABOUT_US}>
              <CustomText
                style={{
                  borderLeft: `1px solid ${token.colorPrimary}`,
                  color: "white",
                  padding: "0 10px",
                  whiteSpace: "nowrap",
                }}
              >
                {translate("about")}
              </CustomText>
            </Link>
          </div>
        </Col>
      </Row>
      <Flex justify="space-between" wrap style={{ marginTop: 30 }} gap={24}>
        <CustomTitle level={4} style={{ color: "white" }}>
          {translate("copyRight")} &copy;{new Date().getFullYear()}
        </CustomTitle>
        <Flex gap={24}>
          <Button
            disabled
            variant="link"
            style={{ background: "transparent", borderColor: "transparent" }}
            href=""
            icon={
              <Image
                src="/images/icons/twitter.svg"
                width={38}
                height={38}
                alt="twitter"
              />
            }
          />
          <Button
            disabled
            variant="link"
            style={{ background: "transparent", borderColor: "transparent" }}
            href=""
            icon={
              <Image
                src="/images/icons/facebook.svg"
                width={38}
                height={38}
                alt="facebook"
              />
            }
          />
          <Button
            disabled
            variant="link"
            style={{ background: "transparent", borderColor: "transparent" }}
            href=""
            icon={
              <Image
                src="/images/icons/instagram.svg"
                width={38}
                height={38}
                alt="instagram"
              />
            }
          />
          <Button
            disabled
            variant="link"
            style={{ background: "transparent", borderColor: "transparent" }}
            href=""
            icon={
              <Image
                src="/images/icons/linkedin.svg"
                width={38}
                height={38}
                alt="linkedin"
              />
            }
          />
        </Flex>
      </Flex>
    </Footer>
  );
}
