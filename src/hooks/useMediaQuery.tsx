
import { useState, useEffect } from 'react';

/**
 * Hook to check if a media query matches
 * then updates to the correct value after mount to prevent hydration mismatches.
 * 
 * @param query - CSS media query string (e.g., '(min-width: 768px)')
 * @returns boolean - true if query matches, false otherwise
 * 
 * @example
 * const isMobile = useMediaQuery('(max-width: 767px)');
 * const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
 * const isDesktop = useMediaQuery('(min-width: 1024px)');
 */
export const useMediaQuery = (query: string): boolean => {
  // Always start with false to match SSR
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Only run on client side
    const mediaQuery = window.matchMedia(query);
    
    // Handler for changes
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Set initial value using Promise to defer setState
    // This schedules the update as a microtask, avoiding synchronous setState in effect
    Promise.resolve().then(() => {
      setMatches(mediaQuery.matches);
    });

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => {
        mediaQuery.removeEventListener('change', handler);
      };
    } 
    // Fallback for older browsers
    else {
      mediaQuery.addListener(handler);
      return () => {
        mediaQuery.removeListener(handler);
      };
    }
  }, [query]);

  return matches;
};


export const useBreakpoint = () => {
  const isSm = useMediaQuery('(min-width: 640px)');
  const isMd = useMediaQuery('(min-width: 768px)');
  const isLg = useMediaQuery('(min-width: 1024px)');
  const isXl = useMediaQuery('(min-width: 1280px)');
  const is2Xl = useMediaQuery('(min-width: 1536px)');

  return {
    isSm,
    isMd,
    isLg,
    isXl,
    is2Xl,
    
    isMobile: !isSm,
    isTablet: isSm && !isLg,
    isDesktop: isLg,
  };
};


export const useCurrentBreakpoint = () => {
  const { isSm, isMd, isLg, isXl, is2Xl } = useBreakpoint();

  if (is2Xl) return '2xl';
  if (isXl) return 'xl';
  if (isLg) return 'lg';
  if (isMd) return 'md';
  if (isSm) return 'sm';
  return 'mobile';
};