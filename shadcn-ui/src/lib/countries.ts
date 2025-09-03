export interface Country {
  iso2: string;
  name: string;
  dialCode: string;
  flag: string;
}

export const countries: Country[] = [
  { iso2: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
  { iso2: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
  { iso2: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
  { iso2: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
  { iso2: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
  { iso2: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
  { iso2: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹' },
  { iso2: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸' },
  { iso2: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷' },
  { iso2: 'MX', name: 'Mexico', dialCode: '+52', flag: '🇲🇽' },
  { iso2: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
  { iso2: 'PK', name: 'Pakistan', dialCode: '+92', flag: '🇵🇰' },
  { iso2: 'BD', name: 'Bangladesh', dialCode: '+880', flag: '🇧🇩' },
  { iso2: 'ID', name: 'Indonesia', dialCode: '+62', flag: '🇮🇩' },
  { iso2: 'MY', name: 'Malaysia', dialCode: '+60', flag: '🇲🇾' },
  { iso2: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬' },
  { iso2: 'TH', name: 'Thailand', dialCode: '+66', flag: '🇹🇭' },
  { iso2: 'PH', name: 'Philippines', dialCode: '+63', flag: '🇵🇭' },
  { iso2: 'VN', name: 'Vietnam', dialCode: '+84', flag: '🇻🇳' },
  { iso2: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳' },
  { iso2: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵' },
  { iso2: 'KR', name: 'South Korea', dialCode: '+82', flag: '🇰🇷' },
  { iso2: 'RU', name: 'Russia', dialCode: '+7', flag: '🇷🇺' },
  { iso2: 'TR', name: 'Turkey', dialCode: '+90', flag: '🇹🇷' },
  { iso2: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦' },
  { iso2: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪' },
  { iso2: 'EG', name: 'Egypt', dialCode: '+20', flag: '🇪🇬' },
  { iso2: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦' },
  { iso2: 'NG', name: 'Nigeria', dialCode: '+234', flag: '🇳🇬' },
  { iso2: 'KE', name: 'Kenya', dialCode: '+254', flag: '🇰🇪' },
];

export const getCountryByIso2 = (iso2: string): Country | undefined => {
  return countries.find(country => country.iso2 === iso2);
};

export const getCountryByDialCode = (dialCode: string): Country | undefined => {
  return countries.find(country => country.dialCode === dialCode);
};