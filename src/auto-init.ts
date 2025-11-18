/**
 * Auto-initialization system
 * Automatically detects and animates elements with data attributes
 */

import {
  gsap,
  ScrollTrigger,
  initGSAP,
  refreshScrollTriggers,
} from "./utils/gsap-config";
import {
  getAnimatedElements,
  parseAttributes,
  isValidAnimation,
} from "./utils/data-attributes";
import {
  ready,
  debounce,
  isBelowViewport,
  getOptimalScrollTriggerStart,
} from "./utils/helpers";
import { mergeConfig, type DattebayoDefaults } from "./utils/defaults";

// Core animations
import * as coreAnimations from "./core";
// Text animations
import * as textAnimations from "./text";
// Scroll animations
import * as scrollAnimations from "./scroll";

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

    // Force ScrollTrigger to check current scroll position
    // This ensures animations trigger even if page is reloaded while scrolled
    requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });
  });

  isAutoInitialized = true;
}

/**
 * Animate all elements with data attributes
 */
function animateElements(root: Document | HTMLElement = document): void {
  const elements = getAnimatedElements(root);

  elements.forEach((element) => {
    const attrs = parseAttributes(element);
    const animation = attrs.animation;

    // Check if element has parallax attribute
    const hasParallax = attrs.parallax !== undefined;

    // For hover-only or trigger-only elements, we don't need a main animation
    const hasHover = attrs.hoverAnimation;
    const hasTriggerMode =
      attrs.triggerMode === "hover" || attrs.triggerMode === "click";

    // Skip validation if it's a hover-only, click-only, or parallax-only element
    if (!animation && !hasHover && !hasTriggerMode && !hasParallax) {
      return;
    }

    if (animation && !isValidAnimation(animation)) {
      console.warn(`[GSAP Dattebayo] Invalid animation: ${animation}`);
      return;
    }

    // Merge element config with global config
    const config = mergeConfig({
      ...globalConfig,
      ...attrs,
    });

    // Execute animation
    executeAnimation(element, animation || "", config);
  });
}

/**
 * Execute animation based on trigger mode
 */
function executeAnimation(
  element: HTMLElement,
  animationName: string,
  config: DattebayoDefaults
): void {
  // Special cases: animations that don't take a target element
  const noTargetAnimations = ["scrollProgress", "circularProgress"];

  if (noTargetAnimations.includes(animationName)) {
    const specialAnimations: Record<string, (options: any) => any> = {
      scrollProgress: scrollAnimations.scrollProgress,
      circularProgress: scrollAnimations.circularProgress,
    };

    const animationFn = specialAnimations[animationName];
    if (animationFn) {
      try {
        animationFn(config);
      } catch (error) {
        console.error(
          `[GSAP Dattebayo] Error executing ${animationName}:`,
          error
        );
      }
    }
    return;
  }

  // Check if it's hover-only (data-gsap-hover without data-gsap)
  if (config.hoverAnimation && !animationName) {
    executeOnHover(element, config.hoverAnimation, config);
    return;
  }

  // Check if it's parallax-only (data-gsap-parallax without data-gsap)
  if (config.parallax !== undefined && !animationName) {
    executeParallax(element, config);
    return;
  }

  // Route based on trigger mode
  const triggerMode = config.triggerMode || "scroll";

  switch (triggerMode) {
    case "load":
      executeImmediately(element, animationName, config);
      break;
    case "scroll":
      executeOnScroll(element, animationName, config);
      break;
    case "hover":
      executeOnHover(element, animationName, config);
      break;
    case "click":
      executeOnClick(element, animationName, config);
      break;
    default:
      executeOnScroll(element, animationName, config);
  }
}

/**
 * Execute animation immediately (load mode)
 */
function executeImmediately(
  element: HTMLElement,
  animationName: string,
  config: DattebayoDefaults
): void {
  const animationFn = getAnimationFunction(animationName);
  if (!animationFn) return;

  try {
    animationFn(element, config);
  } catch (error) {
    console.error(`[GSAP Dattebayo] Error executing ${animationName}:`, error);
  }
}

/**
 * Execute animation on scroll (AOS-like behavior)
 */
