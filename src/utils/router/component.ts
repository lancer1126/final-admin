import { views } from "@/views";
import { RouteComponent } from "vue-router";

type Lazy<T> = () => Promise<T>;

interface ModuleComponent {
  default: RouteComponent;
}

export function getViewComp(routeKey: AuthRoute.LastDegreeRouteKey) {
  if (!views[routeKey]) {
    throw new Error(`路由“${routeKey}”没有对应的组件文件！`);
  }
  return setViewCompName(views[routeKey], routeKey);
}

function setViewCompName(comp: RouteComponent | Lazy<ModuleComponent>, name: string) {
  Object.assign(comp, { name });
  return comp;
}
