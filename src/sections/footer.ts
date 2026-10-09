/**
 * Privilege Interior Solutions - Section 7: Information / Footer Skeleton Component
 * 
 * Clean structural skeleton for Information / Footer.
 * Incorporates official company information, full verified address, phone numbers,
 * email, and global navigation links.
 */

import type { ISharedScrollEngine } from '../scroll/types.js';
import { APPROVED_NAV_ROUTES, VERIFIED_BRAND } from '../navigation/nav-data.js';

export interface FooterSectionOptions {
  container?: HTMLElement | string | null;
  scrollEngine?: ISharedScrollEngine | null;
}

export interface FooterHandle {
  readonly element: HTMLElement;
  dispose(): void;
}

export function createFooterSection(options: FooterSectionOptions = {}): FooterHandle {
  if (typeof document === 'undefined') {
    return {
      element: {} as HTMLElement,
      dispose() {}
    };
  }

  const footer = document.createElement('footer');
  footer.id = 'information-footer';
  footer.className = 'section-skeleton section-footer';
  footer.setAttribute('data-section', 'information-footer');
  footer.setAttribute('role', 'contentinfo');
  footer.setAttribute('aria-label', 'Privilege Interior Solutions Information and Footer');

  const navLinksHtml = APPROVED_NAV_ROUTES.map(
    (item) => `<li><a href="${item.path}" class="skeleton-footer-link">${item.label}</a></li>`
  ).join('');

  footer.innerHTML = `
    <div class="skeleton-container">
      <div class="skeleton-footer-grid">
        <!-- Brand & About Summary -->
        <div class="skeleton-footer-col">
          <div class="skeleton-footer-logo-wrap">
            <img 
              src="${VERIFIED_BRAND.footerLogoAssetPath}" 
              alt="${VERIFIED_BRAND.logoAltText}" 
              class="skeleton-footer-logo"
              width="180" 
              height="56"
              loading="eager"
              decoding="async"
            />
          </div>
          <p class="skeleton-footer-text">
            Operating since 2001. Comprehensive interior design, modular execution, and glass-related architectural services with annual maintenance across Bengaluru.
          </p>
        </div>

        <!-- Navigation Links -->
        <div class="skeleton-footer-col">
          <h3 class="skeleton-footer-heading">Navigation</h3>
          <ul class="skeleton-footer-nav" role="list">
            ${navLinksHtml}
          </ul>
        </div>

        <!-- Verified Contact Information -->
        <div class="skeleton-footer-col">
          <h3 class="skeleton-footer-heading">Office Coordinates</h3>
          <address class="skeleton-footer-address">
            <p><strong>Address:</strong><br />${VERIFIED_BRAND.contactSummary.address}</p>
            <p style="margin-top: 0.5rem;">
              <strong>Phone:</strong><br />
              <a href="tel:${VERIFIED_BRAND.contactSummary.primaryPhone}">${VERIFIED_BRAND.contactSummary.primaryPhone}</a> / 
              <a href="tel:${VERIFIED_BRAND.contactSummary.secondaryPhone}">${VERIFIED_BRAND.contactSummary.secondaryPhone}</a>
            </p>
            <p style="margin-top: 0.5rem;">
              <strong>Email:</strong><br />
              <a href="mailto:${VERIFIED_BRAND.contactSummary.email}">${VERIFIED_BRAND.contactSummary.email}</a>
            </p>
          </address>
        </div>
      </div>

      <div class="skeleton-footer-bottom">
        <p class="skeleton-copyright">
          &copy; Privilege Interior Solutions. All rights reserved.
        </p>
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
    targetContainer.appendChild(footer);
  } else {
    const defaultRoot = document.getElementById('site-root') || document.body;
    defaultRoot.appendChild(footer);
  }

  if (options.scrollEngine) {
    options.scrollEngine.registerSection({
      id: 'information-footer',
      element: footer,
      order: 7,
      pinned: false
    });
  }

  function dispose(): void {
    if (options.scrollEngine) {
      options.scrollEngine.unregisterSection('information-footer');
    }
    footer.remove();
  }

  return {
    get element() {
      return footer;
    },
    dispose
  };
}
