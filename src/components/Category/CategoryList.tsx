import { Col, Row, RowProps } from "antd";
import { Category } from "@/components";
import { TCategory } from "@/types";

const categories: TCategory[] = [
  {
    icon: "/images/icons/home.svg",
    title: "House",
    description:
      "Lorem ipsum dolor sit amet consectetur. Ante pellentesque tristique et lobortis interdum mollis.",
    action: "",
  },
  {
    icon: "/images/icons/apartment.svg",
    title: "Apartment",
    description:
      "Lorem ipsum dolor sit amet consectetur. Ante pellentesque tristique et lobortis interdum mollis.",
    action: "",
    styles: {
      bgColor: "#3E3238",
      color: "white",
    },
  },
  {
    icon: "/images/icons/homeOffice.svg",
    title: "Home Office",
    description:
      "Lorem ipsum dolor sit amet consectetur. Ante pellentesque tristique et lobortis interdum mollis.",
    action: "",
  },
  {
    icon: "/images/icons/Warehouse.svg",
    title: "Warehouse",
    description:
      "Lorem ipsum dolor sit amet consectetur. Ante pellentesque tristique et lobortis interdum mollis.",
    action: "",
  },
];
export function CategoryList({ ...props }: RowProps) {
  return (
    <Row {...props}>
      {categories.map((category, index) => (
        <Col key={index} xs={24} md={12} lg={6}>
          <Category category={category} />
        </Col>
      ))}
    </Row>
  );
}
