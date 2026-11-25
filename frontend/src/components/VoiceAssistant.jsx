import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, RotateCcw, Globe, AlertCircle, ChevronRight, Send } from 'lucide-react';

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
  const [typedInput, setTypedInput] = useState('');
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
    const textToSend = typedInput.trim() || liveTranscript.trim();
    if (textToSend) {
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
      onTranscript(textToSend);
      setLiveTranscript('');
      setTypedInput('');
    }
  };

  const speakText = (text) => {
    if (!('speechSynthesis' in window) || !text) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

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
    <div className="bg-[#faedd9]/95 backdrop-blur-md border border-[#deb887] shadow-xl p-2.5 sm:p-3.5 rounded-t-3xl sm:rounded-3xl max-w-4xl mx-auto w-full text-[#2b1f17]">
      {/* Top Controls: Language Switcher and Audio State */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#deb887]/80 text-xs text-[#5c4738]">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#78350f]" />
          <span className="font-bold text-[#26160c]">
            {currentLanguage === 'hi' ? 'भाषा:' : 'Language:'}
          </span>
          <button
            type="button"
            onClick={() => onLanguageChange('hi')}
            className={`px-3 py-1 rounded-full font-bold text-xs transition-all cursor-pointer ${
              currentLanguage === 'hi'
                ? 'bg-[#5c2314] text-white shadow-xs'
                : 'border border-[#d8b992] text-[#4a3525] bg-[#fff8f0] hover:bg-[#faedd9]'
            }`}
          >
            हिंदी (Hindi)
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange('en')}
            className={`px-3 py-1 rounded-full font-bold text-xs transition-all cursor-pointer ${
              currentLanguage === 'en'
                ? 'bg-[#5c2314] text-white shadow-xs'
                : 'border border-[#d8b992] text-[#4a3525] bg-[#fff8f0] hover:bg-[#faedd9]'
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
              className="flex items-center gap-1 text-red-700 hover:text-red-800 bg-red-100/80 border border-red-300 px-2 py-0.5 rounded-full text-xs font-bold animate-pulse cursor-pointer"
              title="Stop audio playback"
            >
              <VolumeX className="w-3.5 h-3.5" />
              <span>{currentLanguage === 'hi' ? 'रोकें' : 'Stop'}</span>
            </button>
          )}
          {!isSpeaking && spokenScript && (
            <button
              onClick={() => speakText(spokenScript)}
              className="flex items-center gap-1 text-[#15803d] hover:text-[#166534] bg-emerald-100/80 border border-emerald-300 px-2.5 py-0.5 rounded-full text-xs font-bold cursor-pointer"
              title="Repeat audio readout"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{currentLanguage === 'hi' ? 'दोबारा सुनें' : 'Listen Again'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Error Alert */}
      {speechError && (
        <div className="mb-2 p-2 bg-amber-50 border border-amber-300 rounded-xl flex items-center gap-2 text-amber-900 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-700" />
          <span>{speechError}</span>
        </div>
      )}

      {/* Center Voice Action Area (Walnut Round Mic + Pill Search Box + Walnut Round Arrow Button) */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Walnut Brown Round Mic Button */}
        <button
          type="button"
          onClick={toggleListening}
          disabled={isProcessing || !speechSupported}
          className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full text-white font-bold transition-all shadow-md focus:outline-none cursor-pointer flex-shrink-0 ${
            isListening
              ? 'bg-red-600 hover:bg-red-700 mic-recording ring-4 ring-red-400'
              : 'bg-[#5c2314] hover:bg-[#4a1c10] active:scale-95'
          } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label={isListening ? 'Stop listening' : 'Start speaking'}
          title={isListening ? 'रोकने के लिए क्लिक करें' : 'बोलने के लिए माइक दबाएं'}
        >
          {isListening ? (
            <MicOff className="w-6 h-6" />
          ) : (
            <Mic className="w-6 h-6" />
          )}
        </button>

        {/* Input Bar */}
        <div className="flex-1 flex items-center bg-[#fff8f0] border border-[#d8b992] rounded-full px-4 py-2 sm:py-2.5 focus-within:border-[#78350f] focus-within:ring-2 focus-within:ring-[#78350f]/20 transition-all">
          {isListening ? (
            <div className="flex-1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
              <span className="text-xs sm:text-sm font-medium text-[#26160c] truncate">
                {liveTranscript || (currentLanguage === 'hi' ? 'आपकी बात सुन रहे हैं...' : 'Listening...')}
              </span>
            </div>
          ) : (
            <input
              type="text"
              value={typedInput}
              onChange={(e) => setTypedInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendTranscript()}
              placeholder={
                currentLanguage === 'hi'
                  ? 'यहाँ अपना सवाल टाइप करें... (जैसे: पेंशन योजना की जानकारी चाहिए)'
                  : 'Type your question here... (e.g. need info about pension scheme)'
              }
              className="flex-1 bg-transparent text-xs sm:text-sm text-[#26160c] placeholder:text-[#8a7260] outline-none font-medium"
            />
          )}
        </div>

        {/* Walnut Brown Round Arrow Button */}
        <button
          type="button"
          onClick={handleSendTranscript}
          disabled={isProcessing || (!typedInput.trim() && !liveTranscript.trim())}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#5c2314] hover:bg-[#4a1c10] text-white flex items-center justify-center transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex-shrink-0"
          title={currentLanguage === 'hi' ? 'भेजें' : 'Submit'}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
