import { defineConfig, loadEnv } from "vite";
import { getSrcPath, getRootPath, setupVitePlugins, viteDefine, optimizeInclude } from "./build";

export default defineConfig(configEnv => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as unknown as ImportMetaEnv;
  const rootPath = getRootPath();
  const srcPath = getSrcPath();

  return {
    base: viteEnv.VITE_BASE_URL,
    resolve: {
      alias: {
        "@": srcPath,
        "~": rootPath
      }
    },
    define: viteDefine,
    plugins: setupVitePlugins(viteEnv),
    server: {
      host: "0.0.0.0",
      port: viteEnv.VITE_PORT,
      open: true
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/styles/scss/global.scss" as *;`
        }
      }
    },
    optimizeDeps: { include: optimizeInclude },
    build: {
      sourcemap: false,
      reportCompressedSize: false,
      commonjsOptions: {
        ignoreTryCatch: false
      }
    }
  };
});
