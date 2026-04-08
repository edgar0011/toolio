import createElement from 'lucide/dist/esm/createElement.js'

import { COLOR_MAP, ICONS } from './square.helpers'

class ContentSquare extends HTMLElement {
  connectedCallback() {
    const heading = this.getAttribute('heading') ?? ''
    const text = this.getAttribute('text') ?? ''
    const iconName = this.getAttribute('icon') ?? ''
    const colorName = this.getAttribute('color') ?? ''
    const sectionIndex = parseInt(
      this.closest('content-section')?.getAttribute('section-index') ?? '0',
    )

    const isDarkSection = sectionIndex % 2 === 1
    const colorScheme = COLOR_MAP[colorName]
    const iconColor = colorScheme ? colorScheme.icon : isDarkSection ? '#6db0e0' : '#003366'
    const iconBg = colorScheme
      ? colorScheme.bg
      : isDarkSection
        ? 'rgba(109,176,224,0.15)'
        : 'rgba(0,51,102,0.08)'
    const headingStyle = colorScheme ? `color: ${colorScheme.title}` : ''
    const cardClasses = isDarkSection
      ? 'bg-white/[0.08] border border-white/[0.12] shadow-[0_1px_3px_rgba(0,0,0,0.2)]'
      : 'bg-white shadow-[0_1px_3px_rgba(0,51,102,0.08),0_1px_2px_rgba(0,51,102,0.06)]'
    const headingColor = colorScheme ? '' : isDarkSection ? 'text-white' : 'text-toolio-dark'
    const textColor = isDarkSection ? 'text-toolio-200' : 'text-toolio-500'

    this.innerHTML = `
      <div class="rounded-2xl flex flex-col justify-start p-[clamp(1.25rem,2.5dvw,2.5rem)] min-h-[clamp(160px,22dvh,260px)] opacity-0 -translate-y-5 transition-all duration-500 ease-out ${cardClasses}" data-card>
        ${iconName ? `<div class="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl" style="background:${iconBg};color:${iconColor}" data-icon-slot></div>` : ''}
        <h3 class="font-semibold ${headingColor} text-[clamp(1rem,1.8dvw,1.25rem)] mb-3" ${headingStyle ? `style="${headingStyle}"` : ''}>${heading}</h3>
        <p class="${textColor} leading-relaxed text-[clamp(0.8rem,1.3dvw,0.95rem)]">${text}</p>
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
    const restShadow = isDarkSection
      ? '0 1px 3px rgba(0,0,0,0.2)'
      : '0 1px 3px rgba(0,51,102,0.08), 0 1px 2px rgba(0,51,102,0.06)'
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px)'
      card.style.boxShadow = '0 8px 24px rgba(0,51,102,0.15), 0 4px 8px rgba(0,51,102,0.1)'
    })
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)'
      card.style.boxShadow = restShadow
    })
  }
}

customElements.define('content-square', ContentSquare)
