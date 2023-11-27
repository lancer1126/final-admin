import { App } from "vue";
import axios from "axios";

let setting: object = {};
const { VITE_PUBLIC_PATH } = import.meta.env;

const applySetting = (set?: unknown) => {
  setting = Object.assign(setting, set);
};

const getSettings = (key?: string): GlobalSetting => {
  if (typeof key === "string") {
    const arr = key.split(".");
    if (arr && arr.length) {
      let data = setting;
      arr.forEach(e => {
        if (data && typeof data[e] !== "undefined") {
          data = data[e];
        } else {
          data = null;
        }
      });
      return data;
    }
  }
  return setting;
};

export const initGlobalSettings = async (app: App): Promise<undefined> => {
  app.config.globalProperties.$settings = getSettings();
  return axios({
    method: "get",
    url: `${VITE_PUBLIC_PATH}settings.json`
  })
    .then(({ data: setting }) => {
      let $settings = app.config.globalProperties.$settings;
      if (app && $settings && typeof setting === "object") {
        $settings = Object.assign($settings, setting);
        app.config.globalProperties.$settings = $settings;
        applySetting($settings);
      }
      return $settings;
    })
    .catch(() => {
      throw "请在public文件夹下添加settings.json文件";
    });
};

export { getSettings, applySetting };
