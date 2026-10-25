import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Bell,
  Camera,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  FileCheck,
  FileText,
  FolderCheck,
  Plus,
  RefreshCw,
  Send,
  Smartphone,
  Trash2,
  UploadCloud,
  UserCheck
} from 'lucide-react';
import { DocumentRequest } from '../types';

interface SimulatorProps {
  onOpenFounderModal: () => void;
}

const initialRequests: DocumentRequest[] = [
  {
    id: 'req-1',
    title: 'Chase Operating Account (Oct 1 - Oct 31)',
    category: 'bank_statement',
    dueDate: 'Oct 28',
    status: 'uploaded',
    uploadedAt: 'Today at 09:14 AM',
    fileName: 'Chase_Checking_Oct2026.pdf',
    fileSize: '1.2 MB',
    note: 'Need full monthly statement with ending reconciled balance.'
  },
  {
    id: 'req-2',
    title: 'Receipt for $4,120.00 Vendor Wire on Oct 14',
    category: 'invoice',
    dueDate: 'Oct 28',
    status: 'pending',
    note: 'Suspense account #6010. Need vendor invoice or purchase agreement.'
  },
  {
    id: 'req-3',
    title: 'Gusto Monthly Payroll Tax Liabilities Summary',
    category: 'payroll',
    dueDate: 'Oct 29',
    status: 'pending',
    note: 'Download the PEO summary report from the reports tab.'
  }
];

