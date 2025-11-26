import { Leaf } from 'lucide-react';

type HeaderProps = {
  onNavigateHome: () => void;
  onNavigateToForm?: () => void;
  hideStartButton?: boolean;
};

export function Header({ onNavigateHome, onNavigateToForm, hideStartButton = false }: HeaderProps) {
  return (
    <header className="border-b border-stone-300 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <button 
          onClick={onNavigateHome}
          className="flex items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <Leaf className="w-6 h-6" style={{ color: '#A9B89E' }} />
          <span className="text-slate-800 text-sm sm:text-base">ГрінРеконструкція</span>
        </button>
        {onNavigateToForm && !hideStartButton && (
          <button
            onClick={onNavigateToForm}
            className="px-3 sm:px-4 py-2 text-sm sm:text-base text-slate-700 hover:text-slate-900 transition-colors"
          >
            Почати підбір
          </button>
        )}
      </div>
    </header>
  );
}