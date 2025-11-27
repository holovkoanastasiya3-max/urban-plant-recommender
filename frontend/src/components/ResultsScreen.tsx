import { FormData, Plant } from '../App';
import { PlantCard } from './PlantCard';
import { Header } from './Header';
import { Footer } from './Footer';

type ResultsScreenProps = {
  formData: FormData;
  plants: Plant[];
  error: string | null;
  onBack: () => void;
  onPlantSelect: (plant: Plant) => void;
  onNavigateHome: () => void;
  onNavigateToForm: () => void;
};

export function ResultsScreen({ plants, error, onBack, onPlantSelect, onNavigateHome, onNavigateToForm }: ResultsScreenProps) {

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header onNavigateHome={onNavigateHome} onNavigateToForm={onNavigateToForm} hideStartButton={true} />

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1">
        <header className="mb-6 sm:mb-8 border-b border-stone-300 pb-4 sm:pb-6">
          <h1 className="mb-2 text-slate-800">Рекомендовані рослини</h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Відсортовано за відповідністю: найбільш підходящі → менш підходящі
          </p>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-800">
            <p className="font-medium mb-1">Помилка</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {plants.length === 0 && !error && (
          <div className="mb-6 p-4 bg-stone-50 border border-stone-200 rounded text-stone-700 text-center">
            <p>Рослин не знайдено за вказаними критеріями.</p>
          </div>
        )}

        <div className="space-y-4 mb-8">
          {plants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onClick={() => onPlantSelect(plant)}
            />
          ))}
        </div>

        <button
          onClick={onBack}
          className="w-full border border-stone-300 text-slate-700 py-3 px-6 hover:bg-stone-50 transition-colors"
        >
          Змінити критерії
        </button>
      </div>

      <Footer />
    </div>
  );
}
