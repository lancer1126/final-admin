import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import { PluginOption } from "vite";
import { resolve } from "path";
import visualizer from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
import svgLoader from "vite-svg-loader";

export function setupVitePlugins(viteEnv: ImportMetaEnv): (PluginOption | PluginOption[])[] {
  return [vue(), vueJsx(), svgLoader(), buildI18n(), checkVisualizer(viteEnv), checkCompress(viteEnv)];
}

export function buildI18n() {
  return vueI18nPlugin({
    runtimeOnly: true,
    compositionOnly: true,
    include: [resolve("locales/**")]
  });
}

export function checkVisualizer(viteEnv: ImportMetaEnv): PluginOption {
  return viteEnv.VITE_VISUALIZER === "Y"
    ? visualizer({
        gzipSize: true,
        brotliSize: true,
        open: true
      })
    : null;
}

export function checkCompress(viteEnv: ImportMetaEnv) {
  if (viteEnv.VITE_COMPRESS === "Y") {
    const { VITE_COMPRESS_TYPE = "gzip" } = viteEnv;
    return viteCompression({ algorithm: VITE_COMPRESS_TYPE });
  } else {
    return null;
  }
}
