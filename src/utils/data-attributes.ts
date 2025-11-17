/**
 * Data attribute parser for HTML-based animation configuration
 * Enables zero-JavaScript animation setup
 */

import type { DattebayoDefaults } from './defaults';

export interface ParsedAttributes extends Partial<DattebayoDefaults> {
  animation?: string;
  trigger?: string;
  scrub?: boolean | number;
  pin?: boolean;
  parallax?: number;
}

/**
 * Parse all data-gsap-* attributes from an element
 */
export function parseAttributes(element: HTMLElement): ParsedAttributes {
  const attrs: ParsedAttributes = {};

  // Main animation type
  attrs.animation = element.dataset.gsap || element.dataset.dattebayo;

  // Timing attributes
  if (element.dataset.gsapDuration) {
    attrs.duration = parseFloat(element.dataset.gsapDuration);
  }

  if (element.dataset.gsapDelay) {
    attrs.delay = parseFloat(element.dataset.gsapDelay);
  }

  if (element.dataset.gsapStagger) {
    attrs.stagger = parseFloat(element.dataset.gsapStagger);
  }

  // Easing
  if (element.dataset.gsapEase || element.dataset.gsapEasing) {
    attrs.ease = element.dataset.gsapEase || element.dataset.gsapEasing;
  }

  // Distance (for movement animations)
  if (element.dataset.gsapDistance) {
    attrs.distance = parseFloat(element.dataset.gsapDistance);
  }

  // ScrollTrigger attributes
  if (element.dataset.gsapStart) {
    attrs.start = element.dataset.gsapStart;
  }

  if (element.dataset.gsapEnd) {
    attrs.end = element.dataset.gsapEnd;
  }

  if (element.dataset.gsapOnce !== undefined) {
    attrs.once = element.dataset.gsapOnce === 'true';
  }

  if (element.dataset.gsapMarkers !== undefined) {
    attrs.markers = element.dataset.gsapMarkers === 'true';
  }

  // Custom trigger element
  if (element.dataset.gsapTrigger) {
    attrs.trigger = element.dataset.gsapTrigger;
  }

  // Scrub (smooth scroll-linked animation)
  if (element.dataset.gsapScrub !== undefined) {
    const scrubValue = element.dataset.gsapScrub;
    attrs.scrub = scrubValue === 'true' ? true : parseFloat(scrubValue);
  }

  // Pin element
  if (element.dataset.gsapPin !== undefined) {
    attrs.pin = element.dataset.gsapPin === 'true';
  }

  // Parallax speed
  if (element.dataset.gsapParallax) {
    attrs.parallax = parseFloat(element.dataset.gsapParallax);
  }

  return attrs;
}

/**
 * Get all elements with data-gsap or data-dattebayo attributes
 */
export function getAnimatedElements(root: Document | HTMLElement = document): HTMLElement[] {
  const selector = '[data-gsap], [data-dattebayo]';
  return Array.from(root.querySelectorAll<HTMLElement>(selector));
}

/**
 * Check if element has animation attributes
 */
export function hasAnimationAttributes(element: HTMLElement): boolean {
  return !!(element.dataset.gsap || element.dataset.dattebayo);
}

/**
 * Validate animation name
 */
export function isValidAnimation(name: string | undefined): boolean {
  if (!name) return false;

  const validAnimations = [
    // Core
    'fade', 'fadeIn', 'fadeOut', 'fadeUp', 'fadeDown', 'fadeLeft', 'fadeRight',
    'slide', 'slideInUp', 'slideInDown', 'slideInLeft', 'slideInRight',
    'zoom', 'zoomIn', 'zoomOut', 'zoomInUp', 'zoomInDown',
    'rotate', 'rotateIn', 'rotateOut',
    'blur', 'blurIn', 'blurToFocus',

    // Text
    'charReveal', 'wordReveal', 'lineReveal', 'scramble',

    // Scroll
    'parallax', 'scrollReveal', 'scrollProgress'
  ];

  return validAnimations.includes(name);
}
