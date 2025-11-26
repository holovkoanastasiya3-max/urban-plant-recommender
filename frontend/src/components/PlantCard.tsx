import { Plant } from '../App';

type PlantCardProps = {
  plant: Plant;
  onClick: () => void;
};

export function PlantCard({ plant, onClick }: PlantCardProps) {
  return (
    <div
      onClick={onClick}
      className="border border-stone-200 p-4 sm:p-6 bg-white hover:shadow-md cursor-pointer transition-all"
      style={{ 
        borderColor: '#d6d3d1',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#A9B89E';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#d6d3d1';
      }}
    >
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        {/* Image Placeholder */}
        <div className="w-full sm:w-32 h-32 flex-shrink-0 border border-stone-200 bg-stone-50 flex items-center justify-center">
          <span className="text-stone-400 text-center px-2 text-xs">
            [Фото рослини]
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h2 className="mb-1 text-slate-800">
            <em>{plant.scientificName}</em>
          </h2>
          <h3 className="mb-4 text-slate-600">
            {plant.commonName}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2 mb-4 text-sm sm:text-base">
            <div className="text-slate-700">
              <span className="text-slate-500">Морозостійкість:</span> {plant.coldTolerance}
            </div>
            <div className="text-slate-700">
              <span className="text-slate-500">Толерантність до забруднення:</span> {plant.pollutionTolerance}
            </div>
            <div className="text-slate-700">
              <span className="text-slate-500">Швидкість відновлення:</span> {plant.recoverySpeed}
            </div>
            <div className="text-slate-700">
              <span className="text-slate-500">Освітлення:</span> {plant.sunlightReq}
            </div>
          </div>

          <p className="text-slate-600 border-l-2 pl-4 text-sm sm:text-base" style={{ borderColor: '#A9B89E' }}>
            {plant.explanation}
          </p>
        </div>
      </div>
    </div>
  );
}