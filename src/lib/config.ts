// Central Business & Configuration Constants for Ravana Tech
// සියලුම Social Media, Portfolio සහ Freelance Marketplace Links මෙතනින් එකවර පහසුවෙන් වෙනස් කරගත හැක.

export interface AccountPlatform {
  id: string;
  name: string;
  type: string;
  category: 'core' | 'portfolio' | 'marketplace';
  categoryTitle: string;
  purpose: string;
  url: string;
  username: string;
  status: 'active' | 'coming_soon';
  recommendedSizes?: {
    profile?: string;
    cover?: string;
  };
}

export const SITE_CONFIG = {
  brandName: 'Ravana Tech',
  founderName: 'Shanthapriya Silva',
  founderTitle: 'Founder & Lead Digital Specialist',
  founderExperience:
    '20 years of diverse professional experience combined with an emerging focus on modern web development and AI-assisted digital solutions.',
  tagline: 'Simple Websites for Growing Small Businesses',
  supportingMessage:
    'Ravana Tech helps small businesses in Sri Lanka plan, build and launch clean, mobile-friendly websites that make it easier for customers to find, contact and book them online.',
  pillarQuote: 'AI-Assisted. Business-Focused. Human-Guided.',
  phoneDisplay: '+94 78 847 0610',
  phoneTel: '+94788470610',
  whatsappNumber: '94788470610',
  email: 'info.ravanatech@gmail.com',
  officialEmail: 'hello.ravanatech@gmail.com',
  siteUrl: 'https://ravanatech.com',
  firebaseProjectId: 'raavanaatec',
  targetCountry: 'Sri Lanka',
  pricingSummary: 'Transparent custom quotations tailored to your exact business scope',
  facebookUrl: 'https://web.facebook.com/RavanaTechOfficial',
  githubUrl: 'https://github.com/ravanatech-official',
};

