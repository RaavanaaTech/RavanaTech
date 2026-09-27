export type NavPage = 'home' | 'services' | 'projects' | 'about' | 'blog' | 'contact' | 'privacy';

export interface ConceptProject {
  id: string; // e.g. 'bakery', 'cafe', 'salon', 'flora', 'real-estate', 'personal-trainer'
  slug: string; // e.g. 'bakery', 'cafe', 'salon', 'flora', 'real-estate', 'personal-trainer'
  title: string;
  category: 'food' | 'beauty' | 'retail' | 'realestate' | 'fitness';
  categoryLabel: string;
  tagline: string;
  targetBusiness: string;
  problem: string;
  solution: string;
  tags: string[];
  mainImage: string;
  galleryImages: string[];
  challenge: string;
  approach: string;
  features: string[];
  techStack: string[];
  demonstrationOutcome: string;
  demoUrl: string; // Direct link to full live concept demo, e.g. '/demo/bakery'
  previewData?: {
    accentColor: string;
    sampleItems?: { name: string; price: string; desc: string; tag?: string }[];
    sampleStats?: { label: string; value: string }[];
    sampleActionText?: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  targetBusinesses: string[];
  problemSolved: string;
  deliverables: string[];
  startingPrice?: string;
  pricingModel?: string;
  ctaText: string;
  iconName: string;
}

export interface PricingPackage {
  name: string;
  startingPrice?: string;
  badge?: string;
  description: string;
  features: string[];
  idealFor: string;
  scopeSummary?: string;
  turnaround?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedDate: string;
  author: string;
  coverImage?: string;
  content: string[]; // Structured paragraphs/subheadings
  relatedServiceId?: string;
}

export interface InquiryRecord {
  id?: string;
  name: string;
  businessName: string;
  businessType: string;
  phone: string;
  need: string;
  message: string;
  budget?: string;
  referralSource?: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt?: any;
  source: string;
  customizingConceptId?: string | null;
  customizingConceptTitle?: string | null;
}
