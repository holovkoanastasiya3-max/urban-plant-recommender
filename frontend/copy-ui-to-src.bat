@echo off
chcp 65001 >nul

echo 🌿 Копіювання UI компонентів у src/...
echo.

REM Копіюємо UI компоненти
if exist "components\ui" (
    echo 📂 Копіювання components\ui\ → src\components\ui\
    xcopy "components\ui" "src\components\ui\" /E /I /Y >nul
    echo ✅ UI компоненти скопійовано
) else (
    echo ❌ Папка components\ui\ не знайдена
)

REM Копіюємо figma компоненти
if exist "components\figma" (
    echo 📂 Копіювання components\figma\ → src\components\figma\
    xcopy "components\figma" "src\components\figma\" /E /I /Y >nul
    echo ✅ Figma компоненти скопійовано
) else (
    echo ❌ Папка components\figma\ не знайдена
)

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo ✨ Готово! Структура src/ завершена
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 📊 Перевірте структуру:
echo    src\
echo    ├── App.tsx
echo    ├── main.tsx
echo    ├── api.js
echo    ├── components\
echo    │   ├── *.tsx (7 файлів)
echo    │   ├── ui\ (46 файлів) ✅
echo    │   └── figma\ (1 файл) ✅
echo    └── styles\
echo        ├── globals.css
echo        └── slider.css
echo.
echo 🚀 Наступний крок: npm install ^&^& npm run dev
echo.
pause
