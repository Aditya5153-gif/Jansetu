import React from 'react';
import { CheckCircle2, Loader2, Sparkles, Database, FileSpreadsheet, Bot, Send } from 'lucide-react';

export default function AgentStepper({ trace, isProcessing, language = 'hi' }) {
  const isHindi = language === 'hi';

  const defaultSteps = [
    { step: 1, label: isHindi ? 'आवाज़ / इनपुट प्राप्त हुआ' : 'Voice Input Transcribed', icon: Bot },
    { step: 2, label: isHindi ? 'नागरिक प्रोफाइल निकाला गया' : 'Profile & Intent Extracted', icon: Sparkles },
    { step: 3, label: isHindi ? 'MyScheme.gov.in पोर्टल की जांच' : 'Scanned MyScheme & State Portals', icon: Database },
    { step: 4, label: isHindi ? 'rtionline पर कानूनी RTI दर्ज' : 'Filed RTI on rtionline.gov.in', icon: FileSpreadsheet },
    { step: 5, label: isHindi ? 'सरल भाषा में उत्तर व ऑडियो तैयार' : 'Synthesized Answer & Spoken Audio', icon: Send }
  ];

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs sm:text-sm font-bold text-stone-800 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></span>
          <span>{isHindi ? 'जनसेतु एजेंट की कार्यप्रणाली (Agent Execution)' : 'JanSetu Agent Live Execution'}</span>
        </h4>
        {isProcessing ? (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span>{isHindi ? 'कार्य प्रगति पर है...' : 'Processing autonomously...'}</span>
          </span>
        ) : (
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
            {isHindi ? 'कार्य सम्पन्न' : 'Execution Completed'}
          </span>
        )}
      </div>

      {/* Steps List */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
        {defaultSteps.map((s, idx) => {
          const matchedTrace = trace?.find(t => t.step === s.step);
          const isDone = !isProcessing || (trace && trace.length >= s.step);
          const isCurrent = isProcessing && (!trace || trace.length + 1 === s.step);

          return (
            <div
              key={idx}
              className={`p-2.5 rounded-xl border transition-all flex flex-col justify-between ${
                isDone
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : isCurrent
                  ? 'bg-orange-50 border-orange-300 text-orange-950 animate-pulse'
                  : 'bg-stone-50 border-stone-200 text-stone-400'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-[11px] uppercase tracking-wider">
                  {isHindi ? `चरण ${s.step}` : `Step ${s.step}`}
                </span>
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : isCurrent ? (
                  <Loader2 className="w-3.5 h-3.5 text-orange-600 animate-spin" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-stone-300"></span>
                )}
              </div>
              <p className="font-semibold text-xs leading-tight mb-1">{s.label}</p>
              <p className="text-[10px] text-stone-500 line-clamp-1">
                {matchedTrace ? matchedTrace.detail : isDone ? 'Done' : 'Pending'}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
