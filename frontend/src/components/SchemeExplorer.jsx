import React, { useState, useEffect } from 'react';
import { Search, Filter, Layers, Building, IndianRupee, FileText, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import SchemeCard from './SchemeCard';

const CATEGORIES = [
  { id: 'All', name_hi: 'सभी योजनाएं', name_en: 'All Schemes' },
  { id: 'Agriculture', name_hi: '🌾 कृषि व किसान', name_en: 'Agriculture & Credit' },
  { id: 'Irrigation', name_hi: '💧 सिंचाई व सोलर पंप', name_en: 'Irrigation & Solar' },
  { id: 'Insurance', name_hi: '🛡️ फसल व जीवन बीमा', name_en: 'Crop Insurance' },
  { id: 'Healthcare', name_hi: '🏥 मुफ्त स्वास्थ्य (आयुष्मान)', name_en: 'Healthcare' },
  { id: 'Housing', name_hi: '🏠 पक्का आवास (PMAY)', name_en: 'Housing' },
  { id: 'Pension', name_hi: '👵 पेंशन व सुरक्षा', name_en: 'Pension & Social' },
  { id: 'Women & Child', name_hi: '👩 महिला व बाल कल्याण', name_en: 'Women & Child' }
];

const STATES = [
  { id: 'All', label_hi: 'सभी राज्य व केंद्र', label_en: 'All India & Central' },
  { id: 'Uttar Pradesh', label_hi: 'उत्तर प्रदेश (UP)', label_en: 'Uttar Pradesh' },
  { id: 'Bihar', label_hi: 'बिहार (Bihar)', label_en: 'Bihar' },
  { id: 'Madhya Pradesh', label_hi: 'मध्य प्रदेश (MP)', label_en: 'Madhya Pradesh' },
  { id: 'Maharashtra', label_hi: 'महाराष्ट्र (Maharashtra)', label_en: 'Maharashtra' },
  { id: 'Rajasthan', label_hi: 'राजस्थान (Rajasthan)', label_en: 'Rajasthan' },
  { id: 'Punjab', label_hi: 'पंजाब (Punjab)', label_en: 'Punjab' }
];

export default function SchemeExplorer({ language = 'hi', userState = 'All' }) {
  const isHindi = language === 'hi';
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedState, setSelectedState] = useState(userState || 'All');
  const [searchTerm, setSearchTerm] = useState('');

  // Sync state if userProfile state changes
  useEffect(() => {
    if (userState && userState !== 'All') {
      setSelectedState(userState);
    }
  }, [userState]);

  // Fetch filtered schemes
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (selectedCategory !== 'All') params.append('category', selectedCategory);
    if (selectedState !== 'All') params.append('state', selectedState);
    if (searchTerm.trim()) params.append('search', searchTerm.trim());

    fetch(`/api/schemes?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setSchemes(data.schemes || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching schemes:', err);
        setLoading(false);
      });
  }, [selectedCategory, selectedState, searchTerm]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Search & Filter Header Banner */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 bg-orange-100 text-orange-700 rounded-xl">
                <Layers className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                {isHindi ? 'सरकारी योजना अन्वेषक (Scheme Explorer)' : 'Government Schemes Directory'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-600">
              {isHindi
                ? 'भारत सरकार एवं राज्य सरकारों की 2,500+ कल्याणकारी योजनाओं की प्रमाणित डायरेक्टरी'
                : 'Verified repository of Central and State government welfare schemes with direct benefit details'}
            </p>
          </div>

          {/* State Filter Dropdown */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs font-bold text-stone-600 whitespace-nowrap">
              {isHindi ? 'राज्य चुनें:' : 'State:'}
            </span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="text-xs sm:text-sm font-semibold bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 text-stone-900"
            >
              {STATES.map(s => (
                <option key={s.id} value={s.id}>
                  {isHindi ? s.label_hi : s.label_en}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              isHindi
                ? 'योजना का नाम, नकद लाभ, या विषय खोजें (उदा. PM-KISAN, बोरिंग, आवास, खाद...)'
                : 'Search scheme by keyword, benefit, or sector (e.g. PM-KISAN, solar pump, housing, pension...)'
            }
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 text-stone-900 font-medium placeholder:text-stone-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-600 bg-stone-200 px-2 py-0.5 rounded"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {isHindi ? cat.name_hi : cat.name_en}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-stone-600 px-1">
        <span className="font-bold text-stone-800">
          {isHindi 
            ? `कुल ${schemes.length} प्रमाणित योजनाएं उपलब्ध हैं` 
            : `Showing ${schemes.length} verified government schemes`}
        </span>
        <span className="text-xs text-stone-500 hidden sm:inline">
          {isHindi ? 'MyScheme.gov.in व राज्य पोर्टल द्वारा सत्यापित' : 'Linked with MyScheme.gov.in'}
        </span>
      </div>

      {/* Loading Skeleton or Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="bg-white rounded-xl border border-stone-200 p-5 animate-pulse space-y-3">
              <div className="h-4 bg-stone-200 rounded w-1/3"></div>
              <div className="h-6 bg-stone-200 rounded w-3/4"></div>
              <div className="h-16 bg-stone-100 rounded"></div>
              <div className="h-4 bg-stone-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : schemes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {schemes.map(scheme => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              language={language}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-stone-200 rounded-2xl p-10 text-center text-stone-500">
          <p className="text-base font-bold text-stone-800 mb-1">
            {isHindi ? 'कोई योजना नहीं मिली' : 'No matching schemes found'}
          </p>
          <p className="text-xs sm:text-sm max-w-md mx-auto mb-4">
            {isHindi 
              ? 'कृपया दूसरा खोज शब्द दर्ज करें या श्रेणी / राज्य का फ़िल्टर बदलकर पुनः प्रयास करें।'
              : 'Please try adjusting your search terms or select another category or state.'}
          </p>
          <button
            onClick={() => { setSelectedCategory('All'); setSelectedState('All'); setSearchTerm(''); }}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition-colors"
          >
            {isHindi ? 'सभी योजनाएं देखें' : 'Reset All Filters'}
          </button>
        </div>
      )}
    </div>
  );
}
