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

    apps: {
      table: string;
      addApp: (topic: string) => string;
      deleteApp: (topic: string, number: number) => string;
    };
}