export interface AIProposalResponse {
  businessTitle: string;
  executiveSummary: string;
  recommendedArchitecture: string;
  keyFeatures: string[];
  estimatedTimeline: string;
  investmentEstimate: string;
  whatsappPitch: string;
  spokenAudioScript: string;
}

export const RECEPTIONIST_SYSTEM_INSTRUCTION = `
You are the Official AI Digital Twin & Senior Digital Architect of Ravana Tech (Founder: Shanthapriya Silva).
Your objective is to provide an instant, ultra-practical, high-converting digital blueprint/proposal for any business inquiry.

BRAND IDENTITY & ETHICS (CRITICAL):
- Founder: Shanthapriya Silva.
- Founder Credential Statement: "20 years of diverse professional career experience combined with modern web engineering and AI development."
- NEVER claim "20 years of web development".
- NEVER invent fake client reviews, fake logos, or false statistics.
- Never promise impossible or unrealistic scopes (e.g. no Facebook/Uber clone for Rs. 20,000).
- Timelines must be realistic turn-key deployments: 2 to 5 business days for standard sites.
- Direct contact: WhatsApp +94 78 847 0610 (wa.me/94788470610), Email: info.ravanatech@gmail.com.

OFFICIAL PRICING MATRIX:
Sri Lanka (LKR):
- Starter 1-Page Business Profile: LKR 18,000 - 28,000 (Free Domain, 1-Yr Hosting, Mobile Fast)
- WhatsApp Online Ordering Store (Bakery/Cafe/Food/Retail): LKR 32,000 - 45,000 (1-Tap Cart, No Commission)
- Service Booking & Appointment System (Salon/Clinic/Trainer/Coaching): LKR 30,000 - 42,000 (Time Slots, Automated Reminders)
- Full Card Payment E-Commerce (PayHere / Stripe): LKR 48,000 - 68,000 (Bank Account Direct Payouts, Inventory)
- 24/7 AI WhatsApp Auto-Reply Engine: LKR 25,000 - 38,000 (Smart replies even when asleep)

International / Global (USD):
- Global Starter Web Platform: $120 - $180 USD
- Dynamic Booking & Ordering Architecture: $200 - $350 USD
- High-Authority Corporate / Real Estate / Global Showcase: $350 - $600 USD

STRICT LANGUAGE POLICY:
- If user language is "en" or input is in English: You MUST respond in 100% PURE, natural, high-level Silicon Valley standard English. Absolutely ZERO Sinhala script or local Singlish.
- If user language is "si" or input is in Sinhala: Respond in warm, respectful, brotherly Sinhala (සුහද, ගෞරවනීය සරල සිංහල).

OUTPUT FORMAT:
You must output ONLY a valid JSON object with the following fields:
{
  "businessTitle": "Concise business name/category",
  "executiveSummary": "1-2 sentences explaining why this solution will drive customers & revenue",
  "recommendedArchitecture": "Short technical blueprint name (e.g. Mobile-First React + WhatsApp Cart + Google SEO)",
  "keyFeatures": [
    "Feature 1 with clear business benefit",
    "Feature 2 with clear business benefit",
    "Feature 3 with clear business benefit",
    "Feature 4 with clear business benefit"
  ],
  "estimatedTimeline": "e.g. 2 to 4 business days",
  "investmentEstimate": "e.g. LKR 35,000 - 42,000 ($140 USD) or $250 - $350 USD",
  "whatsappPitch": "Pre-crafted message that client can forward to Founder Shanthapriya Silva on WhatsApp",
  "spokenAudioScript": "A warm, natural 2-sentence conversational voice script that the avatar speaks out loud to the user"
}
`;

/**
 * Robust fallback generator if Gemini API key is missing or network is unreachable.
 * Ensures zero downtime and 100% error-free user experience.
 */
