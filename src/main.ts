import { createApp } from "vue";
import App from "./App.vue";
import { setupAssets } from "@/plugins";
import { setupRouter } from "@/router";
import { setupI18n } from "@/locales";
import { setupStore } from "@/store";

setupAssets();

const app = createApp(App);
setupStore(app);
setupRouter(app);
setupI18n(app);

app.mount("#app");
