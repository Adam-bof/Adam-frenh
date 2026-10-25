import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Sparkles, X } from 'lucide-react';
import { FounderReservation } from '../types';

interface FounderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReservationSuccess: (reservation: FounderReservation) => void;
  remainingSpots: number;
}

export const FounderModal: React.FC<FounderModalProps> = ({
  isOpen,
  onClose,
  onReservationSuccess,
  remainingSpots
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [firmName, setFirmName] = useState('');
  const [firmSize, setFirmSize] = useState<FounderReservation['firmSize']>('solo');
  const [currentMethod, setCurrentMethod] = useState<FounderReservation['currentMethod']>('sheets_email');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<FounderReservation | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !fullName.trim()) return;

    const reservationNum = 50 - remainingSpots + 1;
    const newReservation: FounderReservation = {
      id: `res-${Date.now()}`,
      fullName: fullName.trim(),
      email: email.trim(),
      firmName: firmName.trim() || 'Independent Practice',
      firmSize,
      currentMethod,
      planTier: 'founder-monthly',
      timestamp: new Date().toISOString(),
      reservationNumber: reservationNum
    };

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('ledgerchaser_reservations') || '[]');
      localStorage.setItem('ledgerchaser_reservations', JSON.stringify([...existing, newReservation]));
    } catch {
      // ignore
    }

    setConfirmedReservation(newReservation);
    setIsSubmitted(true);
    onReservationSuccess(newReservation);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#0B101D] p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-3 py-1 rounded-full mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{remainingSpots} of 50 Founder Spots Available</span>
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight">
              Lock In $19/mo Lifetime Founder Access
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Join our first 50 founding accounting partners. Never pay per-client fees, and lock in
              35% off the standard $29/mo rate forever. Full 30-day money-back guarantee.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-200">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rachel Adams"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-200">Work Email (Where you receive client updates)</label>
                <input
                  type="email"
                  required
                  placeholder="rachel@adamsbookkeeping.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-200">Firm or Practice Name</label>
                <input
                  type="text"
                  placeholder="e.g. Adams Bookkeeping & Tax Services"
                  value={firmName}
                  onChange={e => setFirmName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-200">Practice Size</label>
                  <select
                    value={firmSize}
                    onChange={e => setFirmSize(e.target.value as FounderReservation['firmSize'])}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="solo">Solo Bookkeeper (1 person)</option>
                    <option value="2-5">Boutique Team (2–5 people)</option>
                    <option value="6+">Growing Firm (6+ staff)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-200">How You Chase Documents Now</label>
                  <select
                    value={currentMethod}
                    onChange={e =>
                      setCurrentMethod(e.target.value as FounderReservation['currentMethod'])
                    }
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="sheets_email">Manual Email & Spreadsheets</option>
                    <option value="drive_manual">Google Drive / Dropbox folders</option>
                    <option value="keeper">Keeper.app (Too expensive/complex)</option>
                    <option value="content_snare">Content Snare</option>
                    <option value="other">Other / WhatsApp / Texting</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-emerald-500 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-all active:scale-95 shadow-lg shadow-emerald-500/25"
                >
                  Confirm My Founder Spot ($19/mo Lifetime)
                </button>
                <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[11px] text-slate-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>No credit card charged today. Priority rollout invitation.</span>
                </div>
              </div>
            </form>
          </div>
        ) : (
          /* CONFIRMED RESERVATION VIEW */
          <div className="text-center py-4">
            <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
              <CheckCircle2 className="h-6 w-6" />
            </div>

            <span className="text-xs font-mono font-bold text-emerald-400 tracking-wider uppercase mt-4 block">
              Reservation Confirmed
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">Welcome to the Founding Cohort!</h3>
            <p className="text-xs text-slate-300 mt-2">
              We have reserved Founder Pass <strong>#{confirmedReservation?.reservationNumber}</strong> for{' '}
              <span className="text-white font-semibold">{email}</span>.
            </p>

            {/* Founder Digital Pass Box */}
            <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 text-left text-xs font-mono space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>PASS NUMBER:</span>
                <span className="text-white font-bold">#LC-00{confirmedReservation?.reservationNumber}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>FIRM:</span>
                <span className="text-white truncate max-w-[200px]">{confirmedReservation?.firmName}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>LIFETIME RATE:</span>
                <span className="text-emerald-400 font-bold">$19 / Month Flat</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>EXCLUSIVE CODE:</span>
                <span className="text-emerald-400 font-bold">FOUNDER-19-LIFETIME</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={onClose}
                className="w-full rounded-xl bg-white/10 hover:bg-white/20 py-2.5 text-xs font-semibold text-white transition-all"
              >
                Return to Live Simulator
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
