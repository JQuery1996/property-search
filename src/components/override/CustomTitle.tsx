"use client"; // Mark this as a client component

import React from "react";
import { Typography, theme } from "antd";
import type { TitleProps as AntdTitleProps } from "antd/es/typography/Title";
import { BaseType } from "antd/es/typography/Base";

const { Title: AntdTitle } = Typography;
const { useToken } = theme;

// Custom type definition
interface CustomTitleProps extends Omit<AntdTitleProps, "type"> {
  type?: "primary" | "secondary" | "success" | "danger" | "warning" | "default";
}

export const CustomTitle: React.FC<CustomTitleProps> = ({
  type,
  style,
  ...props
}) => {
  const { token } = useToken();

  // Compute custom styles based on the type
  const customStyle =
    type === "primary"
      ? { color: token.colorPrimary, ...style }
      : type === "secondary"
        ? { color: token.colorTextSecondary, ...style }
        : style;

  return (
    <AntdTitle
      type={type !== "primary" ? (type as BaseType) : undefined} // Pass `type` only if not "primary"
      {...props}
      style={{ margin: 0, ...customStyle }}
    />
  );
};