export const Simulator: React.FC<SimulatorProps> = ({ onOpenFounderModal }) => {
  const [activeTab, setActiveTab] = useState<'accountant' | 'client'>('accountant');
  const [requests, setRequests] = useState<DocumentRequest[]>(initialRequests);
  const [reminderCadence, setReminderCadence] = useState<'3' | '5' | '7'>('3');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<DocumentRequest['category']>('bank_statement');
  const [newNote, setNewNote] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [reminderToast, setReminderToast] = useState<string | null>(null);
  const [uploadToast, setUploadToast] = useState<string | null>(null);

  // Stats calculation
  const completedCount = requests.filter(r => r.status !== 'pending').length;
  const progressPercent = Math.round((completedCount / requests.length) * 100);

  // Copy Magic Link handler
  const handleCopyLink = () => {
    navigator.clipboard?.writeText('https://ledgerchaser.app/portal/m-summit-9821');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Add document request handler
  const handleAddRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newReq: DocumentRequest = {
      id: `req-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      dueDate: 'Oct 30',
      status: 'pending',
      note: newNote.trim() || undefined
    };

    setRequests(prev => [...prev, newReq]);
    setNewTitle('');
    setNewNote('');
    setShowAddModal(false);
  };

  // Delete request
  const handleDeleteRequest = (id: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  // Client uploads a file
  const handleSimulateUpload = (id: string, mockFileName: string) => {
    setRequests(prev =>
      prev.map(r => {
        if (r.id === id) {
          return {
            ...r,
            status: 'uploaded',
            uploadedAt: 'Just now',
            fileName: mockFileName,
            fileSize: '2.4 MB'
          };
        }
        return r;
      })
    );
    setUploadToast(`Uploaded "${mockFileName}"! Switch to Accountant Hub to see instant live sync.`);
    setTimeout(() => setUploadToast(null), 4000);
  };

  // Trigger test reminder
  const handleTriggerReminder = () => {
    setReminderToast(
      'Automated Reminder Sent: "Hi Sarah, quick reminder from your bookkeeper to upload your 2 missing October documents so we can close your books on time."'
    );
    setTimeout(() => setReminderToast(null), 6000);
  };

  // Verify file in Accountant view
  const handleVerify = (id: string) => {
    setRequests(prev =>
      prev.map(r => (r.id === id ? { ...r, status: 'verified' } : r))
    );
  };

  return (
    <section id="interactive-simulator" className="py-20 bg-[#070B12] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400">
            Interactive Live Sandbox
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Experience Both Sides of the Magic Link
          </h2>
          <p className="mt-4 text-base text-slate-300">
            See why clients who ignore traditional portals upload their documents in under 30 seconds with LedgerChaser.
            Toggle between the views below to test real-time synchronization.
          </p>

          {/* Perspective Switcher Controls */}
          <div className="mt-8 inline-flex items-center gap-1.5 p-1.5 bg-[#0F172A] border border-white/10 rounded-xl shadow-xl">
            <button
              onClick={() => setActiveTab('accountant')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'accountant'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCheck className="h-4 w-4" />
              <span>Accountant Hub (You)</span>
            </button>
            <button
              onClick={() => setActiveTab('client')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'client'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="h-4 w-4" />
              <span>Client Mobile View (Zero-Password)</span>
              {requests.some(r => r.status === 'pending') && (
                <span className="ml-1 bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full text-[10px] font-bold">
                  {requests.filter(r => r.status === 'pending').length} needed
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Live Toasts */}
        {uploadToast && (
          <div className="mt-4 max-w-xl mx-auto bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 p-3 rounded-xl text-xs flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>{uploadToast}</span>
            </div>
            <button
              onClick={() => setActiveTab('accountant')}
              className="text-xs font-bold underline hover:text-white ml-2 shrink-0"
            >
              View Hub
            </button>
          </div>
        )}

        {reminderToast && (
          <div className="mt-4 max-w-xl mx-auto bg-blue-500/10 border border-blue-500/30 text-blue-200 p-3 rounded-xl text-xs flex items-center gap-2 animate-fadeIn">
            <Bell className="h-4 w-4 text-blue-400 shrink-0" />
            <span>{reminderToast}</span>
          </div>
        )}

        {/* Main Sandbox Container */}
        <div className="mt-8">
          {activeTab === 'accountant' ? (
            /* ACCOUNTANT COMMAND HUB */
            <div className="rounded-2xl border border-white/10 bg-[#0B101D] shadow-2xl p-6 sm:p-8">
              {/* Hub Top Bar */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Client Closing Workspace</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-xs text-slate-400">October 2026 Monthly Close</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">Summit Peak Consulting, LLC</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Contact: Sarah Jenkins (sarah@summitpeak.co) · Assigned Bookkeeper: Alex Reed
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-all active:scale-95"
                  >
                    {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedLink ? 'Magic Link Copied!' : 'Copy Client Magic Link'}</span>
                  </button>

                  <button
                    onClick={handleTriggerReminder}
                    className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-all active:scale-95"
                  >
                    <Send className="h-3.5 w-3.5 text-blue-400" />
                    <span>Send Test Auto-Reminder</span>
                  </button>

                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-all active:scale-95 shadow-md shadow-emerald-500/20"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Document Request</span>
                  </button>
                </div>
              </div>

              {/* Automation Rules Strip */}
              <div className="py-4 my-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs border-b border-white/5">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <Clock className="h-4 w-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block">Auto-Reminder Frequency:</span>
                    <div className="flex items-center gap-2 mt-1">
                      {(['3', '5', '7'] as const).map(days => (
                        <button
                          key={days}
                          onClick={() => setReminderCadence(days)}
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                            reminderCadence === days
                              ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                              : 'bg-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          Every {days} days
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <FolderCheck className="h-4 w-4 text-blue-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block">Direct Cloud Sync Target:</span>
                    <span className="text-slate-200 font-mono text-[11px] mt-0.5 block truncate">
                      Google Drive: /Clients/SummitPeak/2026-10/
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex-1">
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Client Completion Rate:</span>
                      <span className="text-emerald-400 font-bold font-mono">{progressPercent}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Document Requests List */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium px-2">
                  <span>REQUIRED ITEM</span>
                  <div className="flex items-center gap-12">
                    <span className="hidden sm:inline">DUE DATE</span>
                    <span>STATUS & ACTION</span>
                  </div>
                </div>

                {requests.map(req => (
                  <div
                    key={req.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-white/5 bg-[#0F172A]/70 hover:border-white/15 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                          req.status === 'verified'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : req.status === 'uploaded'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {req.status === 'verified' ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : req.status === 'uploaded' ? (
                          <FileText className="h-4 w-4" />
                        ) : (
                          <AlertCircle className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-white">{req.title}</h4>
                        </div>
                        {req.note && <p className="text-xs text-slate-400 mt-0.5">{req.note}</p>}
                        {req.fileName && (
                          <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400 font-mono">
                            <span className="text-emerald-400">{req.fileName}</span>
                            <span>·</span>
                            <span>{req.fileSize}</span>
                            <span>·</span>
                            <span>{req.uploadedAt}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                      <span className="text-xs text-slate-400 font-mono hidden sm:inline mr-4">{req.dueDate}</span>

                      {req.status === 'pending' && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">
                            Awaiting Client
                          </span>
                          <button
                            onClick={() => setActiveTab('client')}
                            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold underline ml-1"
                          >
                            Simulate Upload
                          </button>
                        </div>
                      )}

                      {req.status === 'uploaded' && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-md">
                            Synced to Drive
                          </span>
                          <button
                            onClick={() => handleVerify(req.id)}
                            className="flex items-center gap-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-2.5 py-1 text-xs font-semibold hover:bg-emerald-500/30 transition-all"
                          >
                            <Check className="h-3 w-3" />
                            <span>Verify & Mark Done</span>
                          </button>
                        </div>
                      )}

                      {req.status === 'verified' && (
                        <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Reconciled & Ready
                        </span>
                      )}

                      <button
                        onClick={() => handleDeleteRequest(req.id)}
                        className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                        title="Remove request"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Quick Action Note */}
              <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>Google Drive sync active: Files are automatically organized by year and month.</span>
                </div>
                <button
                  onClick={() => setActiveTab('client')}
                  className="flex items-center gap-1 text-emerald-400 font-semibold hover:underline"
                >
                  <span>Test Client Mobile Magic-Link</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* CLIENT MOBILE PERSPECTIVE (SMARTPHONE FRAME) */
            <div className="max-w-md mx-auto">
              <div className="rounded-[40px] border-4 border-slate-700 bg-[#070B14] p-3 shadow-2xl shadow-emerald-950/20">
                {/* Phone Speaker & Camera Notch */}
                <div className="mx-auto h-4 w-28 rounded-full bg-slate-800 mb-2 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-slate-900" />
                </div>

                {/* Simulated Phone Screen */}
                <div className="rounded-[32px] bg-[#0A0F1D] border border-white/10 p-5 min-h-[580px] flex flex-col justify-between">
                  <div>
                    {/* Simulated Browser URL bar */}
                    <div className="flex items-center justify-between px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-slate-400 font-mono mb-4">
                      <span className="flex items-center gap-1 truncate text-emerald-400">
                        <Check className="h-3 w-3" /> ledgerchaser.app/m/summit-9821
                      </span>
                      <span className="text-[10px] bg-emerald-950 border border-emerald-500/30 text-emerald-400 px-1.5 rounded">
                        Encrypted
                      </span>
                    </div>

                    {/* Accountant Branding Header */}
                    <div className="border-b border-white/10 pb-4">
                      <span className="text-[11px] font-semibold text-emerald-400 tracking-wider uppercase">
                        Reed Bookkeeping & Advisory
                      </span>
                      <h4 className="text-lg font-bold text-white mt-1">October Document Request</h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Hi Sarah! Please upload the 3 items below so we can close Summit Peak's October financials.
                        <strong> No login or password required.</strong>
                      </p>
                    </div>

                    {/* Client Progress */}
                    <div className="mt-4 flex items-center justify-between text-xs text-slate-300">
                      <span>Documents Uploaded</span>
                      <span className="font-mono text-emerald-400 font-bold">
                        {completedCount} of {requests.length} completed
                      </span>
                    </div>
                    <div className="mt-1.5 w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>

                    {/* Client Checklist Items */}
                    <div className="mt-5 space-y-3">
                      {requests.map((req, idx) => (
                        <div
                          key={req.id}
                          className={`p-3.5 rounded-xl border transition-all ${
                            req.status !== 'pending'
                              ? 'bg-emerald-950/20 border-emerald-500/30'
                              : 'bg-white/[0.03] border-white/10 hover:border-emerald-500/40'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-[10px] font-mono text-slate-400 uppercase">
                                Item 0{idx + 1}
                              </span>
                              <h5 className="text-xs font-bold text-white mt-0.5">{req.title}</h5>
                              {req.note && <p className="text-[11px] text-slate-400 mt-1">{req.note}</p>}
                            </div>

                            {req.status !== 'pending' ? (
                              <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                                <Check className="h-3.5 w-3.5" />
                              </div>
                            ) : (
                              <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-mono shrink-0">
                                Needed
                              </span>
                            )}
                          </div>

                          {/* Upload or Completed action */}
                          <div className="mt-3 pt-2.5 border-t border-white/5">
                            {req.status === 'pending' ? (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    handleSimulateUpload(
                                      req.id,
                                      req.category === 'invoice' ? 'Wire_Receipt_Oct14.pdf' : 'Gusto_Summary.pdf'
                                    )
                                  }
                                  className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-all active:scale-95 shadow-md shadow-emerald-500/20"
                                >
                                  <UploadCloud className="h-3.5 w-3.5" />
                                  <span>Tap to Upload File</span>
                                </button>
                                <button
                                  onClick={() =>
                                    handleSimulateUpload(req.id, 'Photo_Receipt_Camera.jpg')
                                  }
                                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white"
                                  title="Take photo with phone camera"
                                >
                                  <Camera className="h-4 w-4" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-between text-[11px] text-slate-400">
                                <span className="font-mono text-emerald-400 truncate max-w-[190px]">
                                  {req.fileName}
                                </span>
                                <span className="text-emerald-400 font-semibold">Done ✓</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Phone Bottom Feedback */}
                  <div className="mt-6 pt-4 border-t border-white/10 text-center">
                    <p className="text-[11px] text-slate-400">
                      Files are securely transmitted directly to your bookkeeper's verified cloud vault.
                    </p>
                    <button
                      onClick={() => setActiveTab('accountant')}
                      className="mt-3 inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold hover:underline"
                    >
                      <span>Switch Back to Accountant View</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Add Document Request Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0F172A] p-6 shadow-2xl">
              <h3 className="text-lg font-bold text-white">Add Document Request</h3>
              <p className="text-xs text-slate-400 mt-1">
                Your client will see this in their zero-login checklist immediately.
              </p>

              <form onSubmit={handleAddRequest} className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Document Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amex Business Gold Statement (Oct 2026)"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Category Template</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as DocumentRequest['category'])}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="bank_statement">Bank / Card Statement</option>
                    <option value="invoice">Vendor Receipt / Invoice</option>
                    <option value="payroll">Payroll / PEO Report</option>
                    <option value="tax">Tax Form / 1099 W-9</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Internal or Client Note (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Reconciling transaction #8812 for the company retreat."
                    value={newNote}
                    onChange={e => setNewNote(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-3.5 py-2 text-xs font-medium text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
                  >
                    Add to Checklist
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
