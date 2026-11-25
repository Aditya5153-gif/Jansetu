import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Scale, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight,
  ExternalLink, 
  Sparkles,
  BarChart3
} from 'lucide-react';

export default function CivicFeaturesGuide({ language = 'hi' }) {
  const isHindi = language === 'hi';
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q_hi: 'क्या मुझे योजनाओं के लिए अलग से आवेदन करना होगा?',
      q_en: 'Do I need to apply separately for each scheme?',
      a_hi: 'नहीं, जनसेतु आपके विवरण (आय, जमीन, पेशा) के आधार पर सभी पात्र योजनाओं की सीधी सूची और आधिकारिक आवेदन लिंक एक ही स्थान पर उपलब्ध कराता है। आपको अलग-अलग दफ्तरों के चक्कर काटने की आवश्यकता नहीं है।',
      a_en: 'No, JanSetu analyzes your profile (income, land, occupation) and instantly provides direct eligibility details and official application links all in one place.'
    },
    {
      q_hi: 'RTI आवेदन की प्रक्रिया क्या है और इसमें कितना समय लगता है?',
      q_en: 'What is the RTI application process and how long does it take?',
      a_hi: 'जनसेतु पर आप बोलकर या लिखकर अपनी समस्या दर्ज करते हैं। AI धारा 6(1) के तहत संबंधित विभाग के लिए वैध कानूनी RTI नोटिस तैयार करता है। RTI अधिनियम की धारा 7(1) के तहत विभाग को 30 दिनों के भीतर जवाब देना अनिवार्य होता है।',
      a_en: 'Simply speak or type your grievance on JanSetu. The AI drafts a statutory Section 6(1) RTI petition. Under Section 7(1) of the RTI Act, public authorities must provide a response within 30 days.'
    },
    {
      q_hi: 'योजना की पात्रता क्या है? (जैसे: PM आवास योजना, किसान सम्मान निधि)',
      q_en: 'What is the scheme eligibility criteria? (e.g. PM Awas, Kisan Samman Nidhi)',
      a_hi: 'पात्रता आपकी वार्षिक पारिवारिक आय, भूमि जोत, जाति वर्ग और निवास राज्य पर निर्भर करती है। उदाहरण के लिए PM-किसान के लिए किसान परिवार और PMAY के लिए बेघर या कच्चे मकान वाले परिवार पात्र होते हैं। जनसेतु आपके विवरण के अनुसार स्वयं पात्रता की पुष्टि करता है।',
      a_en: 'Eligibility is based on your family income, land size, caste category, and state. For example, PM-KISAN requires landholding details, while PMAY prioritizes kutcha houses. JanSetu automatically verifies your criteria.'
    }
  ];

  return (
    <div className="space-y-6 mt-6 mb-8 relative z-10">
      
      {/* SECTION 1: How JanSetu Works (जनसेतु कैसे काम करता है? - 4 Prussian Blue Gradient Cards) */}
      <div className="bg-[#faedd9] rounded-3xl p-5 sm:p-7 border border-[#d8b992] shadow-xs text-[#2b1f17]">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#fae2c6] text-[#78350f] border border-[#e2a87c] mb-2.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#b45309]" />
            <span>{isHindi ? 'जनसेतु की प्रमुख सेवाएं' : 'Key Services of JanSetu'}</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#26160c] tracking-tight">
            {isHindi ? 'जनसेतु कैसे काम करता है?' : 'How JanSetu Works?'}
          </h2>
          <p className="text-xs sm:text-sm text-[#634f3f] mt-1.5 font-medium">
            {isHindi 
              ? 'किसी भी योजना तक पहुंचना अब हुआ और भी आसान! यहाँ जानिए कैसे जनसेतु आपकी मदद करता है:'
              : 'Reaching welfare and constitutional rights is now simple! Here is how JanSetu helps you:'}
          </p>
        </div>

        {/* 4 Cards with Prussian Blue gradient */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          {/* Card 1 */}
          <div className="bg-prussian-gradient rounded-2xl p-4 sm:p-5 text-white shadow-md transition-transform hover:-translate-y-0.5">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-8 h-8 rounded-full bg-[#07253a] text-white font-black text-sm flex items-center justify-center flex-shrink-0 shadow-xs border border-sky-400/30">
                1
              </div>
              <h3 className="font-bold text-base sm:text-lg text-white leading-snug">
                {isHindi ? 'योजनाओं की खोज 🌾' : 'Discover Welfare Schemes 🌾'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-sky-100/95 leading-relaxed pl-11">
              {isHindi 
                ? 'सभी सरकारी योजनाओं की जानकारी एक ही स्थान पर पाएं।' 
                : 'Access verified central and state welfare scheme information in one single place.'}
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-prussian-gradient rounded-2xl p-4 sm:p-5 text-white shadow-md transition-transform hover:-translate-y-0.5">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-8 h-8 rounded-full bg-[#07253a] text-white font-black text-sm flex items-center justify-center flex-shrink-0 shadow-xs border border-sky-400/30">
                2
              </div>
              <h3 className="font-bold text-base sm:text-lg text-white leading-snug">
                {isHindi ? 'आवेदन और पंजीकरण 🔍' : 'Apply & Registration 🔍'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-sky-100/95 leading-relaxed pl-11">
              {isHindi 
                ? 'ऑनलाइन आवेदन करें, लाभार्थी बनें और अपनी योजनाओं को ट्रैक करें।' 
                : 'Apply online, register as an approved beneficiary, and monitor your scheme status.'}
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-prussian-gradient rounded-2xl p-4 sm:p-5 text-white shadow-md transition-transform hover:-translate-y-0.5">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-8 h-8 rounded-full bg-[#07253a] text-white font-black text-sm flex items-center justify-center flex-shrink-0 shadow-xs border border-sky-400/30">
                3
              </div>
              <h3 className="font-bold text-base sm:text-lg text-white leading-snug">
                {isHindi ? 'RTI के तहत जानकारी ⚖️' : 'Get Information via RTI ⚖️'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-sky-100/95 leading-relaxed pl-11">
              {isHindi 
                ? 'सूचना का अधिकार के तहत जानकारी प्राप्त करें।' 
                : 'Demand statutory records, project status, and accountability under the RTI Act.'}
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-prussian-gradient rounded-2xl p-4 sm:p-5 text-white shadow-md transition-transform hover:-translate-y-0.5">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-8 h-8 rounded-full bg-[#07253a] text-white font-black text-sm flex items-center justify-center flex-shrink-0 shadow-xs border border-sky-400/30">
                4
              </div>
              <h3 className="font-bold text-base sm:text-lg text-white leading-snug">
                {isHindi ? 'सरकारी सेवाओं तक सीधी पहुंच 🏛️' : 'Direct Access to Public Services 🏛️'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-sky-100/95 leading-relaxed pl-11">
              {isHindi 
                ? 'विभिन्न सरकारी सेवाओं का लाभ एक ही प्लेटफॉर्म पर पाएं।' 
                : 'Unlock essential citizen helplines and public welfare portals on a unified interface.'}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: RTI Shield Banner (Forest Green to Walnut Gradient) */}
      <div className="bg-shield-gradient rounded-3xl p-5 sm:p-7 text-white shadow-lg relative overflow-hidden">
        {/* Banner Top Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-white/15">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#a16207]/30 border border-amber-400/40 text-amber-300 flex items-center justify-center flex-shrink-0 shadow-inner">
              <BarChart3 className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white leading-tight">
                {isHindi ? 'आरटीआई अधिनियम व कानूनी सहायता (RTI Shield)' : 'RTI Act & Legal Protection (RTI Shield)'}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 font-medium mt-1">
                {isHindi 
                  ? 'सूचना का अधिकार (RTI) अधिनियम, 2005 के तहत अपने अधिकारों की रक्षा करें और पारदर्शिता सुनिश्चित करें।' 
                  : 'Protect your statutory citizen rights and ensure administrative transparency under RTI Act 2005.'}
              </p>
            </div>
          </div>

          <a 
            href="https://rtionline.gov.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="self-start sm:self-center inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#14532d] hover:bg-[#166534] text-white shadow-md hover:shadow-lg transition-all border border-emerald-400/30 whitespace-nowrap cursor-pointer"
          >
            <span>{isHindi ? 'अधिक जानकारी देखें' : 'View More Details'}</span>
            <span>→</span>
          </a>
        </div>

        {/* 3 Translucent Sub-Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Card 1: Section 6(1) */}
          <div className="bg-[#081e13]/70 border border-emerald-400/25 rounded-2xl p-4 backdrop-blur-xs">
            <div className="text-amber-300 text-[11px] font-black uppercase tracking-wider mb-1">
              {isHindi ? 'धारा 6(1) - SECTION 6(1)' : 'SECTION 6(1) - FILING'}
            </div>
            <h3 className="font-bold text-sm sm:text-base text-white mb-1">
              {isHindi ? 'सूचना का अधिकार' : 'Right to Information'}
            </h3>
            <p className="text-xs text-stone-200 leading-relaxed font-normal">
              {isHindi 
                ? 'किसी भी सरकारी विभाग से सूचना मांगने का अधिकार।' 
                : 'Legal power to demand public records and copies from any government department.'}
            </p>
          </div>

          {/* Card 2: Section 7(1) */}
          <div className="bg-[#1a230b]/70 border border-amber-400/25 rounded-2xl p-4 backdrop-blur-xs">
            <div className="text-amber-300 text-[11px] font-black uppercase tracking-wider mb-1">
              {isHindi ? 'धारा 7(1) - SECTION 7(1)' : 'SECTION 7(1) - 30 DAYS'}
            </div>
            <h3 className="font-bold text-sm sm:text-base text-white mb-1">
              {isHindi ? '30 दिन में जवाब पाएं' : 'Get Response in 30 Days'}
            </h3>
            <p className="text-xs text-stone-200 leading-relaxed font-normal">
              {isHindi 
                ? 'आपकी आरटीआई पर 30 दिनों के भीतर जवाब दिया जाना आवश्यक है।' 
                : 'Public Information Officers are legally bound to reply within a strict 30-day window.'}
            </p>
          </div>

          {/* Card 3: Section 19(1) */}
          <div className="bg-[#2a1307]/70 border border-orange-400/25 rounded-2xl p-4 backdrop-blur-xs">
            <div className="text-amber-300 text-[11px] font-black uppercase tracking-wider mb-1">
              {isHindi ? 'धारा 19(1) - FIRST APPEAL' : 'SECTION 19(1) - FIRST APPEAL'}
            </div>
            <h3 className="font-bold text-sm sm:text-base text-white mb-1">
              {isHindi ? 'पहली अपील का अधिकार' : 'Right to First Appeal'}
            </h3>
            <p className="text-xs text-stone-200 leading-relaxed font-normal">
              {isHindi 
                ? 'यदि जवाब न मिले तो निर्धारित अधिकारी के पास प्रथम अपील करें।' 
                : 'File a First Appeal before senior appellate officers if the PIO fails to answer.'}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: Frequently Asked Questions (FAQ) */}
      <div className="bg-[#faedd9] rounded-3xl p-5 sm:p-7 border border-[#d8b992] shadow-xs text-[#2b1f17]">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-full bg-[#fae0c2] text-[#78350f] border border-[#e2a87c] flex items-center justify-center font-black text-base flex-shrink-0">
            ?
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-[#26160c] tracking-tight">
              {isHindi ? 'अक्सर पूछे जाने वाले प्रश्न (FAQ)' : 'Frequently Asked Questions (FAQ)'}
            </h2>
            <p className="text-xs sm:text-sm text-[#634f3f] font-medium">
              {isHindi 
                ? 'जनसेतु से जुड़े सामान्य सवालों के जवाब यहाँ पाएं' 
                : 'Find answers to common questions about using JanSetu and claiming welfare'}
            </p>
          </div>
        </div>

        {/* Accordion Questions */}
        <div className="space-y-2.5 mt-5">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="border border-[#d8b992]/80 rounded-2xl overflow-hidden transition-all bg-[#fff8f0] hover:bg-[#ffffff]"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-3.5 sm:p-4 flex items-center justify-between gap-3 text-[#2b1f17] font-bold text-xs sm:text-sm cursor-pointer"
                >
                  <span>{isHindi ? faq.q_hi : faq.q_en}</span>
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-[#78350f] flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#8a7260] flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-[#5c4738] border-t border-[#ebd1b0] pt-3 leading-relaxed bg-[#fffbf7]">
                    {isHindi ? faq.a_hi : faq.a_en}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
