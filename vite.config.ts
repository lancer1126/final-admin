import { defineConfig, loadEnv } from "vite";
import { setupVitePlugins } from "./build/plugin";
import * as process from "process";
import { getSrcPath } from "./build";

export default defineConfig(configEnv => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as unknown as ImportMetaEnv;
  const srcPath = getSrcPath();

  return {
    base: viteEnv.VITE_BASE_URL,
    resolve: {
      alias: {
        "@": srcPath
      }
    },
    plugins: setupVitePlugins(viteEnv),
    server: {
      host: "0.0.0.0",
      port: viteEnv.VITE_PORT
    }
  };
});
