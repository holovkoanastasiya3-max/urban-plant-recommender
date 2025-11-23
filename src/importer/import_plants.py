import json
import sqlite3
import os

DB_PATH = "db/urban_plants.db"
DATA_DIR = "data"  # створюємл окрему папку для json-файлів


def import_plants():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    files = [f for f in os.listdir(DATA_DIR) if f.endswith(".json")]

    for filename in files:
        path = os.path.join(DATA_DIR, filename)

        with open(path, "r", encoding="utf-8") as f:
            plants = json.load(f)

        for plant in plants:
            scientific_name = plant["scientific_name"]
            common_name_ua = plant["common_name_ua"]

            cur.execute(
                "INSERT INTO plants (scientific_name, common_name_ua) VALUES (?, ?)",
                (scientific_name, common_name_ua),
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
    import_plants()
