"use client";
import Slider from "react-slick";
import { TTestimonial } from "@/types";
import { useResponsive } from "antd-style";
import { TestimonialCard } from "@/components";

export function TestimonialsSlider({
  testimonials,
}: {
  testimonials: TTestimonial[];
}) {
  const { xl, xxl } = useResponsive();
  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <Slider autoplay slidesToShow={xxl ? 3 : xl ? 2 : 1}>
        {testimonials.map((testimonial, index) => (
          <div key={index}>
            <div style={{ margin: "0 40px" }}>
              <TestimonialCard testimonial={testimonial} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
