/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EXTRANET_CSH_API_URL: string,
  readonly VITE_EXTRANET_CSH_PARISH_URL: string,
  readonly VITE_EXTRANET_CSH_INSTAGRAM_URL: string,
  readonly VITE_EXTRANET_CSH_YOUTUBE_URL: string,
  readonly VITE_EXTRANET_CSH_FACEBOOK_URL: string,
  readonly VITE_EXTRANET_CSH_LINKEDIN_URL: string,
  readonly VITE_EXTRANET_CSH_SUPPORT_EMAIL: string,
  readonly VITE_EXTRANET_CSH_WEBMASTER_EMAIL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}