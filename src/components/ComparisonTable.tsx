import React from 'react';
import { Check, Minus, X } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  const comparisonRows = [
    {
      feature: 'Pricing Model',
      oldWay: 'Free (but costs 30+ unbillable hours)',
      portals: '$8–$12 / client / mo ($150–$250/mo)',
      ledgerChaser: '$29 / mo Flat (Unlimited Clients)',
      highlight: true
    },
    {
      feature: 'Client Login Requirement',
      oldWay: 'None (messy email chains & Drive)',
      portals: 'Requires Account & Password (High Friction)',
      ledgerChaser: '100% Zero-Login Encrypted Magic Links',
      highlight: true
    },
    {
      feature: 'Automated 3-Day Polite Chasing',
      oldWay: 'Manual (You act as the human alarm clock)',
      portals: 'Complex rules & noisy notification spam',
      ledgerChaser: 'Gentle, scheduled SMS & email follow-ups',
      highlight: false
    },
    {
      feature: 'Direct Cloud Folder Mappings',
      oldWay: 'Manual dragging and folder renaming',
      portals: 'Files trapped inside proprietary portal',
      ledgerChaser: 'Instant auto-sync to Google Drive / Dropbox',
      highlight: true
    },
    {
      feature: 'Mobile Photo & Camera Upload',
      oldWay: 'Blurry WhatsApp photos at 11 PM',
      portals: 'Requires native mobile app download',
      ledgerChaser: 'Built-in browser camera auto-crop',
      highlight: false
    },
    {
      feature: 'Setup Time for New Client',
      oldWay: '15 mins per month per client',
      portals: '30 mins initial portal provisioning',
      ledgerChaser: '20 seconds using pre-built templates',
      highlight: false
    }
  ];

  return (
    <section id="comparison" className="py-20 bg-[#070B12] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400">
            Transparent Market Comparison
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Why Bookkeepers Are Ditching Bloated Portals
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Enterprise software companies charge you per-client and force your clients to remember passwords.
            We solved the exact gap in between.
          </p>
        </div>

        <div className="mt-14 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 px-6 text-sm font-semibold text-slate-400 w-1/4">Feature / Capability</th>
                <th className="py-4 px-6 text-sm font-semibold text-slate-400 w-1/4">
                  Manual Email & Spreadsheets
                </th>
                <th className="py-4 px-6 text-sm font-semibold text-slate-400 w-1/4">
                  Bloated Portals (Keeper, Canopy)
                </th>
                <th className="py-4 px-6 text-sm font-bold text-emerald-400 w-1/4 bg-emerald-950/20 rounded-t-xl border-t border-x border-emerald-500/30">
                  LedgerChaser (Micro-SaaS)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                  <td className="py-4 px-6 font-medium text-white">{row.feature}</td>

                  {/* Old Way */}
                  <td className="py-4 px-6 text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <X className="h-4 w-4 text-rose-500 shrink-0" />
                      <span>{row.oldWay}</span>
                    </span>
                  </td>

                  {/* Traditional Portals */}
                  <td className="py-4 px-6 text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Minus className="h-4 w-4 text-amber-500 shrink-0" />
                      <span>{row.portals}</span>
                    </span>
                  </td>

                  {/* LedgerChaser */}
                  <td className="py-4 px-6 font-semibold text-emerald-300 bg-emerald-950/20 border-x border-emerald-500/30">
                    <span className="inline-flex items-center gap-1.5">
                      <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>{row.ledgerChaser}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
