
import { useState, useEffect } from 'react';

interface ExitIntentOptions {
  /**
   * How close to the top edge of the screen (in pixels) should trigger the popup
   * Higher values make it less sensitive
   */
  sensitivity?: number;
  
  /**
   * Speed threshold in pixels per event that the mouse needs to exceed
   */
  speedThreshold?: number;
  
  /**
   * Whether to show the popup only once per session
   */
  showOnce?: boolean;
  
  /**
   * How many days to remember the user's choice via cookie
   * Set to 0 to disable cookie
   */
  cookieDuration?: number;
  
  /**
   * Delay in milliseconds before exit intent detection is enabled
   */
  delayPeriod?: number;
  
  /**
   * Minimum number of page views before showing the popup
   */
  pageViewThreshold?: number;
}

export const useExitIntent = ({
  sensitivity = 20,
  speedThreshold = 10,
  showOnce = false,
  cookieDuration = 0,
  delayPeriod = 0,
  pageViewThreshold = 1,
}: ExitIntentOptions = {}) => {
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [mouseSpeed, setMouseSpeed] = useState({ x: 0, y: 0 });
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [pageViews, setPageViews] = useState(0);
  
  // Function to check if exit popup was shown before
  const hasSeenPopup = () => {
    if (!cookieDuration) return false;
    
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('exitIntentShown='));
    
    return !!cookie;
  };
  
  // Set cookie to remember user's choice
  const setPopupCookie = () => {
    if (cookieDuration > 0) {
      const date = new Date();
      date.setTime(date.getTime() + cookieDuration * 24 * 60 * 60 * 1000);
      document.cookie = `exitIntentShown=true; expires=${date.toUTCString()}; path=/`;
    }
  };
  
  // Handle page view counting
  useEffect(() => {
    const pageViewCount = parseInt(sessionStorage.getItem('pageViewCount') || '0', 10);
    const newCount = pageViewCount + 1;
    sessionStorage.setItem('pageViewCount', newCount.toString());
    setPageViews(newCount);
  }, []);
  
  // Enable exit intent detection after delay
  useEffect(() => {
    if (hasSeenPopup()) return;
    
    const timer = setTimeout(() => {
      setEnabled(true);
    }, delayPeriod);
    
    return () => clearTimeout(timer);
  }, [delayPeriod]);
  
  // Track mouse movement and detect exit intent
  useEffect(() => {
    if (!enabled || hasSeenPopup() || pageViews < pageViewThreshold) return;
    
    let mouseLeaveTimeout: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate speed
      const speedX = Math.abs(e.clientX - lastPosition.x);
      const speedY = Math.abs(e.clientY - lastPosition.y);
      
      setMouseSpeed({ x: speedX, y: speedY });
      setLastPosition({ x: e.clientX, y: e.clientY });
      
      // Clear timeout to prevent false positives
      clearTimeout(mouseLeaveTimeout);
    };
    
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if moving toward the top of the page with enough speed
      if (
        e.clientY <= sensitivity && 
        mouseSpeed.y > speedThreshold
      ) {
        setShowExitIntent(true);
        
        if (showOnce) {
          sessionStorage.setItem('exitIntentShown', 'true');
        }
        
        setPopupCookie();
      }
    };
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(mouseLeaveTimeout);
    };
  }, [enabled, showOnce, sensitivity, speedThreshold, mouseSpeed, lastPosition, pageViews, pageViewThreshold]);
  
  const closeExitIntent = () => {
    setShowExitIntent(false);
    
    if (showOnce) {
      sessionStorage.setItem('exitIntentShown', 'true');
    }
    
    setPopupCookie();
  };
  
  return { showExitIntent, closeExitIntent };
};
