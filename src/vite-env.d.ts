/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Absolute site URL, no trailing slash — see .env.example. */
  readonly PUBLIC_ENV__SITE_URL: string;
}

/** See the `publicImagesManifest` plugin in vite.config.ts. */
declare module "virtual:public-images" {
  export const menu: Set<string>;
  export const pages: Set<string>;
}
