declare global {
  interface ImportMetaEnv {
    VITE_API_URL: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export const env = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
};
