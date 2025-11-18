/**
 * Scroll progress indicators
 * Visual feedback for scroll position
 */

import { gsap, ScrollTrigger } from '../utils/gsap-config';
import type { DattebayoDefaults } from '../utils/defaults';

export interface ProgressOptions extends Partial<DattebayoDefaults> {
  direction?: 'horizontal' | 'vertical';
  thickness?: number;
  color?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

/**
 * Scroll progress bar - Page-level progress indicator
 */
export function scrollProgress(
  options: ProgressOptions = {}
): HTMLElement {
  const {
    direction = 'horizontal',
    thickness = 4,
    color = '#3b82f6',
    position = 'top'
  } = options;

  // Create progress bar element
  const progressBar = document.createElement('div');
  progressBar.className = 'gsap-scroll-progress';

  // Style the progress bar
  const isHorizontal = direction === 'horizontal';
  Object.assign(progressBar.style, {
    position: 'fixed',
    [position]: '0',
    [isHorizontal ? 'left' : 'top']: '0',
    [isHorizontal ? 'width' : 'height']: '0%',
    [isHorizontal ? 'height' : 'width']: `${thickness}px`,
    backgroundColor: color,
    zIndex: '9999',
    transformOrigin: '0 0'
  });

  document.body.appendChild(progressBar);

  // Animate on scroll
  gsap.to(progressBar, {
    [isHorizontal ? 'width' : 'height']: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true
    }
  });

  return progressBar;
}

/**
 * Section progress - Progress for specific section
 */
export function sectionProgress(
  target: string | HTMLElement,
  options: ProgressOptions = {}
): HTMLElement {
  const {
    direction = 'vertical',
    thickness = 4,
    color = '#3b82f6',
    position = 'left'
  } = options;

  const targetElement = typeof target === 'string'
    ? document.querySelector<HTMLElement>(target)
    : target;

  if (!targetElement) throw new Error('Section progress target not found');

  // Create progress indicator
  const indicator = document.createElement('div');
  indicator.className = 'gsap-section-progress';

  const isVertical = direction === 'vertical';
  Object.assign(indicator.style, {
    position: 'absolute',
    [position]: '0',
    [isVertical ? 'top' : 'left']: '0',
    [isVertical ? 'height' : 'width']: '0%',
    [isVertical ? 'width' : 'height']: `${thickness}px`,
    backgroundColor: color,
    transformOrigin: '0 0'
  });

  targetElement.style.position = 'relative';
  targetElement.appendChild(indicator);

  // Animate based on section scroll
  gsap.to(indicator, {
    [isVertical ? 'height' : 'width']: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: targetElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true
    }
  });

  return indicator;
}

/**
 * Circular progress - Circular scroll indicator
 */
export function circularProgress(
  options: ProgressOptions & { size?: number } = {}
): HTMLElement {
  const {
    size = 60,
    thickness = 4,
    color = '#3b82f6',
    position = 'bottom'
  } = options;

  // Create SVG circle
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.style.position = 'fixed';
  svg.style[position as any] = '20px';
  svg.style.right = '20px';
  svg.style.zIndex = '9999';

  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  circle.setAttribute('cx', String(size / 2));
  circle.setAttribute('cy', String(size / 2));
  circle.setAttribute('r', String(radius));
  circle.setAttribute('fill', 'none');
  circle.setAttribute('stroke', color);
  circle.setAttribute('stroke-width', String(thickness));
  circle.setAttribute('stroke-dasharray', String(circumference));
  circle.setAttribute('stroke-dashoffset', String(circumference));
  circle.setAttribute('transform', `rotate(-90 ${size / 2} ${size / 2})`);

  svg.appendChild(circle);
  document.body.appendChild(svg);

  // Animate circle
  gsap.to(circle, {
    strokeDashoffset: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true
    }
  });

  return svg;
}

/**
 * Scroll percentage - Update element with scroll percentage
 */
export function scrollPercentage(
  target: string | HTMLElement,
  options: ProgressOptions = {}
): ScrollTrigger {
  const targetElement = typeof target === 'string'
    ? document.querySelector<HTMLElement>(target)
    : target;

  if (!targetElement) throw new Error('Scroll percentage target not found');

  return ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: self => {
      const percentage = Math.round(self.progress * 100);
      targetElement.textContent = `${percentage}%`;
    }
  });
}
