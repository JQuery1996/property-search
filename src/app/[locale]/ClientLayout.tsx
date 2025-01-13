"use client";
import React, { ReactNode } from "react";
import { App, ConfigProvider, Layout, Menu, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useTranslations } from "next-intl";
import { MENU_ITEMS } from "@/constants";
import { LogoWithBrand } from "@/components";
import { themeConfig } from "@/theme";
import { getAntdLocale, getDirectionFromLocale } from "@/helpers";
import { useLocale } from "use-intl";
import { TLOCALE } from "@/types";
import { useResponsive } from "antd-style";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import { AppFooter } from "@/sections";

type TClientLayout = {
  children: ReactNode;
};
export function ClientLayout({ children }: TClientLayout) {
  const {
    token: { colorBgContainer, borderRadiusLG, colorBgBase },
  } = theme.useToken();

  const translate = useTranslations("Layout.Header.Items");
  const locale = useLocale() as TLOCALE;
  const { xxl } = useResponsive();
  const direction = getDirectionFromLocale(locale);
  const antdLocale = getAntdLocale(locale);

  return (
    <ConfigProvider
      componentSize={xxl ? "middle" : "small"}
      locale={antdLocale}
      direction={direction}
      theme={themeConfig}
    >
      <App>
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
              style={{
                flex: 1,
                minWidth: 0,
                border: "none",
                fontWeight: "bold",
              }}
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
          <AppFooter />
        </Layout>
      </App>
    </ConfigProvider>
  );
}
