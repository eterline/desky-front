export const API: ApiPattern = {
    baseUrl:  "/api",
    version: (version: number) => `v${version}`,

    check: "check",

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
  }

export const resolveApi = (path: string): string => {
    return `${ API.baseUrl }/${ API.version(1) }/${ path }`;
};