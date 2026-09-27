export interface InquiryInput {
  name: string;
  businessName: string;
  businessType: string;
  phone: string;
  need: string;
  message: string;
  budget?: string;
  referralSource?: string;
  honeypot?: string; // Bot trap field
  formStartTime?: number; // Timing trap for bots
  customizingConceptId?: string | null;
  customizingConceptTitle?: string | null;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  sanitizedData?: {
    name: string;
    businessName: string;
    businessType: string;
    phone: string;
    need: string;
    message: string;
    budget: string;
    referralSource: string;
    customizingConceptId: string | null;
    customizingConceptTitle: string | null;
  };
}

export const validateInquiry = (input: InquiryInput): ValidationResult => {
  const errors: Record<string, string> = {};

  // 1. Anti-spam honeypot verification
  if (input.honeypot && input.honeypot.trim().length > 0) {
    return {
      isValid: false,
      errors: { general: 'Spam detected. Submission ignored.' },
    };
  }

  // 2. Minimum submission duration (must take at least 1.5 seconds)
  if (input.formStartTime && Date.now() - input.formStartTime < 1500) {
    return {
      isValid: false,
      errors: { general: 'Form submitted too rapidly. Please review your details and retry.' },
    };
  }

  // 3. Name validation
  const trimmedName = (input.name || '').trim();
  if (!trimmedName) {
    errors.name = 'Please provide your name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  } else if (trimmedName.length > 80) {
    errors.name = 'Name cannot exceed 80 characters.';
  }

  // 4. Business name validation
  const trimmedBusiness = (input.businessName || '').trim();
  if (!trimmedBusiness) {
    errors.businessName = 'Please provide your business or project name.';
  } else if (trimmedBusiness.length > 100) {
    errors.businessName = 'Business name cannot exceed 100 characters.';
  }

  // 5. Phone / WhatsApp validation
  const trimmedPhone = (input.phone || '').trim().replace(/[\s-]/g, '');
  if (!trimmedPhone) {
    errors.phone = 'Please provide a valid phone or WhatsApp number.';
  } else if (trimmedPhone.length < 9 || trimmedPhone.length > 18) {
    errors.phone = 'Please enter a valid phone number (e.g. 0771234567 or +94771234567).';
  }

  // 6. What do you need validation
  const trimmedNeed = (input.need || '').trim();
  if (!trimmedNeed) {
    errors.need = 'Please select or describe what kind of website you need.';
  }

  // 7. Message validation (optional or short notes)
  const trimmedMessage = (input.message || '').trim();
  if (trimmedMessage.length > 1000) {
    errors.message = 'Notes cannot exceed 1000 characters.';
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    errors: {},
    sanitizedData: {
      name: trimmedName,
      businessName: trimmedBusiness,
      businessType: (input.businessType || 'General Small Business').trim().slice(0, 60),
      phone: trimmedPhone,
      need: trimmedNeed.slice(0, 150),
      message: trimmedMessage,
      budget: (input.budget || 'Not specified').trim().slice(0, 50),
      referralSource: (input.referralSource || 'Direct').trim().slice(0, 50),
      customizingConceptId: input.customizingConceptId || null,
      customizingConceptTitle: input.customizingConceptTitle || null,
    },
  };
};
