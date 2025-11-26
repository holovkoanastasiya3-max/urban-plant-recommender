import { FormData, Plant } from '../App';
import { PlantCard } from './PlantCard';
import { Header } from './Header';
import { Footer } from './Footer';

type ResultsScreenProps = {
  plants: Plant[];
  formData: FormData;
  onBack: () => void;
  onPlantSelect: (plant: Plant) => void;
  onNavigateHome: () => void;
  onNavigateToForm: () => void;
  loading?: boolean;
  error?: string | null;
};

export function ResultsScreen({ 
  plants, 
  formData, 
  onBack, 
  onPlantSelect, 
  onNavigateHome, 
  onNavigateToForm,
  loading = false,
  error = null,
}: ResultsScreenProps) {

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header onNavigateHome={onNavigateHome} onNavigateToForm={onNavigateToForm} hideStartButton={true} />

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-5 md:px-6 py-8 sm:py-10 md:py-12 flex-1">
        <header className="mb-6 sm:mb-8 border-b border-gray-200 pb-4 sm:pb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-[#1a4d3a]">Рекомендовані рослини</h1>
          <p className="text-base sm:text-lg text-[#1a4d3a] leading-relaxed">
            Відсортовано за відповідністю: найбільш підходящі → менш підходящі
          </p>
        </header>

        {loading && (
          <div className="text-center py-12">
            <p className="text-[#1a4d3a] text-base sm:text-lg">Завантаження рекомендацій...</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            <p className="text-base">{error}</p>
          </div>
        )}

        {!loading && !error && plants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#1a4d3a] text-base sm:text-lg">Рослин не знайдено за вказаними критеріями.</p>
          </div>
        )}

        {!loading && !error && plants.length > 0 && (
          <div className="space-y-3 sm:space-y-4 md:space-y-5 mb-6 sm:mb-8">
            {plants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onClick={() => onPlantSelect(plant)}
              />
            ))}
          </div>
        )}

        <button
          onClick={onBack}
          className="w-full min-h-[44px] sm:min-h-[48px] border border-gray-300 text-[#1a4d3a] py-2.5 sm:py-3 px-4 sm:px-6 text-base font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors rounded-lg"
        >
          Змінити критерії
        </button>
      </div>

      <Footer />
    </div>
  );
}