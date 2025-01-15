"use client";
import { Card, Col, Flex, Row } from "antd";
import { CustomTitle, Welcome } from "@/components";
import { ReactNode } from "react";

type TAuthCard = {
  action: string;
  children: ReactNode;
};
export function AuthCard({ action, children }: TAuthCard) {
  return (
    <Card>
      <Flex vertical gap={8}>
        <Welcome />
        <CustomTitle level={3}>{action}</CustomTitle>
        <Row>
          <Col xs={24} xl={{ span: 12, push: 1 }}>
            {children}
          </Col>
        </Row>
      </Flex>
    </Card>
  );
}
