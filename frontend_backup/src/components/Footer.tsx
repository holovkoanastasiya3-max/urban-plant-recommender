import { Leaf } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[#4a6b5a]">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4" style={{ color: '#A9B89E' }} />
            <span className="text-center md:text-left text-sm sm:text-base">ГрінРеконструкція — система підбору рослин для відновлення міст</span>
          </div>
          <div className="text-[#4a6b5a] text-sm sm:text-base">
            2025
          </div>
        </div>
      </div>
    </footer>
  );
}