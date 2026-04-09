import createElement from 'lucide/dist/esm/createElement.js'

import { ICONS } from './square.helpers'

const getShadow = (token: string): string =>
  getComputedStyle(document.documentElement).getPropertyValue(token).trim() || 'none'

class ContentSquare extends HTMLElement {
  connectedCallback() {
    const heading = this.getAttribute('heading') ?? ''
    const text = this.getAttribute('text') ?? ''
    const iconName = this.getAttribute('icon') ?? ''

    this.innerHTML = `
      <div class="rounded-lg flex flex-col justify-start p-[clamp(1.25rem,2.5dvw,2.5rem)] min-h-[clamp(160px,22dvh,260px)] opacity-0 -translate-y-8 transition-all duration-500 ease-out cursor-default bg-t-surface" data-card>
        ${iconName ? `<div class="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg" style="background:var(--t-icon-bg);color:var(--t-icon)" data-icon-slot></div>` : ''}
        <h3 class="text-t-text-heading text-[clamp(1rem,1.8dvw,1.25rem)] font-normal leading-none tracking-normal mb-3">${heading}</h3>
        <p class="text-t-text-secondary leading-[1.4] tracking-[-0.16px] text-[clamp(0.8rem,1.3dvw,0.95rem)]">${text}</p>
      </div>
    `

    if (iconName) {
      const iconNode = ICONS[iconName]
      if (iconNode) {
        const iconEl = createElement(iconNode, {
          width: 28,
          height: 28,
          'stroke-width': 1.5,
        })
        this.querySelector('[data-icon-slot]')?.appendChild(iconEl)
      }
    }

    const card = this.querySelector('[data-card]') as HTMLElement

    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)'
      card.style.boxShadow = getShadow('--t-shadow-hover')
    })
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)'
      card.style.boxShadow = 'none'
    })
  }
}

customElements.define('content-square', ContentSquare)
