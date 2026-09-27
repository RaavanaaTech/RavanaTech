import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Send, 
  ArrowRight, 
  MessageSquare, 
  CheckCircle2, 
  Compass, 
  Laptop, 
  Code2, 
  Bot, 
  Headphones, 
  ChevronRight,
  Maximize2,
  Minimize2,
  PhoneCall
} from 'lucide-react';
import founderAvatarImg from '../../assets/founder-avatar.jpg';

interface StepOption {
  label: string;
  sublabel?: string;
  actionValue: string;
  nextStepId: string;
  icon?: string;
}

interface InteractiveStep {
  id: string;
  stepNumber: number;
  founderSpeechEn: string;
  founderSpeechSi: string;
  caption: string;
  options: StepOption[];
  allowCustomInput?: boolean;
  inputPlaceholder?: string;
  highlightRoute?: string;
}

const INTERACTIVE_JOURNEY: Record<string, InteractiveStep> = {
  welcome: {
    id: 'welcome',
    stepNumber: 1,
    founderSpeechEn: "Hey there! Welcome to Ravana Tech. I am your digital architect and founder. I build ultra high-converting digital platforms, web applications, and custom AI automation. Tell me, what great vision brought you here today?",
    founderSpeechSi: "ආයුබෝවන්! රාවණා ටෙක් වෙත සාදරයෙන් පිළිගන්නවා. මම ඔබගේ Digital Architect. අපි high-converting වෙබ් අඩවි සහ AI Automations නිර්මාණය කරනවා. අද ඔබ බලාපොරොත්තු වන විශේෂිත Project එක මොකක්ද?",
    caption: "Step 1 of 3: Choose your current project goal",
    options: [
      {
        label: "🚀 I need a Modern High-Converting Website",
        sublabel: "Business, Portfolio, or Booking Platform",
        actionValue: "business_website",
        nextStepId: "choose_business_type"
      },
      {
        label: "🛍️ I want an E-Commerce / Online Store",
        sublabel: "Sell products with PayHere & WhatsApp Cart",
        actionValue: "ecommerce_store",
        nextStepId: "choose_ecommerce_scale"
      },
      {
        label: "🤖 Custom AI Automation & Web Software",
        sublabel: "Auto WhatsApp Bot, CRM, or SaaS System",
        actionValue: "ai_software",
        nextStepId: "choose_tech_stack"
      },
      {
        label: "👀 Just exploring Live Interactive Demos",
        sublabel: "Bakery, Salon, Cafe, Real Estate live apps",
        actionValue: "explore_demos",
        nextStepId: "demo_selection"
      }
    ],
    allowCustomInput: true,
    inputPlaceholder: "Or type your idea here and press Enter..."
  },

  choose_business_type: {
    id: 'choose_business_type',
    stepNumber: 2,
    founderSpeechEn: "Awesome choice! High-converting digital presence gives you a massive unfair advantage. What type of business or service are we elevating?",
    founderSpeechSi: "නියම තේරීමක්! වර්තමාන ලෝකයේ high-converting වෙබ් අඩවියක් තිබීම ඔබේ ව්‍යාපාරයට ලැබෙන දැවැන්ත වාසියක්. ඔබගේ ව්‍යාපාරයේ ස්වභාවය කුමක්ද?",
    caption: "Step 2 of 3: Select your industry or industry category",
    options: [
      {
        label: "☕ Restaurant, Cafe, Bakery or Food Brand",
        sublabel: "With interactive live digital menu & direct WhatsApp ordering",
        actionValue: "food_cafe",
        nextStepId: "finish_proposal"
      },
      {
        label: "✨ Salon, Spa, Wellness, or Clinic",
        sublabel: "With online booking, service pricing & appointment slots",
        actionValue: "salon_spa",
        nextStepId: "finish_proposal"
      },
      {
        label: "🏢 Corporate, Real Estate or Export Company",
        sublabel: "Ultra sleek, trust-building, global SEO and dynamic showcases",
        actionValue: "corporate_export",
        nextStepId: "finish_proposal"
      },
      {
        label: "🎓 Personal Brand, Coaching or Training",
        sublabel: "Showcase personal authority, courses, and instant consultations",
        actionValue: "personal_brand",
        nextStepId: "finish_proposal"
      }
    ],
    allowCustomInput: true,
    inputPlaceholder: "Tell me your exact industry..."
  },

  choose_ecommerce_scale: {
    id: 'choose_ecommerce_scale',
    stepNumber: 2,
    founderSpeechEn: "E-Commerce is where precision matters. We build lightning fast stores with direct payment gateways and 1-tap WhatsApp checkout. How many products do you plan to start with?",
    founderSpeechSi: "E-Commerce එකකදී speed එක සහ checkout එක තමයි වැදගත්ම. අපි PayHere සහ 1-tap WhatsApp Cart එක්ක ඉතාම වේගවත් online stores හදනවා. කොපමණ භාණ්ඩ ප්‍රමාණයක් ඔබට තිබේද?",
    caption: "Step 2 of 3: Estimate your catalog size",
    options: [
      {
        label: "📦 1 to 20 Products (Boutique / Starter)",
        sublabel: "Ideal for boutique brands, launching within 3-5 days",
        actionValue: "ecom_small",
        nextStepId: "finish_proposal"
      },
      {
        label: "🏬 50+ Products with Categories & Stock Tracking",
        sublabel: "Full product catalogue, variants, reviews & stock system",
        actionValue: "ecom_full",
        nextStepId: "finish_proposal"
      },
      {
        label: "💳 Custom Payment Gateway (PayHere / Stripe / COD)",
        sublabel: "Secure online visa/mastercard gateway integration",
        actionValue: "ecom_payment",
        nextStepId: "finish_proposal"
      }
    ],
    allowCustomInput: true,
    inputPlaceholder: "What products are you selling?"
  },

  choose_tech_stack: {
    id: 'choose_tech_stack',
    stepNumber: 2,
    founderSpeechEn: "Cutting-edge software and custom automation are my passion! What kind of intelligence or system workflow are you aiming to streamline?",
    founderSpeechSi: "Modern software සහ custom AI automations මගේ ප්‍රධාන විෂයක්! ඔබට අවශ්‍ය automated workflow එක හෝ platform එක ගැන මට කියන්න.",
    caption: "Step 2 of 3: Select automation priority",
    options: [
      {
        label: "🤖 24/7 WhatsApp AI Customer Support & Sales Bot",
        sublabel: "Answers client questions, shares prices, and closes orders automatically",
        actionValue: "ai_whatsapp_bot",
        nextStepId: "finish_proposal"
      },
      {
        label: "⚡ Custom Web App / Client Management Portal",
        sublabel: "React, Node, Cloud Firestore with real-time dashboard",
        actionValue: "custom_portal",
        nextStepId: "finish_proposal"
      },
      {
        label: "📈 CRM & Automated Lead Capture Pipeline",
        sublabel: "Connects Facebook Ads, WhatsApp, and Google Sheets",
        actionValue: "crm_pipeline",
        nextStepId: "finish_proposal"
      }
    ],
    allowCustomInput: true,
    inputPlaceholder: "Describe your workflow idea..."
  },

  demo_selection: {
    id: 'demo_selection',
    stepNumber: 2,
    founderSpeechEn: "I have prepared full real-world working demo applications right inside the site! Let me teleport you to test them directly.",
    founderSpeechSi: "මම ඔබට සජීවීව අත්හදා බැලිය හැකි working demo websites කිහිපයක්ම සකස් කර තිබෙනවා. කැමති Demo එක තෝරන්න!",
    caption: "Interactive Live Demo Teleport",
    options: [
      {
        label: "🥖 Artisan Bakery & Sweet Treats Demo",
        sublabel: "With interactive cake builder & live cart",
        actionValue: "demo_bakery",
        nextStepId: "finish_proposal",
        icon: "🥐"
      },
      {
        label: "☕ Urban Roasters Specialty Cafe Demo",
        sublabel: "Table orders & coffee selection",
        actionValue: "demo_cafe",
        nextStepId: "finish_proposal",
        icon: "☕"
      },
      {
        label: "✂️ Aura Luxury Hair & Beauty Salon Demo",
        sublabel: "Service packages and live booking flow",
        actionValue: "demo_salon",
        nextStepId: "finish_proposal",
        icon: "✨"
      },
      {
        label: "🌿 Flora & Botanica Plant Nursery Demo",
        sublabel: "Greenery plants shop and care guides",
        actionValue: "demo_flora",
        nextStepId: "finish_proposal",
        icon: "🌿"
      },
      {
        label: "🏡 Sovereign Prime Realty Showcase",
        sublabel: "Luxury real estate property listings & tour booking",
        actionValue: "demo_real_estate",
        nextStepId: "finish_proposal",
        icon: "🏢"
      }
    ]
  },

  finish_proposal: {
    id: 'finish_proposal',
    stepNumber: 3,
    founderSpeechEn: "Brilliant! I already have the exact architecture in mind for this. I can deliver a custom tailored prototype with premium typography, mobile-first speed, and zero upfront friction. Let's discuss your timeline directly on WhatsApp!",
    founderSpeechSi: "විශිෂ්ටයි! ඔබගේ අවශ්‍යතාවයට ගැළපෙන හොඳම architecture එක මගේ සතුව සූදානම්. අපි කෙළින්ම WhatsApp හරහා සම්බන්ධ වී දින 3-5ක් ඇතුළත ඔබේ Live Prototype එක සකස් කරමු!",
    caption: "Step 3 of 3: Connect with Founder Directly",
    options: [
      {
        label: "💬 Connect on WhatsApp with My Project Plan",
        sublabel: "Direct line with the founder (+94 78 847 0610)",
        actionValue: "whatsapp_connect",
        nextStepId: "done"
      },
      {
        label: "📋 Build Live Custom Quotation on Screen",
        sublabel: "Interactive price breakdown & feature checklist",
        actionValue: "open_matrix",
        nextStepId: "done"
      },
      {
        label: "🚀 View All 6 Live Client Demos First",
        sublabel: "Inspect UI, animations and order mechanics",
        actionValue: "view_demos_page",
        nextStepId: "done"
      },
      {
        label: "🔄 Start Virtual Exploration from Beginning",
        sublabel: "Explore other solutions and service plans",
        actionValue: "restart",
        nextStepId: "welcome"
      }
    ]
  }
};

