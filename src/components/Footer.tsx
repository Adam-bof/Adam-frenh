import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#060910] py-12 text-xs text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-emerald-500/20 text-emerald-400 font-bold text-xs">
            LC
          </div>
          <span className="font-bold text-white text-sm">
            Ledger<span className="text-emerald-400">Chaser</span>
          </span>
          <span className="text-slate-600">·</span>
          <span>The Zero-Login Document Chaser for Bookkeepers</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a href="#how-it-works" className="hover:text-white transition-colors">
            Workflow
          </a>
          <a href="#interactive-simulator" className="hover:text-white transition-colors">
            Simulator
          </a>
          <a href="#roi-calculator" className="hover:text-white transition-colors">
            ROI Calculator
          </a>
          <a href="#pricing" className="hover:text-white transition-colors">
            Pricing
          </a>
        </div>

        {/* Copyright */}
        <div className="text-slate-500">
          © {new Date().getFullYear()} LedgerChaser. Built for independent bookkeeping professionals.
        </div>
      </div>
    </footer>
  );
};
