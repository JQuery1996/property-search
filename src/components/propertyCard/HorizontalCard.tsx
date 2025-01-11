"use client";
import { TListing } from "@/types";
import { Button, Card, Carousel, Col, Flex, Row, Tooltip } from "antd";
import Image from "next/image";
import { CustomText, CustomTitle, Label } from "@/components";
import CustomButton from "@/components/override/customButton/CustomButton";

export function HorizontalCard({ listing }: { listing: TListing }) {
  const borderRadius = 5;
  return (
    <Card
      style={{ borderRadius, padding: 0 }}
      hoverable
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      <Row style={{ height: 220 }}>
        <Col span={8}>
          <div
            style={{
              borderRadius,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Carousel autoplay={true} dots={false}>
              {listing.image_urls.map((url, index) => (
                <div key={index}>
                  <img
                    src={url}
                    alt="property-image"
                    style={{
                      width: "100%",
                      objectFit: "fill",
                      display: "block", // Ensures the image doesn't exceed its container
                      minHeight: "220px !important",
                      height: "220px !important",
                    }}
                  />
                </div>
              ))}
            </Carousel>
            <div
              style={{
                position: "absolute",
                top: "4%",
                insetInlineStart: "4%",
                width: 31,
                height: 23,
                backgroundColor: "white",
                borderRadius: 6,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
              }}
            >
              <Image
                src="/images/icons/share.svg"
                width={15}
                height={15}
                alt="share"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: "4%",
                insetInlineEnd: "4%",
                width: 31,
                height: 23,
                backgroundColor: "white",
                borderRadius: 6,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
              }}
            >
              <Image
                src="/images/icons/bookmark.svg"
                width={15}
                height={15}
                alt="bookmark"
              />
            </div>
          </div>
        </Col>
        <Col span={16}>
          <Flex vertical gap={8} style={{ padding: 20 }}>
            <Tooltip title={listing.title}>
              <CustomTitle level={5} ellipsis>
                <Tooltip title={listing.title}>{listing.title}</Tooltip>
              </CustomTitle>
            </Tooltip>

            <CustomText style={{ fontWeight: "bold" }}>
              {listing.price_value} {listing.price_currency}
            </CustomText>
            <Flex gap={25} style={{ margin: "10px 0" }}>
              <Label
                icon={
                  <Image
                    src="/images/icons/bed.svg"
                    alt="bed"
                    width={16}
                    height={16}
                  />
                }
                text={
                  <CustomText type="secondary">
                    {listing.bedrooms ?? "-"}
                  </CustomText>
                }
              />
              <Label
                icon={
                  <Image
                    src="/images/icons/bath.svg"
                    alt="bed"
                    width={16}
                    height={16}
                  />
                }
                text={
                  <CustomText type="secondary">
                    {listing.bathrooms ?? "-"}
                  </CustomText>
                }
              />
              <Label
                icon={
                  <Image
                    src="/images/icons/area.svg"
                    alt="bed"
                    width={16}
                    height={16}
                  />
                }
                text={
                  <CustomText type="secondary">
                    {listing.size_value} {listing.size_unit}
                  </CustomText>
                }
              />
            </Flex>
            <Flex gap={8} wrap>
              <Button
                color="danger"
                variant="filled"
                styles={{
                  icon: {
                    width: 16,
                    height: 16,
                  },
                }}
                icon={
                  <Image
                    src="/images/icons/hang.svg"
                    alt="contact us"
                    width={16}
                    height={16}
                  />
                }
              >
                Contact Us
              </Button>
              <CustomButton
                color="success"
                variant="filled"
                style={{ fontWeight: "600" }}
                styles={{
                  icon: {
                    width: 16,
                    height: 16,
                  },
                }}
                icon={
                  <Image
                    src="/images/icons/whatsapp.svg"
                    alt="contact us"
                    width={16}
                    height={16}
                  />
                }
              >
                Contact Us
              </CustomButton>
            </Flex>

            <Flex justify="end">
              <Label
                icon={
                  <Image
                    src="/images/icons/calendar.svg"
                    width={16}
                    height={16}
                    alt="date"
                  />
                }
                text={
                  <CustomText type="secondary">
                    {listing.added_date.toString()}
                  </CustomText>
                }
              />
            </Flex>
          </Flex>
        </Col>
      </Row>
    </Card>
  );
}
