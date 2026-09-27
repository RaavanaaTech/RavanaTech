import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Globe, 
  MapPin, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  ArrowRight, 
  PhoneCall, 
  RotateCcw, 
  CheckCircle2, 
  Zap, 
  ShoppingBag, 
  UtensilsCrossed, 
  CalendarCheck, 
  Building2, 
  Bot, 
  ExternalLink,
  Minimize2,
  Maximize2,
  Headphones,
  HeartHandshake,
  ShieldCheck,
  Send,
  Coffee,
  Lightbulb,
  TrendingUp,
  Coins,
  Smile,
  Phone,
  MessageSquare,
  Video,
  Mic,
  MicOff,
  Loader2
} from 'lucide-react';
import founderAvatarImg from '../../assets/founder-avatar.jpg';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { type AIProposalResponse } from '../../lib/geminiKnowledgeBase';

// Web Audio API Synthesizer for tactile feedback
const playHoloSound = (type: 'beep' | 'chime' | 'warp' | 'success') => {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'beep') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'chime') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.15);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'warp') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(659.25, now + 0.1);
      osc.frequency.setValueAtTime(880, now + 0.2);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch (err) {}
};

interface VoiceScript {
  en: string;
  siText: string;
  siPhonetic: string;
}

const VOICE_SCRIPTS: Record<string, VoiceScript> = {
  map_prompt: {
    en: "Welcome to Ravana Tech. Please click or tap your location on the map to calibrate your experience.",
    siText: "රාවණා ටෙක් වෙත සාදරයෙන් පිළිගන්නවා. කරුණාකර ඔබගේ ස්ථානය තෝරන්න.",
    siPhonetic: "Welcome to Ravana Tech. Karunaakara obage sthaanaya thoranna."
  },
  welcome: {
    en: "Hey there! Welcome to Ravana Tech. I am your digital architect and founder. I build ultra high-converting digital platforms, web applications, and custom AI automation. Tell me, what great vision brought you here today?",
    siText: "ආයුබෝවන්! රාවණා ටෙක් වෙත සාදරයෙන් පිළිගන්නවා. මම ඔබගේ Digital Architect. අපි high-converting වෙබ් අඩවි සහ AI Automations නිර්මාණය කරනවා. අද ඔබ බලාපොරොත්තු වන විශේෂිත Project එක මොකක්ද?",
    siPhonetic: "Aayubowan! Ravana Tech wetha saadharayen pili-gannawa. Mama obage Digital Architect. Api high-converting web adavi saha AI automations nirmanaya karanawa. Ada oba balaaporoththu vana visheshitha Project eka mokakda?"
  },
  starter_step: {
    en: "Don't worry about technical knowledge or budget worries at all. Here you get 100% free friendly guidance to kickstart your idea. Select your preference below.",
    siText: "තාක්ෂණික දැනුම හෝ මුදල් ගැන කිසිම බයක් ඇති කරගන්න එපා. මෙතනදී අපි ඔබට 100% ක් නොමිලේ සුහදව මඟ පෙන්වනවා. ඔබට ගැළපෙන අංශය තෝරන්න.",
    siPhonetic: "Thakshanika danuma ho mudal gana kisima bayak athi karaganna epaa. Methanadee api obata 100%k nomile suhadawa maga penwanawa. Obata galapena anshaya thoranna."
  },
  growth_step: {
    en: "Awesome! Let's get more customers from Google and Facebook straight into your WhatsApp. Choose your business type below.",
    siText: "නියමයි! ඔබේ ආයතනයට Google සහ Facebook හරහා එන පාරිභෝගිකයින් කෙළින්ම WhatsApp එකට ගෙන්වා ගැනීමේ පහසුම ක්‍රමය මෙන්න. ඔබේ ව්‍යාපාර වර්ගය තෝරන්න.",
    siPhonetic: "Niyamayi! Obe aayathanayata Google saha Facebook harahaa ena customersla kelinma WhatsApp ekata genvaagaaneeme kramaya menna. Obe vyapaara vargaya thoranna."
  },
  demos_step: {
    en: "Seeing is believing! Test our 5 live, real-world interactive applications right now directly on your phone.",
    siText: "කතා කරනවාට වඩා අපේ වැඩ ඇස් දෙකෙන්ම බලන්න. මෙන්න සජීවීව ක්‍රියාත්මක වන Real-world Demo Apps 5ක්. ඔබම Click කරලා බලන්න.",
    siPhonetic: "Katha karanawata wadaa ape wada as dekenma balanna. Menna sajeeweeva kriyaathmaka vana Real world Demo Apps 5k. Obama click karala balanna."
  },
  pricing_step: {
    en: "100% honest and transparent pricing with zero hidden fees. Select your comfortable budget range below.",
    siText: "අපි ළඟ කිසිම හංගපු ගාස්තු නෑ. ඔබට දැරිය හැකි සාධාරණ මුදලට වැඩේ කරගත හැකි ආකාරය මෙන්න. ඔබේ Budget එකට ගැළපෙන එක තෝරන්න.",
    siPhonetic: "Api langa kisima hangapu gaasthu nae. Obata daeriya haki saadharana mudalata wade karagatha haki aakaraya menna. Obe budget ekata galapena eka thoranna."
  },
  human_step: {
    en: "No tech jargon needed! I am Shanthapriya Silva. Feel free to send a voice note, message, or request a call. I am here to help you like a friend.",
    siText: "යාළුවේ, ඔයාට තාක්ෂණය නොතේරුණාට කමක් නෑ. මම ශාන්තප්‍රිය සිල්වා. මට කෙළින්ම කතා කරන්න. සහෝදරයෙක් වගේ මම ඔයාගේ ප්‍රශ්න අහගෙන ඉන්නවා.",
    siPhonetic: "Yaluwe, oyata thakshanaya notherunata kamak nae. Mama Shanthapriya Silva. Mata kelinma katha karanna. Sahodaroyek wage mama oyage prashna ahagena innawa."
  },
  plan_ready: {
    en: "Congratulations! Your project plan is customized with total care. Tap below to send it directly to my WhatsApp!",
    siText: "සුබ පැතුම්! ඔබගේ ව්‍යාපෘති සැලැස්ම සූදානම්. දැන්ම මගේ WhatsApp එකට යවා නොමිලේ සාකච්ඡා කරමු!",
    siPhonetic: "Suba pathum! Obage vyapaara salasama soodaanam. Danma mage WhatsApp ekata yawa nomile saakachcha karamu!"
  }
};

type ReceptionistStage = 
  | 'map_selection'
  | 'root_situations'
  // Branch 1: Starter
  | 'starter_sub'
  | 'starter_final'
  // Branch 2: Growth
  | 'growth_sub'
  | 'growth_final'
  // Branch 3: Demos
  | 'demos_grid'
  // Branch 4: Pricing
  | 'pricing_sub'
  | 'pricing_final'
  // Branch 5: Human Support
  | 'human_sub'
  | 'callback_success'
  // Real AI Assistant Stage
  | 'ai_proposal';

