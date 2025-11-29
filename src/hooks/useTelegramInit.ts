import { useEffect } from 'react'
import WebApp from '@twa-dev/sdk'
import { initTelegramMock } from '../utils/telegramMock'

const themeParamToCSSVar: Record<string, string> = {
  bg_color: '--tg-bg',
  text_color: '--tg-text',
  hint_color: '--tg-hint',
  button_color: '--tg-button',
  button_text_color: '--tg-button-text',
}

export const useTelegramInit = () => {
  useEffect(() => {
    // Если Telegram WebApp не доступен, инициализируем мок для разработки
    if (!window.Telegram?.WebApp) {
      initTelegramMock()
    }

    const telegramApp = window.Telegram?.WebApp ?? WebApp
    if (!telegramApp) {
      return
    }

    telegramApp.ready()
    telegramApp.expand()

    const theme = telegramApp.themeParams ?? {}
    const root = document.documentElement
    Object.entries(theme).forEach(([key, value]) => {
      const mapped = themeParamToCSSVar[key]
      if (mapped) {
        root.style.setProperty(mapped, value)
      }
    })
  }, [])
}

