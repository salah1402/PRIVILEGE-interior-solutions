/**
 * Privilege Interior Solutions - Architectural Hero Component
 *
 * PHASE 1C COMPOSITION:
 * - Left side of Hero:
 *     PRIVILEGE
 *     Interior Solutions
 * - Right side of "PRIVILEGE":
 *     React Bits DepthCarousel 3D image stack (8 authentic project images)
 * - Below "PRIVILEGE" / brand lockup:
 *     Supporting narrative copy
 *     Action buttons ([EXPLORE PROJECTS] [START A PROJECT])
 * - Plain, warm, minimal architectural canvas.
 * - ZERO cursor trail or image-following behavior.
 */

import type { ISharedScrollEngine } from '../scroll/types.js';
import {
  createDepthCarousel,
  type DepthCarouselHandle,
  type DepthCarouselItem
} from '../components/depth-carousel.js';

export interface HeroSectionOptions {
  container?: HTMLElement | string | null;
  scrollEngine?: ISharedScrollEngine | null;
}

export interface HeroHandle {
  readonly element: HTMLElement;
  dispose(): void;
}

const AUTHENTIC_HERO_PROJECTS: readonly DepthCarouselItem[] = [
  {
    image: '/assets/about-banner.jpg',
    alt: 'Privilege Interiors — Contemporary Kitchen & Dining Interior',
    label: 'KITCHEN INTERIORS',
    scope: 'Interior Planning & Execution'
  },
  {
    image: '/assets/audit_candidates/49_Luxury_TV_Wall_Ideas.jpg',
    alt: 'Privilege Interiors — Living Room Fluted Woodwork & Architectural TV Feature',
    label: 'RESIDENTIAL LIVING',
    scope: 'Fluted Millwork & Ambient Lighting'
  },
  {
    image: '/assets/audit_candidates/HDR-6.jpg',
    alt: 'Privilege Interiors — Master Bedroom Suite with Custom Wardrobes',
    label: 'MASTER BEDROOM',
    scope: 'Sliding Wardrobes & Acoustic Paneling'
  },
  {
    image: '/assets/audit_candidates/19_Budget-Friendly_Modern_Kitchen_Ideas_for_a_Sleek_Look.jpg',
    alt: 'Privilege Interiors — Handleless Kitchen Cabinetry Architecture',
    label: 'KITCHEN ARCHITECTURE',
    scope: 'Ergonomic Quartz & Matte Finishes'
  },
  {
    image: '/assets/audit_candidates/HDR-20.jpg',
    alt: 'Privilege Interiors — Turnkey Living Architecture & Faux Ceiling Detailing',
    label: 'TURNKEY EXECUTION',
    scope: 'Concealed Illumination & Ceiling Plans'
  },
  {
    image: '/assets/audit_candidates/HDR-10.jpg',
    alt: 'Privilege Interiors — Tailored Dining & Glass Partition Architecture',
    label: 'DINING & PARTITIONS',
    scope: 'Architectural Glass & Metalwork'
  },
  {
    image: '/assets/audit_candidates/HDR-14.jpg',
    alt: 'Privilege Interiors — Luxury Bedroom Storage & Ambient Vanity Suite',
    label: 'BEDROOM SUITE',
    scope: 'Tailored Storage & Vanity Craft'
  },
  {
    image: '/assets/audit_candidates/HDR-30.jpg',
    alt: 'Privilege Interiors — Contemporary Architectural Living Space',
    label: 'CONTEMPORARY LIVING',
    scope: 'Full Space Planning & Execution'
  }
];

