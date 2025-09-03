import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Globe, Heart, Code, Users } from 'lucide-react';

export default function About() {
  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            About QR2Chat
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We believe in making WhatsApp marketing accessible, private, and professional for everyone. 
            Our free tools help businesses connect with customers while respecting their privacy.
          </p>
        </div>

        {/* Mission */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Heart className="h-6 w-6 text-red-500" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg text-muted-foreground">
              <p>
                To provide free, privacy-first tools that empower businesses of all sizes to leverage 
                WhatsApp for customer communication. We believe that powerful marketing tools shouldn't 
                require expensive subscriptions or compromise your data privacy.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Privacy First
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All processing happens in your browser. We never see, store, or transmit your 
                  phone numbers, messages, or generated links. Your data stays with you.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  Always Free
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No hidden costs, no premium tiers, no feature limitations. Our core tools 
                  will always be completely free for everyone to use.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-purple-600" />
                  Globally Accessible
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Works in any country, supports international phone formats, and designed 
                  to be fast and reliable worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How It Works */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-blue-600" />
                  100% Client-Side Processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our tools run entirely in your web browser using JavaScript. When you enter a phone number 
                  or upload a CSV file, all processing happens on your device. Nothing is sent to our servers, 
                  ensuring complete privacy and security.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  Built for Real Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We've designed every feature based on real-world needs from small businesses, marketers, 
                  and agencies. From phone number validation to bulk processing, every tool solves actual 
                  problems people face when creating WhatsApp marketing materials.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>WhatsApp Link Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">
                  Create official wa.me links with proper phone number validation and prefilled messages.
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline">Phone Validation</Badge>
                  <Badge variant="outline">Country Selection</Badge>
                  <Badge variant="outline">Message Templates</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>QR Code Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">
                  Generate high-quality QR codes in multiple formats, optimized for both digital and print use.
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline">PNG/SVG/PDF</Badge>
                  <Badge variant="outline">Custom Sizing</Badge>
                  <Badge variant="outline">Print Ready</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>UTM Campaign Builder</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">
                  Build trackable campaign URLs with UTM parameters to measure your WhatsApp marketing effectiveness.
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline">Campaign Tracking</Badge>
                  <Badge variant="outline">Quick Presets</Badge>
                  <Badge variant="outline">Analytics Ready</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bulk Processing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">
                  Upload CSV files and generate hundreds of WhatsApp links and QR codes at once.
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline">CSV Upload</Badge>
                  <Badge variant="outline">ZIP Download</Badge>
                  <Badge variant="outline">Error Reporting</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Privacy Promise */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Shield className="h-6 w-6" />
                Our Privacy Promise
              </CardTitle>
            </CardHeader>
            <CardContent className="text-green-700 space-y-4">
              <ul className="space-y-2">
                <li>✓ No data collection - we don't store any of your information</li>
                <li>✓ No user accounts required - use all features without signing up</li>
                <li>✓ No tracking cookies - we respect your browsing privacy</li>
                <li>✓ Open source friendly - our methods are transparent</li>
                <li>✓ Works offline - once loaded, no internet connection needed</li>
              </ul>
              <p className="text-sm">
                We're committed to maintaining these standards. If you have any privacy concerns 
                or questions, please don't hesitate to reach out.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Disclaimer */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Important Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-2">
              <p>
                QR2Chat is not affiliated with, endorsed by, or connected to WhatsApp Inc. or Meta Platforms, Inc. 
                WhatsApp is a trademark of WhatsApp Inc.
              </p>
              <p>
                We use the official WhatsApp wa.me link format as documented in WhatsApp's public API documentation. 
                Our tools simply help you create these links more easily and professionally.
              </p>
              <p>
                Please ensure you comply with WhatsApp's Terms of Service and local regulations when using 
                WhatsApp for business communications.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}