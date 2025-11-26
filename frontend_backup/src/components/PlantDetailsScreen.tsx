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
    <div className="min-h-screen bg-white flex flex-col">
      <Header onNavigateHome={onNavigateHome} onNavigateToForm={onNavigateToForm} hideStartButton={true} />
      
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-5 md:px-6 py-8 sm:py-10 md:py-12 flex-1">
        {/* Header */}
        <header className="mb-6 sm:mb-8 border-b border-gray-200 pb-4 sm:pb-6">
          <h1 className="text-xl sm:text-2xl font-semibold mb-1.5 text-[#1a4d3a]">
            <em className="not-italic">{plant.scientificName}</em>
          </h1>
          <h2 className="text-lg sm:text-xl text-[#1a4d3a]">
            {plant.commonName}
          </h2>
        </header>

        {/* Image Placeholder */}
        <div className="w-full h-48 sm:h-56 md:h-64 border border-gray-200 bg-[#f8f8f8] flex items-center justify-center mb-8 rounded-lg">
          <span className="text-gray-400 text-base">
            [Фото рослини]
          </span>
        </div>

        {/* Ecological Traits */}
        <section className="mb-8 bg-white">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 pb-3 border-b border-gray-200 text-[#1a4d3a]">
            Екологічні характеристики
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-[#4a6b5a] mb-1.5 font-medium">Морозостійкість</div>
              <div className="text-base text-[#1a4d3a] font-medium">{plant.coldTolerance}</div>
            </div>
            <div>
              <div className="text-sm text-[#4a6b5a] mb-1.5 font-medium">Посухостійкість</div>
              <div className="text-base text-[#1a4d3a] font-medium">{plant.droughtTolerance}</div>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <div className="text-sm text-[#4a6b5a] mb-1.5 font-medium">Толерантність до забруднення</div>
              <div className="text-base text-[#1a4d3a] font-medium">{plant.pollutionTolerance}</div>
            </div>
          </div>
        </section>

        {/* Urban Suitability */}
        <section className="mb-8 bg-white">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 pb-3 border-b border-gray-200 text-[#1a4d3a]">
            Придатність для міських умов
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-[#4a6b5a] mb-1.5 font-medium">Тип ґрунту</div>
              <div className="text-base text-[#1a4d3a] font-medium">{plant.soilType}</div>
            </div>
            <div>
              <div className="text-sm text-[#4a6b5a] mb-1.5 font-medium">Потреба в освітленні</div>
              <div className="text-base text-[#1a4d3a] font-medium">{plant.sunlightReq}</div>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <div className="text-sm text-[#4a6b5a] mb-1.5 font-medium">Діапазон висоти</div>
              <div className="text-base text-[#1a4d3a] font-medium">{plant.height}</div>
            </div>
          </div>
        </section>

        {/* Recovery & Resilience */}
        <section className="mb-8 bg-white">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 pb-3 border-b border-gray-200 text-[#1a4d3a]">
            Відновлення та стійкість
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-[#4a6b5a] mb-1.5 font-medium">Швидкість відновлення</div>
              <div className="text-base text-[#1a4d3a] font-medium">{plant.recoverySpeed}</div>
            </div>
            <div>
              <div className="text-sm text-[#4a6b5a] mb-1.5 font-medium">Швидкість поширення</div>
              <div className="text-base text-[#1a4d3a] font-medium">{plant.spreadSpeed}</div>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <div className="text-sm text-[#4a6b5a] mb-1.5 font-medium">Загальна стійкість</div>
              <div className="text-base text-[#1a4d3a] font-medium">{plant.resilience}</div>
            </div>
          </div>
        </section>

        {/* Recommendation Explanation */}
        <section className="mb-8 p-6 bg-[#f8f8f8] rounded-lg">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-[#1a4d3a]">
            Чому ця рослина підходить
          </h3>
          <p className="text-base text-[#1a4d3a] leading-relaxed">
            {plant.explanation}
          </p>
        </section>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="w-full min-h-[44px] sm:min-h-[48px] border border-gray-300 text-[#1a4d3a] py-2.5 sm:py-3 px-4 sm:px-6 text-base font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors rounded-lg"
        >
          Повернутися до результатів
        </button>
      </div>

      <Footer />
    </div>
  );
}