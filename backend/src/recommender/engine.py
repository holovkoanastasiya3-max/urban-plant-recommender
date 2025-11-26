import sqlite3
from typing import List, Dict, Optional

DB_PATH = "db/urban_plants.db"


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

    results: List[Dict] = []

    for row in rows:
        (
            plant_id,
            scientific_name,
            common_name_ua,
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

        # --- explanation
        reasons = []
        if recovery_score > 0.8:
            reasons.append("швидке відновлення")
        if biodiversity_score > 0.8:
            reasons.append("висока підтримка біорізноманіття")
        if drought_score > 0.8:
            reasons.append("добра посухостійкість")
        if soil_score > 0.8:
            reasons.append("ідеальна сумісність з типом ґрунту")

        explanation = (
            "Причини рекомендації: " + ", ".join(reasons) + "."
            if reasons else "Рослина відповідає заданим критеріям."
        )

        results.append(
            {
                "id": plant_id,
                "scientific_name": scientific_name,
                "common_name_ua": common_name_ua,
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

    results.sort(key=lambda x: x["score"], reverse=True)
    return results[:limit]


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
