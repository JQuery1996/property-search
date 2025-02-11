import { TLOCALE } from "@/types";

const Languages = {
  ar: "Arabic",
  en: "English (United States)",
  ru: "Russian",
  cn: "Chinese",
};
export function getFullLocale(locale: TLOCALE) {
  return Languages[locale];
}
