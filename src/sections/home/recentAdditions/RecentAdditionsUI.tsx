import { TListing } from "@/types";
import { Button, Col, Flex, Row } from "antd";
import { CustomTitle, VerticalCard } from "@/components";
import Image from "next/image";
import { useTranslations } from "next-intl";

type TRecentAdditionsUI = {
  listings: TListing[];
};
export function RecentAdditionsUI({ listings }: TRecentAdditionsUI) {
  const translate = useTranslations("HomePage.RecentAdditions");
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
          {translate("findPropertiesThatSuitsYou")}
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
