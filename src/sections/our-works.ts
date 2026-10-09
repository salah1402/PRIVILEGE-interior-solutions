/**
 * Privilege Interior Solutions - Section 2: Our Works Component
 *
 * Refined continuous editorial showcase:
 * - Fluid photographic morphing transitions (no hard horizontal clipping boundaries).
 * - Coordinated cinematic dissolve, subtle depth scaling, and directional glide.
 * - Restrained typography with strong architectural contrast.
 * - Minimal bottom UI: simplified progress hairline (redundant archive button removed).
 * - 4 authentic Privilege projects with alternating edge-anchored captions.
 * - Fully synchronized with shared scroll engine (Lenis + GSAP).
 */

import type { ISharedScrollEngine } from '../scroll/types.js';

export interface OurWorksOptions {
  container?: HTMLElement | string | null;
  scrollEngine?: ISharedScrollEngine | null;
}

export interface OurWorksHandle {
  readonly element: HTMLElement;
  dispose(): void;
}

interface EditorialProject {
  readonly id: string;
  readonly number: string;
  readonly category: string;
  readonly descriptor: string;
  readonly image: string;
  readonly alt: string;
  readonly link: string;
  readonly layout: {
    readonly tagEdge: 'top-left' | 'top-right';
    readonly titleEdge: 'bottom-left' | 'bottom-right';
    readonly actionEdge: 'bottom-right' | 'bottom-left';
  };
}

const FEATURED_PROJECTS: readonly EditorialProject[] = [
  {
    id: 'project-living-dining',
    number: '01',
    category: 'RESIDENTIAL INTERIORS',
    descriptor: 'Living & Dining Suite',
    image: '/assets/audit_candidates/HDR-6-clean.jpg',
    alt: 'Privilege Interiors — Contemporary Living and Dining Suite with Integrated Illumination',
    link: '/projects',
    layout: {
      tagEdge: 'top-left',
      titleEdge: 'bottom-left',
      actionEdge: 'bottom-right'
    }
  },
  {
    id: 'project-dining-joinery',
    number: '02',
    category: 'DINING & JOINERY',
    descriptor: 'Dining & Illuminated Display',
    image: '/assets/audit_candidates/HDR-10-clean.jpg',
    alt: 'Privilege Interiors — Bespoke Dining Area with Backlit Portal Frame and Display Cabinets',
    link: '/projects',
    layout: {
      tagEdge: 'top-right',
      titleEdge: 'bottom-right',
      actionEdge: 'bottom-left'
    }
  },
  {
    id: 'project-master-bedroom',
    number: '03',
    category: 'MASTER BEDROOM',
    descriptor: 'Master Bedroom Suite',
    image: '/assets/audit_candidates/HDR-30-clean.jpg',
    alt: 'Privilege Interiors — Master Bedroom with Custom Floor-to-Ceiling Wardrobes',
    link: '/projects',
    layout: {
      tagEdge: 'top-left',
      titleEdge: 'bottom-left',
      actionEdge: 'bottom-right'
    }
  },
  {
    id: 'project-foyer-portal',
    number: '04',
    category: 'RESIDENTIAL INTERIORS',
    descriptor: 'Foyer & Architectural Portal',
    image: '/assets/audit_candidates/HDR-11-clean.jpg',
    alt: 'Privilege Interiors — Entrance Foyer with Warm Illuminated Timber Portal and Custom Lighting',
    link: '/projects',
    layout: {
      tagEdge: 'top-right',
      titleEdge: 'bottom-right',
      actionEdge: 'bottom-left'
    }
  }
];

