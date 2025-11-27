export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'https://api.kalorix.app'

export const USE_API_MOCKS =
  (import.meta.env.VITE_USE_API_MOCKS ?? 'true').toLowerCase() === 'true'

export const TELEGRAM_BOT_NAME =
  import.meta.env.VITE_TELEGRAM_BOT ?? 'KalorixAssistantBot'

