import { useState, useCallback } from "react";

//hook that will debounce a function and return loading state alongside it
export default function useDebounce(fn: Function, ms: number) {
  const [isLoading, setIsLoading] = useState(false);

  function debounce(fn: Function, ms: number) {
    let timeoutId: NodeJS.Timeout | null = null;

    return function (...args: any[]) {
      setIsLoading(true);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(async () => {
        await fn(...args);
        timeoutId = null;
        setIsLoading(false);
      }, ms);
    };
  }

  const debouncedFn = useCallback(debounce(fn, ms), []);

  return { isLoading, debouncedFn };
}
