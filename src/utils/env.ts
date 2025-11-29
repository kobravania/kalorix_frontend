export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000'

export const USE_API_MOCKS =
  (import.meta.env.VITE_USE_API_MOCKS ?? 'true').toLowerCase() === 'true'

export const TELEGRAM_BOT_NAME =
  import.meta.env.VITE_TELEGRAM_BOT ?? 'KalorixAssistantBot'

