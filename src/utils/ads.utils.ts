/**
 * Utilities for advertisement contact parsing and formatting.
 */

export interface ParsedAdContact {
  phone: string | null;
  email: string | null;
  websiteUrl: string | null;
  location: string | null;
  rawContactInfo: string | null;
}

/**
 * Robustly parses contact information from an Ad object, supporting:
 * - Direct fields: websiteUrl, location, phone, email
 * - Legacy delimited strings: "phone | email" or "phone | email | website"
 * - Plain single phone or email strings
 * - Null or undefined values without crashing
 */
export function parseAdContactInfo(ad: any): ParsedAdContact {
  if (!ad) {
    return {
      phone: null,
      email: null,
      websiteUrl: null,
      location: null,
      rawContactInfo: null,
    };
  }

  let phone: string | null = ad.phone || ad.contactPhone || null;
  let email: string | null = ad.email || ad.contactEmail || null;
  let websiteUrl: string | null = ad.websiteUrl || ad.website || null;
  const location: string | null = ad.location?.trim() || null;
  const rawContactInfo: string | null = ad.contactInfo?.trim() || null;

  if (rawContactInfo) {
    if (rawContactInfo.includes(' | ')) {
      const parts = rawContactInfo.split(' | ').map((p: string) => p.trim());
      for (const part of parts) {
        if (!part) continue;
        if (!email && part.includes('@') && !part.startsWith('http')) {
          email = part;
        } else if (!websiteUrl && (part.startsWith('http://') || part.startsWith('https://') || part.startsWith('www.'))) {
          websiteUrl = part.startsWith('www.') ? `https://${part}` : part;
        } else if (!phone) {
          phone = part;
        }
      }
    } else {
      // Single value without delimiter
      if (!email && rawContactInfo.includes('@') && !rawContactInfo.startsWith('http')) {
        email = rawContactInfo;
      } else if (!websiteUrl && (rawContactInfo.startsWith('http://') || rawContactInfo.startsWith('https://') || rawContactInfo.startsWith('www.'))) {
        websiteUrl = rawContactInfo.startsWith('www.') ? `https://${rawContactInfo}` : rawContactInfo;
      } else if (!phone) {
        phone = rawContactInfo;
      }
    }
  }

  // Ensure websiteUrl has protocol if missing
  if (websiteUrl && !websiteUrl.startsWith('http://') && !websiteUrl.startsWith('https://')) {
    if (websiteUrl.includes('.')) {
      websiteUrl = `https://${websiteUrl}`;
    }
  }

  return {
    phone: phone ? phone.trim() : null,
    email: email ? email.trim() : null,
    websiteUrl: websiteUrl ? websiteUrl.trim() : null,
    location,
    rawContactInfo,
  };
}
