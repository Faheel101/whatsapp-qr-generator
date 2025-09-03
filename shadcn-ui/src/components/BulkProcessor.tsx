import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Download, FileText, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import Papa from 'papaparse';
import JSZip from 'jszip';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { validateAndFormatPhone } from '@/lib/phone';
import { generateQRCode, downloadFile } from '@/lib/qr';
import { buildUTMUrl } from '@/lib/utm';

interface BulkRow {
  phone: string;
  country?: string;
  message?: string;
  name?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

interface ProcessedRow extends BulkRow {
  row_no: number;
  wa_url?: string;
  campaign_url?: string;
  error?: string;
}

export function BulkProcessor() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{
    processed: ProcessedRow[];
    errors: ProcessedRow[];
    total: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setResults(null);
    } else {
      toast.error('Please select a valid CSV file');
    }
  };

  const downloadTemplate = () => {
    const template = 'phone,country,message,name,utm_source,utm_medium,utm_campaign\n+14155552671,US,"Hello {{name}}!",John Doe,instagram,bio,profile\n+442071234567,GB,Hi there!,Jane Smith,email,signature,contact\n+919876543210,IN,Welcome to our service,,,print,qr,offline';
    
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    downloadFile(url, 'bulk-template.csv');
    URL.revokeObjectURL(url);
  };

  const processCSV = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);

    try {
      const text = await file.text();
      const parsed = Papa.parse<BulkRow>(text, {
        header: true,
        skipEmptyLines: true,
      });

      if (parsed.errors.length > 0) {
        toast.error('CSV parsing errors detected');
        return;
      }

      const rows = parsed.data;
      const processed: ProcessedRow[] = [];
      const errors: ProcessedRow[] = [];

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const processedRow: ProcessedRow = {
          ...row,
          row_no: i + 1,
        };

        try {
          // Validate phone number
          const phoneValidation = validateAndFormatPhone(
            row.phone,
            row.country || 'US'
          );

          if (!phoneValidation.isValid || !phoneValidation.e164) {
            throw new Error(phoneValidation.error || 'Invalid phone number');
          }

          // Process message template
          let message = row.message || '';
          if (message && row.name) {
            message = message.replace(/\{\{name\}\}/g, row.name);
          }

          // Generate WhatsApp link
          const waUrl = generateWhatsAppLink({
            phone: phoneValidation.e164,
            message,
          });
          processedRow.wa_url = waUrl;

          // Generate campaign URL if UTM params provided
          if (row.utm_source && row.utm_medium && row.utm_campaign) {
            try {
              const campaignUrl = buildUTMUrl(waUrl, {
                source: row.utm_source,
                medium: row.utm_medium,
                campaign: row.utm_campaign,
                content: row.utm_content,
                term: row.utm_term,
              });
              processedRow.campaign_url = campaignUrl;
            } catch (utmError) {
              // UTM error is not critical, continue without campaign URL
            }
          }

          processed.push(processedRow);
        } catch (error) {
          processedRow.error = error instanceof Error ? error.message : 'Unknown error';
          errors.push(processedRow);
        }

        setProgress(((i + 1) / rows.length) * 100);
      }

      setResults({
        processed,
        errors,
        total: rows.length,
      });

      toast.success(`Processed ${processed.length} rows successfully`);
    } catch (error) {
      toast.error('Failed to process CSV file');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadResults = async () => {
    if (!results) return;

    const zip = new JSZip();

    // Create links CSV
    const linksData = results.processed.map(row => ({
      row_no: row.row_no,
      phone: row.phone,
      name: row.name || '',
      wa_url: row.wa_url || '',
      campaign_url: row.campaign_url || '',
    }));

    const linksCsv = Papa.unparse(linksData);
    zip.file('links.csv', linksCsv);

    // Create errors CSV if there are errors
    if (results.errors.length > 0) {
      const errorsCsv = Papa.unparse(results.errors);
      zip.file('errors.csv', errorsCsv);
    }

    // Generate QR codes for successful rows
    const qrFolder = zip.folder('qrs');
    if (qrFolder) {
      for (let i = 0; i < Math.min(results.processed.length, 100); i++) {
        const row = results.processed[i];
        if (row.wa_url) {
          try {
            const qrDataUrl = await generateQRCode(row.wa_url, {
              size: 512,
              margin: 4,
              errorCorrectionLevel: 'M',
              format: 'png',
            });
            
            // Convert data URL to blob
            const response = await fetch(qrDataUrl);
            const blob = await response.blob();
            
            const cleanName = (row.name || row.phone).replace(/[^a-zA-Z0-9]/g, '_');
            const filename = row.row_no + '_' + cleanName + '.png';
            qrFolder.file(filename, blob);
          } catch (error) {
            console.warn('Failed to generate QR for row ' + row.row_no);
          }
        }
      }
    }

    // Generate and download ZIP
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const zipUrl = URL.createObjectURL(zipBlob);
    downloadFile(zipUrl, 'whatsapp-bulk-results.zip');
    URL.revokeObjectURL(zipUrl);

    toast.success('Results downloaded successfully!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={downloadTemplate} variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Download Template
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="csv-file">Upload CSV File</Label>
            <Input
              id="csv-file"
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              ref={fileInputRef}
            />
          </div>

          {file && (
            <Alert>
              <FileText className="h-4 w-4" />
              <AlertDescription>
                Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </AlertDescription>
            </Alert>
          )}

          <Button 
            onClick={processCSV} 
            disabled={!file || isProcessing}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Process CSV
              </>
            )}
          </Button>

          {isProcessing && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground text-center">
                {progress.toFixed(0)}% complete
              </p>
            </div>
          )}

          {results && (
            <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">{results.processed.length}</div>
                  <div className="text-sm text-muted-foreground">Successful</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">{results.errors.length}</div>
                  <div className="text-sm text-muted-foreground">Errors</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{results.total}</div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </div>
              </div>

              {results.errors.length > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {results.errors.length} rows had errors and will be included in errors.csv
                  </AlertDescription>
                </Alert>
              )}

              <Button onClick={downloadResults} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Results ZIP
              </Button>

              <div className="text-xs text-muted-foreground">
                <p>ZIP contains:</p>
                <ul className="list-disc list-inside ml-2">
                  <li>links.csv - All generated links and data</li>
                  <li>qrs/ folder - QR code images (PNG format)</li>
                  {results.errors.length > 0 && <li>errors.csv - Rows with errors</li>}
                </ul>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}