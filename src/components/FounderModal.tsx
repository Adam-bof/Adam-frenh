import React, { useEffect, useState } from 'react';
import { CheckCircle2, Copy, Download, Loader2, Mail, ShieldCheck, Sparkles, X } from 'lucide-react';
import { FounderReservation, PlanTier } from '../types';

interface FounderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReservationSuccess: (reservation: FounderReservation) => void;
  remainingSpots: number;
  initialTier?: PlanTier;
}

export const FounderModal: React.FC<FounderModalProps> = ({
  isOpen,
  onClose,
  onReservationSuccess,
  remainingSpots,
  initialTier = 'founder-monthly'
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [firmName, setFirmName] = useState('');
  const [firmSize, setFirmSize] = useState<FounderReservation['firmSize']>('solo');
  const [currentMethod, setCurrentMethod] = useState<FounderReservation['currentMethod']>('sheets_email');
  const [planTier, setPlanTier] = useState<PlanTier>(initialTier);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<FounderReservation | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (initialTier) {
      setPlanTier(initialTier);
    }
  }, [initialTier]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !fullName.trim()) return;

    setIsSubmitting(true);

    const reservationNum = 50 - remainingSpots + 1;
    const passCode = `LC-00${reservationNum}`;
    const lifetimeCode = 'FOUNDER-19-LIFETIME';
    const rateText = planTier === 'firm-pro' ? '$59/month' : '$19/month flat (35% off for life)';

    const newReservation: FounderReservation = {
      id: `res-${Date.now()}`,
      fullName: fullName.trim(),
      email: email.trim(),
      firmName: firmName.trim() || 'Independent Practice',
      firmSize,
      currentMethod,
      planTier,
      timestamp: new Date().toISOString(),
      reservationNumber: reservationNum
    };

    // Automated professional welcome email body sent to the user's inbox
    const automatedWelcomeMessage = `Hi ${fullName.trim()},

Thank you for securing your early Founder Pass for LedgerChaser!

Here are your confirmed reservation details:
- Reservation Pass: #${passCode}
- Accounting Firm: ${firmName.trim() || 'Independent Practice'}
- Locked-in Lifetime Rate: ${rateText}
- Your Activation Code: ${lifetimeCode}
- 30-Day Money-Back Guarantee: Active upon onboarding

What happens next:
We are rolling out LedgerChaser to our first 50 founding accounting practices in controlled weekly batches. You will receive your direct login credentials and Google Drive sync authorization prior to general public release.

In the meantime, feel free to reply directly to this email if you have specific workflow requirements, custom document templates, or questions.

Warm regards,
The LedgerChaser Team
https://adam-frenh-kohl.vercel.app/`;

    // Dispatch lead notification to founder + automated welcome email to subscriber via FormSubmit
    try {
      await fetch('https://formsubmit.co/ajax/frenkhood@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          _subject: `🔔 New LedgerChaser Lead: ${fullName.trim()} (${firmName.trim() || 'Solo Firm'})`,
          _template: 'table',
          _replyto: 'frenkhood@gmail.com',
          _autoresponse: automatedWelcomeMessage,
          'Full Name': fullName.trim(),
          'Work Email': email.trim(),
          'Firm Name': firmName.trim() || 'Independent Practice',
          'Practice Size': firmSize,
          'Selected Plan':
            planTier === 'founder-monthly'
              ? 'Founder Lifetime ($19/mo)'
              : planTier === 'standard-solo'
              ? 'Standard Solo ($29/mo)'
              : 'Multi-Staff Firm ($59/mo)',
          'Current Chasing Method': currentMethod,
          'Reservation Number': `#${passCode}`,
          'Automated Email': `Dispatched automatically to ${email.trim()}`,
          'Submission Timestamp': new Date().toLocaleString()
        })
      });
    } catch (err) {
      console.warn('Form submission notification dispatch error (fallback to local)', err);
    }

    // Save backup to browser localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('ledgerchaser_reservations') || '[]');
      localStorage.setItem('ledgerchaser_reservations', JSON.stringify([...existing, newReservation]));
    } catch {
      // ignore
    }

    setIsSubmitting(false);
    setConfirmedReservation(newReservation);
    setIsSubmitted(true);
    onReservationSuccess(newReservation);
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('FOUNDER-19-LIFETIME');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getTierLabel = (tier: PlanTier) => {
    switch (tier) {
      case 'founder-monthly':
        return 'Founder Tier ($19/mo Lifetime)';
      case 'standard-solo':
        return 'Standard Solo ($29/mo Flat)';
      case 'firm-pro':
        return 'Multi-Staff Firm ($59/mo Flat)';
    }
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
              <span>
                {planTier === 'founder-monthly'
                  ? `${remainingSpots} of 50 Founder Spots Available`
                  : 'Selected: ' + getTierLabel(planTier)}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight">
              {planTier === 'firm-pro'
                ? 'Join the Multi-Staff Early Access Cohort'
                : 'Lock In $19/mo Lifetime Founder Access'}
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Eliminate client password friction and month-end cat-herding. An automated confirmation with your activation pass will be sent directly to your email.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-200">Plan Tier</label>
                <select
                  value={planTier}
                  onChange={e => setPlanTier(e.target.value as PlanTier)}
                  className="mt-1 w-full rounded-xl border border-emerald-500/40 bg-emerald-950/20 px-3.5 py-2.5 text-emerald-300 font-semibold focus:border-emerald-500 focus:outline-none"
                >
                  <option value="founder-monthly">Founding Practice — $19/mo Lifetime (35% Off Forever)</option>
                  <option value="standard-solo">Standard Solo — $29/mo Flat</option>
                  <option value="firm-pro">Multi-Staff Firm — $59/mo Flat</option>
                </select>
              </div>

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
                <label className="font-semibold text-slate-200">Work Email (Where your welcome pass will be sent)</label>
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
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-white focus:border-emerald-500 focus:outline-none"
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
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-white focus:border-emerald-500 focus:outline-none"
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
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-all active:scale-95 shadow-lg shadow-emerald-500/25 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Dispatching Automated Pass...</span>
                    </>
                  ) : (
                    <span>
                      {planTier === 'firm-pro'
                        ? 'Confirm Multi-Staff Priority Pass'
                        : 'Confirm My Founder Spot ($19/mo Lifetime)'}
                    </span>
                  )}
                </button>
                <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[11px] text-slate-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Instant automated confirmation email sent. Zero credit card needed today.</span>
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
              Reservation Confirmed & Logged
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">Welcome to the Founding Cohort!</h3>
            
            {/* Automatic Email Notification Badge */}
            <div className="mt-3 inline-flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs px-3.5 py-1.5 rounded-full">
              <Mail className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>An automated welcome confirmation was sent to <strong>{email}</strong></span>
            </div>

            {/* Founder Digital Pass Box */}
            <div className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 text-left text-xs font-mono space-y-2">
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
                <span className="text-emerald-400 font-bold">
                  {planTier === 'firm-pro' ? '$59 / Month' : '$19 / Month Flat'}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-400 pt-1 border-t border-white/5">
                <span>ACTIVATION CODE:</span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-emerald-400 font-bold hover:underline"
                >
                  <span>FOUNDER-19-LIFETIME</span>
                  <Copy className="h-3 w-3" />
                </button>
              </div>
            </div>
            {copiedCode && <span className="text-[11px] text-emerald-400 mt-1 block">Code copied to clipboard!</span>}

            <div className="mt-6 flex flex-col gap-2">
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
