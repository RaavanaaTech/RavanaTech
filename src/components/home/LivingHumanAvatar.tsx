import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Radio, 
  RotateCcw, 
  CheckCircle2, 
  MessageSquare,
  ShieldCheck,
  Zap,
  Globe2,
  ExternalLink
} from 'lucide-react';
import founderAvatarImg from '../../assets/founder-avatar.jpg';

interface LivingHumanAvatarProps {
  variant?: 'compact' | 'hero' | 'receptionist';
  isSpeaking?: boolean;
  activeLanguage?: 'en' | 'si';
  onLanguageChange?: (lang: 'en' | 'si') => void;
  onConnectWhatsApp?: () => void;
  className?: string;
}

export const LivingHumanAvatar: React.FC<LivingHumanAvatarProps> = ({
  variant = 'hero',
  isSpeaking: externalSpeaking = false,
  activeLanguage = 'en',
  onLanguageChange,
  onConnectWhatsApp,
  className = ''
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentLang, setCurrentLang] = useState<'en' | 'si'>(activeLanguage);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [audioProgress, setAudioProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState<'twin' | 'voice' | 'tech'>('twin');
  const [isBlinking, setIsBlinking] = useState(false);
  const [customAvatar, setCustomAvatar] = useState<string | null>(() => {
    try {
      return localStorage.getItem('ravana_founder_avatar_custom') || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const handleUpdate = () => {
      try {
        setCustomAvatar(localStorage.getItem('ravana_founder_avatar_custom') || null);
      } catch (e) {
        console.warn(e);
      }
    };
    window.addEventListener('ravana_avatar_updated', handleUpdate);
    return () => window.removeEventListener('ravana_avatar_updated', handleUpdate);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const synthUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<any>(null);

  // Sync internal language with prop
  useEffect(() => {
    setCurrentLang(activeLanguage);
  }, [activeLanguage]);

  // Organic Eye Blinking timer (simulates human eye blinking naturally every 3.5 to 5.5 seconds)
  useEffect(() => {
    let blinkTimer: any;
    const scheduleNextBlink = () => {
      const delay = Math.random() * 2000 + 3500; // 3.5 - 5.5s
      blinkTimer = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleNextBlink();
        }, 130); // 130ms realistic blink duration
      }, delay);
    };

    scheduleNextBlink();
    return () => clearTimeout(blinkTimer);
  }, []);

  // Parallax 3D mouse tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalize -1 to +1
    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);
    
    // Clamp to ±1
    const clampedX = Math.max(-1, Math.min(1, normX));
    const clampedY = Math.max(-1, Math.min(1, normY));
    
    setMouseOffset({ x: clampedX, y: clampedY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMouseOffset({ x: 0, y: 0 });
  };

  // Official founder speech scripts
  const OFFICIAL_SCRIPTS = {
    en: {
      title: "English Founder Greeting",
      duration: "0:42",
      text: "Hello, and welcome to Ravana Tech. I am the founder, and we specialize in building high-performance modern websites, scalable web applications, and intelligent AI-driven digital ecosystems. Whether you are an ambitious startup or an established enterprise looking to scale globally, our team delivers world-class engineering with speed and precision. Let's collaborate and build something extraordinary together."
    },
    si: {
      title: "සිංහල නිර්මාතෘ හඬ පටය",
      duration: "0:36",
      text: "ආයුබෝවන්, මම රාවනා ටෙක් හි නිර්මාතෘ. අපි ලංකාවේ වගේම ලෝකය පුරා විසිරී සිටින ව්‍යාපාර සඳහා ලෝක මට්ටමේ Modern Websites, Web Applications සහ Custom AI Solutions නිර්මාණය කරනවා. ඔබේ ව්‍යාපාරයේ ඩිජිටල් ගමන වේගවත් කරන්න සහ අලෙවිය වැඩි කරගන්න අවශ්‍ය ඕනෑම තාක්ෂණික සහයක් ලබාදෙන්න අපේ කණ්ඩායම පැය විසිහතර පුරාම සූදානම්. ඔබේ අදහස අපි එක්ව යථාර්ථයක් කරමු."
    }
  };

  // Play official voice greeting via natural speech synthesis engine
  const playOfficialVoice = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setAudioProgress(0);
      clearInterval(timerRef.current);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const script = OFFICIAL_SCRIPTS[currentLang].text;
      const utterance = new SpeechSynthesisUtterance(script);

      utterance.rate = currentLang === 'en' ? 1.0 : 0.94;
      utterance.pitch = 1.0;
      utterance.lang = currentLang === 'en' ? 'en-US' : 'si-LK';

      // Pick best natural voice if available
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        if (currentLang === 'en') {
          const naturalVoice = voices.find(v => 
            v.name.includes('Natural') || 
            v.name.includes('Google') || 
            v.name.includes('Daniel') || 
            (v.lang.startsWith('en') && !v.name.includes('Bad'))
          );
          if (naturalVoice) utterance.voice = naturalVoice;
        }
      }

      utterance.onstart = () => {
        setIsPlayingAudio(true);
        setAudioProgress(0);

        // Simulate progress bar based on estimated script duration
        const estimatedSeconds = currentLang === 'en' ? 42 : 36;
        let elapsed = 0;
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
          elapsed += 0.2;
          const prog = Math.min(100, (elapsed / estimatedSeconds) * 100);
          setAudioProgress(prog);
          if (prog >= 100) clearInterval(timerRef.current);
        }, 200);
      };

      utterance.onend = () => {
        setIsPlayingAudio(false);
        setAudioProgress(100);
        clearInterval(timerRef.current);
        setTimeout(() => setAudioProgress(0), 1200);
      };

      utterance.onerror = () => {
        setIsPlayingAudio(false);
        clearInterval(timerRef.current);
      };

      synthUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech playback notice:', e);
      setIsPlayingAudio(false);
    }
  };

  const handleLangToggle = (lang: 'en' | 'si') => {
    setCurrentLang(lang);
    if (onLanguageChange) onLanguageChange(lang);
    if (isPlayingAudio) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
      setAudioProgress(0);
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      clearInterval(timerRef.current);
    };
  }, []);

  const isSpeaking = externalSpeaking || isPlayingAudio;

  // 3D rotation transforms from mouse offset
  const rotateY = mouseOffset.x * 6; // max 6deg horizontal tilt
  const rotateX = -mouseOffset.y * 5; // max 5deg vertical tilt

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full max-w-xl mx-auto rounded-3xl overflow-hidden border border-amber-500/20 bg-stone-950/90 shadow-2xl backdrop-blur-xl transition-all duration-300 ${className}`}
    >
      {/* Background ambient radial glow */}
      <div 
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none transition-opacity duration-700"
        style={{ opacity: isSpeaking ? 0.8 : 0.35 }}
      />
      <div 
        className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none transition-opacity duration-700"
        style={{ opacity: isSpeaking ? 0.7 : 0.3 }}
      />

      {/* Top Header Bar with Digital Twin badge & Language Selector */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-stone-800/80 bg-stone-900/60 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-stone-100 tracking-wide">
                Shanthapriya Silva
              </span>
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                <ShieldCheck className="w-2.5 h-2.5 text-amber-400" />
                FOUNDER
              </span>
            </div>
            <p className="text-[10px] text-stone-400">
              Interactive Living Digital Twin • Ravana Tech
            </p>
          </div>
        </div>

        {/* Dual Language Switcher */}
        <div className="flex items-center p-0.5 rounded-xl bg-stone-950 border border-stone-800">
          <button
            onClick={() => handleLangToggle('en')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
              currentLang === 'en'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => handleLangToggle('si')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
              currentLang === 'si'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            සිංහල
          </button>
        </div>
      </div>

      {/* Main Avatar Stage */}
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
        {/* AVATAR PORTRAIT CONTAINER WITH LIVING MOTION ENGINE */}
        <div className="relative shrink-0 flex items-center justify-center">
          
          {/* Cybernetic Aura Ring (Expands when speaking) */}
          <div 
            className={`absolute -inset-2 rounded-3xl bg-linear-to-tr from-amber-500/25 via-emerald-500/20 to-amber-300/30 blur-md transition-all duration-500 ${
              isSpeaking ? 'animate-avatar-speaking-ring opacity-100 scale-105' : 'opacity-40 animate-avatar-glow'
            }`}
          />

          {/* Real-time 3D Perspective Stage */}
          <div 
            className="relative w-36 h-48 sm:w-44 sm:h-56 rounded-2xl overflow-hidden border-2 border-stone-700/80 bg-stone-900 shadow-2xl transition-transform duration-200 ease-out"
            style={{
              transform: `perspective(900px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* The Living Founder Portrait with Organic Breathing + Micro-Sway */}
            <div className="w-full h-full animate-avatar-breathe relative">
              <img 
                src={customAvatar || founderAvatarImg}
                alt="Shanthapriya Silva - Founder & Tech Lead, Ravana Tech"
                className={`w-full h-full object-cover object-top filter brightness-95 contrast-105 transition-all duration-500 ${
                  isSpeaking ? 'scale-105 brightness-100' : 'scale-100'
                }`}
              />

              {/* Natural Eye-Blink Simulation Layer */}
              <div 
                className={`absolute inset-0 pointer-events-none transition-opacity duration-100 ${
                  isBlinking ? 'opacity-80' : 'opacity-0'
                }`}
                style={{
                  background: 'linear-gradient(to bottom, transparent 38%, rgba(20, 20, 20, 0.95) 43%, rgba(20, 20, 20, 0.95) 46%, transparent 51%)'
                }}
              />

              {/* Warm Studio Ambient Flare */}
              <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-transparent to-amber-500/10 pointer-events-none" />

              {/* Live Audio Spectrum Overlay (Visible when speaking) */}
              {isSpeaking && (
                <div className="absolute inset-x-0 bottom-0 py-2 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent flex items-center justify-center gap-1.5">
                  <span className="w-1 h-3.5 bg-amber-400 rounded-full animate-pulse" />
                  <span className="w-1.5 h-6 bg-emerald-400 rounded-full animate-bounce" />
                  <span className="w-1 h-8 bg-amber-300 rounded-full animate-pulse delay-75" />
                  <span className="w-1.5 h-5 bg-emerald-400 rounded-full animate-bounce delay-150" />
                  <span className="w-1 h-3 bg-amber-400 rounded-full animate-pulse delay-200" />
                </div>
              )}
            </div>

            {/* Online Status Corner Tag */}
            <div className="absolute top-2 left-2 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-stone-950/80 border border-emerald-500/40 text-[9px] font-bold text-emerald-400 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE TWIN</span>
            </div>
          </div>
        </div>

        {/* DETAILS & CONTROLS COLUMN */}
        <div className="flex-1 w-full flex flex-col justify-between space-y-3">
          
          {/* Founder Quote Card */}
          <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-stone-800 text-left">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                {currentLang === 'en' ? 'Direct Voice Message' : 'සෘජු නිර්මාතෘ හඬ පණිවිඩය'}
              </span>
              <span className="text-[10px] text-stone-400 font-mono">
                {OFFICIAL_SCRIPTS[currentLang].duration}
              </span>
            </div>

            <p className="text-xs sm:text-[13px] text-stone-200 font-sans leading-relaxed line-clamp-3 italic">
              "{OFFICIAL_SCRIPTS[currentLang].text}"
            </p>
          </div>

          {/* Interactive Voice Player Controls */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <button
                onClick={playOfficialVoice}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-amber-500 text-stone-950 ring-4 ring-amber-500/25 shadow-lg'
                    : 'bg-stone-800 hover:bg-stone-700 text-stone-100 border border-stone-700 hover:border-amber-500/50'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>{currentLang === 'en' ? 'Pause Voice' : 'හඬ නවත්වන්න'}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current ml-0.5 text-amber-400" />
                    <span>
                      {currentLang === 'en' ? 'Listen to Founder Voice' : 'නිර්මාතෘගේ හඬට සවන් දෙන්න'}
                    </span>
                  </>
                )}
              </button>

              {/* Direct WhatsApp Call/Chat */}
              <button
                onClick={onConnectWhatsApp || (() => {
                  const text = currentLang === 'en'
                    ? "Hi Shanthapriya! I listened to your Living Digital Twin greeting on Ravana Tech and would like to consult on my project."
                    : "ආයුබෝවන් ශාන්තප්‍රිය! මම ඔබගේ Ravana Tech Living Twin හඬට සවන් දුන්නා. මගේ Project එක ගැන සාකච්ඡා කිරීමට අවශ්‍යයි.";
                  window.open(`https://wa.me/94788470610?text=${encodeURIComponent(text)}`, '_blank');
                })}
                className="flex items-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs shadow-md transition-all cursor-pointer shrink-0"
                title="Connect on WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </button>
            </div>

            {/* Audio Playback Progress Bar */}
            {isPlayingAudio && (
              <div className="w-full bg-stone-900 rounded-full h-1.5 overflow-hidden border border-stone-800">
                <div 
                  className="bg-linear-to-r from-amber-500 to-emerald-400 h-full transition-all duration-200"
                  style={{ width: `${audioProgress}%` }}
                />
              </div>
            )}
          </div>

          {/* Living Features Footer Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px] text-stone-400">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-900 border border-stone-800">
              <Zap className="w-2.5 h-2.5 text-amber-400" />
              Micro-Breathing Engine
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-900 border border-stone-800">
              <Radio className="w-2.5 h-2.5 text-emerald-400" />
              3D Mouse Gaze Tracking
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-900 border border-stone-800">
              <Globe2 className="w-2.5 h-2.5 text-cyan-400" />
              Bilingual Synchronized
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
