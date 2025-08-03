import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * 
 * Automatically scrolls to the top of the page when the route changes.
 * This fixes the common issue where navigating between pages maintains
 * the previous page's scroll position.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top whenever the pathname changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Optional: adds smooth scrolling animation
    });
  }, [pathname]);

  // This component doesn't render anything visible
  return null;
};

export default ScrollToTop;