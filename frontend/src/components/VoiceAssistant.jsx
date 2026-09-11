import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, RotateCcw, Globe, AlertCircle } from 'lucide-react';

export default function VoiceAssistant({ 
  onTranscript, 
  isProcessing, 
  spokenScript, 
  currentLanguage, 
  onLanguageChange,
  mode = 'BOTH'
}) {
  const [isListening, setIsListening] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [speechError, setSpeechError] = useState(null);

  const recognitionRef = useRef(null);

  // Initialize Web Speech API for Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';

    recognition.onstart = () => {
      setIsListening(true);
      setSpeechError(null);
    };

    recognition.onresult = (event) => {
      let currentText = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentText += event.results[i][0].transcript;
      }
      setLiveTranscript(currentText);
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        setSpeechError('कृपया माइक्रोफ़ोन की अनुमति दें / Please allow microphone access');
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [currentLanguage]);

  // Handle Automatic TTS when new spokenScript arrives
  useEffect(() => {
    if (spokenScript && 'speechSynthesis' in window) {
      speakText(spokenScript);
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [spokenScript]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      if (liveTranscript.trim()) {
        onTranscript(liveTranscript);
        setLiveTranscript('');
      }
    } else {
      // Cancel any ongoing speech when user starts talking
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
      setLiveTranscript('');
      try {
        recognitionRef.current.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';
        recognitionRef.current.start();
      } catch (e) {
        console.error('Error starting recognition:', e);
      }
    }
  };

  const handleSendTranscript = () => {
    if (liveTranscript.trim()) {
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
      onTranscript(liveTranscript);
      setLiveTranscript('');
    }
  };

  const speakText = (text) => {
    if (!('speechSynthesis' in window) || !text) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95; // Slightly slower for clear rural understanding
    utterance.pitch = 1.0;

    // Pick best matching Hindi or Indian English voice if available
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(v => 
      currentLanguage === 'hi' 
        ? (v.lang.includes('hi') || v.name.toLowerCase().includes('hindi'))
        : (v.lang.includes('en-IN') || v.lang.includes('en-GB') || v.lang.includes('en'))
    );
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="bg-white border-t border-stone-200 shadow-xl p-3 sm:p-4 rounded-t-2xl sm:rounded-2xl max-w-4xl mx-auto w-full">
      {/* Top Controls: Language Switcher and Audio State */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100 text-xs sm:text-sm text-stone-600">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-orange-600" />
          <span className="font-semibold text-stone-800">
            {currentLanguage === 'hi' ? 'भाषा:' : 'Language:'}
          </span>
          <button
            onClick={() => onLanguageChange('hi')}
            className={`px-2.5 py-1 rounded-full font-medium transition-all ${
              currentLanguage === 'hi'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            हिंदी (Hindi)
          </button>
          <button
            onClick={() => onLanguageChange('en')}
            className={`px-2.5 py-1 rounded-full font-medium transition-all ${
              currentLanguage === 'en'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            English
          </button>
        </div>

        {/* Spoken Audio Controls */}
        <div className="flex items-center gap-2">
          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="flex items-center gap-1 text-red-600 hover:text-red-700 bg-red-50 px-2 py-1 rounded text-xs font-semibold animate-pulse"
              title="Stop audio playback"
            >
              <VolumeX className="w-4 h-4" />
              <span>{currentLanguage === 'hi' ? 'आवाज़ रोकें' : 'Stop Audio'}</span>
            </button>
          )}
          {!isSpeaking && spokenScript && (
            <button
              onClick={() => speakText(spokenScript)}
              className="flex items-center gap-1 text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded text-xs font-semibold"
              title="Repeat audio readout"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{currentLanguage === 'hi' ? 'दोबारा सुनें' : 'Listen Again'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Error Alert */}
      {speechError && (
        <div className="mb-3 p-2.5 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2 text-amber-800 text-xs sm:text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{speechError}</span>
        </div>
      )}

      {/* Center Voice Action Area */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Large Accessible Microphone Button */}
        <button
          type="button"
          onClick={toggleListening}
          disabled={isProcessing || !speechSupported}
          className={`relative group flex items-center justify-center p-4 sm:p-5 rounded-full text-white font-bold transition-all shadow-md focus:outline-none focus:ring-4 focus:ring-orange-300 ${
            isListening
              ? 'bg-red-600 hover:bg-red-700 mic-recording ring-4 ring-red-400'
              : 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700'
          } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label={isListening ? 'Stop listening' : 'Start speaking'}
        >
          {isListening ? (
            <MicOff className="w-7 h-7 sm:w-8 sm:h-8" />
          ) : (
            <Mic className="w-7 h-7 sm:w-8 sm:h-8" />
          )}
        </button>

        {/* Live Audio Feedback or Instructions */}
        <div className="flex-1 w-full bg-stone-50 border border-stone-200 rounded-xl p-3 min-h-[58px] flex items-center justify-between">
          {isListening ? (
            <div className="w-full">
              <div className="flex items-center gap-2 text-xs font-semibold text-red-600 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
                <span>{currentLanguage === 'hi' ? 'आपकी बात सुन रहे हैं...' : 'Listening to your voice...'}</span>
              </div>
              <p className="text-sm font-medium text-stone-800 italic">
                {liveTranscript || (currentLanguage === 'hi' ? 'बोलिए: नाम, गाँव, समस्या या योजना...' : 'Speak: state, farming, road, ration, or scheme problem...')}
              </p>
            </div>
          ) : liveTranscript ? (
            <div className="w-full flex items-center justify-between">
              <p className="text-sm text-stone-800 font-medium">{liveTranscript}</p>
              <button
                onClick={handleSendTranscript}
                className="ml-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-sm"
              >
                {currentLanguage === 'hi' ? 'पूछें (Send)' : 'Send'}
              </button>
            </div>
          ) : (
            <div className="text-stone-500 text-xs sm:text-sm">
              <span className="font-semibold text-stone-700">
                {currentLanguage === 'hi' ? 'माइक दबाकर बोलें:' : 'Tap the mic to speak:'}
              </span>{' '}
              {mode === 'SCHEME' ? (
                currentLanguage === 'hi'
                  ? '"मैं यूपी का किसान हूँ, 80 हजार आय है, कौन सी सरकारी योजनाएं मिलेंगी?"'
                  : '"I am a farmer from UP, income ₹80,000, which schemes do I qualify for?"'
              ) : mode === 'RTI' ? (
                currentLanguage === 'hi'
                  ? '"हमारे गाँव की सड़क 3 साल से नहीं बनी, PWD विभाग में RTI दर्ज करें"'
                  : '"Our village road is broken for 3 years, file RTI with PWD"'
              ) : (
                currentLanguage === 'hi'
                  ? '"मैं यूपी का किसान हूँ, 80 हजार आय है, हमारे गाँव की सड़क नहीं बनी"'
                  : '"I am a farmer from UP, income ₹80,000, our village road is broken"'
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
