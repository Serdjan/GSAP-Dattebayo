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
