"use client";
import { Button, Form } from "antd";
import { useState } from "react";
import { Filter } from "@/components/popup/filter";

export default function FilterPopup() {
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleOpenFilterModal = () => {
    setFilterModalOpen(true);
  };

  const handleCancelFilterModal = () => {
    setFilterModalOpen(false);
  };

  const handleOkFilterModal = () => {
    console.log("ok");
  };

  const handleClearAllFilters = () => {
    console.log("clear All");
  };

  return (
    <>
      <Button onClick={handleOpenFilterModal}>Filter</Button>
      <Filter
        form={form}
        open={filterModalOpen}
        onOk={handleOkFilterModal}
        onCancel={handleCancelFilterModal}
        onClearAll={handleClearAllFilters}
      />
    </>
  );
}
