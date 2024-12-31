import { colors } from "./colors";
import { ComponentsConfig } from "@/types";

export const menuTheme: ComponentsConfig = {
  Menu: {
    colorPrimary: colors.pink.dark, // Primary color for hover/active states
    colorItemBgSelected: colors.pink.light, // Background color for selected item
    colorItemBgActive: colors.pink.light, // Background color for active item
    colorItemBgHover: colors.pink.lighter, // Background color for hover
    colorItemTextHover: colors.pink.dark, // Text color for hover
    colorItemTextSelected: colors.pink.darker, // Text color for selected item
  },
};
