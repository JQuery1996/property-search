// types/antd.d.ts
import "antd/es/theme/interface";

// Extend the AliasToken to include custom properties
declare module "antd/es/theme/interface" {
  export interface AliasToken {
    pinkLight: string;
    greyPink: string;
  }
}
