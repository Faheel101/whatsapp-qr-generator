import QRCode from 'qrcode';
import jsPDF from 'jspdf';

export interface QROptions {
  size: number;
  margin: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  format: 'png' | 'svg' | 'pdf';
  label?: string;
}

export const defaultQROptions: QROptions = {
  size: 512,
  margin: 4,
  errorCorrectionLevel: 'M',
  format: 'png',
};

export async function generateQRCode(
  text: string,
  options: QROptions = defaultQROptions
): Promise<string> {
  const qrOptions = {
    errorCorrectionLevel: options.errorCorrectionLevel,
    margin: options.margin,
    width: options.size,
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    },
  };

  try {
    if (options.format === 'svg') {
      return await QRCode.toString(text, {
        ...qrOptions,
        type: 'svg',
      });
    } else {
      return await QRCode.toDataURL(text, {
        ...qrOptions,
        type: 'image/png',
      });
    }
  } catch (error) {
    throw new Error('Failed to generate QR code');
  }
}

export async function generateQRPDF(
  text: string,
  options: QROptions = defaultQROptions
): Promise<string> {
  try {
    // Generate QR as data URL first
    const qrDataUrl = await generateQRCode(text, { ...options, format: 'png' });
    
    // Create PDF
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate QR size (max 150mm, centered)
    const qrSize = Math.min(150, pageWidth - 40);
    const x = (pageWidth - qrSize) / 2;
    const y = (pageHeight - qrSize) / 2;
    
    // Add QR code to PDF
    pdf.addImage(qrDataUrl, 'PNG', x, y, qrSize, qrSize);
    
    // Add label if provided
    if (options.label) {
      pdf.setFontSize(12);
      pdf.text(options.label, pageWidth / 2, y + qrSize + 20, { align: 'center' });
    }
    
    return pdf.output('datauristring');
  } catch (error) {
    throw new Error('Failed to generate QR PDF');
  }
}

export async function generatePrintSheet(
  qrCodes: Array<{ text: string; label?: string }>,
  options: QROptions = defaultQROptions
): Promise<string> {
  try {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Grid configuration (3x4 grid)
    const cols = 3;
    const rows = 4;
    const qrSize = 50; // mm
    const spacing = 10; // mm
    
    const startX = (pageWidth - (cols * qrSize + (cols - 1) * spacing)) / 2;
    const startY = 20;
    
    let currentPage = 0;
    
    for (let i = 0; i < qrCodes.length; i++) {
      const row = Math.floor((i % (cols * rows)) / cols);
      const col = (i % (cols * rows)) % cols;
      
      // Add new page if needed
      if (i > 0 && i % (cols * rows) === 0) {
        pdf.addPage();
        currentPage++;
      }
      
      // Generate QR for this item
      const qrDataUrl = await generateQRCode(qrCodes[i].text, { ...options, format: 'png', size: 256 });
      
      // Calculate position
      const x = startX + col * (qrSize + spacing);
      const y = startY + row * (qrSize + spacing + 10);
      
      // Add QR code
      pdf.addImage(qrDataUrl, 'PNG', x, y, qrSize, qrSize);
      
      // Add label
      if (qrCodes[i].label) {
        pdf.setFontSize(8);
        pdf.text(qrCodes[i].label, x + qrSize / 2, y + qrSize + 5, { align: 'center' });
      }
    }
    
    return pdf.output('datauristring');
  } catch (error) {
    throw new Error('Failed to generate print sheet');
  }
}

export function downloadFile(dataUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}