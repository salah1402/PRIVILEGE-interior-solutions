/**
 * Privilege Interior Solutions - Global Header Component
 * Minimal, architectural, restrained, Hero 12-compatible.
 */

import type { ISharedScrollEngine } from '../scroll/types.js';
import { APPROVED_NAV_ROUTES, PRIMARY_CTA, VERIFIED_BRAND } from './nav-data.js';
import gsap from 'gsap';

export interface HeaderOptions {
  /** Optional container element or selector to mount the header into. Defaults to document.body (prepended). */
  container?: HTMLElement | string | null;
  /** Optional SharedScrollEngine instance for synchronized scroll state transitions. */
  scrollEngine?: ISharedScrollEngine | null;
  /** Scroll offset threshold in px after which header enters scrolled state. Default: 20px. */
  scrollThreshold?: number;
}

export interface HeaderHandle {
  readonly element: HTMLElement;
  readonly isScrolled: boolean;
  readonly isMobileOpen: boolean;
  openMobileMenu(): void;
  closeMobileMenu(): void;
  toggleMobileMenu(): void;
  updateScroll(scrollY: number): void;
  updateActiveRoute(pathname: string): void;
  dispose(): void;
}

export function createHeader(options: HeaderOptions = {}): HeaderHandle {
  if (typeof document === 'undefined') {
    return {
      element: {} as HTMLElement,
      isScrolled: false,
      isMobileOpen: false,
      openMobileMenu() {},
      closeMobileMenu() {},
      toggleMobileMenu() {},
      updateScroll() {},
      updateActiveRoute() {},
      dispose() {}
    };
  }

  const scrollThreshold = options.scrollThreshold ?? 20;

  // 1. Build Header Shell
  const header = document.createElement('header');
  header.id = 'site-header';
  header.className = 'site-header';
  header.setAttribute('role', 'banner');
  header.setAttribute('data-scrolled', 'false');
  header.setAttribute('data-mobile-open', 'false');

  // Container
  const container = document.createElement('div');
  container.className = 'site-header__container';

  // 2. Brand Logo
  const brand = document.createElement('div');
  brand.className = 'site-header__brand';

  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.className = 'site-header__logo-link';
  logoLink.setAttribute('aria-label', `${VERIFIED_BRAND.companyName} — Return to Home`);

  const logoImg = document.createElement('img');
  logoImg.src = VERIFIED_BRAND.logoAssetPath;
  logoImg.alt = VERIFIED_BRAND.logoAltText;
  logoImg.className = 'site-header__logo-img';
  logoImg.setAttribute('width', '160');
  logoImg.setAttribute('height', '48');

  logoLink.appendChild(logoImg);
  brand.appendChild(logoLink);
  container.appendChild(brand);

  // 3. Desktop Pill Navigation
  const desktopNav = document.createElement('nav');
  desktopNav.className = 'site-header__desktop-nav';
  desktopNav.setAttribute('aria-label', 'Primary');

  const pillNav = document.createElement('ul');
  pillNav.className = 'site-header__pill-nav';
  pillNav.setAttribute('role', 'list');

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  interface PillItemCleanup {
    link: HTMLAnchorElement;
    onEnter: () => void;
    onLeave: () => void;
    tweens: gsap.core.Tween[];
  }
  const pillCleanups: PillItemCleanup[] = [];

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  APPROVED_NAV_ROUTES.forEach((route) => {
    const li = document.createElement('li');
    li.className = 'site-header__pill-item';

    const a = document.createElement('a');
    a.href = route.path;
    a.className = 'site-header__pill-link';
    a.setAttribute('aria-label', route.label);

    const isHome = route.path === '/' || route.path === '/index.html';
    const isCurrentHome = currentPath === '/' || currentPath === '/index.html' || currentPath === '';

    const isActive = isHome
      ? isCurrentHome
      : !isCurrentHome && currentPath.startsWith(route.path);

    if (isActive) {
      a.setAttribute('aria-current', 'page');
      a.setAttribute('data-active', 'true');
    }

    // Circular hover background element (rises from bottom on hover)
    const hoverCircle = document.createElement('span');
    hoverCircle.className = 'pill-hover-circle';
    hoverCircle.setAttribute('aria-hidden', 'true');

    // Dual-text vertical roll wrapper
    const textWrap = document.createElement('span');
    textWrap.className = 'pill-text-wrap';
    textWrap.setAttribute('aria-hidden', 'true');

    const textDefault = document.createElement('span');
    textDefault.className = 'pill-text-default';
    textDefault.textContent = route.label;

    const textHover = document.createElement('span');
    textHover.className = 'pill-text-hover';
    textHover.textContent = route.label;

    textWrap.appendChild(textDefault);
    textWrap.appendChild(textHover);

    // Screen-reader label
    const srLabel = document.createElement('span');
    srLabel.className = 'visually-hidden';
    srLabel.textContent = route.label;

    a.appendChild(hoverCircle);
    a.appendChild(textWrap);
    a.appendChild(srLabel);

    // Initial positions for circular fill and dual text
    gsap.set(hoverCircle, { xPercent: -50, yPercent: 140, scale: 0.15 });
    gsap.set(textDefault, { yPercent: 0 });
    gsap.set(textHover, { yPercent: 140 });

    const activeTweens: gsap.core.Tween[] = [];

    const handleEnter = () => {
      if (prefersReducedMotion) {
        gsap.set(hoverCircle, { yPercent: -50, scale: 2.5 });
        gsap.set(textDefault, { yPercent: -140 });
        gsap.set(textHover, { yPercent: 0 });
        return;
      }

      const t1 = gsap.to(hoverCircle, {
        yPercent: -50,
        scale: 2.5,
        duration: 0.36,
        ease: 'power2.out',
        overwrite: 'auto'
      });
      const t2 = gsap.to(textDefault, {
        yPercent: -140,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });
      const t3 = gsap.to(textHover, {
        yPercent: 0,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });
      activeTweens.length = 0;
      activeTweens.push(t1, t2, t3);
    };

    const handleLeave = () => {
      if (prefersReducedMotion) {
        gsap.set(hoverCircle, { yPercent: 140, scale: 0.15 });
        gsap.set(textDefault, { yPercent: 0 });
        gsap.set(textHover, { yPercent: 140 });
        return;
      }

      const t1 = gsap.to(hoverCircle, {
        yPercent: 140,
        scale: 0.15,
        duration: 0.3,
        ease: 'power2.in',
        overwrite: 'auto'
      });
      const t2 = gsap.to(textDefault, {
        yPercent: 0,
        duration: 0.25,
        ease: 'power2.in',
        overwrite: 'auto'
      });
      const t3 = gsap.to(textHover, {
        yPercent: 140,
        duration: 0.25,
        ease: 'power2.in',
        overwrite: 'auto'
      });
      activeTweens.length = 0;
      activeTweens.push(t1, t2, t3);
    };

    a.addEventListener('mouseenter', handleEnter);
    a.addEventListener('mouseleave', handleLeave);
    a.addEventListener('focus', handleEnter);
    a.addEventListener('blur', handleLeave);

    pillCleanups.push({
      link: a,
      onEnter: handleEnter,
      onLeave: handleLeave,
      tweens: activeTweens
    });

    li.appendChild(a);
    pillNav.appendChild(li);
  });

  desktopNav.appendChild(pillNav);
  container.appendChild(desktopNav);

  // 4. Mobile Menu Trigger Button
  const menuTrigger = document.createElement('button');
  menuTrigger.type = 'button';
  menuTrigger.className = 'site-header__menu-trigger';
  menuTrigger.setAttribute('aria-label', 'Open navigation menu');
  menuTrigger.setAttribute('aria-expanded', 'false');
  menuTrigger.setAttribute('aria-controls', 'mobile-nav-drawer');

  const burgerIcon = document.createElement('span');
  burgerIcon.className = 'site-header__burger-icon';
  burgerIcon.setAttribute('aria-hidden', 'true');

  const line1 = document.createElement('span');
  line1.className = 'site-header__burger-line';
  const line2 = document.createElement('span');
  line2.className = 'site-header__burger-line';

  burgerIcon.appendChild(line1);
  burgerIcon.appendChild(line2);
  menuTrigger.appendChild(burgerIcon);
  container.appendChild(menuTrigger);

  header.appendChild(container);

  // 5. Mobile Navigation Drawer
  const mobileDrawer = document.createElement('div');
  mobileDrawer.id = 'mobile-nav-drawer';
  mobileDrawer.className = 'site-header__mobile-drawer';
  mobileDrawer.setAttribute('role', 'dialog');
  mobileDrawer.setAttribute('aria-modal', 'true');
  mobileDrawer.setAttribute('aria-label', 'Mobile Navigation');
  mobileDrawer.setAttribute('data-open', 'false');

  const mobileNavList = document.createElement('ul');
  mobileNavList.className = 'site-header__mobile-nav-list';
  mobileNavList.setAttribute('role', 'list');

  APPROVED_NAV_ROUTES.forEach((route) => {
    const li = document.createElement('li');
    li.className = 'site-header__mobile-nav-item';

    const a = document.createElement('a');
    a.href = route.path;
    a.className = 'site-header__mobile-nav-link';
    a.textContent = route.label;

    const isHome = route.path === '/' || route.path === '/index.html';
    const isCurrentHome = currentPath === '/' || currentPath === '/index.html' || currentPath === '';

    const isActive = isHome
      ? isCurrentHome
      : !isCurrentHome && currentPath.startsWith(route.path);

    if (isActive) {
      a.setAttribute('aria-current', 'page');
    }

    // Close menu when clicking link
    a.addEventListener('click', () => {
      closeMobileMenu();
    });

    li.appendChild(a);
    mobileNavList.appendChild(li);
  });

  mobileDrawer.appendChild(mobileNavList);

  // Mobile Footer with Verified Contact Info
  const mobileFooter = document.createElement('div');
  mobileFooter.className = 'site-header__mobile-footer';

  const contactSnippet = document.createElement('div');
  contactSnippet.className = 'site-header__mobile-contact';
  contactSnippet.innerHTML = `
    <div><a href="tel:${VERIFIED_BRAND.contactSummary.primaryPhone}">${VERIFIED_BRAND.contactSummary.primaryPhone}</a></div>
    <div><a href="mailto:${VERIFIED_BRAND.contactSummary.email}">${VERIFIED_BRAND.contactSummary.email}</a></div>
    <div style="margin-top: 0.25rem; font-size: 0.75rem; color: #8a8d98;">${VERIFIED_BRAND.contactSummary.address}</div>
  `;

  mobileFooter.appendChild(contactSnippet);
  mobileDrawer.appendChild(mobileFooter);

  // 6. Mount into DOM
  let targetContainer: HTMLElement | null = null;
  if (typeof options.container === 'string') {
    targetContainer = document.querySelector<HTMLElement>(options.container);
  } else if (options.container instanceof HTMLElement) {
    targetContainer = options.container;
  }

  if (targetContainer) {
    targetContainer.prepend(header);
    targetContainer.appendChild(mobileDrawer);
  } else {
    document.body.prepend(header);
    document.body.appendChild(mobileDrawer);
  }

  // 7. State & Behavior Logic
  let isScrolled = false;
  let isMobileOpen = false;

  function updateScroll(scrollY: number) {
    const shouldBeScrolled = scrollY > scrollThreshold;
    if (shouldBeScrolled !== isScrolled) {
      isScrolled = shouldBeScrolled;
      header.setAttribute('data-scrolled', String(isScrolled));
    }
  }

  function openMobileMenu() {
    if (isMobileOpen) return;
    isMobileOpen = true;
    header.setAttribute('data-mobile-open', 'true');
    mobileDrawer.setAttribute('data-open', 'true');
    menuTrigger.setAttribute('aria-expanded', 'true');
    menuTrigger.setAttribute('aria-label', 'Close navigation menu');
    document.body.style.overflow = 'hidden';

    // Focus first link in drawer
    const firstLink = mobileDrawer.querySelector<HTMLElement>('a');
    firstLink?.focus();
  }

  function closeMobileMenu() {
    if (!isMobileOpen) return;
    isMobileOpen = false;
    header.setAttribute('data-mobile-open', 'false');
    mobileDrawer.setAttribute('data-open', 'false');
    menuTrigger.setAttribute('aria-expanded', 'false');
    menuTrigger.setAttribute('aria-label', 'Open navigation menu');
    document.body.style.overflow = '';
    menuTrigger.focus();
  }

  function toggleMobileMenu() {
    if (isMobileOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  // Trigger click listener
  menuTrigger.addEventListener('click', toggleMobileMenu);

  // Keyboard navigation: Escape key closes mobile menu
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape' && isMobileOpen) {
      closeMobileMenu();
    }
  }
  window.addEventListener('keydown', handleKeyDown);

  // Close mobile drawer on resize to desktop breakpoint (>= 992px)
  function handleResize() {
    if (window.innerWidth >= 992 && isMobileOpen) {
      closeMobileMenu();
    }
  }
  window.addEventListener('resize', handleResize);

  // 8. Connect to SharedScrollEngine (or fallback window scroll)
  let scrollEngineUnsubscribe: (() => void) | null = null;

  if (options.scrollEngine) {
    scrollEngineUnsubscribe = options.scrollEngine.subscribe((state) => {
      updateScroll(state.scroll);
    });
  } else {
    const handleNativeScroll = () => {
      updateScroll(window.scrollY);
    };
    window.addEventListener('scroll', handleNativeScroll, { passive: true });
    scrollEngineUnsubscribe = () => {
      window.removeEventListener('scroll', handleNativeScroll);
    };
    // initial check
    updateScroll(window.scrollY);
  }

  // Teardown Handle
  function dispose() {
    if (scrollEngineUnsubscribe) {
      scrollEngineUnsubscribe();
      scrollEngineUnsubscribe = null;
    }
    pillCleanups.forEach((item) => {
      item.link.removeEventListener('mouseenter', item.onEnter);
      item.link.removeEventListener('mouseleave', item.onLeave);
      item.link.removeEventListener('focus', item.onEnter);
      item.link.removeEventListener('blur', item.onLeave);
      item.tweens.forEach((t) => t.kill());
    });
    menuTrigger.removeEventListener('click', toggleMobileMenu);
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('resize', handleResize);
    document.body.style.overflow = '';
    header.remove();
    mobileDrawer.remove();
  }

  function updateActiveRoute(newPath: string) {
    const isHome = newPath === '/' || newPath === '/index.html' || newPath === '';
    const allLinks = [
      ...Array.from(pillNav.querySelectorAll<HTMLAnchorElement>('.site-header__pill-link')),
      ...Array.from(mobileNavList.querySelectorAll<HTMLAnchorElement>('.site-header__mobile-nav-link'))
    ];

    allLinks.forEach((link) => {
      const linkPath = link.getAttribute('href');
      const isLinkHome = linkPath === '/' || linkPath === '/index.html';
      const isActive = isLinkHome
        ? isHome
        : !isHome && !!linkPath && newPath.startsWith(linkPath);

      if (isActive) {
        link.setAttribute('aria-current', 'page');
        link.setAttribute('data-active', 'true');
      } else {
        link.removeAttribute('aria-current');
        link.removeAttribute('data-active');
      }
    });
  }

  return {
    get element() {
      return header;
    },
    get isScrolled() {
      return isScrolled;
    },
    get isMobileOpen() {
      return isMobileOpen;
    },
    openMobileMenu,
    closeMobileMenu,
    toggleMobileMenu,
    updateScroll,
    updateActiveRoute,
    dispose
  };
}
