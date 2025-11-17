/**
 * Scroll animations module
 * Export all ScrollTrigger-based animation functions
 */

// Parallax effects
export {
  parallax,
  parallaxSpeed,
  parallaxLayers,
  parallax3D,
  parallaxRotate,
  type ParallaxOptions
} from './parallax';

// Scroll reveal effects
export {
  scrollReveal,
  batchScrollReveal,
  pinSection,
  scrubAnimation,
  horizontalScroll,
  type ScrollRevealOptions
} from './reveal';

// Progress indicators
export {
  scrollProgress,
  sectionProgress,
  circularProgress,
  scrollPercentage,
  type ProgressOptions
} from './progress';
