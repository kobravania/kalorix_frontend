# Kalorix Mini App (Frontend)

Telegram Mini App для учёта питания, расчёта калорий и ведения пищевого дневника. Фронтенд построен на React + Vite и использует Telegram WebApp SDK для авторизации.

## Функциональность

- Онбординг с выбором цели (похудение / поддержание / набор)
- Авторизация через initData и сохранение токена
- Главная страница с прогресс-тарелкой и быстрыми действиями
- Экран «Меню на день» с карточками приёмов пищи и запросом `/plan`
- Форма свободного ввода еды для эндпоинта `/log`
- Статистика на 7 дней (`/stats/summary`) и профиль (`/user`)

## Стек

- React 19 + TypeScript + Vite
- Tailwind CSS, кастомные компоненты
- React Router 7, React Query 5
- Framer Motion (готов к использованию для анимаций)
- Vitest + Testing Library + MSW-моки

## Скрипты

```bash
npm install        # зависимости
npm run dev        # локальный сервер
npm run build      # production-сборка
npm run preview    # предпросмотр
npm run lint       # eslint
npm run test       # vitest (однократный прогон)
npm run test:watch # vitest в watch-режиме
```

## Переменные окружения

```
VITE_API_BASE_URL=https://api.kalorix.app
VITE_USE_API_MOCKS=true          # оставить true до подключения реального бэкенда
VITE_TELEGRAM_BOT=KalorixBot
```

При `VITE_USE_API_MOCKS=true` вся работа с API идёт через мок-данные (`src/utils/mockData.ts`), что позволяет верстать и тестировать UI в изоляции.

## Архитектура `src/`

- `api/` — тонкие обёртки над REST-эндпоинтами (auth, user, plan, log, stats)
- `context/` — `AuthContext` с токеном, профилем и методами `authenticate/logout`
- `hooks/` — React Query-хуки и интеграция с Telegram (`useTelegramInit`)
- `components/` — UI-библиотека: лейауты, прогресс-тарелка, карточки меню
- `pages/` — экраны приложения (Onboarding, Home, Menu, AddFood, Stats, Profile)
- `providers/` — сборка глобальных провайдеров (Auth + QueryClient)
- `styles/` — Tailwind + глобальные стили под тему Telegram
- `utils/` — форматтеры, env-константы и мок-данные

## Тестирование

Vitest настроен на jsdom + Testing Library. Покрыто:

- Авторизация / экран онбординга
- Отображение меню (данные из кэша React Query)
- Добавление еды (вызов `/log`)
- Компонент прогресс-тарелки

Запуск: `npm run test`.

## Дальнейшие шаги

1. Отключить мок-режим и подключить реальные эндпоинты.
2. Добавить Framer Motion-анимации на переходы страниц и карточки.
3. Расширить профиль (редактирование параметров, подписка).
4. Настроить деплой в Telegram Mini Apps (например, через Vercel).

