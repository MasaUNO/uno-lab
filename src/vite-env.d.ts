/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TINA_CLIENT_ID: string
  readonly VITE_TINA_TOKEN: string
  readonly VITE_GITHUB_BRANCH: string
  readonly VITE_VERCEL_GIT_COMMIT_REF: string
  readonly VITE_HEAD: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
