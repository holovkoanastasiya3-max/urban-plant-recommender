import hashlib
import sqlite3
import os
from typing import Optional, Dict
import asyncio

# Завантаження змінних оточення з .env файлу
try:
    from dotenv import load_dotenv
    # Завантажуємо .env файл з кореня проекту (на рівень вище backend/)
    env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '.env')
    load_dotenv(env_path)
except ImportError:
    # python-dotenv не встановлено, використовуємо тільки системні змінні
    pass

# Опціональний імпорт OpenAI
try:
    from openai import OpenAI
    OPENAI_AVAILABLE = True
except ImportError:
    OPENAI_AVAILABLE = False
    OpenAI = None

# Шлях до БД (відносно backend/ директорії)
DB_PATH = "db/urban_plants.db"

# Ініціалізація OpenAI клієнта
client = None

def init_openai_client():
    """Ініціалізує OpenAI клієнт з API ключа"""
    global client
    if not OPENAI_AVAILABLE:
        return False
    api_key = os.getenv("OPENAI_API_KEY")
    if api_key:
        try:
            client = OpenAI(api_key=api_key)
            return True
        except Exception as e:
            print(f"Помилка ініціалізації OpenAI клієнта: {e}")
            return False
    return False

def get_cache_key(plant_id: int, params: Dict) -> str:
    """Створює унікальний ключ для кешу на основі параметрів запиту"""
    # Нормалізуємо параметри для консистентності ключа
    # min_temp_c може бути float, тому перетворюємо на int для унікальності
    min_temp = int(params['min_temp_c'])
    
    key_str = (
        f"{plant_id}_{params['soil_code']}_{min_temp}_"
        f"{params['drought']}_{params['light']}_{params['biodiversity']}_"
        f"{params['growth']}_{params['recovery']}"
    )
    return hashlib.md5(key_str.encode()).hexdigest()

def get_cached_explanation(plant_id: int, cache_key: str) -> Optional[str]:
    """Перевіряє кеш в БД та повертає збережене пояснення"""
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    
    cur.execute(
        """
        SELECT explanation 
        FROM plant_explanations_cache 
        WHERE plant_id = ? AND cache_key = ?
        """,
        (plant_id, cache_key)
    )
    
    result = cur.fetchone()
    conn.close()
    
    return result[0] if result else None

def cache_explanation(plant_id: int, cache_key: str, explanation: str):
    """Зберігає пояснення в кеш"""
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    
    cur.execute(
        """
        INSERT OR REPLACE INTO plant_explanations_cache 
        (plant_id, cache_key, explanation)
        VALUES (?, ?, ?)
        """,
        (plant_id, cache_key, explanation)
    )
    
    conn.commit()
    conn.close()

def build_prompt(plant_data: Dict, params: Dict) -> str:
    """Створює промпт для AI"""
    return f"""Ти експерт з екології та озеленення України.

Рослина: {plant_data['scientific_name']} ({plant_data['common_name_ua']})
Характеристики:
- Морозостійкість: {plant_data['cold_tolerance_c']}°C
- Посухостійкість: {plant_data['drought_tolerance']}/5
- Освітлення: {plant_data['light_requirement']}
- Підтримка біорізноманіття: {plant_data['biodiversity_support']}/5
- Швидкість росту: {plant_data['growth_rate']}/5
- Швидкість відновлення: {plant_data['recovery_speed']}/5
- Тип ґрунту: {params['soil_code']}

Параметри запиту користувача:
- Мінімальна температура: {params['min_temp_c']}°C
- Тип ґрунту: {params['soil_code']}
- Посухостійкість: {params['drought']}
- Освітлення: {params['light']}
- Підтримка біорізноманіття: {params['biodiversity']}
- Швидкість росту: {params['growth']}
- Швидкість відновлення: {params['recovery']}

Напиши ОДИН зв'язний текст українською мовою (2-3 речення бажано, але якщо потрібно більше для повного опису - пиши більше, не обрізай речення), який включає:
1. Чому ця рослина обрана (початок тексту)
2. В яких регіонах України вона найкраще росте (включити природно в текст, наприклад: "Найкраще росте в регіонах Полісся та Лісостепу...")
3. Як вона допомагає відновити території після військових дій (середина тексту)
4. Як вона покращує біорізноманіття (кінець тексту)

Текст має бути природним, зв'язним та інформативним. Максимум 2-3 речення."""

async def generate_ai_explanation(plant_data: Dict, params: Dict) -> Optional[str]:
    """Генерує AI-пояснення через OpenAI API"""
    if not OPENAI_AVAILABLE:
        print(f"[AI] OpenAI не доступний")
        return None
    if not client:
        print(f"[AI] Ініціалізуємо OpenAI клієнт...")
        if not init_openai_client():
            print(f"[AI] ❌ Не вдалося ініціалізувати OpenAI клієнт")
            return None
        print(f"[AI] ✅ OpenAI клієнт ініціалізовано")
    
    try:
        prompt = build_prompt(plant_data, params)
        print(f"[AI] Відправляємо запит до OpenAI API...")
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Ти експерт з екології та озеленення України."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=500  # Збільшено для повних пояснень без обрізання
        )
        
        explanation = response.choices[0].message.content.strip()
        print(f"[AI] ✅ Отримано відповідь від OpenAI")
        return explanation
    except Exception as e:
        error_type = type(e).__name__
        error_msg = str(e)
        
        if "RateLimitError" in error_type or "429" in error_msg or "quota" in error_msg.lower():
            print(f"[AI] ❌ Перевищено квоту OpenAI. Перевірте ваш план та billing на https://platform.openai.com/account/billing")
        elif "AuthenticationError" in error_type or "401" in error_msg:
            print(f"[AI] ❌ Неправильний API ключ. Перевірте OPENAI_API_KEY в .env файлі")
        else:
            print(f"[AI] ❌ Помилка генерації AI-пояснення: {error_type}: {error_msg}")
        
        return None

async def generate_and_cache_explanation(plant_data: Dict, params: Dict):
    """Асинхронно генерує та зберігає AI-пояснення"""
    plant_id = plant_data['id']
    cache_key = get_cache_key(plant_id, params)
    
    print(f"[AI] Перевірка кешу для рослини {plant_id} ({plant_data.get('scientific_name', 'N/A')})...")
    
    # Перевіряємо, чи вже є в кеші (на випадок паралельних запитів)
    if get_cached_explanation(plant_id, cache_key):
        print(f"[AI] ✅ Пояснення вже є в кеші для рослини {plant_id}")
        return
    
    if not OPENAI_AVAILABLE:
        print(f"[AI] ❌ OpenAI бібліотека не встановлена. Встановіть: pip install openai")
        return
    
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print(f"[AI] ❌ OPENAI_API_KEY не встановлено. Встановіть змінну оточення: export OPENAI_API_KEY=your_key")
        return
    
    print(f"[AI] 🔄 Генеруємо AI-пояснення для рослини {plant_id}...")
    
    # Генеруємо пояснення
    explanation = await generate_ai_explanation(plant_data, params)
    
    if explanation:
        # Зберігаємо в кеш
        cache_explanation(plant_id, cache_key, explanation)
        print(f"[AI] ✅ Пояснення збережено в кеш для рослини {plant_id}")
        print(f"[AI] Пояснення (перші 100 символів): {explanation[:100]}...")
    else:
        print(f"[AI] ❌ Не вдалося згенерувати пояснення для рослини {plant_id}")

