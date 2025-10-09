
"use client";

import { useEffect } from 'react';

// A simple in-memory flag to prevent the hook from firing for the same-tab updates.
// This is a simple solution for a simple problem.
// For more complex scenarios, a library like BroadcastChannel or a state management library would be better.
let lastUpdate = 0;

export const triggerStorageUpdate = () => {
    lastUpdate = Date.now();
}

export function useLocalStorageSync(key: string, onUpdate: () => void) {
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      // If the change is for the key we are watching and it didn't originate from this tab
      if (event.key === key && event.newValue) {
          if (Date.now() - lastUpdate > 100) { // A small buffer to prevent race conditions
            onUpdate();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, onUpdate]);
}
