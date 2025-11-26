import { Leaf, TreeDeciduous, Sprout, Shield } from 'lucide-react';

type LandingPageProps = {
  onStart: () => void;
};

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-stone-300 bg-white/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6" style={{ color: '#A9B89E' }} />
            <span className="text-slate-800 text-sm sm:text-base">ГрінРеконструкція</span>
          </div>
          <button
            onClick={onStart}
            className="px-3 sm:px-4 py-2 text-sm sm:text-base text-slate-700 hover:text-slate-900 transition-colors"
          >
            Почати підбір
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-24 flex-1">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-slate-900 mb-4 max-w-3xl mx-auto px-4">
            Розумні рекомендації рослин для міського озеленення в умовах війни
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto mb-6 sm:mb-8 px-4 text-sm sm:text-base">
            Алгоритмічна система підбору рослин для відновлення зелених зон у містах. 
            Враховує екологічні параметри, умови ґрунту та критерії стійкості до стресових факторів.
          </p>
          <button
            onClick={onStart}
            className="px-6 sm:px-8 py-3 text-white hover:opacity-90 transition-opacity inline-flex items-center gap-2 text-sm sm:text-base"
            style={{ backgroundColor: '#A9B89E' }}
          >
            <Sprout className="w-4 h-4 sm:w-5 sm:h-5" />
            Підібрати рослини
          </button>
        </div>

        {/* Context Block */}
        <div className="bg-white border border-stone-200 p-6 sm:p-8 mb-12 sm:mb-16">
          <h2 className="text-slate-800 mb-4">Контекст і призначення</h2>
          <p className="text-slate-600 mb-4 text-sm sm:text-base">
            Війна завдає значної шкоди міській інфраструктурі та екосистемам. Зелені зони зазнають руйнувань, 
            ґрунти забруднюються, а традиційні методи озеленення часто не враховують нові реалії: 
            порушений склад ґрунту, обмежені ресурси для догляду, необхідність швидкого відновлення біорізноманіття.
          </p>
          <p className="text-slate-600 text-sm sm:text-base">
            Ця система допомагає обирати рослини на основі науково обґрунтованих критеріїв: 
            стійкості до забруднень, здатності до швидкого відновлення, підтримки локальної фауни та 
            адаптації до складних урбанізованих умов.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16">
          <div className="bg-white border border-stone-200 p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#A9B89E20' }}>
                <TreeDeciduous className="w-5 h-5" style={{ color: '#A9B89E' }} />
              </div>
              <div>
                <h3 className="text-slate-800 mb-2">Багатокритеріальний підбір</h3>
                <p className="text-slate-600 text-sm sm:text-base">
                  Враховує морозостійкість, посухостійкість, тип ґрунту, світлолюбивість та швидкість відновлення.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-stone-200 p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#A9B89E20' }}>
                <Shield className="w-5 h-5" style={{ color: '#A9B89E' }} />
              </div>
              <div>
                <h3 className="text-slate-800 mb-2">Стійкість до стресових факторів</h3>
                <p className="text-slate-600 text-sm sm:text-base">
                  Рекомендації враховують здатність рослин витримувати забруднення, порушення ґрунту та обмежений догляд.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-stone-200 p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#A9B89E20' }}>
                <Sprout className="w-5 h-5" style={{ color: '#A9B89E' }} />
              </div>
              <div>
                <h3 className="text-slate-800 mb-2">Підтримка біорізноманіття</h3>
                <p className="text-slate-600 text-sm sm:text-base">
                  Система рекомендує види, які забезпечують середовище для запилювачів, птахів та інших організмів.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-stone-200 p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#A9B89E20' }}>
                <Leaf className="w-5 h-5" style={{ color: '#A9B89E' }} />
              </div>
              <div>
                <h3 className="text-slate-800 mb-2">Адаптація до локальних умов</h3>
                <p className="text-slate-600 text-sm sm:text-base">
                  Фокус на види, адаптовані до чорноземів, сірих лісових ґрунтів та порушених урбанізованих територій.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white border p-8 sm:p-12" style={{ borderColor: '#A9B89E' }}>
          <h2 className="text-slate-900 mb-3">Готові почати?</h2>
          <p className="text-slate-600 mb-6 max-w-xl mx-auto text-sm sm:text-base px-4">
            Введіть параметри вашої ділянки та отримайте персоналізовані рекомендації 
            з переліком відповідних видів рослин.
          </p>
          <button
            onClick={onStart}
            className="px-6 sm:px-8 py-3 text-white hover:opacity-90 transition-opacity text-sm sm:text-base"
            style={{ backgroundColor: '#A9B89E' }}
          >
            Перейти до форми підбору
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-300 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4" style={{ color: '#A9B89E' }} />
              <span className="text-center md:text-left text-sm sm:text-base">ГрінРеконструкція — система підбору рослин для відновлення міст</span>
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

