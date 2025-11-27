import { FormData } from './App';
import { BackendPlant } from './adapters/plantAdapter';

const API_BASE = 'http://127.0.0.1:8000';

export type RecommendPayload = {
  soil_code: string;
  min_temp_c: number;
  drought: number;
  light: string;
  biodiversity: number;
  growth: number;
  recovery: number;
  limit?: number;
};

export type RecommendResponse = {
  results: BackendPlant[];
};

/**
 * Fetches plant recommendations from the backend API
 */
export async function getRecommendations(
  formData: FormData
): Promise<BackendPlant[]> {
  // Convert frontend FormData to backend payload format
  const payload: RecommendPayload = {
    soil_code: formData.soilType, // Already in backend format (chernozem, etc.)
    min_temp_c: Number(formData.minTemp),
    drought: Number(formData.droughtResistance),
    light: formData.sunlight, // Already in backend format (full_sun, etc.)
    biodiversity: Number(formData.biodiversitySupport),
    growth: Number(formData.growthSpeed),
    recovery: Number(formData.ecologicalRecovery),
    limit: 10,
  };

  const response = await fetch(`${API_BASE}/recommend`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    let errorMessage = `Помилка API (${response.status})`;
    
    try {
      const errorData = JSON.parse(text);
      errorMessage = errorData.detail || errorMessage;
    } catch {
      errorMessage = text || errorMessage;
    }
    
    throw new Error(errorMessage);
  }

  const data: RecommendResponse = await response.json();
  return data.results ?? [];
}
