import { AliasToken } from "antd/es/theme/interface";

export const colors = {
  pink: {
    darker: "#210913",
    dark: "#E54F8E",
    main: "#ED82AF",
    light: "#FFDCEB",
    lighter: "#FDF2F7",
  },
  white: {
    main: "#fff",
  },
  greyPink: {
    main: "#3E3238",
  },
  grey: {
    light: "#818181",
    main: "#8C8A8B",
    dark: "#4D4D4D",
  },
};

// Convert custom colors into an Ant Design-compatible token structure
export const colorTokens: Partial<AliasToken> = {
  colorPrimary: colors.pink.dark, // Use dark pink as the primary color
  colorBgLayout: colors.white.main, // Use white for background layout
  colorBgContainer: colors.white.main, // Use white for containers
  colorText: colors.pink.darker, // Use light grey for text
  colorTextSecondary: colors.grey.light, // Use grey-pink for secondary text
  colorTextPlaceholder: colors.grey.main,
  pinkLight: colors.pink.light,
  pinkLighter: colors.pink.lighter,
  greyPink: colors.greyPink.main,
  greyMain: colors.grey.main,
};
