/**
 * Parallax scroll effects
 * Uses GSAP ScrollTrigger for smooth parallax animations
 */

import { gsap, ScrollTrigger } from '../utils/gsap-config';
import { toArray } from '../utils/helpers';
import type { DattebayoDefaults } from '../utils/defaults';

export interface ParallaxOptions extends Partial<DattebayoDefaults> {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  scrub?: boolean | number;
  smooth?: boolean;
}

/**
 * Basic parallax - Elements move at different speeds while scrolling
 */
export function parallax(
  target: string | HTMLElement | HTMLElement[],
  options: ParallaxOptions = {}
): ScrollTrigger[] {
  const {
    speed = 0.5,
    direction = 'vertical',
    scrub = true,
    start = 'top bottom',
    end = 'bottom top',
    markers = false
  } = options;

  const elements = toArray(target);
  const triggers: ScrollTrigger[] = [];

  elements.forEach(element => {
    const yMove = direction === 'vertical' ? (speed - 1) * 100 : 0;
    const xMove = direction === 'horizontal' ? (speed - 1) * 100 : 0;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start,
      end,
      scrub,
      markers,
      onUpdate: self => {
        gsap.to(element, {
          y: yMove * self.progress,
          x: xMove * self.progress,
          force3D: true,
          overwrite: 'auto'
        });
      }
    });

    triggers.push(trigger);
  });

  return triggers;
}

/**
 * Parallax speed - Simple speed-based parallax (like Locomotive Scroll)
 */
export function parallaxSpeed(
  target: string | HTMLElement | HTMLElement[],
  options: ParallaxOptions = {}
): ScrollTrigger[] {
  const {
    speed = 1,
    scrub = 1,
    markers = false
  } = options;

  const elements = toArray(target);
  const triggers: ScrollTrigger[] = [];

  elements.forEach(element => {
    gsap.to(element, {
      y: () => -(element.offsetHeight * (1 - speed)),
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub,
        markers,
        invalidateOnRefresh: true
      }
    });

    const st = ScrollTrigger.getById(element.dataset.scrollTriggerId || '');
    if (st) triggers.push(st);
  });

  return triggers;
}

/**
 * Parallax layers - Multi-layer parallax effect
 */
export function parallaxLayers(
  container: string | HTMLElement,
  options: ParallaxOptions = {}
): ScrollTrigger[] {
  const {
    scrub = 1,
    markers = false
  } = options;

  const containerElement = typeof container === 'string'
    ? document.querySelector<HTMLElement>(container)
    : container;

  if (!containerElement) return [];

  const layers = toArray(containerElement.querySelectorAll('[data-speed]'));
  const triggers: ScrollTrigger[] = [];

  layers.forEach(layer => {
    const speed = parseFloat((layer as HTMLElement).dataset.speed || '1');

    gsap.to(layer, {
      y: () => -(layer.clientHeight * (1 - speed)),
      ease: 'none',
      scrollTrigger: {
        trigger: containerElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub,
        markers,
        invalidateOnRefresh: true
      }
    });

    const st = ScrollTrigger.getById((layer as HTMLElement).dataset.scrollTriggerId || '');
    if (st) triggers.push(st);
  });

  return triggers;
}

/**
 * Parallax 3D - Perspective-based parallax
 */
export function parallax3D(
  target: string | HTMLElement | HTMLElement[],
  options: ParallaxOptions = {}
): ScrollTrigger[] {
  const {
    speed = 0.5,
    scrub = 1,
    markers = false
  } = options;

  const elements = toArray(target);
  const triggers: ScrollTrigger[] = [];

  elements.forEach(element => {
    gsap.set(element, {
      transformPerspective: 1000,
      transformStyle: 'preserve-3d'
    });

    gsap.to(element, {
      z: () => 200 * (1 - speed),
      rotationX: () => 10 * (1 - speed),
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub,
        markers
      }
    });

    const st = ScrollTrigger.getById(element.dataset.scrollTriggerId || '');
    if (st) triggers.push(st);
  });

  return triggers;
}

/**
 * Parallax rotate - Rotation-based parallax
 */
export function parallaxRotate(
  target: string | HTMLElement | HTMLElement[],
  options: ParallaxOptions = {}
): ScrollTrigger[] {
  const {
    speed = 1,
    scrub = 1,
    markers = false
  } = options;

  const elements = toArray(target);
  const triggers: ScrollTrigger[] = [];

  elements.forEach(element => {
    gsap.to(element, {
      rotation: () => 360 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub,
        markers
      }
    });

    const st = ScrollTrigger.getById(element.dataset.scrollTriggerId || '');
    if (st) triggers.push(st);
  });

  return triggers;
}
