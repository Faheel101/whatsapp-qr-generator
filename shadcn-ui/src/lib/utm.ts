export interface UTMParameters {
  source: string;
  medium: string;
  campaign: string;
  content?: string;
  term?: string;
}

export interface UTMPreset {
  name: string;
  description: string;
  params: Partial<UTMParameters>;
}

export const utmPresets: UTMPreset[] = [
  {
    name: 'Instagram Bio',
    description: 'Link in Instagram bio',
    params: { source: 'instagram', medium: 'bio', campaign: 'profile' }
  },
  {
    name: 'Email Signature',
    description: 'Link in email signature',
    params: { source: 'email', medium: 'signature', campaign: 'contact' }
  },
  {
    name: 'Print QR Code',
    description: 'QR code on printed materials',
    params: { source: 'print', medium: 'qr', campaign: 'offline' }
  },
  {
    name: 'Facebook Ad',
    description: 'Facebook advertising campaign',
    params: { source: 'facebook', medium: 'cpc', campaign: 'ads' }
  },
  {
    name: 'Google Ads',
    description: 'Google advertising campaign',
    params: { source: 'google', medium: 'cpc', campaign: 'ads' }
  },
  {
    name: 'Website Button',
    description: 'Button on website',
    params: { source: 'website', medium: 'button', campaign: 'contact' }
  },
];

export function buildUTMUrl(baseUrl: string, params: UTMParameters): string {
  try {
    const url = new URL(baseUrl);
    
    // Add UTM parameters
    url.searchParams.set('utm_source', params.source);
    url.searchParams.set('utm_medium', params.medium);
    url.searchParams.set('utm_campaign', params.campaign);
    
    if (params.content) {
      url.searchParams.set('utm_content', params.content);
    }
    
    if (params.term) {
      url.searchParams.set('utm_term', params.term);
    }
    
    return url.toString();
  } catch (error) {
    throw new Error('Invalid URL format');
  }
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}