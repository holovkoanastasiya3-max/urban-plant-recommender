import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { InputScreen } from './components/InputScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { PlantDetailsScreen } from './components/PlantDetailsScreen';
import { LoadingLeaf } from './components/LoadingLeaf';
import { motion, AnimatePresence } from 'motion/react';
import { getRecommendations } from './api';
import { adaptPlants } from './adapters/plantAdapter';

export type FormData = {
  soilType: string;
  minTemp: string;
  droughtResistance: string;
  sunlight: string;
  biodiversitySupport: string;
  growthSpeed: string;
  ecologicalRecovery: string;
};

export type Plant = {
  id: string;
  scientificName: string;
  commonName: string;
  imageUrl?: string;
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

export default function App() {
  const [screen, setScreen] = useState<'landing' | 'input' | 'results' | 'details'>('landing');
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRecommend = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const backendPlants = await getRecommendations(data);
      const adaptedPlants = adaptPlants(backendPlants);
      
      setFormData(data);
      setPlants(adaptedPlants);
      setScreen('results');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Помилка при отриманні рекомендацій';
      setError(errorMessage);
      console.error('Error fetching recommendations:', err);
      // Stay on input screen to show error
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlantSelect = (plant: Plant) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedPlant(plant);
      setScreen('details');
      setIsLoading(false);
    }, 800);
  };

  const navigateHome = () => {
    setIsLoading(true);
    setTimeout(() => {
      setScreen('landing');
      setFormData(null);
      setSelectedPlant(null);
      setPlants([]);
      setError(null);
      setIsLoading(false);
    }, 600);
  };

  const navigateToForm = () => {
    setIsLoading(true);
    setTimeout(() => {
      setScreen('input');
      setError(null);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {isLoading && <LoadingLeaf />}
      
      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LandingPage onStart={navigateToForm} />
          </motion.div>
        )}
        
        {screen === 'input' && (
          <motion.div
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <InputScreen 
              onRecommend={handleRecommend} 
              onNavigateHome={navigateHome} 
              onNavigateToForm={navigateToForm}
              loading={isLoading}
              error={error}
            />
          </motion.div>
        )}
        
        {screen === 'results' && formData && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ResultsScreen
              formData={formData}
              plants={plants}
              error={error}
              onBack={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setScreen('input');
                  setIsLoading(false);
                }, 600);
              }}
              onPlantSelect={handlePlantSelect}
              onNavigateHome={navigateHome}
              onNavigateToForm={navigateToForm}
            />
          </motion.div>
        )}
        
        {screen === 'details' && selectedPlant && (
          <motion.div
            key="details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PlantDetailsScreen
              plant={selectedPlant}
              onBack={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setScreen('results');
                  setIsLoading(false);
                }, 600);
              }}
              onNavigateHome={navigateHome}
              onNavigateToForm={navigateToForm}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
