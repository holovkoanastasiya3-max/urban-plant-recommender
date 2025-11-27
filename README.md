# Urban Plant Recommender

Система підбору рослин для міського озеленення в умовах війни. Алгоритмічна система, яка допомагає обирати рослини на основі екологічних параметрів, умов ґрунту та критеріїв стійкості до стресових факторів.

## Ціль проекту

Проект розроблено для підтримки відновлення зелених зон у містах після військових дій. Система враховує:

- Морозостійкість рослин
- Посухостійкість
- Тип ґрунту та його характеристики
- Світлолюбивість
- Швидкість росту та відновлення
- Підтримку біорізноманіття
- Стійкість до забруднень та порушення ґрунту

Система надає персоналізовані рекомендації з переліком відповідних видів рослин на основі науково обґрунтованих критеріїв.

## Структура проекту

```
urban-plant-recommender/
├── backend/                 # Backend сервер (FastAPI)
│   ├── data/               # JSON файли з даними про рослини
│   ├── db/                 # База даних SQLite та схема
│   ├── src/
│   │   ├── importer/       # Модуль імпорту даних
│   │   ├── models/         # Pydantic моделі запитів
│   │   ├── recommender/    # Алгоритм рекомендацій
│   │   └── seed_demo_data.py
│   ├── main.py            # Точка входу FastAPI
│   └── requirements.txt     # Python залежності
│
├── frontend/               # Frontend додаток (React + TypeScript)
│   ├── src/
│   │   ├── adapters/       # Адаптери для перетворення даних
│   │   ├── api.ts          # API клієнт
│   │   ├── components/     # React компоненти
│   │   ├── styles/         # Глобальні стилі
│   │   └── App.tsx         # Головний компонент
│   ├── package.json        # Node.js залежності
│   └── vite.config.ts      # Конфігурація Vite
│
├── logs/                   # Логи серверів
├── venv/                   # Python віртуальне середовище
├── start.sh                # Скрипт запуску проекту
└── README.md
```

## Технології

### Backend
- **Python 3.14+**
- **FastAPI** - веб-фреймворк для API
- **SQLite** - база даних
- **Pandas** - обробка даних
- **Uvicorn** - ASGI сервер

### Frontend
- **React 18** - UI бібліотека
- **TypeScript** - типізація
- **Vite** - збірщик та dev сервер
- **Tailwind CSS** - стилізація
- **Motion** - анімації

## Налаштування середовища

### Вимоги

- Python 3.14 або новіша версія
- Node.js 18+ та npm
- Git

### Крок 1: Клонування репозиторію

```bash
git clone <repository-url>
cd urban-plant-recommender
```

### Крок 2: Налаштування Python середовища

Створіть віртуальне середовище:

```bash
python3 -m venv venv
```

Активуйте віртуальне середовище:

**macOS/Linux:**
```bash
source venv/bin/activate
```

**Windows:**
```bash
venv\Scripts\activate
```

Встановіть Python залежності:

```bash
pip install -r backend/requirements.txt
```

### Крок 3: Налаштування бази даних

Створіть базу даних зі схемою:

```bash
cd backend
sqlite3 db/urban_plants.db < db/schema.sql
cd ..
```

(Опціонально) Імпортуйте тестові дані:

```bash
cd backend
python src/importer/import_plants.py
cd ..
```

### Крок 4: Налаштування Frontend

Встановіть Node.js залежності:

```bash
cd frontend
npm install
cd ..
```

Примітка: Всі залежності, включно з `motion`, встановлюються автоматично через `npm install`.

## Запуск проекту

### Автоматичний запуск (рекомендовано)

Використовуйте скрипт `start.sh` для автоматичного запуску всього проекту:

```bash
./start.sh
```

Скрипт автоматично:
- Перевіряє та звільняє порти 8000 та 5173
- Очищає кеш Vite
- Активує віртуальне середовище
- Запускає бекенд на `http://127.0.0.1:8000`
- Запускає фронтенд на `http://localhost:5173`
- Зберігає логи в папці `logs/`

### Ручний запуск

**Backend:**

```bash
source venv/bin/activate  # або venv\Scripts\activate на Windows
cd backend
uvicorn main:app --reload
```

Backend буде доступний на `http://127.0.0.1:8000`
API документація: `http://127.0.0.1:8000/docs`

**Frontend:**

```bash
cd frontend
npm run dev
```

Frontend буде доступний на `http://localhost:5173`

## API Endpoints

- `GET /health` - перевірка стану сервера
- `POST /recommend` - отримання рекомендацій рослин

Детальна документація доступна за адресою `/docs` після запуску сервера.

## Ліцензія

Див. файл [LICENSE](LICENSE) для деталей.

## Контрибуція

Проект розроблено як дипломну роботу. Для питань та пропозицій створюйте Issues або Pull Requests.
