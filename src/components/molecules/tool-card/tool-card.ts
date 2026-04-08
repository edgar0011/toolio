import createElement from 'lucide/dist/esm/createElement.js'

import { ICONS } from './tool-card.helpers.js'

class ToolCard extends HTMLElement {
  connectedCallback() {
    const heading = this.getAttribute('heading') ?? ''
    const text = this.getAttribute('text') ?? ''
    const iconName = this.getAttribute('icon') ?? ''
    const category = this.getAttribute('category') ?? ''

    // RunwayML: monochrome icons
    const iconColor = '#767d88'
    const iconBg = 'rgba(255,255,255,0.06)'

    this.innerHTML = `
      <div class="rounded-lg flex flex-col justify-start p-[clamp(1rem,2dvw,1.5rem)] bg-runway-surface border border-runway-border opacity-0 -translate-y-5 transition-all duration-500 ease-out" data-card>
        <div class="flex items-start gap-3 mb-2">
          ${iconName ? `<div class="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg" style="background:${iconBg};color:${iconColor}" data-icon-slot></div>` : ''}
          <div class="min-w-0">
            <h3 class="font-normal text-runway-white text-[clamp(0.85rem,1.4dvw,1rem)] leading-[1.0] tracking-normal">${heading}</h3>
            ${category ? `<span class="text-[0.65rem] uppercase tracking-[0.35px] text-runway-slate font-[450]">${category}</span>` : ''}
          </div>
        </div>
        <p class="text-runway-mid leading-[1.4] tracking-[-0.16px] text-[clamp(0.75rem,1.2dvw,0.85rem)]">${text}</p>
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

    // RunwayML: subtle hover, no shadows
    const card = this.querySelector('[data-card]') as HTMLElement
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-2px)'
      card.style.borderColor = '#c9ccd1'
    })
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)'
      card.style.borderColor = ''
    })
  }
}

customElements.define('tool-card', ToolCard)
