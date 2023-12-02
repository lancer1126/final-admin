import type { App } from "vue";
import { createI18n } from "vue-i18n";
import type { TranslateOptions } from "vue-i18n";
import messages from "./lang";

const i18n = createI18n({
  locale: "zh-CN",
  fallbackLocale: "en",
  legacy: false,
  messages
});

export function setupI18n(app: App) {
  app.use(i18n);
}

interface T {
  (key: I18nType.I18nKey): string;
  (key: I18nType.I18nKey, plural: number, options?: TranslateOptions<I18nType.LangType>): string;
  (key: I18nType.I18nKey, defaultMsg: string, options?: TranslateOptions<I18nType.I18nKey>): string;
  (key: I18nType.I18nKey, list: unknown[], options?: TranslateOptions<I18nType.I18nKey>): string;
  (key: I18nType.I18nKey, list: unknown[], plural: number): string;
  (key: I18nType.I18nKey, list: unknown[], defaultMsg: string): string;
  (key: I18nType.I18nKey, named: Record<string, unknown>, options?: TranslateOptions<I18nType.LangType>): string;
  (key: I18nType.I18nKey, named: Record<string, unknown>, plural: number): string;
  (key: I18nType.I18nKey, named: Record<string, unknown>, defaultMsg: string): string;
}

export const $t = i18n.global.t as T;
