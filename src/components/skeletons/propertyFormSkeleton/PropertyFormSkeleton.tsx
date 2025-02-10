"use client";
import { Skeleton, Row, Col } from "antd";
import styles from "./styles.module.css";
export function PropertyFormSkeleton() {
  return (
    <Row gutter={[16, 16]} className={styles.skeletonWrapper}>
      <Col xs={24} style={{ marginBottom: 20 }}>
        <Skeleton.Input active style={{ width: 200, height: 30 }} />
      </Col>
      <Col xs={24} md={12} lg={8}>
        <Skeleton.Input active style={{ width: "100%", height: 40 }} />
      </Col>
      <Col xs={24}>
        <Skeleton.Input active style={{ width: "100%", height: 100 }} />
      </Col>
      <Col xs={24} lg={8}>
        <Skeleton.Input active style={{ width: "100%", height: 40 }} />
      </Col>
      <Col xs={24} lg={8}>
        <Skeleton.Input active style={{ width: "100%", height: 40 }} />
      </Col>
      <Col xs={24} lg={8}>
        <Skeleton.Input active style={{ width: "100%", height: 40 }} />
      </Col>
      <Col xs={24} lg={8}>
        <Skeleton.Input active style={{ width: "100%", height: 40 }} />
      </Col>
      <Col xs={24} lg={8}>
        <Skeleton.Input active style={{ width: "100%", height: 40 }} />
      </Col>
      <Col xs={24} lg={8}>
        <Skeleton.Input active style={{ width: "100%", height: 40 }} />
      </Col>
      <Col xs={24} lg={8}>
        <Skeleton.Input active style={{ width: "100%", height: 40 }} />
      </Col>
      <Col xs={24} lg={8}>
        <Skeleton.Input active style={{ width: "100%", height: 40 }} />
      </Col>
      <Col xs={24} style={{ marginBottom: 20, marginTop: 40 }}>
        <Skeleton.Input active style={{ width: 200, height: 30 }} />
      </Col>
      <Col xs={24} lg={8}>
        <Skeleton.Input active style={{ width: "100%", height: 40 }} />
      </Col>
      <Col xs={24}>
        <Skeleton.Input active style={{ width: "100%", height: 300 }} />
      </Col>
      <Col xs={24} style={{ marginBottom: 20, marginTop: 40 }}>
        <Skeleton.Input active style={{ width: 200, height: 30 }} />
      </Col>
      <Col xs={24}>
        <Skeleton.Input active style={{ width: "100%", height: 200 }} />
      </Col>
      <Col xs={24} style={{ margin: "20px 0" }}>
        <Skeleton.Button active style={{ width: "100%", height: 40 }} />
      </Col>
    </Row>
  );
}
