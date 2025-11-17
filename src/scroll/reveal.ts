/**
 * Scroll reveal animations
 * Elements animate when they enter the viewport
 */

import { gsap, ScrollTrigger } from '../utils/gsap-config';
import { toArray } from '../utils/helpers';
import type { DattebayoDefaults } from '../utils/defaults';

export interface ScrollRevealOptions extends Partial<DattebayoDefaults> {
  animation?: 'fade' | 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'zoom' | 'slide';
  trigger?: string | HTMLElement;
  scrub?: boolean | number;
  pin?: boolean;
  toggleActions?: string;
}

/**
 * Scroll reveal - Animate elements as they enter viewport
 */
export function scrollReveal(
  target: string | HTMLElement | HTMLElement[],
  options: ScrollRevealOptions = {}
): ScrollTrigger[] {
  const {
    animation = 'fadeUp',
    duration = 1,
    ease = 'power2.out',
    start = 'top 80%',
    end = 'bottom 20%',
    once = false,
    markers = false,
    distance = 50,
    stagger = 0
  } = options;

  const elements = toArray(target);
  const triggers: ScrollTrigger[] = [];

  // Animation presets
  const animations: Record<string, gsap.TweenVars> = {
    fade: { opacity: 0 },
    fadeUp: { opacity: 0, y: distance },
    fadeDown: { opacity: 0, y: -distance },
    fadeLeft: { opacity: 0, x: distance },
    fadeRight: { opacity: 0, x: -distance },
    zoom: { opacity: 0, scale: 0.5 },
    slide: { x: -100 }
  };

  const fromVars = animations[animation] || animations.fadeUp;

  elements.forEach((element, i) => {
    gsap.from(element, {
      ...fromVars,
      duration,
      ease,
      delay: i * stagger,
      scrollTrigger: {
        trigger: element,
        start,
        end,
        markers,
        once,
        toggleActions: once ? 'play none none none' : 'play none none reverse'
      }
    });

    const st = ScrollTrigger.getById(element.dataset.scrollTriggerId || '');
    if (st) triggers.push(st);
  });

  return triggers;
}

/**
 * Batch scroll reveal - Optimized for many elements
 */
export function batchScrollReveal(
  target: string | HTMLElement | HTMLElement[],
  options: ScrollRevealOptions = {}
): ScrollTrigger {
  const {
    animation = 'fadeUp',
    duration = 1,
    ease = 'power2.out',
    start = 'top 80%',
    stagger = 0.1,
    distance = 50,
    once = false
  } = options;

  const animations: Record<string, gsap.TweenVars> = {
    fade: { opacity: 0 },
    fadeUp: { opacity: 0, y: distance },
    fadeDown: { opacity: 0, y: -distance },
    fadeLeft: { opacity: 0, x: distance },
    fadeRight: { opacity: 0, x: -distance },
    zoom: { opacity: 0, scale: 0.5 }
  };

  const fromVars = animations[animation] || animations.fadeUp;

  return ScrollTrigger.batch(target as string, {
    onEnter: batch => {
      gsap.from(batch, {
        ...fromVars,
        duration,
        ease,
        stagger,
        overwrite: 'auto'
      });
    },
    onLeaveBack: !once ? batch => {
      gsap.to(batch, {
        ...fromVars,
        duration: duration * 0.5,
        overwrite: 'auto'
      });
    } : undefined,
    start,
    once
  });
}

/**
 * Pin section - Pin element while scrolling
 */
export function pinSection(
  target: string | HTMLElement,
  options: ScrollRevealOptions = {}
): ScrollTrigger {
  const {
    start = 'top top',
    end = '+=100%',
    pin = true,
    scrub = false,
    markers = false
  } = options;

  const element = typeof target === 'string'
    ? document.querySelector<HTMLElement>(target)
    : target;

  if (!element) throw new Error('Pin target not found');

  return ScrollTrigger.create({
    trigger: element,
    start,
    end,
    pin,
    scrub,
    markers
  });
}

/**
 * Scrub animation - Animation tied to scroll position
 */
export function scrubAnimation(
  target: string | HTMLElement | HTMLElement[],
  animationVars: gsap.TweenVars,
  options: ScrollRevealOptions = {}
): gsap.core.Tween[] {
  const {
    start = 'top bottom',
    end = 'bottom top',
    scrub = 1,
    markers = false
  } = options;

  const elements = toArray(target);
  const tweens: gsap.core.Tween[] = [];

  elements.forEach(element => {
    const tween = gsap.to(element, {
      ...animationVars,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
        markers
      }
    });

    tweens.push(tween);
  });

  return tweens;
}

/**
 * Horizontal scroll - Horizontal scrolling section
 */
export function horizontalScroll(
  container: string | HTMLElement,
  options: ScrollRevealOptions = {}
): ScrollTrigger {
  const {
    scrub = 1,
    pin = true,
    markers = false
  } = options;

  const containerElement = typeof container === 'string'
    ? document.querySelector<HTMLElement>(container)
    : container;

  if (!containerElement) throw new Error('Horizontal scroll container not found');

  const sections = containerElement.querySelectorAll<HTMLElement>('[data-scroll-section]');
  const totalWidth = Array.from(sections).reduce((acc, section) => acc + section.offsetWidth, 0);

  return gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: containerElement,
      pin,
      scrub,
      markers,
      end: () => `+=${totalWidth}`,
      invalidateOnRefresh: true
    }
  }).scrollTrigger as ScrollTrigger;
}
