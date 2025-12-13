import { Plant } from '../App';

// Backend response format
export type BackendPlant = {
  id: number;
  scientific_name: string;
  common_name_ua: string;
  image_url?: string;
  score: number;
  cold_tolerance_c: number;
  drought_tolerance: number;
  light_requirement: string;
  biodiversity_support: number;
  growth_rate: number;
  recovery_speed: number;
  explanation?: string;
};

// Helper functions for formatting
function formatColdTolerance(coldC: number): string {
  return `${coldC}°C`;
}

function formatPollutionTolerance(score: number): string {
  // Score is 0-1, convert to 1-5 scale for display
  const scaledScore = Math.round(score * 5);
  if (scaledScore >= 5) return 'Дуже висока (5/5)';
  if (scaledScore >= 4) return 'Висока (4/5)';
  if (scaledScore >= 3) return 'Помірна (3/5)';
  if (scaledScore >= 2) return 'Помірно низька (2/5)';
  return 'Низька (1/5)';
}

function formatDroughtTolerance(drought: number): string {
  const labels = ['Низька', 'Помірно низька', 'Середня', 'Помірно висока', 'Висока'];
  return labels[drought - 1] || 'Середня';
}

function formatRecoverySpeed(recovery: number): string {
  return `${recovery}/5`;
}

function formatSunlightReq(light: string): string {
  const map: Record<string, string> = {
    'full_sun': 'Повне сонце',
    'partial_shade': 'Напівтінь',
    'shade': 'Тінь',
    'full_sun,partial_shade': 'Повне сонце / напівтінь',
    'partial_shade,shade': 'Напівтінь / тінь',
  };
  return map[light] || light;
}

function formatSpreadSpeed(growth: number): string {
  if (growth >= 4) return 'Швидка';
  if (growth >= 3) return 'Помірна до швидкої';
  if (growth >= 2) return 'Помірна';
  return 'Повільна';
}

function formatResilience(score: number, recovery: number, biodiversity: number): string {
  if (score >= 0.8 && recovery >= 4) {
    return 'Висока стійкість до міських умов';
  }
  if (biodiversity >= 4) {
    return 'Висока підтримка біорізноманіття';
  }
  return 'Добра адаптація до міських умов';
}

// Default values for missing fields
function getDefaultSoilType(): string {
  return 'Універсальний';
}

function getDefaultHeight(): string {
  return '—';
}

/**
 * Converts backend plant format to frontend Plant format
 */
export function adaptPlant(backendPlant: BackendPlant): Plant {
  return {
    id: String(backendPlant.id),
    scientificName: backendPlant.scientific_name,
    commonName: backendPlant.common_name_ua,
    imageUrl: backendPlant.image_url,
    coldTolerance: formatColdTolerance(backendPlant.cold_tolerance_c),
    pollutionTolerance: formatPollutionTolerance(backendPlant.score),
    recoverySpeed: formatRecoverySpeed(backendPlant.recovery_speed),
    sunlightReq: formatSunlightReq(backendPlant.light_requirement),
    soilType: getDefaultSoilType(), // Backend doesn't provide this
    height: getDefaultHeight(), // Backend doesn't provide this
    droughtTolerance: formatDroughtTolerance(backendPlant.drought_tolerance),
    spreadSpeed: formatSpreadSpeed(backendPlant.growth_rate),
    resilience: formatResilience(
      backendPlant.score,
      backendPlant.recovery_speed,
      backendPlant.biodiversity_support
    ),
    explanation: backendPlant.explanation || "Рослина відповідає заданим критеріям.",
  };
}

/**
 * Converts array of backend plants to frontend format
 */
export function adaptPlants(backendPlants: BackendPlant[]): Plant[] {
  return backendPlants.map(adaptPlant);
}

