import React, { useState } from 'react';
import { FormData } from '../App';
import { Header } from './Header';
import { Footer } from './Footer';

type InputScreenProps = {
  onRecommend: (data: FormData) => void;
  onNavigateHome: () => void;
  onNavigateToForm: () => void;
  loading?: boolean;
  error?: string | null;
};

export function InputScreen({
  onRecommend,
  onNavigateHome,
  onNavigateToForm,
  loading = false,
  error = null,
}: InputScreenProps) {
  // Значення одразу в форматі, який чекає бекенд
  const [soilType, setSoilType] = useState('chernozem');
  const [minTemp, setMinTemp] = useState('');
  const [droughtResistance, setDroughtResistance] = useState(3);
  const [sunlight, setSunlight] = useState('full_sun');
  const [biodiversitySupport, setBiodiversitySupport] = useState(3);
  const [growthSpeed, setGrowthSpeed] = useState('3');
  const [ecologicalRecovery, setEcologicalRecovery] = useState('3');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRecommend({
      soilType,
      minTemp,
      droughtResistance: String(droughtResistance),
      sunlight,
      biodiversitySupport: String(biodiversitySupport),
      growthSpeed,
      ecologicalRecovery,
    });
  };

  const droughtLabels = ['Низька', 'Помірно низька', 'Середня', 'Помірно висока', 'Висока'];
  const biodiversityLabels = ['Низька', 'Помірно низька', 'Середня', 'Помірно висока', 'Висока'];
  const droughtEmojis = ['🏜️', '🌾', '🌵', '🌿', '🪴'];
  const biodiversityEmojis = ['🌱', '🌿', '🐛', '🐝', '🦋'];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header onNavigateHome={onNavigateHome} onNavigateToForm={onNavigateToForm} hideStartButton={true} />

      <div className="w-full max-w-2xl mx-auto px-4 sm:px-5 md:px-6 py-8 sm:py-10 md:py-12 flex-1">
        <header className="mb-6 sm:mb-8 border-b border-gray-200 pb-4 sm:pb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-[#1a4d3a]">Форма підбору рослин</h1>
          <p className="text-base sm:text-lg text-[#1a4d3a] leading-relaxed">
            Введіть екологічні критерії для отримання рекомендацій
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {/* Тип ґрунту */}
          <div className="bg-white">
            <label htmlFor="soilType" className="block mb-2 text-base font-medium text-[#1a4d3a]">
              Тип ґрунту *
            </label>
            <select
              id="soilType"
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="w-full min-h-[44px] border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#A9B89E] focus:border-[#A9B89E] rounded-lg text-base"
              required
            >
              {/* значення = коди, які чекає бекенд */}
              <option value="chernozem">Чорнозем</option>
              <option value="grey_forest">Сірий лісовий</option>
              <option value="podzolic">Дерново-підзолистий</option>
              <option value="meadow">Лучний</option>
              <option value="solonets">Солонці</option>
              <option value="sandy">Піщовик</option>
              <option value="disturbed">Урбанізований / порушений ґрунт</option>
            </select>
          </div>

          {/* Морозостійкість */}
          <div className="bg-white">
            <label htmlFor="minTemp" className="block mb-2 text-base font-medium text-[#1a4d3a]">
              Морозостійкість (мінімальна температура, °C) *
            </label>
            <input
              type="number"
              id="minTemp"
              value={minTemp}
              onChange={(e) => setMinTemp(e.target.value)}
              className="w-full min-h-[44px] border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#A9B89E] focus:border-[#A9B89E] rounded-lg text-base"
              required
              placeholder="Наприклад: −30"
            />
          </div>

          {/* Посухостійкість – слайдер із емодзі */}
          <div className="bg-white">
            <label htmlFor="droughtResistance" className="block mb-3 text-base font-medium text-[#1a4d3a]">
              Посухостійкість
            </label>
            <div className="space-y-3 sm:space-y-4">
              <div className="relative px-1">
                <input
                  type="range"
                  id="droughtResistance"
                  min="1"
                  max="5"
                  value={droughtResistance}
                  onChange={(e) => setDroughtResistance(Number(e.target.value))}
                  className="w-full h-2.5 sm:h-3 bg-stone-200 appearance-none cursor-pointer slider-with-emoji touch-none"
                  style={{
                    background: `linear-gradient(to right, #A9B89E 0%, #A9B89E ${
                      (droughtResistance - 1) * 25
                    }%, #e7e5e4 ${(droughtResistance - 1) * 25}%, #e7e5e4 100%)`,
                  }}
                />
                <div
                  className="absolute pointer-events-none text-2xl sm:text-3xl"
                  style={{
                    left: `calc(${(droughtResistance - 1) * 25}% - 16px)`,
                    top: '-12px',
                  }}
                >
                  {droughtEmojis[droughtResistance - 1]}
                </div>
              </div>
              <div className="flex justify-between text-slate-600 px-1">
                <span className="text-xs sm:text-sm font-medium">{droughtLabels[droughtResistance - 1]}</span>
                <span className="text-xs sm:text-sm font-medium">{droughtResistance}/5</span>
              </div>
            </div>
          </div>

          {/* Світлолюбивість */}
          <div className="bg-white">
            <label htmlFor="sunlight" className="block mb-2 text-base font-medium text-[#1a4d3a]">
              Світлолюбивість *
            </label>
            <select
              id="sunlight"
              value={sunlight}
              onChange={(e) => setSunlight(e.target.value)}
              className="w-full min-h-[44px] border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#A9B89E] focus:border-[#A9B89E] rounded-lg text-base"
              required
            >
              {/* теж одразу у форматі бекенду */}
              <option value="full_sun">Повне сонце</option>
              <option value="partial_shade">Напівтінь</option>
              <option value="shade">Тінь</option>
            </select>
          </div>

          {/* Підтримка біорізноманіття – слайдер із емодзі */}
          <div className="bg-white">
            <label htmlFor="biodiversitySupport" className="block mb-3 text-base font-medium text-[#1a4d3a]">
              Підтримка біорізноманіття
            </label>
            <div className="space-y-3 sm:space-y-4">
              <div className="relative px-1">
                <input
                  type="range"
                  id="biodiversitySupport"
                  min="1"
                  max="5"
                  value={biodiversitySupport}
                  onChange={(e) => setBiodiversitySupport(Number(e.target.value))}
                  className="w-full h-2.5 sm:h-3 bg-stone-200 appearance-none cursor-pointer slider-with-emoji touch-none"
                  style={{
                    background: `linear-gradient(to right, #A9B89E 0%, #A9B89E ${
                      (biodiversitySupport - 1) * 25
                    }%, #e7e5e4 ${(biodiversitySupport - 1) * 25}%, #e7e5e4 100%)`,
                  }}
                />
                <div
                  className="absolute pointer-events-none text-2xl sm:text-3xl"
                  style={{
                    left: `calc(${(biodiversitySupport - 1) * 25}% - 16px)`,
                    top: '-12px',
                  }}
                >
                  {biodiversityEmojis[biodiversitySupport - 1]}
                </div>
              </div>
              <div className="flex justify-between text-slate-600 px-1">
                <span className="text-xs sm:text-sm font-medium">
                  {biodiversityLabels[biodiversitySupport - 1]}
                </span>
                <span className="text-xs sm:text-sm font-medium">{biodiversitySupport}/5</span>
              </div>
            </div>
          </div>

          {/* Швидкість росту */}
          <div className="bg-white">
            <label htmlFor="growthSpeed" className="block mb-2 text-base font-medium text-[#1a4d3a]">
              Швидкість росту (1–5) *
            </label>
            <select
              id="growthSpeed"
              value={growthSpeed}
              onChange={(e) => setGrowthSpeed(e.target.value)}
              className="w-full min-h-[44px] border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#A9B89E] focus:border-[#A9B89E] rounded-lg text-base"
              required
            >
              <option value="1">1 - Дуже повільна</option>
              <option value="2">2 - Повільна</option>
              <option value="3">3 - Середня</option>
              <option value="4">4 - Швидка</option>
              <option value="5">5 - Дуже швидка</option>
            </select>
          </div>

          {/* Швидкість екологічного відновлення */}
          <div className="bg-white">
            <label htmlFor="ecologicalRecovery" className="block mb-2 text-base font-medium text-[#1a4d3a]">
              Швидкість екологічного відновлення (1–5) *
            </label>
            <select
              id="ecologicalRecovery"
              value={ecologicalRecovery}
              onChange={(e) => setEcologicalRecovery(e.target.value)}
              className="w-full min-h-[44px] border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#A9B89E] focus:border-[#A9B89E] rounded-lg text-base"
              required
            >
              <option value="1">1 - Дуже повільна</option>
              <option value="2">2 - Повільна</option>
              <option value="3">3 - Середня</option>
              <option value="4">4 - Швидка</option>
              <option value="5">5 - Дуже швидка</option>
            </select>
          </div>

          {/* Кнопка сабміту */}
          <button
            type="submit"
            disabled={loading}
            className="w-full min-h-[48px] sm:min-h-[52px] text-white py-3 sm:py-3.5 px-6 sm:px-8 text-base sm:text-lg font-medium hover:bg-[#95a589] active:bg-[#85947a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
            style={{ backgroundColor: '#A9B89E' }}
          >
            {loading ? 'Завантаження...' : 'Отримати рекомендації'}
          </button>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              <p className="text-base">{error}</p>
            </div>
          )}
        </form>
      </div>

      <Footer />
    </div>
  );
}