// ============================================================================
// RAVANA TECH — OFFICIAL ACCOUNT & SOCIAL ECOSYSTEM (15 PLATFORMS)
// මෙහි ඇති ඕනෑම link එකක් ඔබ account එක හැදූ පසු කෙලින්ම update කරන්න.
// ============================================================================
export const ACCOUNT_ECOSYSTEM: Record<string, AccountPlatform> = {
  // --------------------------------------------------------------------------
  // 🔴 CORE — අනිවාර්යයෙන්ම හදන ප්‍රධාන නාලිකා 8 (Direct Leads & Reach)
  // --------------------------------------------------------------------------
  facebook: {
    id: 'facebook',
    name: 'Facebook',
    type: 'Business Page',
    category: 'core',
    categoryTitle: 'Core Lead & Discovery Channels',
    purpose: 'Sri Lankan local reach + leads - main discovery',
    url: 'https://web.facebook.com/RavanaTechOfficial',
    username: '@RavanaTechOfficial',
    status: 'active',
    recommendedSizes: {
      profile: '1080x1080, 320x320',
      cover: '1640x924 + 820x312 (Light & Dark)',
    },
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    type: 'Professional / Business',
    category: 'core',
    categoryTitle: 'Core Lead & Discovery Channels',
    purpose: 'Visual portfolio + Reels + DMs',
    url: 'https://www.instagram.com/ravanatechofficial',
    username: '@ravanatechofficial',
    status: 'coming_soon',
    recommendedSizes: {
      profile: '1080x1080, 2048x2048 HD',
      cover: 'Story/Reel 1080x1920',
    },
  },
  whatsapp: {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    type: 'WhatsApp Business',
    category: 'core',
    categoryTitle: 'Core Lead & Discovery Channels',
    purpose: 'Primary lead channel - 1-Tap Chat on WhatsApp CTA',
    url: 'https://wa.me/94788470610?text=Hi%20Shanthapriya,%20I%20am%20interested%20in%20a%20website%20for%20my%20business.',
    username: '+94 78 847 0610',
    status: 'active',
    recommendedSizes: {
      profile: '1080x1080 + 640x640',
      cover: 'Catalog images 800x800',
    },
  },
  linkedinPersonal: {
    id: 'linkedinPersonal',
    name: 'LinkedIn (Founder)',
    type: 'Shanthapriya Personal Profile',
    category: 'core',
    categoryTitle: 'Core Lead & Discovery Channels',
    purpose: 'Founder credibility - 20 years professional story',
    url: 'https://www.linkedin.com/in/shanthapriya-silva',
    username: 'Shanthapriya Silva',
    status: 'coming_soon',
    recommendedSizes: {
      profile: '800x800',
      cover: 'Personal Cover 1584x396',
    },
  },
  linkedinCompany: {
    id: 'linkedinCompany',
    name: 'LinkedIn (Company)',
    type: 'Ravana Tech Company Page',
    category: 'core',
    categoryTitle: 'Core Lead & Discovery Channels',
    purpose: 'Brand credibility & B2B presence',
    url: 'https://www.linkedin.com/company/ravanatech',
    username: 'Ravana Tech',
    status: 'coming_soon',
    recommendedSizes: {
      profile: 'Logo 400x400 + 800x800',
      cover: 'Company Cover 1536x768 + 1128x191',
    },
  },
  youtube: {
    id: 'youtube',
    name: 'YouTube',
    type: 'Ravana Tech Channel',
    category: 'core',
    categoryTitle: 'Core Lead & Discovery Channels',
    purpose: 'Project walkthroughs + small-business website education',
    url: 'https://www.youtube.com/@RavanaTechOfficial',
    username: '@RavanaTechOfficial',
    status: 'coming_soon',
    recommendedSizes: {
      profile: '800x800 + 2048x2048',
      cover: 'Banner 2560x1440, Safe area 1235x338 center',
    },
  },
  tiktok: {
    id: 'tiktok',
    name: 'TikTok',
    type: 'Business Account',
    category: 'core',
    categoryTitle: 'Core Lead & Discovery Channels',
    purpose: 'Discovery + short-form video demonstration',
    url: 'https://www.tiktok.com/@ravanatechofficial',
    username: '@ravanatechofficial',
    status: 'coming_soon',
    recommendedSizes: {
      profile: '2048x2048 HD',
    },
  },
  threads: {
    id: 'threads',
    name: 'Threads',
    type: 'Ravana Tech Profile',
    category: 'core',
    categoryTitle: 'Core Lead & Discovery Channels',
    purpose: 'Text/community presence & digital advice',
    url: 'https://www.threads.net/@ravanatechofficial',
    username: '@ravanatechofficial',
    status: 'coming_soon',
    recommendedSizes: {
      profile: '1080x1080',
    },
  },

  // --------------------------------------------------------------------------
  // 🟡 SEARCH & PORTFOLIO — සෙවුම් සහ වෘත්තීය නාමාවලිය 5 (Authority & SEO)
  // --------------------------------------------------------------------------
  googleBusiness: {
    id: 'googleBusiness',
    name: 'Google Business Profile',
    type: 'Search & Maps Listing',
    category: 'portfolio',
    categoryTitle: 'Search Discovery & Creative Portfolio',
    purpose: 'Google Search/Maps discovery - local Sri Lanka SEO',
    url: 'https://maps.google.com/?q=Ravana+Tech+Sri+Lanka',
    username: 'Ravana Tech Sri Lanka',
    status: 'coming_soon',
    recommendedSizes: {
      profile: 'Logo 720x720 + 2048 HD',
      cover: 'Cover 1024x576',
    },
  },
  pinterest: {
    id: 'pinterest',
    name: 'Pinterest Business',
    type: 'Visual Discovery',
    category: 'portfolio',
    categoryTitle: 'Search Discovery & Creative Portfolio',
    purpose: 'Visual discovery - website ideas & layout pins',
    url: 'https://www.pinterest.com/ravanatechofficial',
    username: '@ravanatechofficial',
    status: 'coming_soon',
    recommendedSizes: {
      profile: '1000x1000 HD',
      cover: 'Board covers 600x600',
    },
  },
  x: {
    id: 'x',
    name: 'X (Twitter)',
    type: 'Professional Account',
    category: 'portfolio',
    categoryTitle: 'Search Discovery & Creative Portfolio',
    purpose: 'Brand protection + modern tech presence',
    url: 'https://x.com/RavanaTech',
    username: '@RavanaTech',
    status: 'coming_soon',
    recommendedSizes: {
      profile: '400x400 + 2048 HD',
      cover: 'Header 1500x500 Light + Dark',
    },
  },
  github: {
    id: 'github',
    name: 'GitHub',
    type: 'Personal + Ravana Tech Org',
    category: 'portfolio',
    categoryTitle: 'Search Discovery & Creative Portfolio',
    purpose: 'Technical credibility - source code & open demos',
    url: 'https://github.com/ravanatech-official',
    username: 'ravanatech-official',
    status: 'active',
    recommendedSizes: {
      profile: 'Personal 1000x1000, Org 1000x1000',
    },
  },
  behance: {
    id: 'behance',
    name: 'Behance',
    type: 'Creative Portfolio',
    category: 'portfolio',
    categoryTitle: 'Search Discovery & Creative Portfolio',
    purpose: 'High-fidelity design showcases and website concept mockups',
    url: 'https://www.behance.net/ravanatech',
    username: 'ravanatech',
    status: 'coming_soon',
    recommendedSizes: {
      profile: '1000x1000 HD',
      cover: 'Cover 1400x800 HD',
    },
  },

  // --------------------------------------------------------------------------
  // 🔵 FREELANCE MARKETPLACES — ගෝලීය වෙළඳපොළ 2 (High-Ticket & Global Reach)
  // --------------------------------------------------------------------------
  fiverr: {
    id: 'fiverr',
    name: 'Fiverr Pro / Seller',
    type: 'Seller Profile & Website Gigs',
    category: 'marketplace',
    categoryTitle: 'Global Freelance Marketplaces',
    purpose: 'International freelance leads - small business websites & WhatsApp integrations',
    url: 'https://www.fiverr.com/ravanatech',
    username: 'ravanatech',
    status: 'coming_soon',
    recommendedSizes: {
      profile: '400x400, 800x800, 1000x1000 HD',
      cover: 'Gig Cover 712x430 (standard) + HD 1280x769',
    },
  },
  upwork: {
    id: 'upwork',
    name: 'Upwork',
    type: 'Freelancer & Agency Profile',
    category: 'marketplace',
    categoryTitle: 'Global Freelance Marketplaces',
    purpose: 'High-ticket international business clients & long-term contracts',
    url: 'https://www.upwork.com/freelancers/~ravanatech',
    username: 'Ravana Tech',
    status: 'coming_soon',
    recommendedSizes: {
      profile: '400x400 + 1000x1000 HD',
      cover: 'Project Catalog 1280x769',
    },
  },
};

// Aliases for compatibility
ACCOUNT_ECOSYSTEM.linkedin_company = ACCOUNT_ECOSYSTEM.linkedinCompany;
ACCOUNT_ECOSYSTEM.x_twitter = ACCOUNT_ECOSYSTEM.x;
ACCOUNT_ECOSYSTEM.linkedin_personal = ACCOUNT_ECOSYSTEM.linkedinPersonal;
ACCOUNT_ECOSYSTEM.google_business = ACCOUNT_ECOSYSTEM.googleBusiness;

// Helper to filter platforms by category
export const getAccountsByCategory = (category: 'core' | 'portfolio' | 'marketplace') => {
  return Object.values(ACCOUNT_ECOSYSTEM).filter((acc) => acc.category === category);
};
