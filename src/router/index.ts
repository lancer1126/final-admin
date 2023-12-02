import { App } from "vue";
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { constantRoutes } from "@/router/routes";
import { transformAuthRouteToVueRoutes } from "@/utils";

const { VITE_HASH_ROUTE = "N", VITE_BASE_URL } = import.meta.env;

export const router = createRouter({
  history: VITE_HASH_ROUTE === "Y" ? createWebHashHistory(VITE_BASE_URL) : createWebHistory(VITE_BASE_URL),
  routes: transformAuthRouteToVueRoutes(constantRoutes)
});

export async function setupRouter(app: App) {
  app.use(router);
  await router.isReady();
}
