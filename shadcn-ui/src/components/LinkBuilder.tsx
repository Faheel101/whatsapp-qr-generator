import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Copy, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { PhoneInput } from './PhoneInput';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { PhoneValidationResult } from '@/lib/phone';

interface LinkBuilderProps {
  onLinkGenerated: (link: string) => void;
  utmUrl?: string;
  insertUtmIntoMessage: boolean;
}

export function LinkBuilder({ onLinkGenerated, utmUrl, insertUtmIntoMessage }: LinkBuilderProps) {
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('US');
  const [message, setMessage] = useState('');
  const [validation, setValidation] = useState<PhoneValidationResult>({ isValid: false });
  const [generatedLink, setGeneratedLink] = useState('');

  const finalMessage = insertUtmIntoMessage && utmUrl 
    ? `${message}${message ? '\n\n' : ''}${utmUrl}`
    : message;

  const handleGenerate = () => {
    if (!validation.isValid || !validation.e164) {
      toast.error('Please enter a valid phone number');
      return;
    }

    const link = generateWhatsAppLink({
      phone: validation.e164,
      message: finalMessage,
    });

    setGeneratedLink(link);
    onLinkGenerated(link);
    toast.success('WhatsApp link generated!');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    toast.success('Link copied to clipboard!');
  };

  const openLink = () => {
    window.open(generatedLink, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>WhatsApp Link Builder</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <PhoneInput
          value={phone}
          onChange={setPhone}
          country={country}
          onCountryChange={setCountry}
          onValidationChange={setValidation}
        />

        <div className="space-y-2">
          <Label htmlFor="message">Prefilled Message (Optional)</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a message that will be prefilled in WhatsApp..."
            rows={4}
            maxLength={4096}
          />
          <div className="text-xs text-muted-foreground text-right">
            {finalMessage.length}/4096 characters
          </div>
          {insertUtmIntoMessage && utmUrl && (
            <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
              Campaign URL will be added to the message
            </div>
          )}
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={!validation.isValid}
          className="w-full"
        >
          Generate WhatsApp Link
        </Button>

        {generatedLink && (
          <div className="space-y-3 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="space-y-2">
              <Label>Generated Link</Label>
              <Input
                value={generatedLink}
                readOnly
                className="font-mono text-sm"
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={copyLink} variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Copy Link
              </Button>
              <Button onClick={openLink} variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Test Link
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground">
              Test the link in WhatsApp Web or mobile app to ensure it works correctly.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}