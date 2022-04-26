import { useEffect } from 'react'

type Asd = ReturnType<typeof setTimeout>;

/**
 * Debounce a function by time
 */
export default function useDebounce(handler: () => void, deps: any, delay: number) {
  useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      handler();
    }, delay);
    return () => {
      clearTimeout(timeoutHandler);
    };
  }, [deps, delay]);
}