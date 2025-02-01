/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_VIATOR_API_KEY_SANDBOX: string
    readonly VITE_VIATOR_API_KEY_PROD: string
    // No necesitamos declarar MODE y DEV aquí ya que vienen de Vite
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }