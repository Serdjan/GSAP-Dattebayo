/**
 * GSAP configuration and plugin registration
 * Auto-registers all free GSAP plugins (2025+)
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

let isInitialized = false;

/**
 * Initialize GSAP with all free plugins
 * Safe to call multiple times
 */
export function initGSAP(): void {
  if (isInitialized) return;

  // Register all free GSAP plugins
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // GSAP global config for performance
  gsap.config({
    force3D: true,
    nullTargetWarn: false,
    trialWarn: false
  });

  // ScrollTrigger config for smooth performance
  ScrollTrigger.config({
    limitCallbacks: true,
    syncInterval: 120
  });

  isInitialized = true;
}

/**
 * Get GSAP instance (ensures initialization)
 */
export function getGSAP() {
  initGSAP();
  return gsap;
}

/**
 * Get ScrollTrigger instance (ensures initialization)
 */
export function getScrollTrigger() {
  initGSAP();
  return ScrollTrigger;
}

/**
 * Get SplitText instance (ensures initialization)
 */
export function getSplitText() {
  initGSAP();
  return SplitText;
}

/**
 * Refresh all ScrollTriggers
 * Call after DOM changes
 */
export function refreshScrollTriggers(): void {
  if (isInitialized) {
    ScrollTrigger.refresh();
  }
}

/**
 * Kill all animations and ScrollTriggers
 * Useful for cleanup
 */
export function killAll(): void {
  if (isInitialized) {
    gsap.killTweensOf('*');
    ScrollTrigger.getAll().forEach(st => st.kill());
  }
}

export { gsap, ScrollTrigger, SplitText };
