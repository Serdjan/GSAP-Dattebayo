/**
 * Helper utilities for GSAP Dattebayo
 */

/**
 * Convert selector or element to array of HTMLElements
 */
export function toArray(target: string | HTMLElement | HTMLElement[] | NodeList): HTMLElement[] {
  if (typeof target === 'string') {
    return Array.from(document.querySelectorAll<HTMLElement>(target));
  }

  if (target instanceof HTMLElement) {
    return [target];
  }

  if (target instanceof NodeList) {
    return Array.from(target) as HTMLElement[];
  }

  if (Array.isArray(target)) {
    return target;
  }

  return [];
}

/**
 * Check if we're in a browser environment
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (!isBrowser()) return false;

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Wait for DOM to be ready
 */
export function ready(callback: () => void): void {
  if (!isBrowser()) return;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
}

/**
 * Debounce function for resize events
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Get viewport dimensions
 */
export function getViewport() {
  if (!isBrowser()) {
    return { width: 0, height: 0 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: HTMLElement, offset = 0): boolean {
  if (!isBrowser()) return false;

  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  return (
    rect.top <= windowHeight - offset &&
    rect.bottom >= offset
  );
}

/**
 * Check if element is below viewport (not yet visible)
 */
export function isBelowViewport(element: HTMLElement): boolean {
  if (!isBrowser()) return false;

  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  return rect.top > windowHeight;
}

/**
 * Calculate optimal ScrollTrigger start position based on element position
 * For elements near bottom of page, use bottom-based trigger instead of top-based
 */
export function getOptimalScrollTriggerStart(element: HTMLElement, defaultStart: string = 'top 80%'): string {
  if (!isBrowser()) return defaultStart;

  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const elementTop = rect.top + scrollTop;
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  // Calculate how far the element is from the bottom of the page
  const distanceFromBottom = documentHeight - (elementTop + rect.height);

  // If element is very close to bottom (less than 20% viewport height)
  // Use bottom-based trigger instead of top-based
  if (distanceFromBottom < windowHeight * 0.2) {
    return 'bottom 100%'; // Trigger when bottom of element reaches bottom of viewport
  }

  return defaultStart;
}

/**
 * Generate unique ID for elements
 */
export function generateId(prefix = 'gsap-db'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Clamp number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation
 */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}
