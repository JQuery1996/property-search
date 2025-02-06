"use client";
import { theme, Layout, Row, Col, Flex, Button } from "antd";
import { CustomText, CustomTitle, Logo } from "@/components";
import { APP } from "@/constants";
import { Link } from "@/i18n/routing";
import { useResponsive } from "antd-style";
import Image from "next/image";

const { Footer } = Layout;
const { useToken } = theme;

export function AppFooter() {
  const { token } = useToken();
  const { lg, mobile } = useResponsive();
  return (
    <Footer
      style={{
        padding: 40,
        backgroundColor: token.greyPink,
      }}
    >
      <CustomTitle level={3} style={{ color: "white", fontWeight: "bold" }}>
        Discover the Comfort of Your Life
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
                Home
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
                Packages
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
                Contact
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
                Categories
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
                Blog
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
                Licensing
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
              <CustomText style={{ color: "white" }}>Home</CustomText>
              <CustomText style={{ color: "white" }}>office</CustomText>
              <CustomText style={{ color: "white" }}>Apartment</CustomText>
              <CustomText style={{ color: "white" }}>Warehouse</CustomText>
            </div>
          </div>
        </Col>
      </Row>
      <Flex justify="space-between" wrap style={{ marginTop: 30 }} gap={24}>
        <CustomTitle level={4} style={{ color: "white" }}>
          CopyRight &copy;{new Date().getFullYear()}
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
