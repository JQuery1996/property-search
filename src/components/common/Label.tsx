import { ReactNode } from "react";
import { Flex, FlexProps } from "antd";

type TLabel = {
  icon: ReactNode;
  text: ReactNode;
} & Omit<FlexProps, "children">;
export function Label({ icon, text, ...props }: TLabel) {
  return (
    <Flex justify="center" align="center" gap={4} {...props}>
      {icon}
      {text}
    </Flex>
  );
}
