#!/bin/bash

# Скрипт для запуска dev-сервера с доступом для мобильных устройств

echo "🚀 Запуск Kalorix для мобильного тестирования..."
echo ""

# Проверяем, запущен ли уже сервер
if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Порт 5173 уже занят. Останавливаю старый процесс..."
    lsof -ti:5173 | xargs kill -9 2>/dev/null
    sleep 2
fi

# Запускаем Vite dev сервер в фоне
echo "📱 Запускаю Vite dev сервер на порту 5173..."
export PATH="/opt/homebrew/opt/node@20/bin:$PATH"
npm run dev &
VITE_PID=$!

sleep 3

# Получаем локальный IP
LOCAL_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | head -1 | awk '{print $2}')

echo ""
echo "✅ Сервер запущен!"
echo ""
echo "📍 Локальный доступ:"
echo "   http://localhost:5173"
echo "   http://${LOCAL_IP}:5173"
echo ""
echo "📱 Для Xcode Simulator:"
echo "   1. Открой Xcode Simulator (Cmd+Space → 'Simulator')"
echo "   2. Открой Safari в симуляторе"
echo "   3. Перейди на: http://${LOCAL_IP}:5173"
echo ""
echo "🔗 Для Telegram Web App (через ngrok HTTPS):"
echo "   Запусти в отдельном терминале:"
echo "   ngrok http 5173"
echo "   Затем используй HTTPS URL из ngrok"
echo ""
echo "Для остановки нажми Ctrl+C"

wait $VITE_PID

