import { TLOCALE } from "@/types";
import enUS from "antd/locale/en_US";
import arEG from "antd/locale/ar_EG";

export function getAntdLocale(locale: TLOCALE) {
  const antdLocales = {
    ar: {
      ...arEG,
      Form: {
        ...arEG.Form,
        optional: "(إختياري)",
      },
    },
    en: enUS,
  };
  return antdLocales[locale];
}
