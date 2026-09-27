import { SITE_CONFIG } from './config';
import { trackEvent } from './analytics';

export interface WhatsAppMessageParams {
  source?: string;
  name?: string;
  businessName?: string;
  phone?: string;
  need?: string;
  conceptTitle?: string;
  message?: string;
  budget?: string;
}

export const buildWhatsAppUrl = (params: WhatsAppMessageParams = {}): string => {
  const parts: string[] = ['*Website Inquiry (Ravana Tech)*'];

  if (params.conceptTitle) {
    parts.push(`• Base Concept: ${params.conceptTitle}`);
  }
  if (params.name) {
    parts.push(`• Client Name: ${params.name}`);
  }
  if (params.businessName) {
    parts.push(`• Business: ${params.businessName}`);
  }
  if (params.phone) {
    parts.push(`• Contact: ${params.phone}`);
  }
  if (params.need) {
    parts.push(`• Service/Need: ${params.need}`);
  }
  if (params.budget && params.budget !== 'Not specified') {
    parts.push(`• Budget Range: ${params.budget}`);
  }
  if (params.message) {
    parts.push(`• Project Notes: ${params.message}`);
  } else if (!params.conceptTitle) {
    parts.push('• Message: Hi Shanthapriya, I would like to discuss a website for my business.');
  }

  const encodedText = encodeURIComponent(parts.join('\n'));
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodedText}`;
};

export const openWhatsApp = (params: WhatsAppMessageParams = {}, ctaLocation = 'unknown') => {
  trackEvent('whatsapp_click', {
    cta_location: ctaLocation,
    service_name: params.need,
    project_slug: params.conceptTitle,
    source: params.source,
  });

  const url = buildWhatsAppUrl(params);
  window.open(url, '_blank', 'noopener,noreferrer');
};
