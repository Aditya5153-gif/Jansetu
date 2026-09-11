import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  HelpCircle, 
  Sparkles, 
  IndianRupee, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Volume2, 
  ArrowRight,
  ShieldCheck,
  Award,
  Layers,
  FileSpreadsheet,
  Scale,
  Sparkle,
  User,
  Edit3,
  Bot,
  Compass,
  PhoneCall,
  Search,
  X
} from 'lucide-react';
import VoiceAssistant from './components/VoiceAssistant';
import SchemeCard from './components/SchemeCard';
import RTICard from './components/RTICard';
import AgentStepper from './components/AgentStepper';
import UserProfileModal from './components/UserProfileModal';
import SchemeExplorer from './components/SchemeExplorer';
import RTITrackerStudio from './components/RTITrackerStudio';
import HelplineDirectory from './components/HelplineDirectory';
import CivicFeaturesGuide from './components/CivicFeaturesGuide';

const QUICK_SEARCH_TAGS = [
  { label_hi: '🌾 PM-KISAN किस्त', label_en: '🌾 PM-KISAN Benefit', query: 'PM-KISAN किस्त और बैंक खाता समस्या' },
  { label_hi: '☀️ सोलर पंप (KUSUM)', label_en: '☀️ Solar Pump Subsidy', query: 'PM-KUSUM सोलर पंप योजना 60% सब्सिडी' },
  { label_hi: '🛣️ टूटी सड़क PWD', label_en: '🛣️ Broken Village Road', query: 'गाँव की मुख्य सड़क 3 साल से टूटी है PWD में RTI दर्ज करें' },
  { label_hi: '🏥 आयुष्मान कार्ड 5 लाख', label_en: '🏥 Ayushman Bharat Card', query: 'आयुष्मान भारत 5 लाख मुफ्त इलाज योजना' },
  { label_hi: '👩 लखपति दीदी लोन', label_en: '👩 Lakhpati Didi SHG', query: 'लखपति दीदी स्वयं सहायता समूह ब्याज मुक्त लोन' },
  { label_hi: '🌾 राशन कोटेदार समस्या', label_en: '🌾 Ration Dealer Grievance', query: 'राशन कोटेदार पूरा अनाज नहीं दे रहा खाद्य विभाग RTI' },
  { label_hi: '🏠 आवास योजना (PMAY)', label_en: '🏠 Housing Scheme PMAY', query: 'प्रधानमंत्री ग्रामीण आवास योजना पक्का मकान' }
];

