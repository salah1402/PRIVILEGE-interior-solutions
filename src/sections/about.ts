/**
 * Privilege Interior Solutions - About Section Structural Component
 * 
 * Redesigned to act as an authentic, direct, warm continuation of the Hero section:
 * - Light, warm, quiet architectural editorial aesthetic (warm ivory / soft sand / pale oak undertones).
 * - Extreme clarity and restrained hierarchy:
 *     ABOUT &bull; SINCE 2001
 *     "Designing spaces around the way people live."
 *     Concise, factual company narrative derived strictly from verified source truth.
 * - Restrained editorial visual composition featuring authentic client project photography (about-banner.jpg).
 * - Minimal secondary capability strip (Turnkey Living, Precision Millwork, Architectural Glass).
 * - Connected seamlessly to the existing SharedScrollEngine for subtle scroll-driven reveals.
 */

import type { ISharedScrollEngine } from '../scroll/types.js';

export interface AboutSectionOptions {
  /** Target container element or selector to append into. Defaults to '#site-root'. */
  container?: HTMLElement | string | null;
  /** SharedScrollEngine instance for synchronized registration. */
  scrollEngine?: ISharedScrollEngine | null;
}

export interface AboutHandle {
  readonly element: HTMLElement;
  dispose(): void;
}

export function createAboutSection(options: AboutSectionOptions = {}): AboutHandle {
  if (typeof document === 'undefined') {
    return {
      element: {} as HTMLElement,
      dispose() {}
    };
  }

  // 1. Build About DOM Shell
  const about = document.createElement('section');
  about.id = 'about';
  about.className = 'about-section';
  about.setAttribute('data-section', 'about');
  about.setAttribute('aria-label', 'About Privilege Interior Solutions');

  about.innerHTML = `
    <!-- Subtle tactile background ambient canvas -->
    <div class="about-bg-canvas" aria-hidden="true">
      <div class="about-bg-base"></div>
      <div class="about-bg-texture"></div>
      <div class="about-bg-light"></div>
    </div>

    <div class="about-container">
      
      <!-- Top Meta Coordinates (matching Hero's architectural rubric) -->
      <header class="about-meta-bar" data-about-elem="meta">
        <div class="about-meta-eyebrow">
          <span class="about-meta-dot"></span>
          <span class="about-meta-label">ABOUT</span>
        </div>
        <div class="about-meta-origin">
          <span class="about-meta-tag">BENGALURU</span>
          <span class="about-meta-sep">&bull;</span>
          <span class="about-meta-tag">SINCE 2001</span>
        </div>
      </header>

      <!-- Main Editorial Story Composition -->
      <div class="about-story-grid">
        
        <!-- Left: Statement & Verified Narrative -->
        <div class="about-story-text" data-about-elem="story-text">
          <h2 class="about-statement">
            About Privilege Interior Solutions
          </h2>
          
          <div class="about-narrative">
            <p class="about-lead-para">
              Operating since 2001 in Bengaluru, providing professional interior solutions across residential, shop, social, and commercial spaces.
            </p>
            <p class="about-body-para">
              We collaborate closely with every client to develop spaces suited to their requirements and tastes&mdash;combining spatial planning, 3D architectural visualization, modular execution, and specialized glass installations with ongoing annual maintenance.
            </p>
          </div>
        </div>

        <!-- Right: Authentic Client Visual Frame (about-banner.jpg) -->
        <div class="about-story-visual" data-about-elem="story-visual">
          <div class="about-image-frame">
            <img 
              src="/assets/about-banner.jpg" 
              alt="Privilege Interiors modular kitchen execution with custom joinery and architectural lighting" 
              class="about-image"
              loading="lazy"
              decoding="async"
              width="600"
              height="600"
            />
            <div class="about-image-caption" aria-hidden="true">
              <span class="about-caption-label">RESIDENTIAL EXECUTION</span>
              <span class="about-caption-sub">Tailored Joinery &bull; Integrated Finishes</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Secondary Capability Strip (Clean, restrained architectural list) -->
      <div class="about-capabilities" data-about-elem="capabilities">
        <div class="about-capabilities-heading">
          <span class="about-cap-kicker">CORE CAPABILITIES</span>
          <span class="about-cap-line" aria-hidden="true"></span>
        </div>

        <div class="about-capabilities-grid">
          
          <div class="about-cap-item">
            <span class="about-cap-number">01</span>
            <div class="about-cap-content">
              <h3 class="about-cap-title">Residential &amp; Commercial Interiors</h3>
              <p class="about-cap-desc">
                Architectural consultation, 3D space modeling, and full interior execution tailored for residences, retail, and workplaces.
              </p>
            </div>
          </div>

          <div class="about-cap-item">
            <span class="about-cap-number">02</span>
            <div class="about-cap-content">
              <h3 class="about-cap-title">Precision Modular Execution</h3>
              <p class="about-cap-desc">
                Modular kitchens, custom wardrobes, false ceilings, and architectural panelling built with enduring materials.
              </p>
            </div>
          </div>

          <div class="about-cap-item">
            <span class="about-cap-number">03</span>
            <div class="about-cap-content">
              <h3 class="about-cap-title">Architectural Glass Services</h3>
              <p class="about-cap-desc">
                Specialized interior glass installations, custom fittings, and dedicated annual maintenance support across Bengaluru.
              </p>
            </div>
          </div>

        </div>
      </div>

      <!-- Footer Coordinates & Micro Provenance -->
      <footer class="about-footer-meta" data-about-elem="footer-meta">
        <span class="about-footer-item">
          <strong>Operating</strong> Since 2001
        </span>
        <span class="about-footer-item">
          <strong>Bengaluru</strong> S.M.V Road, Arekere
        </span>
        <span class="about-footer-item">
          <strong>Comprehensive</strong> Interior Solutions
        </span>
      </footer>

    </div>
  `;

  // 2. Mount into Target Container
  let targetContainer: HTMLElement | null = null;
  if (typeof options.container === 'string') {
    targetContainer = document.querySelector<HTMLElement>(options.container);
  } else if (options.container instanceof HTMLElement) {
    targetContainer = options.container;
  }

  if (targetContainer) {
    targetContainer.appendChild(about);
  } else {
    const defaultRoot = document.getElementById('site-root');
    if (defaultRoot) {
      defaultRoot.appendChild(about);
    } else {
      document.body.appendChild(about);
    }
  }

  // 3. Register with SharedScrollEngine
  let unsubscribeScroll: (() => void) | null = null;
  if (options.scrollEngine) {
    options.scrollEngine.registerSection({
      id: 'about',
      element: about,
      order: 2,
      pinned: false
    });

    // Subtle scroll-driven parallax / opacity entrance tied to SharedScrollEngine
    const storyVisual = about.querySelector<HTMLElement>('.about-story-visual');
    const statement = about.querySelector<HTMLElement>('.about-statement');
    const capabilities = about.querySelector<HTMLElement>('.about-capabilities');

    unsubscribeScroll = options.scrollEngine.subscribeSection('about', (sectionState) => {
      // sectionState.progress is 0 -> 1 as About enters and travels through viewport
      const p = sectionState.progress;
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      if (storyVisual) {
        // Very subtle upward floating parallax for architectural depth
        const translateY = Math.max(-24, (1 - p) * 20);
        storyVisual.style.transform = `translate3d(0, ${translateY}px, 0)`;
      }

      if (statement && p > 0) {
        const opacity = Math.min(1, 0.4 + p * 0.8);
        statement.style.opacity = `${opacity}`;
      }
    });
  }

  // 4. Dispose Handle
  function dispose() {
    if (unsubscribeScroll) {
      unsubscribeScroll();
      unsubscribeScroll = null;
    }
    if (options.scrollEngine) {
      options.scrollEngine.unregisterSection('about');
    }
    about.remove();
  }

  return {
    get element() {
      return about;
    },
    dispose
  };
}
