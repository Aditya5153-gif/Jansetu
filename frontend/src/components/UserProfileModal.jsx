import React from 'react';
import { User, X, Check, RotateCcw, MapPin, Briefcase, IndianRupee, Layers, Sparkles } from 'lucide-react';

const INDIAN_STATES = [
  'Uttar Pradesh',
  'Bihar',
  'Madhya Pradesh',
  'Maharashtra',
  'Rajasthan',
  'Punjab',
  'Haryana',
  'Gujarat',
  'West Bengal',
  'Odisha',
  'Jharkhand',
  'Chhattisgarh',
  'Tamil Nadu',
  'Andhra Pradesh',
  'Karnataka'
];

const PRESET_CITIZENS = [
  {
    label: '👩‍🌾 सीता देवी (बिहार, मजदूर)',
    profile: {
      name: 'सीता देवी (Sita Devi)',
      state: 'Bihar',
      district: 'Muzaffarpur',
      occupation: 'agricultural labourer',
      income: 45000,
      land_holding_acres: 0,
      caste: 'SC',
      gender: 'female',
      age: 38
    }
  },
  {
    label: '🌾 राजेश पटेल (MP, किसान)',
    profile: {
      name: 'राजेश पटेल (Rajesh Patel)',
      state: 'Madhya Pradesh',
      district: 'Indore',
      occupation: 'farmer',
      income: 120000,
      land_holding_acres: 3.5,
      caste: 'OBC',
      gender: 'male',
      age: 46
    }
  },
  {
    label: '👨‍🌾 रमेश कुमार (UP, किसान)',
    profile: {
      name: 'रमेश कुमार (Ramesh Kumar)',
      state: 'Uttar Pradesh',
      district: 'Varanasi',
      occupation: 'farmer',
      income: 80000,
      land_holding_acres: 2.0,
      caste: 'OBC',
      gender: 'male',
      age: 42
    }
  }
];

