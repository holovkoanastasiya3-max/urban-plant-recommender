import json
import sqlite3
import os

DB_PATH = "db/urban_plants.db"
DATA_DIR = "data"  # створюємл окрему папку для json-файлів


def import_plants(clear_existing=False):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    # Очищаємо існуючі дані про рослини (якщо потрібно)
    if clear_existing:
        print("Clearing existing plant data...")
        cur.execute("DELETE FROM plant_soil_tolerance")
        cur.execute("DELETE FROM plant_traits")
        cur.execute("DELETE FROM plants")
        conn.commit()
        print("Existing data cleared.")

    files = [f for f in os.listdir(DATA_DIR) if f.endswith(".json")]

    for filename in files:
        path = os.path.join(DATA_DIR, filename)

        with open(path, "r", encoding="utf-8") as f:
            plants = json.load(f)

        for plant in plants:
            scientific_name = plant["scientific_name"]
            common_name_ua = plant["common_name_ua"]
            image_url = plant.get("image_url")  # Отримуємо image_url, якщо є

            cur.execute(
                "INSERT INTO plants (scientific_name, common_name_ua, image_url) VALUES (?, ?, ?)",
                (scientific_name, common_name_ua, image_url),
            )
            plant_id = cur.lastrowid

            cur.execute(
                """
                INSERT INTO plant_traits (
                    plant_id, cold_tolerance_c, drought_tolerance,
                    light_requirement, biodiversity_support,
                    growth_rate, recovery_speed
                )
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    plant_id,
                    plant["cold_tolerance_c"],
                    plant["drought_tolerance"],
                    plant["light_requirement"],
                    plant["biodiversity_support"],
                    plant["growth_rate"],
                    plant["recovery_speed"],
                ),
            )

            for soil in plant["soil_tolerance"]:
                cur.execute(
                    """
                    INSERT INTO plant_soil_tolerance (plant_id, soil_code, tolerance_level)
                    VALUES (?, ?, ?)
                    """,
                    (plant_id, soil, 1),
                )

        print(f"Imported: {filename}")

    conn.commit()
    conn.close()
    print("Import completed.")


if __name__ == "__main__":
    import sys
    # Якщо передано аргумент --clear, очищаємо БД перед імпортом
    clear = "--clear" in sys.argv or "-c" in sys.argv
    import_plants(clear_existing=clear)
