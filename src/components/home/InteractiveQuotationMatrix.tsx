import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  RotateCcw, 
  Send, 
  PhoneCall, 
  ShieldCheck, 
  Clock, 
  Zap, 
  ShoppingBag, 
  Building2, 
  UtensilsCrossed, 
  CalendarCheck, 
  Bot, 
  Smartphone, 
  CreditCard, 
  Globe2, 
  Check, 
  Flame,
  Award,
  Layers,
  FileText
} from 'lucide-react';
import founderAvatarImg from '../../assets/founder-avatar.jpg';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface StepOption {
  id: string;
  title: string;
  description: string;
  badge?: string;
  icon: React.ReactNode;
  estimatedPrice: string;
  includedFeature: string;
  demoUrl?: string;
  voiceEn: string;
  voiceSi: string;
}

interface StepGroup {
  id: string;
  stepNumber: number;
  titleEn: string;
  titleSi: string;
  subtitleEn: string;
  subtitleSi: string;
  speechEn: string;
  speechSi: string;
  options: StepOption[];
}

const STEPS_DATA: StepGroup[] = [
  {
    id: 'business_type',
    stepNumber: 1,
    titleEn: '1. What type of digital solution do you need?',
    titleSi: '1. ඔබට අවශ්‍ය digital solution එක කුමක්ද?',
    subtitleEn: 'Click an option below to guide your virtual architect in real-time.',
    subtitleSi: 'පහත විකල්පයකින් එකක් click කර ඔබේ project එක ආරම්භ කරන්න.',
    speechEn: 'Welcome! Let us build your perfect digital presence. What type of website or system would you like us to craft for you?',
    speechSi: 'සාදරයෙන් පිළිගන්නවා! ඔබට අවශ්‍ය වෙබ් අඩවියේ හෝ පද්ධතියේ ප්‍රධාන කාණ්ඩය පහතින් තෝරන්න.',
    options: [
      {
        id: 'food_cafe',
        title: 'Restaurant, Cafe or Bakery Website',
        description: 'Interactive live food menu, cake orders & direct WhatsApp checkout.',
        badge: 'Top Pick for Food Brands',
        icon: <UtensilsCrossed className="w-5 h-5 text-amber-400" />,
        estimatedPrice: 'LKR 28,000 - 35,000',
        includedFeature: 'Live Digital Menu + 1-Tap WhatsApp Cart',
        demoUrl: '/demo/bakery',
        voiceEn: 'Awesome choice! An interactive food menu and WhatsApp cart converts casual foodies into paying customers instantly.',
        voiceSi: 'විශිෂ්ට තේරීමක්! ඩිජිටල් මෙනු සහ direct WhatsApp order ක්‍රමය හරහා ඔබේ කෑම බීම ව්‍යාපාරයට ලොකු වාසියක් ලැබෙනවා.'
      },
      {
        id: 'salon_clinic',
        title: 'Salon, Spa or Medical Clinic',
        description: 'Service packages, specialist staff, and instant appointment booking.',
        badge: 'High Conversion',
        icon: <CalendarCheck className="w-5 h-5 text-rose-400" />,
        estimatedPrice: 'LKR 30,000 - 38,000',
        includedFeature: 'Online Slot Booking + Price Tier List',
        demoUrl: '/demo/salon',
        voiceEn: 'Perfect! Booking calendar and clear pricing eliminate endless messaging back and forth with clients.',
        voiceSi: 'නියමයි! Appointments සහ package pricing කෙළින්ම පෙන්වීම නිසා client ලා එක්ක නිතර repeat chats කරන්න අවශ්‍ය වෙන්නේ නෑ.'
      },
      {
        id: 'ecommerce_shop',
        title: 'E-Commerce Online Store',
        description: 'Sell physical products, clothing or electronics with PayHere & Card gateway.',
        badge: 'Most Popular',
        icon: <ShoppingBag className="w-5 h-5 text-emerald-400" />,
        estimatedPrice: 'LKR 42,000 - 55,000',
        includedFeature: 'PayHere / Visa Gateway + Order Dashboard',
        demoUrl: '/demo/flora',
        voiceEn: 'Great choice! E-commerce with instant card payments and inventory management runs your shop 24/7 on autopilot.',
        voiceSi: 'විශිෂ්ටයි! Online payments සහ PayHere integration සහිත store එකක් මඟින් ඔබේ විකිණුම් ස්වයංක්‍රීයව දින 365ම ක්‍රියාත්මක වෙනවා.'
      },
      {
        id: 'corporate_realty',
        title: 'Corporate, Real Estate or Export Company',
        description: 'Ultra-luxurious branding, trust signals, property listings & global SEO.',
        badge: 'High-Ticket Authority',
        icon: <Building2 className="w-5 h-5 text-sky-400" />,
        estimatedPrice: 'LKR 35,000 - 48,000',
        includedFeature: 'Global SEO + Dynamic Showcase Galleries',
        demoUrl: '/demo/real-estate',
        voiceEn: 'Excellent! A high-end corporate identity builds instant trust with overseas and high-ticket clients.',
        voiceSi: 'ඉතාම හොඳයි! High-ticket clients සහ international buyers ලා විශ්වාසය තබන ප්‍රමුඛ පෙළේ corporate website එකක් අපිට සකස් කළ හැකියි.'
      },
      {
        id: 'ai_bot_automation',
        title: 'WhatsApp AI Sales Bot & CRM Automation',
        description: 'Auto-reply to customer DMs, share prices, and close orders 24/7.',
        badge: 'AI Powered',
        icon: <Bot className="w-5 h-5 text-purple-400" />,
        estimatedPrice: 'LKR 25,000 - 40,000',
        includedFeature: '24/7 Automatic WhatsApp Customer Support',
        demoUrl: '/demos',
        voiceEn: 'Super futuristic! An AI WhatsApp bot responds in under 3 seconds to convert night and weekend buyers.',
        voiceSi: 'නියමයි! ඔබේ WhatsApp එකට එන customer inquiries වලට තත්පර 3න් auto-reply කර orders close කරන AI bot එකක් අපි හදමු.'
      }
    ]
  },
  {
    id: 'core_feature',
    stepNumber: 2,
    titleEn: '2. Select your primary conversion superpower',
    titleSi: '2. ඔබේ වෙබ් අඩවියට අවශ්‍ය ප්‍රධාන විශේෂාංගය තෝරන්න',
    subtitleEn: 'What is the most critical feature to convert your visitors into customers?',
    subtitleSi: 'පාරිභෝගිකයන්ගෙන් ඉක්මන් orders හෝ bookings ලබා ගැනීමට වැදගත්ම දේ කුමක්ද?',
    speechEn: 'Now, let us pick the conversion superpower that will generate maximum revenue for your business.',
    speechSi: 'දැන්, වැඩිම පාරිභෝගික ආකර්ෂණයක් ලබා දෙන ඔබේ ප්‍රධාන feature එක තෝරන්න.',
    options: [
      {
        id: 'feature_whatsapp_cart',
        title: '1-Tap Direct WhatsApp Cart',
        description: 'No app download or complex sign-ups. Customer clicks, order sends directly to your WhatsApp with full details.',
        badge: 'Zero Friction',
        icon: <Smartphone className="w-5 h-5 text-emerald-400" />,
        estimatedPrice: '+ Included in Base Plan',
        includedFeature: 'Auto Formatted WhatsApp Order Messages',
        voiceEn: '1-Tap WhatsApp ordering creates zero friction. Sri Lankan buyers love this approach because it is fast and familiar.',
        voiceSi: '1-Tap WhatsApp Checkout එක ලංකාවේ පාරිභෝගිකයින්ට ඉතාම පහසුයි. කිසිම account එකක් හදන්නේ නැතුව එක tap එකෙන් order එක ඔබට එනවා.'
      },
      {
        id: 'feature_payhere_gateway',
        title: 'PayHere Online Card Gateway (Visa/Mastercard)',
        description: 'Collect advance deposits or full payments directly into your local bank account.',
        badge: 'Instant Cashflow',
        icon: <CreditCard className="w-5 h-5 text-amber-400" />,
        estimatedPrice: '+ LKR 7,000 setup',
        includedFeature: 'Secure Payment Gateway Integration',
        voiceEn: 'PayHere card integration allows clients to pay with Visa, MasterCard, or online banking instantly with real-time receipts.',
        voiceSi: 'PayHere integration මඟින් credit / debit card හෝ online banking හරහා මුදල් සෘජුවම ඔබේ බැංකු ගිණුමට ලබාගත හැකියි.'
      },
      {
        id: 'feature_google_seo',
        title: 'Google Maps & Local Search SEO Dominance',
        description: 'Rank for high-intent keywords like "near me" and beat local competitors on search engines.',
        badge: 'Organic Traffic',
        icon: <Globe2 className="w-5 h-5 text-blue-400" />,
        estimatedPrice: '+ Included in Plan',
        includedFeature: 'Schema Markup + Google Search Console Setup',
        voiceEn: 'Google Search visibility brings you pre-qualified customers who are actively searching to buy your services today.',
        voiceSi: 'Google Search dominance හරහා Google හි ඔබගේ සේවාවන් සොයන clients ලා කෙළින්ම ඔබේ වෙබ් අඩවියට පැමිණෙනවා.'
      }
    ]
  },
  {
    id: 'timeline_package',
    stepNumber: 3,
    titleEn: '3. What is your expected launch timeline?',
    titleSi: '3. වෙබ් අඩවිය සජීවීව launch කිරීමට බලාපොරොත්තු වන කාලරාමුව?',
    subtitleEn: 'We deliver tested, production-grade platforms with extreme speed.',
    subtitleSi: 'අපි ඉතා ඉක්මනින් සහ උසස් තත්ත්වයෙන් ඔබේ project එක නිම කර දෙනවා.',
    speechEn: 'Almost there! When would you like to have your platform fully active and accepting customers?',
    speechSi: 'අවසන් පියවරට ආවා! ඔබේ website එක කවදා වන විට launch කර පාරිභෝගිකයන්ට විවෘත කිරීමට ඔබ කැමතිද?',
    options: [
      {
        id: 'time_express',
        title: '⚡ Express Speed Launch (3 to 5 Days)',
        description: 'Complete setup, mobile optimization, and WhatsApp checkout launched in under a week.',
        badge: 'Fastest In Sri Lanka',
        icon: <Zap className="w-5 h-5 text-amber-400" />,
        estimatedPrice: 'Starter: LKR 25,000 - 32,000',
        includedFeature: 'Priority Rapid Delivery + Domain Setup',
        voiceEn: 'Express launch gets your business online in just 3 to 5 days, so you can start closing sales this week.',
        voiceSi: 'දින 3ත් 5ත් ඇතුළත Express launch එකක් හරහා මේ සතිය ඇතුළතම ඔබේ ව්‍යාපාරය online ගෙන ඒමට අපිට පුළුවන්.'
      },
      {
        id: 'time_standard',
        title: '🚀 Professional Growth Architecture (7 to 14 Days)',
        description: 'Includes custom animation, copywriting assistance, multi-page layout, and full SEO configuration.',
        badge: 'Best Value for Growth',
        icon: <Flame className="w-5 h-5 text-orange-400" />,
        estimatedPrice: 'Growth: LKR 40,000 - 55,000',
        includedFeature: 'Advanced Animations + Copywriting + Full SEO',
        voiceEn: 'Our Professional Growth plan provides tailored design, conversion copywriting, and full search engine optimization.',
        voiceSi: 'Professional Growth plan එක මඟින් උසස් designs, copywriting සහ full search engine optimization සමඟ සම්පූර්ණ විසඳුමක් ලැබෙනවා.'
      }
    ]
  }
];

