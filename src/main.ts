import App from "./App.vue";
import { createApp } from "vue";
import { setupAssets } from "@/plugins";
import { setupRouter } from "@/router";
import { setupI18n } from "@/locales";
import { setupStore } from "@/store";
import { setupIcon } from "@/components/ReIcon";
import { initGlobalSettings } from "@/config";

// 初始化样式
setupAssets();

const app = createApp(App);

initGlobalSettings(app).then(async () => {
  setupIcon(app);
  setupStore(app);
  await setupRouter(app);
  setupI18n(app);
  app.mount("#app");
});
