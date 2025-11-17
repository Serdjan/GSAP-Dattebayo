/**
 * Auto-initialization system
 * Automatically detects and animates elements with data attributes
 */

import { initGSAP, refreshScrollTriggers } from './utils/gsap-config';
import { getAnimatedElements, parseAttributes, isValidAnimation } from './utils/data-attributes';
import { ready, debounce } from './utils/helpers';
import { mergeConfig, type DattebayoDefaults } from './utils/defaults';

// Core animations
import * as coreAnimations from './core';
// Text animations
import * as textAnimations from './text';
// Scroll animations
import * as scrollAnimations from './scroll';

let isAutoInitialized = false;
let globalConfig: Partial<DattebayoDefaults> = {};

/**
 * Initialize auto-detection and animation
 */
export function autoInit(config: Partial<DattebayoDefaults> = {}): void {
  if (isAutoInitialized) return;

  // Initialize GSAP
  initGSAP();

  // Store global config
  globalConfig = config;

  // Wait for DOM ready
  ready(() => {
    animateElements();
    setupObserver();
    setupResizeHandler();
  });

  isAutoInitialized = true;
}

/**
 * Animate all elements with data attributes
 */
function animateElements(root: Document | HTMLElement = document): void {
  const elements = getAnimatedElements(root);

  elements.forEach(element => {
    const attrs = parseAttributes(element);
    const animation = attrs.animation;

    if (!animation || !isValidAnimation(animation)) {
      console.warn(`[GSAP Dattebayo] Invalid animation: ${animation}`);
      return;
    }

    // Merge element config with global config
    const config = mergeConfig({
      ...globalConfig,
      ...attrs
    });

    // Execute animation
    executeAnimation(element, animation, config);
  });
}

/**
 * Execute animation based on name
 */
function executeAnimation(
  element: HTMLElement,
  animationName: string,
  config: DattebayoDefaults
): void {
  // Map animation names to functions
  const animationMap: Record<string, (target: HTMLElement, options: any) => any> = {
    // Core - Fade
    fade: coreAnimations.fadeIn,
    fadeIn: coreAnimations.fadeIn,
    fadeOut: coreAnimations.fadeOut,
    fadeUp: coreAnimations.fadeUp,
    fadeDown: coreAnimations.fadeDown,
    fadeLeft: coreAnimations.fadeLeft,
    fadeRight: coreAnimations.fadeRight,

    // Core - Slide
    slide: coreAnimations.slideInUp,
    slideInUp: coreAnimations.slideInUp,
    slideInDown: coreAnimations.slideInDown,
    slideInLeft: coreAnimations.slideInLeft,
    slideInRight: coreAnimations.slideInRight,
    slideOutUp: coreAnimations.slideOutUp,
    slideOutDown: coreAnimations.slideOutDown,

    // Core - Zoom
    zoom: coreAnimations.zoomIn,
    zoomIn: coreAnimations.zoomIn,
    zoomOut: coreAnimations.zoomOut,
    zoomInUp: coreAnimations.zoomInUp,
    zoomInDown: coreAnimations.zoomInDown,

    // Core - Rotate
    rotate: coreAnimations.rotateIn,
    rotateIn: coreAnimations.rotateIn,
    rotateOut: coreAnimations.rotateOut,

    // Core - Blur
    blur: coreAnimations.blurToFocus,
    blurIn: coreAnimations.blurToFocus,
    blurToFocus: coreAnimations.blurToFocus,

    // Text - Character
    charReveal: textAnimations.charReveal,
    charFadeUp: textAnimations.charFadeUp,
    charWave: textAnimations.charWave,
    charElastic: textAnimations.charElastic,
    charBlur: textAnimations.charBlur,

    // Text - Word
    wordReveal: textAnimations.wordReveal,
    wordScaleIn: textAnimations.wordScaleIn,
    wordRotateIn: textAnimations.wordRotateIn,

    // Text - Line
    lineReveal: textAnimations.lineReveal,
    lineClipReveal: textAnimations.lineClipReveal,
    lineScaleReveal: textAnimations.lineScaleReveal,

    // Text - Scramble
    scramble: textAnimations.scrambleReveal,
    glitch: textAnimations.glitchReveal,
    matrix: textAnimations.matrixReveal,

    // Scroll - Parallax
    parallax: scrollAnimations.parallax,
    parallaxSpeed: scrollAnimations.parallaxSpeed,

    // Scroll - Reveal
    scrollReveal: scrollAnimations.scrollReveal
  };

  const animationFn = animationMap[animationName];

  if (!animationFn) {
    console.warn(`[GSAP Dattebayo] Animation function not found: ${animationName}`);
    return;
  }

  try {
    animationFn(element, config);
  } catch (error) {
    console.error(`[GSAP Dattebayo] Error executing ${animationName}:`, error);
  }
}

/**
 * Setup MutationObserver for dynamic content
 */
function setupObserver(): void {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          animateElements(node as HTMLElement);
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

/**
 * Setup resize handler to refresh ScrollTriggers
 */
function setupResizeHandler(): void {
  const handleResize = debounce(() => {
    refreshScrollTriggers();
  }, 250);

  window.addEventListener('resize', handleResize);
}

/**
 * Manually refresh all animations
 */
export function refresh(): void {
  refreshScrollTriggers();
}

/**
 * Destroy auto-init
 */
export function destroy(): void {
  isAutoInitialized = false;
  globalConfig = {};
}
