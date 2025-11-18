/**
 * Core animations module
 * Export all core animation functions
 */

// Fade animations
export {
  fadeIn,
  fadeOut,
  fadeUp,
  fadeDown,
  fadeLeft,
  fadeRight,
  type FadeOptions
} from './fade';

// Slide animations
export {
  slideInUp,
  slideInDown,
  slideInLeft,
  slideInRight,
  slideOutUp,
  slideOutDown,
  type SlideOptions
} from './slide';

// Zoom animations
export {
  zoomIn,
  zoomOut,
  zoomInUp,
  zoomInDown,
  elasticZoom,
  type ZoomOptions
} from './zoom';

// Rotate animations
export {
  rotateIn,
  rotateOut,
  flipInX,
  flipInY,
  spinIn,
  type RotateOptions
} from './rotate';

// Blur animations (2025 trend)
export {
  blurToFocus,
  focusToBlur,
  blurInUp,
  blurZoom,
  type BlurOptions
} from './blur';
