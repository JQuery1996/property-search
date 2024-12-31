import { colorTokens } from "./colors";
import { menuTheme } from "./menu";
import { buttonTheme } from "./button";
import { ThemeConfig } from "antd/es/config-provider/context";

export const themeConfig: ThemeConfig = {
  token: {
    ...colorTokens, // add custom tokens to token property
  },
  components: {
    ...menuTheme,
    ...buttonTheme,
  },
};
