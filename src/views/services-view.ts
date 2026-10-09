/**
 * Privilege Interior Solutions - Dedicated Services Page View
 *
 * Implements a compact, premium Services page with normal document scroll:
 * 1. INTRO:
 *    - PAGE — SERVICES
 *    - Interior Design & Execution
 *    - Supporting copy: From planning and design to execution, Privilege provides professional interior solutions across residential, shop, social, office, and commercial spaces.
 *    - Primary CTA: Consult an Architect → (/contact)
 * 2. OUR APPROACH:
 *    - CONSULT: Understanding client requirements, spatial parameters, and aesthetic tastes to define the project foundation.
 *    - DESIGN: Developing comprehensive spatial layouts, architectural models, and material plans tailored to the space.
 *    - EXECUTE: Delivering professional on-site execution with quality materials, skilled craftsmanship, and meticulous standards.
 * 3. SERVICES (7 Verified Services + Glass Services AMC):
 *    - 01 — Floor & Furniture Plans
 *    - 02 — Reflected Ceiling Plans
 *    - 03 — Elevations
 *    - 04 — Kitchen Plans
 *    - 05 — Business Interiors
 *    - 06 — Office Interiors
 *    - 07 — Electrical Plans
 *    - Glass-Related Services with Annual Maintenance (AMC)
 * 4. CTA:
 *    - Have a project in mind?
 *    - Get in Touch → (/contact)
 * 5. NO FOOTER:
 *    - Does NOT mount legacy Section 07 footer.
 */

import type { ISharedScrollEngine } from '../scroll/types.js';

export interface ServicesViewOptions {
  scrollEngine?: ISharedScrollEngine | null;
}

export interface ServicesViewHandle {
  readonly element: HTMLElement;
  dispose(): void;
}

