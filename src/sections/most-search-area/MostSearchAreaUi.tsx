"use client";
import { TMostSearchArea } from "@/types";
import { useTranslations } from "next-intl";
import { Flex, Table, Tag } from "antd";
import { CustomTitle } from "@/components";

export function MostSearchAreaUi({
  mostSearchAreas,
}: {
  mostSearchAreas: TMostSearchArea[];
}) {
  const translate = useTranslations("MostSearchArea");
  const columns = [
    {
      title: translate("areaName"),
      dataIndex: "areaName",
      key: "areaName",
    },
    {
      title: translate("counter"),
      dataIndex: "counter",
      key: "counter",
      sorter: (a: any, b: any) => a.counter - b.counter, // Sort by counter (numeric)
      align: "center",
      render: (text: string) => <Tag color="volcano">{text}</Tag>,
    },
  ];

  const dataSource = mostSearchAreas.map((msa) => ({
    key: msa.id.toString(),
    areaName: msa.name,
    counter: msa.counter,
  }));

  return (
    <Flex style={{ padding: 48 }} gap={24} vertical>
      <CustomTitle level={3}>{translate("title")}</CustomTitle>
      <Table
        columns={columns as any}
        dataSource={dataSource}
        pagination={false}
        bordered
      />
    </Flex>
  );
}
