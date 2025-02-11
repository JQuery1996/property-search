import { TLOCALE } from "@/types";
import enUS from "antd/locale/en_US";
import arEG from "antd/locale/ar_EG";
import ruRU from "antd/locale/ru_RU";
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
    ru: {
      ...ruRU,
      Form: {
        ...ruRU.Form,
        optional: "(необязательно)",
      },
      Empty: {
        ...ruRU.Empty,
        description: "Нет данных",
      },
    } as Locale,
    cn: {
      ...zhCN,
      Form: {
        ...zhCN.Form,
        optional: "(可选)",
      },
      Empty: {
        ...zhCN.Empty,
        description: "没有数据",
      },
    } as Locale,
  };
  return antdLocales[locale];
}
