-- Schema for "Urban Plant Recommender"
-- SQLite database

PRAGMA foreign_keys = ON;

-- 1. Типи ґрунтів України (фіксований довідник)
CREATE TABLE IF NOT EXISTS soil_types (
    code    TEXT PRIMARY KEY,      -- 'chernozem', 'grey_forest', ...
    name_ua TEXT NOT NULL          -- Ukrainian name of the soil type
);

-- Початкові значення для типів ґрунтів
INSERT OR IGNORE INTO soil_types (code, name_ua) VALUES
    ('chernozem',    'Чорнозем'),
    ('grey_forest',  'Сірий лісовий'),
    ('podzolic',     'Дерново-підзолистий'),
    ('meadow',       'Лучний'),
    ('solonets',     'Солонці'),
    ('sandy',        'Піщовик'),
    ('disturbed',    'Урбанізований / порушений ґрунт');

------------------------------------------------------------
-- 2. Базова інформація про рослини
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS plants (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    scientific_name TEXT NOT NULL,   -- латинська назва
    common_name_ua  TEXT,            -- українська назва
    genus           TEXT,
    family          TEXT,
    source_key      TEXT,            -- ID у зовнішній базі
    is_active       INTEGER NOT NULL DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_plants_scientific_name
    ON plants (scientific_name);

------------------------------------------------------------
-- 3. Екологічні трейти
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS plant_traits (
    plant_id             INTEGER PRIMARY KEY,
    cold_tolerance_c     REAL,      -- Морозостійкість, мін. температура °C
    drought_tolerance    INTEGER,   -- Посухостійкість (1–5)
    light_requirement    TEXT,      -- 'full_sun', 'partial_shade', 'shade'
    biodiversity_support INTEGER,   -- Підтримка біорізноманіття (1–5)
    growth_rate          INTEGER,   -- Швидкість росту (1–5)
    recovery_speed       INTEGER,   -- Швидкість екологічного відновлення (1–5)
    FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_traits_cold
    ON plant_traits (cold_tolerance_c);
CREATE INDEX IF NOT EXISTS idx_traits_drought
    ON plant_traits (drought_tolerance);
CREATE INDEX IF NOT EXISTS idx_traits_recovery
    ON plant_traits (recovery_speed);

------------------------------------------------------------
-- 4. Толерантність рослин до різних ґрунтів (many-to-many)
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS plant_soil_tolerance (
    plant_id        INTEGER NOT NULL,
    soil_code       TEXT NOT NULL,      -- посилання на soil_types.code
    tolerance_level INTEGER NOT NULL DEFAULT 1, -- 1 = нормально, 2 = дуже добре
    PRIMARY KEY (plant_id, soil_code),
    FOREIGN KEY (plant_id)  REFERENCES plants(id)     ON DELETE CASCADE,
    FOREIGN KEY (soil_code) REFERENCES soil_types(code) ON DELETE RESTRICT
);