export default function UserProfileModal({ 
  isOpen, 
  onClose, 
  profile, 
  onSaveProfile, 
  language = 'hi' 
}) {
  if (!isOpen) return null;

  const isHindi = language === 'hi';
  const [formData, setFormData] = React.useState({
    name: profile?.name || '',
    state: profile?.state || 'Uttar Pradesh',
    district: profile?.district || '',
    occupation: profile?.occupation || 'farmer',
    income: profile?.income || 80000,
    land_holding_acres: profile?.land_holding_acres ?? 2.0,
    caste: profile?.caste || 'OBC',
    gender: profile?.gender || 'male',
    age: profile?.age || 40
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleApplyPreset = (presetProfile) => {
    setFormData(presetProfile);
  };

  const handleReset = () => {
    setFormData({
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveProfile(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-white border border-stone-200 rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-xl">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold leading-tight">
                {isHindi ? 'नागरिक विवरण (Citizen Profile)' : 'Citizen Profile Details'}
              </h2>
              <p className="text-xs text-orange-100">
                {isHindi ? 'अपनी पहचान दर्ज करें — योजनाएं और आरटीआई इसी नाम से बनेंगी' : 'Customize your name, state & income'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Citizen Presets */}
        <div className="bg-stone-50 border-b border-stone-200 p-3 sm:px-5">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-orange-600" />
            {isHindi ? '⚡ तुरंत प्रोफाइल लोड करें:' : '⚡ Quick Sample Citizen Profiles:'}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_CITIZENS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(preset.profile)}
                className="text-xs font-semibold bg-white hover:bg-orange-50 hover:text-orange-900 border border-stone-200 px-2.5 py-1 rounded-lg transition-colors text-stone-700 shadow-2xs"
              >
                {preset.label}
              </button>
            ))}
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-stone-500 hover:text-stone-700 bg-stone-200/70 px-2 py-1 rounded-lg"
            >
              {isHindi ? 'साफ करें' : 'Clear'}
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 text-xs sm:text-sm">
          {/* Full Name */}
          <div>
            <label className="block font-bold text-stone-800 mb-1">
              {isHindi ? 'नागरिक का पूरा नाम (Full Name):' : 'Full Name:'}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder={isHindi ? 'उदा. सीता देवी, राजेश कुमार, आदि...' : 'e.g. Sita Devi, Rajesh Kumar...'}
              className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 text-stone-900 font-medium"
            />
          </div>

          {/* State & District Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-stone-800 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-orange-600" />
                <span>{isHindi ? 'राज्य (State):' : 'State:'}</span>
              </label>
              <select
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 text-stone-900 font-medium bg-white"
              >
                {INDIAN_STATES.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-stone-800 mb-1">
                {isHindi ? 'जिला (District):' : 'District:'}
              </label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => handleChange('district', e.target.value)}
                placeholder={isHindi ? 'उदा. वाराणसी, पटना, मुजफ्फरपुर...' : 'e.g. Varanasi, Patna, Indore...'}
                className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 text-stone-900 font-medium"
              />
            </div>
          </div>

          {/* Occupation & Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-stone-800 mb-1 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-orange-600" />
                <span>{isHindi ? 'व्यवसाय (Occupation):' : 'Occupation:'}</span>
              </label>
              <select
                value={formData.occupation}
                onChange={(e) => handleChange('occupation', e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 text-stone-900 font-medium bg-white"
              >
                <option value="farmer">{isHindi ? 'छोटा / सीमांत किसान (Farmer)' : 'Farmer'}</option>
                <option value="agricultural labourer">{isHindi ? 'खेतिहर मजदूर (Farm Labourer)' : 'Agricultural Labourer'}</option>
                <option value="daily wager">{isHindi ? 'दैनिक मजदूर (Daily Wage Worker)' : 'Daily Wage Worker'}</option>
                <option value="small shopkeeper">{isHindi ? 'छोटा दुकानदार / कारीगर (Artisan / Shop)' : 'Small Shopkeeper'}</option>
                <option value="unemployed">{isHindi ? 'बेरोजगार (Unemployed)' : 'Unemployed'}</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-stone-800 mb-1">
                {isHindi ? 'वर्ग / श्रेणी (Caste Category):' : 'Social Category:'}
              </label>
              <select
                value={formData.caste}
                onChange={(e) => handleChange('caste', e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 text-stone-900 font-medium bg-white"
              >
                <option value="OBC">OBC (अन्य पिछड़ा वर्ग)</option>
                <option value="SC">SC (अनुसूचित जाति)</option>
                <option value="ST">ST (अनुसूचित जनजाति)</option>
                <option value="General">General (सामान्य)</option>
              </select>
            </div>
          </div>

          {/* Annual Income & Land Holding */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-stone-800 mb-1 flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isHindi ? 'वार्षिक आय (Annual Income ₹):' : 'Annual Income (₹):'}</span>
              </label>
              <input
                type="number"
                step="5000"
                value={formData.income}
                onChange={(e) => handleChange('income', Number(e.target.value))}
                className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 text-stone-900 font-bold"
              />
              <div className="flex gap-1 mt-1 text-[10px]">
                {[45000, 80000, 120000, 200000].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleChange('income', val)}
                    className="px-1.5 py-0.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded"
                  >
                    ₹{(val/1000)}k
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-800 mb-1 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-stone-600" />
                <span>{isHindi ? 'जमीन (Acres):' : 'Land (Acres):'}</span>
              </label>
              <input
                type="number"
                step="0.5"
                value={formData.land_holding_acres}
                onChange={(e) => handleChange('land_holding_acres', Number(e.target.value))}
                className="w-full px-3 py-2 border border-stone-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 text-stone-900 font-bold"
              />
              <span className="text-[10px] text-stone-500 block mt-1">
                {isHindi ? '0 का अर्थ भूमिहीन / मजदूर है' : '0 means landless labourer'}
              </span>
            </div>
          </div>

          {/* Footer Save Actions */}
          <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-semibold transition-colors"
            >
              {isHindi ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>{isHindi ? 'विवरण सहेजें (Save Profile)' : 'Save Profile'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
