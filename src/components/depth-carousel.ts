/**
 * Privilege Interior Solutions - Depth Carousel Component
 * Ported cleanly from the React Bits DepthCarousel specification into Vanilla TypeScript + GSAP.
 *
 * Provides:
 * - 3D depth-rail card stacking with receding cards fanning out in depth
 * - Drag/touch gesture panning with momentum release
 * - Mouse wheel scrolling
 * - Keyboard navigation (ArrowLeft / ArrowRight)
 * - Refined minimal prev/next controls & dot indicators
 * - Full reduced-motion and ResizeObserver auto-scaling
 */

import gsap from 'gsap';

export interface DepthCarouselItem {
  readonly image: string;
  readonly alt: string;
  readonly label?: string;
  readonly scope?: string;
}

export interface DepthCarouselOptions {
  readonly items: readonly DepthCarouselItem[];
  readonly cardWidth?: number;
  readonly cardHeight?: number;
  readonly radius?: number;
  readonly tint?: string;
  readonly depth?: number;
  readonly spread?: number;
  readonly tilt?: number;
  readonly tiltDirection?: 'left' | 'right';
  readonly perspective?: number;
  readonly visibleCards?: number;
  readonly falloff?: number;
  readonly blur?: number;
  readonly duration?: number;
  readonly ease?: string;
  readonly autoplay?: boolean;
  readonly autoplayDelay?: number;
  readonly loop?: boolean;
  readonly showControls?: boolean;
  readonly showIndicators?: boolean;
  readonly onChange?: (index: number, item: DepthCarouselItem) => void;
}

export interface DepthCarouselHandle {
  readonly element: HTMLElement;
  setFocus(index: number, animate?: boolean): void;
  navigateBy(step: number): void;
  dispose(): void;
}

const clamp = (v: number, min: number, max: number): number => Math.min(Math.max(v, min), max);