export function renderServicesView(options: ServicesViewOptions = {}): ServicesViewHandle {
  const container = document.createElement('div');
  container.className = 'services-page';
  container.setAttribute('data-page', 'services');

  container.innerHTML = `
    <!-- 1. INTRO -->
    <header class="services-page__intro">
      <div class="services-page__container">
        <div class="services-page__badge">
          <span class="services-page__badge-dot" aria-hidden="true"></span>
          <span class="services-page__badge-text">PAGE — SERVICES</span>
        </div>
        <h1 class="services-page__intro-title">Interior Design &amp; Execution</h1>
        <p class="services-page__intro-sub">
          From planning and design to execution, Privilege provides professional interior solutions across residential, shop, social, office, and commercial spaces.
        </p>
        <div class="services-page__intro-action">
          <a href="/contact" class="services-page__btn services-page__btn--primary">
            <span>Consult an Architect</span>
            <span class="services-page__btn-arrow" aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </header>

    <!-- 2. OUR APPROACH -->
    <section class="services-page__approach" aria-label="Our Approach">
      <div class="services-page__container">
        <div class="services-page__section-header">
          <span class="services-page__kicker">METHODOLOGY</span>
          <h2 class="services-page__section-title">Our Approach</h2>
        </div>

        <div class="services-page__approach-grid">
          <article class="services-page__approach-card">
            <span class="services-page__step-num">01</span>
            <h3 class="services-page__step-title">CONSULT</h3>
            <p class="services-page__step-desc">
              We listen closely to your requirements, functional priorities, and aesthetic tastes to establish a precise project foundation.
            </p>
          </article>

          <article class="services-page__approach-card">
            <span class="services-page__step-num">02</span>
            <h3 class="services-page__step-title">DESIGN</h3>
            <p class="services-page__step-desc">
              Our architects formulate tailored design solutions, architectural 3D models, and comprehensive drawings formulated for your space.
            </p>
          </article>

          <article class="services-page__approach-card">
            <span class="services-page__step-num">03</span>
            <h3 class="services-page__step-title">EXECUTE</h3>
            <p class="services-page__step-desc">
              Professional execution on site using quality materials, skilled craftsmanship, and dedicated supervision through to completion.
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- 3. SERVICES (7 VERIFIED SERVICES + GLASS AMC) -->
    <section class="services-page__services" aria-label="Services and Planning">
      <div class="services-page__container">
        <div class="services-page__section-header">
          <span class="services-page__kicker">CAPABILITIES</span>
          <h2 class="services-page__section-title">Verified Services</h2>
        </div>

        <div class="services-page__grid">
          <article class="services-page__card">
            <div class="services-page__card-num">01</div>
            <div class="services-page__card-body">
              <h3 class="services-page__card-title">Floor &amp; Furniture Plans</h3>
              <p class="services-page__card-desc">
                Accurate spatial planning and furniture layouts mapped to circulation paths, room dimensions, and functional living requirements.
              </p>
            </div>
          </article>

          <article class="services-page__card">
            <div class="services-page__card-num">02</div>
            <div class="services-page__card-body">
              <h3 class="services-page__card-title">Reflected Ceiling Plans</h3>
              <p class="services-page__card-desc">
                Architectural ceiling layouts specifying fixture drops, lighting coordinates, and integrated ceiling treatments.
              </p>
            </div>
          </article>

          <article class="services-page__card">
            <div class="services-page__card-num">03</div>
            <div class="services-page__card-body">
              <h3 class="services-page__card-title">Elevations</h3>
              <p class="services-page__card-desc">
                Scaled vertical interior elevations illustrating wall finishes, cabinetry dimensions, paneling heights, and joinery details.
              </p>
            </div>
          </article>

          <article class="services-page__card">
            <div class="services-page__card-num">04</div>
            <div class="services-page__card-body">
              <h3 class="services-page__card-title">Kitchen Plans</h3>
              <p class="services-page__card-desc">
                Ergonomic modular and custom kitchen planning, organizing work triangles, cabinetry storage, counter surfaces, and appliances.
              </p>
            </div>
          </article>

          <article class="services-page__card">
            <div class="services-page__card-num">05</div>
            <div class="services-page__card-body">
              <h3 class="services-page__card-title">Business Interiors</h3>
              <p class="services-page__card-desc">
                Tailored commercial interior solutions for retail shops, showrooms, and customer-facing business spaces.
              </p>
            </div>
          </article>

          <article class="services-page__card">
            <div class="services-page__card-num">06</div>
            <div class="services-page__card-body">
              <h3 class="services-page__card-title">Office Interiors</h3>
              <p class="services-page__card-desc">
                Comprehensive workspace planning, executive cabins, workstations, and collaborative zones for professional corporate environments.
              </p>
            </div>
          </article>

          <article class="services-page__card">
            <div class="services-page__card-num">07</div>
            <div class="services-page__card-body">
              <h3 class="services-page__card-title">Electrical Plans</h3>
              <p class="services-page__card-desc">
                Detailed electrical schematics mapping power outlets, switches, circuit loads, and lighting points coordinated with furniture and joinery.
              </p>
            </div>
          </article>

          <!-- Glass Services with AMC Highlight Card -->
          <article class="services-page__card services-page__card--highlight">
            <div class="services-page__card-num">08</div>
            <div class="services-page__card-body">
              <div class="services-page__card-tag">ANNUAL MAINTENANCE (AMC)</div>
              <h3 class="services-page__card-title">Glass-Related Services</h3>
              <p class="services-page__card-desc">
                Specialized architectural glass solutions and fittings accompanied by dedicated annual maintenance contract support across Bengaluru.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 4. CTA -->
    <section class="services-page__cta" aria-label="Get in Touch">
      <div class="services-page__container services-page__cta-box">
        <div class="services-page__cta-content">
          <h2 class="services-page__cta-title">Have a project in mind?</h2>
        </div>
        <div class="services-page__cta-action">
          <a href="/contact" class="services-page__btn services-page__btn--primary">
            <span>Get in Touch</span>
            <span class="services-page__btn-arrow" aria-hidden="true">&rarr;</span>
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
