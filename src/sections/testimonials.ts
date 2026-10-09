/**
 * Privilege Interior Solutions - Section 05: What Our Clients Said
 * 
 * Clean 3-panel testimonial format:
 * - Centered section heading
 * - 3 equal testimonial panels in one row on desktop
 * - Small quote-mark icon at the top
 * - Testimonial centered in the panel
 * - Client name underneath
 * - Thin Privilege bronze accent along the bottom
 * 
 * Verified Content:
 * 1. Rahul Kumar: “Our experience with Privilege was nice thanks to the project managers.”
 * 2. Imran Deewan: “I had a great deal, very reasonable price and quality service.”
 * 3. Ruby October: “We reached out and they designed the house that we really wanted.”
 * 
 * Strictly no fabricated ratings, occupations, or extra credentials.
 */

import type { ISharedScrollEngine } from '../scroll/types.js';
import gsap from 'gsap';

export interface TestimonialsOptions {
  container?: HTMLElement | string | null;
  scrollEngine?: ISharedScrollEngine | null;
}

export interface TestimonialsHandle {
  readonly element: HTMLElement;
  dispose(): void;
}

export function createTestimonialsSection(options: TestimonialsOptions = {}): TestimonialsHandle {
  if (typeof document === 'undefined') {
    return {
      element: {} as HTMLElement,
      dispose() {}
    };
  }

  const section = document.createElement('section');
  section.id = 'what-our-clients-said';
  section.className = 'testimonials-editorial';
  section.setAttribute('data-section', 'what-our-clients-said');
  section.setAttribute('aria-label', 'What Our Clients Said');

  section.innerHTML = `
    <div class="testimonials__container">
      <header class="testimonials__header">
        <div class="testimonials__eyebrow">
          <span class="testimonials__eyebrow-bullet" aria-hidden="true"></span>
          <span>WHAT OUR CLIENTS SAID</span>
        </div>
        <h2 class="testimonials__title">What Our Clients Said</h2>
      </header>

      <div class="testimonials__grid">
        <!-- Panel 1: Rahul Kumar -->
        <article class="testimonial-card">
          <div class="testimonial-card__icon-wrapper" aria-hidden="true">
            <svg class="testimonial-card__quote-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M10 4.5v6c0 4.5-3 7.5-7 8.5l-.8-1.7c2-.7 3.3-2 3.3-3.8H2v-9h8zm12 0v6c0 4.5-3 7.5-7 8.5l-.8-1.7c2-.7 3.3-2 3.3-3.8H14v-9h8z" />
            </svg>
          </div>
          <p class="testimonial-card__quote">
            “Our experience with Privilege was nice thanks to the project managers.”
          </p>
          <div class="testimonial-card__author">
            Rahul Kumar
          </div>
        </article>

        <!-- Panel 2: Imran Deewan -->
        <article class="testimonial-card">
          <div class="testimonial-card__icon-wrapper" aria-hidden="true">
            <svg class="testimonial-card__quote-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M10 4.5v6c0 4.5-3 7.5-7 8.5l-.8-1.7c2-.7 3.3-2 3.3-3.8H2v-9h8zm12 0v6c0 4.5-3 7.5-7 8.5l-.8-1.7c2-.7 3.3-2 3.3-3.8H14v-9h8z" />
            </svg>
          </div>
          <p class="testimonial-card__quote">
            “I had a great deal, very reasonable price and quality service.”
          </p>
          <div class="testimonial-card__author">
            Imran Deewan
          </div>
        </article>

        <!-- Panel 3: Ruby October -->
        <article class="testimonial-card">
          <div class="testimonial-card__icon-wrapper" aria-hidden="true">
            <svg class="testimonial-card__quote-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M10 4.5v6c0 4.5-3 7.5-7 8.5l-.8-1.7c2-.7 3.3-2 3.3-3.8H2v-9h8zm12 0v6c0 4.5-3 7.5-7 8.5l-.8-1.7c2-.7 3.3-2 3.3-3.8H14v-9h8z" />
            </svg>
          </div>
          <p class="testimonial-card__quote">
            “We reached out and they designed the house that we really wanted.”
          </p>
          <div class="testimonial-card__author">
            Ruby October
          </div>
        </article>
      </div>
    </div>
  `;

  let targetContainer: HTMLElement | null = null;
  if (typeof options.container === 'string') {
    targetContainer = document.querySelector<HTMLElement>(options.container);
  } else if (options.container instanceof HTMLElement) {
    targetContainer = options.container;
  }

  if (targetContainer) {
    targetContainer.appendChild(section);
  } else {
    const defaultRoot = document.getElementById('site-root') || document.body;
    defaultRoot.appendChild(section);
  }

  if (options.scrollEngine) {
    options.scrollEngine.registerSection({
      id: 'what-our-clients-said',
      element: section,
      order: 5,
      pinned: false
    });
  }

  // Subtle scroll reveal for the three panels
  let animationTween: gsap.core.Tween | null = null;
  let observer: IntersectionObserver | null = null;

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && typeof IntersectionObserver !== 'undefined') {
    const cards = section.querySelectorAll<HTMLElement>('.testimonial-card');
    gsap.set(cards, { opacity: 0, y: 16 });

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animationTween = gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: 'power2.out'
            });
            if (observer) {
              observer.disconnect();
              observer = null;
            }
          }
        });
      },
      { threshold: 0.01, rootMargin: '100px 0px' }
    );
    observer.observe(section);
  }

  function dispose(): void {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    if (animationTween) {
      animationTween.kill();
      animationTween = null;
    }
    if (options.scrollEngine) {
      options.scrollEngine.unregisterSection('what-our-clients-said');
    }
    section.remove();
  }

  return {
    get element() {
      return section;
    },
    dispose
  };
}
