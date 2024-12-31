import React from "react";
import { Typography, theme } from "antd";
import type { TextProps as AntdTextProps } from "antd/es/typography/Text";

// Custom type definition
interface CustomTextProps extends Omit<AntdTextProps, "type"> {
  type?: "primary" | "secondary" | "success" | "danger" | "warning";
}

export const CustomText: React.FC<CustomTextProps> = ({
  type,
  style,
  ...props
}) => {
  const { token } = theme.useToken();

  // Compute custom styles based on the type
  const customStyle =
    type === "primary" ? { color: token.colorPrimary, ...style } : style;

  // Fallback to the original type when it’s not "primary"
  const antdType = type !== "primary" ? type : undefined;

  return <Typography.Text {...props} type={antdType} style={customStyle} />;
};
