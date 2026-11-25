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
import { API_BASE_URL } from './apiConfig';

const TRENDING_TAGS = [
  { 
    label_hi: 'PM किसान योजना', 
    label_en: 'PM Kisan Yojana', 
    query: 'PM-KISAN सम्मान निधि योजना 6000 रुपये किस्त व बैंक खाता',
    color: 'border-[#7fb373] text-[#165324] bg-[#dbead4] hover:bg-[#d0e3c7]',
    dotColor: 'bg-[#22c55e]'
  },
  { 
    label_hi: 'राशन कार्ड डाउनलोड', 
    label_en: 'Ration Card Download', 
    query: 'नया राशन कार्ड डाउनलोड व खाद्य विभाग कोटेदार समस्या',
    color: 'border-[#6faec0] text-[#0d5568] bg-[#d3e9ee] hover:bg-[#c4e1e8]',
    dotColor: 'bg-[#06b6d4]'
  },
  { 
    label_hi: 'आयुष्मान भारत', 
    label_en: 'Ayushman Bharat', 
    query: 'आयुष्मान भारत 5 लाख मुफ्त इलाज गोल्डन कार्ड',
    color: 'border-[#63af99] text-[#0e5241] bg-[#d0e8df] hover:bg-[#c0dfd4]',
    dotColor: 'bg-[#14b8a6]'
  },
  { 
    label_hi: 'मुख्यमंत्री आवास योजना', 
    label_en: 'Mukhyamantri Awas Yojana', 
    query: 'मुख्यमंत्री ग्रामीण आवास योजना पक्का मकान 1.20 लाख सहायता',
    color: 'border-[#be8251] text-[#6e3309] bg-[#fae3cc] hover:bg-[#f5dac0]',
    dotColor: 'bg-[#92400e]'
  },
  { 
    label_hi: 'सरकारी नौकरी', 
    label_en: 'Govt Employment', 
    query: 'ग्रामीण रोजगार व सरकारी कौशल विकास योजनाएं',
    color: 'border-[#cf9f3f] text-[#784d07] bg-[#fbebc3] hover:bg-[#f7e2ad]',
    dotColor: 'bg-[#d97706]'
  },
  { 
    label_hi: 'स्वास्थ्य बीमा योजना', 
    label_en: 'Health Insurance', 
    query: 'राष्ट्रीय स्वास्थ्य बीमा व मुख्यमंत्री जन आरोग्य योजना',
    color: 'border-[#cf7b67] text-[#882414] bg-[#fadcd3] hover:bg-[#f6ccc0]',
    dotColor: 'bg-[#dc2626]'
  }
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
    fetch(`${API_BASE_URL}/api/health`)
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
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
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

  const [largeText, setLargeText] = useState(false);

  const inputPlaceholder = isHindi 
    ? 'अपनी समस्या या योजना से जुड़ी जानकारी खोजें... (जैसे: पेंशन, राशन, आय प्रमाण पत्र आदि)' 
    : 'Search your welfare scheme or problem... (e.g. pension, ration card, income certificate)';

  return (
    <div className={`min-h-screen jansetu-canvas-bg flex flex-col justify-between selection:bg-forest-600 selection:text-white relative ${largeText ? 'text-[105%]' : ''}`}>
      {/* Soft Ambient Light Glow */}
      <div className="jansetu-ambient-glow" aria-hidden="true" />

      {/* Top Header */}
      <header className="bg-[#edd5b3]/95 border-b border-[#deb887]/80 sticky top-0 z-30 shadow-xs backdrop-blur-md relative">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#081c1d] flex items-center justify-center text-white shadow-xs flex-shrink-0 border border-white/20">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current" aria-hidden="true">
                <circle cx="12" cy="6" r="2.8"/>
                <path d="M12 10.8c-2.6 0-5.2-1.3-6.4-2.5-.4-.4-1.2-.4-1.7.1-.5.5-.4 1.3.1 1.7 1.6 1.6 4.7 3.5 6.8 4v6.9c0 .6.4 1 1 1s1-.4 1-1v-6.9c2.1-.5 5.2-2.4 6.8-4 .5-.4.6-1.2.1-1.7-.5-.5-1.3-.5-1.7-.1-1.2 1.2-3.8 2.5-6.4 2.5z"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black tracking-tight text-[#26160c] leading-none">
                  JanSetu <span className="text-[#78350f] font-bold text-base sm:text-lg">(जनसेतु)</span>
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold bg-[#d7ebd8] text-[#1b5e20] px-2.5 py-0.5 rounded-full border border-[#a6d8aa]">
                  <span>✓</span>
                  <span>RTI & Govt Schemes</span>
                </span>
              </div>
              <p className="text-xs text-[#6e5846] font-semibold mt-0.5">
                {isHindi ? 'एक सेतु, सबके लिए' : 'One Bridge For Every Citizen'}
              </p>
            </div>
          </div>

          {/* Right Controls: Font Size, Profile, Language Selector */}
          <div className="flex items-center gap-2">
            {/* Font Size Accessibility Toggle (A+ आकार) */}
            <button
              type="button"
              onClick={() => setLargeText(!largeText)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                largeText 
                  ? 'bg-[#fae2c6] border-[#e2a87c] text-[#78350f]' 
                  : 'bg-[#faedd9] border-[#d8b992] text-[#4a3525] hover:bg-[#fff8f0]'
              }`}
              title="अक्षर का आकार बड़ा करें / Increase Font Size"
            >
              A+ आकार
            </button>

            {/* Hindi Indicator / Button */}
            <button
              type="button"
              onClick={() => setLanguage('hi')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                isHindi
                  ? 'bg-[#0b3c2e] text-[#bbf7d0] border-[#166534]'
                  : 'bg-[#faedd9] border-[#d8b992] text-[#4a3525] hover:bg-[#fff8f0]'
              }`}
              title="हिंदी"
            >
              अ/अ
            </button>

            {/* Language Switch Button (Walnut Mahogany) */}
            <button
              type="button"
              onClick={() => setLanguage(isHindi ? 'en' : 'hi')}
              className="px-3 py-1 text-xs font-bold rounded-lg bg-[#5c2314] hover:bg-[#4a1c10] text-white shadow-xs transition-all cursor-pointer"
              title="Switch Language"
            >
              {isHindi ? 'English' : 'हिंदी'}
            </button>

            {/* User Profile Button */}
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg border border-[#d8b992] hover:border-[#78350f] bg-[#faedd9] hover:bg-[#fff8f0] transition-all text-[#4a3525] cursor-pointer ml-1"
              title="नागरिक प्रोफाइल विवरण"
            >
              <User className="w-3.5 h-3.5 text-[#78350f]" />
              <span className="max-w-[85px] truncate">
                {userProfile.name ? userProfile.name : (isHindi ? 'प्रोफाइल' : 'Profile')}
              </span>
            </button>
          </div>
        </div>

        {/* MULTI-LAYER NAVIGATION BAR (4 Functional Layers with matching screenshot colors) */}
        <div className="bg-[#edd5b3]/85 border-t border-[#deb887]/80">
          <div className="max-w-6xl mx-auto px-4 flex items-center gap-2 overflow-x-auto scrollbar-none py-2">
            {/* Pill 1: Govt Schemes (Forest Green) */}
            <button
              onClick={() => {
                setActiveLayer('agent');
                setMode('SCHEME');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer border ${
                activeLayer === 'agent' && mode === 'SCHEME'
                  ? 'bg-[#d2e5c8] text-[#165324] border-[#7fb373] shadow-xs'
                  : 'bg-[#e3edd9] text-[#165324] border-[#9cc592] hover:bg-[#d8e8cc]'
              }`}
            >
              <span>🌱</span>
              <span>{isHindi ? 'सरकारी योजनाएं (Govt Schemes)' : 'Govt Schemes'}</span>
            </button>

            {/* Pill 2: Scheme Directory (Prussian Blue) */}
            <button
              onClick={() => setActiveLayer('schemes')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer border ${
                activeLayer === 'schemes'
                  ? 'bg-[#cbe0ee] text-[#0f3d61] border-[#7da9c9] shadow-xs'
                  : 'bg-[#d9e6f0] text-[#0f3d61] border-[#9ebfd8] hover:bg-[#d0dfec]'
              }`}
            >
              <span>📑</span>
              <span>{isHindi ? 'योजना आवेदन (Scheme Directory)' : 'Scheme Directory'}</span>
            </button>

            {/* Pill 3: RTI Services (Walnut Brown) */}
            <button
              onClick={() => {
                setActiveLayer('agent');
                setMode('RTI');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer border ${
                activeLayer === 'agent' && mode === 'RTI'
                  ? 'bg-[#f7d9bb] text-[#6e3309] border-[#cb8b5c] shadow-xs'
                  : 'bg-[#fae4cc] text-[#6e3309] border-[#e2a87c] hover:bg-[#f8dcbe]'
              }`}
            >
              <span>👥</span>
              <span>{isHindi ? 'सरकारी सूचना एवं सेवाएं (RTI Services)' : 'RTI Services'}</span>
              {resultData?.response?.rti && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping ml-0.5"></span>
              )}
            </button>

            {/* Pill 4: Helpline & Contact (Warm Orange-Brown) */}
            <button
              onClick={() => setActiveLayer('helpline')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer border ${
                activeLayer === 'helpline'
                  ? 'bg-[#f9d7c2] text-[#9a3412] border-[#e28e67] shadow-xs'
                  : 'bg-[#fce4d4] text-[#9a3412] border-[#eca685] hover:bg-[#f9d9c4]'
              }`}
            >
              <span>📞</span>
              <span>{isHindi ? 'हेल्पलाइन व संपर्क (Helpline & Contact)' : 'Helpline & Contact'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-4 sm:py-5 flex-1 w-full">
        
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
            {/* Active Citizen Profile Banner (if set) */}
            {userProfile.name && (
              <div className="mb-3.5 bg-[#faedd9] border border-[#deb887] rounded-2xl p-2.5 sm:px-4 flex items-center justify-between text-xs text-[#2b1f17] shadow-2xs">
                <div className="flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  <span>
                    <strong className="text-[#26160c]">{isHindi ? 'सक्रिय नागरिक प्रोफाइल:' : 'Active Profile:'}</strong> {userProfile.name} ({userProfile.district ? `${userProfile.district}, ` : ''}{userProfile.state} • {userProfile.occupation} • ₹{userProfile.income.toLocaleString('en-IN')})
                  </span>
                </div>
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className="text-[#78350f] hover:text-[#5c2314] font-bold underline text-xs ml-2 cursor-pointer"
                >
                  {isHindi ? 'बदलें (Change)' : 'Change'}
                </button>
              </div>
            )}

            {/* HERO SERVICE MODE SELECTOR ("आज इन सेवाओं का उपयोग कर सकते हैं:") */}
            <div className="mb-4">
              <div className="flex items-center gap-1.5 mb-2.5 px-0.5">
                <span className="text-amber-600 font-bold">⭐</span>
                <h2 className="text-xs sm:text-sm font-extrabold text-[#26160c]">
                  {isHindi ? 'आज इन सेवाओं का उपयोग कर सकते हैं:' : 'Services you can access today:'}
                </h2>
              </div>

              {/* 3 Action Cards matching reference screenshot */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {/* Card 1: Forest Green (सरकारी योजनाएं खोजें) */}
                <button
                  type="button"
                  onClick={() => {
                    setMode('SCHEME');
                    setActiveLayer('agent');
                  }}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all relative flex items-center justify-between cursor-pointer shadow-2xs hover:shadow-sm ${
                    mode === 'SCHEME'
                      ? 'bg-gradient-to-br from-[#e4eedb] to-[#f8fbf5] border-[#7fb373] ring-2 ring-[#7fb373]/20'
                      : 'bg-gradient-to-br from-[#e4eedb]/90 to-[#f8fbf5] border-[#9cc592] hover:border-[#7fb373]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5">🌱</span>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-[#165324] leading-snug">
                        {isHindi ? 'सरकारी योजनाएं खोजें' : 'Search Govt Schemes'}
                      </h3>
                      <p className="text-[11px] text-[#556350] mt-0.5 leading-tight font-medium">
                        {isHindi ? 'केंद्र और राज्य सरकार की योजनाओं की जानकारी पाएं' : 'Get info on central & state welfare schemes'}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#165324] flex-shrink-0 ml-1" />
                </button>

                {/* Card 2: Prussian Blue (योजना आवेदन / लाभार्थी बनें) */}
                <button
                  type="button"
                  onClick={() => setActiveLayer('schemes')}
                  className="p-3.5 sm:p-4 rounded-2xl border text-left transition-all relative flex items-center justify-between cursor-pointer shadow-2xs hover:shadow-sm bg-gradient-to-br from-[#dfeaf2] to-[#f5f8fb] border-[#a0bdd3] hover:border-[#7da9c9]"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5">📑</span>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-[#0f3d61] leading-snug">
                        {isHindi ? 'योजना आवेदन / लाभार्थी बनें' : 'Scheme Application / Beneficiary'}
                      </h3>
                      <p className="text-[11px] text-[#485c6d] mt-0.5 leading-tight font-medium">
                        {isHindi ? 'ऑनलाइन आवेदन करें और लाभार्थी बनें' : 'Apply online and enroll as verified beneficiary'}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#0f3d61] flex-shrink-0 ml-1" />
                </button>

                {/* Card 3: Walnut Brown (RTI के माध्यम से जानकारी प्राप्त करें) */}
                <button
                  type="button"
                  onClick={() => {
                    setMode('RTI');
                    setActiveLayer('agent');
                  }}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all relative flex items-center justify-between cursor-pointer shadow-2xs hover:shadow-sm ${
                    mode === 'RTI'
                      ? 'bg-gradient-to-br from-[#fae6d2] to-[#fff8f2] border-[#cb8b5c] ring-2 ring-[#cb8b5c]/20'
                      : 'bg-gradient-to-br from-[#fae6d2]/90 to-[#fff8f2] border-[#dfaa82] hover:border-[#cb8b5c]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5">👥</span>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-[#6e3309] leading-snug">
                        {isHindi ? 'RTI के माध्यम से जानकारी प्राप्त करें' : 'Get Info via RTI Act'}
                      </h3>
                      <p className="text-[11px] text-[#694e3c] mt-0.5 leading-tight font-medium">
                        {isHindi ? 'सूचना का अधिकार के तहत जानकारी पाएं' : 'Demand official government records under RTI'}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#6e3309] flex-shrink-0 ml-1" />
                </button>
              </div>
            </div>

            {/* PROMINENT CITIZEN SEARCH BAR (Pill shape with Walnut Brown "खोजें" button) */}
            <div className="bg-[#fff8f0] border-2 border-[#d8b992] focus-within:border-[#78350f] focus-within:ring-4 focus-within:ring-[#78350f]/15 rounded-full p-1.5 sm:p-2 shadow-xs mb-3 transition-all">
              <div className="flex items-center gap-2 sm:gap-3 pl-3">
                <Search className="w-5 h-5 text-[#78350f] flex-shrink-0" />
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={inputPlaceholder}
                  className="flex-1 text-xs sm:text-sm py-2 outline-none text-[#26160c] placeholder:text-[#8a7260] font-medium bg-transparent"
                />
                {inputText && (
                  <button
                    type="button"
                    onClick={() => setInputText('')}
                    className="text-[#8a7260] hover:text-[#26160c] p-1 rounded-full hover:bg-[#faedd9] transition-colors flex-shrink-0 cursor-pointer"
                    title={isHindi ? 'साफ़ करें' : 'Clear search'}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={isProcessing || !inputText.trim()}
                  className="px-5 sm:px-6 py-2 sm:py-2.5 bg-[#642918] hover:bg-[#4e1f12] text-white rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex-shrink-0"
                >
                  {isProcessing ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>{isHindi ? 'खोज जारी...' : 'Searching...'}</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>{isHindi ? 'खोजें' : 'Search'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* TRENDING QUICK SEARCH TAGS ("लोकप्रिय खोजें:") */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none text-xs">
              <span className="text-stone-600 font-bold flex-shrink-0 flex items-center gap-1 pl-1">
                <span className="text-amber-600">⚡</span>
                <span>{isHindi ? 'लोकप्रिय खोजें:' : 'Trending:'}</span>
              </span>
              {TRENDING_TAGS.map((tag, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setInputText(tag.query);
                    handleSendMessage(tag.query);
                  }}
                  className={`font-semibold px-3 py-1 rounded-full border transition-all whitespace-nowrap shadow-2xs cursor-pointer flex-shrink-0 flex items-center gap-1.5 ${tag.color}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${tag.dotColor}`}></span>
                  <span>{isHindi ? tag.label_hi : tag.label_en}</span>
                </button>
              ))}
            </div>

            {/* Error Alert */}
            {errorMessage && (
              <div className="mb-4 p-3.5 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-xs sm:text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
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
              <div className="space-y-5 my-5">
                {/* 1. Warm Acknowledgement */}
                <div className="bg-[#faedd9] border-l-4 border-l-[#642918] border border-[#deb887] p-4 sm:p-5 rounded-2xl shadow-xs text-[#26160c]">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5">🙏</span>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-[#26160c] leading-snug">
                        {resultData.response.acknowledgement}
                      </h3>
                      {/* Extracted Profile Pill Bar with Direct Edit Option */}
                      {resultData.profile && (
                        <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-[#deb887] text-xs">
                          <span className="bg-[#fae2c6] text-[#78350f] border border-[#e2a87c] px-2.5 py-0.5 rounded-full font-bold">
                            👤 {resultData.profile.name || 'नागरिक'}
                          </span>
                          <span className="bg-[#fff8f0] text-[#4a3525] border border-[#d8b992] px-2.5 py-0.5 rounded-full font-medium">
                            📍 {resultData.profile.district ? `${resultData.profile.district}, ` : ''}{resultData.profile.state}
                          </span>
                          <span className="bg-[#fff8f0] text-[#4a3525] border border-[#d8b992] px-2.5 py-0.5 rounded-full font-medium">
                            🌾 {resultData.profile.occupation}
                          </span>
                          <span className="bg-[#dbead4] text-[#165324] border border-[#7fb373] px-2.5 py-0.5 rounded-full font-bold">
                            ₹ {resultData.profile.income.toLocaleString('en-IN')} / year
                          </span>
                          {resultData.profile.problem_description && (
                            <span className="bg-[#fadcd3] text-[#882414] border border-[#cf7b67] px-2.5 py-0.5 rounded-full font-medium">
                              ⚠️ {resultData.profile.problem_description}
                            </span>
                          )}
                          
                          <button
                            onClick={() => setIsProfileModalOpen(true)}
                            className="ml-auto inline-flex items-center gap-1 text-[#78350f] hover:text-[#5c2314] bg-[#fae2c6] hover:bg-[#f5dac0] px-2.5 py-0.5 rounded-md font-bold border border-[#e2a87c] transition-colors cursor-pointer"
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
                  <div className="bg-gradient-to-r from-[#0e2f1e] via-[#153f28] to-[#1b5e20] rounded-2xl p-5 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

                    <div className="bg-emerald-950/40 border border-emerald-400/30 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold">
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
                      <h3 className="text-lg sm:text-xl font-bold text-[#26160c] flex items-center gap-2">
                        <Layers className="w-5 h-5 text-emerald-700" />
                        <span>{isHindi ? 'आपके लिए स्वीकृत सरकारी योजनाएं' : 'Your Qualifying Government Schemes'}</span>
                      </h3>
                      <button
                        onClick={() => setActiveLayer('schemes')}
                        className="text-xs text-[#78350f] hover:text-[#5c2314] font-bold underline cursor-pointer"
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
                      <h3 className="text-lg sm:text-xl font-bold text-[#26160c] flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-red-600" />
                        <span>{isHindi ? 'आरटीआई कानूनी कार्रवाई स्थिति' : 'RTI Statutory Enforcement Status'}</span>
                      </h3>
                      <button
                        onClick={() => setActiveLayer('rti')}
                        className="text-xs text-red-700 hover:text-red-900 font-bold underline cursor-pointer"
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
                <div className="bg-[#fef3c7] border border-[#fde68a] rounded-2xl p-4 sm:p-5 shadow-xs text-[#78350f]">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#92400e] block mb-1">
                    {isHindi ? '📌 आगे का कदम (Next Steps):' : '📌 What Happens Next:'}
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-stone-800 leading-relaxed">
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
      <footer className="sticky bottom-0 z-40 bg-[#edd5b3]/95 backdrop-blur-md border-t border-[#deb887] pt-2 pb-1">
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
