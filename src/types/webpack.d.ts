declare function requireContext(
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp
  ): __WebpackModuleApi.RequireContext;
  
  declare namespace NodeJS {
    interface Require {
      context: typeof requireContext;
    }
  }