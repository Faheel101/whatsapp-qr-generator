import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import { generateQRCode, generateQRPDF, QROptions, downloadFile, defaultQROptions } from '@/lib/qr';

interface QRGeneratorProps {
  sourceUrl: string;
}

export function QRGenerator({ sourceUrl }: QRGeneratorProps) {
  const [options, setOptions] = useState<QROptions>(defaultQROptions);
  const [qrPreview, setQrPreview] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (sourceUrl) {
      generatePreview();
    }
  }, [sourceUrl, options]);

  const generatePreview = async () => {
    if (!sourceUrl) return;
    
    setIsGenerating(true);
    try {
      const preview = await generateQRCode(sourceUrl, { ...options, format: 'png' });
      setQrPreview(preview);
    } catch (error) {
      toast.error('Failed to generate QR preview');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async (format: 'png' | 'svg' | 'pdf') => {
    if (!sourceUrl) {
      toast.error('Please generate a WhatsApp link first');
      return;
    }

    setIsGenerating(true);
    try {
      let dataUrl: string;
      let filename: string;

      if (format === 'pdf') {
        dataUrl = await generateQRPDF(sourceUrl, { ...options, format });
        filename = 'whatsapp-qr.pdf';
      } else {
        dataUrl = await generateQRCode(sourceUrl, { ...options, format });
        filename = `whatsapp-qr.${format}`;
      }

      downloadFile(dataUrl, filename);
      toast.success(`QR code downloaded as ${format.toUpperCase()}`);
    } catch (error) {
      toast.error(`Failed to generate ${format.toUpperCase()}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>QR Code Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!sourceUrl && (
          <div className="text-center text-muted-foreground py-8">
            Generate a WhatsApp link first to create QR code
          </div>
        )}

        {sourceUrl && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Size (pixels)</Label>
                <Select
                  value={options.size.toString()}
                  onValueChange={(value) => setOptions(prev => ({ ...prev, size: parseInt(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="256">256px (Small)</SelectItem>
                    <SelectItem value="512">512px (Medium)</SelectItem>
                    <SelectItem value="1024">1024px (Large)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Error Correction</Label>
                <Select
                  value={options.errorCorrectionLevel}
                  onValueChange={(value: 'L' | 'M' | 'Q' | 'H') => 
                    setOptions(prev => ({ ...prev, errorCorrectionLevel: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">Low (~7%)</SelectItem>
                    <SelectItem value="M">Medium (~15%)</SelectItem>
                    <SelectItem value="Q">Quartile (~25%)</SelectItem>
                    <SelectItem value="H">High (~30%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Margin: {options.margin}px</Label>
                <Slider
                  value={[options.margin]}
                  onValueChange={(value) => setOptions(prev => ({ ...prev, margin: value[0] }))}
                  max={16}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="label">Label (Optional)</Label>
                <Input
                  id="label"
                  value={options.label || ''}
                  onChange={(e) => setOptions(prev => ({ ...prev, label: e.target.value }))}
                  placeholder="Chat with us on WhatsApp"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                {isGenerating ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : qrPreview ? (
                  <img 
                    src={qrPreview} 
                    alt="QR Code Preview" 
                    className="mx-auto border rounded-lg shadow-sm max-w-[300px]"
                  />
                ) : null}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <Button 
                  onClick={() => handleDownload('png')} 
                  disabled={isGenerating}
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  PNG
                </Button>
                <Button 
                  onClick={() => handleDownload('svg')} 
                  disabled={isGenerating}
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  SVG
                </Button>
                <Button 
                  onClick={() => handleDownload('pdf')} 
                  disabled={isGenerating}
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
              </div>

              <div className="text-xs text-muted-foreground space-y-1">
                <p>• PNG: Best for web use and digital sharing</p>
                <p>• SVG: Vector format, scales perfectly for any size</p>
                <p>• PDF: Ready for professional printing</p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}