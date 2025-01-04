import React from "react";
import { Typography, theme } from "antd";
import type { TitleProps as AntdTitleProps } from "antd/es/typography/Title";

// Custom type definition
interface CustomTitleProps extends Omit<AntdTitleProps, "type"> {
  type?: "primary" | "secondary" | "success" | "danger" | "warning" | "default";
}

export const CustomTitle: React.FC<CustomTitleProps> = ({
  type,
  style,
  ...props
}) => {
  const { token } = theme.useToken();

  // Compute custom styles based on the type
  const customStyle =
    type === "primary"
      ? { color: token.colorPrimary, ...style }
      : type === "secondary"
        ? { color: token.colorTextSecondary, ...style }
        : style;

  return <Typography.Title {...props} style={customStyle} />;
};