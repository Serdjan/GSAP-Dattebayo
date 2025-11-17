/**
 * Line-by-line reveal animations
 * Uses GSAP SplitText for line-level animations
 */

import { gsap, SplitText } from '../utils/gsap-config';
import { toArray } from '../utils/helpers';
import type { DattebayoDefaults } from '../utils/defaults';

export interface LineRevealOptions extends Partial<DattebayoDefaults> {
  stagger?: number;
  clipPath?: boolean;
}

/**
 * Line reveal - Classic line-by-line fade up
 */
export function lineReveal(
  target: string | HTMLElement | HTMLElement[],
  options: LineRevealOptions = {}
): gsap.core.Timeline {
  const {
    duration = 1,
    ease = 'power3.out',
    delay = 0,
    stagger = 0.15,
    distance = 50
  } = options;

  const elements = toArray(target);
  const tl = gsap.timeline({ delay });

  elements.forEach(element => {
    const split = new SplitText(element, { type: 'lines', linesClass: 'line' });

    tl.from(
      split.lines,
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
 * Line clip reveal - Mask-based reveal (modern effect)
 */
export function lineClipReveal(
  target: string | HTMLElement | HTMLElement[],
  options: LineRevealOptions = {}
): gsap.core.Timeline {
  const {
    duration = 1.2,
    ease = 'power4.out',
    delay = 0,
    stagger = 0.1
  } = options;

  const elements = toArray(target);
  const tl = gsap.timeline({ delay });

  elements.forEach(element => {
    const split = new SplitText(element, { type: 'lines', linesClass: 'line' });

    // Wrap lines for overflow hidden
    split.lines.forEach(line => {
      const wrapper = document.createElement('div');
      wrapper.style.overflow = 'hidden';
      line.parentNode?.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    tl.from(
      split.lines,
      {
        yPercent: 100,
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
 * Line slide alternate - Lines slide from alternating sides
 */
export function lineSlideAlternate(
  target: string | HTMLElement | HTMLElement[],
  options: LineRevealOptions = {}
): gsap.core.Timeline {
  const {
    duration = 1,
    ease = 'power2.out',
    delay = 0,
    stagger = 0.12,
    distance = 100
  } = options;

  const elements = toArray(target);
  const tl = gsap.timeline({ delay });

  elements.forEach(element => {
    const split = new SplitText(element, { type: 'lines' });

    split.lines.forEach((line, i) => {
      tl.from(
        line,
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

/**
 * Line scale reveal - Lines scale in from center
 */
export function lineScaleReveal(
  target: string | HTMLElement | HTMLElement[],
  options: LineRevealOptions = {}
): gsap.core.Timeline {
  const {
    duration = 1,
    ease = 'back.out(1.7)',
    delay = 0,
    stagger = 0.1
  } = options;

  const elements = toArray(target);
  const tl = gsap.timeline({ delay });

  elements.forEach(element => {
    const split = new SplitText(element, { type: 'lines' });

    tl.from(
      split.lines,
      {
        opacity: 0,
        scaleX: 0,
        transformOrigin: 'left center',
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
