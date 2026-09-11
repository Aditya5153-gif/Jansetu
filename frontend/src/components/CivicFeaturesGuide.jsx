import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Scale, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Zap
} from 'lucide-react';

export default function CivicFeaturesGuide({ language = 'hi' }) {
  const isHindi = language === 'hi';
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q_hi: 'क्या मुझे योजनाएं खोजने के लिए कोई लंबा सरकारी फॉर्म भरना पड़ेगा?',
      q_en: 'Do I have to fill any lengthy government form to find schemes?',
      a_hi: 'बिल्कुल नहीं! जनसेतु "जीरो-फॉर्म" तकनीक पर आधारित है। आप बस माइक दबाकर बोलें या सादे शब्दों में बताएं। AI आपकी आय, राज्य, भूमि और वर्ग की पहचान स्वयं कर 2,500+ योजनाओं से मिलान कर देता है।',
      a_en: 'Not at all! JanSetu uses zero-form voice/text technology. Simply speak or type in plain language. The AI extracts your profile and instantly matches against 2,500+ central and state schemes.'
    },
    {
      q_hi: 'RTI दर्ज करने की सरकारी फीस कितनी है और क्या यह गरीब नागरिकों के लिए मुफ्त है?',
      q_en: 'What is the government RTI fee, and is it free for low-income citizens?',
      a_hi: 'केंद्र सरकार के पोर्टल पर सामान्य नागरिकों के लिए केवल ₹10 का शुल्क है। आरटीआई अधिनियम की धारा 7(5) के तहत गरीबी रेखा से नीचे (BPL/अंत्योदय) आने वाले सभी नागरिकों के लिए आवेदन 100% निःशुल्क है।',
      a_en: 'The standard central RTI application fee is just ₹10. Under Section 7(5) of the RTI Act 2005, applicants below the poverty line (BPL) are 100% exempt from all fees.'
    },
    {
      q_hi: 'यदि जन सूचना अधिकारी (PIO) ने 30 दिन में जवाब नहीं दिया तो क्या होगा?',
      q_en: 'What happens if the PIO officer fails to respond within 30 days?',
      a_hi: 'धारा 7(2) के अनुसार 30 दिन में जवाब न आना "अस्वीकृति (Deemed Refusal)" माना जाता है। धारा 7(6) के तहत आपको सभी दस्तावेज मुफ्त दिए जाने का नियम है। जनसेतु तुरंत धारा 19(1) के तहत प्रथम अपील और धारा 20(1) के तहत ₹250/दिन जुर्माने की अर्जी बना देता है।',
      a_en: 'Under Section 7(2), failure to respond in 30 days is deemed a refusal. Under Section 7(6), all documents must subsequently be supplied free of cost. JanSetu immediately drafts a statutory First Appeal under Section 19(1) citing Section 20(1) penalties.'
    },
    {
      q_hi: 'क्या कम पढ़े-लिखे या ग्रामीण किसान इसका उपयोग बिना किसी सहायता के कर सकते हैं?',
      q_en: 'Can rural farmers or citizens with low literacy use this independently?',
      a_hi: 'हाँ! जनसेतु को विशेष रूप से ग्रामीण भारत के लिए बनाया गया है। इसमें बड़ा माइक बटन है, 8वीं कक्षा के स्तर की सरल भाषा है, और पूरा उत्तर हिंदी में बोलकर सुनाया जाता है (Text-to-Speech)।',
      a_en: 'Yes! JanSetu is specifically built with a zero-literacy barrier. It features a large microphone button, simple 8th-grade language, and speaks all answers aloud in natural Hindi or English.'
    }
  ];

  const officialPortals = [
    {
      name: 'MyScheme.gov.in',
      desc_hi: 'भारत सरकार का राष्ट्रीय योजना पोर्टल (सभी 29 राज्य व केंद्र)',
      desc_en: 'National portal for all central & state schemes',
      url: 'https://www.myscheme.gov.in',
      badge: 'Official GoI'
    },
    {
      name: 'RTIOnline.gov.in',
      desc_hi: 'कार्मिक एवं प्रशिक्षण विभाग (DoPT) द्वारा संचालित RTI पोर्टल',
      desc_en: 'Central Online RTI Portal by DoPT, Govt of India',
      url: 'https://rtionline.gov.in',
      badge: 'DoPT Portal'
    },
    {
      name: 'PM-KISAN Portal',
      desc_hi: 'किसान सम्मान निधि DBT खाता व ई-केवाईसी जांच केंद्र',
      desc_en: 'Direct Benefit Transfer & e-KYC management for farmers',
      url: 'https://pmkisan.gov.in',
      badge: 'Ministry of Agri'
    },
    {
      name: 'National Health Portal (PM-JAY)',
      desc_hi: 'आयुष्मान भारत ₹5 लाख मुफ्त कैशलेस इलाज व गोल्डन कार्ड',
      desc_en: 'Ayushman Bharat free cashless hospitalisation',
      url: 'https://pmjay.gov.in',
      badge: 'NHA Portal'
    }
  ];

  return (
    <div className="space-y-8 mt-10 mb-8">
      {/* SECTION 1: How JanSetu Works (4-Step Visual Flow) */}
      <div className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-8 shadow-xs">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 mb-2">
            <Zap className="w-3.5 h-3.5" />
            {isHindi ? 'सरल व पारदर्शी प्रक्रिया' : 'Simple & Transparent Process'}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
            {isHindi ? 'जनसेतु कैसे काम करता है?' : 'How JanSetu Works'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {isHindi 
              ? 'बिना किसी दफ्तर के चक्कर काटे, अपनी भाषा में सरकारी लाभ और कानूनी जवाब पाएं'
              : 'Empowering citizens to claim welfare and demand accountability with zero paperwork'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {/* Step 1 */}
          <div className="bg-stone-50/80 border border-stone-200/80 rounded-2xl p-4 sm:p-5 relative hover:border-orange-300 transition-all group">
            <div className="w-9 h-9 rounded-xl bg-orange-600 text-white font-black text-sm flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
              1
            </div>
            <h3 className="font-bold text-sm text-stone-900 mb-1.5 flex items-center gap-1.5">
              <span>{isHindi ? 'बोलें या लिखें' : 'Speak or Type'}</span>
              <span className="text-xs">🎤</span>
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {isHindi 
                ? 'माइक दबाकर अपनी बोली (हिंदी या अंग्रेजी) में अपनी स्थिति बताएं। कोई फॉर्म नहीं भरना।' 
                : 'Simply speak in Hindi or English. No lengthy government forms or paperwork needed.'}
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-stone-50/80 border border-stone-200/80 rounded-2xl p-4 sm:p-5 relative hover:border-orange-300 transition-all group">
            <div className="w-9 h-9 rounded-xl bg-amber-600 text-white font-black text-sm flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
              2
            </div>
            <h3 className="font-bold text-sm text-stone-900 mb-1.5 flex items-center gap-1.5">
              <span>{isHindi ? 'AI पात्रता विश्लेषण' : 'AI Eligibility Engine'}</span>
              <span className="text-xs">🧠</span>
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {isHindi 
                ? 'AI आपकी आय, जमीन, राज्य व पेशे को समझकर 2,500+ सरकारी नियमों से तत्काल मिलान करता है।' 
                : 'Instantly matches your occupation, land, and income against 2,500+ central & state scheme rules.'}
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-stone-50/80 border border-stone-200/80 rounded-2xl p-4 sm:p-5 relative hover:border-orange-300 transition-all group">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
              3
            </div>
            <h3 className="font-bold text-sm text-stone-900 mb-1.5 flex items-center gap-1.5">
              <span>{isHindi ? 'सीधा ₹ लाभ व कागज़ात' : 'Direct ₹ Cash & Docs'}</span>
              <span className="text-xs">💰</span>
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {isHindi 
                ? 'प्रति वर्ष मिलने वाले कुल रुपयों की गणना और CSC केंद्र पर ले जाने वाले आवश्यक दस्तावेजों की सूची।' 
                : 'Calculates direct annual cash benefits and gives a checklist of required documents for CSC kiosks.'}
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-stone-50/80 border border-stone-200/80 rounded-2xl p-4 sm:p-5 relative hover:border-orange-300 transition-all group">
            <div className="w-9 h-9 rounded-xl bg-red-600 text-white font-black text-sm flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
              4
            </div>
            <h3 className="font-bold text-sm text-stone-900 mb-1.5 flex items-center gap-1.5">
              <span>{isHindi ? 'कानूनी RTI व 30-दिन ट्रैकिंग' : 'RTI Filing & 30-Day Limit'}</span>
              <span className="text-xs">⚖️</span>
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {isHindi 
                ? 'लापरवाह विभाग पर धारा 6(1) कानूनी नोटिस, ट्रैकिंग नंबर, और 30 दिन में प्रथम अपील का अधिकार।' 
                : 'Drafts statutory Section 6(1) RTI, tracks 30-day deadlines, and drafts First Appeals under Section 19.'}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: Constitutional Shield & Citizen Rights Accordion/Card */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-stone-700/60 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-2 bg-orange-500/20 text-orange-400 rounded-xl border border-orange-500/30">
                <Scale className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                {isHindi ? 'नागरिक अधिकार व कानूनी कवच (RTI Shield)' : 'Constitutional RTI Rights & Shield'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-300">
              {isHindi 
                ? 'सूचना का अधिकार अधिनियम, 2005 के तहत देश के हर नागरिक को प्राप्त प्रमुख संवैधानिक शक्तियां' 
                : 'Key statutory protections under the Right to Information Act, 2005 for every Indian citizen'}
            </p>
          </div>
          <span className="self-start md:self-auto text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            ⚖️ {isHindi ? 'भारत का संविधान' : 'Constitution of India'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-stone-800/80 border border-stone-700/80 rounded-2xl p-4 hover:border-orange-500/50 transition-colors">
            <div className="text-orange-400 text-xs font-black uppercase tracking-wider mb-1">धारा 6(1) • Section 6(1)</div>
            <h3 className="font-bold text-sm text-white mb-1">
              {isHindi ? 'सरकारी रिकॉर्ड व टेंडर जांच' : 'Public Audit & Tender Inspection'}
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              {isHindi 
                ? 'सड़क, पुल, राशन कोटेदार या आवास योजना के सरकारी टेंडर, खर्च बिल, और मस्टर रोल की प्रमाणित प्रतियां मांगने का कानूनी हक।'
                : 'Legal right to demand certified copies of government contracts, project expenditures, sanction orders, and muster rolls.'}
            </p>
          </div>

          <div className="bg-stone-800/80 border border-stone-700/80 rounded-2xl p-4 hover:border-amber-500/50 transition-colors">
            <div className="text-amber-400 text-xs font-black uppercase tracking-wider mb-1">धारा 7(1) व 7(5) • Sec 7(1) & 7(5)</div>
            <h3 className="font-bold text-sm text-white mb-1">
              {isHindi ? '30 दिन की सीमा व BPL छूट' : '30-Day Limit & 100% BPL Waiver'}
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              {isHindi 
                ? 'अफसर को 30 दिन में जवाब देना अनिवार्य है। BPL / अंत्योदय परिवारों के लिए कोई फीस नहीं (100% निःशुल्क आवेदन)।'
                : 'Mandatory 30-day statutory deadline for the PIO. BPL and Antyodaya families pay zero fees (100% free application).'}
            </p>
          </div>

          <div className="bg-stone-800/80 border border-stone-700/80 rounded-2xl p-4 hover:border-red-500/50 transition-colors">
            <div className="text-red-400 text-xs font-black uppercase tracking-wider mb-1">धारा 19(1) व 20(1) • First Appeal</div>
            <h3 className="font-bold text-sm text-white mb-1">
              {isHindi ? 'प्रथम अपील व ₹250/दिन जुर्माना' : 'First Appeal & ₹25,000 Penalty'}
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              {isHindi 
                ? '30 दिन में जवाब न मिलने पर दस्तावेज पूरी तरह मुफ्त (7(6)) मिलते हैं और लापरवाह अफसर पर ₹25,000 तक का जुर्माना लग सकता है।'
                : 'If unanswered in 30 days, documents must be provided free of cost (Sec 7(6)) and non-compliant PIOs face penalties under Sec 20(1).'}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: Frequently Asked Questions (FAQ) */}
      <div className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-2 bg-amber-100 text-amber-800 rounded-xl">
            <HelpCircle className="w-5 h-5" />
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
            {isHindi ? 'अक्सर पूछे जाने वाले प्रश्न (FAQ)' : 'Frequently Asked Questions'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-500 mb-6">
          {isHindi 
            ? 'योजनाओं के आवेदन, आरटीआई नियमों और जनसेतु के उपयोग से जुड़ी महत्वपूर्ण जानकारियां'
            : 'Essential guidance regarding scheme eligibility, RTI filing rules, and using JanSetu'}
        </p>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className={`border rounded-2xl transition-all overflow-hidden ${
                  isOpen ? 'border-orange-300 bg-orange-50/20 shadow-2xs' : 'border-stone-200 bg-stone-50/50 hover:bg-stone-50'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-4.5 flex items-center justify-between gap-3 text-stone-900 font-bold text-xs sm:text-sm cursor-pointer"
                >
                  <span>{isHindi ? faq.q_hi : faq.q_en}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-orange-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-4.5 text-xs sm:text-sm text-stone-600 border-t border-stone-200/60 pt-3 leading-relaxed">
                    {isHindi ? faq.a_hi : faq.a_en}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 4: Official Portals & Trust Badges */}
      <div className="bg-stone-100 border border-stone-200 rounded-3xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <div>
            <h3 className="text-sm sm:text-base font-black text-stone-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{isHindi ? 'प्रमाणित सरकारी पोर्टल एवं स्रोत' : 'Verified Government Portals & Sources'}</span>
            </h3>
            <p className="text-[11px] sm:text-xs text-stone-500">
              {isHindi ? 'जनसेतु का डेटा सीधे आधिकारिक भारत सरकार के पोर्टलों से सत्यापित है' : 'JanSetu references official Government of India repositories'}
            </p>
          </div>
          <span className="text-[11px] font-bold bg-white text-stone-600 px-3 py-1 rounded-full border border-stone-200 self-start sm:self-auto">
            🇮🇳 Digital India Direct Links
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {officialPortals.map((portal, idx) => (
            <a
              key={idx}
              href={portal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-stone-200 rounded-xl p-3.5 hover:border-orange-400 hover:shadow-xs transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
                    {portal.name}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-orange-600" />
                </div>
                <p className="text-[11px] text-stone-500 line-clamp-2">
                  {isHindi ? portal.desc_hi : portal.desc_en}
                </p>
              </div>
              <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] font-bold text-emerald-700">
                <span>{portal.badge}</span>
                <span className="text-orange-600 group-hover:underline">Visit ↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
