import React from "react";
import { Button, ButtonProps } from "antd";
import styles from "./styles.module.css";

type CustomButtonProps = Omit<ButtonProps, "color"> & {
  color?: "default" | "primary" | "danger" | "success";
};

const CustomButton: React.FC<CustomButtonProps> = ({
  color = "default",
  ...props
}) => {
  const colorClass = color === "success" ? styles.success : "";

  return (
    <Button {...props} className={`${props.className || ""} ${colorClass}`}>
      {props.children}
    </Button>
  );
};

export default CustomButton;
