import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { buildUTMUrl, validateUrl, utmPresets, UTMParameters } from '@/lib/utm';

interface UTMBuilderProps {
  onUrlGenerated: (url: string) => void;
  insertIntoMessage: boolean;
  onInsertToggle: (insert: boolean) => void;
}

export function UTMBuilder({ onUrlGenerated, insertIntoMessage, onInsertToggle }: UTMBuilderProps) {
  const [baseUrl, setBaseUrl] = useState('');
  const [utmParams, setUtmParams] = useState<UTMParameters>({
    source: '',
    medium: '',
    campaign: '',
    content: '',
    term: '',
  });
  const [generatedUrl, setGeneratedUrl] = useState('');

  const handlePresetSelect = (presetName: string) => {
    const preset = utmPresets.find(p => p.name === presetName);
    if (preset) {
      setUtmParams(prev => ({
        ...prev,
        ...preset.params,
      }));
    }
  };

  const handleGenerate = () => {
    if (!baseUrl) {
      toast.error('Please enter a base URL');
      return;
    }

    if (!validateUrl(baseUrl)) {
      toast.error('Please enter a valid URL');
      return;
    }

    if (!utmParams.source || !utmParams.medium || !utmParams.campaign) {
      toast.error('Please fill in required UTM parameters (source, medium, campaign)');
      return;
    }

    try {
      const url = buildUTMUrl(baseUrl, utmParams);
      setGeneratedUrl(url);
      onUrlGenerated(url);
      toast.success('Campaign URL generated!');
    } catch (error) {
      toast.error('Failed to generate URL');
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(generatedUrl);
    toast.success('URL copied to clipboard!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>UTM Campaign Builder</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="baseUrl">Base URL *</Label>
          <Input
            id="baseUrl"
            type="url"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="https://example.com"
          />
        </div>

        <div className="space-y-2">
          <Label>Quick Presets</Label>
          <Select onValueChange={handlePresetSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a preset..." />
            </SelectTrigger>
            <SelectContent>
              {utmPresets.map((preset) => (
                <SelectItem key={preset.name} value={preset.name}>
                  <div>
                    <div className="font-medium">{preset.name}</div>
                    <div className="text-xs text-muted-foreground">{preset.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="source">UTM Source *</Label>
            <Input
              id="source"
              value={utmParams.source}
              onChange={(e) => setUtmParams(prev => ({ ...prev, source: e.target.value }))}
              placeholder="instagram"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medium">UTM Medium *</Label>
            <Input
              id="medium"
              value={utmParams.medium}
              onChange={(e) => setUtmParams(prev => ({ ...prev, medium: e.target.value }))}
              placeholder="bio"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="campaign">UTM Campaign *</Label>
            <Input
              id="campaign"
              value={utmParams.campaign}
              onChange={(e) => setUtmParams(prev => ({ ...prev, campaign: e.target.value }))}
              placeholder="profile"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">UTM Content</Label>
            <Input
              id="content"
              value={utmParams.content}
              onChange={(e) => setUtmParams(prev => ({ ...prev, content: e.target.value }))}
              placeholder="button"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="term">UTM Term</Label>
            <Input
              id="term"
              value={utmParams.term}
              onChange={(e) => setUtmParams(prev => ({ ...prev, term: e.target.value }))}
              placeholder="keyword"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="insert-utm"
            checked={insertIntoMessage}
            onCheckedChange={onInsertToggle}
          />
          <Label htmlFor="insert-utm">Insert campaign URL into WhatsApp message</Label>
        </div>

        <Button onClick={handleGenerate} className="w-full">
          Build Campaign URL
        </Button>

        {generatedUrl && (
          <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="space-y-2">
              <Label>Generated Campaign URL</Label>
              <Input
                value={generatedUrl}
                readOnly
                className="font-mono text-sm"
              />
            </div>
            
            <Button onClick={copyUrl} variant="outline" size="sm">
              <Copy className="h-4 w-4 mr-2" />
              Copy URL
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}