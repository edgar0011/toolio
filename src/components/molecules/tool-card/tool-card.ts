import createElement from 'lucide/dist/esm/createElement.js'

import { ICONS } from './tool-card.helpers.js'

class ToolCard extends HTMLElement {
  connectedCallback() {
    const heading = this.getAttribute('heading') ?? ''
    const text = this.getAttribute('text') ?? ''
    const iconName = this.getAttribute('icon') ?? ''
    const category = this.getAttribute('category') ?? ''

    this.innerHTML = `
      <div class="rounded-lg flex flex-col justify-start p-[clamp(1rem,2dvw,1.5rem)] bg-t-surface border border-t-border opacity-0 -translate-y-8 transition-all duration-500 ease-out" data-card>
        <div class="flex items-start gap-3 mb-2">
          ${iconName ? `<div class="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg" style="background:var(--t-icon-bg);color:var(--t-icon)" data-icon-slot></div>` : ''}
          <div class="min-w-0">
            <h3 class="font-normal text-t-text text-[clamp(0.85rem,1.4dvw,1rem)] leading-[1.0] tracking-normal">${heading}</h3>
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
    const styles = getComputedStyle(document.documentElement)

    const restShadow = styles.getPropertyValue('--t-shadow-rest').trim() || 'none'
    card.style.boxShadow = restShadow

    card.addEventListener('mouseenter', () => {
      const hover = getComputedStyle(document.documentElement)
        .getPropertyValue('--t-shadow-hover')
        .trim()
      card.style.transform = 'translateY(-6px)'
      card.style.boxShadow = hover
    })
    card.addEventListener('mouseleave', () => {
      const rest =
        getComputedStyle(document.documentElement).getPropertyValue('--t-shadow-rest').trim() ||
        'none'
      card.style.transform = 'translateY(0)'
      card.style.boxShadow = rest
    })
  }
}

customElements.define('tool-card', ToolCard)
