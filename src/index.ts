/**
 * GSAP Dattebayo v0.1.0-alpha.1
 * The ultimate GSAP-powered scroll animation library
 *
 * Simple as AOS, powerful as GSAP
 * Modern animations for 2025-2026 web trends
 *
 * @license MIT
 * @author GSAP Dattebayo
 */

// Initialize GSAP
import { initGSAP, refreshScrollTriggers, killAll } from './utils/gsap-config';

// Export utilities
export { mergeConfig, DEFAULT_CONFIG, EASINGS } from './utils/defaults';
export type { DattebayoDefaults, EasingPreset } from './utils/defaults';

// Export all core animations
export * from './core';

// Export all text animations
export * from './text';

// Export all scroll animations
export * from './scroll';

// Export auto-init system
export { autoInit, refresh, destroy } from './auto-init';

/**
 * Main initialization function
 */
export interface DattebayoConfig {
  autoDetect?: boolean;
  defaults?: Partial<import('./utils/defaults').DattebayoDefaults>;
  debug?: boolean;
}

/**
 * Initialize GSAP Dattebayo
 */
export function init(config: DattebayoConfig = {}): void {
  const { autoDetect = true, defaults = {}, debug = false } = config;

  // Initialize GSAP plugins
  initGSAP();

  // Auto-detect and animate elements
  if (autoDetect) {
    const { autoInit } = require('./auto-init');
    autoInit(defaults);
  }

  // Debug mode
  if (debug) {
    console.log('[GSAP Dattebayo] Initialized with config:', config);
  }
}

/**
 * Utility functions
 */
export const utils = {
  refresh: refreshScrollTriggers,
  killAll,
  initGSAP
};

/**
 * Default export
 */
export default {
  init,
  utils,
  autoInit: require('./auto-init').autoInit,
  refresh: refreshScrollTriggers,
  destroy: killAll
};
