/**
 * Word-by-word reveal animations
 * Uses GSAP SplitText for word-level animations
 */

import { gsap, SplitText } from '../utils/gsap-config';
import { toArray } from '../utils/helpers';
import type { DattebayoDefaults } from '../utils/defaults';

export interface WordRevealOptions extends Partial<DattebayoDefaults> {
  stagger?: number;
  from?: 'start' | 'center' | 'end' | 'random';
}

/**
 * Word fade up - Words reveal with upward movement
 */
export function wordReveal(
  target: string | HTMLElement | HTMLElement[],
  options: WordRevealOptions = {}
): gsap.core.Timeline {
  const {
    duration = 0.8,
    ease = 'power2.out',
    delay = 0,
    stagger = 0.1,
    distance = 30,
    from = 'start'
  } = options;

  const elements = toArray(target);
  const tl = gsap.timeline({ delay });

  elements.forEach(element => {
    const split = new SplitText(element, { type: 'words' });

    tl.from(
      split.words,
      {
        opacity: 0,
        y: distance,
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
 * Word scale in - Words pop in with scale
 */
export function wordScaleIn(
  target: string | HTMLElement | HTMLElement[],
  options: WordRevealOptions = {}
): gsap.core.Timeline {
  const {
    duration = 0.6,
    ease = 'back.out(1.7)',
    delay = 0,
    stagger = 0.08
  } = options;

  const elements = toArray(target);
  const tl = gsap.timeline({ delay });

  elements.forEach(element => {
    const split = new SplitText(element, { type: 'words' });

    tl.from(
      split.words,
      {
        opacity: 0,
        scale: 0,
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
 * Word rotate in - 3D rotation reveal per word
 */
export function wordRotateIn(
  target: string | HTMLElement | HTMLElement[],
  options: WordRevealOptions = {}
): gsap.core.Timeline {
  const {
    duration = 0.8,
    ease = 'power2.out',
    delay = 0,
    stagger = 0.1
  } = options;

  const elements = toArray(target);
  const tl = gsap.timeline({ delay });

  elements.forEach(element => {
    const split = new SplitText(element, { type: 'words' });

    tl.from(
      split.words,
      {
        opacity: 0,
        rotationY: -90,
        transformOrigin: 'left center',
        transformPerspective: 800,
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
 * Word slide alternate - Words slide from alternating directions
 */
export function wordSlideAlternate(
  target: string | HTMLElement | HTMLElement[],
  options: WordRevealOptions = {}
): gsap.core.Timeline {
  const {
    duration = 0.8,
    ease = 'power3.out',
    delay = 0,
    stagger = 0.08,
    distance = 50
  } = options;

  const elements = toArray(target);
  const tl = gsap.timeline({ delay });

  elements.forEach(element => {
    const split = new SplitText(element, { type: 'words' });

    split.words.forEach((word, i) => {
      tl.from(
        word,
        {
          opacity: 0,
          x: i % 2 === 0 ? -distance : distance,
          duration,
          ease,
          force3D: true
        },
        i * stagger
      );
    });
  });

  return tl;
}
