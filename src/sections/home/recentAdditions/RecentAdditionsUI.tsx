"use client";
import { TListing } from "@/types";
import { Button, Col, Empty, Flex, Row } from "antd";
import { CustomTitle, VerticalCard } from "@/components";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { PAGES } from "@/constants";

type TRecentAdditionsUI = {
  listings: TListing[];
};
export function RecentAdditionsUI({ listings }: TRecentAdditionsUI) {
  const translate = useTranslations("HomePage.RecentAdditions");
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
          {translate("findPropertiesThatSuitsYou")}
        </CustomTitle>
        <Button
          type="text"
          color="danger"
          style={{ fontSize: 16, fontWeight: "bold" }}
          onClick={() => push(PAGES.PROPERTIES)}
        >
          {commonTranslate("viewAll")}
        </Button>
      </div>
      {listings.length > 0 ? (
        <Row gutter={[16, 16]} style={{ margin: "20px 0" }}>
          {listings.map((listing) => (
            <Col key={listing.id} xs={24} md={12} lg={8} xl={6}>
              <VerticalCard listing={listing} />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty style={{ margin: "40px 0" }} />
      )}
    </Flex>
  );
}
