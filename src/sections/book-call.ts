/**
 * Privilege Interior Solutions - Section 06: Book Us a Call
 * 
 * Final Polish Pass:
 * - Two-column structure: Left narrative & CTA / Right contact information panel
 * - Verified supporting copy: full-home interiors, modular execution, business and office interiors,
 *   glass services with annual maintenance, electrical planning.
 * - Primary CTA: "BOOK A CALL &rarr;" leading to /contact.
 * - Contact Details: +91 8277738659 / +91 9353152080, info@privilegeinteriorsolutions.com,
 *   S.M.V Road, Near Nano Hospitals, Arekere, Bengaluru, Karnataka 560076.
 * - Quiet footer detail: "SINCE 2001".
 */

import type { ISharedScrollEngine } from '../scroll/types.js';
import { VERIFIED_BRAND } from '../navigation/nav-data.js';
import gsap from 'gsap';

export interface BookCallSectionOptions {
  container?: HTMLElement | string | null;
  scrollEngine?: ISharedScrollEngine | null;
}

export interface BookCallHandle {
  readonly element: HTMLElement;
  dispose(): void;
}

export function createBookCallSection(options: BookCallSectionOptions = {}): BookCallHandle {
  if (typeof document === 'undefined') {
    return {
      element: {} as HTMLElement,
      dispose() {}
    };
  }

  const section = document.createElement('section');
  section.id = 'book-us-a-call';
  section.className = 'book-call-section';
  section.setAttribute('data-section', 'book-us-a-call');
  section.setAttribute('aria-label', 'Book Us a Call');

  section.innerHTML = `
    <div class="book-call__container">
      <div class="book-call__grid">
        <!-- Narrative & Conversion Column -->
        <div class="book-call__narrative">
          <div class="book-call__eyebrow">
            <span class="book-call__eyebrow-bullet" aria-hidden="true"></span>
            <span>BOOK US A CALL</span>
          </div>
          <h2 class="book-call__title">Let's talk about your space.</h2>
          <p class="book-call__description">
            Privilege's designers collaborate with clients to create interiors tailored to their needs and tastes, with services spanning full-home interiors, modular execution, business and office interiors, glass services with annual maintenance, and electrical planning.
          </p>
          <div class="book-call__action">
            <a href="/contact" class="book-call__btn" aria-label="Book a Call with Privilege Interior Solutions">
              <span>BOOK A CALL</span>
              <span class="book-call__btn-arrow" aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>

        <!-- Verified Contact Details Panel -->
        <aside class="book-call__coordinates-card" aria-label="Contact Details">
          <div class="book-call__card-header">
            <span class="book-call__card-tag">CONTACT DETAILS</span>
            <span class="book-call__card-city">BENGALURU, KARNATAKA</span>
          </div>

          <div class="book-call__card-body">
            <!-- Direct Telephone Lines -->
            <div class="book-call__coord-item">
              <div class="book-call__coord-phones">
                <a href="tel:${VERIFIED_BRAND.contactSummary.primaryPhone}" class="book-call__coord-link book-call__coord-link--prominent">
                  ${VERIFIED_BRAND.contactSummary.primaryPhone}
                </a>
                <span class="book-call__coord-sep" aria-hidden="true">/</span>
                <a href="tel:${VERIFIED_BRAND.contactSummary.secondaryPhone}" class="book-call__coord-link book-call__coord-link--prominent">
                  ${VERIFIED_BRAND.contactSummary.secondaryPhone}
                </a>
              </div>
            </div>

            <!-- Direct Email Coordinate -->
            <div class="book-call__coord-item">
              <div>
                <a href="mailto:${VERIFIED_BRAND.contactSummary.email}" class="book-call__coord-link book-call__coord-link--prominent">
                  ${VERIFIED_BRAND.contactSummary.email}
                </a>
              </div>
            </div>

            <!-- Studio Location -->
            <div class="book-call__coord-item">
              <address class="book-call__coord-address">
                ${VERIFIED_BRAND.contactSummary.address}
              </address>
            </div>
          </div>

          <div class="book-call__card-footer">
            <span class="book-call__footer-note">SINCE 2001</span>
          </div>
        </aside>
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
      id: 'book-us-a-call',
      element: section,
      order: 6,
      pinned: false
    });
  }

  // Gentle scroll reveal animation
  let animationTween: gsap.core.Tween | null = null;
  let observer: IntersectionObserver | null = null;

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && typeof IntersectionObserver !== 'undefined') {
    const narrative = section.querySelector<HTMLElement>('.book-call__narrative');
    const card = section.querySelector<HTMLElement>('.book-call__coordinates-card');
    if (narrative && card) {
      gsap.set([narrative, card], { opacity: 0, y: 20 });

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animationTween = gsap.to([narrative, card], {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.12,
                ease: 'power2.out'
              });
              if (observer) {
                observer.disconnect();
                observer = null;
              }
            }
          });
        },
        { threshold: 0.05, rootMargin: '80px 0px' }
      );
      observer.observe(section);
    }
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
      options.scrollEngine.unregisterSection('book-us-a-call');
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
