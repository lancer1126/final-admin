import { App } from "vue";
import { createPinia } from "pinia";
import { resetSetupStore } from "@/store/plugins";

export function setupStore(app: App) {
  const store = createPinia();
  store.use(resetSetupStore);

  app.use(store);
}