function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export function createOurWorksSection(options: OurWorksOptions = {}): OurWorksHandle {
  if (typeof document === 'undefined') {
    return {
      element: {} as HTMLElement,
      dispose() {}
    };
  }

  const section = document.createElement('section');
  section.id = 'our-works';
  section.className = 'our-works-section';
  section.setAttribute('data-section', 'our-works');
  section.setAttribute('aria-label', 'Our Works — Selected Residential Projects');

  const layersHtml = FEATURED_PROJECTS.map((project, idx) => `
    <article class="our-works-layer" data-index="${idx + 1}" data-project-id="${project.id}">
      <div class="our-works-layer__media">
        <img 
          src="${project.image}" 
          alt="${project.alt}" 
          class="our-works-layer__img" 
          loading="lazy" 
          draggable="false"
        />
        <div class="our-works-layer__tint" aria-hidden="true"></div>
      </div>

      <!-- Edge-Anchored Placards -->
      <div class="our-works-layer__edge our-works-layer__edge--${project.layout.tagEdge}">
        <span class="our-works-layer__tag">${project.number} / ${project.category}</span>
      </div>

      <div class="our-works-layer__edge our-works-layer__edge--${project.layout.titleEdge}">
        <h3 class="our-works-layer__title">${project.descriptor}</h3>
      </div>

      <div class="our-works-layer__edge our-works-layer__edge--${project.layout.actionEdge}">
        <a href="${project.link}" class="our-works-layer__action" aria-label="Explore ${project.descriptor}">
          <span class="our-works-layer__action-text">EXPLORE MORE</span>
          <span class="our-works-layer__action-arrow" aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </article>
  `).join('');

  section.innerHTML = `
    <!-- Sticky Visual Stage Container -->
    <div class="our-works-stage-container">
      <div class="our-works-stage">
        
        <!-- Stage Top Editorial Bar -->
        <header class="our-works-stage__header">
          <div class="our-works-stage__rubric">
            <span class="our-works-stage__dot"></span>
            <span class="our-works-stage__badge">OUR WORKS</span>
            <span class="our-works-stage__sep" aria-hidden="true">/</span>
            <span class="our-works-stage__lead">Spaces designed to be lived in</span>
          </div>
          <div class="our-works-stage__counter">
            <span class="our-works-stage__counter-current" id="our-works-current-index">01</span>
            <span class="our-works-stage__counter-slash">/</span>
            <span class="our-works-stage__counter-total">04</span>
          </div>
        </header>

        <!-- Pinned Editorial Canvas (Unified Transformation Stage) -->
        <div class="our-works-canvas" id="our-works-canvas">
          ${layersHtml}
        </div>

        <!-- Minimal Stage Hairline Progress Track (Clean, Uncluttered) -->
        <div class="our-works-stage__footer" aria-hidden="true">
          <div class="our-works-stage__progress-track">
            <div class="our-works-stage__progress-fill" id="our-works-progress-fill"></div>
          </div>
        </div>

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

  // Register section with SharedScrollEngine
  if (options.scrollEngine) {
    options.scrollEngine.registerSection({
      id: 'our-works',
      element: section,
      order: 2,
      pinned: false
    });
  }

  // Query stage DOM elements
  const currentIndexEl = section.querySelector<HTMLElement>('#our-works-current-index');
  const progressFillEl = section.querySelector<HTMLElement>('#our-works-progress-fill');
  const layers = Array.from(section.querySelectorAll<HTMLElement>('.our-works-layer')).map((layer, index) => {
    const img = layer.querySelector<HTMLElement>('.our-works-layer__img');
    const edges = Array.from(layer.querySelectorAll<HTMLElement>('.our-works-layer__edge'));
    return { layer, img, edges, index };
  });

  // Windows for balanced dwell and transition:
  // Layer 0: enter [-], exit [0.18, 0.32]
  // Layer 1: enter [0.18, 0.32], exit [0.48, 0.62]
  // Layer 2: enter [0.48, 0.62], exit [0.78, 0.92]
  // Layer 3: enter [0.78, 0.92], exit [-]
  const transitionWindows = [
    { inStart: 0, inEnd: 0, outStart: 0.18, outEnd: 0.32 },
    { inStart: 0.18, inEnd: 0.32, outStart: 0.48, outEnd: 0.62 },
    { inStart: 0.48, inEnd: 0.62, outStart: 0.78, outEnd: 0.92 },
    { inStart: 0.78, inEnd: 0.92, outStart: 1.0, outEnd: 1.0 }
  ];

  /**
   * Continuous scroll choreography updater.
   * Smooth photographic morphing without hard clipping lines.
   */
  function updateShowcase(progress: number, prefersReducedMotion: boolean): void {
    const clampedProgress = Math.max(0, Math.min(1, progress));

    // Update minimal bottom progress bar fill
    if (progressFillEl) {
      progressFillEl.style.width = `${(clampedProgress * 100).toFixed(1)}%`;
    }

    // Determine active chapter (1..4)
    let activeChapter = 1;
    if (clampedProgress >= 0.85) {
      activeChapter = 4;
    } else if (clampedProgress >= 0.55) {
      activeChapter = 3;
    } else if (clampedProgress >= 0.25) {
      activeChapter = 2;
    }

    if (currentIndexEl) {
      const formatted = `0${activeChapter}`;
      if (currentIndexEl.textContent !== formatted) {
        currentIndexEl.textContent = formatted;
      }
    }

    if (prefersReducedMotion) {
      layers.forEach(({ layer, edges }, idx) => {
        const isCurrent = idx + 1 === activeChapter;
        layer.style.opacity = isCurrent ? '1' : '0';
        layer.style.pointerEvents = isCurrent ? 'auto' : 'none';
        edges.forEach((edge) => {
          edge.style.opacity = isCurrent ? '1' : '0';
          edge.style.transform = 'none';
        });
      });
      return;
    }

    layers.forEach(({ layer, img, edges }, idx) => {
      const win = transitionWindows[idx];

      const tIn = idx === 0 ? 1 : smoothstep(win.inStart, win.inEnd, clampedProgress);
      const tOut = idx === 3 ? 0 : smoothstep(win.outStart, win.outEnd, clampedProgress);

      const netOpacity = Math.max(0, Math.min(1, tIn * (1 - tOut)));
      layer.style.opacity = netOpacity.toFixed(3);
      layer.style.pointerEvents = netOpacity > 0.4 ? 'auto' : 'none';

      // Smooth spatial morph: incoming drifts gently from +18px, outgoing drifts to -18px
      // Scale is strictly kept >= 1.03 at all times to guarantee 100% full-bleed coverage with zero gaps
      if (img) {
        let deltaY = 0;
        let scale = 1.05;

        if (idx !== 0 && tIn < 1) {
          deltaY = (1 - tIn) * 18;
          scale = 1.05 + (1 - tIn) * 0.03;
        } else if (idx !== 3 && tOut > 0) {
          deltaY = -tOut * 18;
          scale = 1.05 - tOut * 0.02;
        }

        img.style.transform = `translate3d(0, ${deltaY.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
      }

      // Typography fades gracefully without overlapping adjacent project captions
      const textIn = idx === 0 ? 1 : Math.max(0, (tIn - 0.25) / 0.75);
      const textOut = idx === 3 ? 1 : Math.max(0, 1 - tOut * 1.6);
      const textOpacity = Math.max(0, Math.min(1, textIn * textOut));
      const textDeltaY = (1 - tIn) * 8 - tOut * 8;

      edges.forEach((edge) => {
        edge.style.opacity = textOpacity.toFixed(3);
        edge.style.transform = `translate3d(0, ${textDeltaY.toFixed(1)}px, 0)`;
      });
    });
  }

  // Subscribe to existing scrollEngine ticker
  let unsubscribeScroll: (() => void) | null = null;

  function onScrollTick(scrollState?: { prefersReducedMotion?: boolean }): void {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    const totalScroll = section.offsetHeight - vh;
    if (totalScroll <= 0) {
      updateShowcase(0, Boolean(scrollState?.prefersReducedMotion));
      return;
    }

    const currentScroll = -rect.top;
    const progress = Math.max(0, Math.min(1, currentScroll / totalScroll));
    updateShowcase(progress, Boolean(scrollState?.prefersReducedMotion));
  }

  if (options.scrollEngine) {
    unsubscribeScroll = options.scrollEngine.subscribe((scrollState) => {
      onScrollTick(scrollState);
    });
  }

  // Initial render at progress 0
  onScrollTick();

  function dispose(): void {
    if (unsubscribeScroll) {
      unsubscribeScroll();
      unsubscribeScroll = null;
    }
    if (options.scrollEngine) {
      options.scrollEngine.unregisterSection('our-works');
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
