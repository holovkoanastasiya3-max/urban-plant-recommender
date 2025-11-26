// src/types.ts

export type SoilCode =
  | 'chernozem'
  | 'grey_forest'
  | 'podzolic'
  | 'meadow'
  | 'solonets'
  | 'sandy'
  | 'disturbed';

export type Light = 'full_sun' | 'partial_shade' | 'shade';

export type FormData = {
  soil_code: SoilCode;
  min_temp_c: number;
  drought: number;       // 1–5
  light: Light;
  biodiversity: number;  // 1–5
  growth: number;        // 1–5
  recovery: number;      // 1–5
  limit?: number;        // Optional limit for results
};

export type PlantRecommendation = {
  id: number;
  scientific_name: string;
  common_name_ua: string;
  score: number;
  cold_tolerance_c: number;
  drought_tolerance: number;
  light_requirement: string;
  biodiversity_support: number;
  growth_rate: number;
  recovery_speed: number;
  explanation: string;
};

