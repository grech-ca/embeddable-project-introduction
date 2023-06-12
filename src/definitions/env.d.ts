/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_GH_AUTHOR: string;
  readonly VITE_APP_GH_PROJECT: string;
  readonly VITE_APP_GH_TOKEN: string;
  readonly VITE_APP_GH_REPOSITORY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
