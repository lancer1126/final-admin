import { defineConfig, loadEnv } from "vite";
import { setupVitePlugins } from "./build/plugin";
import { getSrcPath } from "./build";
import { include } from "./build/optimize";

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
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/styles/scss/global.scss" as *;`
        }
      }
    },
    server: {
      host: "0.0.0.0",
      port: viteEnv.VITE_PORT,
      open: true
    },
    optimizeDeps: { include },
    build: {
      sourcemap: false,
      reportCompressedSize: false
    }
  };
});
