import { TPhone } from "@/types";

export function phoneNumberFormation(phone: TPhone) {
  return "+" + phone.countryCode + phone.areaCode + phone.phoneNumber;
}
