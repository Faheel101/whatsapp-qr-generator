import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { countries, Country } from '@/lib/countries';
import { validateAndFormatPhone, PhoneValidationResult } from '@/lib/phone';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  country: string;
  onCountryChange: (country: string) => void;
  onValidationChange: (result: PhoneValidationResult) => void;
}

export function PhoneInput({ 
  value, 
  onChange, 
  country, 
  onCountryChange, 
  onValidationChange 
}: PhoneInputProps) {
  const [validation, setValidation] = useState<PhoneValidationResult>({ isValid: false });

  useEffect(() => {
    if (value && country) {
      const result = validateAndFormatPhone(value, country);
      setValidation(result);
      onValidationChange(result);
    } else {
      const result = { isValid: false };
      setValidation(result);
      onValidationChange(result);
    }
  }, [value, country, onValidationChange]);

  const selectedCountry = countries.find(c => c.iso2 === country);

  return (
    <div className="space-y-2">
      <Label htmlFor="phone">Phone Number</Label>
      <div className="flex gap-2">
        <Select value={country} onValueChange={onCountryChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue>
              {selectedCountry && (
                <div className="flex items-center gap-2">
                  <span>{selectedCountry.flag}</span>
                  <span className="text-sm">{selectedCountry.dialCode}</span>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {countries.map((country) => (
              <SelectItem key={country.iso2} value={country.iso2}>
                <div className="flex items-center gap-2">
                  <span>{country.flag}</span>
                  <span className="text-sm">{country.name}</span>
                  <span className="text-xs text-muted-foreground">{country.dialCode}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="flex-1">
          <Input
            id="phone"
            type="tel"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter phone number"
            className={validation.error ? 'border-red-500' : ''}
          />
          {validation.error && (
            <p className="text-sm text-red-500 mt-1">{validation.error}</p>
          )}
          {validation.isValid && validation.formatted && (
            <p className="text-sm text-green-600 mt-1">✓ {validation.formatted}</p>
          )}
        </div>
      </div>
    </div>
  );
}