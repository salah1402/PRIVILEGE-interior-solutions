/**
 * Entrypoint for privilege-interior-solutions.
 *
 * Implements Step 1 Homepage Reset:
 * Establishes the homepage sequence:
 * 1. HERO
 * 2. OUR WORKS
 * 3. WITH WHOM WE'VE WORKED
 * 4. WHAT OUR CLIENTS SAID
 * 5. BOOK US A CALL
 *
 * Global Header with verified routes: HOME, ABOUT US, SERVICES, PROJECTS, CONTACT US.
 * SPA client-side routing supporting: /, /about, /services, /projects, /contact.
 */

import { createSharedScrollEngine, type ISharedScrollEngine } from './scroll/index.js';
import { createHeader, type HeaderHandle } from './navigation/index.js';
import {
  createHero,
  type HeroHandle,
  createOurWorksSection,
  type OurWorksHandle,
  createFeaturedProjectSection,
  type FeaturedProjectHandle,
  createTestimonialsSection,
  type TestimonialsHandle,
  createBookCallSection,
  type BookCallHandle,
  createFooterSection,
  type FooterHandle
} from './sections/index.js';
import { renderDedicatedView } from './routes.js';
import { renderProjectsView } from './views/projects-view.js';
import { renderAboutView } from './views/about-view.js';
import { renderServicesView } from './views/services-view.js';

export interface SectionHandle {
  readonly element: HTMLElement;
  dispose(): void;
}

export interface SharedScrollEnginePlaceholder extends ISharedScrollEngine {
  readonly singleInstance: true;
  readonly smoothScroll: boolean;
  readonly lerpFactor: number;
}

function createEngineInstance(config: {
  smoothScroll: boolean;
  lerpFactor: number;
}): SharedScrollEnginePlaceholder {
  const engine = createSharedScrollEngine({
    smoothScroll: config.smoothScroll,
    lerpFactor: config.lerpFactor,
    respectReducedMotion: true
  });
  engine.init();
  return {
    singleInstance: true,
    smoothScroll: config.smoothScroll,
    lerpFactor: config.lerpFactor,
    init() {
      engine.init();
    },
    registerSection(secConfig) {
      return engine.registerSection(secConfig);
    },
    unregisterSection(sectionId) {
      engine.unregisterSection(sectionId);
    },
    getState() {
      return engine.getState();
    },
    getSectionState(sectionId) {
      return engine.getSectionState(sectionId);
    },
    subscribe(listener) {
      return engine.subscribe(listener);
    },
    subscribeSection(sectionId, listener) {
      return engine.subscribeSection(sectionId, listener);
    },
    onSectionLifecycle(listener) {
      return engine.onSectionLifecycle(listener);
    },
    createSectionTimeline(sectionId, vars) {
      return engine.createSectionTimeline(sectionId, vars);
    },
    scrollTo(target, options) {
      engine.scrollTo(target, options);
    },
    refresh() {
      engine.refresh();
    },
    destroy() {
      engine.destroy();
    }
  };
}

export interface SiteRuntime {
  scrollEngine: SharedScrollEnginePlaceholder;
  header: HeaderHandle;
  currentRoute: string;
  navigate(path: string): void;
  dispose(): void;
}

export function bootstrapSite(): SiteRuntime {
  const scrollEngine = createEngineInstance({
    smoothScroll: true,
    lerpFactor: 0.08
  });

  const siteRoot = document.querySelector<HTMLElement>('#site-root') || document.body;

  // Mount Global Header
  const header = createHeader({
    scrollEngine
  });

  // Track active section handles to dispose on unmount/re-render
  let activeHandles: SectionHandle[] = [];
  let dedicatedElement: HTMLElement | null = null;
  let currentRoute = typeof window !== 'undefined' ? window.location.pathname : '/';

  function cleanActiveViews(): void {
    activeHandles.forEach((handle) => handle.dispose());
    activeHandles = [];
    if (dedicatedElement) {
      dedicatedElement.remove();
      dedicatedElement = null;
    }
    siteRoot.innerHTML = '';
  }

  function renderRoute(pathname: string): void {
    cleanActiveViews();
    currentRoute = pathname;

    // Normalize path
    const normalized = pathname.replace(/\/+$/, '') || '/';

    if (normalized === '/' || normalized === '/index.html') {
      // Homepage Composition: Hero -> Our Works -> Section 03 -> Section 05 -> Section 06
      const hero = createHero({ container: siteRoot, scrollEngine });
      const ourWorks = createOurWorksSection({ container: siteRoot, scrollEngine });
      const featured = createFeaturedProjectSection({ container: siteRoot, scrollEngine });
      const testimonials = createTestimonialsSection({ container: siteRoot, scrollEngine });
      const bookCall = createBookCallSection({ container: siteRoot, scrollEngine });

      activeHandles = [
        hero,
        ourWorks,
        featured,
        testimonials,
        bookCall
      ];
    } else if (normalized === '/projects') {
      // Dedicated Immersive Projects Page
      const projectsHandle = renderProjectsView({ scrollEngine });
      dedicatedElement = projectsHandle.element;
      siteRoot.appendChild(dedicatedElement);
      const footer = createFooterSection({ container: siteRoot, scrollEngine });
      activeHandles = [projectsHandle, footer];
    } else if (normalized === '/about') {
      // Dedicated Editorial About Page
      const aboutHandle = renderAboutView({ scrollEngine });
      dedicatedElement = aboutHandle.element;
      siteRoot.appendChild(dedicatedElement);
      activeHandles = [aboutHandle];
    } else if (normalized === '/services') {
      // Dedicated Editorial Services Page
      const servicesHandle = renderServicesView({ scrollEngine });
      dedicatedElement = servicesHandle.element;
      siteRoot.appendChild(dedicatedElement);
      activeHandles = [servicesHandle];
    } else {
      // Dedicated route skeleton view + Global Footer
      dedicatedElement = renderDedicatedView(normalized);
      siteRoot.appendChild(dedicatedElement);
      const footer = createFooterSection({ container: siteRoot, scrollEngine });
      activeHandles = [footer];
    }

    scrollEngine.refresh();
    header.updateActiveRoute(normalized);
    window.scrollTo(0, 0);
  }

  function navigate(path: string): void {
    if (path === window.location.pathname) return;
    window.history.pushState({}, '', path);
    renderRoute(path);
  }

  // Intercept internal link clicks for seamless client-side SPA routing
  function handleLinkClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    const anchor = target?.closest<HTMLAnchorElement>('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('#')) {
      return;
    }

    // Internal client route
    event.preventDefault();
    navigate(href);
  }

  function handlePopState(): void {
    renderRoute(window.location.pathname);
  }

  window.addEventListener('click', handleLinkClick);
  window.addEventListener('popstate', handlePopState);

  // Initial render
  renderRoute(currentRoute);

  return {
    scrollEngine,
    header,
    get currentRoute() {
      return currentRoute;
    },
    navigate,
    dispose(): void {
      window.removeEventListener('click', handleLinkClick);
      window.removeEventListener('popstate', handlePopState);
      cleanActiveViews();
      header.dispose();
      scrollEngine.destroy();
    }
  };
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  const runtime = bootstrapSite();
  (window as unknown as Record<string, unknown>).__SCROLL_SITE_RUNTIME__ = runtime;
}