export function createHero(options: HeroSectionOptions = {}): HeroHandle {
  if (typeof document === 'undefined') {
    return {
      element: {} as HTMLElement,
      dispose() {}
    };
  }

  const hero = document.createElement('section');
  hero.id = 'hero';
  hero.className = 'hero-canvas-section';
  hero.setAttribute('data-section', 'hero');
  hero.setAttribute('aria-label', 'Privilege Interior Solutions — Editorial Introduction');

  hero.innerHTML = `
    <!-- Subtle tactile plaster grain backdrop (visually calm, material-inspired) -->
    <div class="hero-canvas-texture" aria-hidden="true"></div>

    <!-- Editorial Identity & Content Architecture -->
    <div class="hero-stage-container">
      <div class="hero-editorial-grid">
        
        <!-- Top Rubric: Coordinates & Heritage -->
        <header class="hero-rubric-row">
          <div class="hero-rubric-badge">
            <span class="hero-rubric-dot"></span>
            <span class="hero-rubric-brand">ARCHITECTURAL INTERIORS</span>
          </div>
          <div class="hero-rubric-meta">
            <span>SINCE 2001</span>
            <span class="hero-rubric-sep">•</span>
            <span>BENGALURU</span>
          </div>
        </header>

        <!-- Main Composition: Left Title + Right Depth Carousel, with Supporting Text & CTAs below Title -->
        <div class="hero-main-composition">
          
          <!-- Left Column: Title Lockup + Narrative + Actions -->
          <div class="hero-left-column">
            
            <div class="hero-identity-wrap">
              <h1 class="hero-title">
                <span class="hero-title-main">PRIVILEGE</span>
                <span class="hero-title-sub">Interior Solutions</span>
              </h1>
            </div>

            <div class="hero-narrative-wrap">
              <p class="hero-lead-text">
                Operating since 2001 in Bengaluru. Privilege provides professional interior solutions for residential, shop, social, office, and commercial spaces.
              </p>

              <!-- Actions -->
              <div class="hero-actions-row">
                <a href="/projects" class="btn btn-primary" aria-label="Explore Projects">
                  <span>Explore Projects</span>
                  <span class="btn-arrow" aria-hidden="true">&rarr;</span>
                </a>
                <a href="/contact" class="btn btn-secondary" aria-label="Start a Project">
                  <span>Start a Project</span>
                  <span class="btn-arrow" aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>

          </div>

          <!-- Right Column: Depth Carousel 3D Image Stack -->
          <div class="hero-right-column" id="hero-carousel-slot">
          </div>

        </div>

        <!-- Bottom Architectural Coordinate Strip -->
        <footer class="hero-bottom-strip">
          <div class="hero-col-item">
            <span class="hero-col-title">CAPABILITY</span>
            <span class="hero-col-desc">Residential & Commercial Interiors</span>
          </div>
          <div class="hero-col-item">
            <span class="hero-col-title">EXPERIENCE</span>
            <span class="hero-col-desc">Operating Since 2001</span>
          </div>
          <div class="hero-col-item hero-col-item--project-count">
            <span class="hero-col-title">LOCATION</span>
            <span class="hero-col-desc">Bengaluru, Karnataka</span>
          </div>
        </footer>

      </div>
    </div>
  `;

  // Mount Depth Carousel into slot
  const carouselSlot = hero.querySelector<HTMLElement>('#hero-carousel-slot');
  let carouselHandle: DepthCarouselHandle | null = null;

  if (carouselSlot) {
    carouselHandle = createDepthCarousel({
      items: AUTHENTIC_HERO_PROJECTS,
      cardWidth: 340,
      cardHeight: 440,
      radius: 16,
      depth: 185,
      spread: 68,
      tilt: 16,
      tiltDirection: 'right',
      perspective: 1400,
      visibleCards: 3,
      autoplay: false,
      loop: true,
      showControls: true,
      showIndicators: true
    });
    carouselSlot.appendChild(carouselHandle.element);
  }

  let targetContainer: HTMLElement | null = null;
  if (typeof options.container === 'string') {
    targetContainer = document.querySelector<HTMLElement>(options.container);
  } else if (options.container instanceof HTMLElement) {
    targetContainer = options.container;
  }

  if (targetContainer) {
    targetContainer.appendChild(hero);
  } else {
    const defaultRoot = document.getElementById('site-root') || document.body;
    defaultRoot.appendChild(hero);
  }

  if (options.scrollEngine) {
    options.scrollEngine.registerSection({
      id: 'hero',
      element: hero,
      order: 1,
      pinned: false
    });
  }

  function dispose(): void {
    if (carouselHandle) {
      carouselHandle.dispose();
      carouselHandle = null;
    }
    if (options.scrollEngine) {
      options.scrollEngine.unregisterSection('hero');
    }
    hero.remove();
  }

  return {
    get element() {
      return hero;
    },
    dispose
  };
}
