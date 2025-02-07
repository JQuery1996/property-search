import { DeveloperBanner } from "@/sections";
import { Flex } from "antd";
import { CustomTitle } from "@/components";

export default function Developers() {
  return (
    <>
      <DeveloperBanner />
      <Flex vertical gap={16} style={{ padding: 48 }}>
        <CustomTitle level={2}>Projects under development</CustomTitle>
      </Flex>
    </>
  );
}
