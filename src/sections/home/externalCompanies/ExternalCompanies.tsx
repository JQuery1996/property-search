"use client";
import { ASSETS } from "@/constants";
import { Card, Col, Row } from "antd";
import Image from "next/image";
import { CustomTitle } from "@/components";
import { useResponsive } from "antd-style";

const LIST = [
  { title: "Mortgage", image: ASSETS.HOME("adcb.png") },
  { title: "Evaluation", image: ASSETS.HOME("max-well.png") },
  { title: "Golden Visa", image: ASSETS.HOME("amer.png") },
  { title: "Trustee", image: ASSETS.HOME("amen.png") },
  { title: "Exclusive hotel deal!", image: ASSETS.HOME("save-travels.png") },
];

export function ExternalCompanies() {
  const { mobile } = useResponsive();
  return (
    <Row gutter={[16, 16]} justify="center" style={{ width: "95%" }}>
      {LIST.map(({ title, image }, index) => (
        <Col
          key={index}
          xs={12} // Full width on extra small
          sm={12} // Full width on small
          md={12} // 2 per row on medium
          lg={8}
          xl={6}
          xxl={{
            // 5 per row on large+
            flex: "0 0 calc(20% - 16px)", // 20% minus gutter
          }}
        >
          <Card
            style={{ width: "100%", padding: "10px 20px" }}
            styles={{
              body: { padding: 10 },
            }}
            hoverable
            bordered
            cover={
              <Image
                alt={title}
                src={image}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: mobile ? 100 : 150,
                }}
                priority
              />
            }
          >
            <CustomTitle
              level={4}
              style={{
                textAlign: "center",
                marginTop: 10,
              }}
            >
              {title}
            </CustomTitle>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
