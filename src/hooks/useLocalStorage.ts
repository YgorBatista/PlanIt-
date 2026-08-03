// hooks/useLocalStorage.ts
import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string | null,
  initialValue: T
) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (!key) return;

    const stored = localStorage.getItem(key);

    if (stored) {
      setValue(JSON.parse(stored));
    }
  }, [key]);

  useEffect(() => {
    if (!key) return;

    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}