"use client";
import React, { ReactNode } from "react";
import { Layout, Menu, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useTranslations } from "next-intl";
import { MENU_ITEMS } from "@/constants";
import { LogoWithBrand } from "@/components";

type TClientLayout = {
  children: ReactNode;
};
export function ClientLayout({ children }: TClientLayout) {
  const {
    token: { colorBgContainer, borderRadiusLG, colorBgBase },
  } = theme.useToken();

  const translate = useTranslations("Layout.Header.Items");
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: colorBgBase,
        }}
      >
        <div className="demo-logo">
          <LogoWithBrand />
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={MENU_ITEMS.map((item) => ({
            key: item,
            label: translate(item),
          }))}
          style={{ flex: 1, minWidth: 0, border: "none", fontWeight: "bold" }}
        />
      </Header>
      <Content>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      {/*<Footer style={{ textAlign: "center" }}>*/}
      {/*  Ant Design ©{new Date().getFullYear()} Created by Ant UED*/}
      {/*</Footer>*/}
    </Layout>
  );
}
