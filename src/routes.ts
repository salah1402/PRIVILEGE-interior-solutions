/**
 * Privilege Interior Solutions - Dedicated Route Skeleton Views
 * Minimal placeholders preserving verified brand data for dedicated routes.
 * Does NOT modify dedicated pages or invent detailed styling.
 */

import { VERIFIED_BRAND } from './navigation/nav-data.js';

export function renderDedicatedView(route: string): HTMLElement {
  const container = document.createElement('div');
  container.className = 'dedicated-route-view section-skeleton';

  if (route === '/about') {
    container.innerHTML = `
      <div class="skeleton-container">
        <div class="skeleton-badge">PAGE — ABOUT US</div>
        <h1 class="skeleton-headline">About Privilege Interior Solutions</h1>
        <p class="skeleton-lead">
          Operating since 2001 in Bengaluru. Skilled architects and designers delivering bespoke residential and commercial interiors.
        </p>
        <div class="skeleton-actions">
          <a href="/" class="skeleton-btn skeleton-btn--secondary">&larr; Return to Home</a>
          <a href="/contact" class="skeleton-btn skeleton-btn--primary">Get in Touch</a>
        </div>
      </div>
    `;
  } else if (route === '/services') {
    container.innerHTML = `
      <div class="skeleton-container">
        <div class="skeleton-badge">PAGE — SERVICES</div>
        <h1 class="skeleton-headline">Interior Design & Execution Services</h1>
        <p class="skeleton-lead">
          Verified capabilities: Floor & Furniture Plans, Reflected Ceiling Plans, Elevations, Kitchen Plans, Business Interiors, Office Interiors, and Glass Services with AMC.
        </p>
        <div class="skeleton-actions">
          <a href="/" class="skeleton-btn skeleton-btn--secondary">&larr; Return to Home</a>
          <a href="/contact" class="skeleton-btn skeleton-btn--primary">Consult an Architect</a>
        </div>
      </div>
    `;
  } else if (route === '/projects') {
    container.innerHTML = `
      <div class="skeleton-container">
        <div class="skeleton-badge">PAGE — PROJECTS</div>
        <h1 class="skeleton-headline">Projects & Portfolio</h1>
        <p class="skeleton-lead">
          Explore our completed residential interior works, turnkey apartments, modular kitchens, and custom millwork across Bengaluru.
        </p>
        <div class="skeleton-actions">
          <a href="/" class="skeleton-btn skeleton-btn--secondary">&larr; Return to Home</a>
          <a href="/contact" class="skeleton-btn skeleton-btn--primary">Book Us a Call</a>
        </div>
      </div>
    `;
  } else if (route === '/contact') {
    container.innerHTML = `
      <div class="skeleton-container">
        <div class="skeleton-badge">PAGE — CONTACT US</div>
        <h1 class="skeleton-headline">Contact Privilege Interior Solutions</h1>
        <p class="skeleton-lead">
          Visit our office or call our senior project team directly for consultation.
        </p>
        <div class="skeleton-card" style="margin-top: 1.5rem; max-width: 600px;">
          <p><strong>Address:</strong> ${VERIFIED_BRAND.contactSummary.address}</p>
          <p style="margin-top: 0.5rem;"><strong>Primary Phone:</strong> <a href="tel:${VERIFIED_BRAND.contactSummary.primaryPhone}" style="color: var(--skeleton-gold);">${VERIFIED_BRAND.contactSummary.primaryPhone}</a></p>
          <p style="margin-top: 0.5rem;"><strong>Secondary Phone:</strong> <a href="tel:${VERIFIED_BRAND.contactSummary.secondaryPhone}" style="color: var(--skeleton-gold);">${VERIFIED_BRAND.contactSummary.secondaryPhone}</a></p>
          <p style="margin-top: 0.5rem;"><strong>Email:</strong> <a href="mailto:${VERIFIED_BRAND.contactSummary.email}" style="color: var(--skeleton-gold);">${VERIFIED_BRAND.contactSummary.email}</a></p>
        </div>
        <div class="skeleton-actions">
          <a href="/" class="skeleton-btn skeleton-btn--secondary">&larr; Return to Home</a>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="skeleton-container">
        <div class="skeleton-badge">PAGE NOT FOUND</div>
        <h1 class="skeleton-headline">404 — Page Not Found</h1>
        <p class="skeleton-lead">The requested page does not exist.</p>
        <div class="skeleton-actions">
          <a href="/" class="skeleton-btn skeleton-btn--primary">Return to Home</a>
        </div>
      </div>
    `;
  }

  return container;
}
