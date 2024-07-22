/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EXTRANET_CSH_API_URL: string,
  readonly VITE_EXTRANET_PARISH_URL: string,
  readonly VITE_EXTRANET_INSTAGRAM_URL: string,
  readonly VITE_EXTRANET_YOUTUBE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}