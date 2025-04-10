"use client"

import { UserButton, } from '@clerk/nextjs'
import { KeyRoundIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { CopyField } from '../ui/copy-data-field';

const SessionKeyIcon = () => (
  <KeyRoundIcon className='text-current size-4' />
)

async function fetchSessionKey(): Promise<string | null> {
  const now = Date.now();
  const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);

  const localSessionKey = localStorage.getItem('sessionKey');
  const sessionKeyLastUpdatedValue = localStorage.getItem('sessionKeyLastUpdated');

  if (localSessionKey && sessionKeyLastUpdatedValue) {
    const sessionKeyLastUpdated = new Date(sessionKeyLastUpdatedValue);
    if (sessionKeyLastUpdated < twentyFourHoursAgo) {
      console.log(`Using session key from local storage.`);
      return localSessionKey;
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const apiUrl = `${baseUrl}/api/session-key`;

  console.log("Attempting to fetch session key from:", apiUrl);

  try {
    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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

export default function NavUserButton() {
  const [sessionKey, setSessionKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getKey = async () => {
      setIsLoading(true);
      const key = await fetchSessionKey();
      setSessionKey(key);
      setIsLoading(false);
    };

    getKey();
  }, []);

  return (
    <UserButton fallback={<Skeleton className='size-7 rounded-full' />}>
      <UserButton.MenuItems>
        <UserButton.Action label="Session Key" labelIcon={<SessionKeyIcon />} open="session-key" />
      </UserButton.MenuItems>

      <UserButton.UserProfilePage label="Session Key" labelIcon={<SessionKeyIcon />} url="session-key">
        <h1 className='font-semibold'>Session Key</h1>
        <hr className='opacity-10 my-4' />
        <p className='mb-6'>Here you can find and copy your session key to be used in your extension.</p>

        {isLoading ? (
          <Skeleton className="h-10 w-full mt-4" /> // Show skeleton while loading
        ) : sessionKey ? (
          <CopyField value={sessionKey} label='Session Key' />
        ) : (
          <p className='text-red-600 mt-4'>Session key for your account could not be retrieved.</p> // More specific error message
        )}
      </UserButton.UserProfilePage>
    </UserButton>
  )
}
