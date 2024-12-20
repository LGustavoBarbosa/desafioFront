/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENAI_API_KEY: string;
}
export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
