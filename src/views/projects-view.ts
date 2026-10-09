/**
 * Privilege Interior Solutions - Projects Page Component
 *
 * Immersive, project-focused architectural portfolio experience.
 * Inspired by the Lumenis visual reference:
 * - Large viewport-scale project panels
 * - Minimal UI surrounding the authentic photography
 * - Restrained typography and high-contrast charcoal text
 * - Clean modal view on "View Project →"
 * - Authentic local Privilege imagery only
 * - No fabricated project claims
 */

import { AUTHENTIC_PROJECTS, type ProjectEntry } from '../data/projects-data.js';
import type { ISharedScrollEngine } from '../scroll/types.js';

export interface ProjectsViewOptions {
  scrollEngine?: ISharedScrollEngine | null;
}

export interface ProjectsViewHandle {
  readonly element: HTMLElement;
  dispose(): void;
}

export function renderProjectsView(options: ProjectsViewOptions = {}): ProjectsViewHandle {
  const container = document.createElement('div');
  container.className = 'projects-page';
  container.setAttribute('data-page', 'projects');

  // 1. Projects Introduction
  const intro = document.createElement('header');
  intro.className = 'projects-intro';
  intro.innerHTML = `
    <div class="projects-intro__badge">
      <span class="projects-intro__badge-dot"></span>
      <span class="projects-intro__badge-text">PORTFOLIO ARCHIVE</span>
    </div>
    <div class="projects-intro__header">
      <h1 class="projects-intro__heading">A selection of spaces we've shaped.</h1>
      <p class="projects-intro__lead">
        Completed residential living environments, modular kitchens, and tailored interior joinery across Bengaluru.
      </p>
    </div>
  `;
  container.appendChild(intro);

  // 2. Immersive Projects Sequence
  const sequence = document.createElement('section');
  sequence.className = 'projects-sequence';
  sequence.setAttribute('aria-label', 'Featured Architectural Projects');

  AUTHENTIC_PROJECTS.forEach((project: ProjectEntry) => {
    const panel = document.createElement('article');
    panel.className = `project-panel project-panel--${project.orientation}`;
    panel.id = `project-${project.id}`;

    panel.innerHTML = `
      <div class="project-panel__container">
        
        <!-- Meta Strip -->
        <div class="project-panel__meta-strip">
          <div class="project-panel__meta-left">
            <span class="project-panel__number">${project.number}</span>
            <span class="project-panel__category">${project.category}</span>
          </div>
          <span class="project-panel__scope">${project.scope}</span>
        </div>

        <!-- Main Visual Display -->
        <div class="project-panel__visual-wrap">
          <img 
            src="${project.image}" 
            alt="${project.alt}" 
            class="project-panel__image" 
            loading="lazy"
            decoding="async"
            draggable="false"
          />
          <div class="project-panel__overlay" aria-hidden="true"></div>
        </div>

        <!-- Panel Footer -->
        <div class="project-panel__footer">
          <h2 class="project-panel__title">${project.descriptor}</h2>
          <button 
            type="button" 
            class="project-panel__action" 
            data-project-id="${project.id}"
            aria-label="View ${project.descriptor} in high resolution"
          >
            <span>View Project</span>
            <span class="project-panel__action-arrow" aria-hidden="true">&rarr;</span>
          </button>
        </div>

      </div>
    `;

    sequence.appendChild(panel);
  });

  container.appendChild(sequence);

  // 3. Outro / Consultation Anchor
  const outro = document.createElement('section');
  outro.className = 'projects-outro';
  outro.innerHTML = `
    <div class="projects-outro__container">
      <span class="projects-outro__badge">START A PROJECT</span>
      <h2 class="projects-outro__heading">Have a residential or commercial space in mind?</h2>
      <p class="projects-outro__text">
        Our team of experienced interior architects and project leads collaborate with you to create spaces suited to your vision and lifestyle.
      </p>
      <div class="projects-outro__actions">
        <a href="/contact" class="btn btn-primary">
          <span>Book Us a Call</span>
          <span class="btn-arrow" aria-hidden="true">&rarr;</span>
        </a>
        <a href="/" class="btn btn-secondary">
          <span>Return to Home</span>
        </a>
      </div>
    </div>
  `;
  container.appendChild(outro);

  // 4. Project Modal Lightbox (Honest high-res inspection, no fake detail pages)
  const modal = document.createElement('div');
  modal.className = 'project-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="project-modal__content">
      <button type="button" class="project-modal__close-btn" aria-label="Close dialog">&times;</button>
      <div class="project-modal__img-wrap">
        <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="" class="project-modal__img" />
      </div>
      <div class="project-modal__info">
        <div>
          <h3 class="project-modal__title"></h3>
          <p class="project-modal__desc"></p>
        </div>
        <a href="/contact" class="btn btn-primary" style="font-size: 0.75rem; padding: 0.6rem 1.25rem;">
          Consult on this Space &rarr;
        </a>
      </div>
    </div>
  `;
  container.appendChild(modal);

  const modalImg = modal.querySelector<HTMLImageElement>('.project-modal__img')!;
  const modalTitle = modal.querySelector<HTMLElement>('.project-modal__title')!;
  const modalDesc = modal.querySelector<HTMLElement>('.project-modal__desc')!;
  const modalClose = modal.querySelector<HTMLButtonElement>('.project-modal__close-btn')!;

  function openModal(projectId: string): void {
    const project = AUTHENTIC_PROJECTS.find((p) => p.id === projectId);
    if (!project) return;

    modalImg.src = project.image;
    modalImg.alt = project.alt;
    modalTitle.textContent = `${project.number} / ${project.descriptor}`;
    modalDesc.textContent = `${project.category} — ${project.scope}`;

    modal.setAttribute('data-open', 'true');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal(): void {
    modal.removeAttribute('data-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && modal.getAttribute('data-open') === 'true') {
      closeModal();
    }
  };
  window.addEventListener('keydown', handleKeyDown);

  const handleActionClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    const btn = target?.closest<HTMLButtonElement>('.project-panel__action');
    if (btn) {
      const pid = btn.getAttribute('data-project-id');
      if (pid) {
        e.preventDefault();
        openModal(pid);
      }
    }
  };
  sequence.addEventListener('click', handleActionClick);

  function dispose(): void {
    window.removeEventListener('keydown', handleKeyDown);
    sequence.removeEventListener('click', handleActionClick);
    modalClose.removeEventListener('click', closeModal);
    document.body.style.overflow = '';
    container.remove();
  }

  return {
    element: container,
    dispose
  };
}