function executeOnScroll(
  element: HTMLElement,
  animationName: string,
  config: DattebayoDefaults
): void {
  const animationFn = getAnimationFunction(animationName);
  if (!animationFn) return;

  // Get initial state based on animation type
  const initialState = getInitialState(animationName, config);

  // Get optimal scroll trigger start position (adjusts for bottom elements)
  const optimalStart = getOptimalScrollTriggerStart(
    element,
    config.start || "top 100%"
  );

  // Check if option mode is enabled
  if (config.option) {
    const finalState = getFinalState(animationName, config);
    const duration = config.duration || 1;
    const ease = config.ease || "power2.out";

    try {
      switch (config.option) {
        case "reverse":
          // Reverse: ping-pong forward/backward
          gsap.set(element, initialState);
          ScrollTrigger.create({
            trigger: element,
            start: optimalStart,
            end: config.end || "bottom 0%",
            markers: config.markers || false,
            onEnter: () => {
              gsap.to(element, {
                ...finalState,
                duration,
                ease,
                force3D: true,
              });
            },
            onLeaveBack: () => {
              gsap.to(element, {
                ...initialState,
                duration,
                ease,
                force3D: true,
              });
            },
          });
          break;

        case "scrub":
          // Scrub: tied to scroll position with scrub
          gsap
            .timeline({
              scrollTrigger: {
                trigger: element,
                start: optimalStart,
                end: config.end || "bottom 0%",
                markers: config.markers || false,
                scrub: true,
              },
            })
            .fromTo(element, initialState, {
              ...finalState,
              ease,
              force3D: true,
            });
          break;

        case "replay":
          // Replay: plays without reverse each time
          ScrollTrigger.create({
            trigger: element,
            start: optimalStart,
            end: config.end || "bottom 0%",
            markers: config.markers || false,
            onEnter: () => {
              gsap.set(element, initialState);
              gsap.to(element, {
                ...finalState,
                duration,
                ease,
                force3D: true,
              });
            },
            onEnterBack: () => {
              gsap.set(element, initialState);
              gsap.to(element, {
                ...finalState,
                duration,
                ease,
                force3D: true,
              });
            },
          });
          break;
      }
    } catch (error) {
      console.error(
        `[GSAP Dattebayo] Error executing ${animationName} with option ${config.option}:`,
        error
      );
    }
  } else {
    // AOS behavior: play once
    // Set initial state for AOS mode
    gsap.set(element, initialState);
    // AOS behavior: play once
    ScrollTrigger.create({
      trigger: element,
      start: optimalStart,
      end: config.end || "bottom 0%",
      markers: config.markers || false,
      once: config.once !== false, // Default to true for AOS behavior

      // Check if element is already scrolled past on page load
      onRefresh: (self) => {
        if (self.progress === 1) {
          // Element already visible - set to final state immediately without animation
          gsap.set(element, { clearProps: "all" });
        }
      },

      onEnter: () => {
        try {
          // Clear the initial state properties so gsap.from() can animate properly
          gsap.set(element, { clearProps: "all" });
          // Now execute the animation
          animationFn(element, config);
        } catch (error) {
          console.error(
            `[GSAP Dattebayo] Error executing ${animationName}:`,
            error
          );
        }
      },
    });
  }
}

/**
 * Create hover-specific animation (using gsap.to instead of gsap.from)
 */
function createHoverAnimation(
  element: HTMLElement,
  animationName: string,
  config: DattebayoDefaults
): gsap.core.Tween | gsap.core.Timeline {
  const duration = config.duration || 0.5;
  const ease = config.ease || "power2.out";

  // Map animation names to hover-friendly .to() animations
  const hoverAnimations: Record<string, gsap.TweenVars> = {
    // Zoom animations
    zoomIn: { scale: 1.1, duration, ease },
    zoomOut: { scale: 0.9, duration, ease },
    elasticZoom: {
      scale: 1.15,
      duration: duration * 1.5,
      ease: "elastic.out(1, 0.3)",
    },

    // Fade animations
    fadeIn: { opacity: 1, duration, ease },
    fadeOut: { opacity: 0.5, duration, ease },

    // Rotate animations
    rotateIn: { rotation: 5, duration, ease },
    spinIn: { rotation: 360, duration: duration * 2, ease },

    // Blur animations
    blurToFocus: { filter: "blur(0px)", duration, ease },
    focusToBlur: { filter: "blur(5px)", duration, ease },
  };

  const animProps = hoverAnimations[animationName];

  if (animProps) {
    return gsap.to(element, animProps);
  }

  // Fallback: slight scale up for unknown animations
  return gsap.to(element, {
    scale: 1.05,
    duration,
    ease,
  });
}

/**
 * Execute animation on hover
 */
