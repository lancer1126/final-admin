declare namespace I18nType {
  type LangType = "en" | "zh-CN";

  type Schema = {
    system: {
      title: string;
    };
    common: {
      add: string;
      addSuccess: string;
      edit: string;
      editSuccess: string;
      delete: string;
      deleteSuccess: string;
      batchDelete: string;
      confirm: string;
      cancel: string;
      pleaseCheckValue: string;
      action: string;
    };
    routes: {
      dashboard: {
        _value: string;
        analysis: string;
        workbench: string;
      };
      document: {
        _value: string;
        vue: string;
        vite: string;
        naive: string;
        project: string;
        'project-link': string;
      };
      component: {
        _value: string;
        button: string;
        card: string;
        table: string;
      };
      plugin: {
        _value: string;
        charts: {
          _value: string;
          antv: string;
          echarts: string;
        };
        copy: string;
        editor: {
          _value: string;
          markdown: string;
          quill: string;
        };
        icon: string;
        map: string;
        print: string;
        swiper: string;
        video: string;
      };
      'auth-demo': {
        _value: string;
        permission: string;
        super: string;
      };
      function: {
        _value: string;
        tab: string;
      };
      exception: {
        _value: string;
        403: string;
        404: string;
        500: string;
      };
      'multi-menu': {
        _value: string;
        first: {
          _value: string;
          second: string;
          'second-new': {
            _value: string;
            third: string;
          };
        };
      };
      management: {
        _value: string;
        auth: string;
        role: string;
        route: string;
        user: string;
      };
      about: string;
    };
  };

  type GetI18nKey<T extends Record<string, unknown>, K extends keyof T = keyof T> = K extends string
    ? T[K] extends Record<string, unknown>
      ? `${K}.${GetI18nKey<T[K]>}`
      : K
    : never;

  type I18nKey = GetI18nKey<Schema>;
}