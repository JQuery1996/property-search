"use client";

import React, { useState } from "react";
import { Flex, Typography } from "antd";
import { CustomText } from "@/components";
import { RightOutlined } from "@ant-design/icons";

type TExpandedText = {
  rows: number; // Number of visible rows when collapsed
  text: string; // The text content to display
};

export function ExpandedText({ rows, text }: TExpandedText) {
  const [expanded, setExpanded] = useState(false); // State to manage expanded/collapsed state

  return (
    <Flex vertical gap={4}>
      <Typography.Paragraph
        style={{ margin: 0 }}
        ellipsis={{
          rows: rows,
          expanded,
          onExpand: (_, info) => setExpanded(info.expanded),
        }}
      >
        {text}
      </Typography.Paragraph>
      <CustomText
        type="primary"
        style={{ fontWeight: "bold", cursor: "pointer", width: "fit-content" }}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <span style={{ fontSize: "inherit", textDecoration: "underline" }}>
          Show more
        </span>{" "}
        <RightOutlined />
      </CustomText>
    </Flex>
  );
}
