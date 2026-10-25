import React, { useState } from 'react';
import { ArrowRight, Check, HelpCircle, ShieldCheck, Sparkles } from 'lucide-react';

interface PricingSectionProps {
  onOpenFounderModal: () => void;
  remainingSpots: number;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onOpenFounderModal,
  remainingSpots
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Will my clients really use this without creating an account?',
      a: 'Yes! That is the core breakthrough. Traditional portals fail because clients hate remembering passwords. With LedgerChaser, they click an encrypted one-time Magic Link from your email or text, see their 3-item checklist, and upload in 30 seconds.'
    },
    {
      q: 'Does it sync with my existing Google Drive or Dropbox?',
      a: 'Yes. You connect your cloud drive once. Whenever a client uploads a statement, LedgerChaser automatically creates the client folder (e.g. /Clients/Summit Peak/2026-10/) and files it neatly without manual intervention.'
    },
    {
      q: 'Why are you charging a flat $29/mo instead of per-client like Keeper?',
      a: 'Because we are a bootstrapped Micro-SaaS built specifically for solo bookkeepers. Per-client pricing ($8–$12/client/mo) punishes you for growing your practice. We want predictable, fair pricing you never have to worry about.'
    },
    {
      q: 'What is the Founder Tier guarantee?',
      a: 'The first 50 firms lock in $19/mo lifetime pricing (saving 35% forever). You get a full 30-day money-back guarantee upon launch, plus direct priority WhatsApp/email access to the founders.'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-[#090D16] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400">
            Transparent Flat-Rate Pricing
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Never Pay Per-Client Penalties Again
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Lock in early founder access today. Cancel anytime with a 30-day no-questions-asked refund policy.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-14 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Card 1: Standard Starter */}
          <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-slate-400 uppercase">Regular Flat Tier</span>
              <h3 className="text-xl font-bold text-white mt-1">Standard Solo</h3>
              <p className="text-xs text-slate-400 mt-2">
                Ideal for solo bookkeepers managing up to 25 monthly active clients.
              </p>

              <div className="mt-6">
                <span className="text-4xl font-extrabold font-mono text-white">$29</span>
                <span className="text-xs text-slate-400 font-medium"> / month</span>
              </div>

              <ul className="mt-6 space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Up to 25 Active Bookkeeping Clients</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Zero-Login Magic Links for Clients</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Automated 3-Day Polite Email Follow-ups</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Google Drive & OneDrive Direct Sync</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Standard Email Support</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5">
              <button
                onClick={onOpenFounderModal}
                className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-all active:scale-95"
              >
                Get Started ($29/mo)
              </button>
            </div>
          </div>

          {/* Card 2: FOUNDER TIER (FEATURED) */}
          <div className="relative rounded-2xl border-2 border-emerald-500 bg-gradient-to-b from-[#0F221B] to-[#0B1512] p-6 flex flex-col justify-between shadow-2xl shadow-emerald-950/60 scale-105 z-10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-slate-950 shadow-md">
              Founder Early Access · {remainingSpots} Spots Left
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Lifetime Early Discount
              </span>
              <h3 className="text-xl font-bold text-white mt-1">Founding Practice</h3>
              <p className="text-xs text-slate-300 mt-2">
                Locked in forever for our first 50 partner accounting firms.
              </p>

              <div className="mt-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold font-mono text-emerald-400">$19</span>
                  <span className="text-xs text-slate-400 font-medium"> / month</span>
                  <span className="text-xs text-slate-500 line-through font-mono">$29/mo</span>
                </div>
                <span className="text-[11px] text-emerald-400 font-semibold block mt-0.5">
                  Locked in for life. Never increases.
                </span>
              </div>

              <ul className="mt-6 space-y-3 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-white">Unlimited Active Clients</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Zero-Login Magic Links (SMS & Email)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Custom Automated Follow-Up Schedules</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Instant Google Drive & Dropbox Auto-Sync</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Custom Firm Branding & Logo on Magic Links</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-emerald-300">Priority VIP Founder Support</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-emerald-500/20">
              <button
                onClick={onOpenFounderModal}
                className="w-full rounded-xl bg-emerald-500 px-4 py-3 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-all active:scale-95 shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-1.5"
              >
                <span>Claim Founder Spot ($19/mo)</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <div className="flex items-center justify-center gap-1 mt-2 text-[10px] text-slate-400">
                <ShieldCheck className="h-3 w-3 text-emerald-400" />
                <span>30-Day Money-Back Guarantee</span>
              </div>
            </div>
          </div>

          {/* Card 3: Boutique Firm */}
          <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-slate-400 uppercase">Growing Practice</span>
              <h3 className="text-xl font-bold text-white mt-1">Multi-Staff Firm</h3>
              <p className="text-xs text-slate-400 mt-2">
                For firms with 2 to 6 bookkeepers collaborating across client portfolios.
              </p>

              <div className="mt-6">
                <span className="text-4xl font-extrabold font-mono text-white">$59</span>
                <span className="text-xs text-slate-400 font-medium"> / month</span>
              </div>

              <ul className="mt-6 space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Unlimited Clients & Portals</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Up to 6 Staff Bookkeeper Seats</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Custom Domain (e.g. portal.yourfirm.com)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Advanced Audit Trail & Logs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Dedicated Onboarding Specialist</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5">
              <button
                onClick={onOpenFounderModal}
                className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-all active:scale-95"
              >
                Contact for Firm Tier
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="mt-20 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/10 bg-[#0F172A] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-white hover:text-emerald-400 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <span className="text-slate-500 font-mono text-xs">{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
