import { TLOCALE } from "@/types";
import enUS from "antd/locale/en_US";
import arEG from "antd/locale/ar_EG";
import ru from "antd/locale/ru_RU";
import zhCN from "antd/locale/zh_CN";
import { Locale } from "antd/es/locale";

export function getAntdLocale(locale: TLOCALE) {
  const antdLocales = {
    ar: {
      ...arEG,
      Form: {
        ...arEG.Form,
        optional: "(إختياري)",
      },
      Empty: {
        ...arEG.Empty,
        description: "لا توجد بيانات",
      },
    } as Locale,
    en: enUS,
    ru: ru,
    cn: zhCN,
  };
  return antdLocales[locale];
}
