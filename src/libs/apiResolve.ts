interface ApiPattern {
    [key: string]: any;

    baseUrl: string;
    version: (version: number) => string;

    host: {
      system: string;
      load: string;
      cpu: string;
    };
}

export const API: ApiPattern = {
    baseUrl:  "api",
    version: (version: number) => `v${version}`,
    host: {
      system: "host/system",
      load:   "host/load",
      cpu:    "host/load"
    }
  };

export const resolveApi = (path: any, url: string = '') => {
    const base = "/" + API.baseUrl + "/" + API.version(1);

    if (typeof path === "string") {
        return base + "/" + path;
    }

    for (const key in API) {
        const value = API[key];

        (typeof value === "object") ?
        url = resolveApi(value, url) :
        url += "/" + value;
    }
    
    return url;
};