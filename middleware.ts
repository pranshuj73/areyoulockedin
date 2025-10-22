import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { getClientIp } from './lib/utils';

let redis: Redis | null = null;
let ratelimit: Ratelimit | null = null;
const SESSION_KEY_HEADER = 'x-session-key';

try {
  redis = Redis.fromEnv();

  ratelimit = new Ratelimit({
    redis: redis,
    // Limit: 4 requests from the same identifier (IP or sessionKey) within a 60-second window
    limiter: Ratelimit.fixedWindow(4, '60 s'),
    analytics: false,
    prefix: '@upstash/ratelimit',
  });
  console.log("Upstash Ratelimit initialized successfully.");

} catch (error) {
  console.error("Failed to initialize Upstash Redis or Ratelimit:", error);
}


export default clerkMiddleware(async (auth, req: NextRequest) => {
  const pathname = req.nextUrl.pathname;

  // Exclude internal cron/system endpoints from rate limiting
  const excludedPaths = ['/api/aggregate', '/api/webhooks/clerk/user-events'];
  const isExcluded = excludedPaths.some(path => pathname.startsWith(path));

  // TODO: update this logic to check only for the post req apis (dont want the leaderboard api to be limited)
  const isApiRoute = pathname.startsWith('/api');

  if (isApiRoute && !isExcluded && ratelimit) {
    let identifier: string | null = null;
    let identifierType: 'Header' | 'IP' | 'Fallback' = 'Fallback'; // Track the source

    // --- Attempt to get sessionKey from request headers ---
    const sessionKeyFromHeader = req.headers.get(SESSION_KEY_HEADER);

    if (sessionKeyFromHeader && sessionKeyFromHeader.trim() !== '') {
      identifier = sessionKeyFromHeader.trim();
      identifierType = 'Header';
      console.log(`Rate limiting identifier found in header '${SESSION_KEY_HEADER}': ${identifier}`);
    } else {
      // Fall back to IP address if header is missing or empty
      const clientIp = getClientIp(req); // Use the expanded function
      if (clientIp) {
        identifier = clientIp;
        identifierType = 'IP';
        // We don't know exactly *which* header succeeded inside getClientIp without more complex return,
        // but we know it came from one of them.
        console.log(`Rate limiting identifier using IP from Request Headers: ${identifier}`);
      } else {
        // --- Final fallback if IP cannot be determined ---
        identifier = '127.0.0.1'; // Use a fixed fallback
        identifierType = 'Fallback';
        console.warn(`Could not determine client IP from any headers. Using fallback identifier: ${identifier}`);
      }
    }

    if (!identifier) {
      // This should be extremely rare with the IP fallback
      console.error("Fatal: Could not determine a rate limit identifier for:", pathname);
      // Block the request if no identifier can be determined (safer than allowing potentially abusive anonymous reqs)
      return new NextResponse(JSON.stringify({ error: 'Internal Server Error: Cannot identify request for rate limiting' }), { status: 500 });
    }

    // --- Perform Rate Limiting ---
    try {
      const { success, limit, remaining, reset } = await ratelimit.limit(identifier);

      // Prepare rate limit headers
      const responseHeaders = new Headers({
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': Math.ceil((reset - Date.now()) / 1000).toString(), // Seconds until reset
        // 'X-RateLimit-Reset-Timestamp': reset.toString(), // Optional: Absolute timestamp (ms)
        'X-RateLimit-Identifier-Type': identifierType, // Indicate which type was used
        // Avoid echoing back the actual session key header in the response for security
      });

      if (!success) {
        console.warn(`Rate limit EXCEEDED for identifier type: ${sessionKeyFromHeader ? 'Header' : 'IP'}, path: ${pathname}. Identifier: ${identifier}`);
        return new NextResponse(
          JSON.stringify({ error: 'Too Many Requests' }),
          {
            status: 429, // HTTP 429 Too Many Requests
            headers: responseHeaders,
          }
        );
      }

      // If rate limit check passes, allow the request and add headers
      console.log(`Rate limit check PASSED for identifier type: ${sessionKeyFromHeader ? 'Header' : 'IP'}, path: ${pathname}. Remaining: ${remaining}. Identifier: ${identifier}`);
      const response = NextResponse.next({
        request: {
          // Pass necessary headers for the downstream handler
          headers: req.headers, // Pass original request headers along
        },
      });

      // Add rate limit headers to the outgoing response
      responseHeaders.forEach((value, key) => {
        response.headers.set(key, value);
      });

      // Add a header indicating rate limiting was applied (optional)
      response.headers.set('X-RateLimit-Applied', 'true');

      return response;

    } catch (error) {
      console.error("Error during Upstash rate limiting check:", error);
      return NextResponse.next();
    }
  }

  return undefined;
});

// Keep your existing matcher config
export const config = {
  matcher: [
    // Skip Next.js internals and static files unless in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
