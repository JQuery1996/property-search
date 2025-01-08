import { Button, Col, Flex, Row } from "antd";
import { CustomTitle, VerticalCard } from "@/components";
import styles from "./style.module.css";
import Image from "next/image";
import { TProperty } from "@/types";

const property = {
  id: 1,
  title: "Fully Fitted with Glass Partitions, Near to Metro, Regal tower",
  description:
    "The Regal Tower has 265 offices spread over 32 floors, with modern amenities within its tactical location. The stylish exterior creates a new business landmark, its interiors are designed with the newest facilities and fixtures to create a better work atmosphere. Main Property Features: * Fitted w/ Glass Partitions * 1 Large manager room * 1 Workstation area * 1 Toilet inside the office * 1 Kitchen inside the office * Partial view of the Water canal * Lots of natural light * Mid Floor * 1 meeting room * Easy access to Sheikh Zayed Road * Walking distance to metro station Facilities: * 24/7 Security * Gym * Covered Parking * Conference Halls * High-speed elevator * Banquet Hall * Fully equipped health club Contact us now for more information about this unit! Dcreek Properties Contact no View Contact Detail Email: Send e-mail RERA Broker ID: 66582",
  location: "Regal Tower, Business Bay, Dubai",
  source: "bayut",
  url: "https://www.bayut.com/en/property/details-9904945.html",
  price_value: "205000",
  price_currency: "AED",
  price_period: "Yearly",
  property_type: "Office",
  property_purpose: "For Rent",
  reference_no: "Bayut - D.C.R.N 139",
  completion_status: null,
  added_date: "2024-10-09",
  bedrooms: null,
  bathrooms: null,
  size_value: "1368",
  size_unit: "sqft",
  agent_name: "Null",
  agent_image_url: null,
  amenities: [
    "Balcony or Terrace",
    "Shared Kitchen",
    "Parking Spaces: 1",
    "Electricity Backup",
    "Electricity Backup",
    "Parking Spaces: 1",
    "Centrally Air-Conditioned",
    "Central Heating",
    "Double Glazed Windows",
    "Storage Areas",
    "Study Room",
    "Balcony or Terrace",
    "Lobby in Building",
    "Elevators in Building: 6",
    "Service Elevators",
    "Prayer Room",
    "Reception/Waiting Room",
    "First Aid Medical Center",
    "Facilities for Disabled",
    "Cafeteria or Canteen",
    "Waste Disposal",
    "Maintenance Staff",
    "Cleaning Services",
    "Conference Room",
    "Security Staff",
    "CCTV Security",
    "Shared Kitchen",
    "Laundry Room",
    "Laundry Facility",
    "Broadband Internet",
    "Satellite/Cable TV",
    "Intercom",
    "24 Hours Concierge",
    "Nearby Shopping Malls",
  ],
  image_urls: [
    "https://images.bayut.com/thumbnails/742890829-400x300.webp",
    "https://images.bayut.com/thumbnails/742890827-400x300.webp",
    "https://images.bayut.com/thumbnails/741296080-400x300.webp",
    "https://images.bayut.com/thumbnails/406784185-240x180.webp",
    "https://images.bayut.com/thumbnails/742890834-800x600.webp",
    "https://images.bayut.com/thumbnails/742890828-400x300.webp",
    "https://images.bayut.com/thumbnails/742890827-800x600.webp",
    "https://images.bayut.com/thumbnails/742890828-800x600.webp",
    "https://images.bayut.com/thumbnails/742890826-800x600.webp",
    "https://images.bayut.com/thumbnails/738642260-400x300.webp",
    "https://images.bayut.com/thumbnails/742890831-800x600.webp",
    "https://images.bayut.com/thumbnails/742890829-800x600.webp",
    "https://images.bayut.com/thumbnails/742890835-800x600.webp",
    "https://images.bayut.com/thumbnails/730092034-400x300.webp",
    "https://images.bayut.com/thumbnails/742890832-800x600.webp",
    "https://images.bayut.com/thumbnails/742890833-800x600.webp",
    "https://images.bayut.com/thumbnails/742890830-800x600.webp",
  ],
  verified: null,
  agent_number: "+971527699013",
  created_at: "2024-10-09T13:52:23.000000Z",
  whatsapp_number: "+971545695868",
  latitude: "25.18681400",
  longitude: "55.26080400",
  is_approved: 1,
} as unknown as TProperty;
export function RecentAdditions() {
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
        <Col xs={24} xl={6} xxl={4}>
          <VerticalCard property={property} />
        </Col>
        <Col xs={24} xl={6} xxl={4}>
          <VerticalCard property={property} />
        </Col>
        <Col xs={24} xl={6} xxl={4}>
          <VerticalCard property={property} />
        </Col>
        <Col xs={24} xl={6} xxl={4}>
          <VerticalCard property={property} />
        </Col>
        <Col xs={24} xl={6} xxl={4}>
          <VerticalCard property={property} />
        </Col>
        <Col xs={24} xl={6} xxl={4}>
          <VerticalCard property={property} />
        </Col>
      </Row>
    </Flex>
  );
}
