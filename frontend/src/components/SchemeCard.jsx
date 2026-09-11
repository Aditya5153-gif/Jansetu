import React, { useState } from 'react';
import { IndianRupee, FileText, ChevronDown, ChevronUp, ExternalLink, CheckCircle2, Building } from 'lucide-react';

export default function SchemeCard({ scheme, language = 'hi' }) {
  const [isOpen, setIsOpen] = useState(false);
  const isHindi = language === 'hi';

  const name = isHindi && scheme.name_hi ? scheme.name_hi : scheme.name;
  const benefitText = isHindi && scheme.benefit_text_hi ? scheme.benefit_text_hi : scheme.benefit_text;
  const whoItsFor = isHindi && scheme.who_its_for_hi ? scheme.who_its_for_hi : scheme.who_its_for;
  const docs = isHindi && scheme.documents_needed_hi ? scheme.documents_needed_hi : scheme.documents_needed;
  const steps = isHindi && scheme.how_to_apply_hi ? scheme.how_to_apply_hi : scheme.how_to_apply;

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between">
      {/* Header with Level tag & Category */}
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase bg-orange-100 text-orange-800">
            <Building className="w-3 h-3" />
            {scheme.level === 'Central' ? (isHindi ? 'केंद्र सरकार योजना' : 'Central Scheme') : `${scheme.state} ${isHindi ? 'सरकार' : 'Govt'}`}
          </span>
          <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
            {scheme.category}
          </span>
        </div>

        {/* Scheme Name */}
        <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug mb-3">
          {name}
        </h3>

        {/* Benefit Amount Badge */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-3 flex items-start gap-2.5">
          <div className="p-1.5 bg-emerald-600 rounded-md text-white mt-0.5 flex-shrink-0">
            <IndianRupee className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 block">
              {isHindi ? 'सीधा आर्थिक लाभ / सहायता' : 'Direct Financial Benefit'}
            </span>
            <p className="text-sm sm:text-base font-extrabold text-emerald-900 leading-tight">
              {benefitText}
            </p>
          </div>
        </div>

        {/* Who it is for */}
        <div className="text-xs sm:text-sm text-stone-700 mb-3 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
          <span className="font-semibold text-stone-900 block mb-0.5">
            {isHindi ? 'यह योजना किसके लिए है:' : 'Who qualifies:'}
          </span>
          {whoItsFor}
        </div>

        {/* Documents Needed */}
        <div className="mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1.5 flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-stone-600" />
            {isHindi ? 'जरूरी दस्तावेज (कागजात):' : 'Documents Required:'}
          </span>
          <ul className="space-y-1">
            {docs.map((doc, idx) => (
              <li key={idx} className="flex items-start gap-1.5 text-xs sm:text-sm text-stone-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Collapsible How-To-Apply & Direct Action Link */}
      <div className="border-t border-stone-100 bg-stone-50 p-3 sm:p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between text-xs sm:text-sm font-semibold text-orange-700 hover:text-orange-800 py-1"
        >
          <span>{isHindi ? 'आवेदन कैसे करें (स्टेप बाय स्टेप)' : 'How to Apply (Step-by-Step)'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isOpen && (
          <div className="mt-3 pt-3 border-t border-stone-200">
            <ol className="space-y-2 text-xs sm:text-sm text-stone-700 mb-3 pl-1">
              {steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-bold text-orange-600 bg-orange-100 w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            {scheme.official_portal && (
              <a
                href={scheme.official_portal}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 px-3 py-1.5 rounded-lg transition-colors shadow-sm"
              >
                <span>{isHindi ? 'आधिकारिक पोर्टल खोलें' : 'Visit Official Portal'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
