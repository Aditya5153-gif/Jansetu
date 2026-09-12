import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Copy, 
  Check, 
  ShieldCheck, 
  Printer, 
  ArrowRight,
  HelpCircle,
  FileCode,
  X
} from 'lucide-react';
import { API_BASE_URL } from '../apiConfig';

const SAMPLE_REFS = [
  { ref: 'UP/PWD/2026/85096', title_hi: 'वाराणसी सड़क मरम्मत (PWD)' },
  { ref: 'BR/AGRCOOP/2026/41029', title_hi: 'PM-किसान 2 किस्तें रुकीं' },
  { ref: 'UP/DFPD/2026/72814', title_hi: 'राशन कोटेदार अनियमितता' }
];

export default function RTITrackerStudio({ 
  initialRef = 'UP/PWD/2026/85096', 
  citizenProfile = null, 
  language = 'hi' 
}) {
  const isHindi = language === 'hi';
  const [refInput, setRefInput] = useState(initialRef);
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  // Appeal Modal State
  const [appealModalOpen, setAppealModalOpen] = useState(false);
  const [appealData, setAppealData] = useState(null);
  const [generatingAppeal, setGeneratingAppeal] = useState(false);

  const fetchTracking = (ref) => {
    if (!ref || !ref.trim()) return;
    setLoading(true);
    setError(null);

    fetch(`${API_BASE_URL}/api/rti/track?refNo=${encodeURIComponent(ref.trim())}`)
      .then(res => {
        if (!res.ok) throw new Error('Reference number not found');
        return res.json();
      })
      .then(data => {
        setTrackingData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(isHindi ? 'संदर्भ संख्या नहीं मिली। कृपया पुनः जांचें।' : 'RTI Reference not found. Please verify.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTracking(initialRef);
  }, [initialRef]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateAppeal = () => {
    setGeneratingAppeal(true);
    fetch(`${API_BASE_URL}/api/rti/first-appeal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refNo: trackingData?.referenceNumber || refInput,
        citizenName: citizenProfile?.name || 'Citizen Applicant',
        district: citizenProfile?.district || 'Varanasi',
        state: citizenProfile?.state || 'Uttar Pradesh',
        problemDescription: trackingData?.department || 'Public Information Request'
      })
    })
      .then(res => res.json())
      .then(data => {
        setAppealData(data);
        setAppealModalOpen(true);
        setGeneratingAppeal(false);
      })
      .catch(err => {
        console.error('Error creating appeal:', err);
        setGeneratingAppeal(false);
      });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Search Header */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 text-white rounded-2xl p-5 sm:p-7 border border-stone-700 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-extrabold uppercase tracking-wider mb-2">
            <Scale className="w-4 h-4" />
            <span>{isHindi ? 'सूचना का अधिकार ट्रैकिंग व कानूनी स्टूडियो' : 'RTI Enforcement & Legal Studio'}</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-white leading-tight mb-2">
            {isHindi ? 'अपनी आरटीआई की स्थिति जांचें एवं अपील करें' : 'Track Your RTI Status & File Appeals'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mb-5">
            {isHindi 
              ? 'पोर्टल संदर्भ संख्या दर्ज करें — 30 दिन की कानूनी समय-सीमा और जन सूचना अधिकारी (PIO) की प्रगति देखें।'
              : 'Enter your official reference number to track 30-day statutory response progress and PIO action.'}
          </p>

          {/* Reference Search Input */}
          <div className="flex flex-col sm:flex-row gap-2 mb-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={refInput}
                onChange={(e) => setRefInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchTracking(refInput)}
                placeholder="उदा. UP/PWD/2026/85096"
                className="w-full px-4 py-3 bg-stone-950/80 border border-stone-600 rounded-xl text-amber-400 font-mono text-sm sm:text-base font-bold outline-none focus:ring-2 focus:ring-amber-400 uppercase placeholder:text-stone-500"
              />
            </div>
            <button
              onClick={() => fetchTracking(refInput)}
              disabled={loading || !refInput.trim()}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
              <span>{isHindi ? 'स्थिति देखें' : 'Track Status'}</span>
            </button>
          </div>

          {/* Quick Reference Chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400">
            <span>{isHindi ? '💡 उदाहरण संदर्भ संख्या:' : 'Sample Reference #:'}</span>
            {SAMPLE_REFS.map(s => (
              <button
                key={s.ref}
                onClick={() => { setRefInput(s.ref); fetchTracking(s.ref); }}
                className="bg-stone-800 hover:bg-stone-700 text-stone-200 px-2.5 py-1 rounded-lg border border-stone-600 font-mono text-[11px] transition-colors"
              >
                {s.ref}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Tracking Details View */}
      {trackingData && (
        <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-6">
          {/* Status Header Overview */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-lg sm:text-xl font-extrabold text-stone-900 bg-stone-100 px-3 py-1 rounded-lg border border-stone-200">
                  {trackingData.referenceNumber}
                </span>
                <button
                  onClick={() => handleCopy(trackingData.referenceNumber)}
                  className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-500"
                  title="Copy Reference"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs sm:text-sm text-stone-600">
                <strong>{isHindi ? 'विभाग:' : 'Department:'}</strong> {isHindi ? trackingData.department_hi : trackingData.department}
              </p>
              <p className="text-xs text-stone-500">
                <strong>{isHindi ? 'जन सूचना अधिकारी:' : 'PIO:'}</strong> {trackingData.pioOfficer}
              </p>
            </div>

            {/* Countdown Badge */}
            <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3 sm:px-5 flex items-center gap-3">
              <div className="p-2 bg-amber-500/20 text-amber-800 rounded-xl">
                <Clock className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-900 block">
                  {isHindi ? 'जवाब की समय-सीमा' : 'Statutory Countdown'}
                </span>
                <p className="text-base sm:text-lg font-black text-amber-950 leading-tight">
                  {trackingData.daysRemaining} {isHindi ? 'दिन शेष' : 'Days Remaining'}
                </p>
                <span className="text-[11px] text-stone-500">
                  {isHindi ? 'अंतिम तिथि:' : 'Deadline:'} {trackingData.deadlineDate}
                </span>
              </div>
            </div>
          </div>

          {/* Statutory Milestone Timeline */}
          <div>
            <h3 className="text-sm sm:text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-orange-600" />
              <span>{isHindi ? 'कानूनी प्रक्रिया के 4 चरण (Milestones):' : 'Statutory 4-Phase Progress Timeline:'}</span>
            </h3>

            <div className="relative border-l-2 border-stone-200 ml-4 pl-6 space-y-6">
              {trackingData.milestones.map((m) => {
                const isComplete = m.status === 'COMPLETED';
                const isCurrent = m.status === 'IN_PROGRESS';

                return (
                  <div key={m.step} className="relative">
                    {/* Circle Indicator on line */}
                    <span
                      className={`absolute -left-[31px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isComplete
                          ? 'bg-emerald-600 text-white'
                          : isCurrent
                          ? 'bg-orange-500 text-white ring-4 ring-orange-200 animate-pulse'
                          : 'bg-stone-200 text-stone-500'
                      }`}
                    >
                      {isComplete ? '✓' : m.step}
                    </span>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                          {m.title}
                        </h4>
                        <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-mono">
                          {m.date}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isComplete
                              ? 'bg-emerald-100 text-emerald-800'
                              : isCurrent
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-stone-100 text-stone-500'
                          }`}
                        >
                          {m.status}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600">{m.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 19 First Appeal Callout & Action */}
          <div className="bg-gradient-to-r from-stone-900 to-stone-850 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                {isHindi ? 'धारा 19(1) प्रथम अपील कानूनी अधिकार' : 'Section 19(1) First Appeal Rights'}
              </span>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
                {isHindi
                  ? 'यदि जन सूचना अधिकारी 30 दिनों में जानकारी न दे या अधूरी जानकारी दे, तो आप वरिष्ठ अपीलीय प्राधिकारी (FAA) के समक्ष प्रथम अपील कर सकते हैं। धारा 7(6) के तहत सभी दस्तावेज 100% मुफ्त मिलेंगे।'
                  : 'If the PIO fails to respond within 30 days, file a formal First Appeal. All certified documents must be supplied 100% free of cost under Section 7(6).'}
              </p>
            </div>

            <button
              onClick={handleGenerateAppeal}
              disabled={generatingAppeal}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-stone-950 font-black rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-md disabled:opacity-50"
            >
              <Scale className="w-4 h-4" />
              <span>{isHindi ? 'प्रथम अपील का कानूनी ड्राफ्ट बनाएं' : 'Generate Section 19 Appeal'}</span>
            </button>
          </div>
        </div>
      )}

      {/* First Appeal Modal */}
      {appealModalOpen && appealData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-3xl w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 bg-stone-850 border-b border-stone-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
                <Scale className="w-5 h-5 text-amber-400" />
                <span>{appealData.legalSection}</span>
              </div>
              <button
                onClick={() => setAppealModalOpen(false)}
                className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto flex-1 font-mono text-xs sm:text-sm text-stone-200 bg-stone-950 whitespace-pre-wrap leading-relaxed">
              {appealData.appealDraft}
            </div>

            <div className="p-4 bg-stone-900 border-t border-stone-800 flex items-center justify-between">
              <span className="text-xs text-stone-400 font-mono">
                {appealData.appealReference}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(appealData.appealDraft);
                    alert(isHindi ? 'अपील ड्राफ्ट कॉपी हो गया!' : 'Appeal draft copied!');
                  }}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                >
                  <Copy className="w-4 h-4" />
                  <span>{isHindi ? 'कॉपी करें' : 'Copy'}</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>{isHindi ? 'प्रिंट लें' : 'Print'}</span>
                </button>
                <button
                  onClick={() => setAppealModalOpen(false)}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold"
                >
                  {isHindi ? 'बंद करें' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
