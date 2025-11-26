import { Plant } from '../App';
import { Header } from './Header';
import { Footer } from './Footer';

type PlantDetailsScreenProps = {
  plant: Plant;
  onBack: () => void;
  onNavigateHome: () => void;
  onNavigateToForm: () => void;
};

export function PlantDetailsScreen({ plant, onBack, onNavigateHome, onNavigateToForm }: PlantDetailsScreenProps) {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header onNavigateHome={onNavigateHome} onNavigateToForm={onNavigateToForm} hideStartButton={true} />
      
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1">
        {/* Header */}
        <header className="mb-6 sm:mb-8 border-b border-stone-300 pb-4 sm:pb-6">
          <h1 className="mb-1 text-slate-800">
            <em>{plant.scientificName}</em>
          </h1>
          <h2 className="text-slate-600">
            {plant.commonName}
          </h2>
        </header>

        {/* Image Placeholder */}
        <div className="w-full h-64 border border-stone-200 bg-stone-50 flex items-center justify-center mb-8">
          <span className="text-stone-400">
            [Фото рослини]
          </span>
        </div>

        {/* Ecological Traits */}
        <section className="mb-8 border border-stone-200 p-6 bg-white">
          <h3 className="mb-4 pb-2 border-b border-stone-200 text-slate-800">
            Екологічні характеристики
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-slate-500 mb-1">Морозостійкість</div>
              <div className="text-slate-700">{plant.coldTolerance}</div>
            </div>
            <div>
              <div className="text-slate-500 mb-1">Посухостійкість</div>
              <div className="text-slate-700">{plant.droughtTolerance}</div>
            </div>
            <div>
              <div className="text-slate-500 mb-1">Толерантність до забруднення</div>
              <div className="text-slate-700">{plant.pollutionTolerance}</div>
            </div>
          </div>
        </section>

        {/* Urban Suitability */}
        <section className="mb-8 border border-stone-200 p-6 bg-white">
          <h3 className="mb-4 pb-2 border-b border-stone-200 text-slate-800">
            Придатність для міських умов
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-slate-500 mb-1">Тип ґрунту</div>
              <div className="text-slate-700">{plant.soilType}</div>
            </div>
            <div>
              <div className="text-slate-500 mb-1">Потреба в освітленні</div>
              <div className="text-slate-700">{plant.sunlightReq}</div>
            </div>
            <div>
              <div className="text-slate-500 mb-1">Діапазон висоти</div>
              <div className="text-slate-700">{plant.height}</div>
            </div>
          </div>
        </section>

        {/* Recovery & Resilience */}
        <section className="mb-8 border border-stone-200 p-6 bg-white">
          <h3 className="mb-4 pb-2 border-b border-stone-200 text-slate-800">
            Відновлення та стійкість
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-slate-500 mb-1">Швидкість відновлення</div>
              <div className="text-slate-700">{plant.recoverySpeed}</div>
            </div>
            <div>
              <div className="text-slate-500 mb-1">Швидкість поширення</div>
              <div className="text-slate-700">{plant.spreadSpeed}</div>
            </div>
            <div>
              <div className="text-slate-500 mb-1">Загальна стійкість</div>
              <div className="text-slate-700">{plant.resilience}</div>
            </div>
          </div>
        </section>

        {/* Recommendation Explanation */}
        <section className="mb-8 border p-6 bg-white" style={{ borderColor: '#A9B89E', backgroundColor: '#A9B89E15' }}>
          <h3 className="mb-3 text-slate-800">
            Чому ця рослина підходить
          </h3>
          <p className="text-slate-700">
            {plant.explanation}
          </p>
        </section>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="w-full border border-stone-300 text-slate-700 py-3 px-6 hover:bg-stone-100 transition-colors"
        >
          Повернутися до результатів
        </button>
      </div>

      <Footer />
    </div>
  );
}