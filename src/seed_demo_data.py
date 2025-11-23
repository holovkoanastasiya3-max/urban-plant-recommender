import sqlite3

DB_PATH = "db/urban_plants.db"

plants = [
    {
        "scientific": "Tilia cordata",
        "common": "Липа дрібнолиста",
        "cold": -32,
        "drought": 3,
        "light": "partial_shade",
        "biodiversity": 4,
        "growth": 3,
        "recovery": 4,
        "soil_tolerance": ["chernozem", "grey_forest", "disturbed"]
    },
    {
        "scientific": "Acer platanoides",
        "common": "Клен гостролистий",
        "cold": -35,
        "drought": 3,
        "light": "full_sun",
        "biodiversity": 3,
        "growth": 4,
        "recovery": 4,
        "soil_tolerance": ["chernozem", "podzolic", "disturbed"]
    },
    {
        "scientific": "Betula pendula",
        "common": "Береза повисла",
        "cold": -40,
        "drought": 2,
        "light": "full_sun",
        "biodiversity": 3,
        "growth": 4,
        "recovery": 3,
        "soil_tolerance": ["sandy", "podzolic", "meadow"]
    },
    {
        "scientific": "Quercus robur",
        "common": "Дуб звичайний",
        "cold": -28,
        "drought": 4,
        "light": "full_sun",
        "biodiversity": 5,
        "growth": 2,
        "recovery": 2,
        "soil_tolerance": ["chernozem", "grey_forest", "meadow"]
    },
    {
        "scientific": "Cornus sanguinea",
        "common": "Ґрунтопокривний дерен",
        "cold": -34,
        "drought": 3,
        "light": "partial_shade",
        "biodiversity": 4,
        "growth": 5,
        "recovery": 5,
        "soil_tolerance": ["disturbed", "podzolic", "sandy"]
    },
]

def seed():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    for p in plants:
        cur.execute(
            """
            INSERT INTO plants (scientific_name, common_name_ua)
            VALUES (?, ?)
            """,
            (p["scientific"], p["common"])
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
                plant_id, p["cold"], p["drought"], p["light"],
                p["biodiversity"], p["growth"], p["recovery"]
            )
        )

        for soil in p["soil_tolerance"]:
            cur.execute(
                """
                INSERT INTO plant_soil_tolerance (plant_id, soil_code, tolerance_level)
                VALUES (?, ?, 1)
                """,
                (plant_id, soil)
            )

    conn.commit()
    conn.close()


if __name__ == "__main__":
    seed()
    print("Demo data inserted.")
