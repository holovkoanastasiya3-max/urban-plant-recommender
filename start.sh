#!/bin/bash

# Кольори для виводу
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Функція для виводу повідомлень
info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

success() {
    echo -e "${GREEN}✓${NC} $1"
}

warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

error() {
    echo -e "${RED}✗${NC} $1"
}

# Функція для перевірки порту
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        return 0  # Порт зайнятий
    else
        return 1  # Порт вільний
    fi
}

# Функція для очищення при завершенні
cleanup() {
    info "Очищення процесів..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Встановлення обробника сигналів
trap cleanup SIGINT SIGTERM

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  🚀 Запуск Urban Plant Recommender${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Перевірка портів
info "Перевірка портів..."
if check_port 8000; then
    warning "Порт 8000 зайнятий. Спробуємо зупинити процес..."
    lsof -ti:8000 | xargs kill -9 2>/dev/null
    sleep 1
fi

if check_port 5173; then
    warning "Порт 5173 зайнятий. Спробуємо зупинити процес..."
    lsof -ti:5173 | xargs kill -9 2>/dev/null
    sleep 1
fi

# Перевірка віртуального середовища
info "Перевірка віртуального середовища..."
if [ ! -d "venv" ]; then
    error "Віртуальне середовище не знайдено!"
    echo "Створіть venv: python3 -m venv venv"
    exit 1
fi

# Активація venv
info "Активація віртуального середовища..."
source venv/bin/activate

# Очищення кешу Vite
info "Очищення кешу Vite..."
cd frontend
rm -rf node_modules/.vite
rm -rf dist
success "Кеш очищено"
cd ..

# Перевірка залежностей frontend
if [ ! -d "frontend/node_modules" ]; then
    warning "node_modules не знайдено. Встановлюємо залежності..."
    cd frontend
    npm install
    cd ..
fi

# Запуск бекенду
info "Запуск бекенду на http://127.0.0.1:8000..."
cd backend
uvicorn main:app --reload --host 127.0.0.1 --port 8000 > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
cd ..
success "Бекенд запущено (PID: $BACKEND_PID)"

# Невелика затримка для запуску бекенду
sleep 2

# Запуск фронтенду
info "Запуск фронтенду на http://localhost:5173..."
cd frontend
npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..
success "Фронтенд запущено (PID: $FRONTEND_PID)"

# Створення папки для логів якщо не існує
mkdir -p logs

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  ✅ Проект запущено!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}📍 Бекенд:${NC}  http://127.0.0.1:8000"
echo -e "${BLUE}📍 API Docs:${NC} http://127.0.0.1:8000/docs"
echo -e "${BLUE}📍 Фронтенд:${NC} http://localhost:5173"
echo ""
echo -e "${YELLOW}📋 Логи:${NC}"
echo -e "   Бекенд:  tail -f logs/backend.log"
echo -e "   Фронтенд: tail -f logs/frontend.log"
echo ""
echo -e "${YELLOW}⚠️  Для зупинки натисніть Ctrl+C${NC}"
echo ""

# Очікування завершення
wait
