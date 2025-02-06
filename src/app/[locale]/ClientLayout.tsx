"use client";
import React, { ReactNode } from "react";
import { App, Badge, ConfigProvider, Layout, Menu, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useTranslations } from "next-intl";
import { MENU_ITEMS } from "@/constants";
import { LogoWithBrand } from "@/components";
import { themeConfig } from "@/theme";
import { getAntdLocale, getDirectionFromLocale } from "@/helpers";
import { useLocale } from "use-intl";
import { TLOCALE } from "@/types";
import { useResponsive } from "antd-style";
import { AppFooter, Profile } from "@/sections";
import { usePathname, useRouter } from "@/i18n/routing";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import Image from "next/image";
import { AuthProvider, SettingsProvider } from "@/contexts";

type TClientLayout = {
  children: ReactNode;
};
export function ClientLayout({ children }: TClientLayout) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const pathname = usePathname(); // Get the current path

  const translate = useTranslations("Layout.Header.Items");
  const locale = useLocale() as TLOCALE;
  const { xxl } = useResponsive();
  const direction = getDirectionFromLocale(locale);
  const antdLocale = getAntdLocale(locale);
  const { push } = useRouter();

  // Determine the selected menu item based on the current pathname
  const selectedKeys = MENU_ITEMS.filter((item) => {
    if (item.path === "/") {
      // Home path: only match if the pathname is exactly "/"
      return pathname === "/";
    } else {
      // Other paths: match if the pathname starts with the item's path
      return pathname.startsWith(item.path);
    }
  }).map((item) => item.key);

  function handleMenuClick(path: string) {
    push(path);
  }
  return (
    <ConfigProvider
      componentSize={xxl ? "middle" : "small"}
      locale={antdLocale}
      direction={direction}
      theme={themeConfig}
    >
      <App style={{ minHeight: "100vh" }}>
        <AuthProvider>
          <SettingsProvider>
            <Layout style={{ minHeight: "100vh" }}>
              <Header
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                }}
              >
                <div className="demo-logo">
                  <LogoWithBrand />
                </div>
                <Menu
                  theme="light"
                  mode="horizontal"
                  selectedKeys={selectedKeys} // Use selectedKeys with a single key
                  items={MENU_ITEMS.map((item) => ({
                    key: item.key,
                    label: translate(item.key),
                    onClick: () => handleMenuClick(item.path),
                  }))}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    fontWeight: "bold",
                    backgroundColor: "transparent",
                  }}
                />
                <Profile />
              </Header>
              <Content>
                <div
                  style={{
                    background: colorBgContainer,
                    minHeight: 280,
                    borderRadius: borderRadiusLG,
                  }}
                >
                  {/* Wrap children in Suspense */}
                  {children}
                </div>
              </Content>
              {/* Footer shouldn't be appeared in authentication pages[login, register, reset password, verification, etc...]*/}
              {!pathname.includes("auth") && <AppFooter />}
            </Layout>
          </SettingsProvider>
        </AuthProvider>
      </App>
    </ConfigProvider>
  );
}
