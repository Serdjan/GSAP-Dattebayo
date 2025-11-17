/**
 * Text animations module
 * Export all SplitText-based animation functions
 */

// Character-level animations
export {
  charReveal,
  charFadeUp,
  charWave,
  charElastic,
  charBlur,
  type CharRevealOptions
} from './char-reveal';

// Word-level animations
export {
  wordReveal,
  wordScaleIn,
  wordRotateIn,
  wordSlideAlternate,
  type WordRevealOptions
} from './word-reveal';

// Line-level animations
export {
  lineReveal,
  lineClipReveal,
  lineSlideAlternate,
  lineScaleReveal,
  type LineRevealOptions
} from './line-reveal';

// Scramble/Glitch effects
export {
  scrambleReveal,
  glitchReveal,
  matrixReveal,
  type ScrambleOptions
} from './scramble';
