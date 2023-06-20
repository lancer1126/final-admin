interface AppInfo {
  name: string;
  title: string;
  desc: string;
}

export function getAppInfo(): AppInfo {
  const { VITE_APP_NAME: name, VITE_APP_TITLE: title, VITE_APP_DESC: desc } = import.meta.env;
  return {
    name,
    title,
    desc
  };
}
