import { TLOCALE } from "@/types";
import { RTL_LOCALES } from "@/constants";

export function getDirectionFromLocale(locale: TLOCALE) {
  return RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
}
