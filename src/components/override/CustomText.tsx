"use client"; // Mark this as a client component

import React from "react";
import { Typography, theme } from "antd";
import type { TextProps as AntdTextProps } from "antd/es/typography/Text";

const { Text: AntdText } = Typography;
const { useToken } = theme;

// Extend the original TextProps to include the `primary` type
interface CustomTextProps extends Omit<AntdTextProps, "type"> {
  type?: "primary" | "secondary" | "success" | "warning" | "danger";
}

export const CustomText: React.FC<CustomTextProps> = ({
  type,
  style,
  ...props
}) => {
  const { token } = useToken();

  // Compute custom styles based on the type
  const customStyle =
    type === "primary" ? { color: token.colorPrimary, ...style } : style;

  return (
    <AntdText
      type={type !== "primary" ? type : undefined} // Pass `type` only if not "primary"
      {...props}
      style={{ margin: 0, ...customStyle }}
    />
  );
};
