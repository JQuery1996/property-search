"use client";
import { Button, Col, Flex, Row } from "antd";
import { CustomTitle, HorizontalCard, VerticalCard } from "@/components";
import styles from "./style.module.css";
import Image from "next/image";
import { TListing } from "@/types";

type TRecentAdditions = {
  listings: TListing[];
};
export function RecentAdditions({ listings }: TRecentAdditions) {
  return (
    <Flex vertical gap={4} style={{ width: "87%" }}>
      <CustomTitle type="primary" level={4} className={styles.noMargin}>
        Recent Additions
      </CustomTitle>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <CustomTitle level={3} className={styles.noMargin}>
          Find Properties that Suits You
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
      <Row gutter={[16, 16]} style={{ margin: "20px 0" }}>
        {listings.map((listing) => (
          <Col key={listing.id} xs={24} md={12} lg={8} xl={6}>
            <VerticalCard listing={listing} />
          </Col>
        ))}
      </Row>
    </Flex>
  );
}
