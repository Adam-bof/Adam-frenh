import React from 'react';
import { ArrowRight, Play, ShieldCheck, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenFounderModal: () => void;
  onScrollToSimulator: () => void;
  remainingSpots: number;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenFounderModal,
  onScrollToSimulator,
  remainingSpots,
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[250px] bg-blue-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Urgent Problem Banner */}
        <div className="inline-flex items-center gap-2 mb-6 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3.5 py-1.5 rounded-full">
          <Sparkles className="h-3.5 w-3.5" />
          <span>The Micro-SaaS built exclusively for solo bookkeepers & boutique firms</span>
        </div>

        {/* Main Headline with balanced wrap */}
        <h1 className="mx-auto max-w-4xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
          Stop Being the Human Alarm Clock for Missing Client Documents.
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
          Your small business clients hate creating portal accounts and remembering passwords. Send them a
          secure <strong>Zero-Login Magic Link</strong>. They upload bank statements and receipts in 30 seconds
          from their phone. Polite auto-reminders fire every 3 days until your books can close.
        </p>

        {/* Primary Action Row */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onScrollToSimulator}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-slate-950 transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-95"
          >
            <Play className="h-4 w-4 fill-slate-950" />
            <span>Test Live Dual-Perspective Sandbox</span>
          </button>

          <button
            onClick={onOpenFounderModal}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/25 active:scale-95"
          >
            <span>Lock In Founder Tier ($19/mo Lifetime)</span>
            <ArrowRight className="h-4 w-4 text-emerald-400" />
          </button>
        </div>

        {/* Founder Spots Counter & Guarantee */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
          <span className="font-semibold text-emerald-400 font-mono tabular-nums">{remainingSpots} spots remaining</span>
          <span aria-hidden="true">·</span>
          <span>Only 50 founder accounts available</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1 text-slate-300">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> 30-Day Money-Back Guarantee
          </span>
        </div>

        {/* Unboxed Proof Metadata Strip (Zero-Pill Compliance) */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
          <div className="flex flex-col">
            <span className="text-2xl font-bold font-mono tabular-nums text-white">68%</span>
            <span className="text-xs text-slate-400 mt-1">Of month-end delays caused by uncollected receipts</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold font-mono tabular-nums text-emerald-400">8.5 hrs</span>
            <span className="text-xs text-slate-400 mt-1">Average unbillable admin time saved per week</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold font-mono tabular-nums text-white">100%</span>
            <span className="text-xs text-slate-400 mt-1">Passwordless magic links for maximum client compliance</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold font-mono tabular-nums text-emerald-400">$29/mo</span>
            <span className="text-xs text-slate-400 mt-1">Flat rate with unlimited clients. Zero per-client fees</span>
          </div>
        </div>
      </div>
    </section>
  );
};
