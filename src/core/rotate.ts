/**
 * Rotation animations - 3D transform effects
 * GPU-accelerated rotations with perspective
 */

import { gsap } from '../utils/gsap-config';
import { toArray } from '../utils/helpers';
import type { DattebayoDefaults } from '../utils/defaults';

export interface RotateOptions extends Partial<DattebayoDefaults> {
  rotation?: number;
  transformOrigin?: string;
  perspective?: number;
}

/**
 * Rotate in - 2D rotation reveal
 */
export function rotateIn(
  target: string | HTMLElement | HTMLElement[],
  options: RotateOptions = {}
): gsap.core.Tween {
  const {
    duration = 1,
    ease = 'back.out(1.7)',
    delay = 0,
    rotation = 180,
    transformOrigin = 'center center'
  } = options;

  return gsap.from(toArray(target), {
    rotation,
    opacity: 0,
    scale: 0.5,
    transformOrigin,
    duration,
    ease,
    delay,
    force3D: true,
    clearProps: 'all'
  });
}

/**
 * Rotate out
 */
export function rotateOut(
  target: string | HTMLElement | HTMLElement[],
  options: RotateOptions = {}
): gsap.core.Tween {
  const {
    duration = 1,
    ease = 'power2.in',
    delay = 0,
    rotation = 180,
    transformOrigin = 'center center'
  } = options;

  return gsap.to(toArray(target), {
    rotation,
    opacity: 0,
    scale: 0.5,
    transformOrigin,
    duration,
    ease,
    delay,
    force3D: true
  });
}

/**
 * Flip in horizontal (3D rotation on Y axis)
 */
export function flipInX(
  target: string | HTMLElement | HTMLElement[],
  options: RotateOptions = {}
): gsap.core.Tween {
  const {
    duration = 1,
    ease = 'power2.out',
    delay = 0,
    transformOrigin = 'center center',
    perspective = 1000
  } = options;

  return gsap.from(toArray(target), {
    rotationY: -90,
    opacity: 0,
    transformOrigin,
    transformPerspective: perspective,
    duration,
    ease,
    delay,
    force3D: true,
    clearProps: 'all'
  });
}

/**
 * Flip in vertical (3D rotation on X axis)
 */
export function flipInY(
  target: string | HTMLElement | HTMLElement[],
  options: RotateOptions = {}
): gsap.core.Tween {
  const {
    duration = 1,
    ease = 'power2.out',
    delay = 0,
    transformOrigin = 'center center',
    perspective = 1000
  } = options;

  return gsap.from(toArray(target), {
    rotationX: -90,
    opacity: 0,
    transformOrigin,
    transformPerspective: perspective,
    duration,
    ease,
    delay,
    force3D: true,
    clearProps: 'all'
  });
}

/**
 * Spin in - Continuous rotation entrance
 */
export function spinIn(
  target: string | HTMLElement | HTMLElement[],
  options: RotateOptions = {}
): gsap.core.Tween {
  const {
    duration = 1,
    ease = 'power2.out',
    delay = 0,
    rotation = 720,
    transformOrigin = 'center center'
  } = options;

  return gsap.from(toArray(target), {
    rotation,
    opacity: 0,
    scale: 0,
    transformOrigin,
    duration,
    ease,
    delay,
    force3D: true,
    clearProps: 'all'
  });
}
