import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ReactNode } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { getAntdLocale, getDirectionFromLocale } from "@/helpers";
import { TLOCALE } from "@/types";
import { ConfigProvider, App } from "antd";
import { ClientLayout } from "./ClientLayout";
import "./globals.css";
import { themeConfig } from "@/theme";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: TLOCALE };
}) {
  // Ensure that the incoming `locale` is valid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const direction = getDirectionFromLocale(locale);
  const antdLocale = getAntdLocale(locale);

  return (
    <html lang={locale} dir={direction}>
      <body>
        <AntdRegistry>
          <NextIntlClientProvider messages={messages}>
            <ConfigProvider
              locale={antdLocale}
              direction={direction}
              theme={themeConfig}
            >
              <App>
                <ClientLayout>{children}</ClientLayout>
              </App>
            </ConfigProvider>
          </NextIntlClientProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
