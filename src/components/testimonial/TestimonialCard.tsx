"use client";
import { Divider, Flex, Rate, theme } from "antd";
import Image from "next/image";
import { CustomText, CustomTitle } from "@/components";
import { TTestimonial } from "@/types";

const { useToken } = theme;
export function TestimonialCard({
  testimonial,
}: {
  testimonial: TTestimonial;
}) {
  const { token } = useToken();
  return (
    <Flex gap={40}>
      <Image
        src={testimonial.image}
        alt="user-image"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "100%" }}
      />
      <Flex vertical gap={4}>
        <CustomTitle level={4} style={{ fontWeight: "bold" }}>
          {testimonial.title}
        </CustomTitle>
        <Rate
          allowHalf
          disabled
          defaultValue={testimonial.rating}
          style={{ color: token.colorPrimary }}
        />
        <Divider
          style={{ margin: "10px 0", borderColor: token.colorPrimary }}
        />
        <CustomText className="truncated-text-6">
          {testimonial.description}
          {testimonial.description}
        </CustomText>
      </Flex>
    </Flex>
  );
}