export const FounderAvatarExperience: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentStepId, setCurrentStepId] = useState<string>('welcome');
  const [language, setLanguage] = useState<'en' | 'si'>('en');
  const [voiceMuted, setVoiceMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedChoices, setSelectedChoices] = useState<{ stepId: string; choiceLabel: string }[]>([]);
  const [customInputText, setCustomInputText] = useState('');
  const [hasPromptedGreeting, setHasPromptedGreeting] = useState(false);
  const [bubblePreviewText, setBubblePreviewText] = useState<string>("Hey! Click to chat with the Founder");

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize Speech Synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Open avatar experience automatically or handle first impression
  useEffect(() => {
    const hasSeen = sessionStorage.getItem('ravana_avatar_opened');
    
    // Timer to pop avatar bubble smoothly on desktop/mobile
    const popTimer = setTimeout(() => {
      setHasPromptedGreeting(true);
      setBubblePreviewText("👋 Need a custom website? Let's talk live!");
    }, 1500);

    // If user clicks anywhere on site for the first time, offer the immersive experience
    const handleInitialTouch = () => {
      if (!hasSeen) {
        // Auto open if first time or show preview
        setBubblePreviewText("⚡ 100% Virtual Architect Ready!");
      }
    };

    window.addEventListener('click', handleInitialTouch, { once: true });

    return () => {
      clearTimeout(popTimer);
      window.removeEventListener('click', handleInitialTouch);
    };
  }, []);

  const currentStep = INTERACTIVE_JOURNEY[currentStepId] || INTERACTIVE_JOURNEY.welcome;

  // Speak step text
  const speakText = (text: string, lang: 'en' | 'si') => {
    if (voiceMuted || !synthRef.current) return;
    try {
      synthRef.current.cancel(); // Cancel any prior voice

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = lang === 'en' ? 1.02 : 0.95;
      utterance.pitch = 1.0;
      utterance.lang = lang === 'en' ? 'en-US' : 'si-LK';

      // Pick natural sounding voice
      const voices = synthRef.current.getVoices();
      if (voices && voices.length > 0) {
        if (lang === 'en') {
          const naturalVoice = voices.find(v => 
            v.name.includes('Google') || 
            v.name.includes('Natural') || 
            v.name.includes('Daniel') || 
            v.name.includes('Samantha') || 
            (v.lang.startsWith('en') && !v.name.includes('Bad'))
          );
          if (naturalVoice) utterance.voice = naturalVoice;
        }
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      utteranceRef.current = utterance;
      synthRef.current.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis error:', err);
      setIsSpeaking(false);
    }
  };

  // Trigger speech whenever current step or language changes while panel is open
  useEffect(() => {
    if (isOpen && !isMinimized && !voiceMuted) {
      const speech = language === 'si' ? currentStep.founderSpeechSi : currentStep.founderSpeechEn;
      // Slight delay so animation renders first
      const t = setTimeout(() => {
        speakText(speech, language);
      }, 300);
      return () => clearTimeout(t);
    } else {
      if (synthRef.current) {
        synthRef.current.cancel();
        setIsSpeaking(false);
      }
    }
  }, [currentStepId, isOpen, isMinimized, language, voiceMuted]);

  // Handle User Choosing an Option
  const handleSelectOption = (option: StepOption) => {
    // Record choice
    setSelectedChoices(prev => [...prev, { stepId: currentStepId, choiceLabel: option.label }]);

    // Specific teleports
    if (option.actionValue === 'explore_demos' || option.actionValue === 'view_demos_page') {
      navigate('/demos');
      if (option.actionValue === 'view_demos_page') {
        setIsMinimized(true);
        return;
      }
    }

    if (option.actionValue === 'open_matrix') {
      setIsMinimized(true);
      window.scrollTo({ top: 380, behavior: 'smooth' });
      return;
    }

    if (option.actionValue.startsWith('demo_')) {
      const demoSlug = option.actionValue.replace('demo_', '');
      navigate(`/demo/${demoSlug}`);
      setIsMinimized(true);
      return;
    }

    if (option.actionValue === 'whatsapp_connect') {
      const summary = selectedChoices.map(c => `• ${c.choiceLabel}`).join('%0A');
      const text = `Hi Ravana Tech Founder! I completed the Virtual Architect journey on your website:%0A%0A${summary}%0A• Selected: ${option.label}%0A%0AI would like to discuss my project timeline and get a quote.`;
      window.open(`https://wa.me/94788470610?text=${text}`, '_blank');
      return;
    }

    if (option.actionValue === 'restart') {
      setCurrentStepId('welcome');
      setSelectedChoices([]);
      return;
    }

    if (option.nextStepId && INTERACTIVE_JOURNEY[option.nextStepId]) {
      setCurrentStepId(option.nextStepId);
    }
  };

  // Handle custom input
  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInputText.trim()) return;

    setSelectedChoices(prev => [...prev, { stepId: currentStepId, choiceLabel: customInputText.trim() }]);
    setCustomInputText('');

    if (currentStepId === 'welcome') {
      setCurrentStepId('choose_business_type');
    } else {
      setCurrentStepId('finish_proposal');
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'si' : 'en';
    setLanguage(nextLang);
    speakText(nextLang === 'si' ? currentStep.founderSpeechSi : currentStep.founderSpeechEn, nextLang);
  };

  const toggleVoiceMute = () => {
    if (!voiceMuted) {
      if (synthRef.current) synthRef.current.cancel();
      setIsSpeaking(false);
      setVoiceMuted(true);
    } else {
      setVoiceMuted(false);
      speakText(language === 'si' ? currentStep.founderSpeechSi : currentStep.founderSpeechEn, language);
    }
  };

  const openAvatarExperience = () => {
    setIsOpen(true);
    setIsMinimized(false);
    sessionStorage.setItem('ravana_avatar_opened', 'true');
  };

  return (
    <>
      {/* FLOATING CORNER LAUNCHER (When closed or minimized) */}
      {(!isOpen || isMinimized) && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex items-end gap-3 pointer-events-auto">
          {/* Conversational Speech Bubble Prompt */}
          <div 
            onClick={openAvatarExperience}
            className="cursor-pointer hidden sm:flex items-center gap-2.5 bg-stone-900/95 text-stone-100 border border-amber-500/30 shadow-2xl px-4 py-2.5 rounded-2xl text-xs font-medium backdrop-blur-md hover:border-amber-400 hover:scale-[1.02] transition-all group max-w-xs"
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div className="flex flex-col">
              <span className="font-semibold text-amber-400 text-[11px] uppercase tracking-wider flex items-center gap-1">
                Founder Avatar • Online <Sparkles className="w-3 h-3 text-amber-300" />
              </span>
              <span className="text-stone-300 text-xs truncate">{bubblePreviewText}</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all ml-1 shrink-0" />
          </div>

          {/* Glowing Animated Circular Avatar Button */}
          <button
            onClick={openAvatarExperience}
            aria-label="Open Founder Live Virtual Experience"
            className="relative group p-1 rounded-full bg-gradient-to-tr from-amber-500 via-orange-600 to-amber-300 shadow-2xl hover:scale-105 active:scale-95 transition-transform"
          >
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-stone-950 bg-stone-900 shadow-inner">
              <img 
                src={founderAvatarImg} 
                alt="Ravana Tech Founder 3D Avatar" 
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110" 
              />
              {/* Online Indicator Badge */}
              <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-stone-900 rounded-full shadow-sm" />
            </div>

            {/* Speaking / Pulse Ring */}
            <span className="absolute -inset-1 rounded-full bg-amber-500/25 blur-sm animate-pulse -z-10" />
          </button>
        </div>
      )}

      {/* FULL IMMERSIVE VIRTUAL AVATAR MODAL / PANEL */}
      {isOpen && !isMinimized && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[440px] sm:max-h-[640px] z-50 flex flex-col bg-stone-950/95 sm:rounded-3xl border border-stone-800/80 shadow-2xl backdrop-blur-xl text-stone-100 overflow-hidden transition-all animate-in fade-in slide-in-from-bottom-6 duration-300">
          
          {/* HEADER BAR */}
          <div className="flex items-center justify-between px-4 py-3 bg-stone-900/90 border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-amber-500/50 bg-stone-900 shrink-0">
                <img src={founderAvatarImg} alt="Avatar" className="w-full h-full object-cover object-top" />
                {isSpeaking && (
                  <span className="absolute inset-0 border-2 border-amber-400 rounded-full animate-ping" />
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-stone-100 leading-tight">Digital Architect</span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE
                  </span>
                </div>
                <span className="text-[11px] text-stone-400">Founder & Tech Lead • Ravana Tech</span>
              </div>
            </div>

            {/* Controls (Lang, Mute, Minimize, Close) */}
            <div className="flex items-center gap-1.5">
              {/* Language Switch */}
              <button
                onClick={toggleLanguage}
                title="Switch English / Sinhala"
                className="px-2 py-1 text-[11px] font-semibold rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition-colors"
              >
                {language === 'en' ? 'සිංහල' : 'English'}
              </button>

              {/* Mute / Unmute Voice */}
              <button
                onClick={toggleVoiceMute}
                title={voiceMuted ? "Unmute Founder Voice" : "Mute Founder Voice"}
                className={`p-1.5 rounded-lg border transition-colors ${
                  voiceMuted 
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' 
                    : 'bg-stone-800 border-stone-700 text-stone-300 hover:text-amber-400'
                }`}
              >
                {voiceMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-amber-400 animate-bounce' : ''}`} />}
              </button>

              {/* Minimize */}
              <button
                onClick={() => setIsMinimized(true)}
                title="Minimize avatar"
                className="p-1.5 rounded-lg bg-stone-800 border border-stone-700 text-stone-400 hover:text-stone-200 transition-colors"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>

              {/* Close */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (synthRef.current) synthRef.current.cancel();
                  setIsSpeaking(false);
                }}
                title="Close chat"
                className="p-1.5 rounded-lg bg-stone-800 hover:bg-rose-900/40 border border-stone-700 hover:border-rose-700/50 text-stone-400 hover:text-rose-200 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* MAIN INTERACTION VIEWPORT */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[480px] scrollbar-thin scrollbar-thumb-stone-800">
            
            {/* AVATAR HERO CARD WITH AUDIO VISUALIZER */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-stone-900 to-stone-950 border border-stone-800 p-4 flex gap-4 items-center">
              {/* Avatar visual */}
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-500/40 shrink-0 shadow-lg group">
                <img 
                  src={founderAvatarImg} 
                  alt="Ravana Tech Founder" 
                  className={`w-full h-full object-cover object-top transition-transform duration-500 ${isSpeaking ? 'scale-105' : ''}`} 
                />
                
                {/* Voice waves overlay when speaking */}
                {isSpeaking && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent py-1 flex items-center justify-center gap-1">
                    <span className="w-1 h-3 bg-amber-400 rounded-full animate-pulse" />
                    <span className="w-1 h-4 bg-amber-300 rounded-full animate-pulse delay-75" />
                    <span className="w-1 h-2 bg-amber-400 rounded-full animate-pulse delay-150" />
                  </div>
                )}
              </div>

              {/* Founder speech speech bubble */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-amber-400 tracking-wider uppercase flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    Virtual Architect Voice
                  </span>
                  {isSpeaking && (
                    <span className="text-[10px] text-amber-300/80 font-mono animate-pulse">Speaking...</span>
                  )}
                </div>

                <p className="text-xs sm:text-[13px] text-stone-200 font-sans leading-relaxed">
                  "{language === 'si' ? currentStep.founderSpeechSi : currentStep.founderSpeechEn}"
                </p>

                {/* Replay voice button */}
                <button
                  onClick={() => speakText(language === 'si' ? currentStep.founderSpeechSi : currentStep.founderSpeechEn, language)}
                  className="inline-flex items-center gap-1.5 text-[11px] text-stone-400 hover:text-amber-400 pt-1 transition-colors"
                >
                  <Headphones className="w-3 h-3" />
                  <span>Replay Voice ({language === 'si' ? 'සිංහල' : 'English'})</span>
                </button>
              </div>
            </div>

            {/* STEP PROGRESSION BREADCRUMB */}
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-medium text-stone-400 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                {currentStep.caption}
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((num) => (
                  <span
                    key={num}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      num === currentStep.stepNumber 
                        ? 'w-6 bg-amber-500' 
                        : num < currentStep.stepNumber 
                        ? 'w-3 bg-emerald-500' 
                        : 'w-2 bg-stone-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* INTERACTIVE OPTION CARDS (1st, 2nd, 3rd click seamless journey) */}
            <div className="space-y-2">
              {currentStep.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option)}
                  className="w-full text-left p-3 rounded-xl bg-stone-900/80 hover:bg-stone-800/90 border border-stone-800 hover:border-amber-500/50 transition-all duration-200 group flex items-start gap-3 hover:translate-x-1"
                >
                  <div className="p-2 rounded-lg bg-stone-950 border border-stone-800 group-hover:border-amber-500/40 text-amber-400 shrink-0 mt-0.5">
                    {option.icon ? (
                      <span className="text-sm">{option.icon}</span>
                    ) : (
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-xs sm:text-sm text-stone-200 group-hover:text-amber-300 transition-colors">
                      {option.label}
                    </div>
                    {option.sublabel && (
                      <div className="text-[11px] text-stone-400 mt-0.5 leading-snug">
                        {option.sublabel}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* USER CUSTOM INPUT OPTION (If client has a custom custom requirement) */}
            {currentStep.allowCustomInput && (
              <form onSubmit={handleCustomSubmit} className="pt-2">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={customInputText}
                    onChange={(e) => setCustomInputText(e.target.value)}
                    placeholder={currentStep.inputPlaceholder || "Tell me your custom goal..."}
                    className="w-full bg-stone-900/90 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 pr-10"
                  />
                  <button
                    type="submit"
                    disabled={!customInputText.trim()}
                    aria-label="Send message"
                    className="absolute right-1.5 p-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 disabled:opacity-30 disabled:hover:bg-amber-500 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            {/* PREVIOUS CHOICES SUMMARY */}
            {selectedChoices.length > 0 && (
              <div className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800/80 text-[11px] space-y-1">
                <span className="text-stone-400 font-medium">Your Virtual Roadmap So Far:</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedChoices.map((choice, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-900 border border-stone-700 text-stone-300 text-[10px]">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {choice.choiceLabel}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* FOOTER CALL-TO-ACTION */}
          <div className="p-3 bg-stone-900/90 border-t border-stone-800 flex items-center justify-between text-xs">
            <a
              href="https://wa.me/94788470610?text=Hi%20Ravana%20Tech!%20I%20am%20exploring%20your%20interactive%20site%20and%20want%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Direct WhatsApp: +94 78 847 0610</span>
            </a>

            <button
              onClick={() => {
                setCurrentStepId('welcome');
                setSelectedChoices([]);
              }}
              className="text-[11px] text-stone-400 hover:text-stone-200 underline transition-colors"
            >
              Reset Tour
            </button>
          </div>
        </div>
      )}
    </>
  );
};
