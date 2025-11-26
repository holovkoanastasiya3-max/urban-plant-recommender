import { Plant } from '../App';

type PlantCardProps = {
  plant: Plant;
  onClick: () => void;
};

export function PlantCard({ plant, onClick }: PlantCardProps) {
  return (
    <div
      onClick={onClick}
      className="border border-gray-200 p-5 sm:p-6 bg-white hover:shadow-md active:scale-[0.98] cursor-pointer transition-all rounded-lg"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#A9B89E';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#e5e5e5';
      }}
    >
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
        {/* Image Placeholder */}
        <div className="w-full sm:w-32 h-32 flex-shrink-0 border border-gray-200 bg-[#f8f8f8] flex items-center justify-center rounded-lg">
          <span className="text-gray-400 text-center px-2 text-sm">
            [Фото рослини]
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h2 className="mb-1.5 text-lg sm:text-xl font-semibold text-[#1a4d3a]">
            <em className="not-italic">{plant.scientificName}</em>
          </h2>
          <h3 className="mb-4 text-base sm:text-lg text-[#1a4d3a]">
            {plant.commonName}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-6 gap-y-2 mb-4 text-sm sm:text-base">
            <div className="text-[#1a4d3a]">
              <span className="text-[#4a6b5a] font-medium">Морозостійкість:</span> <span className="font-medium">{plant.coldTolerance}</span>
            </div>
            <div className="text-[#1a4d3a]">
              <span className="text-[#4a6b5a] font-medium">Толерантність до забруднення:</span> <span className="font-medium">{plant.pollutionTolerance}</span>
            </div>
            <div className="text-[#1a4d3a]">
              <span className="text-[#4a6b5a] font-medium">Швидкість відновлення:</span> <span className="font-medium">{plant.recoverySpeed}</span>
            </div>
            <div className="text-[#1a4d3a]">
              <span className="text-[#4a6b5a] font-medium">Освітлення:</span> <span className="font-medium">{plant.sunlightReq}</span>
            </div>
          </div>

          <p className="text-[#1a4d3a] border-l-4 pl-4 text-sm sm:text-base leading-relaxed" style={{ borderColor: '#A9B89E' }}>
            {plant.explanation}
          </p>
        </div>
      </div>
    </div>
  );
}