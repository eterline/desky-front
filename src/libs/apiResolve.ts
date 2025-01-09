import { ExecStates, PVEData } from "../libs/pveService";

export const API = {
    baseUrl:  "/api",
    version: (version: number) => `v${version}`,

    check: "check",

    host: {
      system: "host/system",
      load:   "host/load",
      cpu:    "host/cpu" 
    },

    pve: {
      status: (session: number, host: string) => `pve/${session}/${host}/status`,
      devices: (session: number, host: string) => `pve/${session}/${host}/devices`,
      exec: (data: PVEData, cmd: ExecStates) => `pve/${data.session}/${data.host}/devices/${data.vmid}/${cmd}`
    },

    system: {
      status: "system/systemd/status",
      stats: "system/stats",
      tty: "system/tty"
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