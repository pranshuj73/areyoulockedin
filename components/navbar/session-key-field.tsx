"use client"

import { useState } from "react"
import { CheckIcon, CopyIcon, EyeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from '@/components/ui/skeleton';

interface SessionKeyFieldProps {
  className?: string
}

async function fetchSessionKey(): Promise<string | null> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const apiUrl = `${baseUrl}/api/session-key`;

  console.log("Attempting to fetch session key from:", apiUrl);

  try {
    const res = await fetch(apiUrl, {
      method: 'GET',
      next: {
        revalidate: 900, // Revalidate cache every 900 seconds (15 minutes)
        tags: ['session-key'],
      },
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      const errorBody = await res.text().catch(() => 'Could not read error body'); // Prevent error if body read fails
      console.error(`API Error: ${res.status} ${res.statusText}`);
      console.error("Error body:", errorBody);
      return null;
    }

    const result = await res.json();

    if (!result || typeof result.sessionKey !== 'string' || !result.sessionKey) { // More robust check
      console.error("Invalid data structure or empty session key received from API:", result);
      return null;
    }

    console.log(`Successfully fetched session key.`);
    localStorage.setItem('sessionKey', result.sessionKey); // Store in local storage
    localStorage.setItem('sessionKeyLastUpdated', new Date().toISOString()); // Store the last updated time
    return result.sessionKey;

  } catch (error) {
    console.error("Failed to fetch session key data:", error);
    return null;
  }
}

export function SessionKeyField({ className }: SessionKeyFieldProps) {
  const [sessionKey, setSessionKey] = useState<string | null>(null)
  const [sessionKeyFetchErr, setSessionKeyFetchErr] = useState<boolean>(false)
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const copyToClipboard = async () => {
    try {
      if (sessionKey) {
        await navigator.clipboard.writeText(sessionKey)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const getKey = async () => {
    setIsLoading(true);
    const key = await fetchSessionKey();
    if (key === null) {
      setSessionKeyFetchErr(true);
    } else {
      setSessionKey(key);
    }
    setIsLoading(false);
  };

  return (
    <div className={`flex flex-col gap-1.5 bg-transparent text-current ${className}`}>
      <label className="text-sm font-medium">Session Key</label>

      {sessionKeyFetchErr ? (
        <p className='text-red-600 mt-4'>Session key for your account could not be retrieved. Please drop an email at <a href="mailto:support@areyoulocked.in">support@areyoulocked.in</a></p>
      ) : (
        <div className="flex w-full items-center gap-2">
          {isLoading ? (
            <Skeleton className="opacity-25 h-10 w-full" />
          ) : (
            <Input
              value={sessionKey ? sessionKey : "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"}
              readOnly
              type={sessionKey ? "text" : "password"}
              className="flex-1 !bg-transparent !text-current border-black/30"
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
          )}
          <Button
            variant="default"
            size="icon"
            onClick={sessionKey !== null ? copyToClipboard : getKey}
            className="h-10 w-10 shrink-0 !bg-transparent !text-current border border-black/30"
            aria-label="Copy to clipboard"
          >
            {(sessionKey !== null) ? ((copied) ? <CheckIcon className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4" />) : <EyeIcon className="h-4 w-4" />}
          </Button>
        </div>
      )}
    </div>
  )
}
