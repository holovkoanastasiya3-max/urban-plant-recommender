// src/api.ts
import type { FormData, PlantRecommendation } from './types';

const API_BASE = 'http://127.0.0.1:8000';

export async function getRecommendations(
  payload: FormData
): Promise<PlantRecommendation[]> {
  const response = await fetch(`${API_BASE}/recommend`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Помилка API (${response.status}): ${text}`);
  }

  const data = await response.json();
  return data.results ?? [];
}

