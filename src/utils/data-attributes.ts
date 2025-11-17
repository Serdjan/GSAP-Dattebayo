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
  hoverAnimation?: string;
  hoverLeaveAnimation?: string;
  option?: 'reverse' | 'scrub' | 'replay';
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

  // Custom trigger element for ScrollTrigger
  if (element.dataset.gsapTrigger) {
    // Check if it's a trigger mode or a selector
    const triggerValue = element.dataset.gsapTrigger;
    if (['load', 'scroll', 'hover', 'click'].includes(triggerValue)) {
      attrs.triggerMode = triggerValue as 'load' | 'scroll' | 'hover' | 'click';
    } else {
      attrs.trigger = triggerValue;
    }
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

  // Hover animations
  if (element.dataset.gsapHover) {
    attrs.hoverAnimation = element.dataset.gsapHover;
  }

  if (element.dataset.gsapHoverleave) {
    attrs.hoverLeaveAnimation = element.dataset.gsapHoverleave;
  }

  // Scroll option (reverse, scrub, replay)
  if (element.dataset.gsapOption) {
    const optionValue = element.dataset.gsapOption;
    if (['reverse', 'scrub', 'replay'].includes(optionValue)) {
      attrs.option = optionValue as 'reverse' | 'scrub' | 'replay';
    }
  }

  return attrs;
}

/**
 * Get all elements with data-gsap or data-dattebayo attributes
 */
export function getAnimatedElements(root: Document | HTMLElement = document): HTMLElement[] {
  const selector = '[data-gsap], [data-dattebayo], [data-gsap-hover], [data-gsap-trigger]';
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
    // Core - Fade
    'fade', 'fadeIn', 'fadeOut', 'fadeUp', 'fadeDown', 'fadeLeft', 'fadeRight',

    // Core - Slide
    'slide', 'slideInUp', 'slideInDown', 'slideInLeft', 'slideInRight',
    'slideOutUp', 'slideOutDown',

    // Core - Zoom
    'zoom', 'zoomIn', 'zoomOut', 'zoomInUp', 'zoomInDown', 'elasticZoom',

    // Core - Rotate
    'rotate', 'rotateIn', 'rotateOut', 'flipInX', 'flipInY', 'spinIn',

    // Core - Blur
    'blur', 'blurIn', 'blurToFocus', 'focusToBlur', 'blurInUp', 'blurZoom',

    // Text - Character
    'charReveal', 'charFadeUp', 'charWave', 'charElastic', 'charBlur',

    // Text - Word
    'wordReveal', 'wordScaleIn', 'wordRotateIn', 'wordSlideAlternate',

    // Text - Line
    'lineReveal', 'lineClipReveal', 'lineSlideAlternate', 'lineScaleReveal',

    // Text - Special
    'scramble', 'scrambleReveal', 'glitch', 'glitchReveal', 'matrix', 'matrixReveal',

    // Scroll - Parallax
    'parallax', 'parallaxSpeed', 'parallaxLayers', 'parallax3D', 'parallaxRotate',

    // Scroll - Reveal
    'scrollReveal', 'batchScrollReveal', 'pinSection', 'scrubAnimation', 'horizontalScroll',

    // Scroll - Progress
    'scrollProgress', 'sectionProgress', 'circularProgress', 'scrollPercentage'
  ];

  return validAnimations.includes(name);
}
