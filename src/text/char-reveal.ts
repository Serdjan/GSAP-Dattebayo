/**
 * Character-by-character reveal animations
 * Uses GSAP SplitText (free since 2025)
 */

import { gsap, SplitText } from '../utils/gsap-config';
import { toArray } from '../utils/helpers';
import type { DattebayoDefaults } from '../utils/defaults';

export interface CharRevealOptions extends Partial<DattebayoDefaults> {
  stagger?: number;
  from?: 'start' | 'center' | 'end' | 'random';
  split?: 'chars' | 'words' | 'lines';
}

/**
 * Character stagger reveal - Classic typewriter-style
 */
export function charReveal(
  target: string | HTMLElement | HTMLElement[],
  options: CharRevealOptions = {}
): gsap.core.Timeline {
  const {
    duration = 1,
    ease = 'power2.out',
    delay = 0,
    stagger = 0.05,
    from = 'start'
  } = options;

  const elements = toArray(target);
  const tl = gsap.timeline({ delay });

  elements.forEach(element => {
    const split = new SplitText(element, { type: 'chars' });

    tl.from(
      split.chars,
      {
        opacity: 0,
        y: 20,
        rotationX: -90,
        transformOrigin: '0% 50% -50',
        duration,
        ease,
        stagger: {
          each: stagger,
          from
        },
        force3D: true
      },
      0
    );
  });

  return tl;
}

/**
 * Character fade up - Simple fade with upward movement
 */
export function charFadeUp(
  target: string | HTMLElement | HTMLElement[],
  options: CharRevealOptions = {}
): gsap.core.Timeline {
  const {
    duration = 0.6,
    ease = 'power2.out',
    delay = 0,
    stagger = 0.03,
    distance = 30
  } = options;

  const elements = toArray(target);
  const tl = gsap.timeline({ delay });

  elements.forEach(element => {
    const split = new SplitText(element, { type: 'chars' });

    tl.from(
      split.chars,
      {
        opacity: 0,
        y: distance,
        duration,
        ease,
        stagger,
        force3D: true
      },
      0
    );
  });

  return tl;
}

/**
 * Character wave - Wave-like stagger effect
 */
export function charWave(
  target: string | HTMLElement | HTMLElement[],
  options: CharRevealOptions = {}
): gsap.core.Timeline {
  const {
    duration = 0.6,
    ease = 'back.out(1.7)',
    delay = 0,
    stagger = 0.05
  } = options;

  const elements = toArray(target);
  const tl = gsap.timeline({ delay });

  elements.forEach(element => {
    const split = new SplitText(element, { type: 'chars' });

    tl.from(
      split.chars,
      {
        opacity: 0,
        y: -50,
        rotation: 10,
        scale: 0,
        duration,
        ease,
        stagger: {
          each: stagger,
          from: 'center'
        },
        force3D: true
      },
      0
    );
  });

  return tl;
}

/**
 * Character elastic - Bouncy scale reveal (2025 trend)
 */
export function charElastic(
  target: string | HTMLElement | HTMLElement[],
  options: CharRevealOptions = {}
): gsap.core.Timeline {
  const {
    duration = 1,
    ease = 'elastic.out(1, 0.3)',
    delay = 0,
    stagger = 0.04
  } = options;

  const elements = toArray(target);
  const tl = gsap.timeline({ delay });

  elements.forEach(element => {
    const split = new SplitText(element, { type: 'chars' });

    tl.from(
      split.chars,
      {
        opacity: 0,
        scale: 0,
        rotation: 360,
        transformOrigin: 'center center',
        duration,
        ease,
        stagger,
        force3D: true
      },
      0
    );
  });

  return tl;
}

/**
 * Character blur in - Blur to focus per character (modern)
 */
export function charBlur(
  target: string | HTMLElement | HTMLElement[],
  options: CharRevealOptions = {}
): gsap.core.Timeline {
  const {
    duration = 0.8,
    ease = 'power2.out',
    delay = 0,
    stagger = 0.03
  } = options;

  const elements = toArray(target);
  const tl = gsap.timeline({ delay });

  elements.forEach(element => {
    const split = new SplitText(element, { type: 'chars' });

    tl.from(
      split.chars,
      {
        opacity: 0,
        filter: 'blur(10px)',
        scale: 1.5,
        duration,
        ease,
        stagger,
        force3D: true
      },
      0
    );
  });

  return tl;
}
