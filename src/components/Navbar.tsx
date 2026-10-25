import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenFounderModal: () => void;
  remainingSpots: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenFounderModal, remainingSpots }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#070B12]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark */}
        <a href="#" className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold transition-all group-hover:border-emerald-400 group-hover:bg-emerald-500/20">
            LC
          </div>
          <span className="text-lg font-bold tracking-tight text-white font-sans">
            Ledger<span className="text-emerald-400">Chaser</span>
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#how-it-works" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Workflow
          </a>
          <a href="#interactive-simulator" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Live Simulator
          </a>
          <a href="#roi-calculator" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            ROI Calculator
          </a>
          <a href="#comparison" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Comparison
          </a>
          <a href="#pricing" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Pricing
          </a>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenFounderModal}
            className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 transition-all hover:bg-emerald-400 active:scale-95 whitespace-nowrap shrink-0 shadow-lg shadow-emerald-500/20"
          >
            <span>Claim Founder Rate ($19/mo)</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
