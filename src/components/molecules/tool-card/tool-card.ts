import createElement from 'lucide/dist/esm/createElement.js'

import { COLOR_MAP, ICONS } from './tool-card.helpers.js'

class ToolCard extends HTMLElement {
  connectedCallback() {
    const heading = this.getAttribute('heading') ?? ''
    const text = this.getAttribute('text') ?? ''
    const iconName = this.getAttribute('icon') ?? ''
    const colorName = this.getAttribute('color') ?? ''
    const category = this.getAttribute('category') ?? ''

    const colorScheme = COLOR_MAP[colorName] ?? COLOR_MAP.gray
    const iconColor = colorScheme.icon
    const iconBg = colorScheme.bg

    this.innerHTML = `
      <div class="rounded-2xl flex flex-col justify-start p-[clamp(1rem,2dvw,1.5rem)] bg-white shadow-[0_1px_3px_rgba(0,51,102,0.08),0_1px_2px_rgba(0,51,102,0.06)] opacity-0 -translate-y-5 transition-all duration-500 ease-out" data-card>
        <div class="flex items-start gap-3 mb-2">
          ${iconName ? `<div class="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl" style="background:${iconBg};color:${iconColor}" data-icon-slot></div>` : ''}
          <div class="min-w-0">
            <h3 class="font-semibold text-[clamp(0.85rem,1.4dvw,1rem)] leading-tight" style="color:${colorScheme.title}">${heading}</h3>
            ${category ? `<span class="text-[0.65rem] uppercase tracking-wider text-toolio-400 font-medium">${category}</span>` : ''}
          </div>
        </div>
        <p class="text-toolio-500 leading-relaxed text-[clamp(0.75rem,1.2dvw,0.85rem)]">${text}</p>
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
    const restShadow = '0 1px 3px rgba(0,51,102,0.08), 0 1px 2px rgba(0,51,102,0.06)'
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-3px)'
      card.style.boxShadow = '0 8px 24px rgba(0,51,102,0.12), 0 4px 8px rgba(0,51,102,0.08)'
    })
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)'
      card.style.boxShadow = restShadow
    })
  }
}

customElements.define('tool-card', ToolCard)
