import React from 'react';
import { Sprout, Camera, BookOpen, Calculator, History } from 'lucide-react';

interface NavbarProps {
  activeTab: 'scan' | 'encyclopedia' | 'calculator' | 'history';
  setActiveTab: (tab: 'scan' | 'encyclopedia' | 'calculator' | 'history') => void;
  onOpenLiveCamera: () => void;
  historyCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenLiveCamera,
  historyCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Clean Brand Wordmark */}
        <button
          onClick={() => setActiveTab('scan')}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-700 flex items-center justify-center text-white shadow-sm group-hover:bg-emerald-800 transition-colors">
            <Sprout className="w-5 h-5 text-emerald-100" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 block leading-tight">
              TomatoGuard
            </span>
            <span className="text-[11px] font-medium text-slate-500 tracking-wide block leading-none">
              Plant Disease Diagnostic System
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => setActiveTab('scan')}
            className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'scan'
                ? 'text-emerald-800 bg-emerald-50/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Scan & Diagnose
          </button>

          <button
            onClick={() => setActiveTab('encyclopedia')}
            className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'encyclopedia'
                ? 'text-emerald-800 bg-emerald-50/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4 text-slate-400" />
            Field Encyclopedia
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'calculator'
                ? 'text-emerald-800 bg-emerald-50/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Calculator className="w-4 h-4 text-slate-400" />
            Dosage Calculator
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'text-emerald-800 bg-emerald-50/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <History className="w-4 h-4 text-slate-400" />
            Records
            {historyCount > 0 && (
              <span className="font-mono text-xs px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded text-[11px] font-semibold tabular-nums">
                {historyCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenLiveCamera}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors shadow-xs whitespace-nowrap cursor-pointer"
          >
            <Camera className="w-4 h-4 text-emerald-100" />
            <span className="hidden sm:inline">Launch Camera</span>
            <span className="sm:hidden">Camera</span>
          </button>
        </div>
      </div>

      {/* Mobile Secondary Navigation Row */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-200/80 px-2 py-1.5 bg-slate-50 text-xs font-medium text-slate-600">
        <button
          onClick={() => setActiveTab('scan')}
          className={`py-1 px-2.5 rounded ${activeTab === 'scan' ? 'text-emerald-800 font-semibold' : ''}`}
        >
          Diagnose
        </button>
        <button
          onClick={() => setActiveTab('encyclopedia')}
          className={`py-1 px-2.5 rounded ${activeTab === 'encyclopedia' ? 'text-emerald-800 font-semibold' : ''}`}
        >
          Field Guide
        </button>
        <button
          onClick={() => setActiveTab('calculator')}
          className={`py-1 px-2.5 rounded ${activeTab === 'calculator' ? 'text-emerald-800 font-semibold' : ''}`}
        >
          Calculator
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`py-1 px-2.5 rounded ${activeTab === 'history' ? 'text-emerald-800 font-semibold' : ''}`}
        >
          Records ({historyCount})
        </button>
      </div>
    </header>
  );
};
