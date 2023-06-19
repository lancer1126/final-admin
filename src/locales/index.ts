import { createI18n } from "vue-i18n";
import messages from "./lang";
import { App } from "vue";

const i18n = createI18n({
  locale: "zh-CN",
  fallbackLocale: "en",
  legacy: false,
  messages
});

export function setupI18n(app: App) {
  app.use(i18n);
}

export function t(key: string) {
  return i18n.global.t(key);
}
