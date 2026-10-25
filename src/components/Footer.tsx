import React from 'react';
import { Lock, Mail, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#060910] py-12 text-xs text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand & Mission */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-emerald-500/20 text-emerald-400 font-bold text-xs">
                LC
              </div>
              <span className="font-bold text-white text-sm">
                Ledger<span className="text-emerald-400">Chaser</span>
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300">The Zero-Login Document Chaser for Bookkeepers</span>
            </div>
            <p className="mt-2 text-slate-400 max-w-md">
              Built to eradicate unbillable administrative chasing and end the month-end cat-herding for solo practitioners.
            </p>
          </div>

          {/* Direct Founder Contact Box */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs">
            <span className="text-slate-400 block text-[11px]">Questions about firm workflows or custom integrations?</span>
            <a
              href="mailto:frenkhood@gmail.com"
              className="mt-1 flex items-center gap-2 text-emerald-400 font-semibold hover:underline"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Contact Founder: frenkhood@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Security & Privacy Badges Strip */}
        <div className="py-4 border-y border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Bank-Grade 256-bit TLS/AES Encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Zero Data Reselling · Strict Client Privacy</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Direct Encrypted Cloud Storage Pass-through</span>
          </div>
        </div>

        {/* Bottom Copyright & Navigation Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
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

          <div>
            © {new Date().getFullYear()} LedgerChaser. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
