import { Leaf } from 'lucide-react';

type HeaderProps = {
  onNavigateHome: () => void;
  onNavigateToForm?: () => void;
  hideStartButton?: boolean;
};

export function Header({ onNavigateHome, onNavigateToForm, hideStartButton = false }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-6 py-3 sm:py-4 flex items-center justify-between">
        <button 
          onClick={onNavigateHome}
          className="flex items-center gap-2 hover:opacity-70 active:opacity-50 transition-opacity min-h-[44px] touch-manipulation"
        >
          <Leaf className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#A9B89E' }} />
          <span className="text-[#1a4d3a] text-sm sm:text-base md:text-lg font-medium">ГрінРеконструкція</span>
        </button>
        {onNavigateToForm && !hideStartButton && (
          <button
            onClick={onNavigateToForm}
            className="min-h-[44px] px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-[#1a4d3a] hover:text-[#0f2e1f] active:opacity-70 transition-colors rounded-lg touch-manipulation"
          >
            Почати підбір
          </button>
        )}
      </div>
    </header>
  );
}