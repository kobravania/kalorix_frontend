import { useEffect } from 'react'
import WebApp from '@twa-dev/sdk'

const themeParamToCSSVar: Record<string, string> = {
  bg_color: '--tg-bg',
  text_color: '--tg-text',
  hint_color: '--tg-hint',
  button_color: '--tg-button',
  button_text_color: '--tg-button-text',
}

export const useTelegramInit = () => {
  useEffect(() => {
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

