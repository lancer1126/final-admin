import { RouteRecordRaw } from "vue-router";
import { getViewComp } from "@/utils";

type ComponentAction = Record<AuthRoute.RouteComponentType, () => void>;

/**
 * 将自定义的权限路由转换成Vue路由
 * @param routes
 */
export function transformAuthRouteToVueRoutes(routes: AuthRoute.Route[]) {
  return routes.map(route => authRouteToVueRoute(route)).flat(1);
}

export function authRouteToVueRoute(item: AuthRoute.Route) {
  const resultRoute: RouteRecordRaw[] = [];
  const itemRoute = { ...item } as any as RouteRecordRaw;

  // 动态path
  if (hasDynamicPath(item)) {
    Object.assign(itemRoute, { path: item.meta.dynamicPath });
  }

  // 路由组件
  if (hasComponent(item)) {
    const action: ComponentAction = {
      basic() {},
      blank() {},
      multi() {},
      self() {
        itemRoute.component = getViewComp(item.name as AuthRoute.LastDegreeRouteKey);
      }
    };
    try {
      if (item.component) {
        action[item.component]();
      } else {
        window.console.error("路由组件解析结果: ", item);
      }
    } catch {
      window.console.error("路由组件解析失败: ", item);
    }
  }

  resultRoute.push(itemRoute);
  return resultRoute;
}

/**
 * 是否有动态路由
 */
function hasDynamicPath(item: AuthRoute.Route) {
  return Boolean(item.meta.dynamicPath);
}

/**
 * 是否有路由组件
 */
function hasComponent(item: AuthRoute.Route) {
  return Boolean(item.component);
}
