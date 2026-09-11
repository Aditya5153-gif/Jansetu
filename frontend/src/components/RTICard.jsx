import React, { useState } from 'react';
import { Scale, CheckCircle2, Clock, Copy, Check, FileCode, ShieldAlert, X } from 'lucide-react';

export default function RTICard({ rti, language = 'hi' }) {
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isHindi = language === 'hi';

  if (!rti) return null;

  const department = isHindi && rti.department_hi ? rti.department_hi : rti.department;
  const pio = isHindi && rti.pioOfficer_hi ? rti.pioOfficer_hi : rti.pioOfficer;

  const handleCopyRef = () => {
    navigator.clipboard.writeText(rti.referenceNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-stone-900 to-stone-800 text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-stone-700 relative overflow-hidden">
      {/* Background seal watermarked */}
      <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none text-white">
        <Scale className="w-56 h-56" />
      </div>

      {/* Header Tag */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </span>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              {isHindi ? 'कानूनी कार्रवाई पूर्ण' : 'Action Taken — RTI Filed'}
            </span>
            <h3 className="text-lg font-bold text-white">
              {isHindi ? 'सूचना का अधिकार (RTI) आवेदन दर्ज हुआ' : 'Right to Information Application Filed'}
            </h3>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{rti.portal || 'rtionline.gov.in'}</span>
        </span>
      </div>

      {/* Primary Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Department & PIO */}
        <div className="bg-stone-800/80 border border-stone-700 rounded-xl p-3.5">
          <span className="text-xs text-stone-400 block mb-1 font-medium">
            {isHindi ? 'लक्षित सरकारी विभाग (Department):' : 'Government Department:'}
          </span>
          <p className="text-sm sm:text-base font-bold text-stone-100 mb-2">
            {department}
          </p>

          <span className="text-xs text-stone-400 block mb-1 font-medium">
            {isHindi ? 'जिम्मेदार जन सूचना अधिकारी (PIO):' : 'Designated PIO Officer:'}
          </span>
          <p className="text-xs sm:text-sm font-semibold text-stone-300">
            {pio}
          </p>
        </div>

        {/* Reference Number & Statutory Deadline */}
        <div className="bg-stone-800/80 border border-stone-700 rounded-xl p-3.5 flex flex-col justify-between">
          <div>
            <span className="text-xs text-stone-400 block mb-1 font-medium">
              {isHindi ? 'आधिकारिक संदर्भ संख्या (Reference No):' : 'Official Reference Number:'}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base sm:text-lg font-extrabold text-amber-400 bg-stone-900/90 px-3 py-1 rounded-lg border border-amber-500/30 tracking-wider">
                {rti.referenceNumber}
              </span>
              <button
                onClick={handleCopyRef}
                className="p-1.5 rounded-lg bg-stone-700 hover:bg-stone-600 text-stone-200 transition-colors"
                title="Copy Reference Number"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-stone-700/60 flex items-center gap-2 text-rose-300 text-xs sm:text-sm">
            <Clock className="w-4 h-4 flex-shrink-0 text-rose-400" />
            <span>
              <strong>{isHindi ? 'जवाब की कानूनी अंतिम तिथि:' : 'Response Deadline (30 Days):'}</strong>{' '}
              {rti.deadlineDate}
            </span>
          </div>
        </div>
      </div>

      {/* Action to view full legal draft */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <p className="text-xs text-stone-400 max-w-lg">
          {isHindi
            ? 'धारा 7(1) के तहत विभाग को 30 दिनों में जवाब देना अनिवार्य है। देरी होने पर प्रतिदिन ₹250 जुर्माना लगेगा।'
            : 'Under Section 7(1) of RTI Act 2005, the department is legally required to respond within 30 days.'}
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-stone-700 hover:bg-stone-600 text-stone-100 font-semibold px-4 py-2 rounded-xl text-xs sm:text-sm transition-colors border border-stone-600"
        >
          <FileCode className="w-4 h-4 text-amber-400" />
          <span>{isHindi ? 'कानूनी आवेदन पत्र देखें' : 'View Legal RTI Application'}</span>
        </button>
      </div>

      {/* Modal to view legal draft */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-stone-800">
              <div className="flex items-center gap-2 text-stone-200 font-bold text-sm sm:text-base">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <span>{isHindi ? 'आरटीआई अधिनियम 2005 की धारा 6(1) के तहत आवेदन पत्र' : 'Legal RTI Application under Section 6(1)'}</span>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto flex-1 font-mono text-xs sm:text-sm text-stone-200 bg-stone-950 whitespace-pre-wrap leading-relaxed">
              {rti.legalDraft}
            </div>

            <div className="p-4 border-t border-stone-800 flex justify-end gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(rti.legalDraft);
                  alert(isHindi ? 'आवेदन पत्र कॉपी हो गया!' : 'Legal draft copied to clipboard!');
                }}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                <span>{isHindi ? 'पूरा आवेदन कॉपी करें' : 'Copy Application'}</span>
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs sm:text-sm font-semibold"
              >
                {isHindi ? 'बंद करें' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
