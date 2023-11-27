import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import svgLoader from "vite-svg-loader";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
import themePreprocessorPlugin from "@pureadmin/theme";
import { genScssMultipleScopeVars } from "../src/layout/theme";

function setupVueI18n() {
  return VueI18nPlugin({
    runtimeOnly: true,
    compositionOnly: true,
    include: [resolve("locales/**")]
  });
}

function setupThemes() {
  return themePreprocessorPlugin({
    scss: {
      multipleScopeVars: genScssMultipleScopeVars(),
      extract: true
    }
  });
}

function unplugins() {
  return [
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: "src/types/auto-imports.d.ts"
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: "src/types/components.d.ts"
    })
  ];
}

export function setupVitePlugins() {
  return [vue(), vueJsx(), svgLoader(), setupVueI18n(), setupThemes(), ...unplugins()];
}
