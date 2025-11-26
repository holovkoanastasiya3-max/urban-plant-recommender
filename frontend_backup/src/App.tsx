import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { InputScreen } from './components/InputScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { PlantDetailsScreen } from './components/PlantDetailsScreen';
import type { PlantRecommendation } from './types';
import { getRecommendations } from './api';

// Frontend form data type (what the form collects)
export type FormData = {
  soilType: string;
  minTemp: string;
  droughtResistance: string;
  sunlight: string;
  biodiversitySupport: string;
  growthSpeed: string;
  ecologicalRecovery: string;
};

// Frontend plant type (for display)
export type Plant = {
  id: string;
  scientificName: string;
  commonName: string;
  coldTolerance: string;
  pollutionTolerance: string;
  recoverySpeed: string;
  sunlightReq: string;
  soilType: string;
  height: string;
  droughtTolerance: string;
  spreadSpeed: string;
  resilience: string;
  explanation: string;
};

// Convert backend light requirement to readable format
function formatLightRequirement(light: string): string {
  const lightMap: Record<string, string> = {
    'full_sun': 'Повне сонце',
    'partial_shade': 'Напівтінь',
    'shade': 'Тінь',
  };
  return lightMap[light] || light;
}

// Convert backend PlantRecommendation to frontend Plant
function convertToPlant(recommendation: PlantRecommendation): Plant {
  return {
    id: String(recommendation.id),
    scientificName: recommendation.scientific_name,
    commonName: recommendation.common_name_ua,
    coldTolerance: `${recommendation.cold_tolerance_c}°C`,
    pollutionTolerance: `${recommendation.drought_tolerance}/5`,
    recoverySpeed: `${recommendation.recovery_speed}/5`,
    sunlightReq: formatLightRequirement(recommendation.light_requirement),
    soilType: 'Різні типи', // Backend doesn't provide this, using placeholder
    height: 'N/A', // Backend doesn't provide this
    droughtTolerance: `${recommendation.drought_tolerance}/5`,
    spreadSpeed: `${recommendation.growth_rate}/5`,
    resilience: `Стійкість: ${recommendation.biodiversity_support}/5`,
    explanation: recommendation.explanation,
  };
}

export default function App() {
  const [screen, setScreen] = useState<'landing' | 'input' | 'results' | 'details'>('landing');
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRecommend = async (data: FormData) => {
    setFormData(data);
    setLoading(true);
    setError(null);
    
    try {
      // Convert frontend form data to backend format
      const payload = {
        soil_code: data.soilType as any, // Already in backend format
        min_temp_c: Number(data.minTemp),
        drought: Number(data.droughtResistance),
        light: data.sunlight as any, // Already in backend format
        biodiversity: Number(data.biodiversitySupport),
        growth: Number(data.growthSpeed),
        recovery: Number(data.ecologicalRecovery),
        limit: 10,
      };

      const recommendations = await getRecommendations(payload);
      const convertedPlants = recommendations.map(convertToPlant);
      setPlants(convertedPlants);
      setScreen('results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Помилка при отриманні рекомендацій');
      console.error('Error fetching recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlantSelect = (plant: Plant) => {
    setSelectedPlant(plant);
    setScreen('details');
  };

  const navigateHome = () => {
    setScreen('landing');
    setFormData(null);
    setSelectedPlant(null);
    setPlants([]);
    setError(null);
  };

  const navigateToForm = () => {
    setScreen('input');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col w-full overflow-x-hidden">
      {screen === 'landing' && <LandingPage onStart={navigateToForm} />}
      {screen === 'input' && (
        <InputScreen 
          onRecommend={handleRecommend} 
          onNavigateHome={navigateHome} 
          onNavigateToForm={navigateToForm}
          loading={loading}
          error={error}
        />
      )}
      {screen === 'results' && formData && (
        <ResultsScreen
          plants={plants}
          formData={formData}
          onBack={() => setScreen('input')}
          onPlantSelect={handlePlantSelect}
          onNavigateHome={navigateHome}
          onNavigateToForm={navigateToForm}
          loading={loading}
          error={error}
        />
      )}
      {screen === 'details' && selectedPlant && (
        <PlantDetailsScreen
          plant={selectedPlant}
          onBack={() => setScreen('results')}
          onNavigateHome={navigateHome}
          onNavigateToForm={navigateToForm}
        />
      )}
    </div>
  );
}
