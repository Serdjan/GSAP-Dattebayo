/**
 * Default configuration for GSAP Dattebayo animations
 * Optimized for modern web trends 2025-2026
 */

export interface DattebayoDefaults {
  duration: number;
  ease: string;
  distance: number;
  stagger: number;
  delay: number;
  start: string;
  end: string;
  once: boolean;
  markers: boolean;
  triggerMode: "load" | "scroll" | "hover" | "click";
  hoverAnimation?: string;
  hoverLeaveAnimation?: string;
  option?: "reverse" | "scrub" | "replay";
}

export const DEFAULT_CONFIG: DattebayoDefaults = {
  // Animation timing
  duration: 1,
  ease: "power2.out",

  // Movement distance (px)
  distance: 50,

  // Stagger timing for multiple elements
  stagger: 0.1,

  // Initial delay
  delay: 0,

  // ScrollTrigger settings
  start: "top 95%",
  end: "bottom 5%",

  // Animation behavior
  once: true, // Default to one-time animation like AOS
  triggerMode: "scroll", // Default to scroll-based like AOS

  // Development helpers
  markers: false,
};

/**
 * Merge user config with defaults
 */
export function mergeConfig(
  userConfig: Partial<DattebayoDefaults> = {}
): DattebayoDefaults {
  return {
    ...DEFAULT_CONFIG,
    ...userConfig,
  };
}

/**
 * Common GSAP easing presets for 2025 trends
 */
export const EASINGS = {
  // Smooth and modern
  smooth: "power2.out",
  smoothIn: "power2.in",
  smoothInOut: "power2.inOut",

  // Elastic and bouncy (trendy)
  elastic: "elastic.out(1, 0.3)",
  elasticIn: "elastic.in(1, 0.3)",

  // Back easing (slight overshoot)
  back: "back.out(1.7)",
  backIn: "back.in(1.7)",

  // Expo (dramatic)
  expo: "expo.out",
  expoIn: "expo.in",

  // Circ (soft)
  circ: "circ.out",
  circIn: "circ.in",

  // Linear (for scrubbing)
  none: "none",
} as const;

export type EasingPreset = keyof typeof EASINGS;
