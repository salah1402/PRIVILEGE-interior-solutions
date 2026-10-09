/**
 * Privilege Interior Solutions - Dedicated About Page View
 *
 * Implements a short, premium, editorial About page with normal page scroll:
 * 1. INTRO:
 *    - PAGE — ABOUT US
 *    - About Privilege Interior Solutions
 *    - Operating since 2001 in Bengaluru, providing interior solutions for residential, shop, social, and commercial clients.
 * 2. ABOUT STORY (Two-column layout):
 *    - LEFT:
 *      * ESTABLISHED 2001 • BENGALURU
 *      * Privilege Interiors
 *      * Concise verified company description
 *    - RIGHT:
 *      * Authentic /assets/about-banner.jpg
 * 3. CTA:
 *    - Have a space in mind?
 *    - Get in Touch → (/contact)
 */

import type { ISharedScrollEngine } from '../scroll/types.js';

export interface AboutViewOptions {
  scrollEngine?: ISharedScrollEngine | null;
}

export interface AboutViewHandle {
  readonly element: HTMLElement;
  dispose(): void;
}

export function renderAboutView(options: AboutViewOptions = {}): AboutViewHandle {
  const container = document.createElement('div');
  container.className = 'about-page';
  container.setAttribute('data-page', 'about');

  container.innerHTML = `
    <!-- 1. INTRO -->
    <header class="about-page__intro">
      <div class="about-page__container">
        <div class="about-page__badge">
          <span class="about-page__badge-dot" aria-hidden="true"></span>
          <span class="about-page__badge-text">PAGE — ABOUT US</span>
        </div>
        <h1 class="about-page__intro-title">About Privilege Interior Solutions</h1>
        <p class="about-page__intro-sub">
          Operating since 2001 in Bengaluru, providing interior solutions for residential, shop, social, and commercial clients.
        </p>
      </div>
    </header>

    <!-- 2. ABOUT (Two-column layout) -->
    <section class="about-page__story" aria-label="About Privilege Interiors">
      <div class="about-page__container about-page__story-grid">
        <!-- LEFT: Verified Narrative -->
        <div class="about-page__story-content">
          <span class="about-page__kicker">ESTABLISHED 2001 &bull; BENGALURU</span>
          <h2 class="about-page__story-title">Privilege Interiors</h2>
          <div class="about-page__story-body">
            <p>
              Privilege Interior Solutions brings together highly skilled and experienced architects and designers dedicated to delivering professional interior services. With close attention to client requirements and tastes, we execute interiors using quality materials across residential, shops, social, and commercial spaces.
            </p>
            <p>
              Our capabilities also include specialized glass-related services with dedicated annual maintenance support across Bengaluru.
            </p>
          </div>
        </div>

        <!-- RIGHT: Authentic Visual -->
        <div class="about-page__story-media">
          <div class="about-page__image-frame">
            <img
              src="/assets/about-banner.jpg"
              alt="Privilege Interior Solutions execution in Bengaluru"
              class="about-page__image"
              loading="eager"
              decoding="async"
              width="640"
              height="480"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 3. CTA -->
    <section class="about-page__cta" aria-label="Get in Touch">
      <div class="about-page__container about-page__cta-box">
        <div class="about-page__cta-content">
          <h2 class="about-page__cta-title">Have a space in mind?</h2>
        </div>
        <div class="about-page__cta-action">
          <a href="/contact" class="about-page__cta-btn">
            <span>Get in Touch</span>
            <span class="about-page__cta-arrow" aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  `;

  function dispose(): void {
    container.remove();
  }

  return {
    element: container,
    dispose
  };
}
