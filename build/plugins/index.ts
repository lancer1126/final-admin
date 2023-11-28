import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import progress from "vite-plugin-progress";
import unocss from "@unocss/vite";
import { PluginOption } from "vite";
import VueDevTools from "vite-plugin-vue-devtools";
import compress from "./compress";
import unplugins from "./unplugin";

export function setupVitePlugins(viteEnv: ImportMetaEnv): (PluginOption | PluginOption[])[] {
  const plugins = [vue(), vueJsx(), VueDevTools(), ...unplugins(viteEnv), unocss(), progress()];

  if (viteEnv.VITE_COMPRESS === "Y") {
    plugins.push(compress());
  }
  return plugins;
}