export function createDepthCarousel(options: DepthCarouselOptions): DepthCarouselHandle {
  const {
    items,
    cardWidth = 260,
    cardHeight = 340,
    radius = 14,
    tint = '#14161b',
    depth = 170,
    spread = 65,
    tilt = 16,
    tiltDirection = 'right',
    perspective = 1300,
    visibleCards = 3,
    falloff = 0.22,
    blur = 4,
    duration = 650,
    ease = 'power3.out',
    autoplay = false,
    autoplayDelay = 3500,
    loop = true,
    showControls = true,
    showIndicators = true,
    onChange
  } = options;

  const count = items.length;

  // Root Container
  const root = document.createElement('div');
  root.className = 'depth-carousel';
  root.style.setProperty('--dc-perspective', `${perspective}px`);
  root.setAttribute('role', 'group');
  root.setAttribute('aria-roledescription', 'carousel');
  root.setAttribute('aria-label', 'Privilege Projects Depth Carousel');
  root.tabIndex = 0;

  // 3D Stage
  const stage = document.createElement('div');
  stage.className = 'depth-carousel__stage';
  root.appendChild(stage);

  // Cards & Overlays References
  const cardElements: HTMLElement[] = [];
  const overlayElements: HTMLElement[] = [];

  items.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'depth-carousel__card';
    card.style.width = `${cardWidth}px`;
    card.style.height = `${cardHeight}px`;
    card.style.borderRadius = `${radius}px`;
    card.setAttribute('aria-roledescription', 'slide');
    card.setAttribute('aria-label', `${i + 1} of ${count}`);
    card.setAttribute('aria-hidden', i === 0 ? 'false' : 'true');

    const img = document.createElement('img');
    img.className = 'depth-carousel__img';
    img.src = item.image;
    img.alt = item.alt;
    img.draggable = false;
    img.loading = i < 3 ? 'eager' : 'lazy';

    const tintSpan = document.createElement('span');
    tintSpan.className = 'depth-carousel__tint';
    tintSpan.style.background = tint;

    card.appendChild(img);
    card.appendChild(tintSpan);

    if (item.label) {
      const badge = document.createElement('div');
      badge.className = 'depth-carousel__meta-badge';
      badge.innerHTML = `
        <span class="depth-carousel__meta-label">${item.label}</span>
        ${item.scope ? `<span class="depth-carousel__meta-scope">${item.scope}</span>` : ''}
      `;
      card.appendChild(badge);
    }

    card.addEventListener('click', () => {
      if (dragState?.moved) return;
      setFocus(i, true);
    });

    stage.appendChild(card);
    cardElements.push(card);
    overlayElements.push(tintSpan);
  });

  // State Variables
  let pos = 0;
  let focusIndex = 0;
  let scale = 1;
  let activeIndex = 0;
  let currentTween: gsap.core.Tween | null = null;
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Layout Engine
  function layout(currentPos: number): void {
    if (!count) return;
    const dir = tiltDirection === 'left' ? -1 : 1;

    for (let i = 0; i < count; i += 1) {
      const el = cardElements[i];
      if (!el) continue;

      let d = i - currentPos;
      if (loop && count > 1) {
        d = ((d % count) + count) % count;
        if (d > count / 2) d -= count;
      }

      const back = Math.max(0, d);
      const az = Math.abs(d);
      const shown = az <= visibleCards + 0.5;

      const tz = -depth * d;
      const tx = dir * spread * d;
      const ry = dir * tilt * clamp(d, 0, 1);

      let opacity = d < 0 ? Math.max(0, 1 + d) : 1;
      if (!shown) opacity = 0;

      const brightness = Math.max(0.18, 1 - back * falloff);
      const blurPx = blur > 0 ? Math.min(blur, (back / Math.max(1, visibleCards)) * blur) : 0;
      const zi = Math.round(2000 - d * 20);

      el.style.transform = `translate(-50%, -50%) scale(${scale}) translateX(${tx.toFixed(2)}px) translateZ(${tz.toFixed(2)}px) rotateY(${ry.toFixed(3)}deg)`;
      el.style.opacity = opacity.toFixed(3);
      el.style.filter = `brightness(${brightness.toFixed(3)}) blur(${blurPx.toFixed(2)}px)`;
      el.style.zIndex = String(zi);
      el.style.pointerEvents = shown && opacity > 0.05 ? 'auto' : 'none';

      const ov = overlayElements[i];
      if (ov) {
        ov.style.opacity = clamp(back * falloff * 1.25, 0, 0.86).toFixed(3);
      }
    }
  }

  // Dot Indicators Sync
  const dotButtons: HTMLButtonElement[] = [];
  function updateIndicators(activeIdx: number): void {
    dotButtons.forEach((dot, idx) => {
      const isSelected = idx === activeIdx;
      dot.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      if (isSelected) {
        dot.classList.add('is-active');
      } else {
        dot.classList.remove('is-active');
      }
    });
    cardElements.forEach((c, idx) => {
      c.setAttribute('aria-hidden', idx === activeIdx ? 'false' : 'true');
    });
  }

  function notify(idx: number): void {
    activeIndex = idx;
    updateIndicators(idx);
    onChange?.(idx, items[idx]);
  }

  function tweenTo(target: number, animate: boolean): void {
    currentTween?.kill();
    const proxy = { p: pos };
    const dur = animate && !reducedMotion ? duration / 1000 : 0;

    currentTween = gsap.to(proxy, {
      p: target,
      duration: dur,
      ease,
      onUpdate: () => {
        pos = proxy.p;
        layout(proxy.p);
      },
      onComplete: () => {
        if (count > 0) pos = ((pos % count) + count) % count;
        layout(pos);
      }
    });
  }

  function setFocus(rawIndex: number, animate = true): void {
    if (!count) return;
    const idx = loop ? ((rawIndex % count) + count) % count : clamp(rawIndex, 0, count - 1);
    let delta = idx - pos;
    if (loop && count > 1) {
      delta = ((delta % count) + count) % count;
      if (delta > count / 2) delta -= count;
    }
    tweenTo(pos + delta, animate);
    if (idx !== focusIndex) {
      focusIndex = idx;
      notify(idx);
    }
  }

  function navigateBy(step: number): void {
    setFocus(focusIndex + step, true);
  }

  // Build Prev / Next Control Arrows
  let prevBtn: HTMLButtonElement | null = null;
  let nextBtn: HTMLButtonElement | null = null;
  if (showControls && count > 1) {
    const controlsWrap = document.createElement('div');
    controlsWrap.className = 'depth-carousel__controls';

    prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'depth-carousel__arrow depth-carousel__arrow--prev';
    prevBtn.setAttribute('aria-label', 'Previous project');
    prevBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M15 19l-7-7 7-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateBy(-1);
    });

    nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'depth-carousel__arrow depth-carousel__arrow--next';
    nextBtn.setAttribute('aria-label', 'Next project');
    nextBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateBy(1);
    });

    controlsWrap.appendChild(prevBtn);
    controlsWrap.appendChild(nextBtn);
    root.appendChild(controlsWrap);
  }

  // Build Dot Indicators
  if (showIndicators && count > 1) {
    const dotsWrap = document.createElement('div');
    dotsWrap.className = 'depth-carousel__dots';
    dotsWrap.setAttribute('role', 'tablist');
    dotsWrap.setAttribute('aria-label', 'Project slides');

    items.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      dot.setAttribute('aria-label', `Go to project ${i + 1}`);
      dot.className = `depth-carousel__dot${i === 0 ? ' is-active' : ''}`;
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        setFocus(i, true);
      });
      dotsWrap.appendChild(dot);
      dotButtons.push(dot);
    });

    root.appendChild(dotsWrap);
  }

  // ResizeObserver for Container Scaling
  const resizeObserver = new ResizeObserver((entries) => {
    const w = entries[0].contentRect.width;
    const needed = cardWidth + Math.abs(spread) * 2 + 80;
    scale = clamp(w / needed, 0.45, 1);
    layout(pos);
  });
  resizeObserver.observe(root);

  // Wheel Listener
  let wheelTimer: number | null = null;
  const onWheel = (e: WheelEvent): void => {
    if (count < 2) return;
    // Only capture horizontal or deliberate wheel
    if (Math.abs(e.deltaX) < 15 && Math.abs(e.deltaY) < 15) return;
    e.preventDefault();
    currentTween?.kill();
    const raw = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    const delta = e.deltaMode === 1 ? raw * 24 : raw;
    const step = clamp(delta / (cardWidth * 0.9), -0.6, 0.6);
    pos += step;
    layout(pos);
    if (wheelTimer !== null) clearTimeout(wheelTimer);
    wheelTimer = window.setTimeout(() => setFocus(Math.round(pos), true), 130);
  };
  root.addEventListener('wheel', onWheel, { passive: false });

  // Pointer Drag Gestures
  interface DragState {
    x: number;
    startPos: number;
    lastX: number;
    lastT: number;
    v: number;
    moved: boolean;
    id: number;
  }
  let dragState: DragState | null = null;

  const onPointerDown = (e: PointerEvent): void => {
    if (count < 2) return;
    currentTween?.kill();
    dragState = {
      x: e.clientX,
      startPos: pos,
      lastX: e.clientX,
      lastT: performance.now(),
      v: 0,
      moved: false,
      id: e.pointerId
    };
  };

  const onPointerMove = (e: PointerEvent): void => {
    if (!dragState) return;
    const stepPx = Math.max(cardWidth * 0.55 * scale, 40);
    const dx = e.clientX - dragState.x;
    if (!dragState.moved && Math.abs(dx) > 4) {
      dragState.moved = true;
      try {
        root.setPointerCapture(dragState.id);
      } catch {
        /* ignore */
      }
    }
    if (!dragState.moved) return;
    const now = performance.now();
    const dt = Math.max(now - dragState.lastT, 1);
    dragState.v = (e.clientX - dragState.lastX) / dt;
    dragState.lastX = e.clientX;
    dragState.lastT = now;
    pos = dragState.startPos - dx / stepPx;
    layout(pos);
  };

  const onPointerEnd = (): void => {
    if (!dragState) return;
    const drag = dragState;
    dragState = null;
    if (!drag.moved) return;
    const stepPx = Math.max(cardWidth * 0.55 * scale, 40);
    const projected = pos - (drag.v * 180) / stepPx;
    setFocus(Math.round(projected), true);
  };

  root.addEventListener('pointerdown', onPointerDown);
  root.addEventListener('pointermove', onPointerMove);
  root.addEventListener('pointerup', onPointerEnd);
  root.addEventListener('pointercancel', onPointerEnd);

  // Keyboard navigation
  const onKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      navigateBy(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      navigateBy(1);
    }
  };
  root.addEventListener('keydown', onKeyDown);

  // Optional Autoplay
  let autoTimer: number | null = null;
  if (autoplay && !reducedMotion && count > 1) {
    let paused = false;
    root.addEventListener('mouseenter', () => {
      paused = true;
    });
    root.addEventListener('mouseleave', () => {
      paused = false;
    });
    root.addEventListener('focusin', () => {
      paused = true;
    });
    root.addEventListener('focusout', () => {
      paused = false;
    });
    autoTimer = window.setInterval(() => {
      if (!paused) navigateBy(1);
    }, Math.max(autoplayDelay, 1000));
  }

  // Initial layout
  layout(0);

  function dispose(): void {
    currentTween?.kill();
    resizeObserver.disconnect();
    root.removeEventListener('wheel', onWheel);
    root.removeEventListener('pointerdown', onPointerDown);
    root.removeEventListener('pointermove', onPointerMove);
    root.removeEventListener('pointerup', onPointerEnd);
    root.removeEventListener('pointercancel', onPointerEnd);
    root.removeEventListener('keydown', onKeyDown);
    if (wheelTimer !== null) clearTimeout(wheelTimer);
    if (autoTimer !== null) clearInterval(autoTimer);
    root.remove();
  }

  return {
    get element() {
      return root;
    },
    setFocus,
    navigateBy,
    dispose
  };
}
