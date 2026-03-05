/**
 * Slide animations - Entrance/exit with movement
 * 100% GSAP transforms for GPU acceleration
 */

import { gsap } from '../utils/gsap-config';
import { toArray } from '../utils/helpers';
import type { DattebayoDefaults } from '../utils/defaults';

export interface SlideOptions extends Partial<DattebayoDefaults> {}

/**
 * Slide in from bottom (upward)
 */
export function slideInUp(
  target: string | HTMLElement | HTMLElement[],
  options: SlideOptions = {}
): gsap.core.Tween {
  const {
    duration = 1,
    ease = 'power2.out',
    delay = 0,
    distance = 100
  } = options;

  return gsap.from(toArray(target), {
    y: distance,
    duration,
    ease,
    delay,
    force3D: true,
    clearProps: 'all'
  });
}

/**
 * Slide in from top (downward)
 */
export function slideInDown(
  target: string | HTMLElement | HTMLElement[],
  options: SlideOptions = {}
): gsap.core.Tween {
  const {
    duration = 1,
    ease = 'power2.out',
    delay = 0,
    distance = 100
  } = options;

  return gsap.from(toArray(target), {
    y: -distance,
    duration,
    ease,
    delay,
    force3D: true,
    clearProps: 'all'
  });
}

/**
 * Slide in from left (rightward)
 */
export function slideInLeft(
  target: string | HTMLElement | HTMLElement[],
  options: SlideOptions = {}
): gsap.core.Tween {
  const {
    duration = 1,
    ease = 'power2.out',
    delay = 0,
    distance = 100
  } = options;

  return gsap.from(toArray(target), {
    x: -distance,
    duration,
    ease,
    delay,
    force3D: true,
    clearProps: 'all'
  });
}

/**
 * Slide in from right (leftward)
 */
export function slideInRight(
  target: string | HTMLElement | HTMLElement[],
  options: SlideOptions = {}
): gsap.core.Tween {
  const {
    duration = 1,
    ease = 'power2.out',
    delay = 0,
    distance = 100
  } = options;

  return gsap.from(toArray(target), {
    x: distance,
    duration,
    ease,
    delay,
    force3D: true,
    clearProps: 'all'
  });
}

/**
 * Slide out up
 */
export function slideOutUp(
  target: string | HTMLElement | HTMLElement[],
  options: SlideOptions = {}
): gsap.core.Tween {
  const {
    duration = 1,
    ease = 'power2.in',
    delay = 0,
    distance = 100
  } = options;

  return gsap.to(toArray(target), {
    y: -distance,
    autoAlpha: 0,
    duration,
    ease,
    delay,
    force3D: true
  });
}

/**
 * Slide out down
 */
export function slideOutDown(
  target: string | HTMLElement | HTMLElement[],
  options: SlideOptions = {}
): gsap.core.Tween {
  const {
    duration = 1,
    ease = 'power2.in',
    delay = 0,
    distance = 100
  } = options;

  return gsap.to(toArray(target), {
    y: distance,
    autoAlpha: 0,
    duration,
    ease,
    delay,
    force3D: true
  });
}
