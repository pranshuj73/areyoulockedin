import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { NextRequest } from "next/server"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getClientIp(req: NextRequest): string | null {
  // Define header priorities (lowercase for case-insensitive lookup)
  // Adjust the order based on your specific infrastructure if needed.
  const ipHeaderCandidates = [
    'cf-connecting-ip',     // Cloudflare
    'x-real-ip',            // Common Nginx proxy header
    'x-forwarded-for',      // Standard, potentially comma-separated list
    'true-client-ip',       // Cloudflare (alternative/older?) / Akamai
    'x-client-ip',          // Less common
    // 'forwarded',         // RFC 7239, more complex parsing, less common adoption
    // Example: Forwarded: for=192.0.2.60;proto=http;by=203.0.113.43
    // Parsing 'for=' would be needed here.
  ];

  for (const header of ipHeaderCandidates) {
    const headerValue = req.headers.get(header);
    if (headerValue) {
      // For 'x-forwarded-for', take the first IP from the list
      if (header === 'x-forwarded-for') {
        const firstIp = headerValue.split(',')[0].trim();
        if (firstIp) return firstIp;
      } else {
        // For other headers, assume they contain a single IP
        const trimmedValue = headerValue.trim();
        if (trimmedValue) return trimmedValue;
      }
    }
  }

  // Note: In local 'next dev', these headers might not be present.
  // Vercel and other platforms usually set 'x-forwarded-for' correctly.

  // Fallback if no specific IP headers are found
  return null;
}
