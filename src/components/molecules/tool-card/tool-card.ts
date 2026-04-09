import createElement from 'lucide/dist/esm/createElement.js'

import { ICONS } from './tool-card.helpers.js'

const getShadow = (token: string): string =>
  getComputedStyle(document.documentElement).getPropertyValue(token).trim() || 'none'

class ToolCard extends HTMLElement {
  connectedCallback() {
    const heading = this.getAttribute('heading') ?? ''
    const text = this.getAttribute('text') ?? ''
    const iconName = this.getAttribute('icon') ?? ''
    const category = this.getAttribute('category') ?? ''

    this.innerHTML = `
      <div class="rounded-lg flex flex-col justify-start p-[clamp(1rem,2dvw,1.5rem)] bg-t-surface opacity-0 -translate-y-8 transition-all duration-500 ease-out cursor-default" data-card>
        <div class="flex items-start gap-3 mb-2">
          ${iconName ? `<div class="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg" style="background:var(--t-icon-bg);color:var(--t-icon)" data-icon-slot></div>` : ''}
          <div class="min-w-0">
            <h3 class="font-normal text-t-text text-[clamp(0.85rem,1.4dvw,1rem)] leading-none tracking-normal">${heading}</h3>
            ${category ? `<span class="text-[0.65rem] uppercase tracking-[0.35px] text-t-text-secondary font-[450]">${category}</span>` : ''}
          </div>
        </div>
        <p class="text-t-text-muted leading-[1.4] tracking-[-0.16px] text-[clamp(0.75rem,1.2dvw,0.85rem)]">${text}</p>
      </div>
    `

    if (iconName) {
      const iconNode = ICONS[iconName]
      if (iconNode) {
        const iconEl = createElement(iconNode, {
          width: 22,
          height: 22,
          'stroke-width': 1.5,
        })
        this.querySelector('[data-icon-slot]')?.appendChild(iconEl)
      }
    }

    const card = this.querySelector('[data-card]') as HTMLElement

    card.addEventListener('mouseenter', () => {
      // Detect card surface brightness at hover time
      const isDarkCard = document.documentElement.classList.contains('dark')
      const token = isDarkCard ? '--t-shadow-hover-on-dark' : '--t-shadow-hover-on-light'
      card.style.transform = 'translateY(-8px)'
      card.style.boxShadow = getShadow(token)
    })
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)'
      card.style.boxShadow = 'none'
    })
  }
}

customElements.define('tool-card', ToolCard)
