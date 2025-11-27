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
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header onNavigateHome={onNavigateHome} onNavigateToForm={onNavigateToForm} hideStartButton={true} />

      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1">
        <header className="mb-6 sm:mb-8 border-b border-stone-300 pb-4 sm:pb-6">
          <h1 className="mb-2 text-slate-800">Форма підбору рослин</h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Введіть екологічні критерії для отримання рекомендацій
          </p>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-800">
            <p className="font-medium mb-1">Помилка</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Тип ґрунту */}
          <div className="border border-stone-200 p-5 bg-white">
            <label htmlFor="soilType" className="block mb-2 text-slate-700">
              Тип ґрунту *
            </label>
            <select
              id="soilType"
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="w-full border border-stone-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#A9B89E]"
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
          <div className="border border-stone-200 p-5 bg-white">
            <label htmlFor="minTemp" className="block mb-2 text-slate-700">
              Морозостійкість (мінімальна температура, °C) *
            </label>
            <input
              type="number"
              id="minTemp"
              value={minTemp}
              onChange={(e) => setMinTemp(e.target.value)}
              className="w-full border border-stone-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#A9B89E]"
              required
              placeholder="Наприклад: −30"
            />
          </div>

          {/* Посухостійкість – слайдер із емодзі */}
          <div className="border border-stone-200 p-5 bg-white">
            <label htmlFor="droughtResistance" className="block mb-3 text-slate-700">
              Посухостійкість
            </label>
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="range"
                  id="droughtResistance"
                  min="1"
                  max="5"
                  value={droughtResistance}
                  onChange={(e) => setDroughtResistance(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 appearance-none cursor-pointer slider-with-emoji"
                  style={{
                    background: `linear-gradient(to right, #A9B89E 0%, #A9B89E ${
                      (droughtResistance - 1) * 25
                    }%, #e7e5e4 ${(droughtResistance - 1) * 25}%, #e7e5e4 100%)`,
                  }}
                />
                <div
                  className="absolute pointer-events-none text-xl"
                  style={{
                    left: `calc(${(droughtResistance - 1) * 25}% - 12px)`,
                    top: '-8px',
                  }}
                >
                  {droughtEmojis[droughtResistance - 1]}
                </div>
              </div>
              <div className="flex justify-between text-slate-600">
                <span className="text-xs">{droughtLabels[droughtResistance - 1]}</span>
                <span className="text-xs">{droughtResistance}/5</span>
              </div>
            </div>
          </div>

          {/* Світлолюбивість */}
          <div className="border border-stone-200 p-5 bg-white">
            <label htmlFor="sunlight" className="block mb-2 text-slate-700">
              Світлолюбивість *
            </label>
            <select
              id="sunlight"
              value={sunlight}
              onChange={(e) => setSunlight(e.target.value)}
              className="w-full border border-stone-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#A9B89E]"
              required
            >
              {/* теж одразу у форматі бекенду */}
              <option value="full_sun">Повне сонце</option>
              <option value="partial_shade">Напівтінь</option>
              <option value="shade">Тінь</option>
            </select>
          </div>

          {/* Підтримка біорізноманіття – слайдер із емодзі */}
          <div className="border border-stone-200 p-5 bg-white">
            <label htmlFor="biodiversitySupport" className="block mb-3 text-slate-700">
              Підтримка біорізноманіття
            </label>
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="range"
                  id="biodiversitySupport"
                  min="1"
                  max="5"
                  value={biodiversitySupport}
                  onChange={(e) => setBiodiversitySupport(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 appearance-none cursor-pointer slider-with-emoji"
                  style={{
                    background: `linear-gradient(to right, #A9B89E 0%, #A9B89E ${
                      (biodiversitySupport - 1) * 25
                    }%, #e7e5e4 ${(biodiversitySupport - 1) * 25}%, #e7e5e4 100%)`,
                  }}
                />
                <div
                  className="absolute pointer-events-none text-xl"
                  style={{
                    left: `calc(${(biodiversitySupport - 1) * 25}% - 12px)`,
                    top: '-8px',
                  }}
                >
                  {biodiversityEmojis[biodiversitySupport - 1]}
                </div>
              </div>
              <div className="flex justify-between text-slate-600">
                <span className="text-xs">
                  {biodiversityLabels[biodiversitySupport - 1]}
                </span>
                <span className="text-xs">{biodiversitySupport}/5</span>
              </div>
            </div>
          </div>

          {/* Швидкість росту */}
          <div className="border border-stone-200 p-5 bg-white">
            <label htmlFor="growthSpeed" className="block mb-2 text-slate-700">
              Швидкість росту (1–5) *
            </label>
            <select
              id="growthSpeed"
              value={growthSpeed}
              onChange={(e) => setGrowthSpeed(e.target.value)}
              className="w-full border border-stone-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#A9B89E]"
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
          <div className="border border-stone-200 p-5 bg-white">
            <label htmlFor="ecologicalRecovery" className="block mb-2 text-slate-700">
              Швидкість екологічного відновлення (1–5) *
            </label>
            <select
              id="ecologicalRecovery"
              value={ecologicalRecovery}
              onChange={(e) => setEcologicalRecovery(e.target.value)}
              className="w-full border border-stone-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#A9B89E]"
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
            className="w-full text-white py-3 px-6 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#A9B89E' }}
          >
            {loading ? 'Завантаження...' : 'Отримати рекомендації'}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}