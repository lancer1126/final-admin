import zhCN from "./zh-cn";
import en from "./en";

const locales = {
  "zh-CN": zhCN,
  en
};

export type LocalKey = keyof typeof locales;
export default locales;
