"use client";
import { ASSETS } from "@/constants";
import { Card, Col, Row } from "antd";
import Image from "next/image";
import { CustomTitle } from "@/components";

const LIST = [
  { title: "Mortgage", image: ASSETS.HOME("adcb.png") },
  { title: "Evaluation", image: ASSETS.HOME("max-well.png") },
  { title: "Golden Visa", image: ASSETS.HOME("amer.png") },
  { title: "Trustee", image: ASSETS.HOME("amen.png") },
  {
    title: "Exclusive hotel deal!",
    image: ASSETS.HOME("save-travels.png"),
    href: "https://hotelya.co",
  },
];

export function ExternalCompanies() {
  return (
    <Row gutter={[8, 8]} justify="center" style={{ width: "90%" }}>
      {LIST.map((item, index) => (
        <Col key={index} xs={12} sm={12} md={8} lg={6} xl={4}>
          <Card
            style={{ width: "100%", padding: 10 }}
            styles={{
              body: { padding: 5 },
            }}
            hoverable
            bordered
            onClick={() => {
              if (item.href) window.open(item.href, "_blank");
            }}
            cover={
              <div
                style={{
                  height: 100,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Image
                  alt={item.title}
                  src={item.image}
                  fill // This makes the image fill the parent container
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
            }
          >
            <CustomTitle
              level={5}
              style={{
                textAlign: "center",
                marginTop: 10,
              }}
            >
              {item.title}
            </CustomTitle>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
