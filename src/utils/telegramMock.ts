/**
 * Мок для Telegram WebApp API для тестирования в браузере
 * Используется когда приложение запущено не в Telegram
 */

export const initTelegramMock = () => {
  if (typeof window === 'undefined' || window.Telegram?.WebApp) {
    return // Telegram уже инициализирован или это SSR
  }

  // Эмулируем Telegram WebApp объект с реалистичными данными
  const mockUser = {
    id: 123456789,
    first_name: 'Иван',
    last_name: 'Петров',
    username: 'ivan_petrov',
    language_code: 'ru',
  }
  const authDate = Math.floor(Date.now() / 1000)
  const userParam = encodeURIComponent(JSON.stringify(mockUser))
  const mockHash = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6'
  const mockInitData = `user=${userParam}&auth_date=${authDate}&hash=${mockHash}`

  const mockWebApp = {
    initData: mockInitData,
    initDataUnsafe: {
      user: mockUser,
      auth_date: authDate,
      hash: mockHash,
    },
    version: '7.0',
    platform: 'web',
    colorScheme: 'light',
    themeParams: {
      bg_color: '#ffffff',
      text_color: '#000000',
      hint_color: '#999999',
      link_color: '#2481cc',
      button_color: '#2481cc',
      button_text_color: '#ffffff',
    },
    isExpanded: true,
    viewportHeight: window.innerHeight,
    viewportStableHeight: window.innerHeight,
    headerColor: '#ffffff',
    backgroundColor: '#ffffff',
    isClosingConfirmationEnabled: false,
    BackButton: {
      isVisible: false,
      onClick: () => {},
      offClick: () => {},
      show: () => {},
      hide: () => {},
    },
    MainButton: {
      text: '',
      color: '#2481cc',
      textColor: '#ffffff',
      isVisible: false,
      isActive: true,
      isProgressVisible: false,
      setText: () => {},
      onClick: () => {},
      offClick: () => {},
      show: () => {},
      hide: () => {},
      enable: () => {},
      disable: () => {},
      showProgress: () => {},
      hideProgress: () => {},
      setParams: () => {},
    },
    HapticFeedback: {
      impactOccurred: () => {},
      notificationOccurred: () => {},
      selectionChanged: () => {},
    },
    CloudStorage: {},
    BiometricManager: {},
    ready: () => {},
    expand: () => {},
    close: () => {},
    sendData: () => {},
    openLink: () => {},
    openTelegramLink: () => {},
    openInvoice: () => {},
    showPopup: () => {},
    showAlert: () => {},
    showConfirm: () => {},
    showScanQrPopup: () => {},
    closeScanQrPopup: () => {},
    readTextFromClipboard: () => Promise.resolve(''),
    requestWriteAccess: () => Promise.resolve(true),
    requestContact: () => Promise.resolve(true),
    onEvent: () => {},
    offEvent: () => {},
    postEvent: () => {},
    enableClosingConfirmation: () => {},
    disableClosingConfirmation: () => {},
    enableVerticalSwipes: () => {},
    disableVerticalSwipes: () => {},
    setHeaderColor: () => {},
    setBackgroundColor: () => {},
  }

  // Устанавливаем мок в window
  ;(window as any).Telegram = {
    WebApp: mockWebApp,
  }

  console.log('📱 Telegram WebApp мок инициализирован для разработки')
}

