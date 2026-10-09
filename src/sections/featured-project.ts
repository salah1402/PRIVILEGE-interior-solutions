/**
 * Privilege Interior Solutions - Section 03: With Whom We've Worked
 * 
 * Minimal, museum-grade credibility section presenting verified organisations
 * Privilege has collaborated with across real estate developments, residential towers,
 * and commercial fitouts.
 * 
 * Verified Organisations (Exactly 8):
 * 1. Prestige Group
 * 2. Sobha Developers
 * 3. Mantri Developers
 * 4. Embassy Group
 * 5. General Motors
 * 6. HM Group
 * 7. House of Hiranandani
 * 8. DLF
 */

import type { ISharedScrollEngine } from '../scroll/types.js';

export interface CredibilityPartner {
  id: string;
  name: string;
  logoSrc: string;
  logoAlt: string;
  logoClass: string;
  index: string;
}

export const VERIFIED_PARTNERS: CredibilityPartner[] = [
  {
    id: 'prestige',
    name: 'Prestige Group',
    logoSrc: '/assets/clients/prestige.png',
    logoAlt: 'Prestige Group — Real Estate Developers',
    logoClass: 'credibility-logo--prestige',
    index: '01'
  },
  {
    id: 'sobha',
    name: 'Sobha Developers',
    logoSrc: '/assets/clients/sobha.svg',
    logoAlt: 'Sobha Developers — Quality Real Estate Craft',
    logoClass: 'credibility-logo--sobha',
    index: '02'
  },
  {
    id: 'embassy',
    name: 'Embassy Group',
    logoSrc: '/assets/clients/embassy.jpg',
    logoAlt: 'Embassy Group — Leading Developer',
    logoClass: 'credibility-logo--embassy',
    index: '03'
  },
  {
    id: 'general-motors',
    name: 'General Motors',
    logoSrc: '/assets/clients/gm-classic.svg',
    logoAlt: 'General Motors — Automotive & Corporate Facilities',
    logoClass: 'credibility-logo--gm',
    index: '04'
  },
  {
    id: 'hiranandani',
    name: 'House of Hiranandani',
    logoSrc: '/assets/clients/hiranandani.png',
    logoAlt: 'House of Hiranandani — Neoclassical Communities',
    logoClass: 'credibility-logo--hiranandani',
    index: '05'
  },
  {
    id: 'dlf',
    name: 'DLF',
    logoSrc: '/assets/clients/dlf.svg',
    logoAlt: 'DLF — Building India',
    logoClass: 'credibility-logo--dlf',
    index: '06'
  },
  {
    id: 'mantri',
    name: 'Mantri Developers',
    logoSrc: '/assets/clients/mantri.png',
    logoAlt: 'Mantri Developers — Real Estate Innovators',
    logoClass: 'credibility-logo--mantri',
    index: '07'
  },
  {
    id: 'hm-group',
    name: 'HM Group',
    logoSrc: '/assets/clients/hm-group.svg',
    logoAlt: 'HM Group — Bengaluru Property Developers',
    logoClass: 'credibility-logo--hm',
    index: '08'
  }
];

export interface FeaturedProjectOptions {
  container?: HTMLElement | string | null;
  scrollEngine?: ISharedScrollEngine | null;
}

export interface FeaturedProjectHandle {
  readonly element: HTMLElement;
  dispose(): void;
}

export function createFeaturedProjectSection(options: FeaturedProjectOptions = {}): FeaturedProjectHandle {
  if (typeof document === 'undefined') {
    return {
      element: {} as HTMLElement,
      dispose() {}
    };
  }

  const section = document.createElement('section');
  section.id = 'with-whom-weve-worked';
  section.className = 'credibility-section';
  section.setAttribute('data-section', 'with-whom-weve-worked');
  section.setAttribute('aria-label', "With Whom We've Worked");

  // Render the asymmetric editorial logo field
  // Row 1: Prestige (01), Sobha (02), Embassy (03)
  // Row 2: General Motors (04, indented), House of Hiranandani (05, wide)
  // Row 3: DLF (06), Mantri (07), HM Group (08)
  const [p1, p2, p3, p4, p5, p6, p7, p8] = VERIFIED_PARTNERS;

  const renderTile = (p: CredibilityPartner) => `
    <article class="credibility-tile" aria-label="${p.name}">
      <div class="credibility-tile-header">
        <span class="credibility-tile-index">${p.index}</span>
      </div>
      <div class="credibility-tile-stage">
        <img 
          src="${p.logoSrc}" 
          alt="${p.logoAlt}" 
          class="credibility-logo-img ${p.logoClass}" 
          loading="eager"
          draggable="false"
        />
      </div>
      <div class="credibility-tile-footer">
        <span class="credibility-tile-name">${p.name}</span>
      </div>
    </article>
  `;

  section.innerHTML = `
    <div class="credibility-container">
      <header class="credibility-header">
        <div class="credibility-rubric">
          <span class="credibility-rubric-dot" aria-hidden="true"></span>
          <span class="credibility-rubric-text">WITH WHOM WE'VE WORKED</span>
        </div>
        <h2 class="credibility-headline">Trusted across spaces, developments and industries.</h2>
      </header>

      <div class="credibility-field" role="region" aria-label="Client and developer partner logos">
        <!-- Row 1: Asymmetric 3-tile balance -->
        <div class="credibility-row credibility-row--top">
          ${renderTile(p1)}
          ${renderTile(p2)}
          ${renderTile(p3)}
        </div>

        <!-- Row 2: Indented 2-tile offset with wide format anchor -->
        <div class="credibility-row credibility-row--middle">
          ${renderTile(p4)}
          ${renderTile(p5)}
        </div>

        <!-- Row 3: Balanced 3-tile finish with nuanced tile widths -->
        <div class="credibility-row credibility-row--bottom">
          ${renderTile(p6)}
          ${renderTile(p7)}
          ${renderTile(p8)}
        </div>
      </div>

      <div class="credibility-footer-line" aria-hidden="true">
        <span>Verified enterprise, developer and institutional completions.</span>
        <span>Bengaluru & South India • Since 2001</span>
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
      id: 'with-whom-weve-worked',
      element: section,
      order: 3,
      pinned: false
    });
  }

  function dispose(): void {
    if (options.scrollEngine) {
      options.scrollEngine.unregisterSection('with-whom-weve-worked');
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

// Alias export for semantic clarity
export const createWithWhomWeWorkedSection = createFeaturedProjectSection;
