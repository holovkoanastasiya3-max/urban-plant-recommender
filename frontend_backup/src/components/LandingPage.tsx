import { Leaf, TreeDeciduous, Sprout, Shield } from 'lucide-react';

type LandingPageProps = {
  onStart: () => void;
};

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col w-full">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6" style={{ color: '#A9B89E' }} />
            <span className="text-[#1a4d3a] text-base font-medium">ГрінРеконструкція</span>
          </div>
          <button
            onClick={onStart}
            className="px-4 py-2 text-base text-[#1a4d3a] hover:text-[#0f2e1f] transition-colors font-medium"
          >
            Почати підбір
          </button>
        </div>
      </header>

      {/* Main Content Container - Centered */}
      <main className="flex-1 w-full flex flex-col items-center">
        <div className="w-full max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          
          {/* Hero Section - Centered */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#1a4d3a] mb-5 max-w-4xl mx-auto leading-tight opacity-90">
              Розумні рекомендації рослин для міського озеленення в умовах війни
            </h1>
            <p className="text-base sm:text-lg text-[#1a4d3a] max-w-2xl mx-auto mb-8 leading-relaxed opacity-80">
              Алгоритмічна система підбору рослин для відновлення зелених зон у містах. 
              Враховує екологічні параметри, умови ґрунту та критерії стійкості до стресових факторів.
            </p>
            <button
              onClick={onStart}
              className="px-8 py-3.5 text-base font-medium text-white hover:bg-[#95a589] active:bg-[#85947a] transition-colors inline-flex items-center justify-center gap-2 rounded-lg"
              style={{ backgroundColor: '#A9B89E' }}
            >
              <Sprout className="w-5 h-5" />
              Підібрати рослини
            </button>
          </div>

          {/* Context Block - Centered */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-xl sm:text-2xl font-medium text-[#1a4d3a] mb-4 text-center">Контекст і призначення</h2>
            <div className="max-w-prose mx-auto text-center">
              <p className="text-base text-[#1a4d3a] mb-4 leading-relaxed opacity-80">
                Війна завдає значної шкоди міській інфраструктурі та екосистемам. Зелені зони зазнають руйнувань, 
                ґрунти забруднюються, а традиційні методи озеленення часто не враховують нові реалії: 
                порушений склад ґрунту, обмежені ресурси для догляду, необхідність швидкого відновлення біорізноманіття.
              </p>
              <p className="text-base text-[#1a4d3a] leading-relaxed opacity-80">
                Ця система допомагає обирати рослини на основі науково обґрунтованих критеріїв: 
                стійкості до забруднень, здатності до швидкого відновлення, підтримки локальної фауни та 
                адаптації до складних урбанізованих умов.
              </p>
            </div>
          </div>

          {/* Key Features - 2x2 Grid, Centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-12 sm:mb-16 md:mb-20">
            <div className="bg-white border border-gray-200 p-5 sm:p-6 rounded-md">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-md" style={{ backgroundColor: '#E9EEE8' }}>
                  <TreeDeciduous className="w-5 h-5" style={{ color: '#A9B89E' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-medium text-[#1a4d3a] mb-2">Багатокритеріальний підбір</h3>
                  <p className="text-sm text-[#1a4d3a] leading-relaxed opacity-80">
                    Враховує морозостійкість, посухостійкість, тип ґрунту, світлолюбивість та швидкість відновлення.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-5 sm:p-6 rounded-md">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-md" style={{ backgroundColor: '#E9EEE8' }}>
                  <Shield className="w-5 h-5" style={{ color: '#A9B89E' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-medium text-[#1a4d3a] mb-2">Стійкість до стресових факторів</h3>
                  <p className="text-sm text-[#1a4d3a] leading-relaxed opacity-80">
                    Рекомендації враховують здатність рослин витримувати забруднення, порушення ґрунту та обмежений догляд.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-5 sm:p-6 rounded-md">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-md" style={{ backgroundColor: '#E9EEE8' }}>
                  <Sprout className="w-5 h-5" style={{ color: '#A9B89E' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-medium text-[#1a4d3a] mb-2">Підтримка біорізноманіття</h3>
                  <p className="text-sm text-[#1a4d3a] leading-relaxed opacity-80">
                    Система рекомендує види, які забезпечують середовище для запилювачів, птахів та інших організмів.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-5 sm:p-6 rounded-md">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-md" style={{ backgroundColor: '#E9EEE8' }}>
                  <Leaf className="w-5 h-5" style={{ color: '#A9B89E' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-medium text-[#1a4d3a] mb-2">Адаптація до локальних умов</h3>
                  <p className="text-sm text-[#1a4d3a] leading-relaxed opacity-80">
                    Фокус на види, адаптовані до чорноземів, сірих лісових ґрунтів та порушених урбанізованих територій.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section - Centered */}
          <div className="text-center bg-[#F7F8F6] p-8 sm:p-10 rounded-lg mb-8">
            <h2 className="text-2xl sm:text-3xl font-medium text-[#1a4d3a] mb-4">Готові почати?</h2>
            <p className="text-base sm:text-lg text-[#1a4d3a] mb-8 max-w-lg mx-auto leading-relaxed opacity-80">
              Введіть параметри вашої ділянки та отримайте персоналізовані рекомендації 
              з переліком відповідних видів рослин.
            </p>
            <button
              onClick={onStart}
              className="px-8 py-3 text-base font-medium text-white hover:bg-[#95a589] active:bg-[#85947a] transition-colors rounded-lg"
              style={{ backgroundColor: '#A9B89E' }}
            >
              Перейти до форми підбору
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-auto w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[#4a6b5a]">
            <div className="flex items-center gap-2">
              <Leaf className="w-3 h-3" style={{ color: '#A9B89E' }} />
              <span className="text-center md:text-left text-sm opacity-80">ГрінРеконструкція — система підбору рослин для відновлення міст</span>
            </div>
            <div className="text-[#4a6b5a] text-sm opacity-80">
              2025
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
