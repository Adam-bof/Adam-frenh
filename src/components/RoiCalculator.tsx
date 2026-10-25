import React, { useState } from 'react';
import { ArrowUpRight, Calculator, CheckCircle2, DollarSign, TrendingUp } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenFounderModal: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenFounderModal }) => {
  const [clientCount, setClientCount] = useState<number>(20);
  const [hoursPerClient, setHoursPerClient] = useState<number>(1.5);
  const [hourlyRate, setHourlyRate] = useState<number>(75);

  // Math
  const monthlyHoursSaved = Math.round(clientCount * hoursPerClient);
  const monthlyValueSaved = monthlyHoursSaved * hourlyRate;
  const annualValueSaved = monthlyValueSaved * 12;
  const ledgerChaserCost = 29; // $29/mo
  const netMonthlyProfit = monthlyValueSaved - ledgerChaserCost;
  const roiPercentage = Math.round((netMonthlyProfit / ledgerChaserCost) * 100);

  return (
    <section id="roi-calculator" className="py-20 bg-[#090D16] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400">
            Hard Financial Proof
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Calculate How Much "Document Chasing" Costs Your Practice
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Every hour spent sending awkward follow-up emails is an hour you cannot bill to higher-value advisory or take on new clients.
          </p>
        </div>

        <div className="mt-14 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Column */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#0F172A] p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-8">
              {/* Slider 1: Client Count */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-white">Active Monthly Clients</label>
                  <span className="text-sm font-bold font-mono text-emerald-400 tabular-nums">
                    {clientCount} clients
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="70"
                  step="1"
                  value={clientCount}
                  onChange={e => setClientCount(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-white/10 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>5 (Solo Starter)</span>
                  <span>35 (Boutique Practice)</span>
                  <span>70+ (Scaling Firm)</span>
                </div>
              </div>

              {/* Slider 2: Hours Per Client */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-white">Hours Spent Chasing Per Client / Month</label>
                  <span className="text-sm font-bold font-mono text-emerald-400 tabular-nums">
                    {hoursPerClient} hrs / client
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3.5"
                  step="0.5"
                  value={hoursPerClient}
                  onChange={e => setHoursPerClient(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-white/10 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>0.5 hr (Organized)</span>
                  <span>1.5 hrs (Industry Average)</span>
                  <span>3.5 hrs (Chronic Procrastinators)</span>
                </div>
              </div>

              {/* Slider 3: Hourly Value */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-white">Your Billable Hourly Value</label>
                  <span className="text-sm font-bold font-mono text-emerald-400 tabular-nums">
                    ${hourlyRate} / hr
                  </span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="150"
                  step="5"
                  value={hourlyRate}
                  onChange={e => setHourlyRate(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-white/10 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>$40/hr</span>
                  <span>$75/hr</span>
                  <span>$150/hr (CPA Advisory)</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-xs text-slate-400 flex items-center gap-2">
              <Calculator className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Based on AccountingWEB time studies on unbillable month-end administrative overhead.</span>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-[#0F231D] to-[#0A1613] p-6 sm:p-8 flex flex-col justify-between shadow-2xl shadow-emerald-950/40">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 tracking-wider uppercase">
                Your Monthly ROI Projection
              </span>

              <div className="mt-4">
                <span className="text-4xl sm:text-5xl font-extrabold font-mono text-white tabular-nums">
                  ${monthlyValueSaved.toLocaleString()}
                </span>
                <span className="text-slate-400 text-sm block mt-1">Reclaimed Billable Capacity Every Month</span>
              </div>

              <div className="mt-8 space-y-4 pt-6 border-t border-emerald-500/20">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Unbillable Admin Hours Saved:</span>
                  <span className="font-mono font-bold text-emerald-400 tabular-nums">
                    {monthlyHoursSaved} hrs / month
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Annual Value Reclaimed:</span>
                  <span className="font-mono font-bold text-white tabular-nums">
                    ${annualValueSaved.toLocaleString()} / year
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">LedgerChaser Investment:</span>
                  <span className="font-mono text-slate-400 tabular-nums">$29 / month (Flat)</span>
                </div>

                <div className="flex justify-between items-center text-sm pt-2 border-t border-emerald-500/20">
                  <span className="text-white font-semibold flex items-center gap-1.5">
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                    Net Estimated ROI:
                  </span>
                  <span className="font-mono font-extrabold text-emerald-400 text-lg tabular-nums">
                    +{roiPercentage.toLocaleString()}%
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6">
              <button
                onClick={onOpenFounderModal}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-all active:scale-95 shadow-lg shadow-emerald-500/25"
              >
                <span>Lock In $19/mo Founder Pricing</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <span className="text-[11px] text-center block text-slate-400 mt-2">
                100% Risk-Free. 30-Day Money-Back Guarantee.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
