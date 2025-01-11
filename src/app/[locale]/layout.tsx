import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ReactNode } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { getDirectionFromLocale } from "@/helpers";
import { TLOCALE } from "@/types";
import { ClientLayout } from "./ClientLayout";

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

  return (
    <html lang={locale} dir={direction}>
      <body>
        <AntdRegistry>
          <NextIntlClientProvider messages={messages}>
            <ClientLayout>{children}</ClientLayout>
          </NextIntlClientProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
