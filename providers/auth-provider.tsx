"use client"

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isSignedIn, userId } = useAuth();

  useEffect(() => {
    const createSessionKey = async () => {
      if (isSignedIn && userId) {
        try {
          console.log("User signed in, creating session key for:", userId);
          const response = await fetch('/api/session-key', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId }),
          });

          if (!response.ok) {
            throw new Error(`Error creating session key: ${response.status}`);
          }

          const data = await response.json();
          console.log('Session key created successfully:', data.sessionKey);
        } catch (error) {
          console.error('Failed to create session key:', error);
        }
      }
    };

    createSessionKey();
  }, [isSignedIn, userId]);

  return <>{children}</>;
} 