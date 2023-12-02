import type { RouteComponent } from "vue-router";

export const views:
  Record<PageRoute.LastDegreeRouteKey, RouteComponent | (() => Promise<{ default: RouteComponent }>)> = {
  login: () => import("./_builtin/login/index.vue")
};