export default function App() {
  const [language, setLanguage] = useState('hi');
  const [activeLayer, setActiveLayer] = useState('agent'); // 'agent' | 'schemes' | 'rti' | 'helpline'
  const [mode, setMode] = useState('BOTH'); // 'SCHEME' | 'RTI' | 'BOTH'
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [backendHealth, setBackendHealth] = useState(null);

  // User details state (customizable by user)
  const [userProfile, setUserProfile] = useState({
    name: '',
    state: 'Uttar Pradesh',
    district: '',
    occupation: 'farmer',
    income: 80000,
    land_holding_acres: 2.0,
    caste: 'OBC',
    gender: 'male',
    age: 40
  });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Check Backend Health on Mount
  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setBackendHealth(data))
      .catch(err => console.warn('Backend check:', err.message));
  }, []);

  const isHindi = language === 'hi';

  const handleSendMessage = async (messageText, profileOverride = null) => {
    const textToSend = (messageText || inputText).trim();
    if (!textToSend) return;

    // Switch to agent layer if user submits a message while on another tab
    if (activeLayer !== 'agent') {
      setActiveLayer('agent');
    }

    setIsProcessing(true);
    setErrorMessage(null);

    const activeProfile = profileOverride || userProfile;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          language,
          mode,
          customProfile: activeProfile.name || activeProfile.district ? activeProfile : undefined
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      const data = await response.json();
      setResultData(data);
      if (data.profile?.name && !userProfile.name) {
        setUserProfile(prev => ({ ...prev, name: data.profile.name }));
      }
    } catch (err) {
      console.error('Agent processing failed:', err);
      setErrorMessage(
        isHindi
          ? 'माफ़ कीजिए, संपर्क में कुछ समस्या आई। कृपया दोबारा प्रयास करें।'
          : 'Failed to process request. Please check backend connection.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveProfile = (updatedProfile) => {
    setUserProfile(updatedProfile);
    const query = inputText || (resultData ? (isHindi ? 'मेरे नए विवरण के अनुसार योजनाएं व आरटीआई खोजें' : 'Check schemes and RTI with my updated details') : '');
    if (query) {
      handleSendMessage(query, updatedProfile);
    }
  };

  const inputPlaceholder = mode === 'SCHEME'
    ? (isHindi 
        ? 'सरकारी योजना खोजें... (जैसे "पीएम किसान, खाद सब्सिडी, सोलर पंप, आवास")' 
        : 'Search government schemes... (e.g. "PM Kisan, fertilizer subsidy, solar pump")')
    : mode === 'RTI'
    ? (isHindi 
        ? 'समस्या या आरटीआई खोजें... (जैसे "गाँव की सड़क टूटी है, राशन डीलर धांधली, पेंशन")' 
        : 'Search grievance or RTI... (e.g. "Village road broken, ration dealer issue, pension")')
    : (isHindi 
        ? 'अपनी समस्या या योजना यहाँ खोजें... (जैसे "मैं किसान हूँ, 80 हजार आय, सड़क टूटी है")' 
        : 'Search welfare scheme or grievance... (e.g. "Farmer from UP, 80k income, broken road")');

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between selection:bg-orange-200">
      {/* Top Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-amber-500 to-emerald-600 flex items-center justify-center text-white shadow-md font-extrabold text-xl">
              🏛️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-stone-900">
                  JanSetu <span className="text-orange-600 font-extrabold text-lg">(जनसेतु)</span>
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3 h-3" />
                  AI Citizen Platform
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium">
                {isHindi
                  ? 'सरकारी योजना खोज, आरटीआई ट्रैकर एवं किसान अधिकार मंच'
                  : 'Multi-Layer Citizen Platform: Schemes, RTI Enforcement & Helplines'}
              </p>
            </div>
          </div>

          {/* User Profile Button, Health & Language Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border border-orange-200 bg-orange-50 hover:bg-orange-100 transition-all text-orange-950 shadow-2xs"
              title="Click to edit your citizen details (Name, State, Income)"
            >
              <User className="w-3.5 h-3.5 text-orange-600" />
              <span className="max-w-[110px] truncate">
                {userProfile.name ? userProfile.name : (isHindi ? 'मेरी जानकारी' : 'My Profile')}
              </span>
              <span className="text-[10px] bg-orange-600 text-white px-1.5 py-0.5 rounded font-bold">
                {userProfile.name ? (isHindi ? 'बदलें' : 'Edit') : (isHindi ? 'सेट करें' : 'Set')}
              </span>
            </button>

            {/* Segmented Language Switcher Toggle */}
            <div className="flex items-center bg-stone-100 p-0.5 rounded-xl border border-stone-300 text-xs font-bold">
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  isHindi ? 'bg-orange-600 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
                title="हिंदी में देखें"
              >
                हिंदी
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  !isHindi ? 'bg-orange-600 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Switch to English"
              >
                English
              </button>
            </div>
          </div>
        </div>

        {/* MULTI-LAYER NAVIGATION BAR (4 Functional Layers) */}
        <div className="bg-stone-100/80 border-t border-stone-200">
          <div className="max-w-6xl mx-auto px-4 flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none py-1.5">
            {/* Layer 1: AI Agent Hub */}
            <button
              onClick={() => setActiveLayer('agent')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeLayer === 'agent'
                  ? 'bg-white text-orange-700 shadow-xs border border-stone-200'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
              }`}
            >
              <Bot className="w-4 h-4 text-orange-600" />
              <span>{isHindi ? 'एजेंट साथी (AI Voice Agent)' : 'AI Voice Agent'}</span>
            </button>

            {/* Layer 2: Scheme Explorer */}
            <button
              onClick={() => setActiveLayer('schemes')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeLayer === 'schemes'
                  ? 'bg-white text-orange-700 shadow-xs border border-stone-200'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
              }`}
            >
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>{isHindi ? 'योजना अन्वेषक (Scheme Directory)' : 'Scheme Explorer'}</span>
            </button>

            {/* Layer 3: RTI Tracker & Appeals */}
            <button
              onClick={() => setActiveLayer('rti')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap relative ${
                activeLayer === 'rti'
                  ? 'bg-white text-orange-700 shadow-xs border border-stone-200'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
              }`}
            >
              <Scale className="w-4 h-4 text-red-600" />
              <span>{isHindi ? 'आरटीआई हब व अपील (RTI Studio)' : 'RTI Studio & Appeals'}</span>
              {resultData?.response?.rti && (
                <span className="w-2 h-2 rounded-full bg-red-600 absolute -top-0.5 -right-0.5"></span>
              )}
            </button>

            {/* Layer 4: Helplines & CSC Guide */}
            <button
              onClick={() => setActiveLayer('helpline')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeLayer === 'helpline'
                  ? 'bg-white text-orange-700 shadow-xs border border-stone-200'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
              }`}
            >
              <PhoneCall className="w-4 h-4 text-teal-600" />
              <span>{isHindi ? 'हेल्पलाइन व केंद्र (Helplines & CSC)' : 'Helplines & CSC'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area: Renders active layer */}
      <main className="max-w-6xl mx-auto px-4 py-5 flex-1 w-full">
        
        {/* ACTIVE LAYER 2: SCHEME EXPLORER */}
        {activeLayer === 'schemes' && (
          <SchemeExplorer
            language={language}
            userState={userProfile.state}
          />
        )}

        {/* ACTIVE LAYER 3: RTI TRACKER STUDIO */}
        {activeLayer === 'rti' && (
          <RTITrackerStudio
            initialRef={resultData?.response?.rti?.referenceNumber || 'UP/PWD/2026/85096'}
            citizenProfile={userProfile}
            language={language}
          />
        )}

        {/* ACTIVE LAYER 4: HELPLINES & CSC */}
        {activeLayer === 'helpline' && (
          <HelplineDirectory
            language={language}
          />
        )}

        {/* ACTIVE LAYER 1: AI VOICE & CHAT AGENT (Default) */}
        {activeLayer === 'agent' && (
          <div>
            {/* Active Profile Banner */}
            {userProfile.name && (
              <div className="mb-4 bg-gradient-to-r from-orange-50 via-amber-50 to-stone-50 border border-orange-200 rounded-xl p-2.5 sm:px-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-stone-800 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span>
                    <strong>{isHindi ? 'सक्रिय नागरिक प्रोफाइल:' : 'Active Profile:'}</strong> {userProfile.name} ({userProfile.district ? `${userProfile.district}, ` : ''}{userProfile.state} • {userProfile.occupation} • ₹{userProfile.income.toLocaleString('en-IN')})
                  </span>
                </div>
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className="text-orange-700 hover:text-orange-900 font-bold underline text-xs ml-2"
                >
                  {isHindi ? 'बदलें (Change)' : 'Change'}
                </button>
              </div>
            )}

            {/* National Civic Impact Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
              <div className="bg-white border border-stone-200/80 rounded-2xl p-3 shadow-2xs hover:border-orange-300 transition-all flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-black text-lg flex-shrink-0">
                  🌾
                </div>
                <div>
                  <div className="text-base sm:text-lg font-black text-stone-900 leading-none">2,500+</div>
                  <div className="text-[11px] text-stone-500 font-semibold mt-0.5">
                    {isHindi ? 'सरकारी योजनाएं' : 'Govt Schemes'}
                  </div>
                </div>
              </div>

              <div className="bg-white border border-stone-200/80 rounded-2xl p-3 shadow-2xs hover:border-emerald-300 transition-all flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-lg flex-shrink-0">
                  💰
                </div>
                <div>
                  <div className="text-base sm:text-lg font-black text-stone-900 leading-none">₹1.5 L Cr</div>
                  <div className="text-[11px] text-stone-500 font-semibold mt-0.5">
                    {isHindi ? 'कल्याणकारी बजट' : 'Welfare Budget'}
                  </div>
                </div>
              </div>

              <div className="bg-white border border-stone-200/80 rounded-2xl p-3 shadow-2xs hover:border-red-300 transition-all flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-black text-lg flex-shrink-0">
                  ⚖️
                </div>
                <div>
                  <div className="text-base sm:text-lg font-black text-stone-900 leading-none">30 Days</div>
                  <div className="text-[11px] text-stone-500 font-semibold mt-0.5">
                    {isHindi ? 'RTI कानूनी सीमा' : 'Statutory Limit'}
                  </div>
                </div>
              </div>

              <div className="bg-white border border-stone-200/80 rounded-2xl p-3 shadow-2xs hover:border-amber-300 transition-all flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-lg flex-shrink-0">
                  🛡️
                </div>
                <div>
                  <div className="text-base sm:text-lg font-black text-stone-900 leading-none">100% Free</div>
                  <div className="text-[11px] text-stone-500 font-semibold mt-0.5">
                    {isHindi ? 'BPL शुल्क छूट (धारा 7)' : 'BPL Fee Waiver'}
                  </div>
                </div>
              </div>
            </div>

            {/* Citizen Service Mode Selector */}
            <div className="mb-5 bg-white border border-stone-200 rounded-2xl p-3 sm:p-4 shadow-xs">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-extrabold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                  <span>{isHindi ? 'आप क्या करना चाहते हैं? (सेवा चुनें):' : 'Select What You Want To Do:'}</span>
                </span>
                <span className="text-[11px] text-stone-400 font-medium hidden sm:inline">
                  {isHindi ? 'अपनी ज़रूरत के अनुसार विकल्प चुनें' : 'Choose option according to your need'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Option 1: Find Schemes */}
                <button
                  onClick={() => setMode('SCHEME')}
                  className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                    mode === 'SCHEME'
                      ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-stone-50/70 border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xl">🌾</span>
                    {mode === 'SCHEME' && (
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-stone-900 leading-tight">
                    {isHindi ? 'सरकारी योजनाएं खोजें' : 'Find Govt Schemes'}
                  </h3>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                    {isHindi ? 'पात्र कल्याणकारी योजनाएं, ₹ लाभ व आवेदन' : 'Eligible schemes, cash grants & steps'}
                  </p>
                </button>

                {/* Option 2: File RTI */}
                <button
                  onClick={() => setMode('RTI')}
                  className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                    mode === 'RTI'
                      ? 'bg-red-50/90 border-red-500 ring-2 ring-red-500/20 shadow-xs'
                      : 'bg-stone-50/70 border-stone-200 hover:border-red-300 hover:bg-red-50/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xl">⚖️</span>
                    {mode === 'RTI' && (
                      <span className="w-2 h-2 rounded-full bg-red-600"></span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-stone-900 leading-tight">
                    {isHindi ? 'आरटीआई (RTI) दर्ज करें' : 'File Legal RTI'}
                  </h3>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                    {isHindi ? 'शिकायत पर विभाग व अफसर से 30 दिन में जवाब' : 'Demand official response in 30 days'}
                  </p>
                </button>

                {/* Option 3: Both Schemes + RTI */}
                <button
                  onClick={() => setMode('BOTH')}
                  className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                    mode === 'BOTH'
                      ? 'bg-orange-50/90 border-orange-500 ring-2 ring-orange-500/20 shadow-xs'
                      : 'bg-stone-50/70 border-stone-200 hover:border-orange-300 hover:bg-orange-50/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xl">🌟</span>
                    {mode === 'BOTH' && (
                      <span className="w-2 h-2 rounded-full bg-orange-600"></span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-stone-900 leading-tight">
                    {isHindi ? 'दोनों एक साथ (ऑल-इन-वन)' : 'Both (Schemes + RTI)'}
                  </h3>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                    {isHindi ? 'योजनाएं भी खोजें और शिकायत की RTI भी करें' : 'Full dual agent: schemes & legal enforcement'}
                  </p>
                </button>
              </div>
            </div>

            {/* Prominent Citizen Search Box */}
            <div className="bg-white border-2 border-stone-200 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/15 rounded-2xl p-2 sm:p-3 shadow-xs mb-3 transition-all">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="pl-2 sm:pl-3 flex items-center text-orange-600">
                  <Search className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                </div>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={inputPlaceholder}
                  className="flex-1 text-sm sm:text-base py-2.5 outline-none text-stone-900 placeholder:text-stone-400 font-medium bg-transparent"
                />
                {inputText && (
                  <button
                    type="button"
                    onClick={() => setInputText('')}
                    className="text-stone-400 hover:text-stone-600 p-1.5 rounded-full hover:bg-stone-100 transition-colors flex-shrink-0"
                    title={isHindi ? 'साफ़ करें' : 'Clear search'}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={isProcessing || !inputText.trim()}
                  className="px-5 sm:px-7 py-2.5 sm:py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-xs hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex-shrink-0"
                >
                  {isProcessing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span className="hidden sm:inline">{isHindi ? 'खोज जारी...' : 'Searching...'}</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>{isHindi ? 'खोजें' : 'Search'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Search Box Sub-bar: Active Mode Context & Enter key hint */}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100 px-2 text-[11px] sm:text-xs text-stone-500">
                <div className="flex items-center gap-1.5">
                  <span className="text-orange-600 font-bold">
                    {mode === 'SCHEME' ? '🌾' : mode === 'RTI' ? '⚖️' : '🌟'}
                  </span>
                  <span>
                    {mode === 'SCHEME'
                      ? (isHindi ? 'योजना का नाम, पात्रता या विषय लिखकर खोजें' : 'Search scheme by name, eligibility, or category')
                      : mode === 'RTI'
                      ? (isHindi ? 'सड़क, राशन, पेंशन, या किसी भी विभाग की समस्या दर्ज करें' : 'Report broken road, ration, pension, or any department issue')
                      : (isHindi ? 'अपनी पूरी बात या समस्या यहाँ लिखें — AI योजनाएं व RTI दोनों निकालेगा' : 'Type your situation or grievance — AI handles schemes & RTI')}
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-stone-400 font-medium">
                  <span>⌨️ <kbd className="bg-stone-100 border border-stone-200 px-1 py-0.5 rounded text-[10px]">Enter</kbd> {isHindi ? 'दबाएं' : 'to submit'}</span>
                </div>
              </div>
            </div>

            {/* Quick Search Keyword Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 scrollbar-none text-xs">
              <span className="text-stone-400 font-bold flex-shrink-0 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                <span>{isHindi ? 'लोकप्रिय विषय:' : 'Trending:'}</span>
              </span>
              {QUICK_SEARCH_TAGS.map((tag, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setInputText(tag.query);
                    handleSendMessage(tag.query);
                  }}
                  className="bg-white hover:bg-orange-50 hover:border-orange-300 hover:text-orange-900 text-stone-700 font-semibold px-3 py-1 rounded-full border border-stone-200 transition-all whitespace-nowrap shadow-2xs cursor-pointer flex-shrink-0"
                >
                  {isHindi ? tag.label_hi : tag.label_en}
                </button>
              ))}
            </div>

            {/* Error Alert */}
            {errorMessage && (
              <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm flex items-center gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Live Execution Stepper */}
            {(isProcessing || resultData) && (
              <AgentStepper
                trace={resultData?.trace}
                isProcessing={isProcessing}
                language={language}
              />
            )}

            {/* RESULTS PRESENTATION */}
            {resultData && resultData.response && (
              <div className="space-y-6">
                {/* 1. Warm Acknowledgement */}
                <div className="bg-white border-l-4 border-orange-600 p-4 sm:p-5 rounded-r-xl shadow-xs">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5">🙏</span>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                        {resultData.response.acknowledgement}
                      </h3>
                      {/* Extracted Profile Pill Bar with Direct Edit Option */}
                      {resultData.profile && (
                        <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-stone-100 text-xs">
                          <span className="bg-orange-100 text-orange-950 px-2 py-0.5 rounded font-bold">
                            👤 {resultData.profile.name || 'नागरिक'}
                          </span>
                          <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-medium">
                            📍 {resultData.profile.district ? `${resultData.profile.district}, ` : ''}{resultData.profile.state}
                          </span>
                          <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-medium">
                            🌾 {resultData.profile.occupation}
                          </span>
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                            ₹ {resultData.profile.income.toLocaleString('en-IN')} / year
                          </span>
                          {resultData.profile.problem_description && (
                            <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-medium">
                              ⚠️ {resultData.profile.problem_description}
                            </span>
                          )}
                          
                          <button
                            onClick={() => setIsProfileModalOpen(true)}
                            className="ml-auto inline-flex items-center gap-1 text-orange-700 hover:text-orange-900 bg-orange-50 hover:bg-orange-100 px-2.5 py-0.5 rounded-md font-bold border border-orange-200 transition-colors"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>{isHindi ? 'विवरण बदलें' : 'Edit Details'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Total Benefit Callout */}
                {resultData.response.schemes && resultData.response.schemes.length > 0 && (
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-5 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-200 block mb-1">
                        {isHindi ? 'योग्य सरकारी सहायता का कुल पैकेज' : 'Total Direct Government Benefit Package'}
                      </span>
                      <p className="text-2xl sm:text-3xl font-black leading-none">
                        ₹{resultData.response.totalBenefitRupees.toLocaleString('en-IN')}
                        <span className="text-sm sm:text-base font-medium text-emerald-100 ml-2">
                          {isHindi ? 'सालाना सीधा लाभ' : 'direct estimated benefit'}
                        </span>
                      </p>
                    </div>

                    <div className="bg-emerald-800/60 border border-emerald-400/30 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold">
                      ✨ {isHindi
                        ? `आप कुल ${resultData.response.schemeCount} सरकारी योजनाओं के पात्र पाए गए हैं`
                        : `You qualify for ${resultData.response.schemeCount} active welfare schemes`}
                    </div>
                  </div>
                )}

                {/* 2. Qualifying Schemes Cards Grid */}
                {resultData.response.schemes && resultData.response.schemes.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-orange-600" />
                        <span>{isHindi ? 'आपके लिए स्वीकृत सरकारी योजनाएं' : 'Your Qualifying Government Schemes'}</span>
                      </h3>
                      <button
                        onClick={() => setActiveLayer('schemes')}
                        className="text-xs text-orange-700 hover:text-orange-900 font-bold underline"
                      >
                        {isHindi ? 'सभी योजनाएं डायरेक्टरी में देखें →' : 'View full directory →'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {resultData.response.schemes.map((scheme) => (
                        <SchemeCard
                          key={scheme.id}
                          scheme={scheme}
                          language={language}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. RTI Application Card */}
                {resultData.response.rti && (
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-red-600" />
                        <span>{isHindi ? 'आरटीआई कानूनी कार्रवाई स्थिति' : 'RTI Statutory Enforcement Status'}</span>
                      </h3>
                      <button
                        onClick={() => setActiveLayer('rti')}
                        className="text-xs text-red-700 hover:text-red-900 font-bold underline"
                      >
                        {isHindi ? 'आरटीआई ट्रैकर व अपील स्टूडियो खोलें →' : 'Open RTI Studio →'}
                      </button>
                    </div>

                    <RTICard
                      rti={resultData.response.rti}
                      language={language}
                    />
                  </div>
                )}

                {/* 4. Two-sentence summary what happens next */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800 block mb-1">
                    {isHindi ? '📌 आगे का कदम (Next Steps):' : '📌 What Happens Next:'}
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-amber-950 leading-relaxed">
                    {resultData.response.nextStepsSummary}
                  </p>
                </div>
              </div>
            )}

            {/* Rich Civic Features, How JanSetu Works, Constitutional Rights & FAQ Section */}
            <CivicFeaturesGuide language={language} />
          </div>
        )}
      </main>

      {/* Comprehensive Civic Platform Footer */}
      <section className="bg-stone-900 text-stone-300 border-t border-stone-800 py-8 px-4 mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 text-xs">
            {/* Column 1: Mission & Trust */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏛️</span>
                <span className="text-base font-black text-white">JanSetu (जनसेतु)</span>
              </div>
              <p className="text-stone-400 leading-relaxed">
                {isHindi 
                  ? 'भारत के 60 करोड़ ग्रामीण व वंचित नागरिकों को उनके कल्याणकारी अधिकारों और RTI से जोड़ने वाला स्वतंत्र AI सेतु।'
                  : 'Empowering 600M+ rural and unreached citizens with zero-form welfare discovery and statutory RTI accountability.'}
              </p>
              <div className="pt-2 text-[11px] text-emerald-400 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Data Privacy • No Data Sold</span>
              </div>
            </div>

            {/* Column 2: Emergency Helplines */}
            <div className="space-y-2">
              <span className="font-extrabold text-stone-100 uppercase tracking-wider text-[11px] block">
                {isHindi ? 'राष्ट्रीय हेल्पलाइन नंबर' : 'National Helplines'}
              </span>
              <ul className="space-y-1.5 text-stone-400">
                <li className="flex items-center justify-between">
                  <span>🌾 किसान कॉल सेंटर:</span>
                  <a href="tel:18001801551" className="text-orange-400 font-bold hover:underline">1800-180-1551</a>
                </li>
                <li className="flex items-center justify-between">
                  <span>🛡️ फसल बीमा दावा (PMFBY):</span>
                  <a href="tel:14447" className="text-orange-400 font-bold hover:underline">14447</a>
                </li>
                <li className="flex items-center justify-between">
                  <span>🏥 आयुष्मान भारत:</span>
                  <a href="tel:14555" className="text-orange-400 font-bold hover:underline">14555</a>
                </li>
                <li className="flex items-center justify-between">
                  <span>💳 PM-किसान हेल्पलाइन:</span>
                  <a href="tel:155261" className="text-orange-400 font-bold hover:underline">155261</a>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal Protections */}
            <div className="space-y-2">
              <span className="font-extrabold text-stone-100 uppercase tracking-wider text-[11px] block">
                {isHindi ? 'संवैधानिक आरटीआई सुरक्षा' : 'RTI Statutory Protection'}
              </span>
              <ul className="space-y-1 text-stone-400 text-[11px]">
                <li>• धारा 6(1): सरकारी रिकॉर्ड की प्रमाणित प्रति</li>
                <li>• धारा 7(1): 30 दिन में अनिवार्य कानूनी जवाब</li>
                <li>• धारा 7(5): BPL परिवारों के लिए 100% शुल्क मुक्ति</li>
                <li>• धारा 19(1): प्रथम अपीलीय अधिकारी (FAA) को अपील</li>
                <li>• धारा 20(1): दोषी अफसर पर ₹25,000 तक का जुर्माना</li>
              </ul>
            </div>

            {/* Column 4: Official Portals */}
            <div className="space-y-2">
              <span className="font-extrabold text-stone-100 uppercase tracking-wider text-[11px] block">
                {isHindi ? 'आधिकारिक सरकारी लिंक' : 'Official Portals'}
              </span>
              <ul className="space-y-1.5 text-stone-400">
                <li><a href="https://www.myscheme.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between">MyScheme Portal <span>↗</span></a></li>
                <li><a href="https://rtionline.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between">RTI Online (DoPT) <span>↗</span></a></li>
                <li><a href="https://pmkisan.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between">PM-KISAN Samman Nidhi <span>↗</span></a></li>
                <li><a href="https://pmjay.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between">Ayushman Bharat PM-JAY <span>↗</span></a></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
            <p>© 2026 JanSetu (जनसेतु) • Built for Digital India & Citizen Rights Empowerment</p>
            <p className="flex items-center gap-2">
              <span>🇮🇳 सत्यमेव जयते</span>
              <span>•</span>
              <span>Voice-First AI Architecture</span>
            </p>
          </div>
        </div>
      </section>

      {/* Floating Sticky Voice Assistant Bar at Bottom (Accessible across all layers!) */}
      <footer className="sticky bottom-0 z-40 bg-stone-100/95 backdrop-blur-md pt-2">
        <VoiceAssistant
          onTranscript={handleSendMessage}
          isProcessing={isProcessing}
          spokenScript={resultData?.response?.spokenScript}
          currentLanguage={language}
          onLanguageChange={(lang) => setLanguage(lang)}
          mode={mode}
        />
      </footer>

      {/* User Citizen Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={userProfile}
        onSaveProfile={handleSaveProfile}
        language={language}
      />
    </div>
  );
}
