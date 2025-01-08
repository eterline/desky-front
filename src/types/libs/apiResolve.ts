interface ApiPattern {
    [key: string]: any;

    baseUrl: string;
    version: (version: number) => string;

    check: string

    host: {
      system: string;
      load: string;
      cpu: string;
    };

    pve: {
      status: (session: number, host: string) => string;
      devices: (session: number, host: string) => string;
      exec: (
        session: number, host: string, vmid: number, cmd: "start" | "stop" | "restart" | "resume" | "suspend"
      ) => string;
    };

    apps: {
      table: string;
      addApp: (topic: string) => string;
      deleteApp: (topic: string, number: number) => string;
    };
}