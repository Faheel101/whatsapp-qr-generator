import { Layout } from '@/components/Layout';
import { BulkProcessor } from '@/components/BulkProcessor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Zap, Shield, Info } from 'lucide-react';

export default function Bulk() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Upload className="h-12 w-12 text-blue-600" />
            <FileText className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Bulk WhatsApp Generator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload a CSV file and generate hundreds of WhatsApp links and QR codes at once. 
            Perfect for agencies, franchises, and large-scale campaigns.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Process 1000s of rows
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Client-side processing
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              ZIP download
            </Badge>
          </div>
        </div>

        {/* Instructions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                Prepare Your CSV
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3">
                Download our template or prepare your CSV with the required columns.
              </p>
              <div className="text-sm space-y-1">
                <p><strong>Required:</strong> phone</p>
                <p><strong>Optional:</strong> country, message, name, UTM parameters</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                Upload & Process
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3">
                Upload your CSV file and let our tool process all rows automatically.
              </p>
              <div className="text-sm space-y-1">
                <p>• Phone number validation</p>
                <p>• WhatsApp link generation</p>
                <p>• QR code creation</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                Download Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3">
                Get a ZIP file with all generated links, QR codes, and a summary CSV.
              </p>
              <div className="text-sm space-y-1">
                <p>• links.csv with all data</p>
                <p>• qrs/ folder with PNG images</p>
                <p>• errors.csv if any issues</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Important Notes */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Privacy Notice:</strong> All processing happens in your browser. 
            Your CSV data is never uploaded to our servers. The tool works completely offline 
            once the page is loaded.
          </AlertDescription>
        </Alert>

        {/* Main Bulk Processor */}
        <BulkProcessor />

        {/* CSV Format Guide */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">CSV Format Guide</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Required Columns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-600">phone</h4>
                  <p className="text-sm text-muted-foreground">
                    Phone number in E.164 format (e.g., +14155552671) or local format with country column.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Optional Columns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">country</h4>
                  <p className="text-sm text-muted-foreground">
                    ISO 2-letter country code (e.g., US, GB, IN) if phone is not in E.164 format.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">message</h4>
                  <p className="text-sm text-muted-foreground">
                    Prefilled message. Use name variable for personalization.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">name</h4>
                  <p className="text-sm text-muted-foreground">
                    Person's name for template replacement and QR file naming.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">UTM Parameters</h4>
                  <p className="text-sm text-muted-foreground">
                    utm_source, utm_medium, utm_campaign, utm_content, utm_term for tracking.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Example CSV */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Example CSV Content</h3>
          <Card>
            <CardContent className="p-4">
              <pre className="text-sm bg-gray-50 p-4 rounded overflow-x-auto">
{`phone,country,message,name,utm_source,utm_medium,utm_campaign
+14155552671,US,"Hello name!",John Doe,instagram,bio,profile
+442071234567,GB,Hi there!,Jane Smith,email,signature,contact
+919876543210,IN,Welcome to our service,Raj Patel,print,qr,offline`}
              </pre>
            </CardContent>
          </Card>
        </div>

        {/* Use Cases */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Perfect for</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Agencies & Franchises</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Generate unique WhatsApp links and QR codes for each branch, 
                  agent, or client location in minutes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Event Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Create personalized WhatsApp contacts for event staff, 
                  vendors, or information points with custom messages.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Real Estate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Generate property-specific WhatsApp QR codes for listings, 
                  brochures, and signage with tracking parameters.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Customer Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Create department-specific WhatsApp links with 
                  prefilled messages for different support categories.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Marketing Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Bulk generate trackable WhatsApp links for different 
                  campaigns, channels, and audience segments.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Print Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Generate hundreds of QR codes for business cards, 
                  flyers, posters, and product packaging.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}