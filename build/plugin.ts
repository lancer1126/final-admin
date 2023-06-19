import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import unocss from "@unocss/vite";
import visualizer from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
import Icons from "unplugin-icons/vite";
import Components from "unplugin-vue-components/vite";
import IconResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";
import { PluginOption } from "vite";
import { getSrcPath } from "./index";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export function setupVitePlugins(viteEnv: ImportMetaEnv): (PluginOption | PluginOption[])[] {
  return [vue(), vueJsx(), unocss(), ...unplugins(viteEnv), checkVisualizer(viteEnv), checkCompress(viteEnv)];
}

export function unplugins(viteEnv: ImportMetaEnv) {
  const { VITE_ICON_PREFIX, VITE_ICON_LOCAL_PREFIX } = viteEnv;
  const srcPath = getSrcPath();
  const localIconPath = `${srcPath}/assets/svg-icon`;
  const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${VITE_ICON_PREFIX}-`, "");

  return [
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: "src/types/auto-imports.d.ts"
    }),
    Icons({
      compiler: "vue3",
      scale: 1,
      defaultClass: "inline-block",
      customCollections: {
        [collectionName]: FileSystemIconLoader(localIconPath, svg =>
          svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')
        )
      }
    }),
    Components({
      dts: "src/types/components.d.ts",
      types: [
        {
          from: "vue-router",
          names: ["RouterLink", "RouterView"]
        }
      ],
      resolvers: [
        ElementPlusResolver(),
        IconResolver({ customCollections: [collectionName], prefix: VITE_ICON_PREFIX })
      ]
    }),
    createSvgIconsPlugin({
      iconDirs: [localIconPath],
      symbolId: `${VITE_ICON_LOCAL_PREFIX}-[dir]-[name]`,
      inject: "body-last",
      customDomId: "__SVG_ICON_LOCAL__"
    })
  ];
}

export function checkVisualizer(viteEnv: ImportMetaEnv) {
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
