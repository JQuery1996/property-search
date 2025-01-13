"use client";
import { Flex } from "antd";
import { CustomTitle } from "@/components";
import { TestimonialsSlider } from "@/components/testimonial/TestimonialsSlider";
import { TTestimonial } from "@/types";
import { useTranslations } from "next-intl";

const testimonials: TTestimonial[] = [
  {
    title: "Anita Anastasya",
    rating: 5,
    description:
      "Lorem ipsum dolor sit amet consectetur. Est id consectetur elementum gravida vulputate lacinia in. Condimentum pretium eget sit suspendisse tincidunt ac. Blandit eget egestas nunc dolor.",
    image: "/images/home/anita.png",
  },
  {
    title: "Anita Anastasya",
    rating: 5,
    description:
      "Lorem ipsum dolor sit amet consectetur. Est id consectetur elementum gravida vulputate lacinia in. Condimentum pretium eget sit suspendisse tincidunt ac. Blandit eget egestas nunc dolor.",
    image: "/images/home/anita.png",
  },
  {
    title: "Anita Anastasya",
    rating: 5,
    description:
      "Lorem ipsum dolor sit amet consectetur. Est id consectetur elementum gravida vulputate lacinia in. Condimentum pretium eget sit suspendisse tincidunt ac. Blandit eget egestas nunc dolor.",
    image: "/images/home/anita.png",
  },
];
export function Testimonials() {
  const translate = useTranslations("HomePage.testimonials");
  return (
    <Flex vertical gap={8}>
      <div
        style={{
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        <CustomTitle level={4} type="primary">
          {translate("title")}
        </CustomTitle>
        <CustomTitle level={2} style={{ fontWeight: "bold" }}>
          {translate.rich("description", {
            space: () => <br />,
          })}
        </CustomTitle>
      </div>
      <TestimonialsSlider testimonials={testimonials} />
    </Flex>
  );
}
