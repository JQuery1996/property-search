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

  // Map the `primary` type to the primary color from the theme
  const textColor = type === "primary" ? token.colorPrimary : undefined;

  return <AntdText {...props} style={{ color: textColor, ...style }} />;
};