export const InteractiveQuotationMatrix: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<{ [stepId: string]: StepOption }>({});
  const [language, setLanguage] = useState<'en' | 'si'>('en');
  const [voiceMuted, setVoiceMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Inquiry form states
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientBusiness, setClientBusiness] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const currentStep = STEPS_DATA[currentStepIndex];
  const isQuotationReady = currentStepIndex >= STEPS_DATA.length;

  // Speak narration
  const speakText = (text: string, lang: 'en' | 'si') => {
    if (voiceMuted || !synthRef.current) return;
    try {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = lang === 'en' ? 1.0 : 0.95;
      utterance.pitch = 1.0;
      utterance.lang = lang === 'en' ? 'en-US' : 'si-LK';

      const voices = synthRef.current.getVoices();
      if (voices && voices.length > 0 && lang === 'en') {
        const preferred = voices.find(v => 
          v.name.includes('Google') || 
          v.name.includes('Natural') || 
          v.name.includes('Daniel') || 
          v.name.includes('Samantha') || 
          v.lang === 'en-US'
        );
        if (preferred) utterance.voice = preferred;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synthRef.current.speak(utterance);
    } catch (e) {
      console.warn('Speech error:', e);
      setIsSpeaking(false);
    }
  };

  // Speak initial or step speech
  const narrateStep = (stepIdx: number, lang: 'en' | 'si') => {
    if (stepIdx < STEPS_DATA.length) {
      const step = STEPS_DATA[stepIdx];
      speakText(lang === 'si' ? step.speechSi : step.speechEn, lang);
    } else {
      const readyMsgEn = "Congratulations! Your custom digital architecture and instant quotation are ready. Check the deliverables below or connect directly on WhatsApp!";
      const readyMsgSi = "සුබ පැතුම්! ඔබ තෝරාගත් custom digital architecture එක සහ quotation එක සූදානම්. පහත විස්තර පරීක්ෂා කර WhatsApp හරහා සම්බන්ධ වන්න!";
      speakText(lang === 'si' ? readyMsgSi : readyMsgEn, lang);
    }
  };

  const handleSelectOption = (option: StepOption) => {
    // 1. Save selection
    setSelectedOptions(prev => ({
      ...prev,
      [currentStep.id]: option
    }));

    // 2. Speak feedback voice of option
    const voiceMsg = language === 'si' ? option.voiceSi : option.voiceEn;
    speakText(voiceMsg, language);

    // 3. Move to next step smoothly after a short pause
    setTimeout(() => {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      narrateStep(nextIdx, language);
    }, 1200);
  };

  const resetMatrix = () => {
    setSelectedOptions({});
    setCurrentStepIndex(0);
    setSubmitSuccess(false);
    narrateStep(0, language);
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'si' : 'en';
    setLanguage(nextLang);
    narrateStep(currentStepIndex, nextLang);
  };

  const toggleVoice = () => {
    if (!voiceMuted) {
      if (synthRef.current) synthRef.current.cancel();
      setIsSpeaking(false);
      setVoiceMuted(true);
    } else {
      setVoiceMuted(false);
      narrateStep(currentStepIndex, language);
    }
  };

  // Calculate dynamic quote summary
  const chosenBusiness = selectedOptions['business_type'];
  const chosenFeature = selectedOptions['core_feature'];
  const chosenTimeline = selectedOptions['timeline_package'];

  const getEstimatedTotal = () => {
    if (chosenTimeline?.id === 'time_express') {
      return 'LKR 28,000 - 35,000 (Inclusive of Hosting & Domain Setup)';
    }
    if (chosenBusiness?.id === 'ecommerce_shop') {
      return 'LKR 45,000 - 55,000 (Full E-Commerce + Gateway)';
    }
    return 'LKR 35,000 - 45,000 (Complete Growth Package)';
  };

  // WhatsApp Order Generator
  const generateWhatsAppLink = () => {
    const lines = [
      `*Hi Ravana Tech (Founder), I generated a Custom Project Proposal on your website:*`,
      `• *Solution:* ${chosenBusiness?.title || 'Custom Web Platform'}`,
      `• *Conversion Superpower:* ${chosenFeature?.title || '1-Tap WhatsApp Cart'}`,
      `• *Expected Timeline:* ${chosenTimeline?.title || 'Express 3-5 Days'}`,
      `• *Estimated Estimate:* ${getEstimatedTotal()}`,
      ``,
      `Can we schedule a quick discussion to finalize the prototype?`
    ];
    return `https://wa.me/94788470610?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  // Save Direct Web Inquiry to Firestore
  const handleDirectInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'inquiries'), {
        name: clientName,
        phone: clientPhone,
        businessName: clientBusiness || 'Not specified',
        businessType: chosenBusiness?.title || 'General',
        coreFeature: chosenFeature?.title || 'Standard',
        timeline: chosenTimeline?.title || 'Express',
        estimatedPrice: getEstimatedTotal(),
        source: 'interactive_matrix_funnel',
        createdAt: serverTimestamp()
      });
      setSubmitSuccess(true);
      speakText(
        language === 'si' 
          ? 'ස්තූතියි! ඔබේ තොරතුරු අප වෙත සාර්ථකව ලැබුණා. පැය 2ක් ඇතුළත අපි ඔබව අමතනවා.'
          : 'Thank you! Your quotation request has been received. Our founder will contact you within 2 hours.',
        language
      );
    } catch (err) {
      console.error('Error saving quotation request:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative max-w-7xl mx-auto px-3 sm:px-6 my-6 sm:my-10">
      {/* Container Card with Futuristic Tech Gradient */}
      <div className="relative rounded-3xl bg-gradient-to-b from-stone-900 via-stone-950 to-stone-950 border border-stone-800 shadow-2xl p-4 sm:p-7 overflow-hidden">
        
        {/* Subtle glowing ambient background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        {/* TOP INTERACTIVE CONTROL BAR (Founder avatar, Language, Voice narration toggle) */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
          {/* Avatar and Architect intro */}
          <div className="flex items-center gap-3.5">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-amber-500/50 bg-stone-900 shrink-0 shadow-lg group">
              <img 
                src={founderAvatarImg} 
                alt="Ravana Tech Founder 3D Character" 
                className={`w-full h-full object-cover object-top transition-transform duration-300 ${isSpeaking ? 'scale-110' : ''}`} 
              />
              {isSpeaking && (
                <span className="absolute inset-0 border-2 border-amber-400 rounded-2xl animate-ping opacity-60" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Virtual Digital Architect
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Interactive Mode
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-extrabold text-stone-100 tracking-tight">
                {language === 'si' ? 'ඔබට ගැළපෙන Project එක තෝරා Live Quotation එක ලබාගන්න' : 'Build Your Custom Architecture & Instant Quotation'}
              </h2>
            </div>
          </div>

          {/* Controls: Audio Voice, Language Toggle, Replay */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>{language === 'en' ? 'සිංහල Voice' : 'English Voice'}</span>
            </button>

            {/* Voice Mute/Unmute */}
            <button
              onClick={toggleVoice}
              title={voiceMuted ? "Unmute Voice Narration" : "Mute Voice Narration"}
              className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs ${
                voiceMuted 
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' 
                  : 'bg-amber-500/15 border-amber-500/40 text-amber-300 hover:bg-amber-500/25'
              }`}
            >
              {voiceMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce text-amber-400' : ''}`} />}
              <span>{voiceMuted ? 'Muted' : isSpeaking ? 'Speaking...' : 'Voice On'}</span>
            </button>

            {/* Reset */}
            {currentStepIndex > 0 && (
              <button
                onClick={resetMatrix}
                className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 border border-stone-700 transition-colors"
                title="Reset steps"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* STEP PROGRESS TRACKER */}
        <div className="relative z-10 pt-4 pb-2">
          <div className="grid grid-cols-4 gap-2">
            {[
              { num: 1, label: language === 'si' ? '1. Solution' : '1. Solution' },
              { num: 2, label: language === 'si' ? '2. Superpower' : '2. Superpower' },
              { num: 3, label: language === 'si' ? '3. Timeline' : '3. Timeline' },
              { num: 4, label: language === 'si' ? '4. Instant Quote' : '4. Instant Quote' }
            ].map((step, idx) => {
              const isActive = currentStepIndex === idx;
              const isPast = currentStepIndex > idx;
              return (
                <div 
                  key={step.num}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    isActive 
                      ? 'bg-amber-500/15 border-amber-500/50 text-amber-300 shadow-md' 
                      : isPast 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                      : 'bg-stone-900/60 border-stone-800 text-stone-500'
                  }`}
                >
                  <div className="text-[10px] sm:text-xs font-semibold flex items-center justify-center gap-1 truncate">
                    {isPast && <Check className="w-3 h-3 text-emerald-400" />}
                    <span>{step.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* INTERACTIVE QUESTION & SELECTION CARDS (Steps 1, 2, 3) */}
        {!isQuotationReady && (
          <div className="relative z-10 pt-4 space-y-4 animate-in fade-in duration-300">
            {/* Step Heading */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-stone-100">
                  {language === 'si' ? currentStep.titleSi : currentStep.titleEn}
                </h3>
                <p className="text-xs text-stone-400">
                  {language === 'si' ? currentStep.subtitleSi : currentStep.subtitleEn}
                </p>
              </div>
              <span className="text-[11px] font-mono text-stone-400">
                Step {currentStep.stepNumber} of 3
              </span>
            </div>

            {/* Clickable Option Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {currentStep.options.map((option) => {
                const isSelected = selectedOptions[currentStep.id]?.id === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option)}
                    className={`group relative text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between hover:scale-[1.01] ${
                      isSelected 
                        ? 'bg-amber-500/20 border-amber-400 shadow-lg ring-1 ring-amber-400' 
                        : 'bg-stone-900/80 hover:bg-stone-850 border-stone-800 hover:border-amber-500/40 shadow-sm'
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="p-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 group-hover:border-amber-500/40 transition-colors">
                          {option.icon}
                        </div>
                        {option.badge && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-800 text-amber-300 border border-stone-700 group-hover:border-amber-500/30">
                            {option.badge}
                          </span>
                        )}
                      </div>

                      {/* Title & Description */}
                      <h4 className="text-sm font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                        {option.title}
                      </h4>
                      <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                        {option.description}
                      </p>
                    </div>

                    {/* Footer perks */}
                    <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px]">
                      <span className="text-stone-300 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {option.includedFeature}
                      </span>
                      <span className="font-semibold text-amber-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                        Select <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: FINAL DESTINATION - LIVE QUOTATION & INSTANT INQUIRY SUITE */}
        {isQuotationReady && (
          <div className="relative z-10 pt-4 space-y-6 animate-in fade-in zoom-in-95 duration-400">
            {/* Celebration Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-emerald-500/20 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 block">
                  Proposal & Quotation Ready
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-stone-100">
                  {language === 'si' ? 'ඔබගේ Custom Digital Package එක සම්පූර්ණයි!' : 'Your Custom Digital Architecture is Tailored & Calculated!'}
                </h3>
                <p className="text-xs text-stone-300 mt-0.5">
                  Engineered with zero upfront friction, 1-tap WhatsApp checkout, and guaranteed 3-5 day launch.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={resetMatrix}
                  className="px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold border border-stone-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Change Selections</span>
                </button>
              </div>
            </div>

            {/* TWO-COLUMN DETAILS: LEFT = SCOPE & DELIVERABLES, RIGHT = INSTANT INQUIRY */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* LEFT: SCOPE BREAKDOWN (7 Cols) */}
              <div className="lg:col-span-7 bg-stone-900/90 rounded-2xl border border-stone-800 p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Chosen Specifications</span>
                    <h4 className="text-sm font-bold text-stone-100">Deliverables & Features Included</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-stone-400 block">Estimated Investment</span>
                    <span className="text-sm font-extrabold text-amber-400">{getEstimatedTotal()}</span>
                  </div>
                </div>

                {/* Selected Choice Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                    <span className="text-[10px] text-stone-400 block font-medium">1. Solution Category</span>
                    <span className="text-xs font-bold text-stone-200 block truncate">{chosenBusiness?.title}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                    <span className="text-[10px] text-stone-400 block font-medium">2. Superpower Feature</span>
                    <span className="text-xs font-bold text-stone-200 block truncate">{chosenFeature?.title}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                    <span className="text-[10px] text-stone-400 block font-medium">3. Expected Delivery</span>
                    <span className="text-xs font-bold text-stone-200 block truncate">{chosenTimeline?.title}</span>
                  </div>
                </div>

                {/* Guaranteed Inclusions Checklist */}
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-bold text-stone-300 block">All Plans Include Without Hidden Costs:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Custom domain (.com / .lk setup)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>1 Year Ultra-Fast SSD Cloud Hosting</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Mobile-First Speed (Under 1.2s load time)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Direct 1-Tap WhatsApp Lead Capture</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Google Search & Maps Business Ranking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Free Admin Training & 30-Day Support</span>
                    </div>
                  </div>
                </div>

                {/* Teleport to Working Live Demo if applicable */}
                {chosenBusiness?.demoUrl && (
                  <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
                    <span className="text-xs text-stone-400">Want to test a live working version?</span>
                    <Link
                      to={chosenBusiness.demoUrl}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 underline transition-colors"
                    >
                      <span>Open Working Live Demo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>

              {/* RIGHT: ACTION HUB (5 Cols - WhatsApp + Web Inquiry Form) */}
              <div className="lg:col-span-5 bg-gradient-to-b from-stone-900 to-stone-950 rounded-2xl border border-stone-800 p-4 sm:p-5 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                    Instant Connect & Lock Offer
                  </span>
                  <h4 className="text-sm font-bold text-stone-100">
                    Lock In Free Domain & Launch Discount
                  </h4>
                  <p className="text-xs text-stone-400 mt-1">
                    Send your customized specifications directly to the founder for immediate start.
                  </p>
                </div>

                {/* Primary 1-Click WhatsApp Button */}
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Send Spec on WhatsApp (1-Tap Quote)</span>
                </a>

                <div className="relative flex items-center justify-center my-1">
                  <span className="border-t border-stone-800 w-full" />
                  <span className="bg-stone-950 px-2 text-[10px] text-stone-500 uppercase tracking-widest shrink-0">
                    Or Request Callback Below
                  </span>
                  <span className="border-t border-stone-800 w-full" />
                </div>

                {/* Direct Instant Form (Saves to Firestore) */}
                {submitSuccess ? (
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                    <span className="text-xs font-bold text-emerald-300 block">Quotation Request Received!</span>
                    <p className="text-[11px] text-stone-300">
                      Our founder will call/WhatsApp you at {clientPhone} within 2 hours with the complete blueprint.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleDirectInquirySubmit} className="space-y-2.5">
                    <div>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Your Name / Contact Person *"
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="Phone / WhatsApp *"
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                      />
                      <input
                        type="text"
                        value={clientBusiness}
                        onChange={(e) => setClientBusiness(e.target.value)}
                        placeholder="Business Name (Optional)"
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Submitting Request...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-amber-400" />
                          <span>Submit for Official Quotation & Callback</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                <div className="text-[11px] text-stone-500 text-center flex items-center justify-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>No upfront obligation • 100% Free Consultation</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
