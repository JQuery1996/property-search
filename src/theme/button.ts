import { colors } from "./colors";
import { ComponentsConfig } from "@/types";

export const buttonTheme: ComponentsConfig = {
  Button: {
    colorPrimary: colors.pink.dark, // Primary color for buttons
    defaultBg: colors.grey.light,
    defaultHoverBg: colors.grey.dark,
    defaultColor: "white",
    defaultBorderColor: colors.grey.light,
    defaultHoverColor: "white",
    defaultHoverBorderColor: colors.grey.dark,
    defaultActiveBg: colors.grey.dark,
    defaultActiveBorderColor: colors.grey.dark,
  },
};
