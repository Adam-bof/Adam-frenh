import React from 'react';
import { CheckCircle2, Clock, Cloud, FolderSync, KeyRound, Mail, Sparkles } from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 border-t border-white/10 bg-[#090D16]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400">
            Engineered for Bookkeeping Reality
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            How LedgerChaser Ends The Month-End Cat-Herding
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Traditional portals fail because small business owners refuse to remember passwords.
            Here is how a zero-friction workflow solves it completely.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="relative rounded-2xl border border-white/10 bg-[#0F172A]/70 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400">01. SETUP</span>
                <span className="text-xs text-slate-500">20 Seconds</span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-white">Create Month-End Checklist</h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Select your client and pick from pre-built accounting templates: Chase Bank statement,
                Amex receipt batch, payroll summary, or 1099 vendor W-9 forms.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Pre-built templates for US, UK & Canadian banks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Custom notes to specify missing transaction amounts</span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative rounded-2xl border border-emerald-500/30 bg-[#0F172A] p-6 flex flex-col justify-between shadow-xl shadow-emerald-500/5">
            <div className="absolute -top-3 right-6 bg-emerald-500 text-slate-950 font-bold text-[10px] uppercase px-2 py-0.5 rounded tracking-wide">
              The Secret Sauce
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400">02. CLIENT UPLOAD</span>
                <span className="text-xs text-emerald-400/80">Zero Passwords</span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-white">Client Opens Magic Link</h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                The client taps a secure single-use link on their phone or laptop. No login, no password,
                no app download. They simply drag-and-drop or take a quick photo of physical receipts.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <KeyRound className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>100% elimination of forgotten password tickets</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Instant photo capture with mobile auto-crop</span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative rounded-2xl border border-white/10 bg-[#0F172A]/70 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400">03. AUTOMATION</span>
                <span className="text-xs text-slate-500">Autopilot</span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-white">Auto-Followups & Cloud Sync</h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Clients who haven't uploaded receive polite, scheduled reminders every 3 days. Once
                uploaded, files sync automatically into your organized Google Drive or Dropbox folders.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>System acts as the polite enforcer, not you</span>
              </div>
              <div className="flex items-center gap-2">
                <FolderSync className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Direct organized filing into your cloud storage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
