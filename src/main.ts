import App from "./App.vue";
import { createApp } from "vue";
import { setupAssets } from "@/plugins";
import { setupRouter } from "@/router";
import { setupI18n } from "@/locales";
import { setupStore } from "@/store";
import AppLoading from "@/components/common/app-loading.vue";

async function setupApp() {
  // 初始化样式
  setupAssets();

  // 加载页
  const appLoading = createApp(AppLoading);
  appLoading.mount("#appLoading");

  // app启动
  const app = createApp(App);
  setupStore(app);
  await setupRouter(app);
  setupI18n(app);

  appLoading.unmount();
  app.mount("#app");

  return "final-admin startup successful!";
}

setupApp().then(r => {
  console.log(r);
});
