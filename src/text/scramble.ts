/**
 * Scramble/Glitch text animations
 * Modern cyberpunk-style text reveals
 */

import { gsap, SplitText } from '../utils/gsap-config';
import { toArray } from '../utils/helpers';
import type { DattebayoDefaults } from '../utils/defaults';

export interface ScrambleOptions extends Partial<DattebayoDefaults> {
  chars?: string;
  revealDelay?: number;
  scrambleSpeed?: number;
}

/**
 * Scramble text reveal - GSAP ScrambleText plugin
 */
export function scrambleReveal(
  target: string | HTMLElement | HTMLElement[],
  options: ScrambleOptions = {}
): gsap.core.Timeline {
  const {
    duration = 2,
    delay = 0,
    chars = 'lowerCase'
  } = options;

  const elements = toArray(target);
  const tl = gsap.timeline({ delay });

  elements.forEach(element => {
    const originalText = element.textContent || '';

    tl.to(element, {
      scrambleText: {
        text: originalText,
        chars: chars,
        speed: 0.3
      },
      duration: duration,
      ease: 'none'
    }, 0);
  });

  return tl;
}

/**
 * Glitch reveal - Digital glitch effect
 */
export function glitchReveal(
  target: string | HTMLElement | HTMLElement[],
  options: ScrambleOptions = {}
): gsap.core.Timeline {
  const {
    duration = 1.5,
    ease = 'power2.out',
    delay = 0
  } = options;

  const elements = toArray(target);
  const tl = gsap.timeline({ delay });

  elements.forEach(element => {
    // Clone original text for glitch layers
    const originalText = element.textContent || '';
    element.style.position = 'relative';

    // Create glitch effect with multiple rapid animations
    const glitchCount = 8;
    for (let i = 0; i < glitchCount; i++) {
      const glitchDelay = (duration / glitchCount) * i;

      tl.fromTo(
        element,
        {
          opacity: 0,
          x: Math.random() * 10 - 5,
          skewX: Math.random() * 20 - 10,
          filter: `hue-rotate(${Math.random() * 360}deg)`
        },
        {
          opacity: 1,
          x: 0,
          skewX: 0,
          filter: 'hue-rotate(0deg)',
          duration: duration / glitchCount,
          ease,
          force3D: true
        },
        glitchDelay
      );
    }
  });

  return tl;
}

/**
 * Matrix reveal - Matrix-style falling characters
 */
export function matrixReveal(
  target: string | HTMLElement | HTMLElement[],
  options: ScrambleOptions = {}
): gsap.core.Timeline {
  const {
    duration = 2,
    delay = 0,
    chars = '01',
    stagger = 0.05
  } = options;

  const elements = toArray(target);
  const tl = gsap.timeline({ delay });

  elements.forEach(element => {
    const split = new SplitText(element, { type: 'chars' });
    const getRandomChar = () => chars.charAt(Math.floor(Math.random() * chars.length));

    split.chars.forEach((char, i) => {
      const originalChar = char.textContent || '';

      // Scramble phase
      const scrambleDuration = duration * 0.7;
      const revealAt = scrambleDuration + i * stagger;

      // Rapid character changes
      for (let j = 0; j < 10; j++) {
        tl.to(
          {},
          {
            duration: scrambleDuration / 10,
            onStart: () => {
              char.textContent = getRandomChar();
            }
          },
          (scrambleDuration / 10) * j
        );
      }

      // Final reveal
      tl.to(
        {},
        {
          duration: 0.1,
          onComplete: () => {
            char.textContent = originalChar;
          }
        },
        revealAt
      );

      // Fade in
      tl.from(
        char,
        {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: 'power2.out',
          force3D: true
        },
        revealAt
      );
    });
  });

  return tl;
}
