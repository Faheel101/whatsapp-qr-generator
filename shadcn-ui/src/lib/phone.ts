import { parsePhoneNumber, isValidPhoneNumber, CountryCode } from 'libphonenumber-js';

export interface PhoneValidationResult {
  isValid: boolean;
  e164?: string;
  formatted?: string;
  error?: string;
}

export function validateAndFormatPhone(
  phoneInput: string,
  countryCode: string
): PhoneValidationResult {
  try {
    // Clean the input
    const cleanPhone = phoneInput.replace(/[^\d+]/g, '');
    
    if (!cleanPhone) {
      return { isValid: false, error: 'Phone number is required' };
    }

    // Parse with country code
    const phoneNumber = parsePhoneNumber(cleanPhone, countryCode as CountryCode);
    
    if (!phoneNumber) {
      return { isValid: false, error: 'Invalid phone number format' };
    }

    if (!phoneNumber.isValid()) {
      return { isValid: false, error: 'Invalid phone number for selected country' };
    }

    return {
      isValid: true,
      e164: phoneNumber.format('E.164'),
      formatted: phoneNumber.formatInternational(),
    };
  } catch (error) {
    return { 
      isValid: false, 
      error: 'Invalid phone number format' 
    };
  }
}

export function isValidPhone(phone: string, countryCode: string): boolean {
  try {
    return isValidPhoneNumber(phone, countryCode as CountryCode);
  } catch {
    return false;
  }
}