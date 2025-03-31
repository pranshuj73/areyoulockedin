"use client";

import { useUser } from "@clerk/nextjs";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  sessionKey: string | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  sessionKey: null,
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded, user } = useUser();
  const [sessionKey, setSessionKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initSession = async () => {
      if (!isLoaded || !user) {
        setIsLoading(false);
        return;
      }

      try {
        // Check if we have a sessionKey in localStorage
        const storedSessionKey = localStorage.getItem(`sessionKey-${user.id}`);
        
        if (storedSessionKey) {
          setSessionKey(storedSessionKey);
          setIsLoading(false);
          return;
        }

        // Try to get Twitter account if available
        let twitterId = undefined;
        if (user.externalAccounts && user.externalAccounts.length > 0) {
          const twitterAccount = user.externalAccounts.find(
            account => account.provider === 'twitter'
          );
          if (twitterAccount) {
            twitterId = twitterAccount.username || undefined;
          }
        }

        // Generate a new sessionKey
        const response = await fetch('/api/session-key', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            username: user.username || user.firstName || undefined,
            twitterId,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate session key');
        }

        const data = await response.json();
        
        // Store in localStorage for future use
        localStorage.setItem(`sessionKey-${user.id}`, data.sessionKey);
        setSessionKey(data.sessionKey);
      } catch (error) {
        console.error('Error initializing session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initSession();
  }, [isLoaded, user]);

  return (
    <AuthContext.Provider value={{ sessionKey, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
} 