import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Volume2, VolumeX, Sparkles, ArrowRight, Play } from 'lucide-react';

interface WelcomeAudioGreetingProps {
  onQuoteClick?: () => void;
}

export const WelcomeAudioGreeting: React.FC<WelcomeAudioGreetingProps> = ({ onQuoteClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const greetingScript = 
    "Hi, welcome to Ravana Tech Sri Lanka! We create clean, mobile-first websites with direct WhatsApp ordering and Google visibility in just 3 days. Get your instant free quote below or chat with us on WhatsApp right away!";

  const playVoice = () => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel(); // clear previous queue

      const utterance = new SpeechSynthesisUtterance(greetingScript);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';

      // Pick best English voice if available
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const naturalVoice = voices.find(v => (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.lang === 'en-US'));
        if (naturalVoice) utterance.voice = naturalVoice;
      }

      utterance.onstart = () => {
        setIsPlaying(true);
        setAutoplayBlocked(false);
      };

      utterance.onend = () => {
        setIsPlaying(false);
      };

      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis event notice:', e);
        setIsPlaying(false);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Autoplay error:', e);
      setAutoplayBlocked(true);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    // Modern browsers require voices to be loaded or cached
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = () => {
        // Ready
      };
    }

    // 1. Immediate attempt (Works if user has interacted with domain previously or browser allows)
    const timer1 = setTimeout(() => {
      playVoice();
    }, 400);

    // 2. Global gesture trigger (Crucial for modern Chrome / Safari / iOS / Android autoplay policy):
    // As soon as user clicks anywhere, taps screen, or scrolls, trigger voice immediately!
    const handleUserGesture = () => {
      if (!window.speechSynthesis.speaking) {
        playVoice();
      }
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener('click', handleUserGesture);
      window.removeEventListener('touchstart', handleUserGesture);
      window.removeEventListener('scroll', handleUserGesture);
      window.removeEventListener('pointerdown', handleUserGesture);
    };

    window.addEventListener('click', handleUserGesture, { passive: true });
    window.addEventListener('touchstart', handleUserGesture, { passive: true });
    window.addEventListener('scroll', handleUserGesture, { passive: true });
    window.addEventListener('pointerdown', handleUserGesture, { passive: true });

    return () => {
      clearTimeout(timer1);
      cleanupListeners();
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      playVoice();
    }
  };

  if (dismissed || !isSupported) return null;

  return (
    <div className="w-full bg-linear-to-r from-stone-900 via-stone-850 to-stone-900 text-white border-b border-stone-800 py-2 sm:py-2.5 px-3 sm:px-6 relative shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-center sm:text-left">
        {/* Left greeting badge & speech animation */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            onClick={toggleSpeech}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${
              isPlaying
                ? 'bg-emerald-500 text-stone-950 animate-pulse ring-4 ring-emerald-500/30'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700'
            }`}
            title={isPlaying ? "Mute Voice Greeting" : "Play Voice Greeting"}
            aria-label="Toggle Voice Greeting"
          >
            {isPlaying ? <Volume2 className="w-4 h-4 animate-bounce" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>

          <div className="text-xs">
            <span className="font-semibold text-emerald-400 inline-flex items-center gap-1 mr-1">
              <Sparkles className="w-3 h-3 inline text-amber-300" />
              <span>{isPlaying ? 'Playing Audio:' : 'Welcome Voice:'}</span>
            </span>
            <span className="text-stone-100 font-medium">
              "Hi, Welcome to Ravana Tech!"
            </span>
            <span className="hidden md:inline text-stone-400 text-[11px] ml-1.5">
              — Clean websites with WhatsApp orders launched in 3 days.
            </span>
          </div>
        </div>

        {/* Quick Decision Action */}
        <div className="flex items-center gap-2 shrink-0">
          {isPlaying ? (
            <button
              onClick={toggleSpeech}
              className="text-[11px] font-medium text-amber-300 hover:text-white underline cursor-pointer"
            >
              Mute Voice
            </button>
          ) : (
            <button
              onClick={toggleSpeech}
              className="text-[11px] font-medium text-stone-300 hover:text-white underline cursor-pointer"
            >
              Listen Intro (15s)
            </button>
          )}

          <span className="text-stone-700">|</span>

          <Link
            to="/contact"
            className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <span>Get Free Quote</span>
            <ArrowRight className="w-3 h-3" />
          </Link>

          <button
            onClick={() => {
              if (window.speechSynthesis) window.speechSynthesis.cancel();
              setDismissed(true);
            }}
            className="text-stone-500 hover:text-stone-300 text-xs ml-1 cursor-pointer"
            title="Dismiss greeting"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};
