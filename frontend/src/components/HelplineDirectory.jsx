import React, { useState, useEffect } from 'react';
import { PhoneCall, Phone, Clock, ShieldCheck, MapPin, FileText, CheckCircle2, AlertCircle, Building } from 'lucide-react';

export default function HelplineDirectory({ language = 'hi' }) {
  const isHindi = language === 'hi';
  const [helplines, setHelplines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/helplines')
      .then(res => res.json())
      .then(data => {
        setHelplines(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading helplines:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-800 to-stone-900 text-white rounded-2xl p-5 sm:p-7 shadow-md">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <PhoneCall className="w-4 h-4" />
            <span>{isHindi ? 'राष्ट्रीय नागरिक एवं किसान हेल्पलाइन' : 'National Citizen & Farmer Helplines'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2">
            {isHindi ? 'मुफ्त सरकारी सहायता एवं जन सेवा केंद्र' : 'Toll-Free Helplines & CSC Kiosk Assistance'}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100">
            {isHindi 
              ? 'बिना किसी दलाल या बिचौलिये के सीधे भारत सरकार के आधिकारिक हेल्पडेस्क से बात करें।'
              : 'Direct access to government helpdesks for crop advice, stopped installments, insurance claims, and CSC rules.'}
          </p>
        </div>
      </div>

      {/* Helplines Grid */}
      <div>
        <h3 className="text-sm sm:text-base font-bold text-stone-900 mb-3 flex items-center gap-2">
          <Phone className="w-4 h-4 text-emerald-600" />
          <span>{isHindi ? 'सीधी टोल-फ्री कॉलिंग डायरेक्टरी' : 'One-Tap Emergency Direct Dial:'}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {helplines.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-stone-200 rounded-xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    {item.type}
                  </span>
                  <span className="text-xs font-semibold text-stone-500">
                    {item.category}
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-stone-900 mb-1 leading-snug">
                  {isHindi ? item.title_hi : item.title_en}
                </h4>

                <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-4">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>{isHindi ? item.timing_hi : item.timing_en}</span>
                </div>
              </div>

              {/* Dial Button */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-400 block font-medium">
                    {isHindi ? 'टोल-फ्री नंबर:' : 'Toll-Free Number:'}
                  </span>
                  <span className="font-mono text-base font-black text-emerald-700 tracking-wider">
                    {item.number}
                  </span>
                </div>
                <a
                  href={`tel:${item.number.replace(/[^0-9]/g, '')}`}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'कॉल करें' : 'Call Now'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Jan Seva Kendra (CSC) Guide Card */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-2 bg-orange-100 text-orange-700 rounded-xl">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-stone-900">
              {isHindi ? 'जन सेवा केंद्र (CSC / VLE) जाने से पहले जरूरी बातें' : 'Common Service Centre (CSC) Citizen Rights & Guidelines'}
            </h3>
            <p className="text-xs text-stone-500">
              {isHindi ? 'गाँव के कॉमन सर्विस सेंटर में जाने से पहले ये तैयारी रखें' : 'Keep these documents ready before visiting your local kiosk'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-stone-700">
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <h4 className="font-bold text-stone-900 mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-orange-600" />
              <span>{isHindi ? 'साथ ले जाने वाले जरूरी दस्तावेज:' : 'Required Documents Checklist:'}</span>
            </h4>
            <ul className="space-y-1.5">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>
                  {isHindi ? 'आधार कार्ड (जिसमें मोबाइल नंबर लिंक हो OTP के लिए)' : 'Aadhaar Card (linked with mobile number for OTP)'}
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>
                  {isHindi ? 'बैंक खाता पासबुक (DBT/NPCI एक्टिवेट होना चाहिए)' : 'Bank Passbook (must be DBT/NPCI active for direct grants)'}
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>
                  {isHindi ? 'जमीन की नकल / खतौनी / खसरा (किसान योजनाओं के लिए)' : 'Land Ownership Record / Khatauni / Khasra (for farmer schemes)'}
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>
                  {isHindi ? 'राशन कार्ड व 2 पासपोर्ट साइज फोटो' : 'Ration Card and 2 Passport Size Photos'}
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <h4 className="font-bold text-stone-900 mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{isHindi ? 'आपके कानूनी अधिकार (CSC Rights):' : 'Your Statutory Rights:'}</span>
            </h4>
            <ul className="space-y-1.5 text-stone-600">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>
                  {isHindi 
                    ? <><strong>मुफ्त रसीद:</strong> किसी भी आवेदन के बाद कम्प्यूटराइज्ड रसीद (Acknowledgement Receipt) लेना आपका कानूनी अधिकार है।</>
                    : <><strong>Free Receipt:</strong> It is your legal right to receive a computerized acknowledgement receipt for every application.</>}
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>
                  {isHindi 
                    ? <><strong>सरकारी शुल्क:</strong> अधिकांश किसान योजनाओं में ऑनलाइन फॉर्म सरकार द्वारा मुफ्त होता है, CSC ऑपरेटर केवल ₹15 से ₹30 सरकारी सेवा शुल्क ले सकता है।</>
                    : <><strong>Prescribed Fee:</strong> Most government welfare forms are free. CSC kiosks are only permitted to charge ₹15 to ₹30 facilitation fee.</>}
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>
                  {isHindi 
                    ? <><strong>शिकायत:</strong> यदि कोई संचालक अतिरिक्त पैसे मांगे, तो सीधे टोल-फ्री <strong>14599</strong> (CSC Support) पर शिकायत दर्ज करें।</>
                    : <><strong>Grievance Redressal:</strong> If any operator demands bribes or overcharges, call toll-free <strong>14599</strong> (CSC Central Support) immediately.</>}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
