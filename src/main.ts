import { createApp } from "vue";
import App from "./App.vue";
import { setupAssets } from "@/plugins";
import { setupRouter } from "@/router";
import { setupI18n } from "@/locales";
import { setupStore } from "@/store";
import AppLoading from "@/components/common/app-loading.vue";

setupAssets();

const appLoading = createApp(AppLoading);
appLoading.mount("#appLoading");

const app = createApp(App);
setupStore(app);
setupRouter(app);
setupI18n(app);

appLoading.unmount();

app.mount("#app");
