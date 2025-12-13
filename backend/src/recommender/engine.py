import sqlite3
from typing import List, Dict, Optional
import asyncio

DB_PATH = "db/urban_plants.db"

from src.ai.explanation_generator import (
    get_cache_key,
    get_cached_explanation,
    generate_and_cache_explanation
)


# -----------------------------
#  Scoring helpers
# -----------------------------
def scale_match(value: Optional[int], target: int, max_range: int = 5) -> float:
    if value is None:
        return 0.3
    diff = abs(value - target)
    return max(0.0, 1.0 - diff / max_range)


def score_light(plant_light: Optional[str], target_light: str) -> float:
    if plant_light is None:
        return 0.3

    if plant_light == target_light:
        return 1.0

    PAIRS = {
        ("full_sun", "partial_shade"),
        ("partial_shade", "full_sun"),
        ("shade", "partial_shade"),
        ("partial_shade", "shade"),
    }

    if (plant_light, target_light) in PAIRS:
        return 0.6

    return 0.3


def score_soil(level: Optional[int]) -> float:
    if level is None:
        return 0.2
    if level >= 2:
        return 1.0
    if level == 1:
        return 0.6
    return 0.3


# -----------------------------
#  Main Recommend Function
# -----------------------------
def recommend_plants(
    soil_code: str,
    min_temp_c: float,
    drought: int,
    light: str,
    biodiversity: int,
    growth: int,
    recovery: int,
    limit: int = 15,
) -> List[Dict]:
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    cur.execute(
        """
        SELECT 
            p.id,
            p.scientific_name,
            p.common_name_ua,
            p.image_url,
            t.cold_tolerance_c,
            t.drought_tolerance,
            t.light_requirement,
            t.biodiversity_support,
            t.growth_rate,
            t.recovery_speed,
            pst.tolerance_level
        FROM plants p
        LEFT JOIN plant_traits t ON t.plant_id = p.id
        LEFT JOIN plant_soil_tolerance pst
            ON pst.plant_id = p.id AND pst.soil_code = ?
        WHERE t.cold_tolerance_c <= ?
        """,
        (soil_code, min_temp_c),
    )

    rows = cur.fetchall()
    conn.close()

    # Параметри запиту для кешування
    params = {
        'soil_code': soil_code,
        'min_temp_c': min_temp_c,
        'drought': drought,
        'light': light,
        'biodiversity': biodiversity,
        'growth': growth,
        'recovery': recovery,
    }

    results: List[Dict] = []

    for row in rows:
        (
            plant_id,
            scientific_name,
            common_name_ua,
            image_url,
            cold,
            drought_db,
            light_db,
            biodiversity_db,
            growth_db,
            recovery_db,
            soil_level,
        ) = row

        # --- scoring
        drought_score = scale_match(drought_db, drought)
        biodiversity_score = scale_match(biodiversity_db, biodiversity)
        growth_score = scale_match(growth_db, growth)
        recovery_score = scale_match(recovery_db, recovery)
        light_score = score_light(light_db, light)
        soil_score = score_soil(soil_level)

        # weight tuning for 1000+ dataset
        total_score = (
            1.1 * drought_score
            + 1.2 * biodiversity_score
            + 0.9 * growth_score
            + 1.4 * recovery_score
            + 1.0 * light_score
            + 1.0 * soil_score
        ) / 6.6

        # --- explanation (просте)
        reasons = []
        if recovery_score > 0.8:
            reasons.append("швидке відновлення")
        if biodiversity_score > 0.8:
            reasons.append("висока підтримка біорізноманіття")
        if drought_score > 0.8:
            reasons.append("добра посухостійкість")
        if soil_score > 0.8:
            reasons.append("ідеальна сумісність з типом ґрунту")

        simple_explanation = (
            "Причини рекомендації: " + ", ".join(reasons) + "."
            if reasons else "Рослина відповідає заданим критеріям."
        )
        
        # Перевіряємо кеш для AI-пояснення
        cache_key = get_cache_key(plant_id, params)
        cached_ai_explanation = get_cached_explanation(plant_id, cache_key)
        
        if cached_ai_explanation:
            print(f"[Engine] ✅ Знайдено AI-пояснення в кеші для рослини {plant_id} (key: {cache_key[:8]}...)")
        else:
            print(f"[Engine] ⚠️ AI-пояснення немає в кеші для рослини {plant_id} (key: {cache_key[:8]}...)")
        
        # Використовуємо AI-пояснення якщо є в кеші, інакше просте
        explanation = cached_ai_explanation if cached_ai_explanation else simple_explanation
        
        # Гарантуємо, що пояснення завжди є
        if not explanation or explanation.strip() == "":
            explanation = "Рослина відповідає заданим критеріям."
        
        plant_data = {
            'id': plant_id,
            'scientific_name': scientific_name,
            'common_name_ua': common_name_ua,
            'cold_tolerance_c': cold,
            'drought_tolerance': drought_db,
            'light_requirement': light_db,
            'biodiversity_support': biodiversity_db,
            'growth_rate': growth_db,
            'recovery_speed': recovery_db,
        }

        results.append(
            {
                "id": plant_id,
                "scientific_name": scientific_name,
                "common_name_ua": common_name_ua,
                "image_url": image_url,
                "score": round(float(total_score), 3),
                "cold_tolerance_c": cold,
                "drought_tolerance": drought_db,
                "light_requirement": light_db,
                "biodiversity_support": biodiversity_db,
                "growth_rate": growth_db,
                "recovery_speed": recovery_db,
                "explanation": explanation,
            }
        )

    # Сортуємо перед обмеженням
    results.sort(key=lambda x: x["score"], reverse=True)
    final_results = results[:limit]
    
    # Синхронно генеруємо AI-пояснення для топ-3 рослин без кешу
    print(f"[Engine] Перевіряємо та генеруємо AI-пояснення для топ-3 рослин...")
    print(f"[Engine] Параметри запиту: soil={params['soil_code']}, temp={params['min_temp_c']}, drought={params['drought']}, light={params['light']}, bio={params['biodiversity']}, growth={params['growth']}, recovery={params['recovery']}")
    
    # Оновлюємо пояснення для топ-3 рослин синхронно
    for i, plant_result in enumerate(final_results[:3]):
        plant_id = plant_result["id"]
        cache_key = get_cache_key(plant_id, params)
        cached_ai_explanation = get_cached_explanation(plant_id, cache_key)
        
        print(f"[Engine] Рослина {plant_id} ({plant_result['scientific_name']}): cache_key={cache_key[:16]}..., cached={'YES' if cached_ai_explanation else 'NO'}")
        
        if not cached_ai_explanation:
            print(f"[Engine] Генеруємо AI-пояснення для рослини {plant_id} ({plant_result['scientific_name']}) - топ {i+1} (синхронно)...")
            # Створюємо plant_data для генерації
            plant_data = {
                'id': plant_id,
                'scientific_name': plant_result['scientific_name'],
                'common_name_ua': plant_result['common_name_ua'],
                'cold_tolerance_c': plant_result['cold_tolerance_c'],
                'drought_tolerance': plant_result['drought_tolerance'],
                'light_requirement': plant_result['light_requirement'],
                'biodiversity_support': plant_result['biodiversity_support'],
                'growth_rate': plant_result['growth_rate'],
                'recovery_speed': plant_result['recovery_speed'],
            }
            
            # Синхронно генеруємо та зберігаємо пояснення
            try:
                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)
                loop.run_until_complete(
                    generate_and_cache_explanation(plant_data, params)
                )
                loop.close()
                
                # Оновлюємо пояснення в результаті
                updated_explanation = get_cached_explanation(plant_id, cache_key)
                if updated_explanation:
                    # Знаходимо відповідний результат і оновлюємо його
                    for result in final_results:
                        if result["id"] == plant_id:
                            result["explanation"] = updated_explanation
                            print(f"[Engine] ✅ Оновлено пояснення для рослини {plant_id} в результаті")
                            break
            except Exception as e:
                print(f"[Engine] ❌ Помилка генерації AI-пояснення: {type(e).__name__}: {e}")
                import traceback
                traceback.print_exc()
        else:
            print(f"[Engine] ✅ AI-пояснення вже є в кеші для рослини {plant_id}")
            # Оновлюємо пояснення в результаті з кешу
            for result in final_results:
                if result["id"] == plant_id:
                    result["explanation"] = cached_ai_explanation
                    break
    
    return final_results


# -----------------------------
#   Standalone demo
# -----------------------------
def demo():
    recs = recommend_plants(
        soil_code="chernozem",
        min_temp_c=-25,
        drought=3,
        light="full_sun",
        biodiversity=3,
        growth=3,
        recovery=4,
        limit=10,
    )
    for r in recs:
        print(f"{r['scientific_name']} ({r['common_name_ua']}) — score {r['score']}")
        print("  ", r["explanation"])
        print()


if __name__ == "__main__":
    demo()