function executeOnHover(
  element: HTMLElement,
  animationName: string,
  config: DattebayoDefaults
): void {
  // Use hoverAnimation if specified, otherwise use main animation
  const hoverAnim = config.hoverAnimation || animationName;
  const leaveAnim = config.hoverLeaveAnimation;

  let timeline: any = null;

  element.addEventListener("mouseenter", () => {
    // Kill any existing animation
    if (timeline) {
      timeline.kill();
    }

    try {
      // Create hover animation using gsap.to()
      timeline = createHoverAnimation(element, hoverAnim, config);
    } catch (error) {
      console.error(`[GSAP Dattebayo] Error executing ${hoverAnim}:`, error);
    }
  });

  element.addEventListener("mouseleave", () => {
    // Kill any existing animation
    if (timeline) {
      timeline.kill();
    }

    // If hoverLeaveAnimation is specified, play it
    if (leaveAnim) {
      try {
        timeline = createHoverAnimation(element, leaveAnim, config);
      } catch (error) {
        console.error(`[GSAP Dattebayo] Error executing ${leaveAnim}:`, error);
      }
    } else {
      // Otherwise, animate back to normal state
      timeline = gsap.to(element, {
        scale: 1,
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        filter: "none",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  });
}

/**
 * Execute animation on click
 */
function executeOnClick(
  element: HTMLElement,
  animationName: string,
  config: DattebayoDefaults
): void {
  const animationFn = getAnimationFunction(animationName);
  if (!animationFn) return;

  element.style.cursor = "pointer";

  element.addEventListener("click", () => {
    try {
      // Always reset element to normal state before animating
      gsap.set(element, { clearProps: "all" });
      // Execute animation every time (ignore 'once' for click mode)
      animationFn(element, config);
    } catch (error) {
      console.error(
        `[GSAP Dattebayo] Error executing ${animationName}:`,
        error
      );
    }
  });
}

/**
 * Execute parallax effect (data-gsap-parallax)
 */
function executeParallax(
  element: HTMLElement,
  config: DattebayoDefaults
): void {
  try {
    // Default to basic parallax function with the speed from data-gsap-parallax
    scrollAnimations.parallax(element, {
      speed: config.parallax,
      scrub: config.scrub !== undefined ? config.scrub : true,
      start: config.start,
      end: config.end,
      markers: config.markers,
    });
  } catch (error) {
    console.error(
      `[GSAP Dattebayo] Error executing parallax:`,
      error
    );
  }
}

/**
 * Get animation function by name
 */
function getAnimationFunction(
  animationName: string
): ((target: HTMLElement, options: any) => any) | null {
  // Animation mapping
  const animationMap: Record<
    string,
    (target: HTMLElement, options: any) => any
  > = {
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
    elasticZoom: coreAnimations.elasticZoom,

    // Core - Rotate
    rotate: coreAnimations.rotateIn,
    rotateIn: coreAnimations.rotateIn,
    rotateOut: coreAnimations.rotateOut,
    flipInX: coreAnimations.flipInX,
    flipInY: coreAnimations.flipInY,
    spinIn: coreAnimations.spinIn,

    // Core - Blur
    blur: coreAnimations.blurToFocus,
    blurIn: coreAnimations.blurToFocus,
    blurToFocus: coreAnimations.blurToFocus,
    focusToBlur: coreAnimations.focusToBlur,
    blurInUp: coreAnimations.blurInUp,
    blurZoom: coreAnimations.blurZoom,

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
    wordSlideAlternate: textAnimations.wordSlideAlternate,

    // Text - Line
    lineReveal: textAnimations.lineReveal,
    lineClipReveal: textAnimations.lineClipReveal,
    lineSlideAlternate: textAnimations.lineSlideAlternate,
    lineScaleReveal: textAnimations.lineScaleReveal,

    // Text - Scramble
    scramble: textAnimations.scrambleReveal,
    scrambleReveal: textAnimations.scrambleReveal,
    glitch: textAnimations.glitchReveal,
    glitchReveal: textAnimations.glitchReveal,
    matrix: textAnimations.matrixReveal,
    matrixReveal: textAnimations.matrixReveal,

    // Scroll - Parallax
    parallax: scrollAnimations.parallax,
    parallaxSpeed: scrollAnimations.parallaxSpeed,
    parallaxLayers: scrollAnimations.parallaxLayers,
    parallax3D: scrollAnimations.parallax3D,
    parallaxRotate: scrollAnimations.parallaxRotate,

    // Scroll - Reveal
    scrollReveal: scrollAnimations.scrollReveal,
    batchScrollReveal: scrollAnimations.batchScrollReveal,
    pinSection: scrollAnimations.pinSection,
    scrubAnimation: scrollAnimations.scrubAnimation,
    horizontalScroll: scrollAnimations.horizontalScroll,

    // Scroll - Progress (with target)
    sectionProgress: scrollAnimations.sectionProgress,
    scrollPercentage: scrollAnimations.scrollPercentage,
  };

  const animationFn = animationMap[animationName];

  if (!animationFn) {
    console.warn(
      `[GSAP Dattebayo] Animation function not found: ${animationName}`
    );
    return null;
  }

  return animationFn;
}

/**
 * Get initial state for animation (before scroll trigger)
 */
function getInitialState(
  animationName: string,
  config: DattebayoDefaults
): gsap.TweenVars {
  const distance = config.distance || 50;

  // Map animation types to their initial states
  const stateMap: Record<string, gsap.TweenVars> = {
    // Fade animations
    fade: { opacity: 0 },
    fadeIn: { opacity: 0 },
    fadeUp: { opacity: 0, y: distance },
    fadeDown: { opacity: 0, y: -distance },
    fadeLeft: { opacity: 0, x: distance },
    fadeRight: { opacity: 0, x: -distance },

    // Slide animations
    slideInUp: { opacity: 0, y: distance },
    slideInDown: { opacity: 0, y: -distance },
    slideInLeft: { opacity: 0, x: -distance },
    slideInRight: { opacity: 0, x: distance },

    // Zoom animations
    zoom: { opacity: 0, scale: 0.5 },
    zoomIn: { opacity: 0, scale: 0.5 },
    zoomOut: { opacity: 0, scale: 1.5 },
    zoomInUp: { opacity: 0, scale: 0.5, y: distance },
    zoomInDown: { opacity: 0, scale: 0.5, y: -distance },
    elasticZoom: { opacity: 0, scale: 0 },

    // Rotate animations
    rotate: { opacity: 0, rotation: -180 },
    rotateIn: { opacity: 0, rotation: -180 },
    rotateOut: { opacity: 1, rotation: 0 },
    flipInX: { opacity: 0, rotationX: -90 },
    flipInY: { opacity: 0, rotationY: -90 },
    spinIn: { opacity: 0, rotation: 360 },

    // Blur animations
    blur: { opacity: 0, filter: "blur(20px)" },
    blurIn: { opacity: 0, filter: "blur(20px)" },
    blurToFocus: { opacity: 0, filter: "blur(20px)" },
    blurInUp: { opacity: 0, filter: "blur(20px)", y: distance },
    blurZoom: { opacity: 0, filter: "blur(20px)", scale: 0.5 },

    // Text animations - just hide them
    charReveal: { opacity: 0 },
    charFadeUp: { opacity: 0 },
    charWave: { opacity: 0 },
    charElastic: { opacity: 0 },
    charBlur: { opacity: 0 },
    wordReveal: { opacity: 0 },
    wordScaleIn: { opacity: 0 },
    wordRotateIn: { opacity: 0 },
    wordSlideAlternate: { opacity: 0 },
    lineReveal: { opacity: 0 },
    lineClipReveal: { opacity: 0 },
    lineSlideAlternate: { opacity: 0 },
    lineScaleReveal: { opacity: 0 },
    scramble: { opacity: 0 },
    scrambleReveal: { opacity: 0 },
    glitch: { opacity: 0 },
    glitchReveal: { opacity: 0 },
    matrix: { opacity: 0 },
    matrixReveal: { opacity: 0 },
  };

  return stateMap[animationName] || { opacity: 0 };
}

/**
 * Get final state for animation (normal/visible state)
 */
function getFinalState(
  animationName: string,
  config: DattebayoDefaults
): gsap.TweenVars {
  // Final state is always normal/visible - just properties, no timing
  return {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
    rotationX: 0,
    rotationY: 0,
    filter: "none",
  };
}

/**
 * Setup MutationObserver for dynamic content
 */
function setupObserver(): void {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          animateElements(node as HTMLElement);
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

/**
 * Setup resize handler to refresh ScrollTriggers
 */
function setupResizeHandler(): void {
  const handleResize = debounce(() => {
    refreshScrollTriggers();
  }, 250);

  window.addEventListener("resize", handleResize);
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
