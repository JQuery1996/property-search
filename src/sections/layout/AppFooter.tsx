"use client";
import { theme, Layout, Row, Col, Flex, Button } from "antd";
import { CustomText, CustomTitle, Logo } from "@/components";
import { APP } from "@/constants";
import { Link } from "@/i18n/routing";
import { useResponsive } from "antd-style";
import Image from "next/image";
import { useTranslations } from "next-intl";

const { Footer } = Layout;
const { useToken } = theme;

export function AppFooter() {
  const { token } = useToken();
  const { lg, mobile } = useResponsive();
  const translate = useTranslations("HomePage.Footer");

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
        <Col xs={24} md={12} lg={8}>
          <Flex gap={8}>
            <Logo style={{ width: "30px", height: "30px" }} />
            <CustomTitle
              level={5}
              style={{ margin: 0, fontWeight: 400, color: "white" }}
            >
              {APP.name}
            </CustomTitle>
          </Flex>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${mobile ? "2" : "3"}, 1fr)`,
              rowGap: "20px",
              columnGap: "60px",
              alignItems: "center",
            }}
          >
            <Link href="">
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
            <Link href="">
              <CustomText
                style={{
                  borderLeft: `1px solid ${token.colorPrimary}`,
                  color: "white",
                  padding: "0 10px",
                  whiteSpace: "nowrap",
                }}
              >
                {translate("packages")}
              </CustomText>
            </Link>
            <Link href="">
              <CustomText
                style={{
                  borderLeft: `1px solid ${token.colorPrimary}`,
                  color: "white",
                  padding: "0 10px",
                  whiteSpace: "nowrap",
                }}
              >
                {translate("contact")}
              </CustomText>
            </Link>
            <Link href="">
              <CustomText
                style={{
                  borderLeft: `1px solid ${token.colorPrimary}`,
                  color: "white",
                  padding: "0 10px",
                  whiteSpace: "nowrap",
                }}
              >
                {translate("categories")}
              </CustomText>
            </Link>
            <Link href="">
              <CustomText
                style={{
                  borderLeft: `1px solid ${token.colorPrimary}`,
                  color: "white",
                  padding: "0 10px",
                  whiteSpace: "nowrap",
                }}
              >
                {translate("blog")}
              </CustomText>
            </Link>
            <Link href="">
              <CustomText
                style={{
                  borderLeft: `1px solid ${token.colorPrimary}`,
                  color: "white",
                  padding: "0 10px",
                  whiteSpace: "nowrap",
                }}
              >
                {translate("licensing")}
              </CustomText>
            </Link>
          </div>
        </Col>

        <Col xs={24} md={12} lg={8}>
          <div
            style={{
              display: "flex",
              justifyContent: lg ? "center" : "start",
              alignContent: "center",
              alignItems: "center",
              borderLeft: `1px solid ${token.colorPrimary}`,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                rowGap: "20px",
                columnGap: "0px",
                alignItems: "center",
                width: mobile ? "90%" : "50%",
                padding: "0 10px",
              }}
            >
              <CustomText style={{ color: "white" }}>
                {translate("home")}
              </CustomText>
              <CustomText style={{ color: "white" }}>
                {translate("office")}
              </CustomText>
              <CustomText style={{ color: "white" }}>
                {translate("apartment")}
              </CustomText>
              <CustomText style={{ color: "white" }}>
                {translate("warehouse")}
              </CustomText>
            </div>
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
