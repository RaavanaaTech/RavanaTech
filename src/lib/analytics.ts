import { analytics } from './firebase';
import { logEvent } from 'firebase/analytics';

export type AnalyticsEventName =
  | 'whatsapp_click'
  | 'call_click'
  | 'email_click'
  | 'project_view'
  | 'project_demo_open'
  | 'project_demo_cta'
  | 'contact_form_start'
  | 'contact_form_submit_success'
  | 'contact_form_submit_error'
  | 'service_cta'
  | 'cv_download'
  | 'blog_cta'
  | 'faq_open'
  | 'external_link_click';

export interface AnalyticsEventParams {
  page_path?: string;
  project_slug?: string;
  service_name?: string;
  cta_location?: string;
  category?: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  [key: string]: unknown;
}

// Safely track events without exposing PII
export const trackEvent = (
  eventName: AnalyticsEventName,
  params: AnalyticsEventParams = {}
) => {
  try {
    // Read UTM tags if present in current URL
    const urlParams = new URLSearchParams(window.location.search);
    const utm_source = urlParams.get('utm_source') || undefined;
    const utm_medium = urlParams.get('utm_medium') || undefined;
    const utm_campaign = urlParams.get('utm_campaign') || undefined;

    const enrichedParams: AnalyticsEventParams = {
      page_path: window.location.pathname,
      ...params,
      ...(utm_source ? { utm_source } : {}),
      ...(utm_medium ? { utm_medium } : {}),
      ...(utm_campaign ? { utm_campaign } : {}),
    };

    if (analytics) {
      logEvent(analytics, eventName, enrichedParams);
    }

    // Also trigger custom browser event if needed for debugging or testing
    if ((import.meta as any).env?.DEV) {
      console.log(`[Analytics Event] ${eventName}:`, enrichedParams);
    }
  } catch (err) {
    // Fail silently in non-supported environments (e.g. ad blockers or offline mode)
    if ((import.meta as any).env?.DEV) {
      console.warn(`[Analytics error logging ${eventName}]`, err);
    }
  }
};
