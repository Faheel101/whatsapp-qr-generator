export interface WhatsAppLinkOptions {
  phone: string; // E.164 format
  message?: string;
}

export function generateWhatsAppLink({ phone, message }: WhatsAppLinkOptions): string {
  // Remove the + from E.164 format for wa.me
  const cleanPhone = phone.replace(/^\+/, '');
  
  let link = `https://wa.me/${cleanPhone}`;
  
  if (message && message.trim()) {
    const encodedMessage = encodeURIComponent(message.trim());
    link += `?text=${encodedMessage}`;
  }
  
  return link;
}

export function validateWhatsAppLink(link: string): boolean {
  try {
    const url = new URL(link);
    return url.hostname === 'wa.me' && /^\d+$/.test(url.pathname.slice(1));
  } catch {
    return false;
  }
}

export const messageTemplates = {
  general: "Hi! I'd like to get in touch.",
  business: "Hello! I'm interested in your services.",
  support: "Hi, I need help with something.",
  appointment: "Hello! I'd like to schedule an appointment.",
  inquiry: "Hi! I have a question about your products.",
  feedback: "Hello! I'd like to share some feedback.",
};