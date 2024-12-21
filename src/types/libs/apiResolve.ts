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