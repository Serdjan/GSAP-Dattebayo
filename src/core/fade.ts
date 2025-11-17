/**
 * Fade animations - Core reveal effects
 * 100% GSAP-powered, GPU-accelerated
 */

import { gsap } from '../utils/gsap-config';
import { toArray } from '../utils/helpers';
import type { DattebayoDefaults } from '../utils/defaults';

export interface FadeOptions extends Partial<DattebayoDefaults> {
  autoAlpha?: boolean;
}

/**
 * Fade in - Simple opacity reveal
 */
export function fadeIn(
  target: string | HTMLElement | HTMLElement[],
  options: FadeOptions = {}
): gsap.core.Tween {
  const { duration = 1, ease = 'power2.out', delay = 0, autoAlpha = true } = options;

  return gsap.to(toArray(target), {
    opacity: 1,
    ...(autoAlpha && { autoAlpha: 1 }),
    duration,
    ease,
    delay,
    force3D: true
  });
}

/**
 * Fade out
 */
export function fadeOut(
  target: string | HTMLElement | HTMLElement[],
  options: FadeOptions = {}
): gsap.core.Tween {
  const { duration = 1, ease = 'power2.out', delay = 0, autoAlpha = true } = options;

  return gsap.to(toArray(target), {
    opacity: 0,
    ...(autoAlpha && { autoAlpha: 0 }),
    duration,
    ease,
    delay,
    force3D: true
  });
}

/**
 * Fade up - Fade in with upward movement (most popular scroll reveal)
 */
export function fadeUp(
  target: string | HTMLElement | HTMLElement[],
  options: FadeOptions = {}
): gsap.core.Tween {
  const {
    duration = 1,
    ease = 'power2.out',
    delay = 0,
    distance = 50,
    autoAlpha = true
  } = options;

  return gsap.from(toArray(target), {
    opacity: 0,
    y: distance,
    ...(autoAlpha && { autoAlpha: 0 }),
    duration,
    ease,
    delay,
    force3D: true,
    clearProps: 'all'
  });
}

/**
 * Fade down
 */
export function fadeDown(
  target: string | HTMLElement | HTMLElement[],
  options: FadeOptions = {}
): gsap.core.Tween {
  const {
    duration = 1,
    ease = 'power2.out',
    delay = 0,
    distance = 50,
    autoAlpha = true
  } = options;

  return gsap.from(toArray(target), {
    opacity: 0,
    y: -distance,
    ...(autoAlpha && { autoAlpha: 0 }),
    duration,
    ease,
    delay,
    force3D: true,
    clearProps: 'all'
  });
}

/**
 * Fade left
 */
export function fadeLeft(
  target: string | HTMLElement | HTMLElement[],
  options: FadeOptions = {}
): gsap.core.Tween {
  const {
    duration = 1,
    ease = 'power2.out',
    delay = 0,
    distance = 50,
    autoAlpha = true
  } = options;

  return gsap.from(toArray(target), {
    opacity: 0,
    x: distance,
    ...(autoAlpha && { autoAlpha: 0 }),
    duration,
    ease,
    delay,
    force3D: true,
    clearProps: 'all'
  });
}

/**
 * Fade right
 */
export function fadeRight(
  target: string | HTMLElement | HTMLElement[],
  options: FadeOptions = {}
): gsap.core.Tween {
  const {
    duration = 1,
    ease = 'power2.out',
    delay = 0,
    distance = 50,
    autoAlpha = true
  } = options;

  return gsap.from(toArray(target), {
    opacity: 0,
    x: -distance,
    ...(autoAlpha && { autoAlpha: 0 }),
    duration,
    ease,
    delay,
    force3D: true,
    clearProps: 'all'
  });
}
