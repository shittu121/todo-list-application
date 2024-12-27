import { useState, useEffect } from 'react';

// Define the type for the hook's return type
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Create a media query list using the provided query string
    const mediaQueryList = window.matchMedia(query);

    // Define the change handler with the correct event type
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches); // Update state when the media query matches
    };

    // Set the initial state
    setMatches(mediaQueryList.matches);

    // Add the event listener to handle future changes
    mediaQueryList.addEventListener('change', handleChange);

    // Cleanup on unmount
    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query]); // Only re-run effect if the query changes

  return matches;
};

export default useMediaQuery;
