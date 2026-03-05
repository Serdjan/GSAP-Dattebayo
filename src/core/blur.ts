/**
 * Blur animations - Modern 2025 trend effect
 * Blur-to-focus reveal using CSS filters (GPU-accelerated)
 */

import { gsap } from '../utils/gsap-config';
import { toArray } from '../utils/helpers';
import type { DattebayoDefaults } from '../utils/defaults';

export interface BlurOptions extends Partial<DattebayoDefaults> {
  blurAmount?: number;
  scale?: number;
}

/**
 * Blur to focus - From blurry to sharp (2025 trend)
 */
export function blurToFocus(
  target: string | HTMLElement | HTMLElement[],
  options: BlurOptions = {}
): gsap.core.Tween {
  const {
    duration = 1.2,
    ease = 'power2.out',
    delay = 0,
    blurAmount = 20,
    scale = 1.1
  } = options;

  return gsap.from(toArray(target), {
    filter: `blur(${blurAmount}px)`,
    opacity: 0,
    scale,
    duration,
    ease,
    delay,
    force3D: true,
    clearProps: 'all'
  });
}

/**
 * Focus to blur - Reverse effect
 */
export function focusToBlur(
  target: string | HTMLElement | HTMLElement[],
  options: BlurOptions = {}
): gsap.core.Tween {
  const {
    duration = 1.2,
    ease = 'power2.in',
    delay = 0,
    blurAmount = 20,
    scale = 1.1
  } = options;

  return gsap.to(toArray(target), {
    filter: `blur(${blurAmount}px)`,
    opacity: 0,
    scale,
    duration,
    ease,
    delay,
    force3D: true
  });
}

/**
 * Blur in up - Blur with upward movement
 */
export function blurInUp(
  target: string | HTMLElement | HTMLElement[],
  options: BlurOptions = {}
): gsap.core.Tween {
  const {
    duration = 1.2,
    ease = 'power2.out',
    delay = 0,
    blurAmount = 15,
    distance = 50
  } = options;

  return gsap.from(toArray(target), {
    filter: `blur(${blurAmount}px)`,
    y: distance,
    opacity: 0,
    duration,
    ease,
    delay,
    force3D: true,
    clearProps: 'all'
  });
}

/**
 * Blur zoom - Blur with scale effect (dramatic entrance)
 */
export function blurZoom(
  target: string | HTMLElement | HTMLElement[],
  options: BlurOptions = {}
): gsap.core.Tween {
  const {
    duration = 1.5,
    ease = 'power3.out',
    delay = 0,
    blurAmount = 30,
    scale = 1.5
  } = options;

  return gsap.from(toArray(target), {
    filter: `blur(${blurAmount}px)`,
    scale,
    opacity: 0,
    duration,
    ease,
    delay,
    force3D: true,
    clearProps: 'all'
  });
}