export const VirtualCyberReceptionist: React.FC = () => {
  const navigate = useNavigate();

  // Navigation & Language
  const [hasInteracted, setHasInteracted] = useState(false);
  const [stage, setStage] = useState<ReceptionistStage>('map_selection');
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<'lk' | 'global' | null>(null);
  const [hoveredNode, setHoveredNode] = useState<'lk' | 'us' | 'uk' | 'ae' | 'au' | null>(null);
  const [language, setLanguage] = useState<'en' | 'si'>('en');
  const [voiceMuted, setVoiceMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);


  // Real AI Proposal Brain State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiProposal, setAiProposal] = useState<AIProposalResponse | null>(null);
  const [isListening, setIsListening] = useState(false);

  // Selected details across funnels
  const [selectedItemTitle, setSelectedItemTitle] = useState<string>('');
  const [selectedItemDesc, setSelectedItemDesc] = useState<string>('');
  const [selectedItemPrice, setSelectedItemPrice] = useState<string>('');
  const [callbackName, setCallbackName] = useState<string>('');
  const [callbackPhone, setCallbackPhone] = useState<string>('');
  const [callbackNote, setCallbackNote] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Speech Synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Universal Bulletproof Voice Narration
  const speakScript = (key: keyof typeof VOICE_SCRIPTS, lang: 'en' | 'si') => {
    if (voiceMuted || !synthRef.current) return;
    const script = VOICE_SCRIPTS[key];
    if (!script) return;

    try {
      synthRef.current.cancel();
    } catch (e) {}

    setTimeout(() => {
      if (!synthRef.current || voiceMuted) return;

      try {
        const voices = synthRef.current.getVoices();
        let utterance: SpeechSynthesisUtterance;

        if (lang === 'si') {
          const nativeSiVoice = voices.find(v => 
            v.lang.toLowerCase().startsWith('si') || 
            v.name.toLowerCase().includes('sinhala')
          );

          if (nativeSiVoice) {
            utterance = new SpeechSynthesisUtterance(script.siText);
            utterance.voice = nativeSiVoice;
            utterance.lang = nativeSiVoice.lang;
            utterance.rate = 0.95;
            utterance.pitch = 1.0;
          } else {
            utterance = new SpeechSynthesisUtterance(script.siPhonetic);
            utterance.lang = 'en-IN';
            utterance.rate = 0.92;
            utterance.pitch = 1.05;

            const southAsianVoice = voices.find(v => 
              v.lang.includes('en-IN') || 
              v.name.toLowerCase().includes('india') || 
              v.name.toLowerCase().includes('hindi') || 
              v.name.toLowerCase().includes('ravi') || 
              v.name.toLowerCase().includes('heera') ||
              v.name.toLowerCase().includes('google') ||
              v.name.toLowerCase().includes('natural')
            );
            if (southAsianVoice) {
              utterance.voice = southAsianVoice;
            }
          }
        } else {
          utterance = new SpeechSynthesisUtterance(script.en);
          utterance.lang = 'en-US';
          utterance.rate = 1.0;
          utterance.pitch = 1.0;

          const enVoice = voices.find(v => 
            v.name.includes('Google') || 
            v.name.includes('Natural') || 
            v.name.includes('Daniel') || 
            v.name.includes('Samantha') || 
            v.lang === 'en-US'
          );
          if (enVoice) utterance.voice = enVoice;
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        synthRef.current.speak(utterance);
      } catch (err) {
        setIsSpeaking(false);
      }
    }, 60);
  };

  // Initial Map Arrival Audio
  useEffect(() => {
    const timer = setTimeout(() => {
      if (stage === 'map_selection' && !hasInteracted && !voiceMuted) {
        speakScript('map_prompt', 'en');
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [stage, hasInteracted, voiceMuted]);

  // Handle Location Selection
  const handleSelectLocation = (region: 'lk' | 'global') => {
    playHoloSound('chime');
    setHasInteracted(true);
    setSelectedRegion(region);

    const chosenLang = region === 'lk' ? 'si' : 'en';
    setLanguage(chosenLang);
    setStage('root_situations');

    if (synthRef.current) {
      try { synthRef.current.cancel(); } catch (e) {}
    }

    setTimeout(() => {
      speakScript('welcome', chosenLang);
    }, 250);
  };

  // Toggle Language
  const toggleLanguage = () => {
    playHoloSound('beep');
    const nextLang = language === 'en' ? 'si' : 'en';
    setLanguage(nextLang);

    if (stage === 'root_situations') {
      speakScript('welcome', nextLang);
    }
  };

  // Toggle Voice Mute
  const toggleVoice = () => {
    if (!voiceMuted) {
      if (synthRef.current) synthRef.current.cancel();
      setIsSpeaking(false);
      setVoiceMuted(true);
    } else {
      setVoiceMuted(false);
      playHoloSound('beep');
      speakScript('welcome', language);
    }
  };

  // Speak dynamic AI text
  const speakRawText = (text: string, lang: 'en' | 'si') => {
    if (voiceMuted || !synthRef.current || !text) return;
    try {
      synthRef.current.cancel();
    } catch (e) {}

    setTimeout(() => {
      if (!synthRef.current || voiceMuted) return;
      try {
        const voices = synthRef.current.getVoices();
        const utterance = new SpeechSynthesisUtterance(text);
        if (lang === 'si') {
          const nativeSiVoice = voices.find(v => 
            v.lang.toLowerCase().startsWith('si') || 
            v.name.toLowerCase().includes('sinhala')
          );
          if (nativeSiVoice) {
            utterance.voice = nativeSiVoice;
            utterance.lang = nativeSiVoice.lang;
          } else {
            utterance.lang = 'en-IN';
          }
        } else {
          utterance.lang = 'en-US';
          const enVoice = voices.find(v => 
            v.name.includes('Google') || 
            v.name.includes('Natural') || 
            v.name.includes('Daniel') || 
            v.lang === 'en-US'
          );
          if (enVoice) utterance.voice = enVoice;
        }
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        synthRef.current.speak(utterance);
      } catch (err) {
        setIsSpeaking(false);
      }
    }, 60);
  };

  // AI Proposal Submission Handler
  const handleAskAI = async (overridePrompt?: string) => {
    const query = (overridePrompt ?? aiPrompt).trim();
    if (!query) return;

    playHoloSound('chime');
    setAiLoading(true);
    setStage('ai_proposal');

    try {
      const res = await fetch('/api/ai/proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          language,
          region: selectedRegion || 'lk'
        })
      });

      const data = await res.json();
      if (data.success && data.proposal) {
        setAiProposal(data.proposal);
        playHoloSound('success');
        if (data.proposal.spokenAudioScript) {
          speakRawText(data.proposal.spokenAudioScript, language);
        }
      }
    } catch (err) {
      console.warn('AI Proposal fetch error, falling back locally', err);
    } finally {
      setAiLoading(false);
    }
  };

  // Voice Input Toggle (Web Speech API)
  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(language === 'si' ? 'ඔබගේ Browser එකේ Voice Input පහසුකම නොමැත. කරුණාකර Type කරන්න.' : 'Voice recognition is not supported in this browser. Please type your requirement.');
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'si' ? 'si-LK' : 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        playHoloSound('beep');
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setAiPrompt(transcript);
          handleAskAI(transcript);
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  // Reset to Situations Root
  const handleReset = () => {
    playHoloSound('beep');
    setStage('root_situations');
    setSelectedItemTitle('');
    setSelectedItemDesc('');
    setSelectedItemPrice('');
    speakScript('welcome', language);
  };

  // Save Callback Request to Firestore
  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackName.trim() || !callbackPhone.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'inquiries'), {
        name: callbackName,
        phone: callbackPhone,
        notes: callbackNote || 'Virtual Cyber Reception Direct Callback Request',
        source: 'cyber_reception_human_help',
        createdAt: serverTimestamp(),
      });
      playHoloSound('success');
      setStage('callback_success');
    } catch (err) {
      console.warn('Inquiry submit error:', err);
      // Even if Firestore is restricted, give the client the direct WhatsApp link
      playHoloSound('success');
      setStage('callback_success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCustomWhatsAppUrl = (topic: string, details: string, price: string = '') => {
    const lines = [
      `*Hi Ravana Tech (Founder Shanthapriya Silva),*`,
      `I am reaching out via your Virtual Cyber Reception:`,
      `• *My Goal/Situation:* ${topic}`,
      `• *Selected Path:* ${details}`,
      price ? `• *Estimated Budget Tier:* ${price}` : '',
      `• *Direct WhatsApp Line:* +94 78 847 0610`,
      ``,
      `Can we have a friendly conversation to get started?`
    ].filter(Boolean);

    return `https://wa.me/94788470610?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  // Minimized Cyber Assistant Badge
  if (isMinimized) {
    return (
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex items-center gap-3">
        <button
          onClick={() => {
            playHoloSound('chime');
            setIsMinimized(false);
          }}
          className="group flex items-center gap-3 px-4 py-3 rounded-2xl bg-stone-950/95 border-2 border-amber-500/50 shadow-2xl text-stone-100 hover:border-amber-400 hover:scale-105 transition-all cursor-pointer backdrop-blur-xl"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-amber-400 bg-stone-900 shrink-0">
            <img src={founderAvatarImg} alt="Founder Avatar" className="w-full h-full object-cover object-top animate-avatar-breathe" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-stone-950 animate-pulse" />
          </div>
          <div className="text-left">
            <span className="text-[10px] font-bold text-amber-400 tracking-wider uppercase flex items-center gap-1">
              Virtual Guide Active <Sparkles className="w-3 h-3 text-amber-300" />
            </span>
            <span className="text-xs font-semibold text-stone-200 group-hover:text-amber-300 transition-colors">
              Click to Re-open Guided Help
            </span>
          </div>
          <Maximize2 className="w-4 h-4 text-stone-400 group-hover:text-amber-400 ml-1" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-950/95 backdrop-blur-2xl overflow-y-auto animate-in fade-in duration-300">
      
      {/* BACKGROUND HOLOGRAM GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(#amber-500/10_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* CONTAINER */}
      <div className="relative w-full max-w-4xl bg-stone-900/90 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto backdrop-blur-xl">
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-stone-950/80 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Ravana Tech • Friendly Guided Reception
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>{language === 'en' ? 'සිංහල' : 'English'}</span>
            </button>

            <button
              onClick={toggleVoice}
              title={voiceMuted ? "Unmute Voice" : "Mute Voice"}
              className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                voiceMuted ? 'bg-rose-500/15 border-rose-500/30 text-rose-400' : 'bg-stone-800 border-stone-700 text-amber-400'
              }`}
            >
              {voiceMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />}
            </button>

            <button
              onClick={() => {
                playHoloSound('beep');
                setIsMinimized(true);
              }}
              title="Minimize to browse site"
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 border border-stone-700 transition-colors cursor-pointer"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STAGE 0: WORLD MAP LOCATION RADAR */}
        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* STAGE 0: HIGH-TECH CYBER-SPATIAL LOCATION RADAR MAP */}
        {/* ========================================================================= */}
        {stage === 'map_selection' && (
          <div className="p-4 sm:p-8 text-center space-y-5 animate-in zoom-in-95 duration-400">
            {/* Header */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'si' ? 'ගෝලීය ස්ථාන රේඩාර් පද්ධතිය' : 'Global Spatial Radar & Tech Hubs'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-stone-100 tracking-tight">
                {language === 'si' ? 'ඔබගේ කලාපය තෝරා වෙබ් අඩවියට පිවිසෙන්න' : 'Calibrate Your Location to Enter'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto">
                {language === 'si'
                  ? 'ශ්‍රී ලංකාව හෝ ලෝකයේ ඕනෑම රටක සිටින ඔබ සඳහා නිවැරදි භාෂාව සහ මුදල් වර්ගය ස්වයංක්‍රීයව සකස් වේ.'
                  : 'Select your region below. We calibrate local currency, language, and deployment architecture automatically.'}
              </p>
            </div>

            {/* RADAR MAP CONTAINER */}
            <div className="relative max-w-3xl mx-auto rounded-3xl bg-stone-950/95 border border-stone-800 p-2 sm:p-4 shadow-2xl overflow-hidden group">
              {/* Tactical Top Bar */}
              <div className="flex items-center justify-between px-3 py-1.5 mb-2 border-b border-stone-800/80 text-[10px] font-mono text-stone-400">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 font-bold">RADAR ACTIVE</span>
                  <span className="text-stone-600 hidden sm:inline">|</span>
                  <span className="text-stone-400 hidden sm:inline">HQ: COLOMBO (06°55'N, 79°50'E)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-amber-400/80 hidden sm:inline">GLOBAL LATENCY: &lt;18ms</span>
                  <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300">
                    {hoveredNode === 'lk'
                      ? '🇱🇰 SRI LANKA HQ'
                      : hoveredNode === 'us'
                      ? '🇺🇸 NORTH AMERICA'
                      : hoveredNode === 'uk'
                      ? '🇬🇧 UK & EUROPE'
                      : hoveredNode === 'ae'
                      ? '🇦🇪 DUBAI / GCC'
                      : hoveredNode === 'au'
                      ? '🇦🇺 ASIA-PACIFIC'
                      : 'ALL NODES READY'}
                  </span>
                </div>
              </div>

              {/* SVG Holographic Interactive Map */}
              <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden bg-gradient-to-b from-stone-950 via-[#070b12] to-stone-950 border border-stone-800/60 shadow-inner">
                <svg
                  viewBox="0 0 1000 500"
                  className="w-full h-full select-none"
                >
                  <defs>
                    {/* Glowing Filters */}
                    <filter id="glowEmerald" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <filter id="glowAmber" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <filter id="glowSky" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>

                    {/* Arc Gradients */}
                    <linearGradient id="arcLkUs" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="arcLkUk" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#818cf8" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="arcLkAe" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="arcLkAu" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.8" />
                    </linearGradient>

                    {/* Radar Sweep Gradient */}
                    <radialGradient id="radarSweepGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                      <stop offset="70%" stopColor="#059669" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#047857" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* 1. CYBERNETIC GRID LINES */}
                  <g className="opacity-15 stroke-stone-600" strokeWidth="1" strokeDasharray="3 4">
                    <line x1="0" y1="125" x2="1000" y2="125" />
                    <line x1="0" y1="250" x2="1000" y2="250" strokeWidth="1.5" className="stroke-amber-400/40" />
                    <line x1="0" y1="375" x2="1000" y2="375" />
                    <line x1="160" y1="0" x2="160" y2="500" />
                    <line x1="320" y1="0" x2="320" y2="500" />
                    <line x1="480" y1="0" x2="480" y2="500" />
                    <line x1="640" y1="0" x2="640" y2="500" strokeWidth="1.5" className="stroke-emerald-400/30" />
                    <line x1="800" y1="0" x2="800" y2="500" />
                  </g>

                  {/* 2. REALISTIC WORLD CONTINENT SILHOUETTES */}
                  <g className="fill-stone-800/80 stroke-stone-700/60 transition-colors" strokeWidth="1">
                    {/* North America */}
                    <path d="M 60,65 L 120,45 L 210,40 L 310,55 L 305,120 L 260,135 L 285,190 L 250,225 L 210,215 L 175,245 L 155,290 L 135,275 L 150,225 L 115,185 L 70,140 L 45,95 Z" />
                    {/* Greenland */}
                    <path d="M 330,35 L 385,30 L 405,70 L 360,90 Z" />
                    {/* South America */}
                    <path d="M 235,260 L 285,255 L 335,295 L 345,340 L 305,420 L 270,455 L 255,420 L 240,335 L 215,285 Z" />
                    {/* Europe & UK */}
                    <path d="M 455,75 L 530,65 L 545,115 L 505,130 L 485,170 L 440,165 L 435,130 L 460,110 Z" />
                    <path d="M 432,110 L 448,105 L 443,130 L 428,125 Z" />
                    {/* Africa */}
                    <path d="M 450,185 L 540,180 L 595,245 L 550,330 L 525,410 L 485,390 L 450,310 L 420,250 L 435,200 Z" />
                    <path d="M 570,320 L 585,325 L 580,365 L 565,355 Z" />
                    {/* Eurasia & Asia */}
                    <path d="M 545,65 L 680,50 L 830,65 L 890,105 L 880,180 L 810,195 L 780,240 L 740,290 L 710,285 L 720,240 L 690,205 L 620,185 L 565,160 L 540,115 Z" />
                    {/* India */}
                    <path d="M 610,195 L 670,205 L 652,270 L 626,275 L 602,230 Z" />
                    {/* Australia & NZ */}
                    <path d="M 770,350 L 860,340 L 890,380 L 870,440 L 795,435 L 765,395 Z" />
                    <path d="M 900,430 L 915,435 L 905,465 L 895,455 Z" />
                    {/* Japan & East Indies */}
                    <path d="M 870,160 L 885,175 L 875,205 L 860,190 Z" />
                    <path d="M 720,295 L 755,305 L 780,330 L 740,330 Z" />
                  </g>

                  {/* 3. RADAR SONAR CIRCLES AROUND COLOMBO (640, 285) */}
                  <g className="pointer-events-none opacity-40">
                    <circle cx="640" cy="285" r="45" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="2 3" />
                    <circle cx="640" cy="285" r="110" fill="none" stroke="#10b981" strokeWidth="0.8" strokeDasharray="3 4" />
                    <circle cx="640" cy="285" r="190" fill="none" stroke="#10b981" strokeWidth="0.6" strokeDasharray="4 5" />
                    <circle cx="640" cy="285" r="290" fill="none" stroke="#10b981" strokeWidth="0.5" strokeDasharray="5 6" />
                    <circle cx="640" cy="285" r="410" fill="none" stroke="#10b981" strokeWidth="0.4" strokeDasharray="6 8" />

                    {/* Crosshair Tactical Reticle */}
                    <line x1="640" y1="230" x2="640" y2="340" stroke="#10b981" strokeWidth="1" opacity="0.6" />
                    <line x1="585" y1="285" x2="695" y2="285" stroke="#10b981" strokeWidth="1" opacity="0.6" />
                  </g>

                  {/* 4. ROTATING RADAR SWEEPER BEAM */}
                  <g className="pointer-events-none animate-radar-sweep" style={{ transformOrigin: '640px 285px' }}>
                    <path
                      d="M 640 285 L 340 85 A 360 360 0 0 1 640 -75 Z"
                      fill="url(#radarSweepGrad)"
                    />
                    <line x1="640" y1="285" x2="340" y2="85" stroke="#34d399" strokeWidth="1.5" opacity="0.7" />
                  </g>

                  {/* 5. GLOWING GLOBAL DATA ARCS (COLOMBO -> WORLD) */}
                  <g className="fill-none pointer-events-none">
                    {/* Sri Lanka -> North America */}
                    <path
                      d="M 640 285 Q 430 110 240 185"
                      stroke="url(#arcLkUs)"
                      strokeWidth={hoveredNode === 'us' ? '2.5' : '1.5'}
                      className="animate-arc-dash"
                      opacity={hoveredNode === 'us' ? '1' : '0.7'}
                    />
                    {/* Sri Lanka -> UK & Europe */}
                    <path
                      d="M 640 285 Q 540 140 455 125"
                      stroke="url(#arcLkUk)"
                      strokeWidth={hoveredNode === 'uk' ? '2.5' : '1.5'}
                      className="animate-arc-dash"
                      opacity={hoveredNode === 'uk' ? '1' : '0.7'}
                    />
                    {/* Sri Lanka -> Dubai / Middle East */}
                    <path
                      d="M 640 285 Q 615 235 575 210"
                      stroke="url(#arcLkAe)"
                      strokeWidth={hoveredNode === 'ae' ? '2.5' : '1.5'}
                      className="animate-arc-dash"
                      opacity={hoveredNode === 'ae' ? '1' : '0.7'}
                    />
                    {/* Sri Lanka -> Australia */}
                    <path
                      d="M 640 285 Q 755 365 830 385"
                      stroke="url(#arcLkAu)"
                      strokeWidth={hoveredNode === 'au' ? '2.5' : '1.5'}
                      className="animate-arc-dash"
                      opacity={hoveredNode === 'au' ? '1' : '0.7'}
                    />
                  </g>

                  {/* 6. SRI LANKA JEWEL ISLAND (PROMINENT GLOWING SHAPE) */}
                  <g
                    onClick={() => handleSelectLocation('lk')}
                    onMouseEnter={() => setHoveredNode('lk')}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer group/sl"
                  >
                    <ellipse cx="640" cy="285" rx="20" ry="20" fill="#10b981" opacity="0.15" className="animate-ping" />
                    {/* Detailed teardrop jewel island */}
                    <path
                      d="M 640,277 C 645,282 646,290 641,296 C 636,293 636,284 640,277 Z"
                      fill="#10b981"
                      stroke="#34d399"
                      strokeWidth="2"
                      filter="url(#glowEmerald)"
                      className="transition-transform group-hover/sl:scale-125"
                      style={{ transformOrigin: '640px 285px' }}
                    />
                    <circle cx="640" cy="285" r="4" fill="#ffffff" />
                  </g>

                  {/* 7. GLOBAL NODES (CLICKABLE & HOVERABLE) */}
                  {/* USA / Silicon Valley / NYC */}
                  <g
                    onClick={() => handleSelectLocation('global')}
                    onMouseEnter={() => setHoveredNode('us')}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer group/us"
                  >
                    <circle cx="240" cy="185" r="14" fill="#38bdf8" opacity="0.2" className="animate-ping" />
                    <circle cx="240" cy="185" r="5" fill="#38bdf8" stroke="#0c4a6e" strokeWidth="2" filter="url(#glowSky)" />
                    <circle cx="240" cy="185" r="2" fill="#ffffff" />
                  </g>

                  {/* UK / London / Europe */}
                  <g
                    onClick={() => handleSelectLocation('global')}
                    onMouseEnter={() => setHoveredNode('uk')}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer group/uk"
                  >
                    <circle cx="455" cy="125" r="14" fill="#818cf8" opacity="0.2" className="animate-ping" />
                    <circle cx="455" cy="125" r="5" fill="#818cf8" stroke="#312e81" strokeWidth="2" filter="url(#glowSky)" />
                    <circle cx="455" cy="125" r="2" fill="#ffffff" />
                  </g>

                  {/* Dubai / GCC */}
                  <g
                    onClick={() => handleSelectLocation('global')}
                    onMouseEnter={() => setHoveredNode('ae')}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer group/ae"
                  >
                    <circle cx="575" cy="210" r="12" fill="#fbbf24" opacity="0.2" className="animate-ping" />
                    <circle cx="575" cy="210" r="4.5" fill="#fbbf24" stroke="#78350f" strokeWidth="2" filter="url(#glowAmber)" />
                    <circle cx="575" cy="210" r="1.5" fill="#ffffff" />
                  </g>

                  {/* Australia / Sydney */}
                  <g
                    onClick={() => handleSelectLocation('global')}
                    onMouseEnter={() => setHoveredNode('au')}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer group/au"
                  >
                    <circle cx="830" cy="385" r="12" fill="#22d3ee" opacity="0.2" className="animate-ping" />
                    <circle cx="830" cy="385" r="4.5" fill="#22d3ee" stroke="#164e63" strokeWidth="2" filter="url(#glowSky)" />
                    <circle cx="830" cy="385" r="1.5" fill="#ffffff" />
                  </g>
                </svg>

                {/* OVERLAY TACTICAL BEACONS WITH LABELS */}
                {/* 1. SRI LANKA BEACON */}
                <button
                  type="button"
                  onClick={() => handleSelectLocation('lk')}
                  onMouseEnter={() => setHoveredNode('lk')}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="absolute left-[64%] top-[57%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
                >
                  <div className="flex flex-col items-center">
                    <span className="relative flex h-6 w-6 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-stone-950 shadow-xl group-hover:scale-125 transition-transform" />
                    </span>
                    <span className="px-2.5 py-0.5 mt-1 rounded-md bg-emerald-500 text-stone-950 font-extrabold text-[10px] whitespace-nowrap shadow-xl border border-emerald-300/50 group-hover:scale-105 transition-transform">
                      {language === 'si' ? '🇱🇰 ශ්‍රී ලංකාව (HQ Lab)' : '🇱🇰 Sri Lanka (HQ Lab)'}
                    </span>
                  </div>
                </button>

                {/* 2. USA / AMERICAS BEACON */}
                <button
                  type="button"
                  onClick={() => handleSelectLocation('global')}
                  onMouseEnter={() => setHoveredNode('us')}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="absolute left-[24%] top-[37%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
                >
                  <div className="flex flex-col items-center">
                    <span className="relative flex h-5 w-5 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-60" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-400 border border-stone-950 shadow-lg group-hover:scale-125 transition-transform" />
                    </span>
                    <span className="px-2 py-0.5 mt-0.5 rounded bg-stone-900/90 border border-sky-400/60 text-sky-300 font-bold text-[9px] whitespace-nowrap shadow-md group-hover:bg-sky-500/20 transition-colors">
                      🇺🇸 USA / Americas
                    </span>
                  </div>
                </button>

                {/* 3. UK & EUROPE BEACON */}
                <button
                  type="button"
                  onClick={() => handleSelectLocation('global')}
                  onMouseEnter={() => setHoveredNode('uk')}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="absolute left-[45.5%] top-[25%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
                >
                  <div className="flex flex-col items-center">
                    <span className="relative flex h-5 w-5 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-60" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-400 border border-stone-950 shadow-lg group-hover:scale-125 transition-transform" />
                    </span>
                    <span className="px-2 py-0.5 mt-0.5 rounded bg-stone-900/90 border border-indigo-400/60 text-indigo-300 font-bold text-[9px] whitespace-nowrap shadow-md group-hover:bg-indigo-500/20 transition-colors">
                      🇬🇧 UK / Europe
                    </span>
                  </div>
                </button>

                {/* 4. DUBAI / MIDDLE EAST BEACON */}
                <button
                  type="button"
                  onClick={() => handleSelectLocation('global')}
                  onMouseEnter={() => setHoveredNode('ae')}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="absolute left-[57.5%] top-[42%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none hidden sm:block"
                >
                  <div className="flex flex-col items-center">
                    <span className="relative flex h-4 w-4 items-center justify-center">
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400 border border-stone-950 shadow-lg group-hover:scale-125 transition-transform" />
                    </span>
                    <span className="px-1.5 py-0.5 mt-0.5 rounded bg-stone-900/90 border border-amber-400/50 text-amber-300 font-bold text-[8px] whitespace-nowrap shadow-md">
                      🇦🇪 Dubai
                    </span>
                  </div>
                </button>

                {/* 5. AUSTRALIA & ASIA BEACON */}
                <button
                  type="button"
                  onClick={() => handleSelectLocation('global')}
                  onMouseEnter={() => setHoveredNode('au')}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="absolute left-[83%] top-[77%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none hidden sm:block"
                >
                  <div className="flex flex-col items-center">
                    <span className="relative flex h-4 w-4 items-center justify-center">
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 border border-stone-950 shadow-lg group-hover:scale-125 transition-transform" />
                    </span>
                    <span className="px-1.5 py-0.5 mt-0.5 rounded bg-stone-900/90 border border-cyan-400/50 text-cyan-300 font-bold text-[8px] whitespace-nowrap shadow-md">
                      🇦🇺 Sydney / APAC
                    </span>
                  </div>
                </button>

                {/* Tactical HUD Telemetry Footer (Inside Map) */}
                <div className="absolute bottom-2 left-2 right-2 px-3 py-1.5 rounded-xl bg-stone-950/85 border border-stone-800 backdrop-blur-md flex items-center justify-between text-[10px] font-mono text-stone-300">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">● TARGET:</span>
                    <span>
                      {hoveredNode === 'lk'
                        ? (language === 'si' ? 'ශ්‍රී ලංකා මූලස්ථානය (Local Tech Hub)' : 'Sri Lanka Tech Lab (Colombo HQ)')
                        : hoveredNode === 'us'
                        ? 'Americas / Silicon Valley (USD • Stripe)'
                        : hoveredNode === 'uk'
                        ? 'Europe & UK Hub (International Standard)'
                        : hoveredNode === 'ae'
                        ? 'Middle East / Dubai (VIP Portals & Real Estate)'
                        : hoveredNode === 'au'
                        ? 'Asia Pacific / Sydney (Global Edge CDN)'
                        : (language === 'si' ? 'තෝරාගැනීමට ස්ථානයක් Click කරන්න' : 'Click Any Node or Card Below to Launch')}
                    </span>
                  </div>
                  <span className="text-emerald-400 hidden sm:inline">100% SECURE DIRECT ROUTING</span>
                </div>
              </div>

              {/* TWO MASTER LAUNCHPAD ACTION CARDS */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {/* SRI LANKA CARD */}
                <button
                  type="button"
                  onClick={() => handleSelectLocation('lk')}
                  onMouseEnter={() => setHoveredNode('lk')}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-stone-900 to-emerald-950/40 hover:from-emerald-900/60 hover:to-emerald-900/40 border-2 border-emerald-500/50 hover:border-emerald-400 text-left transition-all group cursor-pointer flex items-center justify-between shadow-lg hover:scale-[1.01]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                      🇱🇰
                    </div>
                    <div>
                      <div className="font-extrabold text-sm sm:text-base text-stone-100 group-hover:text-emerald-300 flex items-center gap-2">
                        <span>{language === 'si' ? 'ශ්‍රී ලංකාව (Sri Lanka)' : 'Sri Lanka (Local Clients)'}</span>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/40 font-mono">
                          {language === 'si' ? 'සිංහල Auto' : 'LKR Pricing'}
                        </span>
                      </div>
                      <span className="text-xs text-stone-400 block mt-0.5">
                        {language === 'si'
                          ? 'ලංකාවේ ව්‍යාපාර සඳහා PayHere, WhatsApp ඇනවුම්, සහ සාධාරණ LKR මිල ගණන්'
                          : 'Local business platforms, PayHere gateway, WhatsApp cart & LKR packages'}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1.5 transition-transform shrink-0" />
                </button>

                {/* GLOBAL / INTERNATIONAL CARD */}
                <button
                  type="button"
                  onClick={() => handleSelectLocation('global')}
                  onMouseEnter={() => setHoveredNode('us')}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="p-4 rounded-2xl bg-gradient-to-r from-sky-950/50 via-stone-900 to-blue-950/40 hover:from-sky-900/50 hover:to-blue-900/40 border-2 border-sky-500/50 hover:border-sky-400 text-left transition-all group cursor-pointer flex items-center justify-between shadow-lg hover:scale-[1.01]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                      🌍
                    </div>
                    <div>
                      <div className="font-extrabold text-sm sm:text-base text-stone-100 group-hover:text-sky-300 flex items-center gap-2">
                        <span>{language === 'si' ? 'ජාත්‍යන්තර / පිටරට (Global)' : 'International / Global'}</span>
                        <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full border border-sky-500/40 font-mono">
                          English Auto
                        </span>
                      </div>
                      <span className="text-xs text-stone-400 block mt-0.5">
                        {language === 'si'
                          ? 'ලෝකයේ ඕනෑම රටකට Stripe, Global Exports, High-End Websites & USD Packages'
                          : 'High-authority global platforms, Stripe integration, exports & USD pricing'}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-sky-400 group-hover:translate-x-1.5 transition-transform shrink-0" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 1: 5 HUMAN-CENTERED ROOT SITUATIONS (Zero Jargon) */}
        {/* ========================================================================= */}
        {stage === 'root_situations' && (
          <div className="p-5 sm:p-8 space-y-6 animate-in fade-in duration-300">
            {/* CLEAN RECEPTION WELCOME HEADER */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-stone-950/70 border border-stone-800 shadow-xl">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-stone-100 flex items-center gap-2">
                    <span>{language === 'si' ? 'ඔබගේ ව්‍යාපාරික අවශ්‍යතාවය කුමක්ද?' : 'How Can Ravana Tech Help You Today?'}</span>
                  </h2>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {language === 'si'
                      ? 'පහත විකල්ප වලින් එකක් තෝරන්න හෝ ඔබේ අදහස AI Architect වෙත කෙළින්ම ලියන්න:'
                      : 'Choose your business goal below or consult our AI Architect directly:'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-xl bg-stone-900/90 border border-stone-800 text-stone-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {selectedRegion === 'lk' ? '🇱🇰 Sri Lanka HQ' : '🌍 Global Portal'}
                </span>
              </div>
            </div>

            {/* REAL AI CONVERSATIONAL ARCHITECT BAR */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-stone-900/90 to-sky-500/10 border border-amber-500/40 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {language === 'si' ? 'Founder AI Digital Twin එකෙන් කෙළින්ම අහන්න:' : 'Ask Founder Shanthapriya Silva (AI Digital Architect):'}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {language === 'si' ? 'Real-Time Gemini AI' : 'Powered by Gemini AI'}
                </span>
              </div>

              <div className="relative flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAskAI();
                    }}
                    placeholder={
                      language === 'si'
                        ? "ඔබේ ව්‍යාපාරය හෝ අදහස මෙතන ලියන්න (උදා: නුවරඑළියේ Fresh Strawberry & Jam Online Shop එකක්)..."
                        : "Describe your business (e.g. Dubai luxury real estate with 3D tours, London bakery, etc.)..."
                    }
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-stone-950 border border-stone-700 hover:border-amber-400 focus:border-amber-400 text-xs sm:text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={toggleListening}
                    title={isListening ? "Stop listening" : "Speak with your voice"}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                      isListening
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'text-stone-400 hover:text-amber-400'
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleAskAI()}
                  disabled={aiLoading || !aiPrompt.trim()}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold text-xs sm:text-sm flex items-center gap-1.5 shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                  {aiLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">
                    {language === 'si' ? 'සැලැස්ම හදන්න' : 'Generate Plan'}
                  </span>
                </button>
              </div>

              {/* QUICK PROMPT CHIPS */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
                <span className="text-stone-500 shrink-0">
                  {language === 'si' ? 'උදාහරණ:' : 'Examples:'}
                </span>
                {(language === 'si'
                  ? [
                      'Fresh Strawberry & Jam Online Shop',
                      'Luxury Salon & Hair Appointments',
                      'Real Estate ඉඩම් & නිවාස Showcase',
                      'Bakery & Cafe WhatsApp Ordering'
                    ]
                  : [
                      'Dubai luxury real estate with 3D tours',
                      'London specialty coffee & bakery ordering',
                      'Salon & clinic online slot booking',
                      'E-commerce store with international Stripe'
                    ]
                ).map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setAiPrompt(chip);
                      handleAskAI(chip);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-stone-900/90 hover:bg-amber-500/20 text-stone-300 hover:text-amber-300 border border-stone-800 hover:border-amber-500/40 whitespace-nowrap transition-colors cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* THE 5 ZERO-OVERTHINKING HUMAN PATHS */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  {language === 'si' ? 'හෝ පහත අංක 5න් එකක් තෝරන්න:' : 'Or Select from the 5 Guided Options Below:'}
                </span>
                <span className="text-[11px] text-stone-500 font-mono">100% Free Consultation</span>
              </div>

              {/* Option 1: Starter / New Idea */}
              <button
                onClick={() => {
                  playHoloSound('beep');
                  setStage('starter_sub');
                  speakScript('starter_step', language);
                }}
                className="w-full p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-stone-900 to-stone-900 hover:from-amber-500/25 hover:border-amber-400 border border-amber-500/30 text-left transition-all group cursor-pointer flex items-center gap-4 hover:translate-x-1"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-extrabold text-lg shrink-0">
                  1
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-sm sm:text-base text-stone-100 group-hover:text-amber-300 flex items-center gap-2">
                    <span>{language === 'si' ? '🌱 මට අලුත් ව්‍යාපාරයක් හෝ අදහසක් තියෙනවා — මුල සිට සරලව පටන් ගන්න ඕනේ' : '🌱 I am starting a new business or idea — Guide me from scratch'}</span>
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {language === 'si' ? 'තාක්ෂණික දැනුම නැතත් කිසිම බයක් නෑ. අපි ඔබව අතින් අල්ලාගෙන මුල සිටම මඟ පෙන්වනවා.' : 'Zero tech knowledge required. We build and guide you through every step.'}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>

              {/* Option 2: Existing Shop / Business Sales */}
              <button
                onClick={() => {
                  playHoloSound('beep');
                  setStage('growth_sub');
                  speakScript('growth_step', language);
                }}
                className="w-full p-4 rounded-2xl bg-stone-900/80 hover:bg-stone-850 hover:border-sky-500/50 border border-stone-800 text-left transition-all group cursor-pointer flex items-center gap-4 hover:translate-x-1"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-400 flex items-center justify-center font-extrabold text-lg shrink-0">
                  2
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-sm sm:text-base text-stone-100 group-hover:text-sky-300">
                    {language === 'si' ? '🚀 මට දැනටමත් Shop එකක් / Business එකක් තියෙනවා — Sales & Customers වැඩි කරගන්න ඕනේ' : '🚀 I have an existing business — I want more customers & online orders'}
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {language === 'si' ? 'Facebook, Google සහ WhatsApp හරහා වැඩිපුර Orders සහ Clients ගෙන්වා ගැනීමට.' : 'Drive Google, Facebook, and WhatsApp traffic into real paying clients.'}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-sky-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>

              {/* Option 3: Real Working Demos */}
              <button
                onClick={() => {
                  playHoloSound('beep');
                  setStage('demos_grid');
                  speakScript('demos_step', language);
                }}
                className="w-full p-4 rounded-2xl bg-stone-900/80 hover:bg-stone-850 hover:border-emerald-500/50 border border-stone-800 text-left transition-all group cursor-pointer flex items-center gap-4 hover:translate-x-1"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-extrabold text-lg shrink-0">
                  3
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-sm sm:text-base text-stone-100 group-hover:text-emerald-300 flex items-center gap-2">
                    <span>{language === 'si' ? '🎮 වැඩ කරන සැබෑ Websites මගේ Phone එකෙන්ම බලන්න ඕනේ' : '🎮 Test Real Working Sample Websites on My Phone'}</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono hidden sm:inline">5 Live Demos</span>
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {language === 'si' ? 'Bakery, Cafe, Salon, Plant Shop, Real Estate සජීවීව Click කරලා අත්හදා බලන්න.' : 'Interactive Bakery Cake builder, Cafe menus, Salon slots, Plant shop.'}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>

              {/* Option 4: Transparent Honest Pricing */}
              <button
                onClick={() => {
                  playHoloSound('beep');
                  setStage('pricing_sub');
                  speakScript('pricing_step', language);
                }}
                className="w-full p-4 rounded-2xl bg-stone-900/80 hover:bg-stone-850 hover:border-purple-500/50 border border-stone-800 text-left transition-all group cursor-pointer flex items-center gap-4 hover:translate-x-1"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center font-extrabold text-lg shrink-0">
                  4
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-sm sm:text-base text-stone-100 group-hover:text-purple-300">
                    {language === 'si' ? '💰 ගණන් හිලව් කොහොමද? මගේ Budget එකට ගැළපෙන පැකේජ් එකක් දැනගන්න ඕනේ' : '💰 Honest Pricing & Budget Calculator — No Hidden Fees'}
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {language === 'si' ? 'කිසිම හංගපු ගාස්තු නෑ. Domain, Hosting, Design සියල්ල සමඟ සාධාරණ මිල ගණන්.' : 'Clear pricing tiers with free domain, hosting, and zero surprise fees.'}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-purple-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>

              {/* Option 5: Direct Human Support */}
              <button
                onClick={() => {
                  playHoloSound('beep');
                  setStage('human_sub');
                  speakScript('human_step', language);
                }}
                className="w-full p-4 rounded-2xl bg-gradient-to-r from-emerald-600/20 via-stone-900 to-stone-900 hover:from-emerald-600/30 hover:border-emerald-400 border border-emerald-500/40 text-left transition-all group cursor-pointer flex items-center gap-4 hover:translate-x-1"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-extrabold text-lg shrink-0">
                  5
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-sm sm:text-base text-emerald-300 flex items-center gap-2">
                    <HeartHandshake className="w-4 h-4" />
                    <span>{language === 'si' ? '🤝 මට තාක්ෂණික දේවල් තේරෙන්නේ නෑ — මට කෙළින්ම මනුස්සයෙක් එක්ක කතා කරන්න ඕනේ!' : '🤝 I don\'t know tech — I just want to speak with a helpful human friend!'}</span>
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {language === 'si' ? 'සහෝදරයෙක් වගේ මට කෙළින්ම කතා කරන්න. මම ශාන්තප්‍රිය සිල්වා (+94 78 847 0610).' : 'Speak directly with founder Shanthapriya Silva. No bots, pure human guidance.'}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 text-center border-t border-stone-800 flex items-center justify-between">
              <button
                onClick={() => setStage('map_selection')}
                className="text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{language === 'si' ? 'රට නැවත තෝරන්න' : 'Change Location'}</span>
              </button>

              <button
                onClick={() => {
                  playHoloSound('beep');
                  setIsMinimized(true);
                }}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 underline cursor-pointer"
              >
                {language === 'si' ? 'සාමාන්‍ය වෙබ් අඩවිය බලන්න (Browse Full Site)' : 'Explore Traditional Website'}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BRANCH 1: STARTER / NEW BUSINESS (5 Sub-Options) */}
        {/* ========================================================================= */}
        {stage === 'starter_sub' && (
          <div className="p-5 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">Step 2 of 3 • New Idea / Starter</span>
                <h3 className="text-base sm:text-lg font-extrabold text-stone-100">
                  {language === 'si' ? 'ඔබ පටන් ගන්න බලාපොරොත්තු වන අංශය තෝරන්න:' : 'Select What Best Describes Your Starting Idea:'}
                </h3>
              </div>
              <button onClick={handleReset} className="text-xs text-stone-400 hover:text-stone-200 underline cursor-pointer">
                Back to 5 Options
              </button>
            </div>

            <div className="space-y-2.5">
              {[
                { id: '1', title: '1. සරලව තමන් ගැන සහ සේවාවන් පෙන්වන 1-Page Site එකක්', en: '1. Clean 1-Page Starter Portfolio or Business Profile', desc: 'පුංචියට, ලස්සනට පටන් ගන්න අයට.', descEn: 'For entrepreneurs wanting a fast, clean digital presence.', badge: '100% නොමිලේ මඟ පෙන්වීම', badgeEn: '100% Free Guidance' },
                { id: '2', title: '2. Phone එකෙන් Orders ගන්න පුංචි WhatsApp Online Shop එකක්', en: '2. Mobile WhatsApp Ordering Mini-Store', desc: 'කේක්, ඇඳුම්, පැල, බඩු විකුණන්න.', descEn: 'Sell food, apparel, plants, and products directly.', badge: 'නොමිලේ අදහස් & සැලැස්ම', badgeEn: 'Free Strategy Plan' },
                { id: '3', title: '3. Salon, Classes, හෝ Repair සේවාවක් සඳහා Appointments ගන්න', en: '3. Service Appointments & Time Slot Booking', desc: 'පාරිභෝගිකයින්ට දින වෙන් කරගැනීමට.', descEn: 'Effortless 24/7 calendar booking for clients.', badge: 'පහසු Booking උපදෙස්', badgeEn: 'Zero-Risk Advice' },
                { id: '4', title: '4. මට මොකක්ද ඕනේ කියලා තාම හිතාගන්න බෑ — අදහස් සහ උපදෙස් ඕනේ', en: '4. I am not sure yet — I need ideas & honest advice', desc: 'අදහසක් නැති අයට මුල සිට සුහදව මඟ පෙන්වීම.', descEn: 'Unsure where to start? We guide you step-by-step.', badge: '100% නොමිලේ උපදෙස්', badgeEn: '100% Free Advice' },
                { id: '5', title: '5. කිසිම වියදමක් නැතිව Founder සමඟ නොමිලේ සැලැස්මක් සාකච්ඡා කරමු', en: '5. Plan a Custom Idea Directly with Founder Shanthapriya', desc: 'ඔබේ අදහසට ගැළපෙනම නිවැරදි සැලැස්ම නොමිලේ.', descEn: 'Tailor a customized digital strategy with zero obligations.', badge: 'Founder සමඟ සුහද කතාබහක්', badgeEn: 'Friendly 1-on-1 Chat' },
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => {
                    playHoloSound('chime');
                    setSelectedItemTitle(language === 'si' ? sub.title : sub.en);
                    setSelectedItemDesc(language === 'si' ? sub.desc : sub.descEn);
                    setSelectedItemPrice(language === 'si' ? sub.badge : sub.badgeEn);
                    setStage('starter_final');
                    speakScript('plan_ready', language);
                  }}
                  className="w-full p-3.5 rounded-xl bg-stone-950/80 hover:bg-stone-900 border border-stone-800 hover:border-emerald-400 text-left transition-all group cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-stone-100 group-hover:text-emerald-300">
                      {language === 'si' ? sub.title : sub.en}
                    </div>
                    <span className="text-[11px] text-stone-400 mt-0.5 block">
                      {language === 'si' ? sub.desc : sub.descEn}
                    </span>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 block">
                      {language === 'si' ? sub.badge : sub.badgeEn}
                    </span>
                    <span className="text-[10px] text-stone-500 flex items-center justify-end gap-1 mt-1 group-hover:text-emerald-300">
                      {language === 'si' ? 'තෝරන්න' : 'Select'} <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* BRANCH 1 FINAL: STARTER COMPLETE PLAN (100% Free & Friendly) */}
        {stage === 'starter_final' && (
          <div className="p-5 sm:p-8 space-y-6 animate-in zoom-in-95 duration-300">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-stone-900 to-emerald-500/10 border border-emerald-500/40 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 block">
                  {language === 'si' ? '100% නොමිලේ සුහද උපදෙස් සහතිකය' : '100% Free Friendly Consultation Guaranteed'}
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-stone-100">
                  {selectedItemTitle}
                </h3>
                <span className="text-xs text-stone-300">
                  {language === 'si' ? (
                    <>මූලික සාකච්ඡාව: <strong className="text-emerald-400">100% නොමිලේ (කිසිදු මුදල් අයකිරීමක් නැත)</strong></>
                  ) : (
                    <>Initial Consultation: <strong className="text-emerald-400">100% Free (Zero Obligations)</strong></>
                  )}
                </span>
              </div>
              <button onClick={() => setStage('starter_sub')} className="px-3 py-1.5 rounded-lg bg-stone-800 text-stone-300 text-xs font-semibold cursor-pointer">
                {language === 'si' ? 'වෙනස් කරන්න' : 'Change Selection'}
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2 text-xs text-stone-300">
              <span className="font-bold text-stone-200 block">
                {language === 'si' ? 'අපගේ සහෝදරත්වයේ සහතිකය (No Risk Guarantee):' : 'Zero-Risk Peace of Mind Guarantee:'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'si' ? '100% නොමිලේ අදහස් සහ තාක්ෂණික මඟ පෙන්වීම' : '100% Free strategy and technical roadmap'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'si' ? 'ඔබට දැරිය හැකි මුදලකට පමණක් අනාගතයේදී පටන් ගැනීමේ නිදහස' : 'Total freedom to build within your comfortable budget'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'si' ? 'කිසිදු බලපෑමක් හෝ හදිස්සි කිරීමක් නොමැත' : 'Zero sales pressure or aggressive sales tactics'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'si' ? 'කෙළින්ම Founder Shanthapriya Silva සමඟ සුහද කතාබහක්' : 'Direct honest 1-on-1 guidance with Founder Shanthapriya'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={getCustomWhatsAppUrl('Starting a New Idea / Starter Business (100% Free Friendly Guidance)', selectedItemTitle, '100% Free Consultation')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01] transition-all cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>
                  {language === 'si'
                    ? 'Founder සමඟ 100% නොමිලේ සුහදව සාකච්ඡා කරමු (+94 78 847 0610)'
                    : 'Chat 100% Free with Founder on WhatsApp (+94 78 847 0610)'}
                </span>
              </a>

              <div className="flex items-center justify-between text-xs">
                <button onClick={handleReset} className="text-stone-400 hover:text-stone-200 underline cursor-pointer">
                  Start from Beginning
                </button>
                <button onClick={() => setIsMinimized(true)} className="text-amber-400 hover:text-amber-300 underline cursor-pointer">
                  Browse Traditional Website
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BRANCH 2: EXISTING BUSINESS & SALES (5 Sub-Options) */}
        {/* ========================================================================= */}
        {stage === 'growth_sub' && (
          <div className="p-5 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest block">Step 2 of 3 • Business Growth</span>
                <h3 className="text-base sm:text-lg font-extrabold text-stone-100">
                  {language === 'si' ? 'ඔබේ ව්‍යාපාර ක්ෂේත්‍රය තෝරන්න:' : 'Select Your Business Industry for Maximum Sales Growth:'}
                </h3>
              </div>
              <button onClick={handleReset} className="text-xs text-stone-400 hover:text-stone-200 underline cursor-pointer">
                Back to 5 Options
              </button>
            </div>

            <div className="space-y-2.5">
              {[
                { id: '1', title: '1. කෑම කඩ, Bakery, Cafe & Restaurant (Digital Menu + Orders)', en: '1. Food, Bakery & Cafe (Interactive Menu & Instant WhatsApp Cart)', desc: 'Instagram & Facebook හරහා එන අය කෙළින්ම කෑම ඇනවුම් කිරීමට.', descEn: 'Convert Instagram & Facebook food traffic into paid WhatsApp orders.', price: 'LKR 35,000 - 45,000 ($140)' },
                { id: '2', title: '2. ඇඳුම්, පැල, බඩු විකුණන Online Shop (PayHere / Card Payment)', en: '2. Retail & E-Commerce (Direct Card Payments to Bank)', desc: 'පාරිභෝගිකයින්ට Card එකෙන් ගෙවන්න සහ Stock බලන්න.', descEn: 'Direct card checkout via PayHere/Stripe straight to your bank account.', price: 'LKR 45,000 - 55,000 ($180)' },
                { id: '3', title: '3. Salon, Spa, Clinics හෝ Services (Live Slot Booking)', en: '3. Salon, Spa & Clinic Online Appointment System', desc: 'Call කර කර ඉන්නේ නැතිව clientsලටම වේලාවන් වෙන් කරගන්න.', descEn: 'Eliminate call tag. Let clients reserve time slots independently 24/7.', price: 'LKR 30,000 - 40,000 ($120)' },
                { id: '4', title: '4. ඉඩම්, ගෙවල්, Export හෝ Corporate (High-End Authority)', en: '4. Real Estate, Exports & Corporate High-Ticket Authority', desc: 'දේශීය සහ විදේශීය clientsලාට ඉහළම විශ්වාසය ගොඩනැගීමට.', descEn: 'Project premium corporate trust for diaspora and high-value buyers.', price: 'LKR 50,000 - 75,000 ($200)' },
                { id: '5', title: '5. පාරිභෝගිකයින්ට පැය 24ම උත්තර දෙන 24/7 AI WhatsApp Auto-Reply', en: '5. 24/7 Automated AI WhatsApp Sales Closer', desc: 'ඔබ නිදාගෙන ඉද්දිත් orders ගන්නා ස්වයංක්‍රීය පද්ධතිය.', descEn: 'Capture leads and close sales automatically around the clock.', price: 'LKR 30,000 - 42,000 ($130)' },
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => {
                    playHoloSound('chime');
                    setSelectedItemTitle(language === 'si' ? sub.title : sub.en);
                    setSelectedItemDesc(language === 'si' ? sub.desc : sub.descEn);
                    setSelectedItemPrice(sub.price);
                    setStage('growth_final');
                    speakScript('plan_ready', language);
                  }}
                  className="w-full p-3.5 rounded-xl bg-stone-950/80 hover:bg-stone-900 border border-stone-800 hover:border-sky-400 text-left transition-all group cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-stone-100 group-hover:text-sky-300">
                      {language === 'si' ? sub.title : sub.en}
                    </div>
                    <span className="text-[11px] text-stone-400 mt-0.5 block">
                      {language === 'si' ? sub.desc : sub.descEn}
                    </span>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <span className="text-[11px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20 block">{sub.price}</span>
                    <span className="text-[10px] text-stone-500 flex items-center justify-end gap-1 mt-1 group-hover:text-sky-300">
                      {language === 'si' ? 'තෝරන්න' : 'Select'} <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* BRANCH 2 FINAL: GROWTH PLAN */}
        {stage === 'growth_final' && (
          <div className="p-5 sm:p-8 space-y-6 animate-in zoom-in-95 duration-300">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-500/20 via-stone-900 to-sky-500/10 border border-sky-500/40 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-400 block">
                  {language === 'si' ? 'ඔබගේ ව්‍යාපාර වර්ධන සැලැස්ම' : 'Tailored Business Growth Architecture'}
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-stone-100">
                  {selectedItemTitle}
                </h3>
                <span className="text-xs text-stone-300">
                  {language === 'si' ? (
                    <>ඇස්තමේන්තුගත ආයෝජනය: <strong className="text-sky-400">{selectedItemPrice}</strong></>
                  ) : (
                    <>Investment Estimate: <strong className="text-sky-400">{selectedItemPrice}</strong></>
                  )}
                </span>
              </div>
              <button onClick={() => setStage('growth_sub')} className="px-3 py-1.5 rounded-lg bg-stone-800 text-stone-300 text-xs font-semibold cursor-pointer">
                {language === 'si' ? 'වෙනස් කරන්න' : 'Change Selection'}
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2 text-xs text-stone-300">
              <span className="font-bold text-stone-200 block">
                {language === 'si' ? 'ඇතුළත් සුවිශේෂී පහසුකම්:' : 'Business Growth Features Included:'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'si' ? 'Google Search සහ Google Maps Local SEO ශ්‍රේණිගත කිරීම' : 'Google Search & Google Maps Local SEO Ranking'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'si' ? 'කෙළින්ම WhatsApp හරහා ඇනවුම් ලබාගැනීමේ පද්ධතිය' : 'Direct 1-Tap WhatsApp Checkout Engine'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'si' ? 'Facebook / Instagram Ads සඳහා සකස් කළ සුපිරි වේගය' : 'High-speed Mobile First UX for Instagram/FB Ads'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'si' ? 'කිසිදු මාසික නඩත්තු ගාස්තුවක් නැත & වසරක සහය' : 'Zero Monthly Maintenance Fees & 1 Year Support'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={getCustomWhatsAppUrl('Existing Business Growth Plan', selectedItemTitle, selectedItemPrice)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01] transition-all cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>
                  {language === 'si'
                    ? 'මෙම සැලැස්ම සමඟ Founder Shanthapriya Silva අමතන්න (+94 78 847 0610)'
                    : 'Launch This Growth Plan with Founder on WhatsApp (+94 78 847 0610)'}
                </span>
              </a>

              <div className="flex items-center justify-between text-xs">
                <button onClick={handleReset} className="text-stone-400 hover:text-stone-200 underline cursor-pointer">
                  Start from Beginning
                </button>
                <button onClick={() => setIsMinimized(true)} className="text-amber-400 hover:text-amber-300 underline cursor-pointer">
                  Browse Traditional Website
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BRANCH 3: 5 LIVE WORKING DEMOS */}
        {/* ========================================================================= */}
        {stage === 'demos_grid' && (
          <div className="p-5 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">Live Experience</span>
                <h3 className="text-base sm:text-lg font-extrabold text-stone-100">
                  {language === 'si' ? 'අත්හදා බැලීමට පහත Demo එකක් තෝරන්න:' : 'Test Any Real Working Application on Your Device:'}
                </h3>
              </div>
              <button onClick={handleReset} className="text-xs text-stone-400 hover:text-stone-200 underline cursor-pointer">
                Back to 5 Options
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { slug: 'bakery', icon: '🥖', title: '1. Artisan Bakery & Cakes', desc: 'Custom cake builder, flavour selection, 1-tap cart', badge: 'Interactive Cake Builder' },
                { slug: 'cafe', icon: '☕', title: '2. Urban Specialty Cafe', desc: 'Digital food menu, coffee customization, direct order', badge: 'Digital Menu & Table Orders' },
                { slug: 'salon', icon: '✂️', title: '3. Aura Luxury Salon', desc: 'Live stylist choosing, time slot booking, service prices', badge: 'Online Appointment Engine' },
                { slug: 'flora', icon: '🌿', title: '4. Flora Plant Nursery', desc: 'Online shopping cart, price calculations, plant catalog', badge: 'E-Commerce Retail Store' },
                { slug: 'real-estate', icon: '🏡', title: '5. Sovereign Real Estate', desc: 'Luxury villas, property tours, VIP client inquiry', badge: 'High-Ticket Property Showcase' },
              ].map(demo => (
                <button
                  key={demo.slug}
                  onClick={() => {
                    playHoloSound('warp');
                    navigate(`/demo/${demo.slug}`);
                    setIsMinimized(true);
                  }}
                  className="p-4 rounded-xl bg-stone-950 hover:bg-stone-900 border border-stone-800 hover:border-emerald-500 text-left transition-all group cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl p-2 rounded-lg bg-stone-900 border border-stone-800">{demo.icon}</span>
                    <div className="flex-1">
                      <div className="font-bold text-xs sm:text-sm text-stone-200 group-hover:text-emerald-300">
                        {demo.title}
                      </div>
                      <span className="text-[11px] text-stone-400 block mt-0.5">{demo.desc}</span>
                      <div className="mt-2 text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                        <span>Launch Live App Right Now</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-2 text-center text-xs text-stone-400">
              <span>Like what you see? We can deploy your branded version in 3 to 5 days!</span>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BRANCH 4: TRANSPARENT HONEST PRICING (5 Sub-Options) */}
        {/* ========================================================================= */}
        {stage === 'pricing_sub' && (
          <div className="p-5 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block">Zero Hidden Fees • 100% Transparent</span>
                <h3 className="text-base sm:text-lg font-extrabold text-stone-100">
                  {language === 'si' ? 'ඔබේ Budget එකට ගැළපෙන සාධාරණ පැකේජය තෝරන්න:' : 'Select Your Budget Tier for Transparent Pricing:'}
                </h3>
              </div>
              <button onClick={handleReset} className="text-xs text-stone-400 hover:text-stone-200 underline cursor-pointer">
                Back to 5 Options
              </button>
            </div>

            <div className="space-y-2.5">
              {[
                { id: '1', title: '1. Starter Business Web (රු. 20,000 - 28,000)', en: '1. Starter Business Platform (LKR 20,000 - 28,000 / $80)', desc: 'නොමිලේ Domain (.com/.lk), Free 1 Year Hosting, Google Search Setup.', descEn: 'Free custom domain, 1-year high-speed cloud hosting, Google search setup.', price: 'LKR 20k - 28k' },
                { id: '2', title: '2. WhatsApp Online Ordering Shop (රු. 32,000 - 45,000)', en: '2. WhatsApp Online Store with Cart (LKR 32,000 - 45,000 / $130)', desc: 'කෑම, ඇඳුම්, බඩු සඳහා සම්පූර්ණ 1-Tap WhatsApp Cart පද්ධතිය.', descEn: 'Full 1-tap WhatsApp cart ordering system for food, bakery, or retail.', price: 'LKR 32k - 45k' },
                { id: '3', title: '3. Full Card Payment E-Commerce (රු. 45,000 - 65,000)', en: '3. Full E-Commerce with Card Payment (LKR 45,000 - 65,000 / $180)', desc: 'PayHere හෝ Stripe හරහා කෙළින්ම Bank Account එකට සල්ලි එන්න.', descEn: 'Direct card checkout via PayHere or Stripe directly to your bank account.', price: 'LKR 45k - 65k' },
                { id: '4', title: '4. 24/7 AI WhatsApp Auto-Reply System (රු. 25,000 - 38,000)', en: '4. 24/7 AI WhatsApp Sales Bot (LKR 25,000 - 38,000 / $110)', desc: 'පාරිභෝගිකයින්ට ස්වයංක්‍රීයව පිළිතුරු දෙන කෘත්‍රිම බුද්ධි සහායකයා.', descEn: 'Automated 24/7 conversational sales bot answering clients even while you sleep.', price: 'LKR 25k - 38k' },
                { id: '5', title: '5. මගේ Budget එකට ගැළපෙන Custom Package එකක් සාකච්ඡා කරමු', en: '5. Tailor a Custom Deal Fitting My Exact Budget', desc: 'ඔබේ අතේ ඇති මුදලට ගැලපෙන හොඳම විසඳුම මිත්‍රශීලීව සාකච්ඡා කරමු.', descEn: 'Friendly discussion to tailor the best feasible solution to your budget.', price: 'Friendly Discussion' },
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => {
                    playHoloSound('chime');
                    setSelectedItemTitle(language === 'si' ? sub.title : sub.en);
                    setSelectedItemDesc(language === 'si' ? sub.desc : sub.descEn);
                    setSelectedItemPrice(sub.price);
                    setStage('pricing_final');
                    speakScript('plan_ready', language);
                  }}
                  className="w-full p-3.5 rounded-xl bg-stone-950/80 hover:bg-stone-900 border border-stone-800 hover:border-purple-400 text-left transition-all group cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-stone-100 group-hover:text-purple-300">
                      {language === 'si' ? sub.title : sub.en}
                    </div>
                    <span className="text-[11px] text-stone-400 mt-0.5 block">
                      {language === 'si' ? sub.desc : sub.descEn}
                    </span>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <span className="text-[11px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 block">{sub.price}</span>
                    <span className="text-[10px] text-stone-500 flex items-center justify-end gap-1 mt-1 group-hover:text-purple-300">
                      {language === 'si' ? 'තෝරන්න' : 'Select'} <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* BRANCH 4 FINAL: PRICING BREAKDOWN */}
        {stage === 'pricing_final' && (
          <div className="p-5 sm:p-8 space-y-6 animate-in zoom-in-95 duration-300">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/20 via-stone-900 to-purple-500/10 border border-purple-500/40 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-400 block">
                  {language === 'si' ? 'සාධාරණ මිල ගණන් සැලැස්ම' : 'Honest Pricing Breakdown Locked'}
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-stone-100">
                  {selectedItemTitle}
                </h3>
                <span className="text-xs text-stone-300">
                  {language === 'si' ? (
                    <>ඉලක්කගත මිල පරාසය: <strong className="text-purple-400">{selectedItemPrice}</strong></>
                  ) : (
                    <>Target Price Range: <strong className="text-purple-400">{selectedItemPrice}</strong></>
                  )}
                </span>
              </div>
              <button onClick={() => setStage('pricing_sub')} className="px-3 py-1.5 rounded-lg bg-stone-800 text-stone-300 text-xs font-semibold cursor-pointer">
                {language === 'si' ? 'වෙනස් කරන්න' : 'Change Selection'}
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2 text-xs text-stone-300">
              <span className="font-bold text-stone-200 block">
                {language === 'si' ? 'ගෙවීමේ කොන්දේසි සහ සාධාරණ සහතිකය:' : 'Payment Terms & Safety Guarantee:'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'si' ? '50% අත්තිකාරම් & ඉතිරි 50% වැඩේ අවසන් වී පරීක්ෂා කිරීමෙන් පසු පමණි' : '50% Deposit & Final 50% only after full inspection and launch'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'si' ? 'කිසිදු සැඟවුණු මාසික ගාස්තු නොමැත (Zero Hidden Recurring Fees)' : 'Zero hidden recurring fees — you fully own your website'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'si' ? 'නොමිලේ වසරක Cloud SSD Hosting සහ Domain ඇතුළත්' : 'Free 1 Year Cloud SSD Hosting & Domain Included'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'si' ? 'දින 3-5ක් ඇතුළත Live Prototype එක පරික්ෂා කිරීමේ හැකියාව' : 'Test your live interactive prototype within 3 to 5 days'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={getCustomWhatsAppUrl('Pricing & Budget Discussion', selectedItemTitle, selectedItemPrice)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01] transition-all cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>
                  {language === 'si'
                    ? 'මෙම Budget එක තහවුරු කරගැනීමට Founder Shanthapriya අමතන්න (+94 78 847 0610)'
                    : 'Confirm This Budget with Founder on WhatsApp (+94 78 847 0610)'}
                </span>
              </a>

              <div className="flex items-center justify-between text-xs">
                <button onClick={handleReset} className="text-stone-400 hover:text-stone-200 underline cursor-pointer">
                  Start from Beginning
                </button>
                <button onClick={() => setIsMinimized(true)} className="text-amber-400 hover:text-amber-300 underline cursor-pointer">
                  Browse Traditional Website
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BRANCH 5: DIRECT HUMAN-TO-HUMAN ASSISTANCE (Zero Tech Fear) */}
        {/* ========================================================================= */}
        {stage === 'human_sub' && (
          <div className="p-5 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">Direct Human-to-Human Support</span>
                <h3 className="text-base sm:text-lg font-extrabold text-stone-100">
                  {language === 'si' ? 'ඔබට වඩාත්ම පහසු සම්බන්ධතා ක්‍රමය තෝරන්න:' : 'Choose the Most Comfortable Way to Reach Us:'}
                </h3>
              </div>
              <button onClick={handleReset} className="text-xs text-stone-400 hover:text-stone-200 underline cursor-pointer">
                Back to 5 Options
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Option 5.1: WhatsApp Voice Note or Message */}
              <a
                href="https://wa.me/94788470610?text=Hi%20Shanthapriya,%20I%20am%20exploring%20Ravana%20Tech%20and%20would%20like%20to%20speak%20directly%20with%20you%20as%20a%20friend."
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/50 hover:border-emerald-400 text-left transition-all group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-bold text-xs text-stone-100 group-hover:text-emerald-300">
                      1. WhatsApp Voice / Chat
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-400 block leading-relaxed">
                    {language === 'si'
                      ? 'ඔබට පහසු වෙලාවක සිංහලෙන් හෝ English වලින් voice note එකක් හෝ message එකක් එවන්න.'
                      : 'Send a voice note or message in English anytime. Zero friction.'}
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono mt-2 block">+94 78 847 0610 ➔</span>
              </a>

              {/* Option 5.2: Direct Normal Phone Call */}
              <a
                href="tel:+94788470610"
                className="p-3.5 rounded-xl bg-stone-950 hover:bg-stone-900 border border-stone-800 hover:border-amber-400 text-left transition-all group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-bold text-xs text-stone-100 group-hover:text-amber-300">
                      2. Direct Phone Call
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-400 block leading-relaxed">
                    {language === 'si'
                      ? 'කෙළින්ම සාමාන්‍ය Call එකක් ගන්න. පෝලිම් නෑ — Founder Shanthapriya Silva සමඟම කතා කරන්න.'
                      : 'Place a direct call. Zero waiting queues — speak directly with Founder Shanthapriya Silva.'}
                  </span>
                </div>
                <span className="text-[10px] text-amber-400 font-mono mt-2 block">+94 78 847 0610 ➔</span>
              </a>

              {/* Option 5.3: 15-Min Free Google Meet Consultation */}
              <a
                href="https://wa.me/94788470610?text=Hi%20Shanthapriya,%20I%20would%20like%20to%20schedule%20a%20free%2015-minute%20Google%20Meet%20/%20Zoom%20session%20to%20discuss%20my%20website%20plan."
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-gradient-to-br from-sky-600/20 via-stone-950 to-stone-950 hover:from-sky-600/30 border border-sky-500/40 hover:border-sky-400 text-left transition-all group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Video className="w-4 h-4 text-sky-400 shrink-0" />
                    <span className="font-bold text-xs text-stone-100 group-hover:text-sky-300">
                      3. Google Meet (15-Min Free)
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-400 block leading-relaxed">
                    {language === 'si'
                      ? '100% නොමිලේ සජීවී සාකච්ඡාවක්. Screen Share කරගෙන ඔබේ Project එක සජීවීව Plan කරගත හැක.'
                      : '100% free live consultation. Share screens and plan your website in real time.'}
                  </span>
                </div>
                <span className="text-[10px] text-sky-400 font-mono mt-2 block">1-Click Google Meet Schedule ➔</span>
              </a>
            </div>

            {/* Option 5.4: Instant Callback Request Form */}
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-950/90 border border-stone-800 space-y-3">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs sm:text-sm font-bold text-stone-200">
                  {language === 'si'
                    ? '4. "මට කතා කරන්න" — ඔබේ Number එක මෙතන ලියන්න (Callback Request):'
                    : '4. "Request a Callback" — Leave your number below:'}
                </h4>
              </div>

              <form onSubmit={handleCallbackSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={callbackName}
                    onChange={(e) => setCallbackName(e.target.value)}
                    placeholder={language === 'si' ? 'ඔබගේ නම (Your Name)' : 'Your Name'}
                    className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-amber-400"
                  />
                  <input
                    type="tel"
                    required
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    placeholder={language === 'si' ? 'දුරකථන අංකය (Phone Number: e.g. 078 847 0610)' : 'Phone Number (e.g. +1 555 123 4567)'}
                    className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <input
                  type="text"
                  value={callbackNote}
                  onChange={(e) => setCallbackNote(e.target.value)}
                  placeholder={language === 'si' ? 'ඔබට අවශ්‍ය දේ කෙටියෙන් (උදා: කේක් කඩයකට වෙබ් සයිට් එකක්)' : 'Brief project requirements (e.g. Real estate showcase website)'}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-amber-400"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {isSubmitting
                      ? (language === 'si' ? 'ඉල්ලීම යවමින් පවතී...' : 'Submitting...')
                      : (language === 'si' ? 'මට නොමිලේ Call එකක් ලබාදෙන්න (Request Free Call)' : 'Request a Free Consultation Call')}
                  </span>
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Option 5.4: Language Support */}
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-400">
                <strong className="text-stone-200 block mb-1">
                  {language === 'si' ? '4. භාෂා බාධක කිසිවක් නැත:' : '4. Zero Language Barrier:'}
                </strong>
                {language === 'si'
                  ? 'සිංහල, English හෝ ඔබට පහසු ඕනෑම ආකාරයකින් කතා කිරීමට අප සූදානම්.'
                  : 'We communicate fluently in English with international clients globally.'}
              </div>

              {/* Option 5.5: About Founder */}
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-400">
                <strong className="text-stone-200 block mb-1">
                  {language === 'si' ? '5. අවුරුදු 20ක ජීවිත අත්දැකීම්:' : '5. 20 Years Career Experience:'}
                </strong>
                {language === 'si'
                  ? 'Founder Shanthapriya Silva සතු අවුරුදු 20ක පළපුරුද්ද සමඟ සහෝදරයෙකු මෙන් ඔබට උපදෙස් ලබා දේ.'
                  : 'Founder Shanthapriya Silva brings two decades of seasoned professional acumen and modern engineering.'}
              </div>
            </div>
          </div>
        )}

        {/* CALLBACK SUCCESS */}
        {stage === 'callback_success' && (
          <div className="p-6 sm:p-10 text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
              ✓
            </div>
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-extrabold text-stone-100">
                {language === 'si'
                  ? `ස්තූතියි ${callbackName}! ඔබගේ Callback ඉල්ලීම සාර්ථකව ලැබුණා!`
                  : `Thank You, ${callbackName}! Your callback request is received!`}
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto">
                {language === 'si' ? (
                  <>Founder Shanthapriya Silva විසින් නොබෝ වේලාවකින් ඔබගේ අංකයට <strong>({callbackPhone})</strong> කෙළින්ම ඇමතුමක් ලබා දෙනු ඇත.</>
                ) : (
                  <>Founder Shanthapriya Silva will personally reach out to <strong>({callbackPhone})</strong> shortly.</>
                )}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/94788470610?text=Hi%20Shanthapriya,%20I%20just%20submitted%20a%20callback%20request%20as%20${encodeURIComponent(callbackName)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Open Direct WhatsApp Now</span>
              </a>

              <button
                onClick={handleReset}
                className="px-4 py-2.5 rounded-xl bg-stone-800 text-stone-300 text-xs font-semibold hover:bg-stone-700 cursor-pointer"
              >
                Back to Reception Menu
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* REAL AI INSTANT PROPOSAL BLUEPRINT STAGE */}
        {/* ========================================================================= */}
        {stage === 'ai_proposal' && (
          <div className="p-5 sm:p-8 space-y-6 animate-in zoom-in-95 duration-300">
            {aiLoading ? (
              <div className="py-16 text-center space-y-4">
                <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-amber-400/20 border-t-amber-400 animate-spin" />
                  <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-extrabold text-stone-100">
                    {language === 'si'
                      ? 'Gemini AI Engine මඟින් ඔබේ සැලැස්ම සකස් වෙමින් පවතී...'
                      : 'Synthesizing Architecture via Gemini AI Engine...'}
                  </h3>
                  <p className="text-xs text-stone-400 max-w-md mx-auto">
                    {language === 'si'
                      ? 'Ravana Tech Knowledge Base සහ Founder Shanthapriya Silva ගේ ඉංජිනේරු ප්‍රමිතීන්ට අනුව ගණනය කෙරේ.'
                      : "Calibrating against Ravana Tech's engineering matrix, transparent pricing, and conversion principles."}
                  </p>
                </div>
              </div>
            ) : aiProposal ? (
              <div className="space-y-5">
                {/* Header Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-stone-900 to-sky-500/20 border border-amber-500/40 shadow-xl space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {language === 'si' ? 'AI ගණනය කළ ඩිජිටල් සැලැස්ම' : 'AI-Architected Digital Blueprint'}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      {aiProposal.investmentEstimate}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-stone-100">
                    {aiProposal.businessTitle}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {aiProposal.executiveSummary}
                  </p>

                  <div className="pt-1 flex flex-wrap items-center gap-4 text-xs font-mono text-stone-400">
                    <span className="text-amber-300">
                      ⚡ {aiProposal.recommendedArchitecture}
                    </span>
                    <span>•</span>
                    <span className="text-stone-300">
                      ⏱️ {aiProposal.estimatedTimeline}
                    </span>
                  </div>
                </div>

                {/* Key Features */}
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-950/90 border border-stone-800 space-y-3">
                  <span className="text-xs font-bold text-stone-200 uppercase tracking-wider block">
                    {language === 'si' ? 'යෝජිත මූලික තාක්ෂණික අංග (Included Capabilities):' : 'Engineered Key Capabilities:'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {aiProposal.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guarantees */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px] text-stone-400">
                  <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{language === 'si' ? '50% අත්තිකාරම් / 50% අවසානයේ' : '50% Advance / 50% on Handover'}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{language === 'si' ? 'සැඟවුණු මාසික ගාස්තු කිසිවක් නැත' : 'Zero Hidden Recurring Fees'}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{language === 'si' ? 'නොමිලේ වසරක Cloud SSD Hosting' : 'Free 1-Yr High-Speed Cloud SSD'}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-1">
                  <a
                    href={`https://wa.me/94788470610?text=${encodeURIComponent(aiProposal.whatsappPitch)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01] transition-all cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>
                      {language === 'si'
                        ? 'මෙම සැලැස්ම Founder Shanthapriya Silva ගේ WhatsApp එකට යවා කතාබහ කරමු'
                        : "Send This Blueprint to Founder Shanthapriya's WhatsApp (+94 78 847 0610)"}
                    </span>
                  </a>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setAiProposal(null);
                        setStage('root_situations');
                      }}
                      className="text-stone-400 hover:text-stone-200 underline cursor-pointer"
                    >
                      {language === 'si' ? 'වෙනත් ප්‍රශ්නයක් අසන්න' : 'Ask Another Question'}
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-stone-400 hover:text-stone-200 underline cursor-pointer"
                    >
                      {language === 'si' ? 'මූලික තේරීම් 5 වෙත' : 'Back to 5 Guided Options'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsMinimized(true)}
                      className="text-amber-400 hover:text-amber-300 underline cursor-pointer"
                    >
                      {language === 'si' ? 'වෙබ් අඩවිය බලන්න' : 'Explore Website'}
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}



      </div>
    </div>
  );
};
