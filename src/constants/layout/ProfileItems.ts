import type { MenuProps } from "antd";

export const PROFILE_ITEMS: NonNullable<MenuProps["items"]> = [
  {
    key: "1",
    label: "profile",
    icon: "/images/icons/user-edit.svg",
  },
  {
    key: "2",
    label: "country",
    icon: "/images/icons/city.svg",
  },
  {
    key: "3",
    label: "notificationSettings",
    icon: "/images/icons/notification.svg",
  },
  {
    key: "4",
    label: "savedItems",
    icon: "/images/icons/save-item.svg",
  },
  {
    key: "5",
    label: "measurementSystem",
    icon: "/images/icons/measurement.svg",
    children: [
      {
        key: "5-1",
        label: "imperialMeasure",
        icon: "/images/icons/imperial.svg",
      },
      {
        key: "5-2",
        label: "metricMeasure",
        icon: "/images/icons/metric.svg",
      },
    ],
  },
  {
    key: "6",
    label: "language",
    icon: "/images/icons/language.svg",
  },
  {
    key: "7",
    label: "logout",
    icon: "/images/icons/logout.svg",
    danger: true,
  },
];
