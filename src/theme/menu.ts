import { colors } from "./colors";
import { ComponentsConfig } from "@/types";

export const menuTheme: ComponentsConfig = {
  Menu: {
    colorPrimary: colors.pink.dark, // Primary color for hover/active states
    itemSelectedBg: colors.pink.light, // Background color for selected item
    itemActiveBg: colors.pink.light, // Background color for active item
    itemHoverBg: colors.pink.lighter, // Background color for hover
    itemHoverColor: colors.pink.dark,
    itemSelectedColor: colors.pink.darker, // Text color for selected item
  },
};
