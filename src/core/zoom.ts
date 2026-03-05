/**
 * Zoom/Scale animations - Modern reveal effects
 * GPU-accelerated scale transforms
 */

import { gsap } from '../utils/gsap-config';
import { toArray } from '../utils/helpers';
import type { DattebayoDefaults } from '../utils/defaults';

export interface ZoomOptions extends Partial<DattebayoDefaults> {
  scale?: number;
  transformOrigin?: string;
}

/**
 * Zoom in - Scale from small to normal
 */
export function zoomIn(
  target: string | HTMLElement | HTMLElement[],
  options: ZoomOptions = {}
): gsap.core.Tween {
  const {
    duration = 1,
    ease = 'power2.out',
    delay = 0,
    scale = 0,
    transformOrigin = 'center center'
  } = options;

  return gsap.from(toArray(target), {
    scale,
    opacity: 0,
    transformOrigin,
    duration,
    ease,
    delay,
    force3D: true,
    clearProps: 'all'
  });
}

/**
 * Zoom out - Scale from large to normal
 */
export function zoomOut(
  target: string | HTMLElement | HTMLElement[],
  options: ZoomOptions = {}
): gsap.core.Tween {
  const {
    duration = 1,
    ease = 'power2.out',
    delay = 0,
    scale = 1.5,
    transformOrigin = 'center center'
  } = options;

  return gsap.from(toArray(target), {
    scale,
    opacity: 0,
    transformOrigin,
    duration,
    ease,
    delay,
    force3D: true,
    clearProps: 'all'
  });
}

/**
 * Zoom in with upward movement (trendy combo)
 */
export function zoomInUp(
  target: string | HTMLElement | HTMLElement[],
  options: ZoomOptions = {}
): gsap.core.Tween {
  const {
    duration = 1,
    ease = 'back.out(1.7)',
    delay = 0,
    scale = 0,
    distance = 50,
    transformOrigin = 'center center'
  } = options;

  return gsap.from(toArray(target), {
    scale,
    y: distance,
    opacity: 0,
    transformOrigin,
    duration,
    ease,
    delay,
    force3D: true,
    clearProps: 'all'
  });
}

/**
 * Zoom in with downward movement
 */
export function zoomInDown(
  target: string | HTMLElement | HTMLElement[],
  options: ZoomOptions = {}
): gsap.core.Tween {
  const {
    duration = 1,
    ease = 'back.out(1.7)',
    delay = 0,
    scale = 0,
    distance = 50,
    transformOrigin = 'center center'
  } = options;

  return gsap.from(toArray(target), {
    scale,
    y: -distance,
    opacity: 0,
    transformOrigin,
    duration,
    ease,
    delay,
    force3D: true,
    clearProps: 'all'
  });
}

/**
 * Elastic zoom - Bouncy scale effect (2025 trend)
 */
export function elasticZoom(
  target: string | HTMLElement | HTMLElement[],
  options: ZoomOptions = {}
): gsap.core.Tween {
  const {
    duration = 1.5,
    ease = 'elastic.out(1, 0.3)',
    delay = 0,
    scale = 0,
    transformOrigin = 'center center'
  } = options;

  return gsap.from(toArray(target), {
    scale,
    opacity: 0,
    transformOrigin,
    duration,
    ease,
    delay,
    force3D: true,
    clearProps: 'all'
  });
}
