import { TLOCALE } from "@/types";

const Languages = {
  ar: "Arabic",
  en: "English (United States)",
};
export function getFullLocale(locale: TLOCALE) {
  return Languages[locale];
}