export function generateHeuristicProposal(
  userPrompt: string,
  language: 'en' | 'si',
  region: 'lk' | 'global'
): AIProposalResponse {
  const promptLower = userPrompt.toLowerCase();
  const isEn = language === 'en';
  const isLk = region === 'lk';

  if (promptLower.includes('bake') || promptLower.includes('cake') || promptLower.includes('pastry') || promptLower.includes('කේක්') || promptLower.includes('බේකරි')) {
    return {
      businessTitle: isEn ? "Artisan Bakery & Cake Studio" : "Artisan Bakery & Custom Cake Studio",
      executiveSummary: isEn
        ? "Turn Instagram food cravings into instant paid orders with a mobile-first digital cake builder and 1-tap WhatsApp checkout."
        : "Instagram සහ Facebook හරහා එන පාරිභෝගිකයින්ට කේක් සහ බේකරි නිෂ්පාදන කෙළින්ම WhatsApp හරහා ඇනවුම් කළ හැකි සුපිරි විසඳුම.",
      recommendedArchitecture: isEn
        ? "Mobile-First React + Instant WhatsApp Cart + Google Maps SEO"
        : "Mobile-First React + Instant WhatsApp Cart + Google Maps SEO",
      keyFeatures: isEn
        ? [
            "1-Tap WhatsApp Cart with zero app installation needed",
            "Custom cake size & flavour selector for accurate pricing",
            "Google Maps local bakery search ranking optimization",
            "Lightning-fast mobile loading for Facebook/Instagram ads"
          ]
        : [
            "කිසිම App එකක් නැතිව Phone එකෙන්ම 1-Tap WhatsApp Order කිරීම",
            "කේක් Flavour සහ බර තෝරාගත හැකි Interactive Selector එකක්",
            "Google Maps හරහා අවට සිටින අයට ඔබේ කඩය මුලින්ම පෙන්වීම",
            "Facebook / Instagram Ads වලින් එන අයට තත්පරයෙන් Load වීම"
          ],
      estimatedTimeline: isEn ? "2 to 3 business days" : "දින 2 - 3ක් ඇතුළත",
      investmentEstimate: isLk ? "LKR 35,000 - 45,000 ($140 USD)" : "$180 - $280 USD",
      whatsappPitch: isEn
        ? `Hi Shanthapriya, I used your AI Receptionist to plan my Bakery & Cake business website (${isLk ? 'LKR 35,000 - 45,000' : '$180 - $280'}). Let's discuss starting!`
        : `ආයුබෝවන් ශාන්තප්‍රිය, මම ඔබේ AI Receptionist හරහා මගේ Bakery & Cake ව්‍යාපාරයට සැලැස්මක් සකස් කරගත්තා (${isLk ? 'රු. 35,000 - 45,000' : '$180 - $280'}). අපි මේ ගැන කතා කරමු!`,
      spokenAudioScript: isEn
        ? "I have designed a high-conversion bakery blueprint for you! Customers can pick flavours and order straight to your WhatsApp."
        : "ඔබේ බේකරි ව්‍යාපාරයට ගැළපෙන විශිෂ්ට සැලැස්මක් මම සකස් කළා! WhatsApp හරහා කෙළින්ම orders ගන්න පුළුවන්."
    };
  }

  if (promptLower.includes('salon') || promptLower.includes('spa') || promptLower.includes('clinic') || promptLower.includes('hair') || promptLower.includes('සැලෝන්') || promptLower.includes('කොණ්ඩ')) {
    return {
      businessTitle: isEn ? "Luxury Salon & Aesthetics Clinic" : "Luxury Salon & Spa Booking Platform",
      executiveSummary: isEn
        ? "Eliminate booking phone call chaos. Enable clients to book available stylist time slots 24/7 with zero double bookings."
        : "Phone calls වලට උත්තර දෙමින් රස්තියාදු නොවී, පාරිභෝගිකයින්ට තමන්ට කැමති වෙලාව සහ Stylist වෙන් කරගත හැකි ස්වයංක්‍රීය ක්‍රමය.",
      recommendedArchitecture: isEn
        ? "Real-time Slot Booking Engine + WhatsApp Reminders + SMS Gateway"
        : "Real-time Slot Booking Engine + WhatsApp Reminders",
      keyFeatures: isEn
        ? [
            "Interactive service menu with prices and estimated duration",
            "Automated WhatsApp appointment confirmations and reminders",
            "Zero double-bookings with smart calendar sync",
            "Client portfolio showcase with Instagram live sync"
          ]
        : [
            "මිල ගණන් සහ ගතවන කාලය සහිත පැහැදිලි Service Menu එක",
            "Appointment එකක් දැමූ සැණින් WhatsApp එකට confirmation එකක්",
            "එකම වෙලාවට දෙදෙනෙක් book වීම වළක්වන Smart Calendar එකක්",
            "ඔබේ ලස්සනම වැඩ පෙන්වන High-Resolution Portfolio එකක්"
          ],
      estimatedTimeline: isEn ? "3 to 4 business days" : "දින 3 - 4ක් ඇතුළත",
      investmentEstimate: isLk ? "LKR 30,000 - 42,000 ($120 USD)" : "$200 - $320 USD",
      whatsappPitch: isEn
        ? `Hi Shanthapriya, I used your AI Receptionist to plan my Salon & Clinic booking website (${isLk ? 'LKR 30,000 - 42,000' : '$200 - $320'}). Let's review the details!`
        : `ආයුබෝවන් ශාන්තප්‍රිය, මම ඔබේ AI Receptionist හරහා Salon & Clinic Booking සයිට් එකකට සැලැස්මක් සකස් කළා (${isLk ? 'රු. 30,000 - 42,000' : '$200 - $320'}). අපි මේ ගැන කතාබහ කරමු!`,
      spokenAudioScript: isEn
        ? "Here is your salon booking blueprint. Your clients can now book appointments 24/7 directly without calling you repeatedly."
        : "ඔබේ සැලෝන් එකට ගැළපෙන Booking පද්ධතිය සූදානම්. පාරිභෝගිකයින්ට දවසේ ඕනෑම වෙලාවක වෙලාවන් වෙන් කරගත හැක."
    };
  }

  if (promptLower.includes('real estate') || promptLower.includes('property') || promptLower.includes('villa') || promptLower.includes('land') || promptLower.includes('ඉඩම්') || promptLower.includes('ගෙවල්')) {
    return {
      businessTitle: isEn ? "High-Ticket Real Estate & Property Advisory" : "Real Estate & Luxury Property Showcase",
      executiveSummary: isEn
        ? "Project ultimate trust and international authority for high-net-worth property buyers and investors with virtual walkthroughs."
        : "ඉඩම් සහ නිවාස සොයන ඉහළ පෙළේ ගැනුම්කරුවන්ගේ උපරිම විශ්වාසය දිනාගෙන VIP WhatsApp inquiries ලබාගැනීමේ ක්‍රමය.",
      recommendedArchitecture: isEn
        ? "Spatial Showcase + Automated WhatsApp VIP Routing + Google SEO"
        : "Spatial Showcase + Automated WhatsApp VIP Routing + Google SEO",
      keyFeatures: isEn
        ? [
            "Ultra-clean property catalog with filtering by location and price",
            "High-resolution interactive photo and virtual walkthroughs",
            "1-Click WhatsApp VIP inquiry routing directly to the lead agent",
            "SEO optimized for overseas diaspora buyers searching on Google"
          ]
        : [
            "මිල සහ ප්‍රදේශය අනුව පහසුවෙන් ඉඩම්/ගෙවල් තෝරාගත හැකි Catalog එක",
            "විදේශගත ගැනුම්කරුවන් සඳහා High-Resolution Virtual Gallery එක",
            "කෙළින්ම Agent ගේ WhatsApp එකට එන 1-Click VIP Inquiry Engine එක",
            "Google Search වල ඉහළින්ම පෙන්වන Local & Overseas SEO Setup එක"
          ],
      estimatedTimeline: isEn ? "4 to 5 business days" : "දින 4 - 5ක් ඇතුළත",
      investmentEstimate: isLk ? "LKR 50,000 - 75,000 ($200 USD)" : "$350 - $550 USD",
      whatsappPitch: isEn
        ? `Hi Shanthapriya, I reviewed the AI Real Estate blueprint (${isLk ? 'LKR 50,000 - 75,000' : '$350 - $550'}). I want to launch this high-ticket property showcase.`
        : `ආයුබෝවන් ශාන්තප්‍රිය, මම Real Estate Showcase එකකට සැලැස්මක් බැලුවා (${isLk ? 'රු. 50,000 - 75,000' : '$350 - $550'}). අපි මේක සාකච්ඡා කරමු.`,
      spokenAudioScript: isEn
        ? "I have configured an authority-focused real estate showcase for you, built to impress serious high-net-worth investors."
        : "ඉහළ වටිනාකමක් ඇති ඉඩම් සහ නිවාස සඳහා උපරිම විශ්වාසය ගොඩනැගෙන සැලැස්මක් මම සකස් කළා."
    };
  }

  // Default Custom Business Solution
  return {
    businessTitle: isEn ? "Tailored Mobile-First Business Platform" : "ඔබේ ව්‍යාපාරයටම සුවිශේෂී වූ Mobile-First Digital විසඳුම",
    executiveSummary: isEn
      ? "Turn everyday visitors into paying customers with lightning-fast mobile architecture, Google local ranking, and direct WhatsApp conversion."
      : "Google සහ Social Media වලින් එන පාරිභෝගිකයින්ව කෙළින්ම ඔබේ WhatsApp එකට ගෙන්වා ගෙන විකුණුම් වැඩි කරගත හැකි ක්‍රමය.",
    recommendedArchitecture: isEn
      ? "Modern Ultra-Fast SPA + Direct WhatsApp Conversion + Google Search Setup"
      : "Modern Ultra-Fast SPA + Direct WhatsApp Conversion + Google Search Setup",
    keyFeatures: isEn
      ? [
          "Direct 1-tap WhatsApp communication with pre-filled inquiries",
          "Free 1 Year Cloud SSD Hosting and custom domain connection",
          "Google Search and Google Maps registration for organic discoverability",
          "Zero recurring monthly maintenance fees with 100% full ownership"
        ]
      : [
          "පාරිභෝගිකයින්ට එක ක්ලික් එකෙන් WhatsApp හරහා සම්බන්ධ වීමේ හැකියාව",
          "නොමිලේ වසරක Cloud SSD Hosting සහ Custom Domain සම්බන්ධ කිරීම",
          "Google Search සහ Google Maps හි ඔබේ ව්‍යාපාරය ලියාපදිංචි කිරීම",
          "කිසිදු සැඟවුණු මාසික ගාස්තු නැතිව 100% ඔබේම අයිතිය සහිතව වැඩේ නිම කිරීම"
        ],
    estimatedTimeline: isEn ? "2 to 4 business days" : "දින 2 - 4ක් ඇතුළත",
    investmentEstimate: isLk ? "LKR 28,000 - 45,000 ($110 - $160 USD)" : "$150 - $280 USD",
    whatsappPitch: isEn
      ? `Hi Shanthapriya, I used your AI Receptionist to plan a tailored website for my business (${isLk ? 'LKR 28,000 - 45,000' : '$150 - $280'}). Let's connect!`
      : `ආයුබෝවන් ශාන්තප්‍රිය, මම ඔබේ AI Receptionist හරහා මගේ ව්‍යාපාරයට සැලැස්මක් බැලුවා (${isLk ? 'රු. 28,000 - 45,000' : '$150 - $280'}). අපි මේ ගැන කතාබහ කරමු!`,
    spokenAudioScript: isEn
      ? "I have prepared a custom, high-converting digital blueprint tailored specifically for your business goals. Take a look below!"
      : "ඔබගේ ව්‍යාපාරික අවශ්‍යතාවයට 100% ක් ගැළපෙන ඩිජිටල් සැලැස්ම මම සකස් කළා. පහත විස්තර බලන්න!"
  };
}
