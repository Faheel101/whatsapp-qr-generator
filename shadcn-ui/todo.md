# WhatsApp Link & QR Generator - MVP Todo

## Core Files to Create/Modify

### 1. Main Pages
- `src/pages/Index.tsx` - Main generator page (Link + QR + UTM combined)
- `src/pages/Bulk.tsx` - Bulk CSV processing page
- `src/pages/About.tsx` - About page with privacy info
- `src/components/Layout.tsx` - Main layout with navigation

### 2. Core Components
- `src/components/LinkBuilder.tsx` - WhatsApp link generation with phone validation
- `src/components/QRGenerator.tsx` - QR code creation and download options
- `src/components/UTMBuilder.tsx` - Campaign URL builder
- `src/components/BulkProcessor.tsx` - CSV upload and processing
- `src/components/LanguageSelector.tsx` - Language switching
- `src/components/PhoneInput.tsx` - Phone number input with country selection

### 3. Utilities & Hooks
- `src/lib/whatsapp.ts` - WhatsApp link generation logic
- `src/lib/qr.ts` - QR code generation utilities
- `src/lib/utm.ts` - UTM parameter handling
- `src/lib/phone.ts` - Phone number validation and formatting
- `src/lib/countries.ts` - Country data with flags and dial codes
- `src/hooks/usePermalink.ts` - URL state management

## MVP Features Priority
1. ✅ Basic WhatsApp link generation
2. ✅ Phone number validation with country selection
3. ✅ QR code generation (PNG, SVG formats)
4. ✅ UTM builder integration
5. ✅ Basic bulk CSV processing
6. ✅ Download functionality
7. ✅ Responsive design
8. ⏳ Multi-language support (English first, then expand)

## Dependencies to Add
- libphonenumber-js (phone validation)
- qrcode (QR generation)
- papaparse (CSV parsing)
- jszip (ZIP creation)
- jspdf (PDF generation)
- react-hook-form (form management)
- zod (validation)

## Implementation Notes
- Start with English only, add i18n structure later
- Focus on core functionality first
- Use localStorage for settings persistence
- Client-side only processing
- Mobile-first responsive design