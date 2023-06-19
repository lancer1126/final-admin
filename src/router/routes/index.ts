export const ROOT_ROUTE: AuthRoute.Route = {
  name: "root",
  path: "/",
  redirect: import.meta.env.VITE_ROUTE_HOME_PATH,
  meta: {
    title: "Root"
  }
};

export const constantRoutes: AuthRoute.Route[] = [ROOT_ROUTE];
