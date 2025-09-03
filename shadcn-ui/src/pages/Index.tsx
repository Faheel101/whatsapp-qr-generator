import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { LinkBuilder } from '@/components/LinkBuilder';
import { QRGenerator } from '@/components/QRGenerator';
import { UTMBuilder } from '@/components/UTMBuilder';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, QrCode, BarChart3, Shield, Zap, Globe } from 'lucide-react';

export default function Index() {
  const [generatedLink, setGeneratedLink] = useState('');
  const [utmUrl, setUtmUrl] = useState('');
  const [insertUtmIntoMessage, setInsertUtmIntoMessage] = useState(false);

  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <MessageCircle className="h-12 w-12 text-green-600" />
            <QrCode className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            WhatsApp Link & QR Generator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create WhatsApp click-to-chat links, generate QR codes, and build UTM campaigns. 
            100% free, privacy-first, and works entirely in your browser.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Privacy First
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              No Sign-up Required
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              Works Offline
            </Badge>
          </div>
        </div>

        {/* Main Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <LinkBuilder 
              onLinkGenerated={setGeneratedLink}
              utmUrl={utmUrl}
              insertUtmIntoMessage={insertUtmIntoMessage}
            />
            
            <UTMBuilder 
              onUrlGenerated={setUtmUrl}
              insertIntoMessage={insertUtmIntoMessage}
              onInsertToggle={setInsertUtmIntoMessage}
            />
          </div>

          <div>
            <QRGenerator sourceUrl={generatedLink} />
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-green-600" />
                Smart Link Builder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Generate official WhatsApp wa.me links with phone validation, 
                country selection, and prefilled messages.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5 text-blue-600" />
                Professional QR Codes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Create high-quality QR codes in PNG, SVG, and PDF formats. 
                Perfect for print materials and digital use.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                UTM Campaign Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Build trackable campaign URLs with UTM parameters. 
                Measure your WhatsApp marketing effectiveness.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do WhatsApp click-to-chat links work?</AccordionTrigger>
                <AccordionContent>
                  WhatsApp click-to-chat links use the format wa.me/PHONENUMBER to open a chat 
                  with a specific number. You can add ?text= to prefill a message. These links 
                  work on both mobile and desktop WhatsApp.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Is my data safe and private?</AccordionTrigger>
                <AccordionContent>
                  Yes! All processing happens entirely in your browser. We don't store, collect, 
                  or transmit any of your phone numbers, messages, or generated links to our servers. 
                  Your privacy is our top priority.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>What QR code formats are supported?</AccordionTrigger>
                <AccordionContent>
                  We support PNG (for web use), SVG (vector format that scales perfectly), 
                  and PDF (ready for professional printing). You can also customize size, 
                  error correction level, and margins.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>How do UTM parameters help with tracking?</AccordionTrigger>
                <AccordionContent>
                  UTM parameters are tags you add to URLs to track where your traffic comes from. 
                  When someone clicks your WhatsApp link with UTM tags, you can see in Google Analytics 
                  which campaigns, sources, and mediums are driving conversations.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Can I use this for business purposes?</AccordionTrigger>
                <AccordionContent>
                  Absolutely! This tool is perfect for businesses, marketers, and agencies. 
                  Use it to create WhatsApp contact buttons for websites, QR codes for print materials, 
                  or bulk generate links for multiple locations or team members.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>What's the difference between the formats?</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>PNG:</strong> Best for websites and digital sharing</li>
                    <li><strong>SVG:</strong> Vector format that scales to any size without quality loss</li>
                    <li><strong>PDF:</strong> Professional format ready for high-quality printing</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 prose prose-gray max-w-4xl mx-auto">
          <h2>Complete WhatsApp Marketing Solution</h2>
          <p>
            Our free WhatsApp Link and QR Code Generator provides everything you need to connect 
            with customers through WhatsApp. Whether you're a small business owner looking to add 
            a "Chat with us" button to your website, a marketer tracking campaign performance, 
            or an agency managing multiple clients, our tools make it simple and professional.
          </p>
          
          <h3>Perfect for Every Use Case</h3>
          <ul>
            <li><strong>Small Businesses:</strong> Add WhatsApp contact options to websites, social media, and print materials</li>
            <li><strong>Restaurants & Retail:</strong> Create QR codes for menus, storefronts, and product packaging</li>
            <li><strong>Real Estate:</strong> Generate property-specific WhatsApp links for instant inquiries</li>
            <li><strong>Event Organizers:</strong> Bulk create QR codes for different event staff or information points</li>
            <li><strong>Digital Marketers:</strong> Track WhatsApp campaign performance with UTM parameters</li>
          </ul>

          <h3>Why Choose Our Generator?</h3>
          <p>
            Unlike other tools, we prioritize your privacy and provide professional-grade features 
            completely free. All processing happens in your browser, ensuring your data never 
            leaves your device. Our QR codes are optimized for both digital and print use, 
            with customizable error correction and sizing options.
          </p>
        </div>
      </div>
    </Layout>
  );
}