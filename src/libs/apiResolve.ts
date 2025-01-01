export const API: ApiPattern = {
    baseUrl:  "http://localhost:3000/api",
    version: (version: number) => `v${version}`,

    host: {
      system: "host/system",
      load:   "host/load",
      cpu:    "host/cpu" 
    },

    apps: {
      table: "apps/table",
      addApp: (topic: string) => `apps/table/${topic}`,
      deleteApp: (topic: string, number: number) => `apps/table/${topic}/${number}`
    }

    // proxmox: {
    //   nodes: "apps/table",
    //   devices: (topic: string) => `apps/table/${topic}`,

    //   startDevice: (topic: string, number: number) => `apps/table/${topic}/${number}`,
    //   shutdownDevice: (topic: string, number: number) => `apps/table/${topic}/${number}`,
    //   suspendDevice: (topic: string, number: number) => `apps/table/${topic}/${number}`,
    //   resumeDevice: (topic: string, number: number) => `apps/table/${topic}/${number}`,
    // }
  }

export const resolveApi = (path: any, url: string = '') => {
    const base = API.baseUrl + "/" + API.version(1);

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